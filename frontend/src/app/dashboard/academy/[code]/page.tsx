'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, PlayCircle, BookOpen, Clock } from 'lucide-react';
import api from '@/lib/api';

export default function AcademyLevelPage() {
  const { code } = useParams();
  const router = useRouter();

  const { data: level, isLoading } = useQuery({
    queryKey: ['level', code],
    queryFn: () => api.get(`/learning/levels/${code}`).then(r => r.data),
    enabled: !!code,
  });

  if (isLoading) return <div className="skeleton" style={{ width: '100%', height: 400 }} />;
  if (!level) return <div>Level not found.</div>;

  return (
    <div>
      <Link href="/dashboard/academy" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--text-secondary))', marginBottom: '2rem', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }} className="hover:text-slate-900 transition-colors">
        <ArrowLeft size={16} /> Back to Levels
      </Link>

      <div style={{ marginBottom: '3rem', borderBottom: '1px solid hsl(var(--border))', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: 'hsl(var(--primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, color: 'hsl(var(--primary))', fontFamily: 'Outfit,sans-serif' }}>
            {level.code}
          </div>
          <div>
            <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '2rem', fontWeight: 800, color: 'hsl(var(--text-primary))' }}>{level.name}</h1>
            <div style={{ display: 'flex', gap: '1rem', color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><BookOpen size={14} /> {level.modules?.length || 0} Modules</span>
            </div>
          </div>
        </div>
        <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '1.05rem', maxWidth: 800, lineHeight: 1.6 }}>
          {level.description}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {level.modules?.map((mod: any, i: number) => (
          <motion.div key={mod.id} className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} style={{ overflow: 'hidden' }}>
            
            <div style={{ padding: '1.5rem', backgroundColor: 'hsl(var(--bg-base))', borderBottom: '1px solid hsl(var(--border))', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.25rem', fontWeight: 700, color: 'hsl(var(--text-primary))', marginBottom: '0.25rem' }}>
                  Module {mod.orderIndex}: {mod.title}
                </h3>
                <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem' }}>{mod.description}</p>
              </div>
              <div className="badge badge-secondary">
                {mod.lessons?.length || 0} Lessons
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', backgroundColor: 'hsl(var(--border))' }}>
              {mod.lessons?.map((lesson: any) => (
                <Link key={lesson.id} href={`/dashboard/academy/lesson/${lesson.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ backgroundColor: 'white', padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', transition: 'background-color 0.2s' }} className="hover:bg-slate-50">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <h4 style={{ fontWeight: 600, color: 'hsl(var(--text-primary))', fontSize: '1rem', lineHeight: 1.4 }}>{lesson.title}</h4>
                      <PlayCircle size={18} color="hsl(var(--primary))" style={{ flexShrink: 0, opacity: 0.5 }} />
                    </div>
                    
                    <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', marginBottom: '1.5rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {lesson.content?.substring(0, 100) || 'Interactive lesson content...'}...
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span className="badge badge-secondary" style={{ backgroundColor: 'transparent' }}>Lesson {lesson.orderIndex}</span>
                      <span style={{ color: 'hsl(var(--primary))', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Start <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} /></span>
                    </div>
                  </div>
                </Link>
              ))}
              {(!mod.lessons || mod.lessons.length === 0) && (
                <div style={{ backgroundColor: 'white', padding: '2rem', textAlign: 'center', color: 'hsl(var(--text-muted))', fontSize: '0.9rem', gridColumn: '1 / -1' }}>
                  Lessons coming soon...
                </div>
              )}
            </div>

          </motion.div>
        ))}
        {(!level.modules || level.modules.length === 0) && (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'hsl(var(--text-muted))' }}>
            No modules available for this level yet.
          </div>
        )}
      </div>
    </div>
  );
}
