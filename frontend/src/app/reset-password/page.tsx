'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight, Loader2, Lock, Eye, EyeOff, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import api from '@/lib/api';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Le jeton de réinitialisation est manquant.');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setIsLoading(true);

    try {
      await api.post('/auth/reset-password', {
        resetToken: token,
        newPassword: password
      });
      setSuccess(true);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.error || "Le lien de réinitialisation est invalide ou a expiré. Veuillez refaire une demande.");
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="p-6 sm:p-10 text-center" style={{
        backgroundColor: 'white',
        borderRadius: '2rem',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(15, 23, 42, 0.02)',
        border: '1px solid rgba(226, 232, 240, 0.8)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '1.25rem', backgroundColor: '#fffbeb', color: '#d97706', marginBottom: '1.5rem' }}>
          <AlertTriangle size={32} />
        </div>
        <h1 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 900, fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          Lien invalide
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 500 }}>
          Ce lien de réinitialisation de mot de passe est incomplet ou invalide. Veuillez vérifier le lien envoyé ou faire une nouvelle demande.
        </p>
        <Link href="/forgot-password" className="btn-primary" style={{
          width: '100%',
          padding: '0.9rem',
          fontSize: '0.95rem',
          fontWeight: 700,
          borderRadius: '0.85rem',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px -4px rgba(59,130,246,0.2)'
        }}>
          <span>Demander un nouveau lien</span>
        </Link>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!success ? (
        <motion.div
          key="reset-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="p-6 sm:p-10"
          style={{
            backgroundColor: 'white',
            borderRadius: '2rem',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(15, 23, 42, 0.02)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            width: '100%'
          }}
        >
          {/* Sparkle Pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'rgba(59,130,246,0.06)', color: 'hsl(var(--primary))', padding: '0.35rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            <Sparkles size={12} />
            Sécurisation de compte
          </div>

          <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: '#0f172a', fontWeight: 900, fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Nouveau mot de passe
          </h1>
          <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.5 }}>
            Choisissez un nouveau mot de passe fort pour sécuriser votre compte.
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '1rem', borderRadius: '0.85rem', marginBottom: '1.75rem', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #fee2e2', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>Nouveau mot de passe</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  style={{
                    paddingLeft: '2.75rem',
                    paddingRight: '2.75rem',
                    padding: '0.9rem 2.75rem',
                    borderRadius: '0.85rem',
                    border: '1.5px solid #e2e8f0',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}
                >
                  {showPassword ? (
                    <EyeOff size={16} color="#94a3b8" />
                  ) : (
                    <Eye size={16} color="#94a3b8" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>Confirmer le mot de passe</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                  style={{
                    paddingLeft: '2.75rem',
                    paddingRight: '2.75rem',
                    padding: '0.9rem 2.75rem',
                    borderRadius: '0.85rem',
                    border: '1.5px solid #e2e8f0',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} color="#94a3b8" />
                  ) : (
                    <Eye size={16} color="#94a3b8" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{
                marginTop: '0.5rem',
                width: '100%',
                padding: '0.9rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                borderRadius: '0.85rem',
                boxShadow: '0 8px 20px -4px rgba(59,130,246,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <span>Réinitialiser le mot de passe</span>
                  <ArrowRight size={15} style={{ marginLeft: '0.35rem' }} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          key="reset-success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="p-6 sm:p-10 text-center"
          style={{
            backgroundColor: 'white',
            borderRadius: '2rem',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(15, 23, 42, 0.02)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            width: '100%'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '1.25rem', backgroundColor: '#ecfdf5', color: '#10b981', marginBottom: '1.5rem' }}>
            <CheckCircle2 size={32} />
          </div>

          <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 900, fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Mot de passe modifié !
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 500 }}>
            Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter à votre compte avec votre nouveau mot de passe.
          </p>

          <Link href="/login" className="btn-primary" style={{
            width: '100%',
            padding: '0.9rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            borderRadius: '0.85rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px -4px rgba(59,130,246,0.2)'
          }}>
            <span>Se connecter</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-6 relative" style={{
      backgroundColor: '#f8fafc',
      background: 'radial-gradient(at 0% 0%, hsla(262, 83%, 58%, 0.04) 0px, transparent 50%), radial-gradient(at 100% 100%, hsla(262, 83%, 58%, 0.04) 0px, transparent 50%)'
    }}>
      {/* Brand Logo Header (Centered on Mobile, Absolute top-left on Desktop) */}
      <div className="absolute top-8 left-8 hidden md:block">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(59,130,246,0.2)' }}>
            <Globe size={20} color="white" />
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#0f172a', letterSpacing: '-0.02em' }}>Évora</span>
        </Link>
      </div>

      <div className="md:hidden absolute top-6 text-center">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={18} color="white" />
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.3rem', color: '#0f172a' }}>Évora</span>
        </Link>
      </div>

      <div className="w-full max-w-[440px]">
        <Suspense fallback={
          <div className="p-6 sm:p-10 text-center" style={{
            backgroundColor: 'white',
            borderRadius: '2rem',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px'
          }}>
            <Loader2 className="animate-spin text-violet-600" size={32} />
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
