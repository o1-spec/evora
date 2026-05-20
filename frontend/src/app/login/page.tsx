'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Globe, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/dashboard/academy');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Identifiants incorrects. Veuillez réessayer.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'hsl(225,20%,6%)', padding: '2rem', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, hsla(250,95%,64%,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, hsla(162,82%,50%,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="glass-strong" style={{ width: '100%', maxWidth: 440, padding: '2.75rem 2.5rem' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, hsl(250,95%,64%), hsl(162,82%,50%))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={20} color="white" />
          </div>
          <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.25rem' }}>Évora</span>
        </div>

        <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Bon retour ! 👋</h1>
        <p style={{ color: 'hsl(220,12%,55%)', fontSize: '0.9rem', marginBottom: '2rem' }}>Connectez-vous pour continuer votre apprentissage.</p>

        {error && (
          <div style={{ background: 'hsla(0,84%,60%,0.12)', border: '1px solid hsla(0,84%,60%,0.3)', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.5rem', color: 'hsl(0,84%,70%)', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'hsl(220,12%,75%)' }}>Adresse email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="vous@exemple.com" className="input-field" required />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'hsl(220,12%,75%)' }}>Mot de passe</label>
            <div style={{ position: 'relative' }}>
              <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="input-field" style={{ paddingRight: '3rem' }} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(220,12%,50%)', display: 'flex' }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="/forgot-password" style={{ fontSize: '0.8rem', color: 'hsl(250,95%,70%)', textDecoration: 'none' }}>Mot de passe oublié ?</Link>
          </div>
          <button id="login-btn" type="submit" disabled={isLoading} className="btn-primary" style={{ width: '100%', marginTop: '0.25rem' }}>
            {isLoading ? <><Loader2 size={18} /> Connexion...</> : 'Se connecter'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.875rem', color: 'hsl(220,12%,55%)' }}>
          Pas encore de compte ?{' '}
          <Link href="/register" style={{ color: 'hsl(250,95%,70%)', fontWeight: 600, textDecoration: 'none' }}>S'inscrire gratuitement</Link>
        </p>
      </motion.div>
    </div>
  );
}
