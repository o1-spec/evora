'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FileText, Clock, Headphones, BookOpen, PenLine, Mic, ArrowRight, Trophy } from 'lucide-react';
import api from '@/lib/api';

const SECTION_ICONS: Record<string, any> = {
  LISTENING: Headphones, READING: BookOpen, WRITING: PenLine, SPEAKING: Mic,
};
const SECTION_COLORS: Record<string, string> = {
  LISTENING: '#38bdf8', READING: '#a78bfa', WRITING: '#34d399', SPEAKING: '#fb923c',
};

export default function ExamsPage() {
  const router = useRouter();
  const [startingId, setStartingId] = useState<string | null>(null);

  const { data: exams, isLoading } = useQuery({
    queryKey: ['tcf-exams'],
    queryFn: () => api.get('/tcf/exams').then(r => r.data.exams),
  });

  const startMutation = useMutation({
    mutationFn: (examId: string) =>
      api.post('/tcf/attempts/start', { examId }).then(r => r.data),
    onSuccess: (data, examId) => {
      router.push(`/dashboard/exams/${examId}/attempt/${data.attemptId}`);
    },
    onError: (err: any) => {
      alert(err?.response?.data?.error || 'Impossible de démarrer cet examen.');
      setStartingId(null);
    },
  });

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <FileText size={24} color="hsl(250,95%,64%)" />
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.875rem', fontWeight: 800 }}>Simulateur TCF Canada</h1>
        </div>
        <p style={{ color: 'hsl(220,12%,55%)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
          Examens blancs officiels simulant fidèlement les 4 épreuves du TCF Canada. Résultats CLB automatiques.
        </p>
      </motion.div>

      {/* CLB Info Banner */}
      <div className="glass" style={{ padding: '1.25rem 1.75rem', marginBottom: '2rem', borderLeft: '3px solid hsl(250,95%,64%)', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Trophy size={22} color="hsl(250,95%,64%)" style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>Niveaux CLB — Repères linguistiques canadiens</div>
          <div style={{ fontSize: '0.83rem', color: 'hsl(220,12%,55%)' }}>
            CLB 4–5 = A2 · CLB 6–7 = B1 · CLB 8–9 = B2 · CLB 10+ = C1/C2. Immigration Canada exige généralement CLB 7+.
          </div>
        </div>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[...Array(2)].map((_, i) => <div key={i} className="skeleton" style={{ height: 220, borderRadius: 16 }} />)}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {(exams || []).map((exam: any, i: number) => (
            <motion.div key={exam.id} className="glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <div>
                  {exam.isOfficial && <span className="badge badge-primary" style={{ marginBottom: '0.625rem' }}>✓ Officiel</span>}
                  <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.375rem' }}>{exam.title}</h2>
                  <p style={{ color: 'hsl(220,12%,55%)', fontSize: '0.875rem' }}>{exam.description}</p>
                </div>
              </div>

              {/* Sections */}
              <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
                {exam.sections?.map((sec: any) => {
                  const Icon = SECTION_ICONS[sec.type] || FileText;
                  const color = SECTION_COLORS[sec.type] || '#818cf8';
                  return (
                    <div key={sec.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.875rem', borderRadius: '0.5rem', background: `${color}15`, border: `1px solid ${color}30` }}>
                      <Icon size={15} color={color} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color }}>{sec.type}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'hsl(220,12%,55%)' }}>
                        <Clock size={12} /> {sec.durationMin} min
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '0.85rem', color: 'hsl(220,12%,50%)' }}>
                  Durée totale : {exam.sections?.reduce((a: number, s: any) => a + s.durationMin, 0)} min
                </div>
                <button id={`start-exam-${exam.id}`}
                  onClick={() => { setStartingId(exam.id); startMutation.mutate(exam.id); }}
                  disabled={startMutation.isPending && startingId === exam.id}
                  className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {startMutation.isPending && startingId === exam.id ? 'Démarrage...' : <> Commencer l'examen <ArrowRight size={16} /></>}
                </button>
              </div>
            </motion.div>
          ))}

          {(!exams || exams.length === 0) && (
            <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
              <FileText size={48} color="hsl(220,12%,35%)" style={{ margin: '0 auto 1rem', display: 'block' }} />
              <p style={{ color: 'hsl(220,12%,50%)' }}>Aucun examen disponible. Assurez-vous que le backend est démarré.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
