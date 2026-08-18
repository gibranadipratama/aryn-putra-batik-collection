export default function LoadingCart() {
  // Kita buat 2 kerangka (skeleton) untuk mewakili barang di keranjang
  const skeletonItems = Array.from({ length: 2 });

  return (
    <div className="min-h-screen bg-(--color-bg) py-12 px-5 md:px-8 font-sans">
      <div className="mx-auto max-w-6xl">
        
        {/* HEADER KERANJANG SKELETON */}
        <div className="mb-8 rounded-xl border-2 border-(--color-border) bg-(--color-surface) px-6 py-6 shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
          <div className="mb-2 h-3 w-32 animate-pulse rounded bg-(--color-border)/30"></div>
          <div className="h-8 w-64 animate-pulse rounded bg-(--color-border)/50"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* BAGIAN KIRI: DAFTAR PRODUK SKELETON */}
          <div className="lg:w-2/3 space-y-4">
            {skeletonItems.map((_, index) => (
              <div key={index} className="flex gap-4 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-4 shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
                
                {/* Gambar Produk Skeleton */}
                <div className="relative h-28 w-24 shrink-0 animate-pulse overflow-hidden rounded-md border border-(--color-border) bg-black/10"></div>

                {/* Info Produk Skeleton */}
                <div className="flex flex-1 flex-col justify-between py-0.5 animate-pulse">
                  <div>
                    {/* Judul Produk */}
                    <div className="mb-2 h-5 w-3/4 rounded bg-(--color-border)/40"></div>
                    {/* Varian/Ukuran */}
                    <div className="h-3 w-24 rounded bg-(--color-border)/20"></div>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    {/* Harga */}
                    <div className="h-5 w-24 rounded bg-(--color-border)/30"></div>
                    {/* Tombol Plus Minus */}
                    <div className="h-8 w-24 rounded bg-(--color-border)/20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BAGIAN KANAN: RINGKASAN SKELETON */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 rounded-xl border-2 border-(--color-border) bg-(--color-primary-dark) p-6 text-(--color-surface) shadow-[6px_6px_0_rgba(139,94,60,0.3)]">
              {/* Judul Ringkasan */}
              <div className="mb-4 h-4 w-1/2 animate-pulse rounded bg-(--color-surface)/30 border-b-2 border-(--color-border) pb-4"></div>
              
              {/* Baris Rincian */}
              <div className="space-y-4 text-sm mt-6">
                <div className="flex justify-between">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-(--color-surface)/20"></div>
                  <div className="h-3 w-1/4 animate-pulse rounded bg-(--color-surface)/40"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-(--color-surface)/20"></div>
                  <div className="h-3 w-1/2 animate-pulse rounded bg-(--color-surface)/40"></div>
                </div>
              </div>

              {/* Total Belanja */}
              <div className="mt-8 flex items-center justify-between border-t-2 border-(--color-border) pt-4">
                <div className="h-3 w-1/3 animate-pulse rounded bg-(--color-surface)/20"></div>
                <div className="h-6 w-1/3 animate-pulse rounded bg-(--color-accent)/60"></div>
              </div>

              {/* Tombol Lanjut Pembayaran */}
              <div className="mt-8 h-12 w-full animate-pulse rounded-md bg-(--color-accent)/40"></div>
              
              {/* Info Keamanan Bawah */}
              <div className="mt-4 mx-auto h-3 w-2/3 animate-pulse rounded bg-(--color-surface)/20"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}