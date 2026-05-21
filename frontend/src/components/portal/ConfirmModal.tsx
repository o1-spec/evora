'use client';

import { AlertTriangle, CheckCircle, Info, HelpCircle } from 'lucide-react';
import Modal from './Modal';

type Variant = 'danger' | 'warning' | 'info' | 'success';

const VARIANT_STYLES: Record<Variant, { icon: React.ElementType; iconColor: string; iconBg: string; confirmBg: string; confirmHover: string }> = {
  danger: {
    icon: AlertTriangle,
    iconColor: '#ef4444',
    iconBg: 'rgba(239,68,68,0.1)',
    confirmBg: '#ef4444',
    confirmHover: '#dc2626',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: '#f97316',
    iconBg: 'rgba(249,115,22,0.1)',
    confirmBg: '#f97316',
    confirmHover: '#ea6a0a',
  },
  info: {
    icon: Info,
    iconColor: 'hsl(var(--primary))',
    iconBg: 'hsl(var(--primary-light))',
    confirmBg: 'hsl(var(--primary))',
    confirmHover: 'hsl(var(--primary-hover))',
  },
  success: {
    icon: CheckCircle,
    iconColor: '#10b981',
    iconBg: 'rgba(16,185,129,0.1)',
    confirmBg: '#10b981',
    confirmHover: '#059669',
  },
};

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: Variant;
  loading?: boolean;
}

/**
 * Pre-built confirmation/danger dialog on top of the generic Modal.
 * Usage: <ConfirmModal open={open} onClose={…} onConfirm={…} title="Sign out?" message="You will be logged out." variant="danger" />
 */
export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
}: ConfirmModalProps) {
  const s = VARIANT_STYLES[variant];
  const Icon = s.icon;

  return (
    <Modal open={open} onClose={onClose} maxWidth={420}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
        {/* Icon circle */}
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          backgroundColor: s.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={26} color={s.iconColor} />
        </div>

        {/* Text */}
        <div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: 'hsl(var(--text-primary))', marginBottom: '0.4rem' }}>
            {title}
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'hsl(var(--text-secondary))', lineHeight: 1.6 }}>
            {message}
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', width: '100%', marginTop: '0.5rem' }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              flex: 1,
              padding: '0.7rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid hsl(var(--border))',
              backgroundColor: 'white',
              color: 'hsl(var(--text-primary))',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseOver={e => { e.currentTarget.style.backgroundColor = 'hsl(var(--bg-base))'; }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white'; }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              flex: 1,
              padding: '0.7rem 1rem',
              borderRadius: '0.75rem',
              border: 'none',
              backgroundColor: s.confirmBg,
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'background 0.15s, opacity 0.15s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
            }}
            onMouseOver={e => { if (!loading) e.currentTarget.style.backgroundColor = s.confirmHover; }}
            onMouseOut={e => { if (!loading) e.currentTarget.style.backgroundColor = s.confirmBg; }}
          >
            {loading ? (
              <>
                <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                Please wait…
              </>
            ) : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
