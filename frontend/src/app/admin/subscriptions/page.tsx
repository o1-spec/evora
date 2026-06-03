'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { toast } from '@/components/admin/Toast';
import { CreditCard, Calendar, Plus } from 'lucide-react';

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
        <select className="admin-select" value={tier} onChange={(e) => { setTier(e.target.value); setPage(1); }}>
          <option value="">All Plans</option>
          {TIERS.filter(Boolean).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
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
      {editTarget && (
        <dialog open className="admin-modal" onClose={() => setEditTarget(null)}>
          <div className="admin-modal-content" style={{ minWidth: 340 }}>
            <h3 className="admin-modal-title">Edit Subscription</h3>
            <p className="admin-modal-message">{editTarget.email}</p>

            <div className="admin-form-group" style={{ marginTop: 16 }}>
              <label className="admin-label">Change Plan</label>
              <select className="admin-select" style={{ width: '100%' }} value={newTier} onChange={(e) => setNewTier(e.target.value)}>
                {TIERS.filter(Boolean).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="admin-form-group" style={{ marginTop: 12 }}>
              <label className="admin-label">Extend by (days)</label>
              <input
                type="number" min={1} max={365}
                className="admin-input"
                value={extendDays}
                onChange={(e) => setExtendDays(Number(e.target.value))}
              />
            </div>

            <div className="admin-modal-actions" style={{ marginTop: 20, flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="admin-btn-ghost" onClick={() => setEditTarget(null)}>Cancel</button>
                <button
                  className="admin-btn-confirm"
                  style={{ background: '#3b82f6', flex: 1 }}
                  disabled={updateMutation.isPending}
                  onClick={() => updateMutation.mutate({ userId: editTarget.id, tier: newTier, extendDays })}
                >
                  <Plus size={14} /> {updateMutation.isPending ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
              <button
                className="admin-btn-confirm"
                style={{ background: '#ef4444', width: '100%' }}
                disabled={updateMutation.isPending}
                onClick={() => updateMutation.mutate({ userId: editTarget.id, cancel: true })}
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
