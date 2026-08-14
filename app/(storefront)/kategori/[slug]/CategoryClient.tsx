"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-[#F4F0E7]">
      {/* HEADER KATEGORI */}
      <div className="bg-[#0B1F33] py-16 text-center text-[#E8E0D3]">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A88A3D] mb-4">
          Aryn Putra Collection
        </p>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest">
          Koleksi {title}
        </h1>
        <div className="mx-auto mt-6 h-1 w-24 bg-[#A88A3D]"></div>
      </div>

      {/* GRID PRODUK */}
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 lg:py-20">
        <div className="mb-8 flex items-center justify-between border-b border-[#0B1F33]/10 pb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0B1F33]/60">
            Menampilkan <span className="text-[#0B1F33]">{products.length}</span> Produk
          </p>
        </div>

        {products.length === 0 ? (
          // TAMPILAN JIKA KATEGORI KOSONG
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag className="h-12 w-12 text-[#0B1F33]/20 mb-4" />
            <h3 className="text-lg font-black uppercase tracking-wider text-[#0B1F33]">Koleksi Kosong</h3>
            <p className="mt-2 text-sm text-[#0B1F33]/60">Belum ada produk untuk kategori {title} saat ini.</p>
            <Link href="/" className="mt-6 border border-[#0B1F33] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#0B1F33] transition hover:bg-[#0B1F33] hover:text-[#E8E0D3]">
              Kembali ke Beranda
            </Link>
          </div>
        ) : (
          // TAMPILAN GRID PRODUK
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {products.map((product) => (
              <Link key={product.id} href={`/produk/${product.slug}`} className="group relative flex flex-col bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                
                {/* AREA GAMBAR */}
                <div className="relative aspect-3/4 w-full overflow-hidden bg-[#EDE6DA]">
                  <Image 
                    src={product.images[0] || "/batik-sementara.jpg"} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* LABEL DISKON */}
                  {product.discount > 0 && (
                    <span className="absolute left-3 top-3 bg-red-600 px-3 py-1.5 text-[10px] font-black text-white shadow-md">
                      -{product.discount}%
                    </span>
                  )}

                  {/* OVERLAY BUTTON (Muncul saat di-hover) */}
                  <div className="absolute inset-0 bg-[#0B1F33]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                    <div className="w-full bg-[#0B1F33] py-3 text-center text-[10px] font-bold uppercase tracking-widest text-[#E8E0D3] shadow-lg flex items-center justify-center gap-2 hover:bg-[#A88A3D] transition-colors">
                      Lihat Detail <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
                
                {/* INFO PRODUK */}
                <div className="flex flex-1 flex-col p-4 text-center">
                  <h3 className="text-sm font-black uppercase tracking-wide text-[#0B1F33] line-clamp-1 mb-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex-1"></div>
                  
                  {/* AREA HARGA */}
                  <div className="mt-auto pt-3 border-t border-[#0B1F33]/10">
                    {product.discount > 0 ? (
                      <div className="flex flex-col items-center">
                        <p className="text-[10px] font-bold text-[#0B1F33]/40 line-through">
                          {formatRupiah(product.price)}
                        </p>
                        <p className="text-sm lg:text-base font-black text-red-600">
                          {formatRupiah(product.price - (product.price * product.discount) / 100)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm lg:text-base font-black text-[#0B1F33]">
                        {formatRupiah(product.price)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}