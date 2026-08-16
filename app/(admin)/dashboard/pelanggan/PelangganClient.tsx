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

  const filteredCustomers = customers.filter((customer) => {
    const searchLower = searchQuery.toLowerCase();
    const nameMatch = customer.name?.toLowerCase().includes(searchLower) || false;
    const emailMatch = customer.email?.toLowerCase().includes(searchLower) || false;
    return nameMatch || emailMatch;
  });

  return (
    <div className="mx-auto max-w-7xl font-sans">
      {/* HEADER SECTION */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end rounded-xl border-2 border-(--color-border) bg-(--color-surface) px-6 py-6 shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2)">Management</p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-4xl">Pelanggan</h1>
        </div>
      </div>

      {/* SEARCH BAR SECTION */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-text-secondary)" />
          <input 
            placeholder="Cari nama atau email pelanggan..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border-2 border-(--color-border) bg-(--color-surface) py-3.5 pl-10 pr-4 text-xs font-medium text-(--color-text-primary) outline-none transition-all focus:border-(--color-primary) focus:shadow-[4px_4px_0_rgba(139,94,60,0.2)]" 
          />
        </div>
        <div className="flex items-center gap-2 rounded-md border-2 border-(--color-border) bg-(--color-surface) px-4 py-2.5 shadow-[2px_2px_0_rgba(139,94,60,0.15)]">
          <span className="flex h-6 w-6 items-center justify-center rounded border border-(--color-border) bg-(--color-bg) text-[9px] font-bold text-(--color-primary-dark)">
            {filteredCustomers.length}
          </span>
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">Total Pelanggan</p>
        </div>
      </div>

      {/* TABEL PELANGGAN */}
      {filteredCustomers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-(--color-border) bg-(--color-surface) p-16 text-center shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-(--color-border) bg-(--color-bg)">
            <Users className="h-8 w-8 text-(--color-text-secondary)" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-wider text-(--color-primary-dark)">Tidak Ada Pelanggan</h3>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-(--color-text-secondary)">
            Belum ada data pelanggan yang terdaftar atau sesuai dengan kata kunci pencarian Anda.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border-2 border-(--color-border) bg-(--color-surface) shadow-[6px_6px_0_rgba(139,94,60,0.25)]">
          <table className="w-full text-left text-xs text-(--color-text-primary)">
            <thead className="border-b-2 border-(--color-border) bg-(--color-bg) text-[9px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
              <tr>
                <th className="px-6 py-4">Informasi Pelanggan</th>
                <th className="px-6 py-4">Kontak</th>
                <th className="px-6 py-4">Bergabung Sejak</th>
                <th className="px-6 py-4 text-center">Total Pesanan</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed divide-(--color-border)">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="transition hover:bg-(--color-bg)">
                  <td className="flex items-center gap-3 px-6 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-(--color-border) bg-(--color-surface) font-black uppercase text-(--color-primary-dark) shadow-[2px_2px_0_rgba(139,94,60,0.2)]">
                      {customer.name ? customer.name.charAt(0) : "?"}
                    </div>
                    <div>
                      <p className="font-bold uppercase text-(--color-primary-dark)">{customer.name || "Anonim"}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-(--color-text-secondary)">
                    <p className="mb-1 flex items-center gap-2"><Mail className="h-3 w-3" /> {customer.email || "-"}</p>
                    <p className="flex items-center gap-2"><Phone className="h-3 w-3" /> {customer.phone || "Tidak ada nomor HP"}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-(--color-text-secondary)">
                    {customer.createdAt ? formatDate(customer.createdAt) : "-"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="rounded border border-(--color-border) bg-(--color-bg) px-3 py-1 font-black text-(--color-accent-2) shadow-sm">
                      {customer.orders?.length || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => setSelectedCustomer(customer)}
                      className="inline-flex items-center gap-1.5 rounded border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-(--color-text-primary) shadow-[2px_2px_0_rgba(139,94,60,0.2)] transition hover:-translate-y-0.5 hover:bg-(--color-primary) hover:text-(--color-surface)"
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
          <div className="absolute inset-0 bg-(--color-primary-dark)/70 backdrop-blur-sm transition-opacity" onClick={() => setSelectedCustomer(null)} />
          
          <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border-2 border-(--color-border) bg-(--color-surface) shadow-[8px_8px_0_rgba(139,94,60,0.3)]">
            <div className="flex items-center justify-between border-b-2 border-(--color-border) bg-(--color-bg) px-6 py-4">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-(--color-primary-dark)">
                  Profil Pelanggan
                </h2>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="rounded-full p-2 text-(--color-text-secondary) transition hover:bg-(--color-border) hover:text-(--color-primary-dark)"><X className="h-5 w-5" /></button>
            </div>

            <div className="flex flex-col gap-6 overflow-y-auto p-6">
              
              {/* Info Pelanggan Card */}
              <div className="flex flex-col items-center gap-6 rounded-md border-2 border-(--color-border) bg-(--color-bg) p-6 sm:flex-row sm:items-start">
                <div className="flex h-20 w-20 items-center justify-center rounded-md border-2 border-(--color-border) bg-(--color-primary-dark) text-3xl font-black uppercase text-(--color-accent) shadow-[4px_4px_0_rgba(58,40,27,0.4)]">
                  {selectedCustomer.name ? selectedCustomer.name.charAt(0) : "?"}
                </div>
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h3 className="text-xl font-black uppercase text-(--color-primary-dark)">{selectedCustomer.name || "Pelanggan Anonim"}</h3>
                  <div className="mt-2 flex flex-col gap-4 text-xs font-bold text-(--color-text-secondary) sm:flex-row">
                    <p className="flex items-center justify-center gap-2 sm:justify-start"><Mail className="h-4 w-4" /> {selectedCustomer.email || "Email tidak tersedia"}</p>
                    <p className="flex items-center justify-center gap-2 sm:justify-start"><Phone className="h-4 w-4" /> {selectedCustomer.phone || "No HP tidak tersedia"}</p>
                  </div>
                  {selectedCustomer.address && (
                    <p className="mt-2 flex items-center justify-center gap-2 text-xs text-(--color-text-secondary) sm:justify-start"><MapPin className="h-4 w-4 min-w-4" /> <span className="line-clamp-2">{selectedCustomer.address}</span></p>
                  )}
                </div>
              </div>

              {/* Tabel Riwayat Pesanan */}
              <div>
                <div className="mb-3 flex items-center gap-2 border-b-2 border-(--color-border) pb-2">
                  <ShoppingBag className="h-4 w-4 text-(--color-accent-2)" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-primary-dark)">Riwayat Pesanan ({selectedCustomer.orders?.length || 0})</p>
                </div>
                
                <div className="max-h-60 space-y-3 overflow-y-auto pr-2">
                  {selectedCustomer.orders && selectedCustomer.orders.length > 0 ? (
                    selectedCustomer.orders.map((order: any) => (
                      <div key={order.id} className="flex items-center justify-between rounded-md border border-dashed border-(--color-border) bg-(--color-surface) p-3 shadow-sm transition hover:border-(--color-primary)">
                        <div>
                          <p className="text-xs font-bold uppercase text-(--color-primary-dark)">{order.invoice || order.id.slice(0,8).toUpperCase()}</p>
                          <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                            {formatDate(order.createdAt)} | <span className="text-(--color-accent-2)">{order.status}</span>
                          </p>
                        </div>
                        <p className="text-xs font-black text-(--color-primary-dark)">
                          {formatRupiah(order.totalAmount)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-md border border-dashed border-(--color-border) bg-(--color-bg) py-6 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">Belum ada riwayat pesanan</p>
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