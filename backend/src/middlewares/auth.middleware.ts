import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../services/db.service';
import { Role } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: Role;
    subscriptionTier: string;
  };
}

function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`FATAL: ${key} must be set in environment variables.`);
  return val;
}

const JWT_ACCESS_SECRET = requireEnv('JWT_ACCESS_SECRET');

export async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication token is required.' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Authentication token has expired.', expired: true });
      }
      return res.status(401).json({ error: 'Invalid authentication token.' });
    }

    // Fetch user
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        role: true,
        subscriptionTier: true,
        subActiveUntil: true,
        isSuspended: true
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'User associated with this token no longer exists.' });
    }

    if (user.isSuspended) {
      return res.status(403).json({ error: 'This account has been suspended. Please contact support.' });
    }

    // Attach to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      subscriptionTier: user.subscriptionTier
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ error: 'Internal server authorization error.' });
  }
}
