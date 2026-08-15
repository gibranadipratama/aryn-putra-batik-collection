import Link from "next/link";
import { Search } from "lucide-react";
import { getFilteredProducts, getAllCategories } from "@/actions/product";
import ProductCard from "@/components/ui/ProductCard";

// Format harga ke Rupiah
const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const search = typeof resolvedSearchParams.search === "string" ? resolvedSearchParams.search : undefined;
  const category = typeof resolvedSearchParams.category === "string" ? resolvedSearchParams.category : undefined;

  // Ambil data produk berdasarkan filter search/kategori, serta daftar kategori
  const products = await getFilteredProducts(search, category);
  const categories = await getAllCategories();

  return (
    <main className="min-h-screen bg-[#F4F0E7] text-[#191817] pb-24">
      {/* HEADER SECTION */}
      <div className="mx-auto max-w-7xl px-5 pt-12 pb-10 md:px-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A88A3D]">
          Katalog Nusantara
        </p>
        <h1 className="mt-2 text-4xl font-black uppercase tracking-tighter md:text-6xl text-[#0B1F33]">
          Semua Koleksi Batik
        </h1>
        <p className="mt-3 text-sm text-[#0B1F33]/60">
          Temukan busana batik eksklusif pilihan Aryn Putra untuk berbagai suasana.
        </p>

        {/* SEARCH & FILTER BAR */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Form Pencarian */}
          <form method="GET" action="/produk" className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0B1F33]/40" />
            <input
              type="text"
              name="search"
              defaultValue={search || ""}
              placeholder="Cari nama batik..."
              className="w-full rounded-full border border-[#0B1F33]/15 bg-white py-3.5 pl-11 pr-4 text-xs outline-none transition focus:border-[#A88A3D]"
            />
            {category && <input type="hidden" name="category" value={category} />}
          </form>

          {/* Filter Kategori */}
          <div className="flex flex-wrap gap-2">
            <Link
              href="/produk"
              className={`rounded-full px-5 py-2.5 text-[10px] font-black uppercase tracking-wider transition ${
                !category ? "bg-[#0B1F33] text-[#E8E0D3]" : "border border-[#0B1F33]/20 hover:bg-[#0B1F33]/5 text-[#0B1F33]"
              }`}
            >
              Semua
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/produk?category=${cat.slug}`}
                className={`rounded-full px-5 py-2.5 text-[10px] font-black uppercase tracking-wider transition ${
                  category === cat.slug ? "bg-[#0B1F33] text-[#E8E0D3]" : "border border-[#0B1F33]/20 hover:bg-[#0B1F33]/5 text-[#0B1F33]"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUK GRID */}
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {products.length === 0 ? (
          <div className="flex min-h-75 flex-col items-center justify-center rounded-3xl border border-[#0B1F33]/10 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wider text-[#0B1F33]/60">
              Produk tidak ditemukan
            </p>
            <p className="mt-2 text-xs text-[#0B1F33]/40">
              Coba gunakan kata kunci lain atau pilih kategori yang berbeda.
            </p>
            <Link
              href="/produk"
              className="mt-6 rounded-full bg-[#0B1F33] px-6 py-3 text-[10px] font-black uppercase tracking-widest text-[#E8E0D3] transition hover:bg-[#A88A3D] hover:text-[#0B1F33]"
            >
              Reset Filter
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}