// components/ui/ProductCardSkeleton.tsx
export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border-2 border-(--color-border) bg-(--color-surface) shadow-[4px_4px_0_rgba(139,94,60,0.1)]">
      
      {/* AREA GAMBAR - Animasi denyut halus */}
      <div className="relative aspect-square w-full animate-pulse border-b-2 border-(--color-border) bg-black/10">
        {/* Placeholder untuk badge diskon (opsional, memberi efek detail) */}
        <div className="absolute left-3 top-3 h-5 w-16 rounded-md bg-black/15"></div>
      </div>

      {/* AREA KONTEN */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="animate-pulse space-y-3">
          {/* Kategori - Garis kecil */}
          <div className="h-2.5 w-1/3 rounded-sm bg-(--color-border)/20"></div>
          
          {/* Nama Produk - Garis lebih tebal */}
          <div className="h-4 w-3/4 rounded-sm bg-(--color-border)/40"></div>

          {/* Harga */}
          <div className="mt-4 flex items-center gap-2">
            <div className="h-3.5 w-1/2 rounded-sm bg-(--color-border)/30"></div>
          </div>
        </div>

        {/* AREA TOMBOL */}
        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-(--color-border)/10 pt-3">
          {/* Tombol Keranjang */}
          <div className="h-8 animate-pulse rounded-md border-2 border-(--color-border)/20 bg-transparent"></div>
          {/* Tombol Beli */}
          <div className="h-8 animate-pulse rounded-md bg-(--color-border)/20"></div>
        </div>
      </div>
    </div>
  );
}