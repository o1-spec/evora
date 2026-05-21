'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Target, Award, PlayCircle } from 'lucide-react';
import api from '@/lib/api';

export default function AcademyPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['learning-levels'],
    queryFn: () => api.get('/learning/levels').then(r => r.data),
  });

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <BookOpen size={24} color="hsl(var(--primary))" />
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.875rem', fontWeight: 800 }}>French Academy</h1>
        </div>
        <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
          Select your target CEFR level to access structured modules and lessons.
        </p>
      </motion.div>

      {/* CLB Target Banner */}
      <div className="card" style={{ padding: '1.25rem 1.75rem', marginBottom: '2.5rem', borderLeft: '4px solid hsl(var(--primary))', display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'hsl(var(--primary-light))' }}>
        <Target size={22} color="hsl(var(--primary))" style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem', color: 'hsl(var(--primary-hover))' }}>Your TCF Canada Goal: CLB 7 (B2 Level)</div>
          <div style={{ fontSize: '0.85rem', color: 'hsl(var(--primary))' }}>
            To achieve a CLB 7, you need to master the B2 curriculum. We recommend starting at your current level and progressing systematically.
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {isLoading ? (
          [...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 160, borderRadius: 16 }} />)
        ) : (
          data?.levels?.map((level: any, i: number) => (
            <Link key={level.id} href={`/dashboard/academy/${level.code}`} style={{ textDecoration: 'none' }}>
              <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'hsl(var(--bg-base))', border: '1px solid hsl(var(--border))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800, color: 'hsl(var(--primary))' }}>
                      {level.code}
                    </div>
                    <div>
                      <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'hsl(var(--text-primary))' }}>{level.name}</h2>
                      <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))' }}>CEFR Level</span>
                    </div>
                  </div>
                </div>

                <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
                  {level.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid hsl(var(--border))', paddingTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', fontWeight: 500 }}>
                    <BookOpen size={16} /> {level.modules?.length || 0} Modules
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'hsl(var(--primary))', fontSize: '0.85rem', fontWeight: 600 }}>
                    Enter <PlayCircle size={16} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
