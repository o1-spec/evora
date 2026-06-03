'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { toast } from '@/components/admin/Toast';
import { CreditCard, Calendar, Plus, X, ChevronDown } from 'lucide-react';
import { ConfirmModal } from '@/components/admin/ConfirmModal';

const TIERS = ['', 'FREE', 'BASIC', 'PREMIUM', 'PRO'];

async function fetchSubscriptions(page: number, tier: string) {
  const params = new URLSearchParams({ page: String(page), limit: '20' });
  if (tier) params.set('tier', tier);
  const { data } = await api.get(`/admin/subscriptions?${params}`);
  return data.data;
}

export default function AdminSubscriptionsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [tier, setTier] = useState('');
  const [editTarget, setEditTarget] = useState<any>(null);
  const [newTier, setNewTier] = useState('');
  const [extendDays, setExtendDays] = useState(30);
  const [cancelTarget, setCancelTarget] = useState<{ id: string; email: string } | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-subscriptions', page, tier],
    queryFn: () => fetchSubscriptions(page, tier),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: { userId: string; tier?: string; extendDays?: number; cancel?: boolean }) =>
      api.patch(`/admin/subscriptions/${payload.userId}`, payload),
    onSuccess: () => {
      toast.success('Subscription updated.');
      queryClient.invalidateQueries({ queryKey: ['admin-subscriptions'] });
      setEditTarget(null);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Update failed.'),
  });

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Subscriptions</h1>
        <p className="admin-page-subtitle">View and manage user subscription tiers and billing</p>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <div style={{ position: 'relative', minWidth: 160 }}>
          <select
            className="admin-select"
            style={{ width: '100%', paddingRight: 36, appearance: 'none', WebkitAppearance: 'none' }}
            value={tier}
            onChange={(e) => { setTier(e.target.value); setPage(1); }}
          >
            <option value="" style={{ background: '#111827', color: '#f1f5f9' }}>All Plans</option>
            {TIERS.filter(Boolean).map(t => (
              <option key={t} value={t} style={{ background: '#111827', color: '#f1f5f9' }}>
                {t}
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
                <th>User</th>
                <th>Plan</th>
                <th>Active Until</th>
                <th>Stripe ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(8)].map((_, i) => (
                  <tr key={i}>{[...Array(5)].map((_, j) => <td key={j}><div className="skeleton" style={{ height: 16 }} /></td>)}</tr>
                ))
              ) : data?.subscriptions?.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>No subscriptions found.</td></tr>
              ) : data?.subscriptions?.map((u: any) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="admin-avatar">{(u.firstName?.[0] || u.email[0]).toUpperCase()}</div>
                      <div>
                        <div className="admin-table-primary">{u.firstName || ''} {u.lastName || ''}{!u.firstName && !u.lastName ? u.email : ''}</div>
                        <div className="admin-table-secondary">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><AdminBadge value={u.subscriptionTier} variant="tier" /></td>
                  <td className="admin-table-secondary">
                    {u.subActiveUntil
                      ? new Date(u.subActiveUntil).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                      : <span style={{ color: '#475569' }}>—</span>}
                  </td>
                  <td className="admin-table-secondary" style={{ fontFamily: 'monospace', fontSize: 12 }}>
                    {u.stripeCustomerId ? u.stripeCustomerId.slice(0, 14) + '…' : '—'}
                  </td>
                  <td>
                    <button
                      className="admin-btn-icon"
                      title="Edit subscription"
                      onClick={() => { setEditTarget(u); setNewTier(u.subscriptionTier); setExtendDays(30); }}
                    >
                      <CreditCard size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data?.pagination && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <AdminPagination page={data.pagination.page} pages={data.pagination.pages} total={data.pagination.total} onPageChange={setPage} />
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editTarget && typeof window !== 'undefined' && createPortal(
        <dialog open className="admin-modal" onClose={() => setEditTarget(null)}>
          <div className="admin-modal-content" style={{ minWidth: 340 }}>
            <div className="admin-modal-header">
              <div className="admin-modal-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                <CreditCard size={20} style={{ color: '#8b5cf6' }} />
              </div>
              <button className="admin-modal-close" onClick={() => setEditTarget(null)}>
                <X size={18} />
              </button>
            </div>
            <h3 className="admin-modal-title">Edit Subscription</h3>
            <p className="admin-modal-message">
              Manage tier and extension for <strong>{editTarget.email}</strong>
            </p>

            <div className="admin-form-group">
              <label className="admin-label">Change Plan</label>
              <div style={{ position: 'relative' }}>
                <select
                  className="admin-select"
                  style={{ width: '100%', paddingRight: 36, appearance: 'none', WebkitAppearance: 'none' }}
                  value={newTier}
                  onChange={(e) => setNewTier(e.target.value)}
                >
                  {TIERS.filter(Boolean).map(t => (
                    <option key={t} value={t} style={{ background: '#111827', color: '#f1f5f9' }}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
              </div>
            </div>

            <div className="admin-form-group" style={{ marginTop: 12 }}>
              <label className="admin-label">Extend by (days)</label>
              <input
                type="number" min={1} max={365}
                className="admin-input"
                style={{ width: '100%' }}
                value={extendDays}
                onChange={(e) => setExtendDays(Number(e.target.value))}
              />
            </div>

            <div className="admin-modal-actions" style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', gap: 10, width: '100%' }}>
                <button className="admin-btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setEditTarget(null)}>Cancel</button>
                <button
                  className="admin-btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                  disabled={updateMutation.isPending}
                  onClick={() => updateMutation.mutate({ userId: editTarget.id, tier: newTier, extendDays })}
                >
                  {updateMutation.isPending ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
              <button
                className="admin-btn-danger"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={updateMutation.isPending}
                onClick={() => setCancelTarget({ id: editTarget.id, email: editTarget.email })}
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </dialog>,
        document.body
      )}

      {/* Cancel Confirmation */}
      <ConfirmModal
        isOpen={!!cancelTarget}
        title="Cancel Subscription"
        message={`Are you sure you want to cancel the subscription for ${cancelTarget?.email}? They will lose premium benefits immediately.`}
        confirmLabel="Cancel Subscription"
        variant="danger"
        loading={updateMutation.isPending}
        onConfirm={async () => {
          if (cancelTarget) {
            await updateMutation.mutateAsync({ userId: cancelTarget.id, cancel: true });
            setCancelTarget(null);
          }
        }}
        onCancel={() => setCancelTarget(null)}
      />
    </div>
  );
}
