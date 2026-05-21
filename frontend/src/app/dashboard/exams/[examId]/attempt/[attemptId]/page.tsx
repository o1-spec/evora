'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, Headphones, BookOpen, PenLine, Mic, MicOff, Send, FileText } from 'lucide-react';
import api from '@/lib/api';
import { useExamStore } from '@/store/useExamStore';

const SECTION_LABELS: Record<string, string> = {
  LISTENING: 'Listening Comprehension', READING: 'Reading Comprehension',
  WRITING: 'Writing Expression', SPEAKING: 'Speaking Expression',
};
const SECTION_ICONS: Record<string, any> = {
  LISTENING: Headphones, READING: BookOpen, WRITING: PenLine, SPEAKING: Mic,
};

function Timer({ seconds }: { seconds: number }) {
  const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
  const ss = (seconds % 60).toString().padStart(2, '0');
  const urgent = seconds < 300;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', backgroundColor: urgent ? 'hsl(0, 84%, 95%)' : 'hsl(var(--bg-base))', border: `1px solid ${urgent ? 'hsl(0, 84%, 60%, 0.3)' : 'hsl(var(--border))'}` }}>
      <Clock size={16} color={urgent ? 'hsl(0, 84%, 60%)' : 'hsl(var(--text-secondary))'} />
      <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1.05rem', color: urgent ? 'hsl(0, 84%, 60%)' : 'hsl(var(--text-primary))', fontVariantNumeric: 'tabular-nums' }}>
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
      } catch { alert('Microphone access denied.'); }
    }
  };

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ textAlign: 'center', color: 'hsl(var(--text-secondary))' }}>Loading Exam...</div>
    </div>
  );

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      {/* Exam Header */}
      <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: 'hsl(var(--text-primary))' }}>{exam?.title}</div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {exam?.sections?.map((s: any, idx: number) => (
              <span key={s.id} style={{
                fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: 999,
                backgroundColor: idx === currentSectionIndex ? 'hsl(var(--primary-light))' : 'hsl(var(--bg-base))',
                color: idx === currentSectionIndex ? 'hsl(var(--primary-hover))' : 'hsl(var(--text-muted))',
                fontWeight: idx === currentSectionIndex ? 700 : 500,
                border: idx < currentSectionIndex ? '1px solid hsl(142, 71%, 45%, 0.3)' : '1px solid transparent',
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
              {(() => { const Icon = SECTION_ICONS[section.type] || FileText; return <Icon size={24} color="hsl(var(--primary))" />; })()}
              <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.5rem', fontWeight: 800, color: 'hsl(var(--text-primary))' }}>
                {SECTION_LABELS[section.type] || section.type}
              </h2>
              <span style={{ marginLeft: 'auto', fontSize: '0.9rem', color: 'hsl(var(--text-secondary))', fontWeight: 500 }}>
                {section.questions?.length} question(s) · {section.durationMin} min
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {section.questions?.map((q: any, qi: number) => (
                <div key={q.id} className="card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <span className="badge badge-primary">Q{qi + 1}</span>
                    <div style={{ fontSize: '1.05rem', lineHeight: 1.75, whiteSpace: 'pre-wrap', color: 'hsl(var(--text-primary))', fontWeight: 500 }}>{q.text}</div>
                  </div>

                  {/* Listening audio prompt */}
                  {q.audioUrl && (
                    <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'hsl(var(--primary-light))', borderRadius: '0.75rem', border: '1px solid hsl(var(--primary))', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Headphones size={20} color="hsl(var(--primary))" />
                      <span style={{ fontSize: '0.9rem', color: 'hsl(var(--text-primary))', fontWeight: 500 }}>TCF Audio (Simulation)</span>
                    </div>
                  )}

                  {/* MCQ */}
                  {q.options && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {(q.options as string[]).map(opt => (
                        <button key={opt} onClick={() => setAnswer(q.id, opt)}
                          style={{
                            textAlign: 'left', padding: '1rem 1.25rem', borderRadius: '0.75rem', cursor: 'pointer', fontSize: '0.95rem', transition: 'all 0.2s', border: '1px solid',
                            backgroundColor: answers[q.id] === opt ? 'hsl(var(--primary-light))' : 'white',
                            borderColor: answers[q.id] === opt ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                            color: answers[q.id] === opt ? 'hsl(var(--primary-hover))' : 'hsl(var(--text-primary))',
                            fontWeight: answers[q.id] === opt ? 600 : 400,
                          }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Writing */}
                  {section.type === 'WRITING' && (
                    <textarea value={answers[q.id] || ''} onChange={e => setAnswer(q.id, e.target.value)}
                      placeholder="Write your response here..." rows={7}
                      className="input-field"
                      style={{ resize: 'vertical' }} />
                  )}

                  {/* Speaking */}
                  {section.type === 'SPEAKING' && (
                    <div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                        <button onClick={() => toggleRecording(q.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.25rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', backgroundColor: isRecording ? 'hsla(0, 84%, 60%, 0.1)' : 'hsl(var(--accent-light))', color: isRecording ? 'hsl(0, 84%, 60%)' : 'hsl(var(--accent))', transition: 'all 0.2s' }}>
                          {isRecording ? <><MicOff size={18} /> Stop Recording</> : <><Mic size={18} /> Record Response</>}
                        </button>
                        {answers[q.id] && <span className="badge badge-accent">✓ Recording Captured</span>}
                      </div>
                      <textarea value={answers[q.id]?.startsWith('[AUDIO') ? '' : answers[q.id] || ''}
                        onChange={e => setAnswer(q.id, e.target.value)}
                        placeholder="Or type your oral response for AI evaluation..." rows={4}
                        className="input-field"
                        style={{ resize: 'vertical' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2.5rem', gap: '1rem' }}>
              <button onClick={handleNextOrSubmit} disabled={submitMutation.isPending}
                className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem', fontSize: '0.95rem' }}>
                {submitMutation.isPending ? 'Submitting...' : isLastSection ? <><Send size={18} /> Submit Exam</> : <>Next Section <ChevronRight size={18} /></>}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
