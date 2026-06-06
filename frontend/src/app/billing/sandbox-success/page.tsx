'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Loader2, CreditCard, ArrowRight } from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';

function SandboxSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const tier = searchParams.get('tier') || 'PREMIUM';

  useEffect(() => {
    async function activateUpgrade() {
      try {
        const response = await api.post('/billing/sandbox-activate', { tier });
        const updatedUser = response.data.user;

        // Retrieve auth state and update
        const currentStore = useAuthStore.getState();
        if (currentStore.user) {
          const updatedUserObj = {
            ...currentStore.user,
            subscriptionTier: updatedUser.subscriptionTier,
          };
          useAuthStore.setState({ user: updatedUserObj });

        }

        setStatus('success');
      } catch (err: any) {
        console.error('Sandbox activation failed:', err);
        setErrorMsg(err?.response?.data?.error || 'Failed to apply sandbox account upgrade.');
        setStatus('error');
      }
    }

    // Small delay to make it feel premium
    const timer = setTimeout(() => {
      activateUpgrade();
    }, 1500);

    return () => clearTimeout(timer);
  }, [tier]);

  const TIER_COLORS: Record<string, string> = {
    FREE: 'hsl(var(--text-secondary))',
    BASIC: '#8b5cf6',
    PREMIUM: '#ec4899',
    PRO: '#f59e0b',
  };

  const activeColor = TIER_COLORS[tier] || '#8b5cf6';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#090d16',
      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
      padding: '2rem',
    }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '1.5rem',
            padding: '3rem 2rem',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {status === 'loading' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ position: 'relative', width: 64, height: 64 }}>
                <Loader2 size={64} className="animate-spin" style={{ color: activeColor }} />
                <CreditCard size={24} style={{ position: 'absolute', top: 20, left: 20, color: 'white' }} />
              </div>
              <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.5rem', fontWeight: 800, color: '#f1f5f9' }}>
                Simulating Checkout...
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Processing mock sandbox transaction for <strong>{tier} tier</strong>. Please do not close this window.
              </p>
            </div>
          )}

          {status === 'success' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 10 }}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  backgroundColor: `${activeColor}15`,
                  border: `2px solid ${activeColor}`,
                  color: activeColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.75rem',
                  boxShadow: `0 0 20px ${activeColor}30`,
                }}
              >
                <CheckCircle2 size={36} />
              </motion.div>

              <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.75rem', fontWeight: 900, color: 'white', marginBottom: '0.5rem' }}>
                Upgrade Successful!
              </h1>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: activeColor,
                backgroundColor: `${activeColor}12`,
                padding: '0.35rem 0.85rem',
                borderRadius: '999px',
                border: `1px solid ${activeColor}30`,
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}>
                <Sparkles size={12} />
                {tier} Active
              </div>

              <p style={{ color: '#94a3b8', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                Your Évora Academy account has been successfully upgraded. All features of the <strong>{tier} plan</strong> are now fully unlocked.
              </p>

              <button
                onClick={() => router.replace('/dashboard/academy')}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  background: `linear-gradient(135deg, ${activeColor}cc 0%, ${activeColor} 100%)`,
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: `0 8px 16px ${activeColor}20`,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                Go to Study Dashboard <ArrowRight size={16} />
              </button>
            </div>
          )}

          {status === 'error' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '2px solid rgb(239, 68, 68)',
                color: 'rgb(239, 68, 68)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.75rem',
              }}>
                <span style={{ fontSize: '2rem', fontWeight: 800 }}>!</span>
              </div>

              <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>
                Sandbox Activation Failed
              </h1>
              <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '2.5rem' }}>
                {errorMsg}
              </p>

              <button
                onClick={() => router.replace('/dashboard/billing')}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  background: 'transparent',
                  color: '#e2e8f0',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                }}
              >
                Back to Billing Catalog
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function SandboxSuccessPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#090d16',
        color: '#94a3b8'
      }}>
        <Loader2 size={32} className="animate-spin" />
      </div>
    }>
      <SandboxSuccessContent />
    </Suspense>
  );
}
