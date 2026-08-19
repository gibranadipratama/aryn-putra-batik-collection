export default function LoadingKeuangan() {
  return (
    // Tambahkan class animate-pulse untuk membuat efek berkedip/loading pada seluruh elemen di dalamnya
    <div className="mx-auto max-w-7xl animate-pulse font-sans">
      
      {/* HEADER SKELETON */}
      <div className="mb-8 rounded-xl border-2 border-(--color-border) bg-(--color-surface) px-6 py-6 shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
        <div className="mb-3 h-3 w-32 rounded-md bg-(--color-border)/40"></div>
        <div className="h-10 w-64 rounded-md bg-(--color-border)/40 md:w-80"></div>
      </div>

      {/* WIDGET KESIMPULAN SKELETON */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Kotak 1 Skeleton */}
        <div className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
          <div className="mb-4 h-3 w-40 rounded-md bg-(--color-border)/40"></div>
          <div className="mb-5 h-9 w-48 rounded-md bg-(--color-border)/40"></div>
          <div className="h-5 w-56 rounded-md bg-(--color-border)/40"></div>
        </div>

        {/* Kotak 2 Skeleton */}
        <div className="flex flex-col justify-center rounded-xl border-2 border-(--color-border) bg-(--color-primary-dark)/70 p-6 shadow-[4px_4px_0_rgba(58,40,27,0.3)]">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-3 w-40 rounded-md bg-(--color-surface)/30"></div>
            <div className="h-6 w-6 rounded-md bg-(--color-surface)/30"></div>
          </div>
          <div className="h-9 w-48 rounded-md bg-(--color-surface)/30"></div>
        </div>
      </div>

      {/* TABEL SKELETON */}
      <div className="overflow-hidden rounded-xl border-2 border-(--color-border) bg-(--color-surface) shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
        <div className="border-b-2 border-(--color-border) bg-(--color-bg) p-6">
          <div className="h-4 w-56 rounded-md bg-(--color-border)/40"></div>
        </div>
        <div className="overflow-x-auto p-0">
          <table className="w-full text-left">
            <thead className="border-b-2 border-(--color-border) bg-(--color-surface)">
              <tr>
                <th className="px-6 py-4"><div className="h-3 w-24 rounded-md bg-(--color-border)/40"></div></th>
                <th className="flex justify-end px-6 py-4"><div className="h-3 w-32 rounded-md bg-(--color-border)/40"></div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed divide-(--color-border)">
              {/* Looping 5 baris kosong sebagai skeleton tabel */}
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4"><div className="h-4 w-32 rounded-md bg-(--color-border)/30"></div></td>
                  <td className="flex justify-end px-6 py-4"><div className="h-4 w-28 rounded-md bg-(--color-border)/30"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}