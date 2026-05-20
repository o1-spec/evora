'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { BarChart3, Trophy, BookOpen, Target, Calendar } from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';

export default function ProgressPage() {
  const { user } = useAuthStore();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => api.get('/auth/profile').then(r => r.data.user),
  });

  const completedLessons = profile?.progress?.filter((p: any) => p.isCompleted) || [];
  const totalPoints = profile?.progress?.reduce((acc: number, p: any) => acc + (p.score || 0), 0) || 0;
  const latestAttempt = profile?.examAttempts?.[0];

  const CLB_COLOR: Record<string, string> = {
    'CLB 4': '#ef4444', 'CLB 5': '#f97316', 'CLB 6': '#eab308',
    'CLB 7': '#22c55e', 'CLB 8': '#06b6d4', 'CLB 9': '#818cf8', 'CLB 10': '#c084fc',
  };

  const STATS = [
    { icon: BookOpen, label: 'Leçons complétées', value: completedLessons.length, color: '#818cf8' },
    { icon: Target, label: 'Points cumulés', value: totalPoints, color: '#34d399' },
    { icon: Trophy, label: 'Examens TCF passés', value: profile?.examAttempts?.length || 0, color: '#f59e0b' },
    { icon: BarChart3, label: 'Dernier score CLB', value: latestAttempt?.clbLevel || '–', color: latestAttempt?.clbLevel ? (CLB_COLOR[latestAttempt.clbLevel] || '#818cf8') : '#94a3b8' },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <BarChart3 size={24} color="hsl(250,95%,64%)" />
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.875rem', fontWeight: 800 }}>Votre Progression</h1>
        </div>
        <p style={{ color: 'hsl(220,12%,55%)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
          Suivez votre parcours d'apprentissage et vos résultats TCF Canada.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {STATS.map((stat, i) => (
          <motion.div key={stat.label} className="glass" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }} style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${stat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <stat.icon size={20} color={stat.color} />
            </div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: '2rem', fontWeight: 900, color: stat.color, lineHeight: 1, marginBottom: '0.5rem' }}>
              {isLoading ? '...' : stat.value}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'hsl(220,12%,55%)', lineHeight: 1.4 }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Exam History */}
      <div className="glass" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Trophy size={18} color="hsl(250,95%,64%)" /> Historique des examens TCF
        </h2>
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 56, borderRadius: 8 }} />)}
          </div>
        ) : profile?.examAttempts?.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {profile.examAttempts.map((attempt: any) => (
              <div key={attempt.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.625rem', border: '1px solid rgba(255,255,255,0.07)', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'hsl(220,12%,55%)' }}>
                  <Calendar size={14} />
                  {new Date(attempt.startedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {attempt.rawScore != null && (
                    <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1rem' }}>
                      {attempt.rawScore.toFixed(0)}%
                    </span>
                  )}
                  {attempt.clbLevel && (
                    <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.1rem', color: CLB_COLOR[attempt.clbLevel] || '#818cf8' }}>
                      {attempt.clbLevel}
                    </span>
                  )}
                  {!attempt.completedAt && <span className="badge badge-warning">En cours</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'hsl(220,12%,45%)', fontSize: '0.9rem' }}>
            Aucun examen TCF blanc passé encore. <br />
            <a href="/dashboard/exams" style={{ color: 'hsl(250,95%,64%)', textDecoration: 'none', fontWeight: 600 }}>Démarrez votre première simulation →</a>
          </div>
        )}
      </div>

      {/* Completed Lessons */}
      <div className="glass" style={{ padding: '1.75rem' }}>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={18} color="hsl(162,82%,50%)" /> Leçons terminées
        </h2>
        {completedLessons.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {completedLessons.map((p: any) => (
              <span key={p.id} className="badge badge-accent">
                ✓ {p.lesson?.title || 'Leçon'}
              </span>
            ))}
          </div>
        ) : (
          <p style={{ color: 'hsl(220,12%,45%)', fontSize: '0.9rem' }}>
            Aucune leçon terminée. <a href="/dashboard/academy" style={{ color: 'hsl(250,95%,64%)', textDecoration: 'none', fontWeight: 600 }}>Commencer l'académie →</a>
          </p>
        )}
      </div>
    </div>
  );
}
