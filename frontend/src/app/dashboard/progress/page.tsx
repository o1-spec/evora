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
    { icon: BookOpen, label: 'Lessons Completed', value: completedLessons.length, color: 'hsl(var(--primary))' },
    { icon: Target, label: 'Total Points', value: totalPoints, color: 'hsl(var(--accent))' },
    { icon: Trophy, label: 'Exams Taken', value: profile?.examAttempts?.length || 0, color: '#f59e0b' },
    { icon: BarChart3, label: 'Latest CLB Score', value: latestAttempt?.clbLevel || '–', color: latestAttempt?.clbLevel ? (CLB_COLOR[latestAttempt.clbLevel] || 'hsl(var(--primary))') : 'hsl(var(--text-muted))' },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <BarChart3 size={24} color="hsl(var(--primary))" />
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.875rem', fontWeight: 800 }}>Your Progress</h1>
        </div>
        <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
          Track your learning journey and TCF Canada exam results.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        {STATS.map((stat, i) => (
          <motion.div key={stat.label} className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }} style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'hsl(var(--bg-base))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', border: '1px solid hsl(var(--border))' }}>
              <stat.icon size={20} color={stat.color} />
            </div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: '2rem', fontWeight: 900, color: stat.color, lineHeight: 1, marginBottom: '0.5rem' }}>
              {isLoading ? '...' : stat.value}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', lineHeight: 1.4, fontWeight: 500 }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam History */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy size={18} color="hsl(var(--primary))" /> TCF Exam History
          </h2>
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 56, borderRadius: 8 }} />)}
            </div>
          ) : profile?.examAttempts?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {profile.examAttempts.map((attempt: any) => (
                <div key={attempt.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[hsl(var(--bg-base))] rounded-xl border border-[hsl(var(--border))] gap-3">
                  <div className="flex items-center gap-2 text-sm text-[hsl(var(--text-secondary))]">
                    <Calendar size={14} />
                    {new Date(attempt.startedAt).toLocaleDateString()}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {attempt.rawScore != null && (
                      <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1rem', color: 'hsl(var(--text-primary))' }}>
                        {attempt.rawScore.toFixed(0)}%
                      </span>
                    )}
                    {attempt.clbLevel && (
                      <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.1rem', color: CLB_COLOR[attempt.clbLevel] || 'hsl(var(--primary))' }}>
                        {attempt.clbLevel}
                      </span>
                    )}
                    {!attempt.completedAt && <span className="badge badge-secondary" style={{ backgroundColor: 'white' }}>In Progress</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'hsl(var(--text-muted))', fontSize: '0.9rem' }}>
              No mock exams taken yet. <br />
              <a href="/dashboard/exams" style={{ color: 'hsl(var(--primary))', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginTop: '0.5rem' }}>Start your first simulation &rarr;</a>
            </div>
          )}
        </div>

        {/* Completed Lessons */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={18} color="hsl(var(--accent))" /> Completed Lessons
          </h2>
          {completedLessons.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {completedLessons.map((p: any) => (
                <span key={p.id} className="badge badge-secondary" style={{ backgroundColor: 'hsl(var(--bg-base))' }}>
                  ✓ {p.lesson?.title || 'Lesson'}
                </span>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'hsl(var(--text-muted))', fontSize: '0.9rem' }}>
              No lessons completed yet. <br />
              <a href="/dashboard/academy" style={{ color: 'hsl(var(--primary))', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginTop: '0.5rem' }}>Start learning &rarr;</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
