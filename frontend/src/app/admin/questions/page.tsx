'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { toast } from '@/components/admin/Toast';
import { Plus, Edit2, Trash2, Search, Eye, X, HelpCircle, ChevronDown } from 'lucide-react';

async function fetchQuestions(page: number, search: string, examId: string) {
  const params = new URLSearchParams({ page: String(page), limit: '25' });
  if (examId) params.set('examId', examId);
  const { data } = await api.get(`/admin/questions?${params}`);
  return data.data;
}

async function fetchExams() {
  const { data } = await api.get('/admin/exams?limit=100');
  return data.data;
}

export default function AdminQuestionsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [examId, setExamId] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<{ id: string } | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const emptyForm = { sectionId: '', text: '', options: '[]', correctKey: '', audioUrl: '', maxScore: 1, orderIndex: 0 };
  const [form, setForm] = useState(emptyForm);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-questions', page, examId],
    queryFn: () => fetchQuestions(page, search, examId),
  });

  const { data: examsData } = useQuery({
    queryKey: ['admin-exams-list'],
    queryFn: fetchExams,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/questions/${id}`),
    onSuccess: () => { toast.success('Question deleted.'); queryClient.invalidateQueries({ queryKey: ['admin-questions'] }); setDeleteTarget(null); },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed.'),
  });

  const saveMutation = useMutation({
    mutationFn: (payload: any) => {
      let parsedOptions = [];
      try {
        parsedOptions = JSON.parse(payload.options || '[]');
      } catch (err) {
        parsedOptions = [];
      }
      const formattedPayload = { ...payload, options: parsedOptions };
      return editTarget
        ? api.patch(`/admin/questions/${editTarget.id}`, formattedPayload)
        : api.post('/admin/questions', formattedPayload);
    },
    onSuccess: () => {
      toast.success(editTarget ? 'Question updated.' : 'Question created.');
      queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
      setFormOpen(false); setEditTarget(null); setForm(emptyForm);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed.'),
  });

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Questions</h1>
          <p className="admin-page-subtitle">Manage all TCF exam questions</p>
        </div>
        <button className="admin-btn-primary" onClick={() => { setFormOpen(true); setEditTarget(null); setForm(emptyForm); }}>
          <Plus size={16} /> New Question
        </button>
      </div>

      <div className="admin-filters">
        <div className="admin-search-wrap">
          <Search size={16} className="admin-search-icon" />
          <input type="text" placeholder="Search questions…" className="admin-search-input" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div style={{ position: 'relative', minWidth: 180 }}>
          <select
            className="admin-select"
            style={{ width: '100%', paddingRight: 36, appearance: 'none', WebkitAppearance: 'none' }}
            value={examId}
            onChange={(e) => { setExamId(e.target.value); setPage(1); }}
          >
            <option value="" style={{ background: '#111827', color: '#f1f5f9' }}>All Exams</option>
            {examsData?.exams?.map((e: any) => (
              <option key={e.id} value={e.id} style={{ background: '#111827', color: '#f1f5f9' }}>
                {e.title}
              </option>
            ))}
          </select>
          <ChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
        </div>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Exam</th>
                <th>Section</th>
                <th>Correct Key</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(8)].map((_, i) => <tr key={i}>{[...Array(6)].map((_, j) => <td key={j}><div className="skeleton" style={{ height: 16 }} /></td>)}</tr>)
              ) : data?.questions?.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>No questions found.</td></tr>
              ) : data?.questions?.map((q: any) => (
                <tr key={q.id}>
                  <td className="admin-table-num">{q.orderIndex + 1}</td>
                  <td>
                    <div className="admin-table-primary" style={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {q.text}
                    </div>
                    {q.audioUrl && <div className="admin-table-secondary">🔊 Audio</div>}
                  </td>
                  <td className="admin-table-secondary">{q.section?.exam?.title || '—'}</td>
                  <td><AdminBadge value={q.section?.type || '—'} variant="section" /></td>
                  <td className="admin-table-secondary" style={{ fontFamily: 'monospace', fontSize: 12 }}>{q.correctKey || '—'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="admin-btn-icon" title="Preview" onClick={() => setPreview(q)}><Eye size={13} /></button>
                      <button className="admin-btn-icon" title="Edit" onClick={() => {
                        setEditTarget(q);
                        setForm({ sectionId: q.sectionId, text: q.text, options: JSON.stringify(q.options || []), correctKey: q.correctKey || '', audioUrl: q.audioUrl || '', maxScore: q.maxScore, orderIndex: q.orderIndex });
                        setFormOpen(true);
                      }}><Edit2 size={13} /></button>
                      <button className="admin-btn-icon danger" title="Delete" onClick={() => setDeleteTarget({ id: q.id })}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data?.pagination && <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}><AdminPagination page={data.pagination.page} pages={data.pagination.pages} total={data.pagination.total} onPageChange={setPage} /></div>}
      </div>

      {/* Create / Edit Modal */}
      {formOpen && typeof window !== 'undefined' && createPortal(
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
            <h3 className="admin-modal-title">{editTarget ? 'Edit Question' : 'New Question'}</h3>

            <div className="admin-form-group" style={{ marginTop: 16 }}>
              <label className="admin-label">Question Text</label>
              <textarea className="admin-textarea" style={{ width: '100%' }} rows={3} value={form.text} onChange={(e) => setForm(f => ({ ...f, text: e.target.value }))} placeholder="Enter question text…" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Options (JSON array)</label>
              <textarea className="admin-textarea" style={{ width: '100%', fontFamily: 'monospace', fontSize: 12 }} rows={2} value={form.options} onChange={(e) => setForm(f => ({ ...f, options: e.target.value }))} placeholder='["Option A", "Option B", "Option C", "Option D"]' />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="admin-form-group">
                <label className="admin-label">Correct Key</label>
                <input className="admin-input" style={{ width: '100%' }} value={form.correctKey} onChange={(e) => setForm(f => ({ ...f, correctKey: e.target.value }))} placeholder="A / exact text" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Max Score</label>
                <input type="number" className="admin-input" style={{ width: '100%' }} value={form.maxScore} onChange={(e) => setForm(f => ({ ...f, maxScore: Number(e.target.value) }))} />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Audio URL (optional)</label>
              <input className="admin-input" style={{ width: '100%' }} value={form.audioUrl} onChange={(e) => setForm(f => ({ ...f, audioUrl: e.target.value }))} placeholder="https://…" />
            </div>
            <div className="admin-modal-actions" style={{ marginTop: 24 }}>
              <button className="admin-btn-secondary" onClick={() => { setFormOpen(false); setEditTarget(null); }}>Cancel</button>
              <button className="admin-btn-primary" disabled={saveMutation.isPending} onClick={() => saveMutation.mutate(form)}>
                {saveMutation.isPending ? 'Saving…' : (editTarget ? 'Save Changes' : 'Create')}
              </button>
            </div>
          </div>
        </dialog>,
        document.body
      )}

      {/* Preview Modal */}
      {preview && typeof window !== 'undefined' && createPortal(
        <dialog open className="admin-modal" onClose={() => setPreview(null)}>
          <div className="admin-modal-content" style={{ width: '100%', maxWidth: 420 }}>
            <div className="admin-modal-header">
              <div className="admin-modal-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                <Eye size={20} style={{ color: '#8b5cf6' }} />
              </div>
              <button className="admin-modal-close" onClick={() => setPreview(null)}>
                <X size={18} />
              </button>
            </div>
            <h3 className="admin-modal-title">Question Preview</h3>
            <div style={{ background: '#0f1729', borderRadius: 12, padding: '20px', marginTop: 16 }}>
              <p style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: 15 }}>{preview.text}</p>
              {preview.audioUrl && <audio controls src={preview.audioUrl} style={{ marginTop: 12, width: '100%' }} />}
              {preview.options && Array.isArray(preview.options) && (
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {preview.options.map((opt: string, i: number) => (
                    <div key={i} style={{
                      padding: '10px 16px', borderRadius: 8,
                      background: opt === preview.correctKey ? '#1a3a2a' : '#1a2035',
                      border: `1px solid ${opt === preview.correctKey ? '#22c55e44' : 'rgba(255,255,255,0.07)'}`,
                      color: opt === preview.correctKey ? '#86efac' : '#94a3b8', fontSize: 14,
                    }}>
                      {opt === preview.correctKey ? '✓ ' : ''}{opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="admin-modal-actions" style={{ marginTop: 24 }}>
              <button className="admin-btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setPreview(null)}>Close</button>
            </div>
          </div>
        </dialog>,
        document.body
      )}

      <ConfirmModal isOpen={!!deleteTarget} title="Delete Question" message="Permanently delete this question?" confirmLabel="Delete" variant="danger" loading={deleteMutation.isPending} onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
}
