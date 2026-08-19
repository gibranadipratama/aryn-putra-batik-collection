"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShoppingBag, ShieldCheck, Truck, ArrowRight, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { addToCart } from "@/actions/cart";

export const dynamic = "force-dynamic";

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
};

export default function ProductDetailClient({ product }: { product: any }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  const handleAction = (isBuyNow: boolean) => {
    if (!selectedVariant) {
      toast.error("Silakan pilih ukuran terlebih dahulu sebelum memesan.");
      return;
    }

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

    startTransition(async () => {
      const res = await addToCart(userId, selectedVariant.id, 1);
      
      if (res.success) {
        if (isBuyNow) {
          toast.success("Mengarahkan ke pembayaran...");
          router.push("/keranjang"); 
        } else {
          toast.success(`${product.name} (Ukuran ${selectedVariant.size}) berhasil masuk keranjang!`);
        }
      } else {
        toast.error(res.message || "Gagal memproses permintaan.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-(--color-bg) pb-20 text-(--color-text-primary) font-sans">
      
      {/* TOMBOL KEMBALI KE HALAMAN SEBELUMNYA SECARA DINAMIS */}
      <div className="mx-auto max-w-6xl px-5 pt-8 lg:px-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-md border-2 border-(--color-border) bg-(--color-surface) px-4 py-2 text-xs font-bold uppercase tracking-wider text-(--color-primary-dark) shadow-[2px_2px_0_rgba(139,94,60,0.2)] transition-all hover:-translate-y-0.5 hover:bg-(--color-primary-dark) hover:text-(--color-surface)"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali
        </button>
      </div>

      <div className="mx-auto max-w-6xl px-5 pt-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* GALERI GAMBAR */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl border-2 border-(--color-border) bg-(--color-surface) shadow-[8px_8px_0_rgba(139,94,60,0.3)]">
              <Image src={product.images[0] || "/batik-default.jpg"} alt={product.name} fill className="object-cover" />
            </div>
          </div>

          {/* INFORMASI PRODUK */}
          <div className="flex flex-col">
            <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2)">{product.category?.name || "Koleksi Batik"}</p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-5xl">{product.name}</h1>
            
            <div className="mt-6 border-y-2 border-(--color-border) py-4">
              {product.discount > 0 ? (
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-black text-(--color-primary-dark)">{formatRupiah(product.price - (product.price * product.discount) / 100)}</p>
                  <p className="text-sm text-(--color-text-secondary) line-through opacity-80">{formatRupiah(product.price)}</p>
                  <span className="rounded-md border border-(--color-danger) bg-(--color-danger) px-2 py-1 text-[10px] font-bold uppercase text-white shadow-[2px_2px_0_rgba(168,69,47,0.3)]">
                    Hemat {product.discount}%
                  </span>
                </div>
              ) : (
                <p className="text-2xl font-black text-(--color-primary-dark)">{formatRupiah(product.price)}</p>
              )}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-(--color-text-secondary)">{product.description}</p>

            {/* PEMILIH VARIAN (WAJIB PILIH) */}
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-(--color-text-primary)">
                  Pilih Ukuran <span className="text-red-500">*</span>
                </p>
                <p className="text-xs font-bold text-(--color-text-secondary)">
                  {selectedVariant ? (
                    <>Sisa Stok: <span className={selectedVariant.stock > 0 ? "text-(--color-primary)" : "text-(--color-danger)"}>{selectedVariant.stock}</span></>
                  ) : (
                    <span className="text-amber-700 italic">Belum dipilih</span>
                  )}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.variants?.map((variant: any) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`h-12 w-14 rounded-md border-2 font-bold transition-all ${
                      selectedVariant?.id === variant.id 
                        ? "border-(--color-primary-dark) bg-(--color-primary-dark) text-(--color-surface) shadow-[3px_3px_0_rgba(99,50,26,0.5)]" 
                        : "border-(--color-border) bg-(--color-surface) text-(--color-text-primary) hover:-translate-y-0.5 hover:border-(--color-primary) hover:shadow-[2px_2px_0_rgba(139,94,60,0.3)]"
                    } ${variant.stock === 0 ? "cursor-not-allowed opacity-40 line-through" : ""}`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            {/* TOMBOL AKSI GANDA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button 
                onClick={() => handleAction(false)}
                disabled={isPending || !selectedVariant || selectedVariant.stock === 0}
                className="flex flex-1 items-center justify-center gap-3 rounded-md border-2 border-(--color-primary-dark) bg-(--color-surface) py-4 text-xs font-bold uppercase tracking-wider text-(--color-primary-dark) shadow-[4px_4px_0_rgba(99,50,26,0.2)] transition-all hover:-translate-y-0.5 hover:bg-(--color-primary-dark) hover:text-(--color-surface) disabled:pointer-events-none disabled:opacity-50"
              >
                <ShoppingBag className="h-4 w-4" /> Masukkan Keranjang
              </button>

              <button 
                onClick={() => handleAction(true)}
                disabled={isPending || !selectedVariant || selectedVariant.stock === 0}
                className="flex flex-1 items-center justify-center gap-3 rounded-md border-2 border-(--color-primary-dark) bg-(--color-primary-dark) py-4 text-xs font-bold uppercase tracking-wider text-(--color-surface) shadow-[4px_4px_0_rgba(99,50,26,0.4)] transition-all hover:-translate-y-0.5 hover:bg-(--color-primary) disabled:pointer-events-none disabled:opacity-50"
              >
                Beli Sekarang <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* INFO TAMBAHAN */}
            <div className="mt-10 space-y-4 rounded-lg border-2 border-dashed border-(--color-border) bg-(--color-surface) p-6">
              <div className="flex items-center gap-3 text-xs font-bold text-(--color-text-primary)">
                <ShieldCheck className="h-5 w-5 text-(--color-accent-2)" /> Garansi Keaslian Batik
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-(--color-text-primary)">
                <Truck className="h-5 w-5 text-(--color-accent-2)" /> Gratis Ongkir Seluruh Indonesia
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}