import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { getFilteredProducts, getAllCategories } from "@/actions/product";

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
      <div className="mx-auto max-w-375 px-5 pt-12 pb-10 md:px-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A64B2A]">
          Katalog Nusantara
        </p>
        <h1 className="mt-2 text-4xl font-black uppercase tracking-tighter md:text-6xl">
          Semua Koleksi Batik
        </h1>
        <p className="mt-3 text-sm text-[#191817]/6">
          Temukan busana batik eksklusif pilihan Aryn Putra untuk berbagai suasana.
        </p>

        {/* SEARCH & FILTER BAR */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Form Pencarian */}
          <form method="GET" action="/produk" className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#191817]/40" />
            <input
              type="text"
              name="search"
              defaultValue={search || ""}
              placeholder="Cari nama batik..."
              className="w-full rounded-full border border-[#191817]/15 bg-[#EFE9DD] py-3.5 pl-11 pr-4 text-xs outline-none transition focus:border-[#A64B2A]"
            />
            {category && <input type="hidden" name="category" value={category} />}
          </form>

          {/* Filter Kategori */}
          <div className="flex flex-wrap gap-2">
            <Link
              href="/produk"
              className={`rounded-full px-5 py-2.5 text-[10px] font-black uppercase tracking-wider transition ${
                !category ? "bg-[#191817] text-[#F4F0E7]" : "border border-[#191817]/20 hover:bg-[#191817]/5"
              }`}
            >
              Semua
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/produk?category=${cat.slug}`}
                className={`rounded-full px-5 py-2.5 text-[10px] font-black uppercase tracking-wider transition ${
                  category === cat.slug ? "bg-[#191817] text-[#F4F0E7]" : "border border-[#191817]/20 hover:bg-[#191817]/5"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUK GRID */}
      <div className="mx-auto max-w-375 px-5 md:px-10">
        {products.length === 0 ? (
          <div className="flex min-h-75 flex-col items-center justify-center rounded-3xl border border-[#191817]/10 bg-[#EFE9DD] p-10 text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-[#191817]/60">
              Produk tidak ditemukan
            </p>
            <p className="mt-2 text-xs text-[#191817]/40">
              Coba gunakan kata kunci lain atau pilih kategori yang berbeda.
            </p>
            <Link
              href="/produk"
              className="mt-6 rounded-full bg-[#191817] px-6 py-3 text-[10px] font-black uppercase tracking-widest text-[#F4F0E7] transition hover:bg-[#A64B2A]"
            >
              Reset Filter
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {products.map((product) => (
              <Link key={product.id} href={`/produk/${product.slug}`} className="group">
                <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-[#D5CCBC]">
                  <Image
                    src={product.images[0] || "/batik-sementara.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  {product.isNew && (
                    <span className="absolute left-4 top-4 rounded-full bg-[#F4F0E7] px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.15em] shadow-sm">
                      Baru
                    </span>
                  )}
                </div>
                <div className="flex items-start justify-between gap-4 pt-5">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-[-0.04em] transition group-hover:text-[#A64B2A]">
                      {product.name}
                    </h3>
                    <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#191817]/45">
                      {product.category?.name || "Koleksi Batik"}
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-sm font-black">
                    {formatRupiah(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}