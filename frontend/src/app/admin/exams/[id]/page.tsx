'use client';

import { useState, use } from 'react';
import { createPortal } from 'react-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { toast } from '@/components/admin/Toast';
import { Plus, Edit2, Trash2, ArrowLeft, Layers, X, Clock, Sliders } from 'lucide-react';
import Link from 'next/link';

async function fetchExamDetail(id: string) {
  const { data } = await api.get(`/admin/exams/${id}`);
  return data.data.exam;
}

export default function ExamSectionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; type: string } | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<any>(null);
  
  const emptyForm = { type: 'LISTENING', durationMin: 30, orderIndex: 0 };
  const [form, setForm] = useState(emptyForm);

  const { data: exam, isLoading, error } = useQuery({
    queryKey: ['admin-exam-detail', id],
    queryFn: () => fetchExamDetail(id),
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => api.post(`/admin/exams/${id}/sections`, payload),
    onSuccess: () => {
      toast.success('Section created.');
      queryClient.invalidateQueries({ queryKey: ['admin-exam-detail', id] });
      setFormOpen(false);
      setForm(emptyForm);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to create section.'),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: any) => api.patch(`/admin/sections/${payload.id}`, payload),
    onSuccess: () => {
      toast.success('Section updated.');
      queryClient.invalidateQueries({ queryKey: ['admin-exam-detail', id] });
      setEditTarget(null);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to update section.'),
  });

  const deleteMutation = useMutation({
    mutationFn: (sectionId: string) => api.delete(`/admin/sections/${sectionId}`),
    onSuccess: () => {
      toast.success('Section deleted.');
      queryClient.invalidateQueries({ queryKey: ['admin-exam-detail', id] });
      setDeleteTarget(null);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to delete section.'),
  });

  if (isLoading) return (
    <div className="admin-page">
      <div className="skeleton" style={{ height: 40, width: 140, marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 80, borderRadius: 16, marginBottom: 20 }} />
      <div className="skeleton" style={{ height: 250, borderRadius: 16 }} />
    </div>
  );

  if (error || !exam) return (
    <div className="admin-page">
      <div className="admin-error-state">
        <Layers size={40} />
        <h3>Exam not found</h3>
        <p>Could not retrieve details for the requested TCF exam.</p>
        <Link href="/admin/exams" className="admin-btn-secondary" style={{ marginTop: 12 }}>
          <ArrowLeft size={14} /> Back to Exams
        </Link>
      </div>
    </div>
  );

  return (
    <div className="admin-page">
      <div style={{ marginBottom: 16 }}>
        <Link href="/admin/exams" className="admin-btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, textDecoration: 'none' }}>
          <ArrowLeft size={14} /> Back to Exams
        </Link>
      </div>

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{exam.title}</h1>
          <p className="admin-page-subtitle">{exam.description || 'Manage sections for this TCF exam simulation'}</p>
        </div>
        <button className="admin-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => { setForm(emptyForm); setEditTarget(null); setFormOpen(true); }}>
          <Plus size={16} /> New Section
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Section Type</th>
                <th>Duration</th>
                <th>Questions Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exam.sections?.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>
                    No sections added to this exam yet.
                  </td>
                </tr>
              ) : (
                exam.sections.map((section: any) => (
                  <tr key={section.id}>
                    <td className="admin-table-num">{section.orderIndex + 1}</td>
                    <td>
                      <AdminBadge value={section.type} variant="section" />
                    </td>
                    <td className="admin-table-secondary">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Clock size={13} /> {section.durationMin} minutes
                      </div>
                    </td>
                    <td>
                      <span className="admin-table-primary" style={{ fontWeight: 600 }}>
                        {section._count?.questions ?? 0} questions
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          className="admin-btn-icon"
                          title="Edit Section"
                          onClick={() => {
                            setEditTarget(section);
                            setForm({
                              type: section.type,
                              durationMin: section.durationMin,
                              orderIndex: section.orderIndex,
                            });
                          }}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          className="admin-btn-icon danger"
                          title="Delete Section"
                          onClick={() => setDeleteTarget({ id: section.id, type: section.type })}
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

      {/* Create Modal */}
      {formOpen && typeof window !== 'undefined' && createPortal(
        <dialog open className="admin-modal" onClose={() => setFormOpen(false)}>
          <div className="admin-modal-content" style={{ width: '100%', maxWidth: 400 }}>
            <div className="admin-modal-header">
              <div className="admin-modal-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                <Layers size={20} style={{ color: '#8b5cf6' }} />
              </div>
              <button className="admin-modal-close" onClick={() => setFormOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <h3 className="admin-modal-title">New Exam Section</h3>

            <div className="admin-form-group" style={{ marginTop: 16 }}>
              <label className="admin-label">Section Type</label>
              <select className="admin-select" style={{ width: '100%' }} value={form.type} onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))}>
                <option value="LISTENING" style={{ background: '#111827', color: '#f1f5f9' }}>Listening Comprehension</option>
                <option value="READING" style={{ background: '#111827', color: '#f1f5f9' }}>Reading Comprehension</option>
                <option value="WRITING" style={{ background: '#111827', color: '#f1f5f9' }}>Written Expression</option>
                <option value="SPEAKING" style={{ background: '#111827', color: '#f1f5f9' }}>Oral Expression</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="admin-form-group">
                <label className="admin-label">Duration (mins)</label>
                <input type="number" className="admin-input" style={{ width: '100%' }} value={form.durationMin} onChange={(e) => setForm(f => ({ ...f, durationMin: Number(e.target.value) }))} min={1} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Order Index</label>
                <input type="number" className="admin-input" style={{ width: '100%' }} value={form.orderIndex} onChange={(e) => setForm(f => ({ ...f, orderIndex: Number(e.target.value) }))} min={0} />
              </div>
            </div>

            <div className="admin-modal-actions" style={{ marginTop: 24 }}>
              <button className="admin-btn-secondary" onClick={() => setFormOpen(false)}>Cancel</button>
              <button className="admin-btn-primary" disabled={createMutation.isPending} onClick={() => createMutation.mutate(form)}>
                {createMutation.isPending ? 'Creating…' : 'Create Section'}
              </button>
            </div>
          </div>
        </dialog>,
        document.body
      )}

      {/* Edit Modal */}
      {editTarget && typeof window !== 'undefined' && createPortal(
        <dialog open className="admin-modal" onClose={() => setEditTarget(null)}>
          <div className="admin-modal-content" style={{ width: '100%', maxWidth: 400 }}>
            <div className="admin-modal-header">
              <div className="admin-modal-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                <Sliders size={20} style={{ color: '#8b5cf6' }} />
              </div>
              <button className="admin-modal-close" onClick={() => setEditTarget(null)}>
                <X size={18} />
              </button>
            </div>
            <h3 className="admin-modal-title">Edit Section</h3>

            <div className="admin-form-group" style={{ marginTop: 16 }}>
              <label className="admin-label">Section Type</label>
              <select className="admin-select" style={{ width: '100%' }} value={form.type} onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))}>
                <option value="LISTENING" style={{ background: '#111827', color: '#f1f5f9' }}>Listening Comprehension</option>
                <option value="READING" style={{ background: '#111827', color: '#f1f5f9' }}>Reading Comprehension</option>
                <option value="WRITING" style={{ background: '#111827', color: '#f1f5f9' }}>Written Expression</option>
                <option value="SPEAKING" style={{ background: '#111827', color: '#f1f5f9' }}>Oral Expression</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="admin-form-group">
                <label className="admin-label">Duration (mins)</label>
                <input type="number" className="admin-input" style={{ width: '100%' }} value={form.durationMin} onChange={(e) => setForm(f => ({ ...f, durationMin: Number(e.target.value) }))} min={1} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Order Index</label>
                <input type="number" className="admin-input" style={{ width: '100%' }} value={form.orderIndex} onChange={(e) => setForm(f => ({ ...f, orderIndex: Number(e.target.value) }))} min={0} />
              </div>
            </div>

            <div className="admin-modal-actions" style={{ marginTop: 24 }}>
              <button className="admin-btn-secondary" onClick={() => setEditTarget(null)}>Cancel</button>
              <button className="admin-btn-primary" disabled={updateMutation.isPending} onClick={() => updateMutation.mutate({ id: editTarget.id, ...form })}>
                {updateMutation.isPending ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </dialog>,
        document.body
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Exam Section"
        message={`Are you sure you want to delete this ${deleteTarget?.type} section? This will delete all questions within this section.`}
        confirmLabel="Delete"
        variant="danger"
        loading={deleteMutation.isPending}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
