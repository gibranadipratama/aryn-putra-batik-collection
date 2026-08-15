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

  // Hitung Subtotal
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
        // Untuk sementara diarahkan ke halaman invoice/sukses
        // Nanti ini akan diganti dengan memunculkan Popup Midtrans Snap
        router.push(`/pesanan/${res.orderNumber}`); 
      } else {
        toast.error(res.message || "Gagal memproses pesanan.");
        if (res.requireProfileUpdate) {
          router.push("/akun"); // Lempar ke profil jika alamat kosong
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F0E7] py-12 px-5 md:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-black uppercase tracking-widest text-[#0B1F33] mb-8">Checkout Pesanan</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* KOLOM KIRI: ALAMAT & BARANG */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Box Alamat Pengiriman */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#0B1F33]/5">
              <div className="flex items-center justify-between mb-4 border-b border-[#0B1F33]/10 pb-4">
                <h2 className="text-sm font-black uppercase tracking-widest text-[#0B1F33] flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#A88A3D]" /> Alamat Pengiriman
                </h2>
                <button onClick={() => router.push("/akun")} className="text-[10px] font-bold uppercase text-[#A88A3D] hover:text-[#0B1F33]">Ubah Alamat</button>
              </div>
              
              {user.address && user.phone ? (
                <div className="text-sm text-[#0B1F33]/80 leading-relaxed">
                  <p className="font-bold text-[#0B1F33] mb-1">{user.name}</p>
                  <p className="flex items-center gap-2 mb-2"><Phone className="h-3 w-3" /> {user.phone}</p>
                  <p>{user.address}</p>
                </div>
              ) : (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold flex flex-col gap-2">
                  <p>Anda belum melengkapi alamat pengiriman dan nomor handphone.</p>
                  <button onClick={() => router.push("/akun")} className="bg-red-600 text-white py-2 px-4 rounded-lg self-start">Lengkapi Sekarang</button>
                </div>
              )}
            </div>

            {/* Box Rincian Produk */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#0B1F33]/5">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#0B1F33] mb-4 border-b border-[#0B1F33]/10 pb-4">Rincian Barang</h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = item.variant.product;
                  const finalPrice = product.discount > 0 ? product.price - (product.price * product.discount) / 100 : product.price;

                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-16 shrink-0 rounded-lg overflow-hidden bg-[#EDE6DA]">
                        <Image src={product.images[0] || "/batik-default.jpg"} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm uppercase tracking-wide text-[#0B1F33]">{product.name}</h3>
                        <p className="text-[10px] uppercase text-[#0B1F33]/50 mt-1">Ukuran: {item.variant.size} • Qty: {item.quantity}</p>
                        <p className="font-black text-[#A88A3D] mt-2">{formatRupiah(finalPrice * item.quantity)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>

          {/* KOLOM KANAN: TOTAL & TOMBOL BAYAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#0B1F33] text-[#E8E0D3] rounded-3xl p-6 shadow-2xl">
              <h3 className="text-sm font-black uppercase tracking-widest border-b border-white/10 pb-4 mb-4">Ringkasan Pembayaran</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-70">Subtotal</span>
                  <span className="font-bold">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Pengiriman</span>
                  <span className="font-bold text-[#A88A3D]">Gratis</span>
                </div>
              </div>

              <div className="border-t border-white/10 mt-6 pt-4 flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest">Total Bayar</span>
                <span className="text-xl font-black text-[#A88A3D]">{formatRupiah(subtotal)}</span>
              </div>

              <button 
                onClick={handleProcessPayment}
                disabled={isPending || !user.address || !user.phone}
                className="mt-8 group flex w-full items-center justify-center gap-2 rounded-xl bg-[#A88A3D] py-4 text-xs font-black uppercase tracking-[0.2em] text-[#0B1F33] shadow-lg transition-all hover:bg-white disabled:opacity-50 disabled:pointer-events-none"
              >
                {isPending ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Memproses...</>
                ) : (
                  <><CreditCard className="h-4 w-4" /> Bayar Sekarang</>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest text-white/40">
                <ShieldCheck className="h-3 w-3" /> Transaksi Terlindungi
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}