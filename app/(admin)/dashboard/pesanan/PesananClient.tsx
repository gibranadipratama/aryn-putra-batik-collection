"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Eye,
  X,
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { updateOrderStatus } from "@/actions/order";

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

const formatDate = (dateString: Date) => {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
};

export default function PesananClient({ orders }: { orders: any[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === "ALL" || order.status === selectedStatus;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      order.orderNumber?.toLowerCase().includes(searchLower) ||
      order.customerName?.toLowerCase().includes(searchLower);

    return matchesStatus && matchesSearch;
  });

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

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return (
          <span className="flex w-max items-center gap-1.5 rounded-md border border-(--color-warning) bg-(--color-warning)/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-(--color-warning)">
            <Clock className="h-3 w-3" /> Menunggu
          </span>
        );
      case "PROCESSING":
        return (
          <span className="flex w-max items-center gap-1.5 rounded-md border border-(--color-primary) bg-(--color-primary)/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-(--color-primary)">
            <Package className="h-3 w-3" /> Diproses
          </span>
        );
      case "SHIPPED":
        return (
          <span className="flex w-max items-center gap-1.5 rounded-md border border-(--color-accent) bg-(--color-accent)/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-(--color-text-primary)">
            <Truck className="h-3 w-3" /> Dikirim
          </span>
        );
      case "DELIVERED":
        return (
          <span className="flex w-max items-center gap-1.5 rounded-md border border-(--color-success) bg-(--color-success)/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-(--color-success)">
            <CheckCircle className="h-3 w-3" /> Selesai
          </span>
        );
      case "CANCELLED":
        return (
          <span className="flex w-max items-center gap-1.5 rounded-md border border-(--color-danger) bg-(--color-danger)/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-(--color-danger)">
            <XCircle className="h-3 w-3" /> Dibatalkan
          </span>
        );
      default:
        return (
          <span className="flex w-max items-center gap-1.5 rounded-md border border-(--color-border) bg-(--color-bg) px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-(--color-text-secondary)">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="mx-auto max-w-7xl font-sans">
      {/* HEADER SECTION */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end rounded-xl border-2 border-(--color-border) bg-(--color-surface) px-6 py-6 shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2)">
            Management
          </p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-4xl">
            Pesanan
          </h1>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-text-secondary)" />
          <input
            placeholder="Cari No. Invoice atau Nama Pelanggan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border-2 border-(--color-border) bg-(--color-surface) py-3.5 pl-10 pr-4 text-xs font-medium text-(--color-text-primary) outline-none transition-all focus:border-(--color-primary) focus:shadow-[4px_4px_0_rgba(139,94,60,0.2)]"
          />
        </div>
      </div>

      {/* TABS STATUS */}
      <div className="mb-8 flex flex-wrap gap-2">
        {[
          { key: "ALL", label: "Semua Pesanan" },
          { key: "PENDING", label: "Pending" },
          { key: "PROCESSING", label: "Diproses" },
          { key: "SHIPPED", label: "Dikirim" },
          { key: "DELIVERED", label: "Selesai" },
          { key: "CANCELLED", label: "Dibatalkan" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedStatus(tab.key)}
            className={`rounded-md border-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
              selectedStatus === tab.key
                ? "border-(--color-primary-dark) bg-(--color-primary-dark) text-(--color-surface) shadow-[2px_2px_0_rgba(99,50,26,0.4)]"
                : "border-(--color-border) bg-(--color-surface) text-(--color-text-primary) shadow-[2px_2px_0_rgba(139,94,60,0.2)] hover:-translate-y-0.5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TABEL PESANAN */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-(--color-border) bg-(--color-surface) p-16 text-center shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-(--color-border) bg-(--color-bg)">
            <ShoppingBag className="h-8 w-8 text-(--color-text-secondary)" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-wider text-(--color-primary-dark)">
            Tidak Ada Pesanan
          </h3>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-(--color-text-secondary)">
            Belum ada data pesanan yang masuk atau sesuai dengan pencarian Anda.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border-2 border-(--color-border) bg-(--color-surface) shadow-[6px_6px_0_rgba(139,94,60,0.25)]">
          <table className="w-full text-left text-xs text-(--color-text-primary)">
            <thead className="border-b-2 border-(--color-border) bg-(--color-bg) text-[9px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
              <tr>
                <th className="px-6 py-4">Invoice & Tanggal</th>
                <th className="px-6 py-4">Pelanggan</th>
                <th className="px-6 py-4">Total Belanja</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed divide-(--color-border)">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="transition hover:bg-(--color-bg)">
                  <td className="px-6 py-4">
                    <p className="font-bold uppercase text-(--color-primary-dark)">
                      {order.orderNumber}
                    </p>
                    <p className="mt-1 text-[10px] text-(--color-text-secondary)">
                      {formatDate(order.createdAt)}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-bold">{order.customerName}</td>
                  <td className="px-6 py-4 font-black text-(--color-accent-2)">
                    {formatRupiah(order.totalAmount)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center gap-1.5 rounded border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-(--color-text-primary) shadow-[2px_2px_0_rgba(139,94,60,0.2)] transition hover:-translate-y-0.5 hover:bg-(--color-primary) hover:text-(--color-surface)"
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
          <div
            className="absolute inset-0 bg-(--color-primary-dark)/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedOrder(null)}
          />

          <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-y-auto rounded-xl border-2 border-(--color-border) bg-(--color-surface) shadow-[8px_8px_0_rgba(139,94,60,0.3)]">
            <div className="flex items-center justify-between border-b-2 border-(--color-border) bg-(--color-bg) px-6 py-4">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-(--color-primary-dark)">
                  Detail Pesanan
                </h2>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2)">
                  {selectedOrder.orderNumber}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full p-2 text-(--color-text-secondary) transition hover:bg-(--color-border) hover:text-(--color-primary-dark)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-6 p-6">
              {/* Info Pelanggan & Status */}
              <div className="grid grid-cols-1 gap-6 rounded-md border-2 border-(--color-border) bg-(--color-bg) p-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                    Informasi Pelanggan
                  </p>
                  <p className="text-xs font-bold text-(--color-primary-dark)">
                    {selectedOrder.customerName}
                  </p>
                  <p className="mt-1 text-xs text-(--color-text-secondary)">
                    {selectedOrder.customerPhone}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-(--color-text-secondary)">
                    {selectedOrder.shippingAddress}
                  </p>
                </div>
                <div className="flex flex-col sm:items-end">
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                    Ubah Status Pesanan
                  </p>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) =>
                      handleStatusChange(selectedOrder.id, e.target.value)
                    }
                    disabled={isPending}
                    className="w-full rounded-md border-2 border-(--color-border) bg-(--color-surface) p-2 text-xs font-bold uppercase tracking-wider text-(--color-text-primary) shadow-[2px_2px_0_rgba(139,94,60,0.2)] outline-none transition focus:border-(--color-primary) sm:w-auto disabled:opacity-50"
                  >
                    <option value="PENDING">PENDING (Menunggu)</option>
                    <option value="PROCESSING">PROCESSING (Dikemas)</option>
                    <option value="SHIPPED">SHIPPED (Perjalanan)</option>
                    <option value="DELIVERED">DELIVERED (Diterima)</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>

              {/* Informasi Alasan Pembatalan (Jika Dibatalkan) */}
              {selectedOrder.status === "CANCELLED" &&
                selectedOrder.cancelReason && (
                  <div className="rounded-md border border-red-300 bg-red-50 p-4 text-red-900 mt-4">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-red-600 mb-1">
                      Informasi Pembatalan dari Pelanggan
                    </p>
                    <p className="text-xs font-semibold">
                      Alasan: {selectedOrder.cancelReason}
                    </p>
                  </div>
                )}

              {/* Daftar Barang */}
              <div>
                <p className="mb-3 border-b-2 border-(--color-border) pb-2 text-[10px] font-bold uppercase tracking-widest text-(--color-primary-dark)">
                  Produk yang Dibeli
                </p>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-md border border-dashed border-(--color-border) bg-(--color-bg) p-3"
                    >
                      <div>
                        <p className="text-xs font-bold uppercase text-(--color-primary-dark)">
                          {item.variant?.product?.name}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-wider text-(--color-text-secondary)">
                          Size:{" "}
                          <span className="font-bold text-(--color-primary-dark)">
                            {item.variant?.size}
                          </span>{" "}
                          | Qty:{" "}
                          <span className="font-bold text-(--color-primary-dark)">
                            {item.quantity}
                          </span>
                        </p>
                      </div>
                      <p className="text-xs font-black text-(--color-primary-dark)">
                        {formatRupiah(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}

                  {(!selectedOrder.items ||
                    selectedOrder.items.length === 0) && (
                    <p className="py-4 text-center text-xs italic text-(--color-text-secondary)">
                      Detail barang tidak ditemukan.
                    </p>
                  )}
                </div>
              </div>

              {/* Total Belanja */}
              <div className="flex items-center justify-between rounded-md border-2 border-(--color-border) bg-(--color-primary-dark) p-4 text-(--color-surface) shadow-[4px_4px_0_rgba(58,40,27,0.4)]">
                <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent)">
                  Total Keseluruhan
                </p>
                <p className="text-lg font-black text-(--color-accent)">
                  {formatRupiah(selectedOrder.totalAmount)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
