'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { toast } from '@/components/admin/Toast';
import { Plus, Edit2, Trash2, ChevronRight, BookOpen, X } from 'lucide-react';

async function fetchExams(page: number) {
  const { data } = await api.get(`/admin/exams?page=${page}&limit=20`);
  return data.data;
}

export default function AdminExamsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<any>(null);
  const [form, setForm] = useState({ title: '', description: '', isOfficial: false });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-exams', page],
    queryFn: () => fetchExams(page),
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => api.post('/admin/exams', payload),
    onSuccess: () => { toast.success('Exam created.'); queryClient.invalidateQueries({ queryKey: ['admin-exams'] }); setFormOpen(false); setForm({ title: '', description: '', isOfficial: false }); },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Create failed.'),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: any) => api.patch(`/admin/exams/${payload.id}`, payload),
    onSuccess: () => { toast.success('Exam updated.'); queryClient.invalidateQueries({ queryKey: ['admin-exams'] }); setEditTarget(null); },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Update failed.'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/exams/${id}`),
    onSuccess: () => { toast.success('Exam deleted.'); queryClient.invalidateQueries({ queryKey: ['admin-exams'] }); setDeleteTarget(null); },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Delete failed.'),
  });

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">TCF Exams</h1>
          <p className="admin-page-subtitle">Manage all TCF Canada & TCF Québec exam simulations</p>
        </div>
        <button className="admin-btn-primary" onClick={() => setFormOpen(true)}>
          <Plus size={16} /> New Exam
        </button>
      </div>

      {/* Exam Grid */}
      <div className="admin-exam-grid">
        {isLoading ? (
          [...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 160, borderRadius: 16 }} />)
        ) : data?.exams?.length === 0 ? (
          <div className="admin-empty-state" style={{ gridColumn: '1/-1' }}>
            <BookOpen size={40} />
            <h3>No exams yet</h3>
            <p>Create your first TCF exam simulation.</p>
          </div>
        ) : data?.exams?.map((exam: any) => (
          <div key={exam.id} className="admin-exam-card">
            <div className="admin-exam-card-header">
              <div className="admin-exam-icon">
                <BookOpen size={18} />
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="admin-btn-icon" onClick={() => { setEditTarget(exam); setForm({ title: exam.title, description: exam.description, isOfficial: exam.isOfficial }); }}><Edit2 size={13} /></button>
                <button className="admin-btn-icon danger" onClick={() => setDeleteTarget({ id: exam.id, title: exam.title })}><Trash2 size={13} /></button>
              </div>
            </div>
            <h3 className="admin-exam-title">{exam.title}</h3>
            <p className="admin-exam-desc">{exam.description}</p>
            <div className="admin-exam-meta">
              <span>{exam._count?.sections ?? 0} sections</span>
              <span>{exam._count?.attempts ?? 0} attempts</span>
              {exam.isOfficial && <span className="admin-official-badge">Official</span>}
            </div>
            <a href={`/admin/exams/${exam.id}`} className="admin-exam-drill">
              View Sections <ChevronRight size={14} />
            </a>
          </div>
        ))}
      </div>

      {data?.pagination && <div style={{ marginTop: 24 }}><AdminPagination page={data.pagination.page} pages={data.pagination.pages} total={data.pagination.total} onPageChange={setPage} /></div>}

      {/* Create/Edit Modal */}
      {(formOpen || editTarget) && typeof window !== 'undefined' && createPortal(
        <dialog open className="admin-modal" onClose={() => { setFormOpen(false); setEditTarget(null); }}>
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <div className="admin-modal-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                <BookOpen size={20} style={{ color: '#8b5cf6' }} />
              </div>
              <button className="admin-modal-close" onClick={() => { setFormOpen(false); setEditTarget(null); }}>
                <X size={18} />
              </button>
            </div>
            <h3 className="admin-modal-title">{editTarget ? 'Edit Exam' : 'New Exam'}</h3>
            
            <div className="admin-form-group" style={{ marginTop: 16 }}>
              <label className="admin-label">Title</label>
              <input className="admin-input" style={{ width: '100%' }} value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} placeholder="TCF Canada — Simulation #1" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Description</label>
              <textarea className="admin-textarea" style={{ width: '100%' }} rows={3} value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Full simulation covering all 4 sections…" />
            </div>
            <label className="admin-checkbox-label" style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#94a3b8' }}>
              <input type="checkbox" checked={form.isOfficial} onChange={(e) => setForm(f => ({ ...f, isOfficial: e.target.checked }))} />
              Mark as Official
            </label>
            <div className="admin-modal-actions" style={{ marginTop: 24 }}>
              <button className="admin-btn-secondary" onClick={() => { setFormOpen(false); setEditTarget(null); }}>Cancel</button>
              <button
                className="admin-btn-primary"
                disabled={createMutation.isPending || updateMutation.isPending}
                onClick={() => editTarget
                  ? updateMutation.mutate({ id: editTarget.id, ...form })
                  : createMutation.mutate(form)
                }
              >
                {(createMutation.isPending || updateMutation.isPending) ? 'Saving…' : (editTarget ? 'Save Changes' : 'Create Exam')}
              </button>
            </div>
          </div>
        </dialog>,
        document.body
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Exam"
        message={`Delete "${deleteTarget?.title}"? This will also delete all sections, questions, and attempts.`}
        confirmLabel="Delete"
        variant="danger"
        loading={deleteMutation.isPending}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
