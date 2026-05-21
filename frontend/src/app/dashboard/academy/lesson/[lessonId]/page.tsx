'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, Mic, PenLine, List, Volume2 } from 'lucide-react';
import api from '@/lib/api';

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [activeTab, setActiveTab] = useState<'content' | 'exercises'>('content');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, any>>({});

  const { data: lesson, isLoading } = useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => api.get(`/learning/lessons/${lessonId}`).then(r => r.data.lesson),
    enabled: !!lessonId,
  });

  const submitMutation = useMutation({
    mutationFn: ({ exerciseId, answer }: { exerciseId: string; answer: string }) =>
      api.post(`/learning/exercises/${exerciseId}/submit`, { answer }).then(r => r.data),
    onSuccess: (data, vars) => {
      setResults(prev => ({ ...prev, [vars.exerciseId]: data }));
    },
  });

  const content = lesson?.content as any;

  const TABS = [
    { key: 'content', label: 'Lesson Content', icon: List },
    { key: 'exercises', label: 'Exercises', icon: PenLine },
  ];

  return (
    <div style={{ maxWidth: 780, margin: '0 auto' }}>
      <button onClick={() => window.history.back()} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--text-secondary))', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 500 }}>
        <ArrowLeft size={16} /> Back
      </button>

      {isLoading ? (
        <div>
          <div className="skeleton" style={{ height: 40, width: 300, borderRadius: 8, marginBottom: '1rem' }} />
          <div className="skeleton" style={{ height: 300, borderRadius: 16 }} />
        </div>
      ) : lesson ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: 'hsl(var(--text-primary))' }}>{lesson.title}</h1>
          <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '2rem', fontSize: '0.95rem' }}>{lesson.description}</p>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'hsl(var(--bg-base))', borderRadius: '0.75rem', padding: '0.375rem', marginBottom: '2.5rem', width: 'fit-content', border: '1px solid hsl(var(--border))' }}>
            {TABS.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.2s', backgroundColor: activeTab === tab.key ? 'white' : 'transparent', color: activeTab === tab.key ? 'hsl(var(--primary))' : 'hsl(var(--text-secondary))', boxShadow: activeTab === tab.key ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}>
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'content' && (
              <motion.div key="content" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Vocabulary */}
                {content?.vocabulary?.length > 0 && (
                  <div className="card" style={{ padding: '2rem' }}>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--text-primary))' }}>
                      <Volume2 size={20} color="hsl(var(--primary))" /> Vocabulary
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {content.vocabulary.map((v: any, i: number) => (
                        <div key={i} style={{ backgroundColor: 'hsl(var(--bg-base))', borderRadius: '0.75rem', padding: '1rem', border: '1px solid hsl(var(--border))' }}>
                          <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'hsl(var(--primary))', marginBottom: '0.25rem' }}>{v.french}</div>
                          <div style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))' }}>{v.english}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grammar */}
                {content?.grammar && (
                  <div className="card" style={{ padding: '2rem', borderLeft: '4px solid hsl(var(--accent))' }}>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: 'hsl(var(--text-primary))' }}>
                      📐 {content.grammar.title}
                    </h2>
                    <pre style={{ fontFamily: 'Inter,sans-serif', whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: 1.8, color: 'hsl(var(--text-secondary))' }}>
                      {content.grammar.text}
                    </pre>
                  </div>
                )}

                {/* Reading */}
                {content?.reading && (
                  <div className="card" style={{ padding: '2rem' }}>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: 'hsl(var(--text-primary))' }}>📖 Reading Practice</h2>
                    <div style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'hsl(var(--text-secondary))', whiteSpace: 'pre-wrap' }}>
                      {content.reading}
                    </div>
                  </div>
                )}

                <button onClick={() => setActiveTab('exercises')} className="btn-primary" style={{ width: 'fit-content', marginTop: '1rem' }}>
                  Proceed to Exercises &rarr;
                </button>
              </motion.div>
            )}

            {activeTab === 'exercises' && (
              <motion.div key="exercises" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {lesson.exercises?.length === 0 && (
                  <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'hsl(var(--text-muted))' }}>
                    No exercises available for this lesson yet.
                  </div>
                )}
                {lesson.exercises?.map((ex: any, i: number) => {
                  const result = results[ex.id];
                  return (
                    <div key={ex.id} className="card" style={{ padding: '2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                        <span className="badge badge-primary">Exercise {i + 1}</span>
                        <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                          {ex.type.replace('_', ' ')}
                        </span>
                        <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'hsl(var(--primary))', fontWeight: 600 }}>{ex.points} pts</span>
                      </div>

                      <p style={{ fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem', color: 'hsl(var(--text-primary))', fontWeight: 500 }}>{ex.question}</p>

                      {ex.type === 'MULTIPLE_CHOICE' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {(ex.options as string[])?.map(opt => (
                            <button key={opt} onClick={() => setAnswers(p => ({ ...p, [ex.id]: opt }))}
                              style={{
                                textAlign: 'left', padding: '1rem 1.25rem', borderRadius: '0.75rem', cursor: 'pointer', fontSize: '0.95rem', transition: 'all 0.2s', border: '1px solid',
                                backgroundColor: answers[ex.id] === opt ? 'hsl(var(--primary-light))' : 'white',
                                borderColor: answers[ex.id] === opt ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                                color: answers[ex.id] === opt ? 'hsl(var(--primary-hover))' : 'hsl(var(--text-primary))',
                                fontWeight: answers[ex.id] === opt ? 600 : 400,
                              }}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {(ex.type === 'FILL_IN_THE_BLANK' || ex.type === 'WRITING') && (
                        <textarea value={answers[ex.id] || ''} onChange={e => setAnswers(p => ({ ...p, [ex.id]: e.target.value }))}
                          placeholder="Type your answer here..."
                          rows={ex.type === 'WRITING' ? 5 : 2}
                          className="input-field"
                          style={{ resize: 'vertical' }} />
                      )}

                      {ex.type === 'SPEAKING' && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 bg-[hsl(var(--bg-base))] rounded-xl border border-[hsl(var(--border))]">
                          <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'hsl(var(--accent-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Mic size={24} color="hsl(var(--accent))" />
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem', color: 'hsl(var(--text-primary))' }}>Speaking Practice</div>
                            <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))' }}>Navigate to the AI Tutor to record your response and receive immediate evaluation.</p>
                          </div>
                        </div>
                      )}

                      {result && (
                          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 rounded-xl flex flex-col sm:flex-row items-start gap-3"
                            style={{ backgroundColor: result.isCorrect ? 'hsl(142, 71%, 95%)' : 'hsl(0, 84%, 95%)', border: `1px solid ${result.isCorrect ? 'hsl(142, 71%, 45%, 0.3)' : 'hsl(0, 84%, 60%, 0.3)'}` }}>
                          {result.isCorrect ? <CheckCircle size={20} color="hsl(142, 71%, 45%)" style={{ flexShrink: 0, marginTop: 2 }} /> : <XCircle size={20} color="hsl(0, 84%, 60%)" style={{ flexShrink: 0, marginTop: 2 }} />}
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: result.isCorrect ? 'hsl(142, 71%, 40%)' : 'hsl(0, 84%, 50%)', marginBottom: '0.25rem' }}>
                              {result.isCorrect ? `✓ Correct! +${result.pointsEarned} points` : '✗ Incorrect'}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', lineHeight: 1.5 }}>{result.explanation}</div>
                          </div>
                        </motion.div>
                      )}

                      {ex.type !== 'SPEAKING' && (
                        <button onClick={() => submitMutation.mutate({ exerciseId: ex.id, answer: answers[ex.id] || '' })}
                          disabled={!answers[ex.id] || submitMutation.isPending} className="btn-primary" style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                          {submitMutation.isPending ? 'Checking...' : 'Check Answer'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </div>
  );
}
