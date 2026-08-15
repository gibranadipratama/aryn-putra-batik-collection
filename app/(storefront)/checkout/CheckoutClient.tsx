"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, Phone, ShieldCheck, ArrowRight, Loader2, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import { processCheckout } from "@/actions/checkout";

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
};

export default function CheckoutClient({ user, cartItems }: { user: any, cartItems: any[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const subtotal = cartItems.reduce((total, item) => {
    const product = item.variant.product;
    const finalPrice = product.discount > 0 
      ? product.price - (product.price * product.discount) / 100 
      : product.price;
    return total + (finalPrice * item.quantity);
  }, 0);

  const handleProcessPayment = () => {
    startTransition(async () => {
      const res = await processCheckout(user.id);
      
      if (res.success) {
        toast.success(res.message || "Mengarahkan ke pembayaran...");
        router.push(`/pesanan/${res.orderNumber}`); 
      } else {
        toast.error(res.message || "Gagal memproses pesanan.");
        if (res.requireProfileUpdate) {
          router.push("/akun"); 
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-(--color-bg) py-12 px-5 md:px-8 font-sans">
      <div className="mx-auto max-w-5xl">
        
        {/* HEADER */}
        <div className="mb-8 rounded-xl border-2 border-(--color-border) bg-(--color-surface) px-6 py-6 shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2) mb-1">Konfirmasi Akhir</p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark)">Checkout Pesanan</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* KOLOM KIRI: ALAMAT & BARANG */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Box Alamat Pengiriman */}
            <div className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
              <div className="mb-4 flex items-center justify-between border-b-2 border-(--color-border) pb-4">
                <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-(--color-primary-dark)">
                  <MapPin className="h-4 w-4 text-(--color-accent-2)" /> Alamat Pengiriman
                </h2>
                <button onClick={() => router.push("/akun")} className="text-[10px] font-bold uppercase tracking-wider text-(--color-primary) hover:underline">Ubah Alamat</button>
              </div>
              
              {user.address && user.phone ? (
                <div className="text-xs leading-relaxed text-(--color-text-primary)">
                  <p className="mb-1 font-bold">{user.name}</p>
                  <p className="mb-2 flex items-center gap-2 text-(--color-text-secondary)"><Phone className="h-3 w-3" /> {user.phone}</p>
                  <p className="text-(--color-text-secondary)">{user.address}</p>
                </div>
              ) : (
                <div className="rounded-md border-2 border-(--color-danger) bg-(--color-danger)/10 p-4 text-xs font-bold text-(--color-danger) flex flex-col gap-2">
                  <p>Anda belum melengkapi alamat pengiriman dan nomor handphone.</p>
                  <button onClick={() => router.push("/akun")} className="rounded bg-(--color-danger) py-2 px-4 text-white uppercase tracking-wider self-start transition hover:opacity-90">Lengkapi Sekarang</button>
                </div>
              )}
            </div>

            {/* Box Rincian Produk */}
            <div className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
              <h2 className="mb-4 border-b-2 border-(--color-border) pb-4 text-xs font-bold uppercase tracking-widest text-(--color-primary-dark)">Rincian Barang</h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = item.variant.product;
                  const finalPrice = product.discount > 0 ? product.price - (product.price * product.discount) / 100 : product.price;

                  return (
                    <div key={item.id} className="flex gap-4 border-b border-dashed border-(--color-border) pb-4 last:border-0 last:pb-0">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md border border-(--color-border) bg-(--color-bg)">
                        <Image src={product.images[0] || "/batik-default.jpg"} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xs font-bold uppercase tracking-wide text-(--color-primary-dark)">{product.name}</h3>
                        <p className="mt-1 text-[10px] uppercase text-(--color-text-secondary)">Ukuran: <span className="font-bold text-(--color-primary)">{item.variant.size}</span> • Qty: {item.quantity}</p>
                        <p className="mt-2 text-xs font-black text-(--color-primary-dark)">{formatRupiah(finalPrice * item.quantity)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>

          {/* KOLOM KANAN: TOTAL & TOMBOL BAYAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border-2 border-(--color-border) bg-(--color-primary-dark) p-6 text-(--color-surface) shadow-[6px_6px_0_rgba(139,94,60,0.3)]">
              <h3 className="mb-4 border-b-2 border-(--color-border) pb-4 text-xs font-bold uppercase tracking-widest text-(--color-accent)">Ringkasan Pembayaran</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-xs opacity-80">Subtotal</span>
                  <span className="font-bold">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs opacity-80">Pengiriman</span>
                  <span className="font-bold text-(--color-accent)">Gratis</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t-2 border-(--color-border) pt-4">
                <span className="text-xs font-bold uppercase tracking-widest">Total Bayar</span>
                <span className="text-lg font-black text-(--color-accent)">{formatRupiah(subtotal)}</span>
              </div>

              <button 
                onClick={handleProcessPayment}
                disabled={isPending || !user.address || !user.phone}
                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-(--color-accent) py-3.5 text-xs font-bold uppercase tracking-widest text-(--color-text-primary) shadow-[3px_3px_0_rgba(58,40,27,0.4)] transition-all hover:-translate-y-0.5 hover:bg-(--color-surface) disabled:opacity-50 disabled:pointer-events-none"
              >
                {isPending ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Memproses...</>
                ) : (
                  <><CreditCard className="h-4 w-4" /> Bayar Sekarang</>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest opacity-70">
                <ShieldCheck className="h-3.5 w-3.5 text-(--color-accent)" /> Transaksi Terlindungi
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}