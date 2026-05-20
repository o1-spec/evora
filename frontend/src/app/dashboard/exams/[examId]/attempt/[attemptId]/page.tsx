'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, ChevronLeft, Headphones, BookOpen, PenLine, Mic, MicOff, Send, FileText } from 'lucide-react';
import api from '@/lib/api';
import { useExamStore } from '@/store/useExamStore';

const SECTION_LABELS: Record<string, string> = {
  LISTENING: 'Compréhension Orale', READING: 'Compréhension Écrite',
  WRITING: 'Expression Écrite', SPEAKING: 'Expression Orale',
};
const SECTION_ICONS: Record<string, any> = {
  LISTENING: Headphones, READING: BookOpen, WRITING: PenLine, SPEAKING: Mic,
};

function Timer({ seconds }: { seconds: number }) {
  const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
  const ss = (seconds % 60).toString().padStart(2, '0');
  const urgent = seconds < 300;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.875rem', borderRadius: '0.5rem', background: urgent ? 'hsla(0,84%,60%,0.15)' : 'rgba(255,255,255,0.07)', border: `1px solid ${urgent ? 'hsla(0,84%,60%,0.3)' : 'rgba(255,255,255,0.1)'}` }}>
      <Clock size={15} color={urgent ? 'hsl(0,84%,65%)' : 'hsl(220,12%,60%)'} />
      <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1rem', color: urgent ? 'hsl(0,84%,70%)' : 'hsl(220,18%,90%)', fontVariantNumeric: 'tabular-nums' }}>
        {mm}:{ss}
      </span>
    </div>
  );
}

