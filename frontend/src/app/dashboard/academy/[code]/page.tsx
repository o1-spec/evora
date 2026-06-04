'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, PlayCircle, Layers, BookMarked } from 'lucide-react';
import api from '@/lib/api';

const LEVEL_COLORS: Record<string, { primary: string; bg: string; border: string }> = {
  a1: { primary: '#ef4444', bg: 'rgba(239,68,68,0.04)', border: 'rgba(239,68,68,0.2)' },
  a2: { primary: '#f97316', bg: 'rgba(249,115,22,0.04)', border: 'rgba(249,115,22,0.2)' },
  b1: { primary: '#10b981', bg: 'rgba(16,185,129,0.04)', border: 'rgba(16,185,129,0.2)' },
  b2: { primary: '#3b82f6', bg: 'rgba(59,130,246,0.04)', border: 'rgba(59,130,246,0.2)' },
  c1: { primary: '#8b5cf6', bg: 'rgba(139,92,246,0.04)', border: 'rgba(139,92,246,0.2)' },
  c2: { primary: '#64748b', bg: 'rgba(100,116,139,0.04)', border: 'rgba(100,116,139,0.2)' },
};

export default function AcademyLevelPage() {
  const { code } = useParams();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'all';
  const [activeTab, setActiveTab] = useState(initialTab);

  const codeKey = (Array.isArray(code) ? code[0] : code || '').toLowerCase();
  const colors = LEVEL_COLORS[codeKey] || { primary: 'hsl(var(--primary))', bg: 'hsl(var(--primary-light))', border: 'hsl(var(--border))' };

  const { data: level, isLoading } = useQuery({
    queryKey: ['level', code],
    queryFn: () => api.get(`/learning/levels/${code}`).then(r => r.data.level),
    enabled: !!code,
  });

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', padding: '2rem 0' }}>
        <div className="skeleton" style={{ width: '40%', height: '2rem', borderRadius: '0.5rem' }} />
        <div className="skeleton" style={{ width: '100%', height: '12rem', borderRadius: '1.25rem' }} />
        <div className="skeleton" style={{ width: '100%', height: '24rem', borderRadius: '1.25rem' }} />
      </div>
    );
  }

  if (!level) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'hsl(var(--text-secondary))' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Level Not Found</h2>
        <p style={{ marginBottom: '2rem' }}>We couldn&apos;t load the content for this level.</p>
        <Link href="/dashboard/academy" className="btn btn-primary">Return to Academy</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Back Link */}
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/dashboard/academy" style={{ textDecoration: 'none' }}>
          <motion.div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'hsl(var(--text-secondary))',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            whileHover={{ x: -4, color: 'hsl(var(--text-primary))' }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft size={16} /> Back to Levels
          </motion.div>
        </Link>
      </div>

      {/* Level Header Panel */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.bg} 0%, rgba(255,255,255,0) 100%)`,
        border: `1px solid ${colors.border}`,
        borderRadius: '1.25rem',
        padding: '2.5rem',
        marginBottom: '3rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: '1rem',
            backgroundColor: colors.primary,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 900,
            fontFamily: 'Outfit, sans-serif',
            boxShadow: `0 8px 16px -4px ${colors.primary}40`
          }}>
            {level.code}
          </div>
          <div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.25rem', fontWeight: 800, color: 'hsl(var(--text-primary))', lineHeight: 1.2 }}>
              {level.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--text-secondary))', fontSize: '0.875rem', marginTop: '0.4rem', fontWeight: 500 }}>
              <Layers size={14} color={colors.primary} />
              <span>{level.modules?.length || 0} Modules</span>
              <span style={{ color: 'hsl(var(--border))' }}>•</span>
              <BookMarked size={14} color={colors.primary} />
              <span>{level.modules?.reduce((sum: number, m: any) => sum + (m.lessons?.length || 0), 0) || 0} Lessons total</span>
            </div>
          </div>
        </div>
        <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '1rem', lineHeight: 1.6, maxWidth: '720px' }}>
          {level.description}
        </p>
      </div>

      {/* Sub-navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2.5rem',
        borderBottom: '1px solid hsl(var(--border))',
        paddingBottom: '0.75rem',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'all', label: 'All Modules' },
          { id: 'vocabulary', label: 'Vocabulary' },
          { id: 'grammar', label: 'Grammar' },
          { id: 'dialogues', label: 'Dialogues' },
          { id: 'writing', label: 'Writing' }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 500,
                backgroundColor: isActive ? colors.primary : 'transparent',
                color: isActive ? 'white' : 'hsl(var(--text-secondary))',
                boxShadow: isActive ? `0 4px 10px -2px ${colors.primary}40` : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Modules List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {level.modules
          ?.filter((mod: any) => {
            if (activeTab === 'all') return true;
            const titleLower = mod.title.toLowerCase();
            if (activeTab === 'vocabulary') return titleLower.includes('vocab');
            if (activeTab === 'grammar') return titleLower.includes('gramm');
            if (activeTab === 'dialogues') return titleLower.includes('dialog') || titleLower.includes('convers');
            if (activeTab === 'writing') return titleLower.includes('écri') || titleLower.includes('text');
            return true;
          })
          .map((mod: any, i: number) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                backgroundColor: 'white',
                border: '1px solid hsl(var(--border))',
                borderRadius: '1.25rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                overflow: 'hidden'
              }}
            >
              {/* Module Banner / Header */}
              <div style={{
                padding: '1.5rem 2rem',
                backgroundColor: 'hsl(var(--bg-base))',
                borderBottom: '1px solid hsl(var(--border))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: colors.primary }}>
                    Module {mod.orderIndex}
                  </span>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: 800, color: 'hsl(var(--text-primary))', marginTop: '0.15rem' }}>
                    {mod.title}
                  </h3>
                  <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.85rem', marginTop: '0.15rem' }}>
                    {mod.description}
                  </p>
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backgroundColor: `${colors.primary}12`,
                  color: colors.primary,
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  border: `1px solid ${colors.primary}20`
                }}>
                  {mod.lessons?.length || 0} Lessons
                </span>
              </div>

              {/* Lesson Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.25rem',
                padding: '1.75rem',
                backgroundColor: 'white'
              }}>
                {mod.lessons?.map((lesson: any) => (
                  <Link key={lesson.id} href={`/dashboard/academy/lesson/${lesson.id}`} style={{ textDecoration: 'none' }}>
                    <motion.div
                      whileHover={{ y: -3, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08)' }}
                      style={{
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s, box-shadow 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '0.5rem' }}>
                        <h4 style={{ fontWeight: 700, color: 'hsl(var(--text-primary))', fontSize: '0.95rem', lineHeight: 1.4 }}>
                          {lesson.title}
                        </h4>
                        <PlayCircle size={18} color={colors.primary} style={{ flexShrink: 0, opacity: 0.8 }} />
                      </div>

                      <p style={{
                        fontSize: '0.825rem',
                        color: 'hsl(var(--text-secondary))',
                        marginBottom: '1.5rem',
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.5
                      }}>
                        {lesson.description || 'Interactive learning materials, vocabulary exercises, and dialogue practice.'}
                      </p>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.75rem',
                        borderTop: '1px solid hsl(var(--border))',
                        paddingTop: '0.85rem'
                      }}>
                        <span style={{ color: 'hsl(var(--text-muted))', fontWeight: 600 }}>
                          Lesson {lesson.orderIndex}
                        </span>
                        <span style={{
                          color: colors.primary,
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          Start <ArrowLeft size={12} style={{ transform: 'rotate(180deg)' }} />
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                ))}

                {(!mod.lessons || mod.lessons.length === 0) && (
                  <div style={{
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    color: 'hsl(var(--text-muted))',
                    fontSize: '0.875rem',
                    gridColumn: '1 / -1',
                    border: '1px dashed hsl(var(--border))',
                    borderRadius: '1rem'
                  }}>
                    Lessons coming soon...
                  </div>
                )}
              </div>
            </motion.div>
          ))}

        {(!level.modules || level.modules.length === 0) && (
          <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'hsl(var(--text-muted))', borderRadius: '1.25rem' }}>
            No modules available for this level yet.
          </div>
        )}

        {level.modules && level.modules.length > 0 && level.modules.filter((mod: any) => {
          if (activeTab === 'all') return true;
          const titleLower = mod.title.toLowerCase();
          if (activeTab === 'vocabulary') return titleLower.includes('vocab');
          if (activeTab === 'grammar') return titleLower.includes('gramm');
          if (activeTab === 'dialogues') return titleLower.includes('dialog') || titleLower.includes('convers');
          if (activeTab === 'writing') return titleLower.includes('écri') || titleLower.includes('text');
          return true;
        }).length === 0 && (
          <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'hsl(var(--text-muted))', borderRadius: '1.25rem' }}>
            No modules available for this category yet.
          </div>
        )}
      </div>

    </div>
  );
}
