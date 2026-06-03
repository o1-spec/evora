'use client';

interface AdminBadgeProps {
  value: string;
  variant?: 'role' | 'tier' | 'status' | 'section';
}

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  SUPER_ADMIN: { bg: '#3a1a4a', color: '#d8b4fe' },
  ADMIN:       { bg: '#1a3a4a', color: '#67e8f9' },
  INSTRUCTOR:  { bg: '#1a3a2a', color: '#86efac' },
  STUDENT:     { bg: '#1e2540', color: '#93c5fd' },
};

const TIER_COLORS: Record<string, { bg: string; color: string }> = {
  PRO:     { bg: '#3a2010', color: '#fdba74' },
  PREMIUM: { bg: '#2e1a4a', color: '#d8b4fe' },
  BASIC:   { bg: '#1a3a2a', color: '#86efac' },
  FREE:    { bg: '#1e2540', color: '#94a3b8' },
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  COMPLETED:   { bg: '#1a3a2a', color: '#86efac' },
  IN_PROGRESS: { bg: '#3a2010', color: '#fdba74' },
  FAILED:      { bg: '#3a1010', color: '#fca5a5' },
  SENT:        { bg: '#1a3a2a', color: '#86efac' },
};

const SECTION_COLORS: Record<string, { bg: string; color: string }> = {
  LISTENING: { bg: '#1e3a5f', color: '#93c5fd' },
  READING:   { bg: '#1a3a2a', color: '#86efac' },
  WRITING:   { bg: '#2e1a4a', color: '#d8b4fe' },
  SPEAKING:  { bg: '#3a2010', color: '#fdba74' },
};

export function AdminBadge({ value, variant = 'status' }: AdminBadgeProps) {
  const MAP = variant === 'role' ? ROLE_COLORS
    : variant === 'tier' ? TIER_COLORS
    : variant === 'section' ? SECTION_COLORS
    : STATUS_COLORS;

  const style = MAP[value] || { bg: '#1e2540', color: '#94a3b8' };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 10px',
        borderRadius: '999px',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        background: style.bg,
        color: style.color,
        border: `1px solid ${style.color}33`,
        whiteSpace: 'nowrap',
      }}
    >
      {value}
    </span>
  );
}
