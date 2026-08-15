"use client";

import Link from "next/link";
import Image from "next/image";
import { PackageSearch, ChevronRight } from "lucide-react";

const formatRupiah = (angka: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);

const formatTanggal = (date: string | Date) =>
  new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: { label: "Menunggu Pembayaran", className: "bg-yellow-100 text-yellow-700" },
  PROCESSING: { label: "Diproses", className: "bg-blue-100 text-blue-700" },
  SHIPPED: { label: "Dikirim", className: "bg-purple-100 text-purple-700" },
  DELIVERED: { label: "Selesai", className: "bg-green-100 text-green-700" },
  CANCELLED: { label: "Dibatalkan", className: "bg-red-100 text-red-700" },
};

export default function OrdersClient({ orders }: { orders: any[] }) {
  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F4F0E7] p-5 text-center">
        <div className="h-24 w-24 rounded-full bg-[#0B1F33]/5 flex items-center justify-center mb-6">
          <PackageSearch className="h-10 w-10 text-[#0B1F33]/20" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-widest text-[#0B1F33]">Belum Ada Pesanan</h2>
        <p className="mt-2 text-sm text-[#0B1F33]/60 mb-8">Anda belum pernah melakukan transaksi apapun.</p>
        <Link href="/" className="bg-[#0B1F33] text-[#E8E0D3] px-8 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#A88A3D] hover:text-[#0B1F33] transition-all shadow-lg">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F0E7] py-12 px-5 md:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-black uppercase tracking-widest text-[#0B1F33] mb-8">Status Pesanan</h1>

        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status] || statusConfig.PENDING;
            const firstItem = order.items[0];
            const product = firstItem?.variant?.product;

            return (
              <Link
                key={order.id}
                href={`/pesanan/${order.orderNumber}`}
                className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-[#0B1F33]/5 transition-all hover:shadow-md"
              >
                <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-[#EDE6DA]">
                  {product?.images?.[0] && (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#0B1F33]/50">{order.orderNumber}</p>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${status.className}`}>
                      {status.label}
                    </span>
                  </div>
                  <p className="mt-1 font-black uppercase tracking-wide text-[#0B1F33] text-sm truncate">
                    {product?.name}{order.items.length > 1 ? ` +${order.items.length - 1} barang lainnya` : ""}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-[10px] text-[#0B1F33]/50">{formatTanggal(order.createdAt)}</p>
                    <p className="font-black text-[#A88A3D] text-sm">{formatRupiah(order.totalAmount)}</p>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-[#0B1F33]/30 shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}