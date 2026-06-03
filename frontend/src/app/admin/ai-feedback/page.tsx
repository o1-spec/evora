'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { MessageSquare, Check, Eye } from 'lucide-react';
import { toast } from '@/components/admin/Toast';

async function fetchAiFeedback(page: number) {
  const { data } = await api.get(`/admin/ai-feedback?page=${page}&limit=20`);
  return data.data;
}

export default function AdminAiFeedbackPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<any>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-ai-feedback', page],
    queryFn: () => fetchAiFeedback(page),
  });

  const reviewMutation = useMutation({
    mutationFn: async ({ id, isReviewed }: { id: string; isReviewed: boolean }) => {
      const { data } = await api.patch(`/admin/ai-feedback/${id}/review`, { isReviewed });
      return data;
    },
    onSuccess: (res: any) => {
      toast.success(res.data.feedback.isReviewed ? 'Feedback marked as reviewed.' : 'Feedback marked as pending.');
      queryClient.invalidateQueries({ queryKey: ['admin-ai-feedback', page] });
      // Update local state if currently open in detail
      if (detail && detail.id === res.data.feedback.id) {
        setDetail((prev: any) => ({
          ...prev,
          isReviewed: res.data.feedback.isReviewed,
          reviewedAt: res.data.feedback.reviewedAt,
        }));
      }
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(err.response?.data?.error || 'Failed to update review status.');
    }
  });

  const handleToggleReview = (fb: any) => {
    reviewMutation.mutate({ id: fb.id, isReviewed: !fb.isReviewed });
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">AI Feedback</h1>
        <p className="admin-page-subtitle">Review all AI-generated feedback for student exam submissions</p>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Exam</th>
                <th>Section</th>
                <th>Score</th>
                <th>CLB</th>
                <th>Status</th>
                <th>Generated</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(8)].map((_, i) => <tr key={i}>{[...Array(8)].map((_, j) => <td key={j}><div className="skeleton" style={{ height: 16 }} /></td>)}</tr>)
              ) : data?.feedbacks?.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>No AI feedback records yet.</td></tr>
              ) : data?.feedbacks?.map((fb: any) => (
                <tr key={fb.id}>
                  <td>
                    <div className="admin-table-primary">{fb.attempt?.user?.firstName || ''} {fb.attempt?.user?.lastName || fb.attempt?.user?.email}</div>
                    <div className="admin-table-secondary">{fb.attempt?.user?.email}</div>
                  </td>
                  <td className="admin-table-secondary">{fb.attempt?.exam?.title}</td>
                  <td><AdminBadge value={fb.sectionType} variant="section" /></td>
                  <td>
                    <span style={{
                      color: fb.overallScore >= 75 ? '#10b981' : fb.overallScore >= 55 ? '#f97316' : '#ef4444',
                      fontWeight: 700,
                    }}>
                      {fb.overallScore.toFixed(1)}%
                    </span>
                  </td>
                  <td style={{ color: '#67e8f9', fontWeight: 700, fontSize: 13 }}>
                    {fb.attempt?.clbLevel || '—'}
                  </td>
                  <td>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 9999,
                      background: fb.isReviewed ? 'rgba(16,185,129,0.1)' : 'rgba(249,115,22,0.1)',
                      color: fb.isReviewed ? '#10b981' : '#f97316',
                    }}>
                      {fb.isReviewed ? 'Reviewed' : 'Pending'}
                    </span>
                  </td>
                  <td className="admin-table-secondary">
                    {new Date(fb.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 8 }}>
                      <button
                        className="admin-btn-icon"
                        onClick={() => handleToggleReview(fb)}
                        title={fb.isReviewed ? 'Mark as Pending' : 'Mark as Reviewed'}
                        disabled={reviewMutation.isPending}
                      >
                        <Check size={13} style={{ color: fb.isReviewed ? '#10b981' : '#64748b' }} />
                      </button>
                      <button
                        className="admin-btn-icon"
                        onClick={() => setDetail(fb)}
                        title="View Details"
                      >
                        <Eye size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data?.pagination && <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}><AdminPagination page={data.pagination.page} pages={data.pagination.pages} total={data.pagination.total} onPageChange={setPage} /></div>}
      </div>

      {/* Detail Drawer */}
      {detail && (
        <dialog open className="admin-modal" onClose={() => setDetail(null)}>
          <div className="admin-modal-content" style={{ minWidth: 520, maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: 16 }}>
              <h3 className="admin-modal-title" style={{ margin: 0 }}>AI Feedback Detail</h3>
              <button className="admin-modal-close" onClick={() => setDetail(null)}>✕</button>
            </div>
            
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              <AdminBadge value={detail.sectionType} variant="section" />
              <span style={{
                color: detail.overallScore >= 75 ? '#10b981' : detail.overallScore >= 55 ? '#f97316' : '#ef4444',
                fontWeight: 700,
                fontSize: 18,
              }}>
                {detail.overallScore.toFixed(1)}%
              </span>
              <span style={{
                marginLeft: 'auto',
                fontSize: 12,
                color: detail.isReviewed ? '#10b981' : '#f97316',
                fontWeight: 600,
              }}>
                {detail.isReviewed ? `Reviewed on ${new Date(detail.reviewedAt).toLocaleDateString()}` : 'Review Pending'}
              </span>
            </div>

            <div style={{ background: '#0b0f19', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <h4 style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Evaluator Notes</h4>
              <p style={{ color: '#f1f5f9', fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{detail.comments}</p>
            </div>

            {detail.strengths?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ color: '#10b981', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Key Strengths</h4>
                {detail.strengths.map((s: string, i: number) => <div key={i} style={{ color: '#a7f3d0', fontSize: 13, marginBottom: 4, display: 'flex', gap: 6 }}><span>✓</span> <span>{s}</span></div>)}
              </div>
            )}

            {detail.weaknesses?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ color: '#ef4444', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Areas to Improve</h4>
                {detail.weaknesses.map((w: string, i: number) => <div key={i} style={{ color: '#fca5a5', fontSize: 13, marginBottom: 4, display: 'flex', gap: 6 }}><span>✕</span> <span>{w}</span></div>)}
              </div>
            )}

            {detail.corrections?.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ color: '#f97316', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Granular Corrections</h4>
                {detail.corrections.map((c: any, i: number) => (
                  <div key={i} style={{ background: '#0b0f19', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 14px', marginBottom: 8 }}>
                    <div style={{ color: '#ef4444', fontSize: 13, textDecoration: 'line-through', marginBottom: 2 }}>{c.original}</div>
                    <div style={{ color: '#10b981', fontSize: 13, fontWeight: 600 }}>→ {c.suggested}</div>
                    {c.explanation && <div style={{ color: '#64748b', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>{c.explanation}</div>}
                  </div>
                ))}
              </div>
            )}

            <details style={{ marginBottom: 20 }}>
              <summary style={{ color: '#475569', fontSize: 12, cursor: 'pointer', outline: 'none' }}>Raw JSON Metadata</summary>
              <pre style={{ background: '#0b0f19', padding: 12, borderRadius: 8, fontSize: 11, color: '#67e8f9', overflow: 'auto', marginTop: 8, border: '1px solid rgba(255,255,255,0.04)' }}>
                {JSON.stringify(detail, null, 2)}
              </pre>
            </details>

            <div className="admin-modal-actions">
              <button
                className="admin-btn-primary"
                onClick={() => handleToggleReview(detail)}
                disabled={reviewMutation.isPending}
                style={{ background: detail.isReviewed ? '#f97316' : '#10b981' }}
              >
                <Check size={14} />
                <span>{detail.isReviewed ? 'Mark Pending' : 'Mark Reviewed'}</span>
              </button>
              <button className="admin-btn-ghost" onClick={() => setDetail(null)}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
