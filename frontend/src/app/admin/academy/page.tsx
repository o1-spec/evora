'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { GraduationCap, ChevronRight, BookOpen, Layers, Plus, Edit2, Trash2, X, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/admin/Toast';
import { ConfirmModal } from '@/components/admin/ConfirmModal';

async function fetchAcademy() {
  const { data } = await api.get('/admin/academy');
  return data.data;
}

const LEVEL_COLORS: Record<string, string> = {
  A1: '#22c55e', A2: '#86efac', B1: '#3b82f6', B2: '#67e8f9', C1: '#a855f7', C2: '#f97316',
};

export default function AdminAcademyPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['admin-academy'], queryFn: fetchAcademy });

  // Modal target states
  const [levelFormOpen, setLevelFormOpen] = useState(false);
  const [levelEditTarget, setLevelEditTarget] = useState<any>(null);
  const [levelForm, setLevelForm] = useState({ code: '', name: '', description: '' });

  const [moduleFormOpen, setModuleFormOpen] = useState(false);
  const [moduleEditTarget, setModuleEditTarget] = useState<any>(null);
  const [moduleLevelId, setModuleLevelId] = useState('');
  const [moduleForm, setModuleForm] = useState({ title: '', description: '', orderIndex: 0 });

  const [lessonFormOpen, setLessonFormOpen] = useState(false);
  const [lessonEditTarget, setLessonEditTarget] = useState<any>(null);
  const [lessonModuleId, setLessonModuleId] = useState('');
  const [lessonForm, setLessonForm] = useState({ title: '', description: '', orderIndex: 0 });

  const [deleteTarget, setDeleteTarget] = useState<{ id: string; type: 'LEVEL' | 'MODULE' | 'LESSON'; name: string } | null>(null);

  // Mutations
  const createLevelMut = useMutation({
    mutationFn: (payload: any) => api.post('/admin/academy/levels', payload),
    onSuccess: () => {
      toast.success('CEFR Level created.');
      queryClient.invalidateQueries({ queryKey: ['admin-academy'] });
      setLevelFormOpen(false);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to create level.'),
  });

  const updateLevelMut = useMutation({
    mutationFn: (payload: any) => api.patch(`/admin/academy/levels/${payload.id}`, payload),
    onSuccess: () => {
      toast.success('CEFR Level updated.');
      queryClient.invalidateQueries({ queryKey: ['admin-academy'] });
      setLevelEditTarget(null);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to update level.'),
  });

  const deleteLevelMut = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/academy/levels/${id}`),
    onSuccess: () => {
      toast.success('CEFR Level deleted.');
      queryClient.invalidateQueries({ queryKey: ['admin-academy'] });
      setDeleteTarget(null);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to delete level.'),
  });

  const createModuleMut = useMutation({
    mutationFn: (payload: any) => api.post('/admin/academy/modules', payload),
    onSuccess: () => {
      toast.success('Module created.');
      queryClient.invalidateQueries({ queryKey: ['admin-academy'] });
      setModuleFormOpen(false);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to create module.'),
  });

  const updateModuleMut = useMutation({
    mutationFn: (payload: any) => api.patch(`/admin/academy/modules/${payload.id}`, payload),
    onSuccess: () => {
      toast.success('Module updated.');
      queryClient.invalidateQueries({ queryKey: ['admin-academy'] });
      setModuleEditTarget(null);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to update module.'),
  });

  const deleteModuleMut = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/academy/modules/${id}`),
    onSuccess: () => {
      toast.success('Module deleted.');
      queryClient.invalidateQueries({ queryKey: ['admin-academy'] });
      setDeleteTarget(null);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to delete module.'),
  });

  const createLessonMut = useMutation({
    mutationFn: (payload: any) => api.post('/admin/academy/lessons', payload),
    onSuccess: () => {
      toast.success('Lesson created.');
      queryClient.invalidateQueries({ queryKey: ['admin-academy'] });
      setLessonFormOpen(false);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to create lesson.'),
  });

  const updateLessonMut = useMutation({
    mutationFn: (payload: any) => api.patch(`/admin/academy/lessons/${payload.id}`, payload),
    onSuccess: () => {
      toast.success('Lesson updated.');
      queryClient.invalidateQueries({ queryKey: ['admin-academy'] });
      setLessonEditTarget(null);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to update lesson.'),
  });

  const deleteLessonMut = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/academy/lessons/${id}`),
    onSuccess: () => {
      toast.success('Lesson deleted.');
      queryClient.invalidateQueries({ queryKey: ['admin-academy'] });
      setDeleteTarget(null);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to delete lesson.'),
  });

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'LEVEL') {
      deleteLevelMut.mutate(deleteTarget.id);
    } else if (deleteTarget.type === 'MODULE') {
      deleteModuleMut.mutate(deleteTarget.id);
    } else if (deleteTarget.type === 'LESSON') {
      deleteLessonMut.mutate(deleteTarget.id);
    }
  };

  const isMutating =
    deleteLevelMut.isPending || deleteModuleMut.isPending || deleteLessonMut.isPending;

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
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="admin-page-title">Academy Content</h1>
          <p className="admin-page-subtitle">Browse and manage CEFR levels A1–C2, modules, lessons, and exercises</p>
        </div>
        <button
          className="admin-btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          onClick={() => {
            setLevelForm({ code: '', name: '', description: '' });
            setLevelEditTarget(null);
            setLevelFormOpen(true);
          }}
        >
          <Plus size={16} /> New CEFR Level
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {data?.levels?.map((level: any) => (
          <div key={level.id} className="admin-card" style={{ position: 'relative' }}>
            
            {/* Level Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, borderBottom: '1px solid rgba(255, 255, 255, 0.04)', paddingBottom: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${LEVEL_COLORS[level.code] || '#8b5cf6'}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: LEVEL_COLORS[level.code] || '#8b5cf6', fontSize: 16, fontWeight: 800,
              }}>
                {level.code}
              </div>
              <div>
                <h2 style={{ color: '#f1f5f9', fontSize: 18, fontWeight: 700, margin: 0 }}>{level.name}</h2>
                <p style={{ color: '#64748b', fontSize: 13, margin: '2px 0 0 0' }}>{level.description}</p>
              </div>

              {/* Level Control panel */}
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  className="admin-btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', fontSize: 11 }}
                  onClick={() => {
                    setModuleLevelId(level.id);
                    setModuleForm({ title: '', description: '', orderIndex: (level.modules?.length || 0) + 1 });
                    setModuleEditTarget(null);
                    setModuleFormOpen(true);
                  }}
                >
                  <Plus size={12} /> Add Module
                </button>
                <button
                  className="admin-btn-icon"
                  title="Edit Level"
                  onClick={() => {
                    setLevelEditTarget(level);
                    setLevelForm({ code: level.code, name: level.name, description: level.description });
                    setLevelFormOpen(true);
                  }}
                >
                  <Edit2 size={13} />
                </button>
                <button
                  className="admin-btn-icon danger"
                  title="Delete Level"
                  onClick={() => setDeleteTarget({ id: level.id, type: 'LEVEL', name: `CEFR Level ${level.code}` })}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {/* Modules */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {level.modules?.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 0', color: '#475569', fontSize: 13, fontStyle: 'italic' }}>
                  No modules added under this level.
                </div>
              ) : (
                level.modules?.map((mod: any) => (
                  <div key={mod.id} style={{
                    background: '#0f1729', borderRadius: 12, padding: '16px 20px',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: mod.lessons?.length > 0 ? '1px solid rgba(255,255,255,0.03)' : 'none', paddingBottom: mod.lessons?.length > 0 ? 12 : 0, marginBottom: mod.lessons?.length > 0 ? 12 : 0 }}>
                      <Layers size={15} style={{ color: '#64748b', flexShrink: 0 }} />
                      <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>{mod.title}</span>
                      <span style={{ color: '#475569', fontSize: 12, fontStyle: 'italic' }}>({mod.description || 'No description'})</span>

                      {/* Module Control panel */}
                      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button
                          className="admin-btn-ghost"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', fontSize: 11, color: '#3b82f6' }}
                          onClick={() => {
                            setLessonModuleId(mod.id);
                            setLessonForm({ title: '', description: '', orderIndex: (mod.lessons?.length || 0) + 1 });
                            setLessonEditTarget(null);
                            setLessonFormOpen(true);
                          }}
                        >
                          <Plus size={12} /> Add Lesson
                        </button>
                        <button
                          className="admin-btn-icon"
                          style={{ width: 26, height: 26 }}
                          title="Edit Module"
                          onClick={() => {
                            setModuleEditTarget(mod);
                            setModuleForm({ title: mod.title, description: mod.description, orderIndex: mod.orderIndex });
                            setModuleFormOpen(true);
                          }}
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          className="admin-btn-icon danger"
                          style={{ width: 26, height: 26 }}
                          title="Delete Module"
                          onClick={() => setDeleteTarget({ id: mod.id, type: 'MODULE', name: `Module "${mod.title}"` })}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Lessons */}
                    {mod.lessons?.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 12 }}>
                        {mod.lessons.map((lesson: any) => (
                          <div key={lesson.id} className="admin-lesson-row" style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            color: '#94a3b8', fontSize: 13, background: 'rgba(255,255,255,0.01)',
                            padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.02)'
                          }}>
                            <BookOpen size={13} style={{ color: '#8b5cf6' }} />
                            <span style={{ flex: 1, fontWeight: 500 }}>{lesson.title}</span>
                            <span style={{ fontSize: 11, color: '#475569', marginRight: 12 }}>
                              {lesson._count?.exercises || 0} exercises
                            </span>

                            {/* Lesson Actions */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <a
                                href={`/admin/academy/lessons/${lesson.id}`}
                                className="admin-btn-ghost"
                                style={{ color: '#3b82f6', fontSize: 11, display: 'flex', alignItems: 'center', gap: 2, padding: '3px 8px', textDecoration: 'none' }}
                              >
                                View Exercises <ChevronRight size={12} />
                              </a>
                              <button
                                className="admin-btn-icon"
                                style={{ width: 24, height: 24 }}
                                title="Edit Lesson Metadata"
                                onClick={() => {
                                  setLessonEditTarget(lesson);
                                  setLessonForm({ title: lesson.title, description: lesson.description, orderIndex: lesson.orderIndex });
                                  setLessonFormOpen(true);
                                }}
                              >
                                <Edit2 size={11} />
                              </button>
                              <button
                                className="admin-btn-icon danger"
                                style={{ width: 24, height: 24 }}
                                title="Delete Lesson"
                                onClick={() => setDeleteTarget({ id: lesson.id, type: 'LESSON', name: `Lesson "${lesson.title}"` })}
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ─── LEVEL DIALOG MODAL ─── */}
      {(levelFormOpen || levelEditTarget) && typeof window !== 'undefined' && createPortal(
        <dialog open className="admin-modal" onClose={() => { setLevelFormOpen(false); setLevelEditTarget(null); }}>
          <div className="admin-modal-content" style={{ width: '100%', maxWidth: 440 }}>
            <div className="admin-modal-header">
              <div className="admin-modal-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                <GraduationCap size={20} style={{ color: '#8b5cf6' }} />
              </div>
              <button className="admin-modal-close" onClick={() => { setLevelFormOpen(false); setLevelEditTarget(null); }}>
                <X size={18} />
              </button>
            </div>
            <h3 className="admin-modal-title">{levelEditTarget ? 'Edit CEFR Level' : 'New CEFR Level'}</h3>

            <div className="admin-form-group" style={{ marginTop: 18 }}>
              <label className="admin-label">CEFR Code</label>
              <input
                className="admin-input"
                style={{ width: '100%' }}
                disabled={!!levelEditTarget}
                value={levelForm.code}
                onChange={(e) => setLevelForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                placeholder="A1, B2, C1, etc."
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Level Name</label>
              <input
                className="admin-input"
                style={{ width: '100%' }}
                value={levelForm.name}
                onChange={(e) => setLevelForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Debutant, Intermediate..."
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Description</label>
              <textarea
                className="admin-textarea"
                style={{ width: '100%' }}
                rows={3}
                value={levelForm.description}
                onChange={(e) => setLevelForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Enter level descriptions..."
              />
            </div>

            <div className="admin-modal-actions" style={{ marginTop: 24 }}>
              <button className="admin-btn-secondary" onClick={() => { setLevelFormOpen(false); setLevelEditTarget(null); }}>Cancel</button>
              <button
                className="admin-btn-primary"
                disabled={createLevelMut.isPending || updateLevelMut.isPending}
                onClick={() => levelEditTarget
                  ? updateLevelMut.mutate({ id: levelEditTarget.id, ...levelForm })
                  : createLevelMut.mutate(levelForm)
                }
              >
                {(createLevelMut.isPending || updateLevelMut.isPending) ? 'Saving...' : (levelEditTarget ? 'Save Changes' : 'Create')}
              </button>
            </div>
          </div>
        </dialog>,
        document.body
      )}

      {/* ─── MODULE DIALOG MODAL ─── */}
      {(moduleFormOpen || moduleEditTarget) && typeof window !== 'undefined' && createPortal(
        <dialog open className="admin-modal" onClose={() => { setModuleFormOpen(false); setModuleEditTarget(null); }}>
          <div className="admin-modal-content" style={{ width: '100%', maxWidth: 440 }}>
            <div className="admin-modal-header">
              <div className="admin-modal-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
                <Layers size={20} style={{ color: '#3b82f6' }} />
              </div>
              <button className="admin-modal-close" onClick={() => { setModuleFormOpen(false); setModuleEditTarget(null); }}>
                <X size={18} />
              </button>
            </div>
            <h3 className="admin-modal-title">{moduleEditTarget ? 'Edit Module' : 'New Module'}</h3>

            <div className="admin-form-group" style={{ marginTop: 18 }}>
              <label className="admin-label">Module Title</label>
              <input
                className="admin-input"
                style={{ width: '100%' }}
                value={moduleForm.title}
                onChange={(e) => setModuleForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Grammaire de base, Vocabulaire..."
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Description</label>
              <textarea
                className="admin-textarea"
                style={{ width: '100%' }}
                rows={3}
                value={moduleForm.description}
                onChange={(e) => setModuleForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Enter description..."
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Ordering Index</label>
              <input
                type="number"
                className="admin-input"
                style={{ width: '100%' }}
                value={moduleForm.orderIndex}
                onChange={(e) => setModuleForm(f => ({ ...f, orderIndex: Number(e.target.value) }))}
              />
            </div>

            <div className="admin-modal-actions" style={{ marginTop: 24 }}>
              <button className="admin-btn-secondary" onClick={() => { setModuleFormOpen(false); setModuleEditTarget(null); }}>Cancel</button>
              <button
                className="admin-btn-primary"
                disabled={createModuleMut.isPending || updateModuleMut.isPending}
                onClick={() => moduleEditTarget
                  ? updateModuleMut.mutate({ id: moduleEditTarget.id, ...moduleForm })
                  : createModuleMut.mutate({ levelId: moduleLevelId, ...moduleForm })
                }
              >
                {(createModuleMut.isPending || updateModuleMut.isPending) ? 'Saving...' : (moduleEditTarget ? 'Save Changes' : 'Create')}
              </button>
            </div>
          </div>
        </dialog>,
        document.body
      )}

      {/* ─── LESSON DIALOG MODAL ─── */}
      {(lessonFormOpen || lessonEditTarget) && typeof window !== 'undefined' && createPortal(
        <dialog open className="admin-modal" onClose={() => { setLessonFormOpen(false); setLessonEditTarget(null); }}>
          <div className="admin-modal-content" style={{ width: '100%', maxWidth: 440 }}>
            <div className="admin-modal-header">
              <div className="admin-modal-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                <BookOpen size={20} style={{ color: '#10b981' }} />
              </div>
              <button className="admin-modal-close" onClick={() => { setLessonFormOpen(false); setLessonEditTarget(null); }}>
                <X size={18} />
              </button>
            </div>
            <h3 className="admin-modal-title">{lessonEditTarget ? 'Edit Lesson Metadata' : 'New Lesson'}</h3>

            <div className="admin-form-group" style={{ marginTop: 18 }}>
              <label className="admin-label">Lesson Title</label>
              <input
                className="admin-input"
                style={{ width: '100%' }}
                value={lessonForm.title}
                onChange={(e) => setLessonForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Les articles définis, Présenter quelqu'un..."
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Description</label>
              <textarea
                className="admin-textarea"
                style={{ width: '100%' }}
                rows={3}
                value={lessonForm.description}
                onChange={(e) => setLessonForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Enter description..."
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Ordering Index</label>
              <input
                type="number"
                className="admin-input"
                style={{ width: '100%' }}
                value={lessonForm.orderIndex}
                onChange={(e) => setLessonForm(f => ({ ...f, orderIndex: Number(e.target.value) }))}
              />
            </div>

            <div className="admin-modal-actions" style={{ marginTop: 24 }}>
              <button className="admin-btn-secondary" onClick={() => { setLessonFormOpen(false); setLessonEditTarget(null); }}>Cancel</button>
              <button
                className="admin-btn-primary"
                disabled={createLessonMut.isPending || updateLessonMut.isPending}
                onClick={() => lessonEditTarget
                  ? updateLessonMut.mutate({ id: lessonEditTarget.id, ...lessonForm })
                  : createLessonMut.mutate({ moduleId: lessonModuleId, ...lessonForm, content: {} })
                }
              >
                {(createLessonMut.isPending || updateLessonMut.isPending) ? 'Saving...' : (lessonEditTarget ? 'Save Changes' : 'Create')}
              </button>
            </div>
          </div>
        </dialog>,
        document.body
      )}

      {/* ─── CONFIRM DELETE MODAL ─── */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title={`Delete ${deleteTarget?.type}`}
        message={`Are you sure you want to delete ${deleteTarget?.name}? This action will permanently remove this item and all nested modules, lessons, exercises, or progress metrics associated with it.`}
        confirmLabel="Delete Permanently"
        variant="danger"
        loading={isMutating}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
