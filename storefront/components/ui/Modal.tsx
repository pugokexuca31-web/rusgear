'use client';

import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/** Небольшое модальное окно по центру экрана (портал в body). */
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative max-h-[85vh] w-full overflow-y-auto border hairline bg-white p-6 shadow-xl sm:max-w-sm">
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center text-ink-400 hover:text-accent-red"
        >
          ✕
        </button>
        {title && (
          <h3 className="mb-4 pr-8 text-sm font-bold uppercase tracking-widest text-ink-900">{title}</h3>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
