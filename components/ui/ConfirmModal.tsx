"use client";

import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Ya, Hapus",
  cancelText = "Batal",
  isLoading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-(--color-text-primary)/70 backdrop-blur-sm transition-opacity" 
        onClick={!isLoading ? onClose : undefined} 
      />
      
      {/* Modal Box */}
      <div className="relative w-full max-w-md rounded-lg border-2 border-(--color-border) bg-(--color-surface) p-6 text-center shadow-[6px_6px_0_rgba(139,94,60,0.3)] border-t-4 border-t-(--color-danger)">
        <button 
          onClick={!isLoading ? onClose : undefined} 
          className="absolute right-4 top-4 rounded-full p-1 text-(--color-text-secondary) transition hover:bg-(--color-bg) hover:text-(--color-text-primary)"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mx-auto mb-4 mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-(--color-danger)/10">
          <AlertTriangle className="h-7 w-7 text-(--color-danger)" />
        </div>

        <h2 className="mb-2 text-lg font-bold text-(--color-text-primary)">
          {title}
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-(--color-text-secondary)">
          {message}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) py-3 text-xs font-bold uppercase tracking-wider text-(--color-text-primary) transition hover:bg-(--color-border) disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-(--color-danger) py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_rgba(168,69,47,0.3)] transition hover:-translate-y-0.5 hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? "Memproses..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}