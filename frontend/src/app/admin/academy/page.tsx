'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { GraduationCap, ChevronRight, BookOpen, Layers } from 'lucide-react';

async function fetchAcademy() {
  const { data } = await api.get('/admin/academy');
  return data.data;
}

const LEVEL_COLORS: Record<string, string> = {
  A1: '#22c55e', A2: '#86efac', B1: '#3b82f6', B2: '#67e8f9', C1: '#a855f7', C2: '#f97316',
};

export default function AdminAcademyPage() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-academy'], queryFn: fetchAcademy });

  if (isLoading) return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="skeleton" style={{ height: 32, width: 180 }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 120, borderRadius: 16 }} />)}
      </div>
    </div>
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Academy Content</h1>
        <p className="admin-page-subtitle">Browse CEFR levels A1–C2, modules, lessons, and exercises</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {data?.levels?.map((level: any) => (
          <div key={level.id} className="admin-card">
            {/* Level Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${LEVEL_COLORS[level.code]}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: LEVEL_COLORS[level.code], fontSize: 16, fontWeight: 800,
              }}>
                {level.code}
              </div>
              <div>
                <h2 style={{ color: '#f1f5f9', fontSize: 18, fontWeight: 700 }}>{level.name}</h2>
                <p style={{ color: '#64748b', fontSize: 13 }}>{level.description}</p>
              </div>
              <div style={{ marginLeft: 'auto', color: '#64748b', fontSize: 13 }}>
                {level.modules?.length} modules
              </div>
            </div>

            {/* Modules */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {level.modules?.map((mod: any) => (
                <div key={mod.id} style={{
                  background: '#0f1729', borderRadius: 12, padding: '14px 18px',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Layers size={15} style={{ color: '#64748b', flexShrink: 0 }} />
                    <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>{mod.title}</span>
                    <span style={{ marginLeft: 'auto', color: '#475569', fontSize: 12 }}>
                      {mod._count?.lessons} lessons
                    </span>
                  </div>

                  {/* Lessons */}
                  {mod.lessons?.length > 0 && (
                    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 24 }}>
                      {mod.lessons.map((lesson: any) => (
                        <div key={lesson.id} style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          color: '#64748b', fontSize: 13,
                        }}>
                          <BookOpen size={13} />
                          <span style={{ flex: 1 }}>{lesson.title}</span>
                          <span style={{ fontSize: 11, color: '#475569' }}>
                            {lesson._count?.exercises} exercises
                          </span>
                          <a
                            href={`/admin/academy/lessons/${lesson.id}`}
                            style={{ color: '#3b82f6', fontSize: 11, display: 'flex', alignItems: 'center', gap: 2 }}
                          >
                            View <ChevronRight size={12} />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
