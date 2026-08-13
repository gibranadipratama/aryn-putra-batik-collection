"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Eye, X, Clock, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { updateOrderStatus } from "@/actions/order";

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
};

const formatDate = (dateString: Date) => {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(dateString));
};

export default function PesananClient({ orders }: { orders: any[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  
  // State untuk Modal Detail
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Filter Logika
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === "ALL" || order.status === selectedStatus;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      (order.invoice?.toLowerCase().includes(searchLower)) || 
      (order.customerName?.toLowerCase().includes(searchLower));
    
    return matchesStatus && matchesSearch;
  });

  // Fungsi Ubah Status
  const handleStatusChange = (id: string, newStatus: string) => {
    startTransition(async () => {
      const res = await updateOrderStatus(id, newStatus);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
        if (selectedOrder && selectedOrder.id === id) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      } else {
        toast.error(res.message);
      }
    });
  };

  // Komponen Badge Status
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status.toUpperCase()) {
      case "PENDING": return <span className="flex w-max items-center gap-1.5 rounded-full bg-yellow-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-yellow-700"><Clock className="h-3 w-3" /> Menunggu</span>;
      case "DIPROSES": return <span className="flex w-max items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-blue-700"><Package className="h-3 w-3" /> Diproses</span>;
      case "DIKIRIM": return <span className="flex w-max items-center gap-1.5 rounded-full bg-purple-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-purple-700"><Truck className="h-3 w-3" /> Dikirim</span>;
      case "SELESAI": return <span className="flex w-max items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-green-700"><CheckCircle className="h-3 w-3" /> Selesai</span>;
      case "DIBATALKAN": return <span className="flex w-max items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-red-700"><XCircle className="h-3 w-3" /> Dibatalkan</span>;
      default: return <span className="flex w-max items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* HEADER SECTION */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#A88A3D]">Management</p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tighter text-[#0B1F33] md:text-4xl">Pesanan</h1>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#162A3D]/40" />
          <input 
            placeholder="Cari No. Invoice atau Nama Pelanggan..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white shadow-sm border border-[#0B1F33]/5 py-3.5 pl-11 pr-4 text-xs text-[#0B1F33] outline-none transition-all focus:border-[#A88A3D] focus:ring-1 focus:ring-[#A88A3D]" 
          />
        </div>
      </div>

      {/* TABS STATUS */}
      <div className="mb-8 flex flex-wrap gap-2">
        {["ALL", "PENDING", "DIPROSES", "DIKIRIM", "SELESAI", "DIBATALKAN"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedStatus(tab)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm ${
              selectedStatus === tab
                ? "bg-[#0B1F33] text-[#A88A3D]"
                : "bg-white text-[#0B1F33] hover:bg-[#0B1F33]/10"
            }`}
          >
            {tab === "ALL" ? "Semua Pesanan" : tab}
          </button>
        ))}
      </div>

      {/* TABEL PESANAN */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white shadow-sm border border-[#0B1F33]/5 p-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0B1F33]/5">
            <ShoppingBag className="h-8 w-8 text-[#0B1F33]/30" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F33]">Tidak Ada Pesanan</h3>
          <p className="mt-2 max-w-sm text-xs text-[#0B1F33]/50 leading-relaxed">
            Belum ada data pesanan yang masuk atau sesuai dengan pencarian Anda.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-sm border border-[#0B1F33]/5">
          <table className="w-full text-left text-xs text-[#0B1F33]">
            <thead className="bg-[#0B1F33] text-[#E8E0D3] uppercase tracking-widest text-[9px] font-bold">
              <tr>
                <th className="px-6 py-4">Invoice & Tanggal</th>
                <th className="px-6 py-4">Pelanggan</th>
                <th className="px-6 py-4">Total Belanja</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0B1F33]/5">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="transition hover:bg-[#0B1F33]/5">
                  <td className="px-6 py-4">
                    <p className="font-black">{order.invoice || order.id.slice(0,8).toUpperCase()}</p>
                    <p className="mt-1 text-[10px] text-[#0B1F33]/50">{formatDate(order.createdAt)}</p>
                  </td>
                  <td className="px-6 py-4 font-bold">{order.customerName}</td>
                  <td className="px-6 py-4 font-black text-[#A88A3D]">{formatRupiah(order.totalAmount)}</td>
                  <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center gap-1.5 bg-[#EDE6DA] px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#0B1F33] hover:bg-[#0B1F33] hover:text-[#E8E0D3] transition"
                    >
                      <Eye className="h-3 w-3" /> Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL DETAIL PESANAN */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#0B1F33]/70 backdrop-blur-sm transition-opacity" onClick={() => setSelectedOrder(null)} />
          
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-[#0B1F33]/10 px-6 py-4 bg-[#F4F0E7]">
              <div>
                <h2 className="text-lg font-black uppercase tracking-wider text-[#0B1F33]">
                  Detail Pesanan
                </h2>
                <p className="text-[10px] font-bold text-[#A88A3D] uppercase tracking-widest mt-1">
                  {selectedOrder.invoice || selectedOrder.id.toUpperCase()}
                </p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="rounded-full p-2 hover:bg-[#0B1F33]/10 text-[#0B1F33] transition"><X className="h-5 w-5" /></button>
            </div>

            <div className="p-6 flex flex-col gap-6">
              {/* Info Pelanggan & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 border border-[#0B1F33]/10 bg-[#EDE6DA]">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#0B1F33]/50 mb-1">Informasi Pelanggan</p>
                  <p className="text-xs font-black text-[#0B1F33]">{selectedOrder.customerName}</p>
                  <p className="text-xs text-[#0B1F33]/70 mt-1">{selectedOrder.customerEmail}</p>
                  <p className="text-xs text-[#0B1F33]/70 mt-1">{selectedOrder.customerPhone}</p>
                  <p className="text-xs text-[#0B1F33]/70 mt-2 leading-relaxed">{selectedOrder.address}</p>
                </div>
                <div className="flex flex-col sm:items-end">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#0B1F33]/50 mb-2">Ubah Status Pesanan</p>
                  <select 
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                    disabled={isPending}
                    className="w-full sm:w-auto border border-[#0B1F33]/20 bg-white p-2 text-xs font-bold uppercase tracking-wider text-[#0B1F33] outline-none focus:border-[#A88A3D] shadow-sm disabled:opacity-50"
                  >
                    <option value="PENDING">PENDING (Menunggu)</option>
                    <option value="DIPROSES">DIPROSES (Dikemas)</option>
                    <option value="DIKIRIM">DIKIRIM (Perjalanan)</option>
                    <option value="SELESAI">SELESAI (Diterima)</option>
                    <option value="DIBATALKAN">DIBATALKAN</option>
                  </select>
                </div>
              </div>

              {/* Daftar Barang */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#0B1F33] mb-3 border-b border-[#0B1F33]/10 pb-2">Produk yang Dibeli</p>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center border border-[#0B1F33]/5 p-3 bg-[#F4F0E7]">
                      <div>
                        <p className="text-xs font-bold text-[#0B1F33] uppercase">{item.productName}</p>
                        <p className="text-[10px] text-[#0B1F33]/60 mt-1 uppercase tracking-wider">
                          Size: <span className="font-bold text-[#0B1F33]">{item.size}</span> | Qty: <span className="font-bold text-[#0B1F33]">{item.quantity}</span>
                        </p>
                      </div>
                      <p className="text-xs font-black text-[#0B1F33]">
                        {formatRupiah(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                  
                  {!selectedOrder.items || selectedOrder.items.length === 0 && (
                     <p className="text-xs text-center text-[#0B1F33]/40 italic py-4">Detail barang tidak ditemukan.</p>
                  )}
                </div>
              </div>

              {/* Total Belanja */}
              <div className="flex justify-between items-center bg-[#0B1F33] p-4 text-[#E8E0D3]">
                <p className="text-[10px] font-bold uppercase tracking-widest">Total Keseluruhan</p>
                <p className="text-lg font-black">{formatRupiah(selectedOrder.totalAmount)}</p>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}