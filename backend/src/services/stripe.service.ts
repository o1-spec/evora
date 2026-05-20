import Stripe from 'stripe';
import { prisma } from './db.service';
import { SubscriptionTier } from '@prisma/client';

export class StripeService {
  private static stripeKey = process.env.STRIPE_SECRET_KEY || '';
  private static stripe = this.stripeKey ? new Stripe(this.stripeKey, { apiVersion: '2024-04-10' as any }) : null;

  /**
   * Get subscription boundaries and AI capacities per tier
   */
  public static getTierLimits(tier: SubscriptionTier) {
    switch (tier) {
      case SubscriptionTier.BASIC:
        return { maxAiEvaluations: 30, maxExamAttempts: 5, ttsCharacters: 10000, hasSpeakingPractice: true };
      case SubscriptionTier.PREMIUM:
        return { maxAiEvaluations: 100, maxExamAttempts: 15, ttsCharacters: 50000, hasSpeakingPractice: true };
      case SubscriptionTier.PRO:
        return { maxAiEvaluations: 9999, maxExamAttempts: 9999, ttsCharacters: 500000, hasSpeakingPractice: true };
      case SubscriptionTier.FREE:
      default:
        return { maxAiEvaluations: 5, maxExamAttempts: 1, ttsCharacters: 2000, hasSpeakingPractice: false };
    }
  }

  /**
   * Create a checkout session URL for a student.
   * If in sandbox mode, it returns a simulated upgrade URL.
   */
  public static async createCheckoutSession(userId: string, tier: SubscriptionTier, successUrl: string, cancelUrl: string): Promise<string> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    if (this.stripe) {
      try {
        let priceId = process.env.STRIPE_BASIC_PRICE_ID;
        if (tier === SubscriptionTier.PREMIUM) priceId = process.env.STRIPE_PREMIUM_PRICE_ID;
        if (tier === SubscriptionTier.PRO) priceId = process.env.STRIPE_PRO_PRICE_ID;

        if (!priceId) {
          throw new Error(`Stripe Price ID for tier ${tier} is not configured.`);
        }

        // Check or create customer
        let stripeCustomerId = user.stripeCustomerId;
        if (!stripeCustomerId) {
          const customer = await this.stripe.customers.create({
            email: user.email,
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || undefined,
            metadata: { userId }
          });
          stripeCustomerId = customer.id;
          await prisma.user.update({
            where: { id: userId },
            data: { stripeCustomerId }
          });
        }

        const session = await this.stripe.checkout.sessions.create({
          customer: stripeCustomerId,
          payment_method_types: ['card'],
          line_items: [{ price: priceId, quantity: 1 }],
          mode: 'subscription',
          success_url: successUrl,
          cancel_url: cancelUrl,
          metadata: { userId, tier }
        });

        return session.url || successUrl;
      } catch (error) {
        console.error('Error creating Stripe session, falling back to sandbox simulator...', error);
      }
    }

    // Sandbox Mock Checkout: Immediately return a special internal sandbox URL that triggers instant mock upgrades
    return `/billing/sandbox-success?tier=${tier}&userId=${userId}`;
  }

  /**
   * Create a customer billing portal URL.
   */
  public static async createBillingPortal(userId: string, returnUrl: string): Promise<string> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    if (this.stripe && user.stripeCustomerId) {
      try {
        const portalSession = await this.stripe.billingPortal.sessions.create({
          customer: user.stripeCustomerId,
          return_url: returnUrl
        });
        return portalSession.url;
      } catch (error) {
        console.error('Error creating billing portal, falling back to local mocks...', error);
      }
    }

    // Local return fallback
    return returnUrl;
  }

  /**
   * Handle incoming Stripe webhook events
   */
  public static async handleWebhook(rawBody: string, signature: string): Promise<boolean> {
    if (!this.stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
      console.log('Stripe or Webhook Secret not configured, ignoring webhook trigger.');
      return false;
    }

    try {
      const event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          const userId = session.metadata?.userId;
          const tier = session.metadata?.tier as SubscriptionTier;

          if (userId && tier) {
            await prisma.user.update({
              where: { id: userId },
              data: {
                subscriptionTier: tier,
                subscriptionId: session.subscription as string,
                subActiveUntil: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000) // 31 days out
              }
            });
            console.log(`Stripe: Successfully upgraded user ${userId} to ${tier}`);
          }
          break;
        }
        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription;
          const user = await prisma.user.findFirst({
            where: { subscriptionId: subscription.id }
          });
          if (user) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                subscriptionTier: SubscriptionTier.FREE,
                subscriptionId: null,
                subActiveUntil: null
              }
            });
            console.log(`Stripe: Cancelled subscription for user ${user.id}`);
          }
          break;
        }
        default:
          console.log(`Unhandled webhook event type: ${event.type}`);
      }

      return true;
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      throw new Error(`Webhook Error: ${err.message}`);
    }
  }

  /**
   * Process a direct subscription upgrade (used by the offline Sandbox portal helper)
   */
  public static async processSandboxUpgrade(userId: string, tier: SubscriptionTier): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: tier,
        subscriptionId: `sub_sandbox_${Math.random().toString(36).substring(4)}`,
        subActiveUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year mock active
      }
    });
    console.log(`[SANDBOX] Direct upgraded user ${userId} to ${tier}`);
  }
}
