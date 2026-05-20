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
    FREE: '#94a3b8', BASIC: '#34d399', PREMIUM: '#818cf8', PRO: '#f59e0b',
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <CreditCard size={24} color="hsl(250,95%,64%)" />
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.875rem', fontWeight: 800 }}>Abonnement & Facturation</h1>
        </div>
        <p style={{ color: 'hsl(220,12%,55%)', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Gérez votre plan et débloquez des fonctionnalités IA avancées.
        </p>
      </motion.div>

      {/* Current Plan */}
      <div className="glass" style={{ padding: '1.5rem 1.75rem', marginBottom: '2.5rem', borderLeft: `3px solid ${TIER_COLORS[user?.subscriptionTier || 'FREE']}` }}>
        <div style={{ fontSize: '0.8rem', color: 'hsl(220,12%,55%)', marginBottom: '0.375rem' }}>Plan actuel</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.5rem', fontWeight: 800, color: TIER_COLORS[user?.subscriptionTier || 'FREE'] }}>
            {user?.subscriptionTier || 'FREE'}
          </span>
          <span className="badge badge-accent">Actif</span>
        </div>
      </div>

      {/* Sandbox Notice */}
      <div style={{ background: 'hsla(37,95%,58%,0.1)', border: '1px solid hsla(37,95%,58%,0.25)', borderRadius: '0.75rem', padding: '1rem 1.25rem', marginBottom: '2rem', fontSize: '0.875rem', color: 'hsl(37,95%,70%)' }}>
        ⚡ <strong>Mode Développeur</strong> : Cliquez sur &quot;Test Sandbox&quot; pour simuler une mise à niveau instantanée sans paiement.
        En production, connectez vos clés Stripe dans le fichier <code>.env</code> pour activer le vrai paiement.
      </div>

      {/* Plans Grid */}
      {isLoading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.25rem' }}>
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 300, borderRadius: 16 }} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.25rem' }}>
          {(plans || []).map((plan: any, i: number) => {
            const isCurrent = plan.tier === (user?.subscriptionTier || 'FREE');
            const isPremium = plan.tier === 'PREMIUM';
            const color = TIER_COLORS[plan.tier] || '#818cf8';

            return (
              <motion.div key={plan.tier} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={isPremium ? 'glass-strong' : 'glass'}
                style={{ padding: '1.75rem', border: `1px solid ${isPremium ? 'hsla(250,95%,64%,0.35)' : 'rgba(255,255,255,0.08)'}`, position: 'relative' }}>

                {isCurrent && (
                  <div style={{ position: 'absolute', top: 14, right: 14 }}>
                    <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>✓ Actuel</span>
                  </div>
                )}

                <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.25rem', color, marginBottom: '0.375rem' }}>{plan.name}</div>
                <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>{plan.price}</div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.75rem' }}>
                  {plan.features.map((f: string) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'hsl(220,12%,70%)', lineHeight: 1.5 }}>
                      <CheckCircle size={15} color={color} style={{ flexShrink: 0, marginTop: 2 }} /> {f}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {!isCurrent && plan.tier !== 'FREE' && (
                    <button id={`checkout-${plan.tier}`}
                      onClick={() => checkoutMutation.mutate(plan.tier)}
                      disabled={checkoutMutation.isPending}
                      className="btn-primary" style={{ width: '100%', fontSize: '0.875rem', padding: '0.625rem 1rem' }}>
                      {checkoutMutation.isPending ? <Loader2 size={15} /> : <><ExternalLink size={14} /> Souscrire</>}
                    </button>
                  )}
                  {!isCurrent && (
                    <button id={`sandbox-${plan.tier}`}
                      onClick={() => sandboxMutation.mutate(plan.tier)}
                      disabled={sandboxMutation.isPending}
                      className="btn-secondary" style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                      {sandboxMutation.isPending ? 'En cours...' : '⚡ Test Sandbox'}
                    </button>
                  )}
                  {isCurrent && (
                    <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'hsl(162,82%,55%)', padding: '0.5rem', fontWeight: 600 }}>
                      ✓ Plan actuel
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
