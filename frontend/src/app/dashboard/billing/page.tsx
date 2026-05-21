'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, Zap, Loader2, ExternalLink } from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';

export default function BillingPage() {
  const { user } = useAuthStore();

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
    onSuccess: (url) => { window.location.href = url; },
  });

  const sandboxMutation = useMutation({
    mutationFn: (tier: string) => api.post('/billing/sandbox-upgrade', { tier }).then(r => r.data),
    onSuccess: () => { window.location.reload(); },
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

      {/* Sandbox Notice */}
      <div style={{ background: 'hsla(37, 95%, 58%, 0.1)', border: '1px solid hsla(37, 95%, 58%, 0.2)', borderRadius: '0.75rem', padding: '1rem 1.25rem', marginBottom: '2.5rem', fontSize: '0.875rem', color: 'hsl(37, 90%, 40%)', display: 'flex', gap: '0.5rem' }}>
        <Zap size={18} style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <strong>Developer Sandbox Mode</strong>: Click "Test Sandbox" to simulate an instant upgrade without payment.
          In production, connect your Stripe keys in the <code>.env</code> file to enable real checkout.
        </div>
      </div>

      {/* Plans Grid */}
      {isLoading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 400, borderRadius: 16 }} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
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
                      className={isPremium ? "btn-primary" : "btn-secondary"} style={{ width: '100%' }}>
                      {checkoutMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <><ExternalLink size={16} /> Subscribe</>}
                    </button>
                  )}
                  {!isCurrent && (
                    <button id={`sandbox-${plan.tier}`}
                      onClick={() => sandboxMutation.mutate(plan.tier)}
                      disabled={sandboxMutation.isPending}
                      className="btn-ghost" style={{ width: '100%', border: '1px dashed hsl(var(--border))' }}>
                      {sandboxMutation.isPending ? 'Processing...' : '⚡ Test Sandbox'}
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
