'use client';

import { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { Mail, CheckCircle, XCircle, Search, RefreshCw, Send } from 'lucide-react';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { toast } from '@/components/admin/Toast';

async function fetchEmailLogs({ page, search, status }: { page: number; search: string; status: string }) {
  const params: any = { page, limit: 15 };
  if (search) params.search = search;
  if (status) params.status = status;
  
  const { data } = await api.get('/admin/email-logs', { params });
  return data.data;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminEmailLogsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [resendingId, setResendingId] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-email-logs', page, search, status],
    queryFn: () => fetchEmailLogs({ page, search, status }),
  });

  const resendMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await api.post(`/admin/email-logs/resend/${userId}`);
      return data;
    },
    onSuccess: () => {
      toast.success('Verification email resent successfully.');
      refetch();
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(err.response?.data?.error || 'Failed to resend verification email.');
    },
    onSettled: () => {
      setResendingId(null);
    }
  });

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setPage(1);
  }, []);

  const handleResend = (userId: string) => {
    setResendingId(userId);
    resendMutation.mutate(userId);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Email History</h1>
        <p className="admin-page-subtitle">Track and debug verification, password reset, and registration emails</p>
      </div>

      {/* Filters */}
      <div className="admin-card" style={{ marginBottom: 20, padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 12, flex: 1, minWidth: 280 }}>
            {/* Search Input */}
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="text"
                className="admin-input"
                placeholder="Search by recipient email..."
                value={search}
                onChange={handleSearchChange}
                style={{ width: '100%', paddingLeft: 36 }}
              />
            </div>

            {/* Status Filter */}
            <select className="admin-select" value={status} onChange={handleStatusChange} style={{ minWidth: 140 }}>
              <option value="">All Statuses</option>
              <option value="SENT">Sent</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>

          <button className="admin-btn-secondary" onClick={() => refetch()} style={{ padding: '8px 12px' }}>
            <RefreshCw size={14} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        {isLoading ? (
          <div style={{ padding: 40 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 48, borderRadius: 8, marginBottom: 12 }} />
            ))}
          </div>
        ) : error ? (
          <div style={{ padding: 60, textAlign: 'center', color: '#ef4444' }}>
            <Mail size={40} style={{ margin: '0 auto 12px' }} />
            <h3>Failed to load email logs</h3>
            <p>Error connecting to the admin API. Please try again.</p>
          </div>
        ) : !data || data.logs.length === 0 ? (
          <div style={{ padding: 80, textAlign: 'center', color: '#64748b' }}>
            <Mail size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
            <h3 style={{ color: '#e2e8f0', marginBottom: 6 }}>No email logs found</h3>
            <p style={{ fontSize: 14 }}>Try adjusting your search query or filters.</p>
          </div>
        ) : (
          <>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Recipient</th>
                    <th>Email Type</th>
                    <th>Status</th>
                    <th>Sent Time</th>
                    <th>Error Details</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.logs.map((log: any) => (
                    <tr key={log.id}>
                      <td className="admin-table-primary">{log.toEmail}</td>
                      <td>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 6,
                          background: log.type === 'VERIFICATION' ? '#1e1b4b' : '#312e81',
                          color: log.type === 'VERIFICATION' ? '#c7d2fe' : '#e0e7ff',
                        }}>
                          {log.type}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {log.status === 'SENT' ? (
                            <>
                              <CheckCircle size={14} style={{ color: '#10b981' }} />
                              <span style={{ color: '#10b981', fontWeight: 600 }}>Sent</span>
                            </>
                          ) : (
                            <>
                              <XCircle size={14} style={{ color: '#ef4444' }} />
                              <span style={{ color: '#ef4444', fontWeight: 600 }}>Failed</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="admin-table-secondary">{formatDate(log.sentAt)}</td>
                      <td className="admin-table-secondary" style={{ maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={log.error || undefined}>
                        {log.error || '-'}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {log.type === 'VERIFICATION' && log.userId ? (
                          <button
                            className="admin-btn-secondary"
                            onClick={() => handleResend(log.userId)}
                            disabled={resendingId !== null}
                            style={{ padding: '6px 12px', fontSize: 12, gap: 6 }}
                          >
                            <Send size={12} />
                            <span>{resendingId === log.userId ? 'Resending...' : 'Resend'}</span>
                          </button>
                        ) : (
                          <span style={{ color: '#475569', fontSize: 12 }}>N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {data.pagination.pages > 1 && (
              <AdminPagination
                page={page}
                pages={data.pagination.pages}
                total={data.pagination.total}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
