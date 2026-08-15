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
    <div className="min-h-screen bg-(--color-bg) py-12 px-5 md:px-8 font-sans">
      <div className="mx-auto max-w-4xl">
        <Link href="/pesanan" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary) hover:text-(--color-primary) mb-6">
          <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Pesanan Saya
        </Link>

        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-3xl">{order.orderNumber}</h1>
          <p className="text-xs text-(--color-text-secondary)">{formatTanggal(order.createdAt)}</p>
        </div>

        {/* STEPPER STATUS PESANAN */}
        <div className="mb-6 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
          {isCancelled ? (
            <div className="flex items-center gap-3 text-(--color-danger)">
              <XCircle className="h-5 w-5" />
              <p className="text-xs font-bold uppercase tracking-widest">Pesanan Dibatalkan</p>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              {steps.map((step, idx) => {
                const isDone = idx <= currentStepIndex;
                return (
                  <div key={step.key} className="relative flex flex-1 flex-col items-center">
                    {idx > 0 && (
                      <div className={`absolute right-1/2 top-3 h-0.5 w-full z-0 ${idx <= currentStepIndex ? "bg-(--color-primary)" : "bg-(--color-border)"}`} />
                    )}
                    {isDone ? (
                      <CheckCircle2 className="relative z-10 h-6 w-6 bg-(--color-surface) text-(--color-primary)" />
                    ) : (
                      <Circle className="relative z-10 h-6 w-6 bg-(--color-surface) text-(--color-text-secondary)/40" />
                    )}
                    <p className={`mt-2 text-center text-[9px] font-bold uppercase tracking-wider ${isDone ? "text-(--color-primary-dark)" : "text-(--color-text-secondary)"}`}>
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Alamat */}
            <div className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
              <h2 className="mb-4 flex items-center gap-2 border-b-2 border-(--color-border) pb-4 text-xs font-bold uppercase tracking-widest text-(--color-primary-dark)">
                <MapPin className="h-4 w-4 text-(--color-accent-2)" /> Alamat Pengiriman
              </h2>
              <div className="text-xs leading-relaxed text-(--color-text-primary)">
                <p className="mb-1 font-bold">{order.customerName}</p>
                <p className="mb-2 flex items-center gap-2 text-(--color-text-secondary)"><Phone className="h-3 w-3" /> {order.customerPhone}</p>
                <p className="text-(--color-text-secondary)">{order.shippingAddress}</p>
              </div>
            </div>

            {/* Rincian Barang */}
            <div className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
              <h2 className="mb-4 border-b-2 border-(--color-border) pb-4 text-xs font-bold uppercase tracking-widest text-(--color-primary-dark)">Rincian Barang</h2>
              <div className="space-y-4">
                {order.items.map((item: any) => {
                  const product = item.variant.product;
                  return (
                    <div key={item.id} className="flex gap-4 border-b border-dashed border-(--color-border) pb-4 last:border-0 last:pb-0">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md border border-(--color-border) bg-(--color-bg)">
                        <Image src={product.images[0] || "/batik-default.jpg"} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xs font-bold uppercase tracking-wide text-(--color-primary-dark)">{product.name}</h3>
                        <p className="mt-1 text-[10px] uppercase text-(--color-text-secondary)">Ukuran: <span className="font-bold text-(--color-primary)">{item.variant.size}</span> • Qty: {item.quantity}</p>
                        <p className="mt-2 text-xs font-black text-(--color-primary-dark)">{formatRupiah(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border-2 border-(--color-border) bg-(--color-primary-dark) p-6 text-(--color-surface) shadow-[6px_6px_0_rgba(139,94,60,0.3)]">
              <h3 className="mb-4 border-b-2 border-(--color-border) pb-4 text-xs font-bold uppercase tracking-widest text-(--color-accent)">Ringkasan</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-xs opacity-80">Subtotal</span><span className="font-bold">{formatRupiah(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-xs opacity-80">Pengiriman</span><span className="font-bold text-(--color-accent)">Gratis</span></div>
              </div>
              <div className="mt-6 flex items-center justify-between border-t-2 border-(--color-border) pt-4">
                <span className="text-xs font-bold uppercase tracking-widest">Total</span>
                <span className="text-lg font-black text-(--color-accent)">{formatRupiah(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}