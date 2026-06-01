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

const SECTION_COLORS: Record<string, { primary: string, border: string, bg: string }> = {
  LISTENING: { primary: '#ec4899', border: 'rgba(236, 72, 153, 0.2)', bg: 'rgba(236, 72, 153, 0.03)' },
  READING: { primary: '#3b82f6', border: 'rgba(59, 130, 246, 0.2)', bg: 'rgba(59, 130, 246, 0.03)' },
  WRITING: { primary: '#8b5cf6', border: 'rgba(139, 92, 246, 0.2)', bg: 'rgba(139, 92, 246, 0.03)' },
  SPEAKING: { primary: '#10b981', border: 'rgba(16, 185, 129, 0.2)', bg: 'rgba(16, 185, 129, 0.03)' },
};

function getWordBounds(text: string) {
  const match = text.match(/Word bounds:\s*(\d+)\s*-\s*(\d+)/i);
  if (match) {
    return { min: parseInt(match[1]), max: parseInt(match[2]) };
  }
  return null;
}

function QuestionRenderer({ text }: { text: string }) {
  const lines = text.split('\n');
  let title = '';
  let advice = '';
  let metadata = '';
  const paragraphs: string[] = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line.startsWith('###')) {
      title = line.replace(/^###\s*/, '');
    } else if (line.includes('Conseil contextuel') || line.includes('Contextual advice')) {
      advice = line.replace(/^\*\*/, '').replace(/\*\*$/, '');
    } else if (line.startsWith('*') && line.endsWith('*')) {
      metadata = line.replace(/^\*/, '').replace(/\*$/, '');
    } else {
      paragraphs.push(line);
    }
  }

  if (!title && paragraphs.length === 0) {
    return <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.75, color: 'hsl(var(--text-secondary))' }}>{text}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
      {/* Title */}
      {title && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderBottom: '1px solid hsl(var(--border))', paddingBottom: '0.75rem' }}>
          <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.2rem', fontWeight: 800, color: 'hsl(var(--text-primary))', lineHeight: 1.4 }}>
            {title}
          </h3>
        </div>
      )}

      {/* Main Reading / Instruction Paragraphs */}
      {paragraphs.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {paragraphs.map((p, idx) => (
            <p key={idx} style={{ fontSize: '1.025rem', lineHeight: 1.8, color: 'hsl(var(--text-secondary))', fontWeight: 400, margin: 0 }}>
              {p}
            </p>
          ))}
        </div>
      )}

      {/* Contextual Advice Callout */}
      {advice && (
        <div style={{
          padding: '1rem 1.25rem',
          backgroundColor: 'hsla(var(--primary-light), 0.5)',
          borderRadius: '0.75rem',
          borderLeft: '4px solid hsl(var(--primary))',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          marginTop: '0.25rem'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'hsl(var(--primary-hover))', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            💡 Conseil Contextuel / Expert Tip
          </span>
          <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
            {advice.replace(/.*Conseil contextuel\s*:\s*/i, '').replace(/.*Contextual advice\s*:\s*/i, '').replace(/\*\*$/, '')}
          </p>
        </div>
      )}

      {/* Metadata Badges */}
      {metadata && (
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
          {metadata.split('.').map(m => m.trim()).filter(Boolean).map((chunk, ci) => (
            <span key={ci} style={{
              fontSize: '0.725rem',
              fontWeight: 700,
              color: 'hsl(var(--text-muted))',
              backgroundColor: 'hsl(var(--bg-base))',
              padding: '0.3rem 0.75rem',
              borderRadius: '999px',
              border: '1px solid hsl(var(--border))',
              textTransform: 'capitalize'
            }}>
              {chunk}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function WritingWorkspace({ 
  value, 
  onChange, 
  questionText 
}: { 
  value: string; 
  onChange: (val: string) => void; 
  questionText: string; 
}) {
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
  const bounds = getWordBounds(questionText) || { min: 60, max: 120 };
  
  const isValid = wordCount >= bounds.min && wordCount <= bounds.max;
  const isNearMin = wordCount > 0 && wordCount < bounds.min;
  const isOverMax = wordCount > bounds.max;

  let progressColor = 'hsl(var(--text-muted))';
  let progressBg = 'hsl(var(--bg-base))';
  let progressBorder = 'hsl(var(--border))';

  if (value.trim().length > 0) {
    if (isValid) {
      progressColor = 'hsl(142, 71%, 35%)';
      progressBg = 'hsl(142, 71%, 97%)';
      progressBorder = 'hsl(142, 71%, 85%)';
    } else if (isNearMin) {
      progressColor = 'hsl(35, 92%, 40%)';
      progressBg = 'hsl(35, 92%, 97%)';
      progressBorder = 'hsl(35, 92%, 85%)';
    } else if (isOverMax) {
      progressColor = 'hsl(0, 84%, 45%)';
      progressBg = 'hsl(0, 84%, 97%)';
      progressBorder = 'hsl(0, 84%, 85%)';
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.25rem', width: '100%' }}>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Rédigez votre réponse ici en français..."
        rows={8}
        className="input-field"
        style={{
          width: '100%',
          resize: 'vertical',
          fontSize: '1rem',
          lineHeight: 1.6,
          padding: '1.25rem',
          borderRadius: '0.875rem',
          border: '1px solid hsl(var(--border))',
          outline: 'none',
          transition: 'all 0.2s',
          fontFamily: 'inherit'
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>
          Target bounds: <strong style={{ color: 'hsl(var(--text-secondary))' }}>{bounds.min} - {bounds.max} words</strong>
        </span>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: progressColor,
          backgroundColor: progressBg,
          border: `1px solid ${progressBorder}`,
          padding: '0.35rem 0.8rem',
          borderRadius: '999px',
          transition: 'all 0.2s ease'
        }}>
          <span>✍️ {wordCount} words</span>
          {value.trim().length > 0 && (
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
              {isValid ? '• Correct Length' : isNearMin ? '• Under Min' : '• Over Max'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExamAttemptPage() {
  const { examId, attemptId } = useParams<{ examId: string; attemptId: string }>();
  const router = useRouter();
  const { answers, setAnswer, currentSectionIndex, nextSection, setTimer, tickTimer, timeRemainingSeconds, setAttempt, markSectionComplete, completedSections } = useExamStore();
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

  // Check if all questions in current section are answered
  const isSectionComplete = () => {
    if (!section) return false;
    return section.questions?.every((q: any) => answers[q.id] && answers[q.id].trim().length > 0) || false;
  };

  const getAudioUrl = (ans: string) => {
    if (!ans) return null;
    const match = ans.match(/^\[AUDIO_RECORDED:(blob:.+)\]$/);
    return match ? match[1] : null;
  };

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ textAlign: 'center', color: 'hsl(var(--text-secondary))' }}>Loading Exam...</div>
    </div>
  );

  const colors = section ? (SECTION_COLORS[section.type] || { primary: 'hsl(var(--primary))', border: 'hsl(var(--border))', bg: 'transparent' }) : { primary: 'hsl(var(--primary))', border: 'hsl(var(--border))', bg: 'transparent' };

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Exam Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        padding: '1.5rem 2rem',
        marginBottom: '3rem',
        width: '100%',
        borderRadius: '1.25rem',
        backgroundColor: 'white',
        border: '1px solid hsl(var(--border))',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.3rem', color: 'hsl(var(--text-primary))', lineHeight: 1.3 }}>
            {exam?.title}
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {exam?.sections?.map((s: any, idx: number) => {
              const secColors = SECTION_COLORS[s.type] || { primary: 'hsl(var(--text-muted))' };
              const isCurrent = idx === currentSectionIndex;
              const isPassed = idx < currentSectionIndex;
              return (
                <span key={s.id} style={{
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 999,
                  backgroundColor: isCurrent ? `${secColors.primary}18` : isPassed ? 'rgba(16, 185, 129, 0.08)' : 'hsl(var(--bg-base))',
                  color: isCurrent ? secColors.primary : isPassed ? '#10b981' : 'hsl(var(--text-muted))',
                  fontWeight: 700,
                  border: isCurrent ? `1px solid ${secColors.primary}30` : isPassed ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid hsl(var(--border))',
                  transition: 'all 0.2s'
                }}>
                  {isPassed ? '✓ ' : ''}{SECTION_LABELS[s.type] || s.type}
                </span>
              );
            })}
          </div>
        </div>
        <Timer seconds={timeRemainingSeconds} />
      </div>

      {/* Section Content */}
      {section && (
        <AnimatePresence mode="wait">
          <motion.div key={currentSectionIndex} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.25rem', marginTop: '1rem' }}>
              {(() => { const Icon = SECTION_ICONS[section.type] || FileText; return <Icon size={24} color={colors.primary} />; })()}
              <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.5rem', fontWeight: 800, color: 'hsl(var(--text-primary))' }}>
                {SECTION_LABELS[section.type] || section.type}
              </h2>
              <span style={{ marginLeft: 'auto', fontSize: '0.9rem', color: 'hsl(var(--text-secondary))', fontWeight: 600 }}>
                {section.questions?.length} question(s) · {section.durationMin} min
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {section.questions?.map((q: any, qi: number) => {
                const parsed = (() => {
                  const lines = q.text.split('\n');
                  let title = '';
                  let advice = '';
                  let metadata = '';
                  const paragraphs: string[] = [];

                  for (let line of lines) {
                    line = line.trim();
                    if (!line) continue;

                    if (line.startsWith('###')) {
                      title = line.replace(/^###\s*/, '');
                    } else if (line.includes('Conseil contextuel') || line.includes('Contextual advice')) {
                      advice = line.replace(/^\*\*/, '').replace(/\*\*$/, '');
                    } else if (line.startsWith('*') && line.endsWith('*')) {
                      metadata = line.replace(/^\*/, '').replace(/\*$/, '');
                    } else {
                      paragraphs.push(line);
                    }
                  }
                  return { title, advice, metadata, paragraphs };
                })();

                return (
                  <div key={q.id} className="card hover:shadow-md transition-shadow" style={{
                    padding: '2.5rem',
                    borderRadius: '1.25rem',
                    borderLeft: `6px solid ${colors.primary}`,
                    backgroundColor: 'white',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'; }}>
                    
                    {/* Header Row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid hsl(var(--border))', paddingBottom: '1.25rem', marginBottom: '1.75rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '0.75rem',
                        backgroundColor: `${colors.primary}18`,
                        border: `1px solid ${colors.border}`,
                        color: colors.primary,
                        fontFamily: 'Outfit,sans-serif',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        flexShrink: 0
                      }}>
                        Q{qi + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.25rem', fontWeight: 800, color: 'hsl(var(--text-primary))', margin: 0, lineHeight: 1.4 }}>
                          {parsed.title || `Question ${qi + 1}`}
                        </h3>
                      </div>
                    </div>

                    {/* Instruction Paragraphs */}
                    {parsed.paragraphs.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                        {parsed.paragraphs.map((p, idx) => (
                          <p key={idx} style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'hsl(var(--text-secondary))', fontWeight: 400, margin: 0 }}>
                            {p}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Contextual Advice Callout */}
                    {parsed.advice && (
                      <div style={{
                        padding: '1.25rem 1.5rem',
                        backgroundColor: `${colors.primary}07`,
                        borderRadius: '0.875rem',
                        borderLeft: `4px solid ${colors.primary}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                        marginBottom: '1.5rem',
                        marginTop: '0.5rem'
                      }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: colors.primary, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          💡 Conseil Contextuel / Expert Tip
                        </span>
                        <p style={{ fontSize: '0.925rem', color: 'hsl(var(--text-secondary))', lineHeight: 1.65, margin: 0, fontWeight: 500 }}>
                          {parsed.advice.replace(/.*Conseil contextuel\s*:\s*/i, '').replace(/.*Contextual advice\s*:\s*/i, '').replace(/\*\*$/, '')}
                        </p>
                      </div>
                    )}

                    {/* Metadata Badges */}
                    {parsed.metadata && (
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
                        {parsed.metadata.split('.').map(m => m.trim()).filter(Boolean).map((chunk, ci) => (
                          <span key={ci} style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: 'hsl(var(--text-muted))',
                            backgroundColor: 'hsl(var(--bg-base))',
                            padding: '0.35rem 0.85rem',
                            borderRadius: '999px',
                            border: '1px solid hsl(var(--border))',
                            textTransform: 'capitalize'
                          }}>
                            {chunk}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Listening audio prompt */}
                    {q.audioUrl && (
                      <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', backgroundColor: 'hsl(var(--primary-light))', borderRadius: '0.75rem', border: '1px solid hsl(var(--primary))', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Headphones size={20} color="hsl(var(--primary))" />
                        <span style={{ fontSize: '0.9rem', color: 'hsl(var(--text-primary))', fontWeight: 600 }}>TCF Audio (Simulation)</span>
                      </div>
                    )}

                    {/* MCQ */}
                    {q.options && (() => {
                      let parsedOptions: string[] = [];
                      if (Array.isArray(q.options)) {
                        parsedOptions = q.options;
                      } else if (typeof q.options === 'string') {
                        try {
                          const parsed = JSON.parse(q.options);
                          if (Array.isArray(parsed)) {
                            parsedOptions = parsed;
                          }
                        } catch {
                          parsedOptions = [];
                        }
                      }
                      if (parsedOptions.length === 0) return null;

                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                          {parsedOptions.map(opt => (
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
                      );
                    })()}

                    {/* Writing */}
                    {section.type === 'WRITING' && (
                      <WritingWorkspace
                        value={answers[q.id] || ''}
                        onChange={val => setAnswer(q.id, val)}
                        questionText={q.text}
                      />
                    )}

                    {/* Speaking */}
                    {section.type === 'SPEAKING' && (
                      <div style={{ marginTop: '1.25rem' }}>
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-4">
                          <button onClick={() => toggleRecording(q.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.875rem 1.25rem',
                              borderRadius: '0.75rem',
                              border: 'none',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '0.9rem',
                              backgroundColor: isRecording ? 'rgba(239, 68, 68, 0.1)' : 'hsl(var(--accent-light))',
                              color: isRecording ? 'rgb(239, 68, 68)' : 'hsl(var(--accent))',
                              transition: 'all 0.2s',
                              boxShadow: isRecording ? '0 0 0 4px rgba(239, 68, 68, 0.15)' : 'none'
                            }}>
                            {isRecording ? (
                              <>
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Infinity, duration: 1 }}
                                  style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'rgb(239, 68, 68)' }}
                                />
                                Recording... (Click to Stop)
                              </>
                            ) : (
                              <><Mic size={18} /> Record Response</>
                            )}
                          </button>
                          {answers[q.id] && <span className="badge badge-accent">✓ Recording Captured</span>}
                        </div>

                        {/* Render Audio Player if audio recording exists */}
                        {(() => {
                          const recUrl = getAudioUrl(answers[q.id]);
                          if (!recUrl) return null;
                          return (
                            <div style={{
                              margin: '1rem 0 1.25rem 0',
                              padding: '1rem 1.25rem',
                              backgroundColor: 'rgba(139, 92, 246, 0.05)',
                              borderRadius: '0.75rem',
                              border: '1px solid rgba(139, 92, 246, 0.15)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.5rem'
                            }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'hsl(var(--accent))', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                🎤 Captured Voice Response
                              </span>
                              <audio src={recUrl} controls style={{ width: '100%', height: '40px' }} />
                            </div>
                          );
                        })()}

                        <textarea value={answers[q.id]?.startsWith('[AUDIO') ? '' : answers[q.id] || ''}
                          onChange={e => setAnswer(q.id, e.target.value)}
                          placeholder="Or type your oral response for AI evaluation..." rows={4}
                          className="input-field"
                          style={{
                            width: '100%',
                            resize: 'vertical',
                            fontSize: '1rem',
                            lineHeight: 1.6,
                            padding: '1.25rem',
                            borderRadius: '0.875rem',
                            border: '1px solid hsl(var(--border))',
                            outline: 'none',
                            transition: 'all 0.2s',
                            fontFamily: 'inherit'
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '2.5rem', gap: '1rem' }}>
              {!isSectionComplete() && !isLastSection && (
                <div style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', fontWeight: 500, padding: '0.75rem 1rem', backgroundColor: 'hsl(var(--bg-base))', borderRadius: '0.75rem', border: '1px solid hsl(var(--border))' }}>
                  ⚠️ Please answer all questions before proceeding
                </div>
              )}
              <button onClick={() => {
                if (isSectionComplete()) {
                  markSectionComplete(currentSectionIndex);
                  handleNextOrSubmit();
                }
              }} 
              disabled={submitMutation.isPending || (!isLastSection && !isSectionComplete())}
                className={!isLastSection && !isSectionComplete() ? 'btn-secondary' : 'btn-primary'} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  padding: '0.875rem 1.5rem', 
                  fontSize: '0.95rem',
                  opacity: (!isLastSection && !isSectionComplete()) ? 0.5 : 1,
                  cursor: (!isLastSection && !isSectionComplete()) ? 'not-allowed' : 'pointer'
                }}>
                {submitMutation.isPending ? 'Submitting...' : isLastSection ? <><Send size={18} /> Submit Exam</> : <>Next Section <ChevronRight size={18} /></>}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
