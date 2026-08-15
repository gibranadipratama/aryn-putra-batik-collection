"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { addToCart } from "@/actions/cart";

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
};

export default function ProductCard({ product }: { product: any }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Mengambil varian pertama secara default untuk aksi cepat dari card
  const defaultVariant = product.variants?.[0];

  const handleQuickAction = (e: React.MouseEvent, isBuyNow: boolean) => {
    e.preventDefault(); // Mencegah pindah halaman saat tombol diklik

    if (status === "unauthenticated") {
      toast.error("Silakan masuk terlebih dahulu untuk berbelanja.");
      router.push("/login");
      return;
    }

    const userId = (session?.user as any)?.id;
    if (!userId || !defaultVariant) {
      toast.error("Varian produk tidak tersedia.");
      return;
    }

    startTransition(async () => {
      const res = await addToCart(userId, defaultVariant.id, 1);
      if (res.success) {
        if (isBuyNow) {
          router.push("/keranjang");
        } else {
          toast.success("Produk berhasil dimasukkan ke keranjang!");
        }
      } else {
        toast.error(res.message || "Gagal memproses.");
      }
    });
  };

  const finalPrice = product.discount > 0 
    ? product.price - (product.price * product.discount) / 100 
    : product.price;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-[#0B1F33]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Gambar Produk */}
      <Link href={`/produk/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-[#EDE6DA]">
        <Image 
          src={product.images[0] || "/batik-default.jpg"} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        {product.discount > 0 && (
          <span className="absolute left-3 top-3 rounded-lg bg-red-600 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-md">
            Diskon {product.discount}%
          </span>
        )}
      </Link>

      {/* Konten & Informasi */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A88A3D]">
            {product.category?.name || "Koleksi Batik"}
          </p>
          <Link href={`/produk/${product.slug}`}>
            <h3 className="mt-1 font-black uppercase tracking-wide text-[#0B1F33] text-sm line-clamp-1 hover:text-[#A88A3D] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Harga */}
          <div className="mt-2 flex items-center gap-2">
            <span className="font-black text-sm text-[#0B1F33]">{formatRupiah(finalPrice)}</span>
            {product.discount > 0 && (
              <span className="text-[10px] line-through text-[#0B1F33]/40">{formatRupiah(product.price)}</span>
            )}
          </div>
        </div>

        {/* Tombol Aksi Cepat (Keranjang & Beli) */}
        <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-[#0B1F33]/5">
          <button 
            onClick={(e) => handleQuickAction(e, false)}
            disabled={isPending || !defaultVariant || defaultVariant.stock === 0}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-[#0B1F33] bg-transparent py-2 text-[10px] font-black uppercase tracking-wider text-[#0B1F33] transition hover:bg-[#0B1F33] hover:text-[#E8E0D3] disabled:opacity-40"
            title="Masukkan Keranjang"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Keranjang
          </button>

          <button 
            onClick={(e) => handleQuickAction(e, true)}
            disabled={isPending || !defaultVariant || defaultVariant.stock === 0}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0B1F33] py-2 text-[10px] font-black uppercase tracking-wider text-[#E8E0D3] transition hover:bg-[#A88A3D] hover:text-[#0B1F33] disabled:opacity-40"
            title="Beli Sekarang"
          >
            Beli <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}