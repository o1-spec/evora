'use client';

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { toast } from '@/components/admin/Toast';
import { useAuthStore } from '@/store/useAuthStore';
import { Search, UserX, UserCheck, Trash2, ChevronDown } from 'lucide-react';

const ROLES = ['', 'STUDENT', 'INSTRUCTOR', 'ADMIN', 'SUPER_ADMIN'];
const TIERS = ['', 'FREE', 'BASIC', 'PREMIUM', 'PRO'];

async function fetchUsers(page: number, search: string, role: string, tier: string) {
  const params = new URLSearchParams({ page: String(page), limit: '20' });
  if (search) params.set('search', search);
  if (role) params.set('role', role);
  if (tier) params.set('tier', tier);
  const { data } = await api.get(`/admin/users?${params}`);
  return data.data;
}

export default function AdminUsersPage() {
  const { user: me } = useAuthStore();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [role, setRole] = useState('');
  const [tier, setTier] = useState('');
  
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; email: string } | null>(null);
  const [roleTarget, setRoleTarget] = useState<{ id: string; email: string; currentRole: string } | null>(null);
  const [suspendTarget, setSuspendTarget] = useState<{ id: string; email: string; isSuspended: boolean } | null>(null);
  
  const [newRole, setNewRole] = useState('');

  const searchTimerRef = { current: 0 as any };
  const handleSearchChange = (val: string) => {
    setSearch(val);
    clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => { setDebouncedSearch(val); setPage(1); }, 400);
  };

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users', page, debouncedSearch, role, tier],
    queryFn: () => fetchUsers(page, debouncedSearch, role, tier),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/users/${id}`),
    onSuccess: () => {
      toast.success('User deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setDeleteTarget(null);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || 'Failed to delete user.');
      setDeleteTarget(null);
    },
  });

  const roleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      api.patch(`/admin/users/${id}/role`, { role }),
    onSuccess: () => {
      toast.success('User role updated.');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setRoleTarget(null);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || 'Failed to update role.');
    },
  });

  const suspendMutation = useMutation({
    mutationFn: ({ id, isSuspended }: { id: string; isSuspended: boolean }) =>
      api.patch(`/admin/users/${id}/status`, { isSuspended }),
    onSuccess: (res: any) => {
      toast.success(res.data.user.isSuspended ? 'User suspended successfully.' : 'User activated successfully.');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setSuspendTarget(null);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || 'Failed to update user status.');
      setSuspendTarget(null);
    },
  });

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Users</h1>
        <p className="admin-page-subtitle">Manage all registered users, roles, and plans</p>
      </div>

      {/* Filters */}
      <div className="admin-card" style={{ marginBottom: 20, padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search by name or email…"
              className="admin-input"
              style={{ width: '100%', paddingLeft: 36 }}
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <select className="admin-select" value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }} style={{ minWidth: 140 }}>
            <option value="">All Roles</option>
            {ROLES.filter(Boolean).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select className="admin-select" value={tier} onChange={(e) => { setTier(e.target.value); setPage(1); }} style={{ minWidth: 140 }}>
            <option value="">All Plans</option>
            {TIERS.filter(Boolean).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Attempts</th>
                <th>AI Calls</th>
                <th>Joined</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(8)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(8)].map((_, j) => (
                      <td key={j}><div className="skeleton" style={{ height: 16, borderRadius: 4 }} /></td>
                    ))}
                  </tr>
                ))
              ) : data?.users?.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>
                    No users found.
                  </td>
                </tr>
              ) : data?.users?.map((u: any) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="admin-sidebar-avatar" style={{ width: 36, height: 36, fontSize: 14 }}>
                        {(u.firstName?.[0] || u.email[0]).toUpperCase()}
                      </div>
                      <div>
                        <div className="admin-table-primary">
                          {u.firstName || ''} {u.lastName || ''}
                          {!u.firstName && !u.lastName ? u.email : ''}
                        </div>
                        <div className="admin-table-secondary">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><AdminBadge value={u.role} variant="role" /></td>
                  <td><AdminBadge value={u.subscriptionTier} variant="tier" /></td>
                  <td>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 9999,
                      background: u.isSuspended ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                      color: u.isSuspended ? '#ef4444' : '#10b981',
                    }}>
                      {u.isSuspended ? 'Suspended' : 'Active'}
                    </span>
                  </td>
                  <td>{u._count?.examAttempts ?? 0}</td>
                  <td>{u._count?.aiUsageLogs ?? 0}</td>
                  <td className="admin-table-secondary">
                    {new Date(u.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 8 }}>
                      <button
                        className="admin-btn-icon"
                        title="Change role"
                        onClick={() => { setRoleTarget({ id: u.id, email: u.email, currentRole: u.role }); setNewRole(u.role); }}
                      >
                        <ChevronDown size={14} />
                      </button>
                      <button
                        className="admin-btn-icon"
                        title={u.isSuspended ? 'Activate user' : 'Suspend user'}
                        onClick={() => setSuspendTarget({ id: u.id, email: u.email, isSuspended: u.isSuspended })}
                        disabled={u.role === 'SUPER_ADMIN'}
                      >
                        {u.isSuspended ? <UserCheck size={14} style={{ color: '#10b981' }} /> : <UserX size={14} style={{ color: '#ef4444' }} />}
                      </button>
                      {me?.role === 'SUPER_ADMIN' && (
                        <button
                          className="admin-btn-icon"
                          title="Delete user"
                          onClick={() => setDeleteTarget({ id: u.id, email: u.email })}
                          disabled={u.role === 'SUPER_ADMIN'}
                        >
                          <Trash2 size={14} style={{ color: '#ef4444' }} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data?.pagination && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <AdminPagination
              page={data.pagination.page}
              pages={data.pagination.pages}
              total={data.pagination.total}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      {/* Change Role Modal */}
      {roleTarget && (
        <dialog open className="admin-modal" onClose={() => setRoleTarget(null)}>
          <div className="admin-modal-content">
            <h3 className="admin-modal-title">Change Role</h3>
            <p className="admin-modal-message">
              Changing role for <strong>{roleTarget.email}</strong>
            </p>
            <select
              className="admin-select"
              style={{ width: '100%', marginTop: 12 }}
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            >
              {ROLES.filter(Boolean).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <div className="admin-modal-actions" style={{ marginTop: 20 }}>
              <button className="admin-btn-ghost" onClick={() => setRoleTarget(null)}>Cancel</button>
              <button
                className="admin-btn-confirm"
                style={{ background: '#3b82f6' }}
                disabled={roleMutation.isPending}
                onClick={() => roleMutation.mutate({ id: roleTarget.id, role: newRole })}
              >
                {roleMutation.isPending ? 'Saving…' : 'Save Role'}
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Suspend Confirmation */}
      <ConfirmModal
        isOpen={!!suspendTarget}
        title={suspendTarget?.isSuspended ? 'Activate User' : 'Suspend User'}
        message={suspendTarget?.isSuspended
          ? `Are you sure you want to activate ${suspendTarget?.email}? This will restore access to the platform.`
          : `Are you sure you want to suspend ${suspendTarget?.email}? They will be immediately blocked from logging in.`
        }
        confirmLabel={suspendTarget?.isSuspended ? 'Activate' : 'Suspend'}
        variant={suspendTarget?.isSuspended ? 'default' : 'danger'}
        loading={suspendMutation.isPending}
        onConfirm={() => suspendTarget && suspendMutation.mutate({ id: suspendTarget.id, isSuspended: !suspendTarget.isSuspended })}
        onCancel={() => setSuspendTarget(null)}
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete User"
        message={`Permanently delete ${deleteTarget?.email}? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        loading={deleteMutation.isPending}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
