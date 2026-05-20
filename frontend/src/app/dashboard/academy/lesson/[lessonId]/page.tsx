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
    { key: 'content', label: 'Leçon', icon: List },
    { key: 'exercises', label: 'Exercices', icon: PenLine },
  ];

  return (
    <div style={{ maxWidth: 780, margin: '0 auto' }}>
      <Link href={`/dashboard/academy`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(220,12%,55%)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> Retour
      </Link>

      {isLoading ? (
        <div>
          <div className="skeleton" style={{ height: 36, width: 260, borderRadius: 8, marginBottom: '0.75rem' }} />
          <div className="skeleton" style={{ height: 200, borderRadius: 12 }} />
        </div>
      ) : lesson ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.875rem', fontWeight: 800, marginBottom: '0.5rem' }}>{lesson.title}</h1>
          <p style={{ color: 'hsl(220,12%,55%)', marginBottom: '2rem', fontSize: '0.9rem' }}>{lesson.description}</p>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.625rem', padding: '0.25rem', marginBottom: '2rem', width: 'fit-content' }}>
            {TABS.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.15s', background: activeTab === tab.key ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === tab.key ? 'hsl(220,18%,95%)' : 'hsl(220,12%,55%)' }}>
                <tab.icon size={15} /> {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'content' && (
              <motion.div key="content" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Vocabulary */}
                {content?.vocabulary?.length > 0 && (
                  <div className="glass" style={{ padding: '1.75rem' }}>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Volume2 size={18} color="hsl(250,95%,64%)" /> Vocabulaire
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.875rem' }}>
                      {content.vocabulary.map((v: any, i: number) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.625rem', padding: '0.875rem', border: '1px solid rgba(255,255,255,0.07)' }}>
                          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'hsl(250,95%,72%)', marginBottom: '0.25rem' }}>{v.french}</div>
                          <div style={{ fontSize: '0.85rem', color: 'hsl(220,12%,60%)' }}>{v.english}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grammar */}
                {content?.grammar && (
                  <div className="glass" style={{ padding: '1.75rem', borderLeft: '3px solid hsl(162,82%,50%)' }}>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'hsl(162,82%,60%)' }}>
                      📐 {content.grammar.title}
                    </h2>
                    <pre style={{ fontFamily: 'Inter,sans-serif', whiteSpace: 'pre-wrap', fontSize: '0.9rem', lineHeight: 1.8, color: 'hsl(220,12%,72%)' }}>
                      {content.grammar.text}
                    </pre>
                  </div>
                )}

                {/* Reading */}
                {content?.reading && (
                  <div className="glass" style={{ padding: '1.75rem' }}>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>📖 Lecture</h2>
                    <div style={{ fontSize: '0.925rem', lineHeight: 1.9, color: 'hsl(220,12%,72%)', whiteSpace: 'pre-wrap' }}>
                      {content.reading}
                    </div>
                  </div>
                )}

                <button onClick={() => setActiveTab('exercises')} className="btn-primary" style={{ width: 'fit-content' }}>
                  Passer aux exercices →
                </button>
              </motion.div>
            )}

            {activeTab === 'exercises' && (
              <motion.div key="exercises" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {lesson.exercises?.length === 0 && (
                  <div className="glass" style={{ padding: '2.5rem', textAlign: 'center', color: 'hsl(220,12%,50%)' }}>
                    Aucun exercice pour cette leçon.
                  </div>
                )}
                {lesson.exercises?.map((ex: any, i: number) => {
                  const result = results[ex.id];
                  return (
                    <div key={ex.id} className="glass" style={{ padding: '1.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <span className="badge badge-primary">Ex. {i + 1}</span>
                        <span style={{ fontSize: '0.78rem', color: 'hsl(220,12%,50%)', textTransform: 'capitalize' }}>
                          {ex.type.replace('_', ' ').toLowerCase()}
                        </span>
                        <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'hsl(250,95%,64%)' }}>{ex.points} pts</span>
                      </div>

                      <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{ex.question}</p>

                      {ex.type === 'MULTIPLE_CHOICE' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                          {(ex.options as string[])?.map(opt => (
                            <button key={opt} onClick={() => setAnswers(p => ({ ...p, [ex.id]: opt }))}
                              style={{
                                textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '0.625rem', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.15s', border: '1px solid',
                                background: answers[ex.id] === opt ? 'hsla(250,95%,64%,0.15)' : 'rgba(255,255,255,0.04)',
                                borderColor: answers[ex.id] === opt ? 'hsl(250,95%,64%)' : 'rgba(255,255,255,0.08)',
                                color: answers[ex.id] === opt ? 'hsl(250,95%,72%)' : 'hsl(220,12%,70%)',
                              }}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {(ex.type === 'FILL_IN_THE_BLANK' || ex.type === 'WRITING') && (
                        <textarea value={answers[ex.id] || ''} onChange={e => setAnswers(p => ({ ...p, [ex.id]: e.target.value }))}
                          placeholder="Écrivez votre réponse ici..."
                          rows={ex.type === 'WRITING' ? 5 : 2}
                          style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.625rem', color: 'hsl(220,18%,92%)', fontSize: '0.9rem', fontFamily: 'Inter,sans-serif', resize: 'vertical', outline: 'none' }} />
                      )}

                      {ex.type === 'SPEAKING' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.625rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'hsla(162,82%,50%,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Mic size={20} color="hsl(162,82%,50%)" />
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>Exercice de prononciation</div>
                            <p style={{ fontSize: '0.8rem', color: 'hsl(220,12%,55%)' }}>Allez dans le Tuteur IA pour enregistrer votre réponse orale et recevoir une évaluation.</p>
                          </div>
                        </div>
                      )}

                      {result && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          style={{ marginTop: '1rem', padding: '0.875rem 1rem', borderRadius: '0.625rem', background: result.isCorrect ? 'hsla(162,82%,50%,0.1)' : 'hsla(0,84%,60%,0.1)', border: `1px solid ${result.isCorrect ? 'hsla(162,82%,50%,0.3)' : 'hsla(0,84%,60%,0.3)'}`, display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                          {result.isCorrect ? <CheckCircle size={18} color="hsl(162,82%,55%)" style={{ flexShrink: 0, marginTop: 2 }} /> : <XCircle size={18} color="hsl(0,84%,65%)" style={{ flexShrink: 0, marginTop: 2 }} />}
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: result.isCorrect ? 'hsl(162,82%,60%)' : 'hsl(0,84%,65%)', marginBottom: '0.25rem' }}>
                              {result.isCorrect ? `✓ Correct ! +${result.pointsEarned} points` : '✗ Incorrect'}
                            </div>
                            <div style={{ fontSize: '0.83rem', color: 'hsl(220,12%,60%)' }}>{result.explanation}</div>
                          </div>
                        </motion.div>
                      )}

                      {ex.type !== 'SPEAKING' && (
                        <button onClick={() => submitMutation.mutate({ exerciseId: ex.id, answer: answers[ex.id] || '' })}
                          disabled={!answers[ex.id] || submitMutation.isPending} className="btn-primary" style={{ marginTop: '1rem', padding: '0.625rem 1.5rem', fontSize: '0.875rem' }}>
                          {submitMutation.isPending ? 'Envoi...' : 'Vérifier'}
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
