'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, ArrowRight, Loader2, Mail, Lock, User } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(formData);
      router.push('/dashboard/academy');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'hsl(var(--bg-base))' }}>
      
      {/* Left side - Visual */}
      <div style={{ flex: 1, backgroundColor: 'hsl(var(--primary-light))', display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', position: 'relative', overflow: 'hidden' }} className="lg:flex">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, hsla(221, 83%, 53%, 0.1) 0%, transparent 70%)' }} />
        
        <div style={{ maxWidth: 480, position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: 'hsl(var(--primary-hover))', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Start your TCF Canada preparation today.
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'hsl(var(--primary))', opacity: 0.8 }}>
            Create a free account to access authentic mock exams and interactive French lessons.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={18} color="white" />
            </div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: 'hsl(var(--text-primary))' }}>Évora</span>
          </Link>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ width: '100%', maxWidth: 440 }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'hsl(var(--text-primary))' }}>Create an account</h1>
            <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '2.5rem' }}>Join Évora and start improving your French skills.</p>

            {error && (
              <div style={{ backgroundColor: 'hsla(0, 84%, 60%, 0.1)', color: 'hsl(0, 84%, 60%)', padding: '0.875rem', borderRadius: '0.75rem', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid hsla(0, 84%, 60%, 0.2)' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(var(--text-primary))', marginBottom: '0.5rem' }}>First name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} color="hsl(var(--text-muted))" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="input-field"
                      style={{ paddingLeft: '2.75rem' }}
                      placeholder="Jane"
                    />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(var(--text-primary))', marginBottom: '0.5rem' }}>Last name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} color="hsl(var(--text-muted))" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="input-field"
                      style={{ paddingLeft: '2.75rem' }}
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'hsl(var(--text-primary))', marginBottom: '0.5rem' }}>Email address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} color="hsl(var(--text-muted))" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
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
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                    style={{ paddingLeft: '2.75rem' }}
                    placeholder="Create a strong password"
                  />
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.875rem' }}>
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Create Account'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.95rem', color: 'hsl(var(--text-secondary))' }}>
              Already have an account?{' '}
              <Link href="/login" style={{ color: 'hsl(var(--primary))', fontWeight: 600, textDecoration: 'none' }}>
                Sign in <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
