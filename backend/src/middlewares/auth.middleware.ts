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

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'evora_super_jwt_access_secret_key_change_me_in_production_123!';

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
        subActiveUntil: true
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'User associated with this token no longer exists.' });
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
