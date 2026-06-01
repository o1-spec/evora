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

  // Calculate overall progress percentage
  const overallProgress = profile?.progress?.length > 0 
    ? Math.round((completedLessons.length / profile.progress.length) * 100) 
    : 0;

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <BarChart3 size={28} color="hsl(var(--primary))" />
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800 }}>Your Progress</h1>
        </div>
        <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
          Track your learning journey and TCF Canada exam results.
        </p>
      </motion.div>

      {/* Overall Progress Bar */}
      <motion.div className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        style={{ padding: '1.75rem', marginBottom: '2rem', background: 'linear-gradient(135deg, hsl(var(--primary-light)) 0%, white 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1rem' }}>Learning Completion</h3>
          <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.5rem', color: 'hsl(var(--primary))' }}>
            {overallProgress}%
          </span>
        </div>
        <div style={{ height: '12px', backgroundColor: 'hsl(var(--border))', borderRadius: '999px', overflow: 'hidden' }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${overallProgress}%` }} transition={{ duration: 1, ease: 'easeOut' }}
            style={{ height: '100%', background: `linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)`, borderRadius: '999px' }} />
        </div>
        <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', marginTop: '0.75rem' }}>
          {completedLessons.length} of {profile?.progress?.length || 0} lessons completed
        </p>
      </motion.div>

      {/* Stats Grid - Enhanced */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {STATS.map((stat, i) => (
          <motion.div key={stat.label} className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i + 1) * 0.08 }} style={{ padding: '1.75rem', textAlign: 'center', background: i % 2 === 0 ? 'white' : 'hsl(var(--bg-base))' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: i % 2 === 0 ? 'hsl(var(--bg-base))' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', border: '1.5px solid hsl(var(--border))' }}>
              <stat.icon size={22} color={stat.color} />
            </div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 900, color: stat.color, lineHeight: 1, marginBottom: '0.75rem' }}>
              {isLoading ? '...' : typeof stat.value === 'string' ? stat.value : stat.value}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', lineHeight: 1.4, fontWeight: 500 }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam History - Enhanced */}
        <motion.div className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ padding: '1.75rem', background: 'linear-gradient(135deg, white 0%, hsl(var(--bg-base)) 100%)' }}>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--text-primary))' }}>
            <Trophy size={20} color="hsl(var(--primary))" /> TCF Exam History
          </h2>
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 60, borderRadius: 10 }} />)}
            </div>
          ) : profile?.examAttempts?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {profile.examAttempts.slice(0, 5).map((attempt: any, idx: number) => (
                <motion.div key={attempt.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + idx * 0.05 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-[hsl(var(--border))] gap-3 hover:border-[hsl(var(--primary))] hover:shadow-sm transition-all"
                  style={{ background: idx === 0 ? 'hsl(var(--primary-light))' : 'white', borderColor: idx === 0 ? 'hsl(var(--primary))' : undefined }}>
                  <div className="flex items-center gap-3 flex-1">
                    <Calendar size={16} color="hsl(var(--text-secondary))" />
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', fontWeight: 500 }}>
                        {new Date(attempt.startedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      {attempt.title && <div style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>{attempt.title}</div>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {attempt.rawScore != null && (
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'hsl(var(--text-primary))' }}>
                          {attempt.rawScore.toFixed(0)}%
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'hsl(var(--text-muted))', fontWeight: 500 }}>Score</div>
                      </div>
                    )}
                    {attempt.clbLevel && (
                      <div style={{ textAlign: 'center', padding: '0.5rem 1rem', borderRadius: 8, backgroundColor: CLB_COLOR[attempt.clbLevel] + '20', border: `1.5px solid ${CLB_COLOR[attempt.clbLevel]}` }}>
                        <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1rem', color: CLB_COLOR[attempt.clbLevel] }}>
                          {attempt.clbLevel}
                        </span>
                      </div>
                    )}
                    {!attempt.completedAt && <span className="badge badge-secondary" style={{ fontSize: '0.7rem', fontWeight: 600 }}>In Progress</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'hsl(var(--text-muted))', fontSize: '0.9rem' }}>
              <Trophy size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p>No mock exams taken yet.</p>
              <a href="/dashboard/exams" style={{ color: 'hsl(var(--primary))', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginTop: '1rem' }}>Start your first simulation →</a>
            </div>
          )}
        </motion.div>

        {/* Completed Lessons - Enhanced */}
        <motion.div className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          style={{ padding: '1.75rem', background: 'linear-gradient(135deg, white 0%, hsl(var(--bg-base)) 100%)' }}>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--text-primary))' }}>
            <BookOpen size={20} color="hsl(var(--accent))" /> Completed Lessons
          </h2>
          {completedLessons.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {completedLessons.map((p: any, idx: number) => (
                <motion.span key={p.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + idx * 0.05 }}
                  className="badge" style={{ backgroundColor: 'hsl(var(--accent-light))', color: 'hsl(var(--accent))', fontWeight: 600, padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  ✓ {p.lesson?.title || 'Lesson'}
                </motion.span>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'hsl(var(--text-muted))', fontSize: '0.9rem' }}>
              <BookOpen size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p>No lessons completed yet.</p>
              <a href="/dashboard/academy" style={{ color: 'hsl(var(--primary))', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginTop: '1rem' }}>Start learning →</a>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