export default function ExamAttemptPage() {
  const { examId, attemptId } = useParams<{ examId: string; attemptId: string }>();
  const router = useRouter();
  const { answers, setAnswer, currentSectionIndex, nextSection, setTimer, tickTimer, timeRemainingSeconds, setAttempt } = useExamStore();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { data: exam, isLoading } = useQuery({
    queryKey: ['exam-detail', examId],
    queryFn: () => api.get(`/tcf/exams/${examId}`).then(r => r.data.exam),
    enabled: !!examId,
  });

  useEffect(() => {
    if (attemptId && examId) setAttempt(attemptId, examId);
  }, [attemptId, examId]);

  useEffect(() => {
    if (exam?.sections?.[currentSectionIndex]) {
      setTimer(exam.sections[currentSectionIndex].durationMin * 60);
    }
  }, [exam, currentSectionIndex]);

  useEffect(() => {
    timerRef.current = setInterval(() => tickTimer(), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentSectionIndex]);

  const submitMutation = useMutation({
    mutationFn: () => api.post(`/tcf/attempts/${attemptId}/submit`, { answers }).then(r => r.data),
    onSuccess: () => router.push(`/dashboard/exams/report/${attemptId}`),
  });

  const section = exam?.sections?.[currentSectionIndex];
  const isLastSection = exam ? currentSectionIndex === exam.sections.length - 1 : false;

  const handleNextOrSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isLastSection) submitMutation.mutate();
    else nextSection();
  };

  const toggleRecording = async (questionId: string) => {
    if (isRecording) {
      mediaRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        chunksRef.current = [];
        const recorder = new MediaRecorder(stream);
        mediaRef.current = recorder;
        recorder.ondataavailable = e => chunksRef.current.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setAnswer(questionId, `[AUDIO_RECORDED:${url}]`);
          stream.getTracks().forEach(t => t.stop());
        };
        recorder.start();
        setIsRecording(true);
      } catch { alert('Accès microphone refusé.'); }
    }
  };

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ textAlign: 'center', color: 'hsl(220,12%,55%)' }}>Chargement de l'examen...</div>
    </div>
  );

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      {/* Exam Header */}
      <div className="glass" style={{ padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{exam?.title}</div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {exam?.sections?.map((s: any, idx: number) => (
              <span key={s.id} style={{
                fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: 999,
                background: idx === currentSectionIndex ? 'hsla(250,95%,64%,0.2)' : 'rgba(255,255,255,0.05)',
                color: idx === currentSectionIndex ? 'hsl(250,95%,72%)' : 'hsl(220,12%,50%)',
                fontWeight: idx === currentSectionIndex ? 700 : 400,
                border: idx < currentSectionIndex ? '1px solid hsla(162,82%,50%,0.3)' : '1px solid transparent',
              }}>
                {idx < currentSectionIndex ? '✓ ' : ''}{s.type}
              </span>
            ))}
          </div>
        </div>
        <Timer seconds={timeRemainingSeconds} />
      </div>

      {/* Section Content */}
      {section && (
        <AnimatePresence mode="wait">
          <motion.div key={currentSectionIndex} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
              {(() => { const Icon = SECTION_ICONS[section.type] || FileText; return <Icon size={22} color="hsl(250,95%,64%)" />; })()}
              <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.375rem', fontWeight: 800 }}>
                {SECTION_LABELS[section.type] || section.type}
              </h2>
              <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'hsl(220,12%,50%)' }}>
                {section.questions?.length} question(s) · {section.durationMin} min
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {section.questions?.map((q: any, qi: number) => (
                <div key={q.id} className="glass" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <span className="badge badge-primary">Q{qi + 1}</span>
                    <div style={{ fontSize: '0.95rem', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{q.text}</div>
                  </div>

                  {/* Listening audio prompt */}
                  {q.audioUrl && (
                    <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: 'hsla(250,95%,64%,0.08)', borderRadius: '0.625rem', border: '1px solid hsla(250,95%,64%,0.2)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Headphones size={18} color="hsl(250,95%,64%)" />
                      <span style={{ fontSize: '0.85rem', color: 'hsl(220,12%,65%)' }}>Audio TCF (simulation — connexion ElevenLabs requise)</span>
                    </div>
                  )}

                  {/* MCQ */}
                  {q.options && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                      {(q.options as string[]).map(opt => (
                        <button key={opt} onClick={() => setAnswer(q.id, opt)}
                          style={{
                            textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '0.625rem', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.15s', border: '1px solid', background: answers[q.id] === opt ? 'hsla(250,95%,64%,0.15)' : 'rgba(255,255,255,0.04)',
                            borderColor: answers[q.id] === opt ? 'hsl(250,95%,64%)' : 'rgba(255,255,255,0.08)',
                            color: answers[q.id] === opt ? 'hsl(250,95%,72%)' : 'hsl(220,12%,70%)',
                          }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Writing */}
                  {section.type === 'WRITING' && (
                    <textarea value={answers[q.id] || ''} onChange={e => setAnswer(q.id, e.target.value)}
                      placeholder="Rédigez votre réponse ici..." rows={7}
                      style={{ width: '100%', padding: '0.875rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.625rem', color: 'hsl(220,18%,92%)', fontSize: '0.9rem', fontFamily: 'Inter,sans-serif', resize: 'vertical', outline: 'none', lineHeight: 1.7 }} />
                  )}

                  {/* Speaking */}
                  {section.type === 'SPEAKING' && (
                    <div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.875rem' }}>
                        <button onClick={() => toggleRecording(q.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '0.625rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', background: isRecording ? 'hsla(0,84%,60%,0.2)' : 'hsla(162,82%,50%,0.15)', color: isRecording ? 'hsl(0,84%,65%)' : 'hsl(162,82%,55%)', transition: 'all 0.2s' }}>
                          {isRecording ? <><MicOff size={16} /> Arrêter l'enregistrement</> : <><Mic size={16} /> Enregistrer ma réponse</>}
                        </button>
                        {answers[q.id] && <span className="badge badge-accent">✓ Enregistrement capturé</span>}
                      </div>
                      <textarea value={answers[q.id]?.startsWith('[AUDIO') ? '' : answers[q.id] || ''}
                        onChange={e => setAnswer(q.id, e.target.value)}
                        placeholder="Ou tapez votre réponse orale à l'écrit pour l'évaluation IA..." rows={4}
                        style={{ width: '100%', padding: '0.875rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.625rem', color: 'hsl(220,18%,92%)', fontSize: '0.9rem', fontFamily: 'Inter,sans-serif', resize: 'vertical', outline: 'none' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem', gap: '1rem' }}>
              <button onClick={handleNextOrSubmit} disabled={submitMutation.isPending}
                className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {submitMutation.isPending ? 'Envoi en cours...' : isLastSection ? <><Send size={16} /> Soumettre l'examen</> : <>Section suivante <ChevronRight size={16} /></>}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
