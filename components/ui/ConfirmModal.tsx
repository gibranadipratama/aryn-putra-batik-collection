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
        className="absolute inset-0 bg-[#0B1F33]/70 backdrop-blur-sm transition-opacity" 
        onClick={!isLoading ? onClose : undefined} 
      />
      
      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-[#F4F0E7] shadow-2xl p-6 text-center border-t-4 border-red-600">
        <button 
          onClick={!isLoading ? onClose : undefined} 
          className="absolute right-4 top-4 text-[#0B1F33]/40 hover:bg-[#0B1F33]/5 hover:text-[#0B1F33] p-1 rounded-full transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 mb-4 mt-2">
          <AlertTriangle className="h-7 w-7 text-red-600" />
        </div>

        <h2 className="text-lg font-black uppercase tracking-widest text-[#0B1F33] mb-2">
          {title}
        </h2>
        <p className="text-xs text-[#0B1F33]/60 leading-relaxed mb-8">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full bg-[#EDE6DA] border border-[#0B1F33]/10 py-3 text-[10px] font-bold uppercase tracking-widest text-[#0B1F33] hover:bg-[#0B1F33]/5 transition disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full bg-red-600 py-3 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-red-700 transition disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isLoading ? "Memproses..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}