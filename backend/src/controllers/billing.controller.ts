import { Request, Response } from 'express';
import { prisma } from '../services/db.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { StripeService } from '../services/stripe.service';
import { SubscriptionTier } from '@prisma/client';

export class BillingController {

  /**
   * Fetch active pricing tiers and quotas for the catalog
   */
  public static getPlans(req: Request, res: Response) {
    const plans = [
      {
        tier: SubscriptionTier.FREE,
        name: 'Gratuit (Free)',
        price: '0 € / mois',
        features: [
          '5 évaluations d\'écriture ou de parole par mois',
          '1 simulation complète d\'examen TCF Canada',
          'Syllabus de base A1-A2',
          'Vocabulaire et fiches de révision'
        ],
        limits: StripeService.getTierLimits(SubscriptionTier.FREE)
      },
      {
        tier: SubscriptionTier.BASIC,
        name: 'Basique (Basic)',
        price: '19 € / mois',
        features: [
          '30 évaluations d\'écriture ou de parole par mois',
          '5 simulations complètes d\'examen TCF',
          'Syllabus complet A1 à B2',
          'Rapports d\'évaluations de score détaillés'
        ],
        limits: StripeService.getTierLimits(SubscriptionTier.BASIC)
      },
      {
        tier: SubscriptionTier.PREMIUM,
        name: 'Premium (Premium)',
        price: '39 € / mois',
        features: [
          '100 évaluations d\'écriture ou de parole par mois',
          '15 simulations d\'examens TCF Canada',
          'Syllabus complet du niveau A1 à C2',
          'Accompagnement vocal et corrections phonétiques avancées'
        ],
        limits: StripeService.getTierLimits(SubscriptionTier.PREMIUM)
      },
      {
        tier: SubscriptionTier.PRO,
        name: 'Professionnel (Pro)',
        price: '79 € / mois',
        features: [
          'Évaluations IA illimitées',
          'Simulations d\'examens TCF illimitées',
          'Accès total à l\'académie et tutorat IA en continu',
          'Priorité sur le traitement des requêtes vocales'
        ],
        limits: StripeService.getTierLimits(SubscriptionTier.PRO)
      }
    ];

    return res.status(200).json({ plans });
  }

  /**
   * Initialize a Stripe Checkout Session
   */
  public static async checkout(req: AuthenticatedRequest, res: Response) {
    try {
      const { tier, successUrl, cancelUrl } = req.body;
      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

      if (!tier || !Object.values(SubscriptionTier).includes(tier)) {
        return res.status(400).json({ error: 'Niveau d\'abonnement invalide ou absent.' });
      }

      const sUrl = successUrl || 'http://localhost:3000/dashboard/billing?success=true';
      const cUrl = cancelUrl || 'http://localhost:3000/dashboard/billing?cancel=true';

      const checkoutUrl = await StripeService.createCheckoutSession(req.user.id, tier as SubscriptionTier, sUrl, cUrl);

      return res.status(200).json({ url: checkoutUrl });
    } catch (error: any) {
      console.error('Checkout creation error:', error);
      return res.status(500).json({ error: error.message || 'Failed to create payment checkout session.' });
    }
  }

  /**
   * Redirect user to Stripe Customer Billing Portal
   */
  public static async customerPortal(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
      const { returnUrl } = req.body;

      const retUrl = returnUrl || 'http://localhost:3000/dashboard/billing';
      const portalUrl = await StripeService.createBillingPortal(req.user.id, retUrl);

      return res.status(200).json({ url: portalUrl });
    } catch (error) {
      console.error('Billing portal redirection error:', error);
      return res.status(500).json({ error: 'Failed to access billing settings.' });
    }
  }

  /**
   * Receive Stripe Webhook triggers
   */
  public static async stripeWebhook(req: Request, res: Response) {
    const rawSig = req.headers['stripe-signature'];
    const signature: string = Array.isArray(rawSig) ? rawSig[0] : (rawSig ?? '');
    try {
      // req.body contains raw text if configured in app.ts
      await StripeService.handleWebhook(req.body, signature);
      return res.status(200).json({ received: true });
    } catch (error: any) {
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }

  /**
   * Mock Billing Sandbox Activation: upgrade user plan without Stripe
   */
  public static async sandboxActivate(req: AuthenticatedRequest, res: Response) {
    try {
      const { tier } = req.body;
      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
      const userId = req.user.id;

      if (!tier || !Object.values(SubscriptionTier).includes(tier)) {
        return res.status(400).json({ error: 'Niveau d\'abonnement invalide.' });
      }

      // Upgrade user tier in database immediately
      const activeUntil = new Date(Date.now() + 31 * 24 * 60 * 60 * 1000); // 31 days
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionTier: tier as SubscriptionTier,
          subActiveUntil: activeUntil,
          subscriptionId: `sub_mock_sandbox_${Math.random().toString(36).substring(4)}`
        },
        select: {
          id: true,
          email: true,
          subscriptionTier: true,
          subActiveUntil: true
        }
      });

      console.log(`[Mock Billing Sandbox]: User ${userId} successfully upgraded to ${tier}`);

      // Log action in AdminAuditLog
      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
      await prisma.adminAuditLog.create({
        data: {
          userId,
          action: 'MOCK_SANDBOX_UPGRADE',
          targetType: 'SUBSCRIPTION',
          targetId: userId,
          description: `Upgraded account to mock subscription tier: ${tier}`,
          ipAddress
        }
      });

      return res.status(200).json({
        message: 'Abonnement activé avec succès (Mode Sandbox).',
        user: updatedUser
      });
    } catch (error) {
      console.error('Sandbox activation error:', error);
      return res.status(500).json({ error: 'Failed to activate mock subscription.' });
    }
  }
}
