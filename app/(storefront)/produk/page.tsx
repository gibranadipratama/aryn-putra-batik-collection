import Link from "next/link";
import { Search } from "lucide-react";
import { getFilteredProducts } from "@/actions/product";
import ProductCard from "@/components/ui/ProductCard";

export const dynamic = "force-dynamic";

export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const search = typeof resolvedSearchParams.search === "string" ? resolvedSearchParams.search : undefined;

  // Mengambil data produk berdasarkan pencarian kata kunci
  const products = await getFilteredProducts(search);

  return (
    <main className="min-h-screen bg-(--color-bg) pb-24 text-(--color-text-primary) font-sans">
      
      {/* HEADER KATALOG - Kompak & Proporsional */}
      <div className="border-b-2 border-(--color-border) bg-(--color-surface) py-6 md:py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 md:flex-row md:items-center md:px-8">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="h-0.5 w-6 bg-(--color-accent)"></span>
              <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                Katalog Nusantara
              </p>
            </div>
            <h1 className="text-2xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-3xl">
              Semua Koleksi Batik
            </h1>
          </div>

          {/* SEARCH BAR */}
          <form method="GET" action="/produk" className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-text-secondary)" />
            <input
              type="text"
              name="search"
              defaultValue={search || ""}
              placeholder="Cari nama batik..."
              className="w-full rounded-md border border-(--color-border) bg-(--color-bg) py-2.5 pl-10 pr-4 text-xs font-medium text-(--color-text-primary) outline-none transition focus:border-(--color-primary) focus:shadow-[2px_2px_0_rgba(139,94,60,0.2)]"
            />
          </form>
        </div>
      </div>

      {/* PRODUK GRID */}
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="mb-6 flex items-center justify-between border-b border-(--color-border) pb-3">
          <p className="text-xs font-bold uppercase tracking-widest text-(--color-text-secondary)">
            Menampilkan <span className="text-(--color-primary-dark)">{products.length}</span> Produk
          </p>
        </div>

        {products.length === 0 ? (
          <div className="flex min-h-62.5 flex-col items-center justify-center rounded-sm border-2 border-dashed border-(--color-border) bg-(--color-surface) p-8 text-center shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
            <p className="text-sm font-bold uppercase tracking-wider text-(--color-text-primary)">
              Produk tidak ditemukan
            </p>
            <p className="mt-1.5 text-xs text-(--color-text-secondary)">
              Coba gunakan kata kunci pencarian yang berbeda.
            </p>
            <Link
              href="/produk"
              className="mt-5 rounded-md border-2 border-(--color-primary) bg-(--color-primary) px-5 py-2 text-[9px] font-bold uppercase tracking-widest text-(--color-surface) shadow-[2px_2px_0_rgba(139,94,60,0.3)] transition hover:-translate-y-0.5 hover:bg-(--color-primary-dark)"
            >
              Reset Pencarian
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}