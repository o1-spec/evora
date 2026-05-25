import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../services/db.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { Role } from '@prisma/client';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'evora_super_jwt_access_secret_key_change_me_in_production_123!';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'evora_super_jwt_refresh_secret_key_change_me_in_production_456!';
const JWT_ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY || '15m';
const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '7d';

export class AuthController {
  
  /**
   * Register a new user
   */
  public static async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'L\'adresse email et le mot de passe sont requis.' });
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Cette adresse email est déjà utilisée.' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // Create user
      const verificationToken = Math.random().toString(36).substring(2, 15);
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
          role: Role.STUDENT,
          verificationToken
        }
      });

      // Generate access and refresh tokens
      const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRY as any });
      const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRY as any });

      // Save session in database
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      await prisma.session.create({
        data: {
          userId: user.id,
          refreshToken,
          deviceInfo: req.headers['user-agent'] || 'Unknown Device',
          ipAddress: req.ip || 'Unknown IP',
          expiresAt
        }
      });

      return res.status(201).json({
        message: 'Inscription réussie.',
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          subscriptionTier: user.subscriptionTier
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ error: 'Internal server error during registration.' });
    }
  }

  /**
   * Login user
   */
  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'L\'adresse email et le mot de passe sont requis.' });
      }

      // Find user
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Identifiants incorrects.' });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Identifiants incorrects.' });
      }

      // Generate access and refresh tokens
      const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRY as any });
      const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRY as any });

      // Save session in database
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      await prisma.session.create({
        data: {
          userId: user.id,
          refreshToken,
          deviceInfo: req.headers['user-agent'] || 'Unknown Device',
          ipAddress: req.ip || 'Unknown IP',
          expiresAt
        }
      });

      return res.status(200).json({
        message: 'Connexion réussie.',
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          subscriptionTier: user.subscriptionTier
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Internal server error during login.' });
    }
  }

  /**
   * Refresh Token rotation
   */
  public static async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ error: 'Le refresh token est obligatoire.' });
      }

      // Find session in db
      const session = await prisma.session.findUnique({
        where: { refreshToken },
        include: { user: true }
      });

      if (!session || session.expiresAt < new Date()) {
        if (session) await prisma.session.delete({ where: { id: session.id } });
        return res.status(401).json({ error: 'Session invalide ou expirée.' });
      }

      // Verify JWT refresh token
      let decoded: any;
      try {
        decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      } catch (err) {
        await prisma.session.delete({ where: { id: session.id } });
        return res.status(401).json({ error: 'Refresh token invalide.' });
      }

      const user = session.user;

      // Rotate tokens
      const newAccessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRY as any });
      const newRefreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRY as any });

      // Delete old session and insert new rotated session
      await prisma.session.delete({ where: { id: session.id } });

      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await prisma.session.create({
        data: {
          userId: user.id,
          refreshToken: newRefreshToken,
          deviceInfo: req.headers['user-agent'] || 'Unknown Device',
          ipAddress: req.ip || 'Unknown IP',
          expiresAt
        }
      });

      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      });
    } catch (error) {
      console.error('Refresh token error:', error);
      return res.status(500).json({ error: 'Internal server error during token refresh.' });
    }
  }

  /**
   * Logout user and delete session
   */
  public static async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (refreshToken) {
        await prisma.session.deleteMany({ where: { refreshToken } });
      }
      return res.status(200).json({ message: 'Déconnexion réussie.' });
    } catch (error) {
      console.error('Logout error:', error);
      return res.status(500).json({ error: 'Internal server error during logout.' });
    }
  }

  /**
   * Get current user profile
   */
  public static async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          subscriptionTier: true,
          subActiveUntil: true,
          createdAt: true,
          progress: {
            include: { lesson: true }
          },
          examAttempts: {
            orderBy: { startedAt: 'desc' }
          }
        }
      });

      return res.status(200).json({ user });
    } catch (error) {
      console.error('Get profile error:', error);
      return res.status(500).json({ error: 'Internal server error fetching profile.' });
    }
  }

  /**
   * Forgot password request (mocked link)
   */
  public static async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(200).json({ message: 'Si l\'adresse email existe, un email a été envoyé.' });
      }

      const resetToken = Math.random().toString(36).substring(2, 15);
      const resetTokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

      await prisma.user.update({
        where: { id: user.id },
        data: { resetToken, resetTokenExpiry }
      });

      // MOCK Email send
      console.log(`[MOCK EMAIL] Password reset token for ${email}: ${resetToken}`);

      return res.status(200).json({ 
        message: 'Un lien de réinitialisation vous a été envoyé.',
        mockResetToken: resetToken // Handed to user in local test mode
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      return res.status(500).json({ error: 'Internal error handling password reset.' });
    }
  }

  /**
   * Reset password with token
   */
  public static async resetPassword(req: Request, res: Response) {
    try {
      const { resetToken, newPassword } = req.body;

      if (!resetToken || !newPassword) {
        return res.status(400).json({ error: 'Token et nouveau mot de passe sont requis.' });
      }

      const user = await prisma.user.findFirst({
        where: {
          resetToken,
          resetTokenExpiry: { gte: new Date() }
        }
      });

      if (!user) {
        return res.status(400).json({ error: 'Le jeton de réinitialisation est invalide ou a expiré.' });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(newPassword, salt);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordHash,
          resetToken: null,
          resetTokenExpiry: null
        }
      });

      return res.status(200).json({ message: 'Votre mot de passe a été modifié avec succès.' });
    } catch (error) {
      console.error('Reset password error:', error);
      return res.status(500).json({ error: 'Internal error changing password.' });
    }
  }
}
