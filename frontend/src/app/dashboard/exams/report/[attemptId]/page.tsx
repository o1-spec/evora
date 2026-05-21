'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Trophy, ArrowLeft, CheckCircle, AlertCircle, Target } from 'lucide-react';
import api from '@/lib/api';

const CLB_COLOR: Record<string, string> = {
  'CLB 4': '#ef4444', 'CLB 5': '#f97316', 'CLB 6': '#eab308',
  'CLB 7': '#22c55e', 'CLB 8': '#06b6d4', 'CLB 9': '#818cf8', 'CLB 10': '#a855f7',
};

export default function ExamReportPage() {
  const { attemptId } = useParams<{ attemptId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['attempt-report', attemptId],
    queryFn: () => api.get(`/tcf/attempts/${attemptId}/report`).then(r => r.data.attempt),
    enabled: !!attemptId,
  });

  const clbColor = data?.clbLevel ? CLB_COLOR[data.clbLevel] || 'hsl(var(--primary))' : 'hsl(var(--primary))';

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Link href="/dashboard/exams" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--text-secondary))', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 500 }}>
        <ArrowLeft size={16} /> Back to Exams
      </Link>

      {isLoading ? (
        <div>
          <div className="skeleton" style={{ height: 240, borderRadius: 16, marginBottom: '2rem' }} />
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 180, borderRadius: 16, marginBottom: '1.5rem' }} />)}
        </div>
      ) : data ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          {/* Score Card */}
          <div className="card-elevated" style={{ padding: '3rem 2rem', textAlign: 'center', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden', borderTop: `4px solid ${clbColor}` }}>
            <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${clbColor}15 0%, transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <Trophy size={48} color={clbColor} style={{ margin: '0 auto 1.25rem', display: 'block' }} />
              <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.875rem', fontWeight: 800, marginBottom: '0.5rem', color: 'hsl(var(--text-primary))' }}>
                TCF Canada Mock Exam Results
              </h1>
              <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '2.5rem', fontSize: '0.95rem' }}>{data.exam?.title}</p>

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 justify-center">
                <div>
                  <div style={{ fontSize: '4rem', fontWeight: 900, fontFamily: 'Outfit,sans-serif', color: 'hsl(var(--text-primary))', lineHeight: 1 }}>
                    {data.rawScore?.toFixed(0)}%
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))', marginTop: '0.5rem', fontWeight: 500 }}>Overall Score</div>
                </div>
                <div>
                  <div style={{ fontSize: '4rem', fontWeight: 900, fontFamily: 'Outfit,sans-serif', color: clbColor, lineHeight: 1 }}>
                    {data.clbLevel}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))', marginTop: '0.5rem', fontWeight: 500 }}>Estimated CLB Level</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Feedbacks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {data.feedbacks?.map((fb: any, i: number) => (
              <motion.div key={fb.id} className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} style={{ padding: '2rem' }}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                  <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.25rem', fontWeight: 700, color: 'hsl(var(--text-primary))' }}>
                    {fb.sectionType.replace('_', ' ')}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.5rem', fontWeight: 800, color: CLB_COLOR['CLB ' + Math.round(fb.overallScore / 10)] || 'hsl(var(--primary))' }}>
                      {fb.overallScore?.toFixed(0)}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="progress-track" style={{ marginBottom: '2rem' }}>
                  <div className="progress-fill" style={{ width: `${fb.overallScore}%`, backgroundColor: CLB_COLOR['CLB ' + Math.round(fb.overallScore / 10)] || 'hsl(var(--primary))' }} />
                </div>

                {/* Strengths */}
                {fb.strengths?.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 600, color: 'hsl(142, 71%, 45%)' }}>
                      <CheckCircle size={16} /> Key Strengths
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {(fb.strengths as string[]).map((s, si) => (
                        <li key={si} style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))', paddingLeft: '1.5rem', position: 'relative', lineHeight: 1.5 }}>
                          <span style={{ position: 'absolute', left: 0, color: 'hsl(142, 71%, 45%)' }}>•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weaknesses */}
                {fb.weaknesses?.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 600, color: 'hsl(0, 84%, 60%)' }}>
                      <AlertCircle size={16} /> Areas to Improve
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {(fb.weaknesses as string[]).map((w, wi) => (
                        <li key={wi} style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))', paddingLeft: '1.5rem', position: 'relative', lineHeight: 1.5 }}>
                          <span style={{ position: 'absolute', left: 0, color: 'hsl(0, 84%, 60%)' }}>•</span> {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Corrections */}
                {fb.corrections?.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'hsl(var(--text-primary))', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Target size={16} color="hsl(var(--primary))" /> Detailed Corrections
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {(fb.corrections as any[]).map((c, ci) => (
                        <div key={ci} style={{ backgroundColor: 'hsl(var(--bg-base))', borderRadius: '0.75rem', padding: '1rem', border: '1px solid hsl(var(--border))' }}>
                          <div style={{ fontSize: '0.9rem', color: 'hsl(0, 84%, 55%)', marginBottom: '0.5rem', textDecoration: 'line-through' }}>
                            ✗ {c.original}
                          </div>
                          <div style={{ fontSize: '0.9rem', color: 'hsl(142, 71%, 45%)', marginBottom: '0.5rem', fontWeight: 500 }}>
                            ✓ {c.suggested}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', fontStyle: 'italic', lineHeight: 1.5 }}>{c.explanation}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', backgroundColor: 'hsl(var(--primary-light))', borderRadius: '0.75rem', borderLeft: '3px solid hsl(var(--primary))', fontSize: '0.9rem', color: 'hsl(var(--text-primary))', lineHeight: 1.6 }}>
                  {fb.comments}
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/dashboard/exams" className="btn-secondary">Take Another Exam</Link>
            <Link href="/dashboard/tutor" className="btn-primary">Practice with AI Tutor</Link>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
