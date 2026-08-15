"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Tag } from "lucide-react";

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
};

export default function CategoryClient({ products, categorySlug }: { products: any[], categorySlug: string }) {
  const formatTitle = (slug?: string) => {
    if (!slug) return "Kategori";
    return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  const title = formatTitle(categorySlug);

  return (
    <div className="min-h-screen bg-(--color-bg) font-sans">
      
      {/* HEADER KATEGORI - Sangat Kompak */}
      <div className="border-b-2 border-(--color-border) bg-(--color-surface) py-6 md:py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 md:flex-row md:items-center md:px-8">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="h-0.5 w-6 bg-(--color-accent)"></span>
              <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                Arsip Koleksi
              </p>
            </div>
            <h1 className="text-2xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-3xl">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-3 border-l-2 border-(--color-border) pl-4">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-(--color-text-secondary)">Total Item</p>
              <p className="text-xl font-black text-(--color-accent-2)">{products.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* GRID PRODUK */}
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        {products.length === 0 ? (
          // EMPTY STATE
          <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-sm border-2 border-dashed border-(--color-border) bg-(--color-surface) py-16 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-(--color-border) bg-(--color-bg)">
              <ShoppingBag className="h-5 w-5 text-(--color-text-secondary)" />
            </div>
            <h3 className="text-base font-black uppercase tracking-wider text-(--color-primary-dark)">Arsip Kosong</h3>
            <p className="mt-1.5 text-xs text-(--color-text-secondary)">Koleksi untuk kategori ini sedang tidak tersedia atau habis terjual.</p>
            <Link 
              href="/" 
              className="mt-5 rounded-md border-2 border-(--color-primary) bg-(--color-primary) px-5 py-2 text-[9px] font-bold uppercase tracking-widest text-(--color-surface) shadow-[2px_2px_0_rgba(139,94,60,0.3)] transition hover:-translate-y-0.5 hover:bg-(--color-primary-dark)"
            >
              Lihat Koleksi Lainnya
            </Link>
          </div>
        ) : (
          // TAMPILAN KARTU UKURAN KOMPAK (Grid 2 s.d 4 Kolom)
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {products.map((product, index) => {
              const rotationClass = index % 2 === 0 ? "hover:-rotate-1" : "hover:rotate-1";

              return (
                <Link 
                  key={product.id} 
                  href={`/produk/${product.slug}`} 
                  className={`group relative flex flex-col rounded-sm border-2 border-(--color-border) bg-(--color-surface) p-3 shadow-[4px_4px_0_rgba(201,168,118,0.4)] transition-all duration-300 hover:-translate-y-1 ${rotationClass}`}
                >
                  
                  {/* LABEL DISKON - Stiker Retro Kecil */}
                  {product.discount > 0 && (
                    <div className="absolute -right-2 -top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-(--color-border) bg-(--color-accent) shadow-[2px_2px_0_rgba(58,40,27,0.4)]">
                      <span className="text-center text-[8px] font-black leading-tight text-(--color-text-primary)">
                        {product.discount}%<br/>OFF
                      </span>
                    </div>
                  )}

                  {/* AREA GAMBAR - Lebih proporsional/kecil (Persegi) */}
                  <div className="relative aspect-square w-full overflow-hidden border border-(--color-border) bg-(--color-bg)">
                    <Image 
                      src={product.images[0] || "/batik-sementara.jpg"} 
                      alt={product.name} 
                      fill 
                      className="object-cover grayscale-15 sepia-5 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:sepia-0" 
                    />
                  </div>
                  
                  {/* INFO PRODUK */}
                  <div className="flex flex-col items-center pt-3 text-center">
                    <p className="text-[8px] font-bold uppercase tracking-widest text-(--color-accent-2)">
                      Ref: {product.slug.substring(0, 6)}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-xs font-bold uppercase tracking-wide text-(--color-text-primary) group-hover:text-(--color-primary)">
                      {product.name}
                    </h3>
                    
                    <div className="my-2 w-8 border-b border-dotted border-(--color-border)"></div>
                    
                    {/* AREA HARGA */}
                    <div className="flex flex-col items-center">
                      {product.discount > 0 ? (
                        <>
                          <p className="text-[9px] font-bold text-(--color-text-secondary) line-through">
                            {formatRupiah(product.price)}
                          </p>
                          <p className="text-xs font-black text-(--color-danger)">
                            {formatRupiah(product.price - (product.price * product.discount) / 100)}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs font-black text-(--color-primary-dark)">
                          {formatRupiah(product.price)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* AKSEN BAWAH */}
                  <div className="mt-3 border-t border-(--color-bg) pt-2 text-center">
                    <div className="inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest text-(--color-text-secondary) group-hover:text-(--color-primary-dark)">
                      <Tag className="h-2.5 w-2.5" /> Detail
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}