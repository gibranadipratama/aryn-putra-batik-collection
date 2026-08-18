export default function LoadingAdminPesanan() {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="mx-auto max-w-7xl font-sans pb-24">
      
      {/* HEADER SECTION */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end rounded-xl border-2 border-(--color-border) bg-(--color-surface) px-6 py-6 shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2)">Management</p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-4xl">Pesanan</h1>
        </div>
      </div>

      {/* FILTER & SEARCH SKELETON */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="h-12 w-full max-w-md animate-pulse rounded-md border-2 border-(--color-border) bg-(--color-surface)"></div>
      </div>

      {/* TABS STATUS SKELETON */}
      <div className="mb-8 flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-9 w-28 animate-pulse rounded-md border-2 border-(--color-border) bg-(--color-surface)"></div>
        ))}
      </div>

      {/* TABEL SKELETON */}
      <div className="overflow-x-auto rounded-xl border-2 border-(--color-border) bg-(--color-surface) shadow-[6px_6px_0_rgba(139,94,60,0.25)] p-6">
        <div className="space-y-4 animate-pulse">
          <div className="h-8 w-full rounded bg-(--color-border)/20 mb-6"></div>
          {skeletonRows.map((_, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-dashed border-(--color-border)/40">
              <div className="space-y-2">
                <div className="h-3 w-32 rounded bg-(--color-border)/40"></div>
                <div className="h-2 w-20 rounded bg-(--color-border)/20"></div>
              </div>
              <div className="h-3 w-24 rounded bg-(--color-border)/30"></div>
              <div className="h-4 w-28 rounded bg-(--color-border)/30"></div>
              <div className="h-6 w-20 rounded bg-(--color-border)/20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}