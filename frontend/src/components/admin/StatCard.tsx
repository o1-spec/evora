'use client';

import { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'cyan';
  trend?: number; // percentage change, can be negative
  subtitle?: string;
}

const COLOR_MAP = {
  blue:   { bg: '#1e3a5f', accent: '#3b82f6', text: '#93c5fd' },
  green:  { bg: '#1a3a2a', accent: '#22c55e', text: '#86efac' },
  purple: { bg: '#2e1a4a', accent: '#a855f7', text: '#d8b4fe' },
  orange: { bg: '#3a2010', accent: '#f97316', text: '#fdba74' },
  red:    { bg: '#3a1010', accent: '#ef4444', text: '#fca5a5' },
  cyan:   { bg: '#0a2e36', accent: '#06b6d4', text: '#67e8f9' },
};

export function StatCard({ title, value, icon: Icon, color = 'blue', trend, subtitle }: StatCardProps) {
  const c = COLOR_MAP[color];

  return (
    <div className="admin-stat-card" style={{ background: 'linear-gradient(135deg, #1a2035 0%, #1e2540 100%)', borderColor: 'rgba(255,255,255,0.07)' }}>
      <div className="admin-stat-header">
        <div className="admin-stat-icon-wrap" style={{ background: `${c.accent}22` }}>
          <Icon size={20} style={{ color: c.accent }} />
        </div>
        {trend !== undefined && (
          <div className="admin-stat-trend" style={{ color: trend >= 0 ? '#22c55e' : '#ef4444' }}>
            {trend > 0 ? <TrendingUp size={14} /> : trend < 0 ? <TrendingDown size={14} /> : <Minus size={14} />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="admin-stat-value" style={{ color: '#f1f5f9' }}>{value.toLocaleString()}</div>
      <div className="admin-stat-title" style={{ color: '#94a3b8' }}>{title}</div>
      {subtitle && <div className="admin-stat-subtitle" style={{ color: '#64748b' }}>{subtitle}</div>}
    </div>
  );
}
