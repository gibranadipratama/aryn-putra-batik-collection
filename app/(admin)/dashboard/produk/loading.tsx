export default function LoadingAdminProduk() {
  const skeletonArray = Array.from({ length: 8 });

  return (
    <div className="mx-auto max-w-7xl font-sans pb-24">
      
      {/* HEADER SECTION */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end rounded-xl border-2 border-(--color-border) bg-(--color-surface) px-6 py-6 shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2)">Management</p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-4xl">Produk</h1>
        </div>
        {/* Tombol Tambah Produk Skeleton */}
        <div className="h-12 w-40 animate-pulse rounded-md bg-(--color-border)/30"></div>
      </div>

      {/* FILTER & SEARCH BAR SECTION SKELETON */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="h-12 w-full max-w-md animate-pulse rounded-md border-2 border-(--color-border) bg-(--color-surface)"></div>
        <div className="h-10 w-36 animate-pulse rounded-md border-2 border-(--color-border) bg-(--color-surface)"></div>
      </div>

      {/* TOMBOL FILTER KATEGORI SKELETON */}
      <div className="mb-8 flex flex-wrap gap-2">
        <div className="h-9 w-32 animate-pulse rounded-md border-2 border-(--color-border) bg-(--color-surface)"></div>
        <div className="h-9 w-24 animate-pulse rounded-md border-2 border-(--color-border) bg-(--color-surface)"></div>
        <div className="h-9 w-28 animate-pulse rounded-md border-2 border-(--color-border) bg-(--color-surface)"></div>
      </div>

      {/* GRID PRODUK DASHBOARD SKELETON */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skeletonArray.map((_, index) => (
          <div 
            key={index} 
            className="flex flex-col rounded-md border-2 border-(--color-border) bg-(--color-surface) p-4 shadow-[4px_4px_0_rgba(139,94,60,0.2)] animate-pulse"
          >
            <div className="relative aspect-square w-full overflow-hidden border border-(--color-border) bg-black/10"></div>
            <div className="mt-5 flex flex-1 flex-col space-y-3">
              <div className="h-2 w-1/3 rounded bg-(--color-border)/30"></div>
              <div className="h-4 w-4/5 rounded bg-(--color-border)/50"></div>
              <div className="flex-1"></div>
              <div className="mt-4 border-t-2 border-dashed border-(--color-border) pt-4">
                <div className="h-4 w-1/2 rounded bg-(--color-border)/40"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}