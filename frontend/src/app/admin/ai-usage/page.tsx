'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { Activity, Cpu, Zap } from 'lucide-react';

async function fetchAiUsage(page: number, service: string) {
  const params = new URLSearchParams({ page: String(page), limit: '25' });
  if (service) params.set('service', service);
  const { data } = await api.get(`/admin/ai-usage?${params}`);
  return data.data;
}

const SERVICE_LABELS: Record<string, string> = {
  'whisper_and_gpt_speaking': 'Whisper + GPT Speaking',
  'gpt-4o-writing-simulator': 'GPT Writing Eval',
  'gpt-4o-tutor-chat': 'Tutor Chat',
  'elevenlabs_tts': 'ElevenLabs TTS',
  'gpt-4o-writing': 'GPT Writing (Exam)',
  'gpt-4o-speaking': 'GPT Speaking (Exam)',
};

export default function AdminAiUsagePage() {
  const [page, setPage] = useState(1);
  const [service, setService] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-ai-usage', page, service],
    queryFn: () => fetchAiUsage(page, service),
  });

  const totals = data?.totals;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">AI Usage Logs</h1>
        <p className="admin-page-subtitle">Track all AI API calls, token usage, and service activity</p>
      </div>

      {/* Summary Cards */}
      {totals && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ background: '#1e3a5f', padding: 10, borderRadius: 10 }}><Activity size={20} style={{ color: '#3b82f6' }} /></div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>Total API Calls</div>
              <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 22 }}>{data.pagination.total.toLocaleString()}</div>
            </div>
          </div>
          <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ background: '#2e1a4a', padding: 10, borderRadius: 10 }}><Cpu size={20} style={{ color: '#a855f7' }} /></div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>Total Tokens</div>
              <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 22 }}>{((totals.inputToken || 0) + (totals.outputToken || 0)).toLocaleString()}</div>
            </div>
          </div>
          <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ background: '#1a3a10', padding: 10, borderRadius: 10 }}><Zap size={20} style={{ color: '#22c55e' }} /></div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>Est. Cost (USD)</div>
              <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 22 }}>${(totals.costUSD || 0).toFixed(4)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="admin-filters" style={{ paddingBottom: '20px' }}>
        <select className="admin-select" value={service} onChange={(e) => { setService(e.target.value); setPage(1); }}>
          <option value="">All Services</option>
          {Object.keys(SERVICE_LABELS).map(s => <option key={s} value={s}>{SERVICE_LABELS[s]}</option>)}
        </select>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Service</th>
                <th>Input Tokens</th>
                <th>Output Tokens</th>
                <th>Cost</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(10)].map((_, i) => <tr key={i}>{[...Array(6)].map((_, j) => <td key={j}><div className="skeleton" style={{ height: 16 }} /></td>)}</tr>)
              ) : data?.logs?.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>No AI usage logs yet.</td></tr>
              ) : data?.logs?.map((log: any) => (
                <tr key={log.id}>
                  <td>
                    <div className="admin-table-primary">{log.user?.email}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: 12, color: '#67e8f9', fontFamily: 'monospace', background: '#0f1729', padding: '3px 8px', borderRadius: 4 }}>
                      {log.service}
                    </span>
                  </td>
                  <td className="admin-table-num">{log.inputToken.toLocaleString()}</td>
                  <td className="admin-table-num">{log.outputToken.toLocaleString()}</td>
                  <td className="admin-table-secondary">{log.costUSD > 0 ? `$${log.costUSD.toFixed(6)}` : '—'}</td>
                  <td className="admin-table-secondary">
                    {new Date(log.timestamp).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data?.pagination && <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}><AdminPagination page={data.pagination.page} pages={data.pagination.pages} total={data.pagination.total} onPageChange={setPage} /></div>}
      </div>
    </div>
  );
}
