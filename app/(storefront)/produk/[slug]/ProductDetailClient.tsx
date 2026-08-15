"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShoppingBag, ShieldCheck, Truck, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { addToCart } from "@/actions/cart"; // <-- Mengimpor action yang baru dibuat

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
};

export default function ProductDetailClient({ product }: { product: any }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  // Memilih varian pertama secara default
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  // Fungsi dinamis untuk kedua tombol
  const handleAction = (isBuyNow: boolean) => {
    // 1. Cek apakah user sudah login
    if (status === "unauthenticated") {
      toast.error("Silakan masuk (login) untuk melanjutkan transaksi.");
      router.push("/login");
      return;
    }

    const userId = (session?.user as any)?.id;
    if (!userId) {
      toast.error("Sesi tidak valid, silakan login ulang.");
      return;
    }

    // 2. Kirim data ke database
    startTransition(async () => {
      const res = await addToCart(userId, selectedVariant.id, 1);
      
      if (res.success) {
        if (isBuyNow) {
          toast.success("Mengarahkan ke pembayaran...");
          router.push("/keranjang"); // Bawa ke keranjang untuk proses checkout selanjutnya
        } else {
          toast.success(`${product.name} (Ukuran ${selectedVariant.size}) berhasil masuk keranjang!`);
        }
      } else {
        toast.error(res.message || "Gagal memproses permintaan.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F0E7] py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* GALERI GAMBAR */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[#EDE6DA] shadow-xl">
              <Image src={product.images[0] || "/batik-default.jpg"} alt={product.name} fill className="object-cover" />
            </div>
          </div>

          {/* INFORMASI PRODUK */}
          <div className="flex flex-col">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A88A3D]">{product.category.name}</p>
            <h1 className="mt-2 text-3xl md:text-5xl font-black uppercase tracking-widest text-[#0B1F33]">{product.name}</h1>
            
            <div className="mt-6">
              {product.discount > 0 ? (
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-black text-red-600">{formatRupiah(product.price - (product.price * product.discount) / 100)}</p>
                  <p className="text-sm line-through text-[#0B1F33]/40">{formatRupiah(product.price)}</p>
                </div>
              ) : (
                <p className="text-2xl font-black text-[#0B1F33]">{formatRupiah(product.price)}</p>
              )}
            </div>

            <p className="mt-8 text-sm leading-relaxed text-[#0B1F33]/70">{product.description}</p>

            {/* PEMILIH VARIAN (UKURAN & STOK) */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#0B1F33]">Pilih Ukuran</p>
                <p className="text-[10px] font-bold text-[#0B1F33]/50">
                  Sisa Stok: <span className={selectedVariant.stock > 0 ? "text-[#A88A3D]" : "text-red-500"}>{selectedVariant.stock}</span>
                </p>
              </div>
              <div className="flex gap-3">
                {product.variants.map((variant: any) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`h-12 w-12 rounded-xl border-2 font-black transition-all ${
                      selectedVariant.id === variant.id 
                        ? "border-[#A88A3D] bg-[#0B1F33] text-white" 
                        : "border-[#0B1F33]/10 bg-white hover:border-[#A88A3D]"
                    } ${variant.stock === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            {/* TOMBOL AKSI GANDA (KERANJANG & CHECKOUT) */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              
              {/* Tombol Keranjang (Garis Tepi) */}
              <button 
                onClick={() => handleAction(false)}
                disabled={isPending || selectedVariant.stock === 0}
                className="flex-1 flex items-center justify-center gap-3 rounded-2xl border-2 border-[#0B1F33] bg-transparent py-4 text-xs font-black uppercase tracking-[0.2em] text-[#0B1F33] transition-all hover:bg-[#0B1F33] hover:text-[#E8E0D3] disabled:pointer-events-none disabled:opacity-50"
              >
                <ShoppingBag className="h-4 w-4" /> Masukkan Keranjang
              </button>

              {/* Tombol Beli Sekarang (Solid Gold) */}
              <button 
                onClick={() => handleAction(true)}
                disabled={isPending || selectedVariant.stock === 0}
                className="flex-1 flex items-center justify-center gap-3 rounded-2xl bg-[#A88A3D] py-4 text-xs font-black uppercase tracking-[0.2em] text-[#0B1F33] shadow-xl shadow-[#A88A3D]/20 transition-all hover:-translate-y-1 hover:bg-[#0B1F33] hover:text-[#E8E0D3] disabled:pointer-events-none disabled:opacity-50"
              >
                Beli Sekarang <ArrowRight className="h-4 w-4" />
              </button>
              
            </div>

            {/* INFO TAMBAHAN */}
            <div className="mt-8 space-y-4 border-t border-[#0B1F33]/10 pt-8">
              <div className="flex items-center gap-3 text-xs font-bold text-[#0B1F33]/70">
                <ShieldCheck className="h-4 w-4 text-[#A88A3D]" /> Garansi Keaslian Batik
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-[#0B1F33]/70">
                <Truck className="h-4 w-4 text-[#A88A3D]" /> Gratis Ongkir Seluruh Indonesia
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}