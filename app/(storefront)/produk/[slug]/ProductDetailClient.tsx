"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Star, ShieldCheck, Truck, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
};

export default function ProductDetailClient({ product }: { product: any }) {
  const { status } = useSession();
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const handleAddToCart = () => {
    if (status === "unauthenticated") {
      toast.error("Silakan masuk untuk menambahkan ke keranjang");
      router.push("/login");
      return;
    }
    // Di sini nanti kita panggil action untuk menambah ke cart
    toast.success(`${product.name} (Ukuran ${selectedVariant.size}) berhasil masuk keranjang!`);
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

            {/* PEMILIH VARIAN (UKURAN) */}
            <div className="mt-8">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#0B1F33]">Pilih Ukuran</p>
              <div className="flex gap-3">
                {product.variants.map((variant: any) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`h-12 w-12 rounded-xl border-2 font-black transition-all ${
                      selectedVariant.id === variant.id 
                        ? "border-[#A88A3D] bg-[#0B1F33] text-white" 
                        : "border-[#0B1F33]/10 bg-white hover:border-[#A88A3D]"
                    }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            {/* TOMBOL AKSI */}
            <button 
              onClick={handleAddToCart}
              className="mt-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#0B1F33] py-5 text-xs font-black uppercase tracking-[0.2em] text-[#E8E0D3] shadow-lg transition-all hover:-translate-y-1 hover:bg-[#A88A3D] hover:text-[#0B1F33]"
            >
              <ShoppingBag className="h-5 w-5" /> Tambah ke Keranjang
            </button>

            {/* INFO TAMBAHAN */}
            <div className="mt-8 space-y-4 border-t border-[#0B1F33]/10 pt-8">
              <div className="flex items-center gap-3 text-xs text-[#0B1F33]/70">
                <ShieldCheck className="h-4 w-4 text-[#A88A3D]" /> Garansi Keaslian Batik
              </div>
              <div className="flex items-center gap-3 text-xs text-[#0B1F33]/70">
                <Truck className="h-4 w-4 text-[#A88A3D]" /> Gratis Ongkir Seluruh Indonesia
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}