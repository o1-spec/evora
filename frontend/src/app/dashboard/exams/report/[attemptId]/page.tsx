'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Trophy, ArrowLeft, CheckCircle, AlertCircle, Target } from 'lucide-react';
import api from '@/lib/api';

const CLB_COLOR: Record<string, string> = {
  'CLB 4': '#ef4444', 'CLB 5': '#f97316', 'CLB 6': '#eab308',
  'CLB 7': '#22c55e', 'CLB 8': '#06b6d4', 'CLB 9': '#818cf8', 'CLB 10': '#c084fc',
};

export default function ExamReportPage() {
  const { attemptId } = useParams<{ attemptId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['attempt-report', attemptId],
    queryFn: () => api.get(`/tcf/attempts/${attemptId}/report`).then(r => r.data.attempt),
    enabled: !!attemptId,
  });

  const clbColor = data?.clbLevel ? CLB_COLOR[data.clbLevel] || '#818cf8' : '#818cf8';

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Link href="/dashboard/exams" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(220,12%,55%)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> Retour aux examens
      </Link>

      {isLoading ? (
        <div>
          <div className="skeleton" style={{ height: 200, borderRadius: 16, marginBottom: '1.5rem' }} />
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 150, borderRadius: 12, marginBottom: '1rem' }} />)}
        </div>
      ) : data ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          {/* Score Card */}
          <div className="glass-strong glow-primary" style={{ padding: '2.5rem', textAlign: 'center', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${clbColor}18 0%, transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <Trophy size={40} color={clbColor} style={{ margin: '0 auto 1rem', display: 'block' }} />
              <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Résultats de votre simulation TCF Canada
              </h1>
              <p style={{ color: 'hsl(220,12%,55%)', marginBottom: '2rem', fontSize: '0.9rem' }}>{data.exam?.title}</p>

              <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '4rem', fontWeight: 900, fontFamily: 'Outfit,sans-serif', color: clbColor, lineHeight: 1 }}>
                    {data.rawScore?.toFixed(0)}%
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'hsl(220,12%,55%)', marginTop: '0.5rem' }}>Score global</div>
                </div>
                <div>
                  <div style={{ fontSize: '4rem', fontWeight: 900, fontFamily: 'Outfit,sans-serif', color: clbColor, lineHeight: 1 }}>
                    {data.clbLevel}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'hsl(220,12%,55%)', marginTop: '0.5rem' }}>Niveau CLB estimé</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Feedbacks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {data.feedbacks?.map((fb: any, i: number) => (
              <motion.div key={fb.id} className="glass" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.1rem', fontWeight: 700 }}>
                    {fb.sectionType}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.5rem', fontWeight: 800, color: CLB_COLOR['CLB ' + Math.round(fb.overallScore / 10)] || '#818cf8' }}>
                      {fb.overallScore?.toFixed(0)}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="progress-track" style={{ marginBottom: '1.5rem' }}>
                  <div className="progress-fill" style={{ width: `${fb.overallScore}%` }} />
                </div>

                {/* Strengths */}
                {fb.strengths?.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem', fontSize: '0.85rem', fontWeight: 600, color: 'hsl(162,82%,55%)' }}>
                      <CheckCircle size={15} /> Points forts
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      {(fb.strengths as string[]).map((s, si) => (
                        <li key={si} style={{ fontSize: '0.875rem', color: 'hsl(220,12%,65%)', paddingLeft: '1.25rem', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'hsl(162,82%,55%)' }}>•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weaknesses */}
                {fb.weaknesses?.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem', fontSize: '0.85rem', fontWeight: 600, color: 'hsl(37,95%,65%)' }}>
                      <AlertCircle size={15} /> Points à améliorer
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      {(fb.weaknesses as string[]).map((w, wi) => (
                        <li key={wi} style={{ fontSize: '0.875rem', color: 'hsl(220,12%,65%)', paddingLeft: '1.25rem', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'hsl(37,95%,65%)' }}>•</span> {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Corrections */}
                {fb.corrections?.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'hsl(220,12%,70%)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Target size={15} /> Corrections détaillées
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {(fb.corrections as any[]).map((c, ci) => (
                        <div key={ci} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', padding: '0.875rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ fontSize: '0.85rem', color: 'hsl(0,75%,65%)', marginBottom: '0.375rem' }}>
                            ✗ {c.original}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: 'hsl(162,82%,55%)', marginBottom: '0.375rem' }}>
                            ✓ {c.suggested}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'hsl(220,12%,50%)', fontStyle: 'italic' }}>{c.explanation}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ marginTop: '1.25rem', padding: '0.875rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.625rem', borderLeft: '2px solid hsl(250,95%,64%)', fontSize: '0.875rem', color: 'hsl(220,12%,65%)', lineHeight: 1.7 }}>
                  {fb.comments}
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/dashboard/exams" className="btn-secondary">Nouvel examen</Link>
            <Link href="/dashboard/tutor" className="btn-primary">Travailler avec le tuteur IA →</Link>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
