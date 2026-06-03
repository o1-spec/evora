'use client';

import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, Loader2, ExternalLink } from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';

export default function BillingPage() {
  const { user } = useAuthStore();

  const router = useRouter();

  const { data: plans, isLoading } = useQuery({
    queryKey: ['billing-plans'],
    queryFn: () => api.get('/billing/plans').then(r => r.data.plans),
  });

  const checkoutMutation = useMutation({
    mutationFn: (tier: string) =>
      api.post('/billing/checkout', {
        tier,
        successUrl: `${window.location.origin}/dashboard/billing?success=true`,
        cancelUrl: `${window.location.origin}/dashboard/billing`,
      }).then(r => r.data.url),
    onSuccess: (url: string) => {
      // Internal sandbox URL (no Stripe configured) — use Next.js router so React
      // can cleanly unmount framer-motion animated nodes before navigating.
      if (url.startsWith('/')) {
        router.push(url);
      } else {
        // External Stripe URL — defer one tick to flush the current render cycle
        // before the browser unloads the page, avoiding the removeChild error.
        setTimeout(() => { window.location.href = url; }, 0);
      }
    },
  });

  const TIER_COLORS: Record<string, string> = {
    FREE: 'hsl(var(--text-secondary))', BASIC: 'hsl(var(--accent))', PREMIUM: 'hsl(var(--primary))', PRO: '#f59e0b',
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <CreditCard size={24} color="hsl(var(--primary))" />
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.875rem', fontWeight: 800 }}>Subscription & Billing</h1>
        </div>
        <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Manage your plan and unlock advanced AI features.
        </p>
      </motion.div>

      {/* Current Plan */}
      <div className="card" style={{ padding: '1.5rem 1.75rem', marginBottom: '2.5rem', borderLeft: `4px solid ${TIER_COLORS[user?.subscriptionTier || 'FREE']}` }}>
        <div style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', marginBottom: '0.375rem', fontWeight: 600, textTransform: 'uppercase' }}>Current Plan</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.75rem', fontWeight: 800, color: TIER_COLORS[user?.subscriptionTier || 'FREE'] }}>
            {user?.subscriptionTier || 'FREE'}
          </span>
          <span className="badge badge-primary" style={{ backgroundColor: `${TIER_COLORS[user?.subscriptionTier || 'FREE']}20`, color: TIER_COLORS[user?.subscriptionTier || 'FREE'] }}>Active</span>
        </div>
      </div>



      {/* Plans Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 400, borderRadius: 16 }} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(plans || []).map((plan: any, i: number) => {
            const isCurrent = plan.tier === (user?.subscriptionTier || 'FREE');
            const isPremium = plan.tier === 'PREMIUM';
            const color = TIER_COLORS[plan.tier] || 'hsl(var(--primary))';

            return (
              <motion.div key={plan.tier} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={isPremium ? 'card-elevated' : 'card'}
                style={{ padding: '2rem', border: isPremium ? `2px solid ${color}` : undefined, position: 'relative' }}>

                {isCurrent && (
                  <div style={{ position: 'absolute', top: 16, right: 16 }}>
                    <span className="badge" style={{ backgroundColor: `${color}15`, color: color, fontSize: '0.7rem' }}>✓ Current</span>
                  </div>
                )}
                {isPremium && !isCurrent && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', backgroundColor: color, color: 'white', padding: '0.2rem 1rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 600 }}>
                    Most Popular
                  </div>
                )}

                <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.25rem', color: 'hsl(var(--text-primary))', marginBottom: '0.375rem' }}>{plan.name}</div>
                <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', color: color }}>{plan.price}</div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  {plan.features.map((f: string) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: 'hsl(var(--text-secondary))', lineHeight: 1.5 }}>
                      <CheckCircle size={16} color={color} style={{ flexShrink: 0, marginTop: 2 }} /> {f}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                  {!isCurrent && plan.tier !== 'FREE' && (
                    <button id={`checkout-${plan.tier}`}
                      onClick={() => checkoutMutation.mutate(plan.tier)}
                      disabled={checkoutMutation.isPending}
                      className={isPremium ? "btn-primary" : "btn-secondary"} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      {checkoutMutation.isPending ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <ExternalLink size={16} />
                          <span>Subscribe</span>
                        </>
                      )}
                    </button>
                  )}

                  {isCurrent && (
                    <div style={{ textAlign: 'center', fontSize: '0.9rem', color: color, padding: '0.5rem', fontWeight: 600, backgroundColor: `${color}10`, borderRadius: '0.5rem' }}>
                      Active Plan
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
