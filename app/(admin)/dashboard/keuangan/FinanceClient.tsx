"use client";

import { DollarSign, TrendingUp, TrendingDown, Minus } from "lucide-react";

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
};

export default function FinanceClient({ report }: { report: any }) {
  if (!report) return <div className="p-8 text-center text-xs font-bold text-(--color-danger)">Gagal memuat data keuangan.</div>;

  const isUp = report.trend === "NAIK";
  const isDown = report.trend === "TURUN";

  return (
    <div className="mx-auto max-w-7xl font-sans text-(--color-text-primary)">
      
      {/* HEADER */}
      <div className="mb-8 rounded-xl border-2 border-(--color-border) bg-(--color-surface) px-6 py-6 shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2)">Laporan & Analitik</p>
        <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-4xl">Manajemen Keuangan</h1>
      </div>

      {/* WIDGET KESIMPULAN */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* KOTAK 1: Performa Bulan Ini */}
        <div className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">Pendapatan Bulan Ini</h3>
          <p className="mt-2 text-3xl font-black text-(--color-primary-dark)">{formatRupiah(report.currentMonthRevenue)}</p>
          
          <div className="mt-4 flex items-center gap-2">
            <span className={`flex items-center gap-1 rounded border px-2 py-1 text-[10px] font-black tracking-wider ${isUp ? 'border-(--color-success) bg-(--color-success)/10 text-(--color-success)' : isDown ? 'border-(--color-danger) bg-(--color-danger)/10 text-(--color-danger)' : 'border-(--color-border) bg-(--color-bg) text-(--color-text-secondary)'}`}>
              {isUp ? <TrendingUp className="h-3 w-3" /> : isDown ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
              {report.percentage}% {report.trend}
            </span>
            <span className="text-[10px] uppercase text-(--color-text-secondary)">dari bulan sebelumnya</span>
          </div>
        </div>

        {/* KOTAK 2: Total Keseluruhan */}
        <div className="flex flex-col justify-center rounded-xl border-2 border-(--color-border) bg-(--color-primary-dark) p-6 text-(--color-surface) shadow-[4px_4px_0_rgba(58,40,27,0.3)]">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent)">Total Sepanjang Waktu</h3>
            <DollarSign className="h-6 w-6 text-(--color-accent)" />
          </div>
          <p className="mt-2 text-3xl font-black">{formatRupiah(report.totalRevenue)}</p>
        </div>
      </div>

      {/* TABEL RIWAYAT PER BULAN */}
      <div className="overflow-hidden rounded-xl border-2 border-(--color-border) bg-(--color-surface) shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
        <div className="border-b-2 border-(--color-border) bg-(--color-bg) p-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-(--color-primary-dark)">Riwayat Pendapatan Bulanan</h2>
        </div>
        <div className="overflow-x-auto p-0">
          <table className="w-full text-left text-xs text-(--color-text-primary)">
            <thead className="border-b-2 border-(--color-border) bg-(--color-surface) text-[9px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
              <tr>
                <th className="px-6 py-4">Periode Bulan</th>
                <th className="px-6 py-4 text-right">Total Pendapatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed divide-(--color-border)">
              {report.history.map((item: any, index: number) => (
                <tr key={index} className="transition hover:bg-(--color-bg)">
                  <td className="px-6 py-4 font-black uppercase text-(--color-primary-dark)">{item.label}</td>
                  <td className="px-6 py-4 text-right font-black text-(--color-accent-2)">{formatRupiah(item.revenue)}</td>
                </tr>
              ))}
              {report.history.length === 0 && (
                <tr>
                  <td colSpan={2} className="p-8 text-center text-xs font-bold text-(--color-text-secondary)">Belum ada data pendapatan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}