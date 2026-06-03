import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { Role } from '@prisma/client';

/**
 * Allows ADMIN and SUPER_ADMIN roles only.
 * Must be used after authMiddleware.
 */
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Authentication required.' });
  }

  const adminRoles: Role[] = [Role.ADMIN, Role.SUPER_ADMIN];
  if (!adminRoles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden. Admin access required.',
    });
  }

  next();
}

/**
 * Allows SUPER_ADMIN only.
 * Must be used after authMiddleware.
 */
export function requireSuperAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Authentication required.' });
  }

  if (req.user.role !== Role.SUPER_ADMIN) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden. Super Admin access required.',
    });
  }

  next();
}

/** Shared admin API response helper */
export function adminResponse<T>(data: T) {
  return { success: true, data };
}
