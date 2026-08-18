export default function LoadingOrders() {
  const skeletonOrders = Array.from({ length: 3 });

  return (
    <div className="min-h-screen bg-(--color-bg) py-12 px-5 md:px-8 font-sans">
      <div className="mx-auto max-w-4xl">
        
        {/* HEADER SKELETON */}
        <div className="mb-8 rounded-xl border-2 border-(--color-border) bg-(--color-surface) px-6 py-6 shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
          <div className="mb-2 h-3 w-32 animate-pulse rounded bg-(--color-border)/30"></div>
          <div className="h-8 w-60 animate-pulse rounded bg-(--color-border)/50"></div>
        </div>

        {/* LIST KARTU PESANAN SKELETON */}
        <div className="space-y-4">
          {skeletonOrders.map((_, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-4 shadow-[4px_4px_0_rgba(139,94,60,0.15)] animate-pulse"
            >
              {/* Bagian Kiri: Gambar & Info */}
              <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
                {/* Kotak Gambar Skeleton */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-(--color-border) bg-black/10"></div>

                {/* Teks Info Pesanan */}
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="h-2.5 w-24 rounded bg-(--color-border)/30"></div>
                    {/* Badge Status Skeleton */}
                    <div className="h-5 w-28 rounded bg-(--color-border)/20"></div>
                  </div>
                  <div className="h-3.5 w-3/4 rounded bg-(--color-border)/40"></div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="h-2.5 w-20 rounded bg-(--color-border)/20"></div>
                    <div className="h-3.5 w-24 rounded bg-(--color-border)/40"></div>
                  </div>
                </div>
              </div>

              {/* Tombol Aksi Bawah/Kanan Skeleton */}
              <div className="flex items-center gap-2 self-end md:self-center border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-end">
                <div className="h-7 w-20 rounded-md bg-(--color-border)/20"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}