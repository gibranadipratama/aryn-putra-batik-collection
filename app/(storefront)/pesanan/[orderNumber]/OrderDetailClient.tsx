"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Phone, CheckCircle2, Circle, XCircle } from "lucide-react";

const formatRupiah = (angka: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);

const formatTanggal = (date: string | Date) =>
  new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(date));

const steps = [
  { key: "PENDING", label: "Menunggu Pembayaran" },
  { key: "PROCESSING", label: "Diproses" },
  { key: "SHIPPED", label: "Dikirim" },
  { key: "DELIVERED", label: "Selesai" },
];

export default function OrderDetailClient({ order }: { order: any }) {
  const isCancelled = order.status === "CANCELLED";
  const currentStepIndex = steps.findIndex((s) => s.key === order.status);
  const subtotal = order.items.reduce((total: number, item: any) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F4F0E7] py-12 px-5 md:px-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/pesanan" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0B1F33]/60 hover:text-[#A88A3D] mb-6">
          <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Pesanan Saya
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-8">
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-[#0B1F33]">{order.orderNumber}</h1>
          <p className="text-xs text-[#0B1F33]/50">{formatTanggal(order.createdAt)}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#0B1F33]/5 p-6 mb-6">
          {isCancelled ? (
            <div className="flex items-center gap-3 text-red-600">
              <XCircle className="h-5 w-5" />
              <p className="text-sm font-black uppercase tracking-widest">Pesanan Dibatalkan</p>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              {steps.map((step, idx) => {
                const isDone = idx <= currentStepIndex;
                return (
                  <div key={step.key} className="flex-1 flex flex-col items-center relative">
                    {idx > 0 && (
                      <div className={`absolute right-1/2 top-3 h-0.5 w-full z-0 ${idx <= currentStepIndex ? "bg-[#A88A3D]" : "bg-[#0B1F33]/10"}`} />
                    )}
                    {isDone ? (
                      <CheckCircle2 className="h-6 w-6 text-[#A88A3D] bg-white relative z-10" />
                    ) : (
                      <Circle className="h-6 w-6 text-[#0B1F33]/20 bg-white relative z-10" />
                    )}
                    <p className={`mt-2 text-[9px] font-black uppercase tracking-wider text-center ${isDone ? "text-[#0B1F33]" : "text-[#0B1F33]/40"}`}>
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#0B1F33]/5">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#0B1F33] flex items-center gap-2 mb-4 border-b border-[#0B1F33]/10 pb-4">
                <MapPin className="h-4 w-4 text-[#A88A3D]" /> Alamat Pengiriman
              </h2>
              <div className="text-sm text-[#0B1F33]/80 leading-relaxed">
                <p className="font-bold text-[#0B1F33] mb-1">{order.customerName}</p>
                <p className="flex items-center gap-2 mb-2"><Phone className="h-3 w-3" /> {order.customerPhone}</p>
                <p>{order.shippingAddress}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#0B1F33]/5">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#0B1F33] mb-4 border-b border-[#0B1F33]/10 pb-4">Rincian Barang</h2>
              <div className="space-y-4">
                {order.items.map((item: any) => {
                  const product = item.variant.product;
                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-16 shrink-0 rounded-lg overflow-hidden bg-[#EDE6DA]">
                        <Image src={product.images[0] || "/batik-default.jpg"} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm uppercase tracking-wide text-[#0B1F33]">{product.name}</h3>
                        <p className="text-[10px] uppercase text-[#0B1F33]/50 mt-1">Ukuran: {item.variant.size} • Qty: {item.quantity}</p>
                        <p className="font-black text-[#A88A3D] mt-2">{formatRupiah(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#0B1F33] text-[#E8E0D3] rounded-3xl p-6 shadow-2xl">
              <h3 className="text-sm font-black uppercase tracking-widest border-b border-white/10 pb-4 mb-4">Ringkasan</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="opacity-70">Subtotal</span><span className="font-bold">{formatRupiah(subtotal)}</span></div>
                <div className="flex justify-between"><span className="opacity-70">Pengiriman</span><span className="font-bold text-[#A88A3D]">Gratis</span></div>
              </div>
              <div className="border-t border-white/10 mt-6 pt-4 flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest">Total</span>
                <span className="text-xl font-black text-[#A88A3D]">{formatRupiah(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}