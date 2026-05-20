'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, BookOpen, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import api from '@/lib/api';

export default function LevelPage() {
  const { code } = useParams<{ code: string }>();

  const { data: level, isLoading } = useQuery({
    queryKey: ['level', code],
    queryFn: () => api.get(`/learning/levels/${code}`).then(r => r.data.level),
    enabled: !!code,
  });

  return (
    <div>
      <Link href="/dashboard/academy" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(220,12%,55%)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> Retour à l'Académie
      </Link>

      {isLoading ? (
        <div>
          <div className="skeleton" style={{ height: 32, width: 200, borderRadius: 8, marginBottom: '0.5rem' }} />
          <div className="skeleton" style={{ height: 20, width: 350, borderRadius: 8, marginBottom: '2rem' }} />
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 120, borderRadius: 12, marginBottom: '1rem' }} />)}
        </div>
      ) : level ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{level.name}</h1>
          <p style={{ color: 'hsl(220,12%,55%)', marginBottom: '2.5rem' }}>{level.description}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {level.modules?.map((module: any, mi: number) => (
              <motion.div key={module.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: mi * 0.1 }} className="glass" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'hsla(250,95%,64%,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BookOpen size={18} color="hsl(250,95%,70%)" />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.1rem', fontWeight: 700 }}>{module.title}</h2>
                    <p style={{ color: 'hsl(220,12%,55%)', fontSize: '0.8rem' }}>{module.lessons?.length || 0} leçons</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {module.lessons?.map((lesson: any, li: number) => {
                    const completed = lesson.progress?.[0]?.isCompleted;
                    return (
                      <Link key={lesson.id} href={`/dashboard/academy/lesson/${lesson.id}`}
                        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1rem', borderRadius: '0.625rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', transition: 'all 0.15s', cursor: 'pointer' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: completed ? 'hsla(162,82%,50%,0.2)' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {completed
                            ? <CheckCircle size={16} color="hsl(162,82%,50%)" />
                            : <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'hsl(220,12%,55%)' }}>{li + 1}</span>
                          }
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 500, fontSize: '0.9rem', color: completed ? 'hsl(162,82%,60%)' : 'hsl(220,18%,90%)' }}>{lesson.title}</div>
                          <div style={{ fontSize: '0.78rem', color: 'hsl(220,12%,50%)', marginTop: '0.15rem' }}>{lesson.description}</div>
                        </div>
                        {completed && <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>✓ Terminé</span>}
                        <ChevronRight size={16} color="hsl(220,12%,40%)" />
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'hsl(220,12%,50%)' }}>Niveau introuvable.</p>
        </div>
      )}
    </div>
  );
}
