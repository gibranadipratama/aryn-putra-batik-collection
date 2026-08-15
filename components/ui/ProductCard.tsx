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

  const defaultVariant = product.variants?.[0];

  const handleQuickAction = (e: React.MouseEvent, isBuyNow: boolean) => {
    e.preventDefault(); 

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
    <div className="group flex flex-col overflow-hidden rounded-lg border-2 border-(--color-border) bg-(--color-surface) shadow-[4px_4px_0_rgba(139,94,60,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(139,94,60,0.35)]">
      
      {/* Gambar Produk */}
      <Link href={`/produk/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-(--color-bg) border-b-2 border-(--color-border)">
        <Image 
          src={product.images[0] || "/batik-default.jpg"} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        {product.discount > 0 && (
          <span className="absolute left-3 top-3 rounded-md border border-(--color-danger) bg-(--color-danger) px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            Diskon {product.discount}%
          </span>
        )}
      </Link>

      {/* Konten & Informasi */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2)">
            {product.category?.name || "Koleksi Batik"}
          </p>
          <Link href={`/produk/${product.slug}`}>
            <h3 className="mt-1 line-clamp-1 text-sm font-bold uppercase tracking-wide text-(--color-primary-dark) transition-colors hover:text-(--color-primary)">
              {product.name}
            </h3>
          </Link>

          {/* Harga */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm font-bold text-(--color-text-primary)">{formatRupiah(finalPrice)}</span>
            {product.discount > 0 && (
              <span className="text-xs text-(--color-text-secondary) line-through opacity-80">{formatRupiah(product.price)}</span>
            )}
          </div>
        </div>

        {/* Tombol Aksi Cepat */}
        <div className="mt-4 grid grid-cols-2 gap-2 pt-3">
          <button 
            onClick={(e) => handleQuickAction(e, false)}
            disabled={isPending || !defaultVariant || defaultVariant.stock === 0}
            className="flex items-center justify-center gap-1.5 rounded-md border-2 border-(--color-primary) bg-transparent py-2 text-[10px] font-bold uppercase tracking-wider text-(--color-primary) transition hover:bg-(--color-primary) hover:text-(--color-surface) disabled:opacity-40"
            title="Masukkan Keranjang"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Keranjang
          </button>

          <button 
            onClick={(e) => handleQuickAction(e, true)}
            disabled={isPending || !defaultVariant || defaultVariant.stock === 0}
            className="flex items-center justify-center gap-1.5 rounded-md border-2 border-(--color-primary) bg-(--color-primary) py-2 text-[10px] font-bold uppercase tracking-wider text-(--color-surface) shadow-[2px_2px_0_rgba(139,94,60,0.3)] transition hover:-translate-y-0.5 hover:bg-(--color-primary-dark) hover:border-(--color-primary-dark) disabled:opacity-40"
            title="Beli Sekarang"
          >
            Beli <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}