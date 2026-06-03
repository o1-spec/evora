'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { ClipboardList, User, X } from 'lucide-react';

async function fetchAttempts(page: number, userId: string, examId: string) {
  const params = new URLSearchParams({ page: String(page), limit: '20' });
  if (userId) params.set('userId', userId);
  if (examId) params.set('examId', examId);
  const { data } = await api.get(`/admin/attempts?${params}`);
  return data.data;
}

export default function AdminAttemptsPage() {
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState('');
  const [examId, setExamId] = useState('');
  const [detail, setDetail] = useState<any>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-attempts', page, userId, examId],
    queryFn: () => fetchAttempts(page, userId, examId),
  });

  const { data: detailData } = useQuery({
    queryKey: ['admin-attempt-detail', detail?.id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/attempts/${detail.id}`);
      return data.data;
    },
    enabled: !!detail?.id,
  });

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Exam Attempts</h1>
        <p className="admin-page-subtitle">Browse all student TCF exam attempts and results</p>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Exam</th>
                <th>Started</th>
                <th>Status</th>
                <th>Score</th>
                <th>CLB</th>
                <th>AI Feedback</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(8)].map((_, i) => <tr key={i}>{[...Array(8)].map((_, j) => <td key={j}><div className="skeleton" style={{ height: 16 }} /></td>)}</tr>)
              ) : data?.attempts?.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>No attempts found.</td></tr>
              ) : data?.attempts?.map((a: any) => (
                <tr key={a.id}>
                  <td>
                    <div className="admin-table-primary">{a.user?.firstName || ''} {a.user?.lastName || a.user?.email}</div>
                    <div className="admin-table-secondary">{a.user?.email}</div>
                  </td>
                  <td className="admin-table-secondary">{a.exam?.title}</td>
                  <td className="admin-table-secondary">
                    {new Date(a.startedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                  </td>
                  <td><AdminBadge value={a.completedAt ? 'COMPLETED' : 'IN_PROGRESS'} /></td>
                  <td className="admin-table-num">
                    {a.rawScore != null ? `${a.rawScore.toFixed(1)}%` : '—'}
                  </td>
                  <td style={{ color: '#67e8f9', fontWeight: 700, fontSize: 13 }}>{a.clbLevel || '—'}</td>
                  <td className="admin-table-num">{a.feedbacks?.length ?? 0}</td>
                  <td>
                    <button className="admin-btn-icon" onClick={() => setDetail(a)} title="View detail">
                      <ClipboardList size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data?.pagination && <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}><AdminPagination page={data.pagination.page} pages={data.pagination.pages} total={data.pagination.total} onPageChange={setPage} /></div>}
      </div>

      {/* Detail Drawer */}
      {detail && typeof window !== 'undefined' && createPortal(
        <dialog open className="admin-modal" onClose={() => setDetail(null)}>
          <div className="admin-modal-content" style={{ width: '100%', maxWidth: 520, maxHeight: '80vh', overflowY: 'auto' }}>
            <div className="admin-modal-header">
              <div className="admin-modal-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                <ClipboardList size={20} style={{ color: '#8b5cf6' }} />
              </div>
              <button className="admin-modal-close" onClick={() => setDetail(null)}>
                <X size={18} />
              </button>
            </div>
            <h3 className="admin-modal-title">Attempt Detail</h3>
            {!detailData ? (
              <div className="skeleton" style={{ height: 200, marginTop: 16, borderRadius: 12 }} />
            ) : (
              <>
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <div style={{ flex: 1, background: '#0f1729', borderRadius: 12, padding: 16 }}>
                    <div className="admin-table-secondary" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>Student</div>
                    <div className="admin-table-primary" style={{ marginTop: 4 }}>{detailData.attempt?.user?.email}</div>
                  </div>
                  <div style={{ flex: 1, background: '#0f1729', borderRadius: 12, padding: 16 }}>
                    <div className="admin-table-secondary" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>CLB Level</div>
                    <div style={{ color: '#67e8f9', fontWeight: 700, fontSize: 20, marginTop: 4 }}>{detailData.attempt?.clbLevel || '—'}</div>
                  </div>
                  <div style={{ flex: 1, background: '#0f1729', borderRadius: 12, padding: 16 }}>
                    <div className="admin-table-secondary" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>Score</div>
                    <div style={{ color: '#86efac', fontWeight: 700, fontSize: 20, marginTop: 4 }}>{detailData.attempt?.rawScore != null ? `${detailData.attempt.rawScore.toFixed(1)}%` : '—'}</div>
                  </div>
                </div>

                <h4 style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 24, marginBottom: 12 }}>AI Feedback</h4>
                {detailData.attempt?.feedbacks?.map((fb: any) => (
                  <div key={fb.id} style={{ background: '#0f1729', borderRadius: 12, padding: 16, marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                      <AdminBadge value={fb.sectionType} variant="section" />
                      <span style={{ color: '#86efac', fontWeight: 700 }}>{fb.overallScore.toFixed(1)}%</span>
                    </div>
                    <p style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 8, lineHeight: 1.5 }}>{fb.comments}</p>
                    {fb.strengths?.length > 0 && (
                      <div style={{ fontSize: 12, color: '#a7f3d0' }}>
                        <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓ </span>
                        {(fb.strengths as string[]).join(' · ')}
                      </div>
                    )}
                    {fb.weaknesses?.length > 0 && (
                      <div style={{ fontSize: 12, marginTop: 4, color: '#fca5a5' }}>
                        <span style={{ color: '#f43f5e', fontWeight: 'bold' }}>✕ </span>
                        {(fb.weaknesses as string[]).join(' · ')}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
            <div className="admin-modal-actions" style={{ marginTop: 24 }}>
              <button className="admin-btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setDetail(null)}>Close</button>
            </div>
          </div>
        </dialog>,
        document.body
      )}
    </div>
  );
}
