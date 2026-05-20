import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { prisma } from '../services/db.service';
import { StripeService } from '../services/stripe.service';
import { SubscriptionTier } from '@prisma/client';

export async function checkAiUsageLimit(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const { id: userId, subscriptionTier } = req.user;
    
    // Get active limits for current tier
    const limits = StripeService.getTierLimits(subscriptionTier as SubscriptionTier);

    // Calculate logs in the last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const usedCount = await prisma.aIUsageLog.count({
      where: {
        userId,
        timestamp: { gte: thirtyDaysAgo }
      }
    });

    if (usedCount >= limits.maxAiEvaluations) {
      return res.status(429).json({
        error: `Vous avez atteint votre quota mensuel d'évaluations IA (${limits.maxAiEvaluations}/${limits.maxAiEvaluations}). Veuillez passer au niveau supérieur pour débloquer plus de requêtes.`,
        limitExceeded: true,
        limit: limits.maxAiEvaluations,
        used: usedCount
      });
    }

    next();
  } catch (error) {
    console.error('Usage limits middleware error:', error);
    return res.status(500).json({ error: 'Failed to verify subscription usage limits.' });
  }
}

export async function checkExamAttemptLimit(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const { id: userId, subscriptionTier } = req.user;
    const limits = StripeService.getTierLimits(subscriptionTier as SubscriptionTier);

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const attemptCount = await prisma.examAttempt.count({
      where: {
        userId,
        startedAt: { gte: thirtyDaysAgo }
      }
    });

    if (attemptCount >= limits.maxExamAttempts) {
      return res.status(429).json({
        error: `Vous avez atteint votre quota d'essais d'examen TCF ce mois-ci (${limits.maxExamAttempts}/${limits.maxExamAttempts}). Veuillez upgrader votre abonnement pour débloquer de nouvelles simulations d'examens.`,
        limitExceeded: true,
        limit: limits.maxExamAttempts,
        used: attemptCount
      });
    }

    next();
  } catch (error) {
    console.error('Exam attempt limit check error:', error);
    return res.status(500).json({ error: 'Failed to verify exam attempt constraints.' });
  }
}
