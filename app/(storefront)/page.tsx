import Link from "next/link";
import Image from "next/image";
import { getLatestProducts } from "@/actions/product";
import ProductCard from "@/components/ui/ProductCard";

export default async function HomePage() {
  const products = await getLatestProducts();

  return (
    <main className="min-h-screen bg-(--color-bg) text-(--color-text-primary) font-sans">
      {/* =====================================================
          1. HERO SECTION 
      ====================================================== */}
      <section className="bg-(--color-primary-dark) text-(--color-surface) border-b-4 border-(--color-border)">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-12 md:grid-cols-2 md:items-center md:px-8 md:py-20">
          
          {/* GAMBAR HERO */}
          <div className="relative w-full aspect-4/3 md:aspect-4/5 lg:aspect-square order-2 md:order-1">
            <div className="absolute inset-0 overflow-hidden rounded-xl border-2 border-(--color-border) shadow-[6px_6px_0_rgba(201,168,118,0.5)]">
              <Image
                src="/kumpulan-batik.png"
                alt="Model memakai koleksi batik terbaru"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Badge Aksen */}
            <div className="absolute -bottom-6 -right-6 flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-(--color-border) bg-(--color-accent) p-4 text-center text-[10px] font-bold uppercase tracking-widest text-(--color-text-primary) shadow-[4px_4px_0_rgba(58,40,27,0.5)] md:h-32 md:w-32">
              <span>Koleksi</span>
              <span className="text-(--color-surface)">Terbaru</span>
            </div>
          </div>

          {/* TEKS HERO */}
          <div className="flex flex-col justify-center order-1 md:order-2 md:pl-8">
            <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-(--color-accent)">
              <span className="h-0.5 w-8 bg-(--color-accent)" />
              Aryn Putra Batik
            </div>
            
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-(--color-surface)">
              Koleksi Batik Harian. <br />
              <span className="text-(--color-primary-light)">Nyaman & Rapi.</span>
            </h1>
            
            <p className="mt-6 max-w-md text-base leading-relaxed text-(--color-bg) opacity-90">
              Pilihan busana batik pria, wanita, dan couple dengan material katun halus. Dirancang untuk gaya kasual maupun formal.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/produk"
                className="rounded-md bg-(--color-accent) px-8 py-3.5 text-sm font-bold tracking-wide text-(--color-text-primary) shadow-[3px_3px_0_rgba(201,168,118,0.6)] transition-all hover:-translate-y-0.5 hover:bg-(--color-accent-2) hover:text-(--color-surface)"
              >
                Belanja Sekarang
              </Link>
              <Link
                href="/kategori/pria"
                className="rounded-md border-2 border-(--color-border) bg-transparent px-8 py-3.5 text-sm font-bold tracking-wide text-(--color-surface) transition-all hover:-translate-y-0.5 hover:bg-(--color-surface) hover:text-(--color-primary-dark)"
              >
                Lihat Koleksi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          2. QUICK CATEGORY
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { title: "Semua Produk", desc: "Lihat keseluruhan", link: "/produk" },
            { title: "Pria", desc: "Kemeja & kasual", link: "/kategori/pria" },
            { title: "Wanita", desc: "Tunik & blouse", link: "/kategori/wanita" },
            { title: "Couple", desc: "Koleksi sarimbit", link: "/kategori/couple" },
          ].map((cat, i) => (
            <Link
              key={i}
              href={cat.link}
              className="group flex flex-col rounded-lg border-2 border-(--color-border) bg-(--color-primary) p-5 text-(--color-surface) shadow-[4px_4px_0_rgba(139,94,60,0.3)] transition-all hover:-translate-y-1 hover:bg-(--color-primary-dark)"
            >
              <span className="text-[10px] font-bold text-(--color-primary-light)">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold group-hover:text-(--color-accent)">{cat.title}</h3>
              <p className="mt-1 text-xs opacity-80">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          3. PRODUK TERBARU
      ====================================================== */}
      <section className="bg-(--color-surface) border-y-2 border-(--color-border)">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <div className="mb-10 flex items-end justify-between border-b-2 border-(--color-border) pb-4">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl text-(--color-primary-dark)">Produk Terbaru</h2>
              <p className="mt-2 text-sm text-(--color-text-secondary)">Koleksi yang baru saja hadir di toko kami.</p>
            </div>
            <Link
              href="/produk"
              className="hidden text-sm font-bold text-(--color-primary) hover:text-(--color-accent-2) hover:underline md:block"
            >
              Lihat Semua &rarr;
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="flex min-h-50 items-center justify-center rounded-lg border-2 border-dashed border-(--color-border) bg-(--color-bg)">
              <p className="text-sm font-medium text-(--color-text-secondary)">Belum ada produk di sini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/produk" className="inline-block rounded-md border-2 border-(--color-border) bg-(--color-primary) px-6 py-3 text-sm font-bold text-(--color-surface) shadow-[3px_3px_0_rgba(139,94,60,0.3)] transition hover:-translate-y-0.5 hover:bg-(--color-primary-dark)">
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          4. KOLEKSI PILIHAN
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold md:text-3xl text-(--color-primary-dark)">Kategori Pilihan</h2>
          <p className="mt-2 text-sm text-(--color-text-secondary)">Gaya andalan untuk berbagai momen.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Pria */}
          <Link
            href="/kategori/pria"
            className="group relative h-90 overflow-hidden rounded-xl border-2 border-(--color-border) shadow-[4px_4px_0_rgba(99,50,26,0.3)]"
          >
            <Image src="/batik-pria.png" alt="Batik Pria" fill className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-(--color-text-primary) opacity-40 transition-opacity group-hover:opacity-60" />
            <div className="absolute bottom-6 left-6 right-6 border-t-2 border-(--color-accent) pt-4 text-(--color-surface)">
              <h3 className="text-2xl font-bold">Pria</h3>
              <p className="mt-2 text-sm opacity-90">Kemeja rapi untuk kerja dan acara.</p>
            </div>
          </Link>

          {/* Wanita */}
          <Link
            href="/kategori/wanita"
            className="group relative h-90 overflow-hidden rounded-xl border-2 border-(--color-border) shadow-[4px_4px_0_rgba(99,50,26,0.3)]"
          >
            <Image src="/batik-wanita.png" alt="Batik Wanita" fill className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-(--color-text-primary) opacity-40 transition-opacity group-hover:opacity-60" />
            <div className="absolute bottom-6 left-6 right-6 border-t-2 border-(--color-accent) pt-4 text-(--color-surface)">
              <h3 className="text-2xl font-bold">Wanita</h3>
              <p className="mt-2 text-sm opacity-90">Tunik & dress menawan.</p>
            </div>
          </Link>

          {/* Couple */}
          <Link
            href="/kategori/couple"
            className="group relative h-90 overflow-hidden rounded-xl border-2 border-(--color-border) shadow-[4px_4px_0_rgba(99,50,26,0.3)]"
          >
            <Image src="/batik-couple.png" alt="Batik Couple" fill className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-(--color-primary-dark) opacity-70 transition-opacity group-hover:opacity-80" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-(--color-surface) p-6">
              <h3 className="text-3xl font-bold">Couple</h3>
              <p className="mt-3 text-sm opacity-90">Tampil serasi bersama pasangan tercinta.</p>
              <span className="mt-6 rounded-full border border-(--color-surface) px-4 py-2 text-xs uppercase tracking-wider transition-colors group-hover:bg-(--color-surface) group-hover:text-(--color-primary-dark)">
                Lihat Sarimbit
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* =====================================================
          5. PROMO CTA
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
        <div className="relative flex flex-col items-center overflow-hidden rounded-xl border-2 border-(--color-border) bg-(--color-text-primary) px-6 py-16 text-center shadow-[6px_6px_0_rgba(201,168,118,0.5)] md:px-12 md:py-20">
          <h2 className="text-3xl font-bold text-(--color-accent) md:text-5xl">
            Mulai Gaya Batik Anda.
          </h2>
          <p className="mt-4 max-w-lg text-sm text-(--color-surface) opacity-90 md:text-base">
            Cek ketersediaan ukuran dan warna favorit Anda sebelum kehabisan.
          </p>
          <Link
            href="/produk"
            className="mt-8 rounded-md bg-(--color-accent) px-8 py-3.5 text-sm font-bold tracking-wide text-(--color-text-primary) shadow-[3px_3px_0_rgba(201,168,118,0.4)] transition hover:-translate-y-0.5 hover:bg-(--color-surface) hover:text-(--color-primary-dark)"
          >
            Lihat Katalog Lengkap
          </Link>
        </div>
      </section>
    </main>
  );
}