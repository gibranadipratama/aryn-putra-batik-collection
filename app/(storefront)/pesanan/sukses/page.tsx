"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-(--color-bg) px-5 text-center font-sans">
      
      {/* KARTU KONTEN UTAMA */}
      <div className="relative z-10 w-full max-w-md rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[8px_8px_0_rgba(139,94,60,0.3)]">
        
        {/* IKON SUKSES */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-(--color-border) bg-(--color-success)/10 text-(--color-success) shadow-[3px_3px_0_rgba(46,117,89,0.3)]">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        
        <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2) mb-1">Transaksi Selesai</p>
        <h1 className="text-2xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-3xl mb-3">
          Pembayaran Berhasil!
        </h1>
        
        <p className="text-xs leading-relaxed text-(--color-text-secondary) mb-8">
          Terima kasih atas pesanan Anda. Pembayaran Anda telah diterima dan pesanan sedang dipersiapkan oleh tim kami.
        </p>

        {/* TOMBOL NAVIGASI */}
        <div className="flex flex-col gap-3">
          <Link
            href="/pesanan"
            className="flex w-full items-center justify-center rounded-md border-2 border-(--color-primary-dark) bg-(--color-primary-dark) py-3.5 text-xs font-bold uppercase tracking-widest text-(--color-surface) shadow-[3px_3px_0_rgba(99,50,26,0.4)] transition-all hover:-translate-y-0.5 hover:bg-(--color-primary)"
          >
            Cek Status Pesanan
          </Link>
          <Link
            href="/"
            className="flex w-full items-center justify-center rounded-md border-2 border-(--color-border) bg-(--color-bg) py-3.5 text-xs font-bold uppercase tracking-widest text-(--color-primary-dark) shadow-[2px_2px_0_rgba(139,94,60,0.2)] transition-all hover:-translate-y-0.5 hover:bg-(--color-surface)"
          >
            Kembali ke Beranda
          </Link>
        </div>

      </div>
    </div>
  );
}