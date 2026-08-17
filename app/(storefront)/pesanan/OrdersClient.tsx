"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { PackageSearch, ChevronRight, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { cancelOrder, deleteOrderHistory } from "@/actions/order";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useRouter } from "next/navigation";

const formatRupiah = (angka: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);

const formatTanggal = (date: string | Date) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: {
    label: "Menunggu Pembayaran",
    className:
      "border border-(--color-warning) bg-(--color-warning)/10 text-(--color-warning)",
  },
  PROCESSING: {
    label: "Diproses",
    className:
      "border border-(--color-primary) bg-(--color-primary)/10 text-(--color-primary)",
  },
  SHIPPED: {
    label: "Dikirim",
    className:
      "border border-(--color-accent) bg-(--color-accent)/10 text-(--color-text-primary)",
  },
  DELIVERED: {
    label: "Selesai",
    className:
      "border border-(--color-success) bg-(--color-success)/10 text-(--color-success)",
  },
  CANCELLED: {
    label: "Dibatalkan",
    className:
      "border border-(--color-danger) bg-(--color-danger)/10 text-(--color-danger)",
  },
};

export default function OrdersClient({
  orders,
  userId,
}: {
  orders: any[];
  userId?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // State untuk Modal Alasan Pembatalan
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("Berubah pikiran");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // State untuk ConfirmModal Hapus Riwayat
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenCancelModal = (e: React.MouseEvent, orderId: string) => {
    e.preventDefault();
    setSelectedOrderId(orderId);
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancel = () => {
    if (!selectedOrderId) return;

    startTransition(async () => {
      const res = await cancelOrder(selectedOrderId, cancelReason);
      if (res.success) {
        toast.success(res.message);
        setIsCancelModalOpen(false);
        setSelectedOrderId(null);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleDeleteClick = (e: React.MouseEvent, orderId: string) => {
    e.preventDefault();
    setOrderToDelete(orderId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!orderToDelete) return;

    startTransition(async () => {
      const res = await deleteOrderHistory(orderToDelete, userId || "");
      if (res.success) {
        toast.success(res.message);
        setIsDeleteModalOpen(false);
        setOrderToDelete(null);
      } else {
        toast.error(res.message);
      }
    });
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-(--color-bg) p-5 text-center font-sans">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-(--color-border) bg-(--color-surface) shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
          <PackageSearch className="h-8 w-8 text-(--color-text-secondary)" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-wider text-(--color-primary-dark)">
          Belum Ada Pesanan
        </h2>
        <p className="mt-2 text-sm text-(--color-text-secondary) mb-8">
          Anda belum pernah melakukan transaksi apapun.
        </p>
        <Link
          href="/"
          className="rounded-md border-2 border-(--color-primary) bg-(--color-primary) px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-(--color-surface) shadow-[3px_3px_0_rgba(139,94,60,0.3)] transition-all hover:-translate-y-0.5 hover:bg-(--color-primary-dark)"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-bg) py-12 px-5 md:px-8 font-sans">
      <div className="mx-auto max-w-4xl">
        {/* HEADER */}
        <div className="mb-8 rounded-xl border-2 border-(--color-border) bg-(--color-surface) px-6 py-6 shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2) mb-1">
            Riwayat Transaksi
          </p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark)">
            Status Pesanan
          </h1>
        </div>

        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status] || statusConfig.PENDING;
            const firstItem = order.items[0];
            const product = firstItem?.variant?.product;

            return (
              <div
                key={order.id}
                className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-4 shadow-[4px_4px_0_rgba(139,94,60,0.15)] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(139,94,60,0.25)]"
              >
                {/* Link ke detail pesanan */}
                <Link
                  href={`/pesanan/${order.orderNumber}`}
                  className="flex items-center gap-4 flex-1 min-w-0 w-full"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-(--color-border) bg-(--color-bg)">
                    {product?.images?.[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                        {order.orderNumber}
                      </p>
                      <span
                        className={`shrink-0 rounded px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-xs font-bold uppercase tracking-wide text-(--color-primary-dark)">
                      {product?.name}
                      {order.items.length > 1
                        ? ` +${order.items.length - 1} barang lainnya`
                        : ""}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-[10px] text-(--color-text-secondary)">
                        {formatTanggal(order.createdAt)}
                      </p>
                      <p className="text-xs font-black text-(--color-primary-dark)">
                        {formatRupiah(order.totalAmount)}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="h-4 w-4 text-(--color-text-secondary) transition-transform group-hover:translate-x-1" />
                </Link>

                {/* Tombol Aksi */}
                <div className="flex items-center gap-2 self-end md:self-center border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-end">
                  {order.status === "PENDING" && (
                    <button
                      onClick={(e) => handleOpenCancelModal(e, order.id)}
                      className="rounded-md border border-red-300 bg-red-50 px-3 py-1.5 text-[10px] font-bold uppercase text-red-600 hover:bg-red-100 transition"
                    >
                      Batalkan
                    </button>
                  )}

                  {order.status === "CANCELLED" && (
                    <button
                      onClick={(e) => handleDeleteClick(e, order.id)}
                      title="Hapus Riwayat"
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 1. MODAL PILIHAN ALASAN PEMBATALAN */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm font-sans">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border-2 border-(--color-border)">
            <h3 className="text-sm font-black uppercase text-(--color-primary-dark) mb-2">
              Alasan Pembatalan
            </h3>
            <p className="text-xs text-(--color-text-secondary) mb-4">
              Pilih alasan mengapa Anda ingin membatalkan pesanan ini:
            </p>

            <select
              id="cancelReason"
              name="cancelReason"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) p-3 text-xs font-semibold text-(--color-text-primary) outline-none mb-6 focus:border-(--color-primary)"
            >
              <option value="Berubah pikiran">Berubah pikiran</option>
              <option value="Ingin mengubah alamat / pesanan">
                Ingin mengubah alamat / pesanan
              </option>
              <option value="Menemukan harga yang lebih baik">
                Menemukan harga yang lebih baik
              </option>
              <option value="Kendala metode pembayaran">
                Kendala metode pembayaran
              </option>
              <option value="Lainnya">Lainnya</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="flex-1 rounded-md border-2 border-(--color-border) bg-white py-2.5 text-xs font-bold uppercase text-(--color-text-secondary) hover:bg-gray-50 transition"
              >
                Kembali
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={isPending}
                className="flex-1 rounded-md bg-red-600 py-2.5 text-xs font-bold uppercase text-white shadow-md hover:bg-red-700 transition disabled:opacity-50"
              >
                {isPending ? "Memproses..." : "Konfirmasi Batal"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. CONFIRM MODAL KUSTOM UNTUK HAPUS RIWAYAT */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Riwayat Pesanan?"
        message="Apakah Anda yakin ingin menghapus riwayat pesanan ini secara permanen dari daftar Anda?"
        confirmText="Ya, Hapus"
        cancelText="Batal"
        isLoading={isPending}
      />
    </div>
  );
}
