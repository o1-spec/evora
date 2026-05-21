'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FileText, Clock, PlayCircle, BarChart, CheckCircle2, History } from 'lucide-react';
import api from '@/lib/api';

export default function ExamsPage() {
  const router = useRouter();

  const { data: exams, isLoading: loadingExams } = useQuery({
    queryKey: ['tcf-exams'],
    queryFn: () => api.get('/tcf/exams').then(r => r.data),
  });

  const { data: history, isLoading: loadingHistory } = useQuery({
    queryKey: ['tcf-history'],
    queryFn: () => api.get('/tcf/history').then(r => r.data),
  });

  const startExam = async (examId: string) => {
    try {
      const { data } = await api.post(`/tcf/exams/${examId}/start`);
      router.push(`/dashboard/exams/${examId}/attempt/${data.attempt.id}`);
    } catch (err) {
      alert('Failed to start exam. Check console.');
      console.error(err);
    }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <FileText size={24} color="hsl(var(--primary))" />
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.875rem', fontWeight: 800 }}>TCF Canada Simulator</h1>
        </div>
        <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem' }}>
          Take full, accurately timed mock exams to prepare for the official test.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="xl:grid-cols-3">
        
        {/* Main Section: Available Exams */}
        <div className="xl:col-span-2">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlayCircle size={20} color="hsl(var(--primary))" /> Available Mock Exams
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {loadingExams ? (
              [...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 140, borderRadius: 16 }} />)
            ) : exams?.length === 0 ? (
              <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'hsl(var(--text-muted))' }}>No exams available currently.</div>
            ) : (
              exams?.map((exam: any, i: number) => (
                <motion.div key={exam.id} className="card hover:shadow-md transition-shadow flex flex-col sm:flex-row" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex' }}>
                  
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'hsl(var(--text-primary))' }}>{exam.title}</h3>
                      {exam.isPremium && <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>Premium</span>}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))', marginBottom: '1.25rem' }}>{exam.description}</p>
                    
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'hsl(var(--text-muted))' }}><Clock size={14} /> ~2h 45m</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'hsl(var(--text-muted))' }}><FileText size={14} /> 4 Sections</div>
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem', backgroundColor: 'hsl(var(--bg-base))', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid hsl(var(--border))' }} className="sm:border-t-0 border-t">
                    <button onClick={() => startExam(exam.id)} className="btn-primary" style={{ width: '100%', whiteSpace: 'nowrap' }}>
                      Start Exam
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar: History */}
        <div>
          <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '6rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid hsl(var(--border))', paddingBottom: '1rem' }}>
              <History size={18} color="hsl(var(--text-secondary))" /> Recent Attempts
            </h2>

            {loadingHistory ? (
              <div className="skeleton" style={{ height: 100 }} />
            ) : history?.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'hsl(var(--text-muted))', fontSize: '0.9rem' }}>
                You haven't taken any exams yet. Start your first mock exam to see your history here!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {history?.slice(0, 5).map((attempt: any) => (
                  <div key={attempt.id} style={{ padding: '1rem', borderRadius: '0.75rem', backgroundColor: 'hsl(var(--bg-base))', border: '1px solid hsl(var(--border))' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'hsl(var(--text-primary))', marginBottom: '0.25rem' }}>{attempt.exam.title}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))' }}>
                        {new Date(attempt.startedAt).toLocaleDateString()}
                      </span>
                      {attempt.status === 'COMPLETED' ? (
                        <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>Completed</span>
                      ) : (
                        <span className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>In Progress</span>
                      )}
                    </div>
                    {attempt.status === 'COMPLETED' && (
                      <button onClick={() => router.push(`/dashboard/exams/report/${attempt.id}`)} className="btn-ghost" style={{ width: '100%', marginTop: '0.75rem', padding: '0.4rem', fontSize: '0.8rem', backgroundColor: 'white', border: '1px solid hsl(var(--border))' }}>
                        View Report
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
