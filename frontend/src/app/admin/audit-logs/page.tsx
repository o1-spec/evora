'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { History, Shield, RefreshCw } from 'lucide-react';

async function fetchAuditLogs(page: number, action: string) {
  const params = new URLSearchParams({ page: String(page), limit: '20' });
  if (action) params.set('action', action);
  const { data } = await api.get(`/admin/audit-logs?${params}`);
  return data.data;
}

const ACTION_LABELS: Record<string, string> = {
  UPDATE_ROLE: 'Change User Role',
  SUSPEND_USER: 'Suspend User',
  ACTIVATE_USER: 'Activate User',
  DELETE_USER: 'Delete User Account',
  UPDATE_SUBSCRIPTION: 'Update Subscription',
  CANCEL_SUBSCRIPTION: 'Cancel Subscription',
  CREATE_EXAM: 'Create TCF Exam',
  UPDATE_EXAM: 'Update Exam Info',
  DELETE_EXAM: 'Delete Exam',
  CREATE_QUESTION: 'Create Question',
  UPDATE_QUESTION: 'Update Question',
  DELETE_QUESTION: 'Delete Question',
  IMPORT_QUESTIONS: 'Import Bulk Questions',
  UPDATE_SETTINGS: 'Update Settings',
};

export default function AdminAuditLogsPage() {
  const [page, setPage] = useState(1);
  const [actionFilter, setActionFilter] = useState('');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-audit-logs', page, actionFilter],
    queryFn: () => fetchAuditLogs(page, actionFilter),
  });

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Admin Audit Logs</h1>
          <p className="admin-page-subtitle">Track and audit all write & delete actions performed by administrators</p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card" style={{ marginBottom: 20, padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <select
            className="admin-select"
            value={actionFilter}
            onChange={(e) => { setActionFilter(e.target.value); setPage(1); }}
            style={{ minWidth: 200 }}
          >
            <option value="">All Actions</option>
            {Object.entries(ACTION_LABELS).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>

          <button className="admin-btn-secondary" onClick={() => refetch()} style={{ padding: '8px 12px' }}>
            <RefreshCw size={14} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Administrator</th>
                <th>Action</th>
                <th>Target Type</th>
                <th>Description</th>
                <th>IP Address</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(10)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(6)].map((_, j) => (
                      <td key={j}><div className="skeleton" style={{ height: 16, borderRadius: 4 }} /></td>
                    ))}
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '60px 0', color: '#ef4444' }}>
                    <Shield size={32} style={{ margin: '0 auto 12px' }} />
                    <h3>Failed to load audit logs</h3>
                    <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Check backend services and try again.</p>
                  </td>
                </tr>
              ) : data?.logs?.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
                    <History size={36} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                    <h3>No audit logs found</h3>
                    <p style={{ fontSize: 13, marginTop: 4 }}>Logs will appear once write actions are performed.</p>
                  </td>
                </tr>
              ) : (
                data?.logs?.map((log: any) => (
                  <tr key={log.id}>
                    <td>
                      <div className="admin-table-primary">
                        {log.user?.firstName || ''} {log.user?.lastName || ''}
                        {!log.user?.firstName && !log.user?.lastName ? log.user?.email : ''}
                      </div>
                      <div className="admin-table-secondary" style={{ fontSize: 11 }}>{log.user?.email}</div>
                    </td>
                    <td>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 6,
                        background: 'rgba(139, 92, 246, 0.1)',
                        color: '#c4b5fd',
                        fontFamily: 'monospace'
                      }}>
                        {log.action}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#94a3b8',
                      }}>
                        {log.targetType}
                      </span>
                    </td>
                    <td className="admin-table-primary" style={{ whiteSpace: 'normal', maxWidth: 300, lineHeight: 1.4 }}>
                      {log.description}
                    </td>
                    <td className="admin-table-secondary" style={{ fontFamily: 'monospace', fontSize: 12 }}>
                      {log.ipAddress || '—'}
                    </td>
                    <td className="admin-table-secondary">
                      {new Date(log.createdAt).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {data?.pagination && data.pagination.pages > 1 && (
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
    </div>
  );
}
