// app/(storefront)/produk/loading.tsx
import { Search } from "lucide-react";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";

export default function LoadingKatalog() {
  // Angka 8 ini adalah jumlah skeleton card yang ingin ditampilkan (misal: 2 baris)
  const skeletonArray = Array.from({ length: 8 });

  return (
    <main className="min-h-screen bg-(--color-bg) pb-24 text-(--color-text-primary) font-sans">
      
      {/* HEADER KATALOG - Dibuat sama persis seperti aslinya agar transisi mulus */}
      <div className="border-b-2 border-(--color-border) bg-(--color-surface) py-6 md:py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 md:flex-row md:items-center md:px-8">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="h-0.5 w-6 bg-(--color-accent)"></span>
              <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                Katalog Nusantara
              </p>
            </div>
            <h1 className="text-2xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-3xl">
              Semua Koleksi Batik
            </h1>
          </div>

          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <div className="w-full h-10.5 rounded-md border border-gray-200 bg-gray-100"></div>
          </div>
        </div>
      </div>

      {/* GRID PRODUK (Menggunakan Skeleton) */}
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="h-4 w-40 rounded bg-gray-200 animate-pulse"></div>
        </div>

        {/* Tampilkan 8 buah ProductCardSkeleton */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {skeletonArray.map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}