'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, ArrowRight, Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen" style={{ backgroundColor: 'hsl(var(--bg-base))', padding: '1.5rem' }}>

      {/* Top Header - Logo (Mobile & Tablet) */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Globe size={20} color="white" />
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: 'hsl(var(--text-primary))' }}>Évora</span>
        </Link>
      </div>

      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:p-16">
        <div className="hidden lg:flex absolute top-8 left-12">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', width: 'fit-content' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={20} color="white" />
            </div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: 'hsl(var(--text-primary))' }}>Évora</span>
          </Link>
        </div>

        <div className="flex items-center justify-center min-h-screen lg:min-h-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ width: '100%', maxWidth: 460 }}>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', marginBottom: '1rem', color: 'hsl(var(--text-primary))', fontWeight: 800, lineHeight: 1.2 }}>Welcome back</h1>
            <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '3rem', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', lineHeight: 1.6 }}>Sign in to continue your French learning journey.</p>

            {error && (
              <div style={{ backgroundColor: 'hsla(0, 84%, 60%, 0.1)', color: 'hsl(0, 84%, 60%)', padding: '1rem', borderRadius: '0.75rem', marginBottom: '2rem', fontSize: '0.9rem', border: '1px solid hsla(0, 84%, 60%, 0.2)' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'hsl(var(--text-primary))', marginBottom: '0.75rem' }}>Email address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} color="hsl(var(--text-muted))" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: '2.75rem', padding: '1rem 1.25rem 1rem 2.75rem' }}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'hsl(var(--text-primary))', marginBottom: '0.75rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} color="hsl(var(--text-muted))" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem', padding: '1rem 2.75rem' }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}
                  >
                    {showPassword ? (
                      <EyeOff size={18} color="hsl(var(--text-muted))" />
                    ) : (
                      <Eye size={18} color="hsl(var(--text-muted))" />
                    )}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <Link href="#" style={{ fontSize: '0.9rem', color: 'hsl(var(--primary))', fontWeight: 500, textDecoration: 'none' }}>Forgot password?</Link>
              </div>

              <button type="submit" disabled={isLoading} className="btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1rem', fontSize: '1rem', fontWeight: 600 }}>
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1rem', color: 'hsl(var(--text-secondary))' }}>
              Don't have an account?{' '}
              <Link href="/register" style={{ color: 'hsl(var(--primary))', fontWeight: 600, textDecoration: 'none' }}>
                Sign up for free <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '0.25rem' }} />
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Visual (Desktop only) */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-16 relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--primary-light))' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, hsla(221, 83%, 53%, 0.1) 0%, transparent 70%)' }} />
        
        <div style={{ maxWidth: 480, position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: 'hsl(var(--primary-hover))', marginBottom: '1.5rem', lineHeight: 1.2 }}>
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
