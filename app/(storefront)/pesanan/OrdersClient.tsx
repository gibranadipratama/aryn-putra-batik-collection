"use client";

import Link from "next/link";
import Image from "next/image";
import { PackageSearch, ChevronRight } from "lucide-react";

const formatRupiah = (angka: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);

const formatTanggal = (date: string | Date) =>
  new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: { label: "Menunggu Pembayaran", className: "border border-(--color-warning) bg-(--color-warning)/10 text-(--color-warning)" },
  PROCESSING: { label: "Diproses", className: "border border-(--color-primary) bg-(--color-primary)/10 text-(--color-primary)" },
  SHIPPED: { label: "Dikirim", className: "border border-(--color-accent) bg-(--color-accent)/10 text-(--color-text-primary)" },
  DELIVERED: { label: "Selesai", className: "border border-(--color-success) bg-(--color-success)/10 text-(--color-success)" },
  CANCELLED: { label: "Dibatalkan", className: "border border-(--color-danger) bg-(--color-danger)/10 text-(--color-danger)" },
};

export default function OrdersClient({ orders }: { orders: any[] }) {
  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-(--color-bg) p-5 text-center font-sans">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-(--color-border) bg-(--color-surface) shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
          <PackageSearch className="h-8 w-8 text-(--color-text-secondary)" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-wider text-(--color-primary-dark)">Belum Ada Pesanan</h2>
        <p className="mt-2 text-sm text-(--color-text-secondary) mb-8">Anda belum pernah melakukan transaksi apapun.</p>
        <Link href="/" className="rounded-md border-2 border-(--color-primary) bg-(--color-primary) px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-(--color-surface) shadow-[3px_3px_0_rgba(139,94,60,0.3)] transition-all hover:-translate-y-0.5 hover:bg-(--color-primary-dark)">
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
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2) mb-1">Riwayat Transaksi</p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark)">Status Pesanan</h1>
        </div>

        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status] || statusConfig.PENDING;
            const firstItem = order.items[0];
            const product = firstItem?.variant?.product;

            return (
              <Link
                key={order.id}
                href={`/pesanan/${order.orderNumber}`}
                className="group flex items-center gap-4 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-4 shadow-[4px_4px_0_rgba(139,94,60,0.15)] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(139,94,60,0.25)]"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-(--color-border) bg-(--color-bg)">
                  {product?.images?.[0] && (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">{order.orderNumber}</p>
                    <span className={`shrink-0 rounded px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${status.className}`}>
                      {status.label}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs font-bold uppercase tracking-wide text-(--color-primary-dark)">
                    {product?.name}{order.items.length > 1 ? ` +${order.items.length - 1} barang lainnya` : ""}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-[10px] text-(--color-text-secondary)">{formatTanggal(order.createdAt)}</p>
                    <p className="text-xs font-black text-(--color-primary-dark)">{formatRupiah(order.totalAmount)}</p>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-(--color-text-secondary) transition-transform group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}