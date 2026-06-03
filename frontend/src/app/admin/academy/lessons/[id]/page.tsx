'use client';

import { useState, use } from 'react';
import { createPortal } from 'react-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { toast } from '@/components/admin/Toast';
import { Plus, Edit2, Trash2, ArrowLeft, HelpCircle, X } from 'lucide-react';
import Link from 'next/link';

async function fetchLessonDetail(id: string) {
  const { data } = await api.get(`/admin/academy/lessons/${id}`);
  return data.data.lesson;
}

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<{ id: string } | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<any>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [lessonDetailsOpen, setLessonDetailsOpen] = useState(false);
  const [lessonDetailsForm, setLessonDetailsForm] = useState({ title: '', description: '', content: '' });
  const [lessonJsonError, setLessonJsonError] = useState<string | null>(null);

  const emptyForm = { type: 'MULTIPLE_CHOICE', question: '', options: '[]', correctKey: '', audioUrl: '', points: 10 };
  const [form, setForm] = useState(emptyForm);

  const { data: lesson, isLoading, error } = useQuery({
    queryKey: ['admin-lesson-detail', id],
    queryFn: () => fetchLessonDetail(id),
  });

  const handleOptionsChange = (val: string) => {
    setForm(f => ({ ...f, options: val }));
    if (!val.trim()) {
      setJsonError(null);
      return;
    }
    try {
      const parsed = JSON.parse(val);
      if (!Array.isArray(parsed)) {
        setJsonError('Options must be a valid JSON array (e.g. ["A", "B"])');
      } else if (parsed.some((o: any) => typeof o !== 'string')) {
        setJsonError('All options must be strings');
      } else {
        setJsonError(null);
      }
    } catch (e: any) {
      setJsonError(`Invalid JSON syntax: ${e.message}`);
    }
  };

  const createMutation = useMutation({
    mutationFn: (payload: any) => api.post(`/admin/lessons/${id}/exercises`, payload),
    onSuccess: () => {
      toast.success('Exercise created.');
      queryClient.invalidateQueries({ queryKey: ['admin-lesson-detail', id] });
      setFormOpen(false);
      setForm(emptyForm);
      setJsonError(null);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to create exercise.'),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: any) => api.patch(`/admin/exercises/${payload.id}`, payload),
    onSuccess: () => {
      toast.success('Exercise updated.');
      queryClient.invalidateQueries({ queryKey: ['admin-lesson-detail', id] });
      setEditTarget(null);
      setJsonError(null);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to update exercise.'),
  });

  const deleteMutation = useMutation({
    mutationFn: (exerciseId: string) => api.delete(`/admin/exercises/${exerciseId}`),
    onSuccess: () => {
      toast.success('Exercise deleted.');
      queryClient.invalidateQueries({ queryKey: ['admin-lesson-detail', id] });
      setDeleteTarget(null);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to delete exercise.'),
  });

  const updateLessonMutation = useMutation({
    mutationFn: (payload: any) => api.patch(`/admin/academy/lessons/${id}`, payload),
    onSuccess: () => {
      toast.success('Lesson content updated.');
      queryClient.invalidateQueries({ queryKey: ['admin-lesson-detail', id] });
      setLessonDetailsOpen(false);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to update lesson details.'),
  });

  if (isLoading) return (
    <div className="admin-page">
      <div className="skeleton" style={{ height: 40, width: 140, marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 80, borderRadius: 16, marginBottom: 20 }} />
      <div className="skeleton" style={{ height: 250, borderRadius: 16 }} />
    </div>
  );

  if (error || !lesson) return (
    <div className="admin-page">
      <div className="admin-error-state">
        <HelpCircle size={40} />
        <h3>Lesson not found</h3>
        <p>Could not retrieve details for the requested lesson.</p>
        <Link href="/admin/academy" className="admin-btn-secondary" style={{ marginTop: 12 }}>
          <ArrowLeft size={14} /> Back to Academy
        </Link>
      </div>
    </div>
  );

  return (
    <div className="admin-page">
      <div style={{ marginBottom: 16 }}>
        <Link href="/admin/academy" className="admin-btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, textDecoration: 'none' }}>
          <ArrowLeft size={14} /> Back to Academy
        </Link>
      </div>

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{lesson.title}</h1>
          <p className="admin-page-subtitle">{lesson.description || 'Review and manage CEFR exercises'}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="admin-btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={() => {
              setLessonDetailsForm({
                title: lesson.title,
                description: lesson.description || '',
                content: JSON.stringify(lesson.content || {}, null, 2),
              });
              setLessonJsonError(null);
              setLessonDetailsOpen(true);
            }}
          >
            <Edit2 size={15} /> Edit Lesson Content
          </button>
          <button className="admin-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => { setForm(emptyForm); setEditTarget(null); setJsonError(null); setFormOpen(true); }}>
            <Plus size={16} /> New Exercise
          </button>
        </div>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Question Prompt</th>
                <th>Correct Key</th>
                <th>Points</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lesson.exercises?.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>
                    No exercises added to this lesson yet.
                  </td>
                </tr>
              ) : (
                lesson.exercises.map((ex: any) => (
                  <tr key={ex.id}>
                    <td>
                      <AdminBadge value={ex.type} variant="section" />
                    </td>
                    <td>
                      <div className="admin-table-primary" style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ex.question}
                      </div>
                      {ex.audioUrl && <span style={{ color: '#8b5cf6', fontSize: 11 }}>🔊 Audio</span>}
                    </td>
                    <td className="admin-table-secondary" style={{ fontFamily: 'monospace', fontSize: 12 }}>
                      {ex.correctKey}
                    </td>
                    <td className="admin-table-num" style={{ fontWeight: 600 }}>
                      {ex.points} pts
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          className="admin-btn-icon"
                          title="Edit Exercise"
                          onClick={() => {
                            setEditTarget(ex);
                            setForm({
                              type: ex.type,
                              question: ex.question,
                              options: JSON.stringify(ex.options || []),
                              correctKey: ex.correctKey,
                              audioUrl: ex.audioUrl || '',
                              points: ex.points,
                            });
                            setJsonError(null);
                          }}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          className="admin-btn-icon danger"
                          title="Delete Exercise"
                          onClick={() => setDeleteTarget({ id: ex.id })}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {(formOpen || editTarget) && typeof window !== 'undefined' && createPortal(
        <dialog open className="admin-modal" onClose={() => { setFormOpen(false); setEditTarget(null); }}>
          <div className="admin-modal-content" style={{ width: '100%', maxWidth: 460 }}>
            <div className="admin-modal-header">
              <div className="admin-modal-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                <HelpCircle size={20} style={{ color: '#8b5cf6' }} />
              </div>
              <button className="admin-modal-close" onClick={() => { setFormOpen(false); setEditTarget(null); }}>
                <X size={18} />
              </button>
            </div>
            <h3 className="admin-modal-title">{editTarget ? 'Edit Exercise' : 'New Exercise'}</h3>

            <div className="admin-form-group" style={{ marginTop: 16 }}>
              <label className="admin-label">Exercise Type</label>
              <select className="admin-select" style={{ width: '100%' }} value={form.type} onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))}>
                <option value="MULTIPLE_CHOICE" style={{ background: '#111827', color: '#f1f5f9' }}>Multiple Choice MCQ</option>
                <option value="FILL_IN_THE_BLANK" style={{ background: '#111827', color: '#f1f5f9' }}>Fill In The Blank</option>
                <option value="MATCHING" style={{ background: '#111827', color: '#f1f5f9' }}>Matching Grid</option>
                <option value="WRITING" style={{ background: '#111827', color: '#f1f5f9' }}>Written Answer</option>
                <option value="SPEAKING" style={{ background: '#111827', color: '#f1f5f9' }}>Speaking Prompt</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Question / Instruction Text</label>
              <textarea className="admin-textarea" style={{ width: '100%' }} rows={3} value={form.question} onChange={(e) => setForm(f => ({ ...f, question: e.target.value }))} placeholder="Enter exercise question prompt…" />
            </div>

            {form.type === 'MULTIPLE_CHOICE' && (
              <div className="admin-form-group">
                <label className="admin-label">Options (JSON array)</label>
                <textarea className="admin-textarea" style={{ width: '100%', fontFamily: 'monospace', fontSize: 12, borderColor: jsonError ? '#ef4444' : '' }} rows={2} value={form.options} onChange={(e) => handleOptionsChange(e.target.value)} placeholder='["Choice A", "Choice B", "Choice C"]' />
                {jsonError && <p style={{ color: '#ef4444', fontSize: 11, marginTop: 4 }}>{jsonError}</p>}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="admin-form-group">
                <label className="admin-label">Correct Key</label>
                <input className="admin-input" style={{ width: '100%' }} value={form.correctKey} onChange={(e) => setForm(f => ({ ...f, correctKey: e.target.value }))} placeholder="Correct answer value" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Points Awarded</label>
                <input type="number" className="admin-input" style={{ width: '100%' }} value={form.points} onChange={(e) => setForm(f => ({ ...f, points: Number(e.target.value) }))} min={1} />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Audio URL (optional)</label>
              <input className="admin-input" style={{ width: '100%' }} value={form.audioUrl} onChange={(e) => setForm(f => ({ ...f, audioUrl: e.target.value }))} placeholder="https://…" />
            </div>

            <div className="admin-modal-actions" style={{ marginTop: 24 }}>
              <button className="admin-btn-secondary" onClick={() => { setFormOpen(false); setEditTarget(null); }}>Cancel</button>
              <button
                className="admin-btn-primary"
                disabled={createMutation.isPending || updateMutation.isPending || !!jsonError}
                onClick={() => editTarget
                  ? updateMutation.mutate({ id: editTarget.id, ...form })
                  : createMutation.mutate(form)
                }
              >
                {(createMutation.isPending || updateMutation.isPending) ? 'Saving…' : (editTarget ? 'Save Changes' : 'Create')}
              </button>
            </div>
          </div>
        </dialog>,
        document.body
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Exercise"
        message="Permanently delete this exercise? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        loading={deleteMutation.isPending}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Edit Lesson Metadata & Content Portal */}
      {lessonDetailsOpen && typeof window !== 'undefined' && createPortal(
        <dialog open className="admin-modal" onClose={() => setLessonDetailsOpen(false)}>
          <div className="admin-modal-content" style={{ width: '100%', maxWidth: 540 }}>
            <div className="admin-modal-header">
              <div className="admin-modal-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                <Edit2 size={20} style={{ color: '#8b5cf6' }} />
              </div>
              <button className="admin-modal-close" onClick={() => setLessonDetailsOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <h3 className="admin-modal-title">Edit Lesson Content</h3>

            <div className="admin-form-group" style={{ marginTop: 16 }}>
              <label className="admin-label">Lesson Title</label>
              <input className="admin-input" style={{ width: '100%' }} value={lessonDetailsForm.title} onChange={(e) => setLessonDetailsForm(f => ({ ...f, title: e.target.value }))} />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Lesson Description</label>
              <textarea className="admin-textarea" style={{ width: '100%' }} rows={2} value={lessonDetailsForm.description} onChange={(e) => setLessonDetailsForm(f => ({ ...f, description: e.target.value }))} />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Structured Content (JSON)</label>
              <textarea
                className="admin-textarea"
                style={{ width: '100%', fontFamily: 'monospace', fontSize: 12, borderColor: lessonJsonError ? '#ef4444' : '' }}
                rows={8}
                value={lessonDetailsForm.content}
                onChange={(e) => {
                  const val = e.target.value;
                  setLessonDetailsForm(f => ({ ...f, content: val }));
                  if (!val.trim()) {
                    setLessonJsonError(null);
                    return;
                  }
                  try {
                    JSON.parse(val);
                    setLessonJsonError(null);
                  } catch (err: any) {
                    setLessonJsonError(`Invalid JSON syntax: ${err.message}`);
                  }
                }}
                placeholder='{ "grammar": "...", "vocabulary": ["word1", "word2"] }'
              />
              {lessonJsonError && <p style={{ color: '#ef4444', fontSize: 11, marginTop: 4 }}>{lessonJsonError}</p>}
            </div>

            <div className="admin-modal-actions" style={{ marginTop: 24 }}>
              <button className="admin-btn-secondary" onClick={() => setLessonDetailsOpen(false)}>Cancel</button>
              <button
                className="admin-btn-primary"
                disabled={updateLessonMutation.isPending || !!lessonJsonError}
                onClick={() => {
                  try {
                    const parsed = JSON.parse(lessonDetailsForm.content);
                    updateLessonMutation.mutate({
                      title: lessonDetailsForm.title,
                      description: lessonDetailsForm.description,
                      content: parsed
                    });
                  } catch {
                    toast.error('Please resolve JSON format errors before saving.');
                  }
                }}
              >
                {updateLessonMutation.isPending ? 'Saving...' : 'Save Lesson'}
              </button>
            </div>
          </div>
        </dialog>,
        document.body
      )}
    </div>
  );
}
