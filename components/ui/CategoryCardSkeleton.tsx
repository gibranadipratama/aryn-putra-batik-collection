// components/ui/CategoryCardSkeleton.tsx
export default function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col rounded-sm border-2 border-(--color-border) bg-(--color-surface) p-3 shadow-[4px_4px_0_rgba(201,168,118,0.2)]">
      
      {/* Area Gambar Kotak (Aspect Square) */}
      <div className="relative aspect-square w-full animate-pulse border border-(--color-border) bg-black/10"></div>
      
      {/* Area Info Produk */}
      <div className="flex flex-col items-center pt-3 text-center animate-pulse space-y-2">
        {/* Ref Code Kecil */}
        <div className="h-2 w-1/3 rounded bg-(--color-border)/20"></div>
        
        {/* Nama Produk */}
        <div className="h-3.5 w-4/5 rounded bg-(--color-border)/40"></div>
        
        {/* Garis Titik-titik */}
        <div className="my-1 w-8 border-b border-dotted border-(--color-border)/40"></div>
        
        {/* Harga */}
        <div className="h-3.5 w-1/2 rounded bg-(--color-border)/30"></div>
      </div>

      {/* Aksen Bawah (Detail) */}
      <div className="mt-3 border-t border-(--color-bg) pt-2 text-center">
        <div className="mx-auto h-2.5 w-12 rounded bg-(--color-border)/25 animate-pulse"></div>
      </div>
    </div>
  );
}