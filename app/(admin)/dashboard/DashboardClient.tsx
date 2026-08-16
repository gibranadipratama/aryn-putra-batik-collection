"use client";

import Link from "next/link";
import { DollarSign, ShoppingBag, Users, AlertTriangle, ArrowRight, Package } from "lucide-react";

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
};

const formatDate = (dateString: Date) => {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(dateString));
};

export default function DashboardClient({ stats }: { stats: any }) {
  return (
    <div className="mx-auto max-w-7xl font-sans text-(--color-text-primary)">
      
      {/* HEADER */}
      <div className="mb-8 rounded-xl border-2 border-(--color-border) bg-(--color-surface) px-6 py-6 shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2)">Ringkasan</p>
        <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-4xl">Dashboard</h1>
      </div>

      {/* WIDGETS STATISTIK (3 KOLOM) */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        
        {/* Widget 1: Pendapatan */}
        <div className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(139,94,60,0.25)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">Total Pendapatan</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-(--color-border) bg-(--color-primary-dark) text-(--color-accent) shadow-[2px_2px_0_rgba(58,40,27,0.4)]">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-(--color-primary-dark)">{formatRupiah(stats.totalRevenue)}</p>
          <p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-(--color-accent-2)">*Dari pesanan selesai</p>
        </div>

        {/* Widget 2: Pesanan */}
        <div className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(139,94,60,0.25)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">Total Pesanan</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-(--color-border) bg-(--color-bg) text-(--color-primary-dark)">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-(--color-primary-dark)">{stats.totalOrders} <span className="text-sm font-bold text-(--color-text-secondary)">Transaksi</span></p>
          <p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-(--color-text-secondary)">Total sepanjang waktu</p>
        </div>

        {/* Widget 3: Pelanggan */}
        <div className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(139,94,60,0.25)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">Pelanggan Aktif</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-(--color-border) bg-(--color-bg) text-(--color-primary-dark)">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-(--color-primary-dark)">{stats.totalCustomers} <span className="text-sm font-bold text-(--color-text-secondary)">Orang</span></p>
          <p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-(--color-text-secondary)">Telah bergabung</p>
        </div>
      </div>

      {/* KONTEN BAWAH (2 KOLOM: PESANAN TERBARU & STOK MENIPIS) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* TABEL PESANAN TERBARU (Kiri - Memakan 2 Kolom) */}
        <div className="flex flex-col overflow-hidden rounded-xl border-2 border-(--color-border) bg-(--color-surface) shadow-[4px_4px_0_rgba(139,94,60,0.15)] lg:col-span-2">
          <div className="flex items-center justify-between border-b-2 border-(--color-border) bg-(--color-bg) p-6">
            <h2 className="text-xs font-black uppercase tracking-wider text-(--color-primary-dark)">Pesanan Terbaru</h2>
            <Link href="/dashboard/pesanan" className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-(--color-primary) transition hover:text-(--color-primary-dark)">
              Lihat Semua <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          
          <div className="flex-1 overflow-x-auto p-0">
            {stats.recentOrders.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <ShoppingBag className="mb-3 h-8 w-8 text-(--color-text-secondary)/50" />
                <p className="text-xs font-bold uppercase tracking-widest text-(--color-text-secondary)">Belum ada pesanan masuk</p>
              </div>
            ) : (
              <table className="w-full text-left text-xs text-(--color-text-primary)">
                <thead className="border-b-2 border-(--color-border) bg-(--color-surface) text-[9px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                  <tr>
                    <th className="px-6 py-4">Invoice</th>
                    <th className="px-6 py-4">Pelanggan</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-(--color-border)">
                  {stats.recentOrders.map((order: any) => (
                    <tr key={order.id} className="transition hover:bg-(--color-bg)">
                      <td className="px-6 py-4 font-black uppercase text-(--color-primary-dark)">{order.invoice || order.id.slice(0,8)}</td>
                      <td className="px-6 py-4 font-bold">{order.customerName}</td>
                      <td className="px-6 py-4 font-black text-(--color-accent-2)">{formatRupiah(order.totalAmount)}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-sm border border-(--color-border) bg-(--color-bg) px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* WIDGET STOK MENIPIS (Kanan - Memakan 1 Kolom) */}
        <div className="flex flex-col rounded-xl border-2 border-(--color-danger) bg-(--color-surface) shadow-[4px_4px_0_rgba(168,69,47,0.15)]">
          <div className="flex items-center gap-2 border-b-2 border-(--color-danger)/20 bg-(--color-danger)/5 p-6">
            <AlertTriangle className="h-4 w-4 text-(--color-danger)" />
            <h2 className="text-xs font-black uppercase tracking-wider text-(--color-danger)">Peringatan Stok</h2>
          </div>
          
          <div className="flex flex-1 flex-col gap-4 p-6">
            {stats.lowStockItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <Package className="mb-3 h-8 w-8 text-(--color-success) opacity-70" />
                <p className="text-xs font-bold leading-relaxed text-(--color-text-secondary)">Kondisi aman. Tidak ada produk yang stoknya hampir habis.</p>
              </div>
            ) : (
              stats.lowStockItems.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between rounded-md border-2 border-(--color-danger)/30 bg-(--color-bg) p-3">
                  <div>
                    <p className="line-clamp-1 text-xs font-bold uppercase text-(--color-primary-dark)">{item.product?.name || "Produk Tidak Diketahui"}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-(--color-text-secondary)">
                      Ukuran: <span className="font-bold text-(--color-primary-dark)">{item.size}</span>
                    </p>
                  </div>
                  <div className="rounded border border-(--color-danger) bg-(--color-danger) px-3 py-1 text-center text-white shadow-[2px_2px_0_rgba(168,69,47,0.3)]">
                    <p className="mb-0.5 text-[9px] font-black uppercase tracking-wider">Sisa</p>
                    <p className="text-sm font-black">{item.stock}</p>
                  </div>
                </div>
              ))
            )}
            
            {stats.lowStockItems.length > 0 && (
              <Link href="/dashboard/produk" className="mt-2 text-center text-[9px] font-bold uppercase tracking-widest text-(--color-danger) transition hover:text-(--color-primary-dark)">
                Kelola Stok Produk &rarr;
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}