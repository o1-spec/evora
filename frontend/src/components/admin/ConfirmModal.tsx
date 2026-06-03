'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'default';
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ConfirmModal({
  isOpen, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  variant = 'danger', onConfirm, onCancel, loading,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [isOpen]);

  if (!isOpen) return null;
  if (typeof window === 'undefined') return null;

  const confirmBg = variant === 'danger' ? '#ef4444' : variant === 'warning' ? '#f97316' : '#3b82f6';

  return createPortal(
    <dialog
      ref={dialogRef}
      className="admin-modal"
      onClose={onCancel}
    >
      <div className="admin-modal-content">
        <div className="admin-modal-header">
          <div className="admin-modal-icon-wrap" style={{ background: `${confirmBg}22` }}>
            <AlertTriangle size={20} style={{ color: confirmBg }} />
          </div>
          <button className="admin-modal-close" onClick={onCancel}>
            <X size={18} />
          </button>
        </div>
        <h3 className="admin-modal-title">{title}</h3>
        <p className="admin-modal-message">{message}</p>
        <div className="admin-modal-actions">
          <button className="admin-btn-ghost" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </button>
          <button
            className="admin-btn-confirm"
            onClick={onConfirm}
            disabled={loading}
            style={{ background: confirmBg }}
          >
            {loading ? 'Processing…' : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
}
