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
    <div className="mx-auto max-w-7xl">
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#A88A3D]">Ringkasan</p>
        <h1 className="mt-2 text-3xl font-black uppercase tracking-tighter text-[#0B1F33] md:text-4xl">Dashboard</h1>
      </div>

      {/* WIDGETS STATISTIK (3 KOLOM) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
        {/* Widget 1: Pendapatan */}
        <div className="bg-white p-6 border border-[#0B1F33]/5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0B1F33]/60">Total Pendapatan</h3>
            <div className="flex h-10 w-10 items-center justify-center bg-[#0B1F33] text-[#A88A3D] rounded-full">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#0B1F33]">{formatRupiah(stats.totalRevenue)}</p>
          <p className="text-[9px] font-bold text-[#A88A3D] mt-2 uppercase tracking-wider">*Dari pesanan selesai</p>
        </div>

        {/* Widget 2: Pesanan */}
        <div className="bg-white p-6 border border-[#0B1F33]/5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0B1F33]/60">Total Pesanan</h3>
            <div className="flex h-10 w-10 items-center justify-center bg-[#EDE6DA] text-[#0B1F33] rounded-full">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#0B1F33]">{stats.totalOrders} <span className="text-sm text-[#0B1F33]/50">Transaksi</span></p>
          <p className="text-[9px] font-bold text-[#0B1F33]/40 mt-2 uppercase tracking-wider">Total sepanjang waktu</p>
        </div>

        {/* Widget 3: Pelanggan */}
        <div className="bg-white p-6 border border-[#0B1F33]/5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0B1F33]/60">Pelanggan Aktif</h3>
            <div className="flex h-10 w-10 items-center justify-center bg-[#EDE6DA] text-[#0B1F33] rounded-full">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#0B1F33]">{stats.totalCustomers} <span className="text-sm text-[#0B1F33]/50">Orang</span></p>
          <p className="text-[9px] font-bold text-[#0B1F33]/40 mt-2 uppercase tracking-wider">Telah bergabung</p>
        </div>
      </div>

      {/* KONTEN BAWAH (2 KOLOM: PESANAN TERBARU & STOK MENIPIS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TABEL PESANAN TERBARU (Kiri - Memakan 2 Kolom) */}
        <div className="lg:col-span-2 bg-white border border-[#0B1F33]/5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-[#0B1F33]/5">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0B1F33]">Pesanan Terbaru</h2>
            <Link href="/dashboard/pesanan" className="text-[9px] font-bold uppercase tracking-widest text-[#A88A3D] hover:text-[#0B1F33] flex items-center gap-1 transition">
              Lihat Semua <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          
          <div className="flex-1 p-0 overflow-x-auto">
            {stats.recentOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8">
                <ShoppingBag className="h-8 w-8 text-[#0B1F33]/20 mb-3" />
                <p className="text-xs font-bold text-[#0B1F33]/40 uppercase tracking-widest">Belum ada pesanan masuk</p>
              </div>
            ) : (
              <table className="w-full text-left text-xs text-[#0B1F33]">
                <thead className="bg-[#F4F0E7] uppercase tracking-widest text-[9px] font-bold text-[#0B1F33]/60">
                  <tr>
                    <th className="px-6 py-4">Invoice</th>
                    <th className="px-6 py-4">Pelanggan</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0B1F33]/5">
                  {stats.recentOrders.map((order: any) => (
                    <tr key={order.id} className="transition hover:bg-[#0B1F33]/5">
                      <td className="px-6 py-4 font-black uppercase">{order.invoice || order.id.slice(0,8)}</td>
                      <td className="px-6 py-4 font-bold">{order.customerName}</td>
                      <td className="px-6 py-4 font-black text-[#A88A3D]">{formatRupiah(order.totalAmount)}</td>
                      <td className="px-6 py-4">
                        <span className="bg-[#0B1F33]/5 px-2 py-1 text-[9px] font-black uppercase tracking-wider rounded-sm">{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* WIDGET STOK MENIPIS (Kanan - Memakan 1 Kolom) */}
        <div className="bg-white border border-[#0B1F33]/5 shadow-sm flex flex-col border-t-4 border-t-red-600">
          <div className="flex items-center gap-2 p-6 border-b border-[#0B1F33]/5">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0B1F33]">Peringatan Stok</h2>
          </div>
          
          <div className="flex-1 p-6 flex flex-col gap-4">
            {stats.lowStockItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Package className="h-8 w-8 text-green-500 mb-3 opacity-50" />
                <p className="text-xs font-bold text-[#0B1F33]/60 leading-relaxed">Kondisi aman. Tidak ada produk yang stoknya hampir habis.</p>
              </div>
            ) : (
              stats.lowStockItems.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center bg-[#F4F0E7] p-3 border border-red-200">
                  <div>
                    <p className="text-xs font-bold text-[#0B1F33] uppercase line-clamp-1">{item.product?.name || "Produk Tidak Diketahui"}</p>
                    <p className="text-[10px] text-[#0B1F33]/60 mt-1 uppercase tracking-widest">
                      Ukuran: <span className="font-bold text-[#0B1F33]">{item.size}</span>
                    </p>
                  </div>
                  <div className="bg-red-100 text-red-700 px-3 py-1 text-center">
                    <p className="text-[9px] font-black uppercase tracking-wider mb-0.5">Sisa</p>
                    <p className="text-sm font-black">{item.stock}</p>
                  </div>
                </div>
              ))
            )}
            
            {stats.lowStockItems.length > 0 && (
              <Link href="/dashboard/produk" className="mt-2 text-center text-[9px] font-bold uppercase tracking-widest text-red-600 hover:text-red-800 transition">
                Kelola Stok Produk &rarr;
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}