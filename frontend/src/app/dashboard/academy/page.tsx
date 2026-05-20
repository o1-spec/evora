'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, ChevronRight, CheckCircle, Lock, Star } from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';

const LEVEL_COLORS: Record<string, { from: string; to: string }> = {
  A1: { from: '#6366f1', to: '#818cf8' },
  A2: { from: '#8b5cf6', to: '#a78bfa' },
  B1: { from: '#06b6d4', to: '#67e8f9' },
  B2: { from: '#10b981', to: '#6ee7b7' },
  C1: { from: '#f59e0b', to: '#fbbf24' },
  C2: { from: '#f43f5e', to: '#fb7185' },
};

export default function AcademyPage() {
  const { loadFromStorage } = useAuthStore();
  useEffect(() => { loadFromStorage(); }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['levels'],
    queryFn: () => api.get('/learning/levels').then(r => r.data.levels),
  });

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <BookOpen size={24} color="hsl(250,95%,64%)" />
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.875rem', fontWeight: 800 }}>Académie Française</h1>
        </div>
        <p style={{ color: 'hsl(220,12%,55%)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
          6 niveaux CECRL — de A1 Débutant à C2 Expert. Progressez à votre rythme avec notre IA.
        </p>
      </motion.div>

      {isLoading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 180, borderRadius: 16 }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {(data || []).map((level: any, i: number) => {
            const colors = LEVEL_COLORS[level.code] || { from: '#6366f1', to: '#818cf8' };
            const totalLessons = level.modules?.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0) || 0;

            return (
              <motion.div key={level.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.18 } }}>
                <Link href={`/dashboard/academy/${level.code}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="glass" style={{
                    padding: '1.75rem',
                    borderTop: `3px solid ${colors.from}`,
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{
                        width: 52, height: 52, borderRadius: 14,
                        background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.25rem', fontWeight: 900, fontFamily: 'Outfit,sans-serif', color: 'white',
                      }}>
                        {level.code}
                      </div>
                      <ChevronRight size={20} color="hsl(220,12%,45%)" />
                    </div>

                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{level.name}</h2>
                    <p style={{ color: 'hsl(220,12%,55%)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>{level.description}</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', color: 'hsl(220,12%,60%)' }}>
                        <BookOpen size={14} />
                        {level.modules?.length || 0} modules
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', color: 'hsl(220,12%,60%)' }}>
                        <Star size={14} />
                        {totalLessons} leçons
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* No data state */}
      {!isLoading && (!data || data.length === 0) && (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <BookOpen size={48} color="hsl(220,12%,35%)" style={{ margin: '0 auto 1rem' }} />
          <p style={{ color: 'hsl(220,12%,50%)' }}>Aucun niveau disponible. Veuillez démarrer le serveur backend.</p>
        </div>
      )}
    </div>
  );
}
