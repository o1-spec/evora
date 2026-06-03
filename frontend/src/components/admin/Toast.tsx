'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

// Singleton store
let toastListeners: Array<(toasts: Toast[]) => void> = [];
let toasts: Toast[] = [];

function notify(message: string, type: ToastType = 'info') {
  const id = Math.random().toString(36).slice(2);
  toasts = [...toasts, { id, message, type }];
  toastListeners.forEach((fn) => fn(toasts));
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    toastListeners.forEach((fn) => fn(toasts));
  }, 4000);
}

export const toast = {
  success: (msg: string) => notify(msg, 'success'),
  error:   (msg: string) => notify(msg, 'error'),
  warning: (msg: string) => notify(msg, 'warning'),
  info:    (msg: string) => notify(msg, 'info'),
};

const ICONS: Record<ToastType, string> = {
  success: '✓',
  error:   '✕',
  warning: '⚠',
  info:    'ℹ',
};

const COLORS: Record<ToastType, { bg: string; border: string; icon: string }> = {
  success: { bg: '#1a3a2a', border: '#22c55e44', icon: '#22c55e' },
  error:   { bg: '#3a1010', border: '#ef444444', icon: '#ef4444' },
  warning: { bg: '#3a2010', border: '#f9731644', icon: '#f97316' },
  info:    { bg: '#1e3a5f', border: '#3b82f644', icon: '#3b82f6' },
};

export function ToastContainer() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (t: Toast[]) => setItems([...t]);
    toastListeners.push(listener);
    return () => { toastListeners = toastListeners.filter((fn) => fn !== listener); };
  }, []);

  if (items.length === 0) return null;

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '360px' }}>
      {items.map((t) => {
        const c = COLORS[t.type];
        return (
          <div
            key={t.id}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 18px',
              background: c.bg,
              border: `1px solid ${c.border}`,
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              animation: 'slideInRight 0.3s ease both',
              color: '#f1f5f9',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            <span style={{ fontSize: '16px', color: c.icon, fontWeight: 700, flexShrink: 0 }}>
              {ICONS[t.type]}
            </span>
            <span style={{ flex: 1 }}>{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
