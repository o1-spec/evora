'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, ArrowRight, Loader2, Mail, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard/academy');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'hsl(var(--bg-base))' }}>
      
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col p-4 sm:p-8 lg:p-12">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', width: 'fit-content' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={18} color="white" />
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: 'hsl(var(--text-primary))' }}>Évora</span>
        </Link>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ width: '100%', maxWidth: 400 }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'hsl(var(--text-primary))' }}>Welcome back</h1>
            <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '2.5rem' }}>Sign in to continue your French learning journey.</p>

            {error && (
              <div style={{ backgroundColor: 'hsla(0, 84%, 60%, 0.1)', color: 'hsl(0, 84%, 60%)', padding: '0.875rem', borderRadius: '0.75rem', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid hsla(0, 84%, 60%, 0.2)' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(var(--text-primary))', marginBottom: '0.5rem' }}>Email address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} color="hsl(var(--text-muted))" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: '2.75rem' }}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(var(--text-primary))', marginBottom: '0.5rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} color="hsl(var(--text-muted))" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: '2.75rem' }}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link href="#" style={{ fontSize: '0.85rem', color: 'hsl(var(--primary))', fontWeight: 500, textDecoration: 'none' }}>Forgot password?</Link>
              </div>

              <button type="submit" disabled={isLoading} className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.875rem' }}>
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.95rem', color: 'hsl(var(--text-secondary))' }}>
              Don't have an account?{' '}
              <Link href="/register" style={{ color: 'hsl(var(--primary))', fontWeight: 600, textDecoration: 'none' }}>
                Sign up for free <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-16 relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--primary-light))' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, hsla(221, 83%, 53%, 0.1) 0%, transparent 70%)' }} />
        
        <div style={{ maxWidth: 480, position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: 'hsl(var(--primary-hover))', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Master French with AI-powered feedback.
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'hsl(var(--primary))', opacity: 0.8 }}>
            Join thousands of learners achieving their required CLB score for Canadian immigration.
          </p>
        </div>
      </div>
    </div>
  );
}
