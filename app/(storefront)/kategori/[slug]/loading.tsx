"use client";

import { usePathname } from "next/navigation";
import CategoryCardSkeleton from "@/components/ui/CategoryCardSkeleton";

export default function LoadingCategory() {
  const pathname = usePathname();
  
  // Mengambil kata terakhir dari URL (misal: "pria" dari "/kategori/pria")
  const slug = pathname?.split("/").pop();
  
  // Memformat judul agar rapi jika ada tanda strip (misal: "lain-lain" -> "Lain Lain")
  const title = slug 
    ? slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") 
    : "Memuat Kategori...";

  const skeletonArray = Array.from({ length: 8 });

  return (
    <div className="min-h-screen bg-(--color-bg) font-sans pb-24">
      
      {/* HEADER KATEGORI SKELETON (Sekarang Judul Langsung Tampil!) */}
      <div className="border-b-2 border-(--color-border) bg-(--color-surface) py-6 md:py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 md:flex-row md:items-center md:px-8">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="h-0.5 w-6 bg-(--color-accent)"></span>
              <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                Arsip Koleksi
              </p>
            </div>
            {/* Judul Asli Tampil Secara Instan */}
            <h1 className="text-2xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-3xl">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-3 border-l-2 border-(--color-border) pl-4">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-(--color-text-secondary)">Total Item</p>
              {/* Efek loading berdenyut hanya pada angka jumlah produk */}
              <div className="mt-1 h-7 w-12 animate-pulse rounded bg-(--color-border)/30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* GRID KARTU SKELETON */}
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {skeletonArray.map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}