'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from '@/components/admin/Toast';
import { Settings, Cpu, Sliders, AlertTriangle, Save, RefreshCw } from 'lucide-react';

async function fetchSettings() {
  const { data } = await api.get('/admin/settings');
  return data.data.settings;
}

export default function AdminSettingsPage() {
  const queryClient = useQueryClient();
  
  const [aiProvider, setAiProvider] = useState<'ollama' | 'openai'>('ollama');
  const [ollamaEnabled, setOllamaEnabled] = useState(true);
  const [openaiEnabled, setOpenaiEnabled] = useState(true);
  const [freeLimit, setFreeLimit] = useState(5);
  const [premiumLimit, setPremiumLimit] = useState(100);
  const [maintenance, setMaintenance] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: fetchSettings,
  });

  // Sync loaded settings to local state
  useEffect(() => {
    if (data) {
      if (data['ai.provider']) setAiProvider(data['ai.provider'] as any);
      if (data['ai.ollama.enabled']) setOllamaEnabled(data['ai.ollama.enabled'] === 'true');
      if (data['ai.openai.fallback']) setOpenaiEnabled(data['ai.openai.fallback'] === 'true');
      if (data['ai.free.dailyLimit']) setFreeLimit(Number(data['ai.free.dailyLimit']));
      if (data['ai.premium.dailyLimit']) setPremiumLimit(Number(data['ai.premium.dailyLimit']));
      if (data['maintenance.enabled']) setMaintenance(data['maintenance.enabled'] === 'true');
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: async (settingsObj: Record<string, string>) => {
      const { data } = await api.patch('/admin/settings', { settings: settingsObj });
      return data;
    },
    onSuccess: () => {
      toast.success('Platform settings updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(err.response?.data?.error || 'Failed to update platform settings.');
    }
  });

  const handleSave = () => {
    const payload = {
      'ai.provider': aiProvider,
      'ai.ollama.enabled': String(ollamaEnabled),
      'ai.openai.fallback': String(openaiEnabled),
      'ai.free.dailyLimit': String(freeLimit),
      'ai.premium.dailyLimit': String(premiumLimit),
      'maintenance.enabled': String(maintenance),
    };
    saveMutation.mutate(payload);
  };

  if (isLoading) return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Platform Settings</h1>
        <p className="admin-page-subtitle">Configure AI providers, usage limits, and platform-wide options</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640 }}>
        <div className="skeleton" style={{ height: 160, borderRadius: 14 }} />
        <div className="skeleton" style={{ height: 130, borderRadius: 14 }} />
        <div className="skeleton" style={{ height: 100, borderRadius: 14 }} />
      </div>
    </div>
  );

  if (error) return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Platform Settings</h1>
        <p className="admin-page-subtitle">Configure AI providers, usage limits, and platform-wide options</p>
      </div>
      <div className="admin-card" style={{ padding: 40, textAlign: 'center' }}>
        <AlertTriangle size={32} style={{ color: '#ef4444', margin: '0 auto 12px' }} />
        <h3 style={{ color: '#f1f5f9', marginBottom: 8 }}>Failed to load settings</h3>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 16 }}>Check your database connection and try again.</p>
        <button className="admin-btn-secondary" onClick={() => refetch()}>
          <RefreshCw size={14} />
          <span>Retry</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Platform Settings</h1>
        <p className="admin-page-subtitle">Configure AI providers, usage limits, and platform-wide options</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640 }}>

        {/* AI Provider */}
        <div className="admin-card">
          <div className="admin-card-header" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Cpu size={18} style={{ color: '#3b82f6' }} />
              <h2 className="admin-card-title">AI Provider Configuration</h2>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="admin-settings-row">
              <div>
                <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>Primary Provider</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>AI engine used for evaluation engines and essay reviews</div>
              </div>
              <select className="admin-select" value={aiProvider} onChange={(e) => setAiProvider(e.target.value as any)}>
                <option value="ollama">Ollama (Local / Llama3)</option>
                <option value="openai">OpenAI (Cloud / GPT-4o)</option>
              </select>
            </div>
            <div className="admin-settings-row">
              <div>
                <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>Enable Ollama</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>Allow routing evaluations to local server</div>
              </div>
              <label className="admin-toggle">
                <input type="checkbox" checked={ollamaEnabled} onChange={(e) => setOllamaEnabled(e.target.checked)} />
                <span className="admin-toggle-track" />
              </label>
            </div>
            <div className="admin-settings-row">
              <div>
                <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>OpenAI Fallback</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>Automatically fallback to OpenAI if local Ollama fails</div>
              </div>
              <label className="admin-toggle">
                <input type="checkbox" checked={openaiEnabled} onChange={(e) => setOpenaiEnabled(e.target.checked)} />
                <span className="admin-toggle-track" />
              </label>
            </div>
          </div>
        </div>

        {/* Usage Limits */}
        <div className="admin-card">
          <div className="admin-card-header" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Sliders size={18} style={{ color: '#a855f7' }} />
              <h2 className="admin-card-title">Daily AI Usage Limits</h2>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="admin-settings-row">
              <div>
                <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>Free Tier Limit</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>Daily maximum AI-assisted evaluations allowed</div>
              </div>
              <input type="number" className="admin-input" style={{ width: 90 }} min={0} value={freeLimit} onChange={(e) => setFreeLimit(Number(e.target.value))} />
            </div>
            <div className="admin-settings-row">
              <div>
                <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>Premium Tier Limit</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>Daily maximum AI-assisted evaluations for active subscribers</div>
              </div>
              <input type="number" className="admin-input" style={{ width: 90 }} min={0} value={premiumLimit} onChange={(e) => setPremiumLimit(Number(e.target.value))} />
            </div>
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="admin-card" style={{ border: maintenance ? '1px solid rgba(239,68,68,0.3)' : undefined }}>
          <div className="admin-card-header" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <AlertTriangle size={18} style={{ color: '#ef4444' }} />
              <h2 className="admin-card-title">Maintenance & Outages</h2>
            </div>
          </div>
          <div className="admin-settings-row">
            <div>
              <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>Platform Maintenance Mode</div>
              <div style={{ color: '#64748b', fontSize: 13 }}>Temporarily restrict student login & exam dashboard access</div>
            </div>
            <label className="admin-toggle">
              <input type="checkbox" checked={maintenance} onChange={(e) => setMaintenance(e.target.checked)} />
              <span className="admin-toggle-track" style={{ background: maintenance ? '#ef4444' : undefined }} />
            </label>
          </div>
          {maintenance && (
            <div style={{ background: '#3a1010', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '12px 16px', marginTop: 12 }}>
              <p style={{ color: '#fca5a5', fontSize: 13, lineHeight: 1.5 }}>
                ⚠️ Warning: Students attempting to access the platform will receive a maintenance screen. Admin and Super Admin users will continue to have full access.
              </p>
            </div>
          )}
        </div>

        <button
          className="admin-btn-primary"
          style={{ alignSelf: 'flex-start' }}
          onClick={handleSave}
          disabled={saveMutation.isPending}
        >
          <Save size={16} />
          <span>{saveMutation.isPending ? 'Saving Settings...' : 'Save Settings'}</span>
        </button>
      </div>
    </div>
  );
}
