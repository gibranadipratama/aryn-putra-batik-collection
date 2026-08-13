"use client";

import { useState } from "react";
import { Search, Users, Eye, X, Mail, Phone, ShoppingBag, MapPin } from "lucide-react";

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
};

const formatDate = (dateString: Date) => {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(dateString));
};

export default function PelangganClient({ customers }: { customers: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Logika Pencarian berdasarkan Nama atau Email
  const filteredCustomers = customers.filter((customer) => {
    const searchLower = searchQuery.toLowerCase();
    const nameMatch = customer.name?.toLowerCase().includes(searchLower) || false;
    const emailMatch = customer.email?.toLowerCase().includes(searchLower) || false;
    return nameMatch || emailMatch;
  });

  return (
    <div className="mx-auto max-w-7xl">
      {/* HEADER SECTION */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#A88A3D]">Management</p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tighter text-[#0B1F33] md:text-4xl">Pelanggan</h1>
        </div>
      </div>

      {/* SEARCH BAR SECTION */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#162A3D]/40" />
          <input 
            placeholder="Cari nama atau email pelanggan..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white shadow-sm border border-[#0B1F33]/5 py-3.5 pl-11 pr-4 text-xs text-[#0B1F33] outline-none transition-all focus:border-[#A88A3D] focus:ring-1 focus:ring-[#A88A3D]" 
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0B1F33] text-[9px] font-bold text-[#E8E0D3]">
            {filteredCustomers.length}
          </span>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#162A3D]/60">Total Pelanggan</p>
        </div>
      </div>

      {/* TABEL PELANGGAN */}
      {filteredCustomers.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white shadow-sm border border-[#0B1F33]/5 p-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0B1F33]/5">
            <Users className="h-8 w-8 text-[#0B1F33]/30" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F33]">Tidak Ada Pelanggan</h3>
          <p className="mt-2 max-w-sm text-xs text-[#0B1F33]/50 leading-relaxed">
            Belum ada data pelanggan yang terdaftar atau sesuai dengan kata kunci pencarian Anda.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-sm border border-[#0B1F33]/5">
          <table className="w-full text-left text-xs text-[#0B1F33]">
            <thead className="bg-[#0B1F33] text-[#E8E0D3] uppercase tracking-widest text-[9px] font-bold">
              <tr>
                <th className="px-6 py-4">Informasi Pelanggan</th>
                <th className="px-6 py-4">Kontak</th>
                <th className="px-6 py-4">Bergabung Sejak</th>
                <th className="px-6 py-4 text-center">Total Pesanan</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0B1F33]/5">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="transition hover:bg-[#0B1F33]/5">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-[#EDE6DA] text-[#0B1F33] font-black uppercase rounded-full">
                      {customer.name ? customer.name.charAt(0) : "?"}
                    </div>
                    <div>
                      <p className="font-black uppercase">{customer.name || "Anonim"}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="flex items-center gap-2 text-[#0B1F33]/70 mb-1"><Mail className="h-3 w-3" /> {customer.email || "-"}</p>
                    <p className="flex items-center gap-2 text-[#0B1F33]/70"><Phone className="h-3 w-3" /> {customer.phone || "Tidak ada nomor HP"}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-[#0B1F33]/60">
                    {customer.createdAt ? formatDate(customer.createdAt) : "-"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-[#0B1F33]/5 px-3 py-1 font-black text-[#A88A3D] rounded-full">
                      {customer.orders?.length || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => setSelectedCustomer(customer)}
                      className="inline-flex items-center gap-1.5 bg-[#EDE6DA] px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#0B1F33] hover:bg-[#0B1F33] hover:text-[#E8E0D3] transition shadow-sm"
                    >
                      <Eye className="h-3 w-3" /> Riwayat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL DETAIL & RIWAYAT PELANGGAN */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#0B1F33]/70 backdrop-blur-sm transition-opacity" onClick={() => setSelectedCustomer(null)} />
          
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-[#0B1F33]/10 px-6 py-4 bg-[#F4F0E7]">
              <div>
                <h2 className="text-lg font-black uppercase tracking-wider text-[#0B1F33]">
                  Profil Pelanggan
                </h2>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="rounded-full p-2 hover:bg-[#0B1F33]/10 text-[#0B1F33] transition"><X className="h-5 w-5" /></button>
            </div>

            <div className="overflow-y-auto p-6 flex flex-col gap-6">
              
              {/* Info Pelanggan Card */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-[#0B1F33]/10 bg-[#EDE6DA] p-6">
                <div className="flex h-20 w-20 items-center justify-center bg-[#0B1F33] text-[#A88A3D] text-3xl font-black uppercase shadow-md">
                  {selectedCustomer.name ? selectedCustomer.name.charAt(0) : "?"}
                </div>
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <h3 className="text-xl font-black uppercase text-[#0B1F33]">{selectedCustomer.name || "Pelanggan Anonim"}</h3>
                  <div className="flex flex-col sm:flex-row gap-4 mt-2 text-xs font-bold text-[#0B1F33]/60">
                    <p className="flex items-center justify-center sm:justify-start gap-2"><Mail className="h-4 w-4" /> {selectedCustomer.email || "Email tidak tersedia"}</p>
                    <p className="flex items-center justify-center sm:justify-start gap-2"><Phone className="h-4 w-4" /> {selectedCustomer.phone || "No HP tidak tersedia"}</p>
                  </div>
                  {selectedCustomer.address && (
                    <p className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-xs text-[#0B1F33]/60"><MapPin className="h-4 w-4 min-w-4" /> <span className="line-clamp-2">{selectedCustomer.address}</span></p>
                  )}
                </div>
              </div>

              {/* Tabel Riwayat Pesanan */}
              <div>
                <div className="flex items-center gap-2 border-b border-[#0B1F33]/10 pb-2 mb-3">
                  <ShoppingBag className="h-4 w-4 text-[#A88A3D]" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#0B1F33]">Riwayat Pesanan ({selectedCustomer.orders?.length || 0})</p>
                </div>
                
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {selectedCustomer.orders && selectedCustomer.orders.length > 0 ? (
                    selectedCustomer.orders.map((order: any) => (
                      <div key={order.id} className="flex justify-between items-center border border-[#0B1F33]/5 p-3 bg-white shadow-sm hover:border-[#A88A3D]/30 transition">
                        <div>
                          <p className="text-xs font-bold text-[#0B1F33] uppercase">{order.invoice || order.id.slice(0,8).toUpperCase()}</p>
                          <p className="text-[9px] font-bold text-[#0B1F33]/50 uppercase tracking-widest mt-1">
                            {formatDate(order.createdAt)} | <span className="text-[#A88A3D]">{order.status}</span>
                          </p>
                        </div>
                        <p className="text-xs font-black text-[#0B1F33]">
                          {formatRupiah(order.totalAmount)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 bg-[#0B1F33]/5 border border-[#0B1F33]/10">
                      <p className="text-xs text-[#0B1F33]/40 font-bold uppercase tracking-widest">Belum ada riwayat pesanan</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}