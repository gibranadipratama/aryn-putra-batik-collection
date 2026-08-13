import Link from "next/link";
import Image from "next/image";
import { getLatestProducts } from "@/actions/product"; // Sesuaikan path import actions Anda

// Format angka ke mata uang Rupiah
const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

export default async function HomePage() {
  // Ambil data produk terbaru dari database Supabase
  const products = await getLatestProducts();

  return (
    <main className="min-h-screen overflow-hidden bg-[#F4F0E7] text-[#191817]">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="mx-auto grid max-w-375 grid-cols-1 gap-10 px-5 py-8 md:grid-cols-12 md:px-10 md:py-14">
        <div className="flex flex-col justify-between md:col-span-7">
          <div>
            <div className="mb-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#A64B2A]">
              <span className="h-px w-10 bg-[#A64B2A]" />
              Koleksi Batik Nusantara
            </div>
            <h1 className="text-[18vw] font-black uppercase leading-[0.78] tracking-[-0.09em] md:text-[9.5vw]">
              Batik
              <br />
              <span className="ml-[7vw] text-[#A64B2A] md:ml-[4vw]">Untuk</span>
              <br />
              <span className="text-transparent [-webkit-text-stroke:1px_#191817] md:[-webkit-text-stroke:2px_#191817]">
                Sehari-hari.
              </span>
            </h1>
          </div>

          <div className="mt-12 max-w-lg md:ml-[14%] md:mt-16">
            <p className="text-base leading-7 text-[#191817]/65 md:text-lg">
              Pilihan batik pria, wanita, dan couple dengan motif pilihan untuk
              berbagai kebutuhan.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/produk"
                className="rounded-full bg-[#191817] px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#F4F0E7] transition hover:bg-[#A64B2A]"
              >
                Belanja Sekarang
              </Link>
              <Link
                href="/kategori/pria"
                className="rounded-full border border-[#191817]/25 px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.18em] transition hover:bg-[#191817] hover:text-white"
              >
                Lihat Koleksi
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative min-h-130 md:col-span-5 md:min-h-175">
          <div className="absolute right-0 top-0 h-[90%] w-[88%] overflow-hidden rounded-[150px_0_150px_0] bg-[#D9D0C0]">
            <Image
              src="/batik-sementara.jpg"
              alt="Koleksi Batik"
              fill
              priority
              className="object-cover object-center transition duration-700 hover:scale-105"
            />
          </div>
          <div className="absolute bottom-0 left-0 flex h-36 w-36 rotate-[-8deg] items-center justify-center rounded-full bg-[#A64B2A] text-center text-[10px] font-black uppercase tracking-[0.15em] text-white md:h-40 md:w-40">
            Koleksi
            <br />
            Batik
            <br />
            Terbaru
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK CATEGORY
      ====================================================== */}
      <section className="border-y border-[#191817]/10 bg-[#191817]">
        <div className="mx-auto grid max-w-375 grid-cols-2 md:grid-cols-4">
          <Link
            href="/produk"
            className="border-r border-white/10 px-5 py-8 text-white transition hover:bg-[#A64B2A] md:px-8"
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/50">
              01
            </span>
            <h3 className="mt-2 text-xl font-black uppercase">Semua Produk</h3>
            <p className="mt-1 text-xs text-white/50">Lihat semua koleksi</p>
          </Link>
          <Link
            href="/kategori/pria"
            className="border-r border-white/10 px-5 py-8 text-white transition hover:bg-[#A64B2A] md:px-8"
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/50">
              02
            </span>
            <h3 className="mt-2 text-xl font-black uppercase">Pria</h3>
            <p className="mt-1 text-xs text-white/50">Kemeja & pakaian pria</p>
          </Link>
          <Link
            href="/kategori/wanita"
            className="border-r border-white/10 px-5 py-8 text-white transition hover:bg-[#A64B2A] md:px-8"
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/50">
              03
            </span>
            <h3 className="mt-2 text-xl font-black uppercase">Wanita</h3>
            <p className="mt-1 text-xs text-white/50">Tunik, dress & blouse</p>
          </Link>
          <Link
            href="/kategori/couple"
            className="px-5 py-8 text-white transition hover:bg-[#A64B2A] md:px-8"
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/50">
              04
            </span>
            <h3 className="mt-2 text-xl font-black uppercase">Couple</h3>
            <p className="mt-1 text-xs text-white/50">Koleksi sarimbit</p>
          </Link>
        </div>
      </section>

      {/* =====================================================
          KOLEKSI UNGGULAN
      ====================================================== */}
      <section className="mx-auto max-w-375 px-5 py-20 md:px-10 md:py-28">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#A64B2A]">
              Koleksi Pilihan
            </p>
            <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.07em] md:text-7xl">
              Pilih
              <br />
              Gayamu<span className="text-[#A64B2A]">.</span>
            </h2>
          </div>
          <Link
            href="/produk"
            className="hidden border-b border-[#191817] pb-1 text-[10px] font-black uppercase tracking-[0.2em] md:block"
          >
            Lihat Semua →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:grid-rows-[320px_320px]">
          <Link
            href="/kategori/pria"
            className="group relative min-h-105 overflow-hidden md:col-span-7 md:row-span-2"
          >
            <Image
              src="/batik-sementara.jpg"
              alt="Koleksi Batik Pria"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white md:bottom-10 md:left-10">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em]">
                Koleksi 01
              </span>
              <h3 className="mt-2 text-5xl font-black uppercase tracking-tighter md:text-7xl">
                Pria
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Kemeja batik untuk berbagai kesempatan
              </p>
              <span className="mt-5 inline-block text-[10px] font-black uppercase tracking-[0.2em]">
                Belanja Sekarang →
              </span>
            </div>
          </Link>

          <Link
            href="/kategori/wanita"
            className="group relative min-h-75 overflow-hidden md:col-span-5"
          >
            <Image
              src="/batik-sementara.jpg"
              alt="Koleksi Batik Wanita"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/10" />
            <div className="absolute bottom-7 left-7 text-white">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em]">
                Koleksi 02
              </span>
              <h3 className="mt-2 text-4xl font-black uppercase tracking-tighter">
                Wanita
              </h3>
              <span className="mt-3 inline-block text-[10px] font-black uppercase tracking-[0.2em]">
                Lihat Produk →
              </span>
            </div>
          </Link>

          <Link
            href="/kategori/couple"
            className="group relative flex min-h-75 items-end justify-between overflow-hidden bg-[#A64B2A] p-8 text-white transition hover:bg-[#8F3E22] md:col-span-5 md:p-10"
          >
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/60">
                Koleksi 03
              </span>
              <h3 className="mt-2 text-4xl font-black uppercase tracking-tighter md:text-5xl">
                Couple
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
                Pilihan batik untuk tampil serasi bersama pasangan.
              </p>
              <span className="mt-5 inline-block text-[10px] font-black uppercase tracking-[0.2em]">
                Lihat Sarimbit →
              </span>
            </div>
            <span className="text-4xl transition-transform duration-300 group-hover:translate-x-2">
              ↗
            </span>
          </Link>
        </div>
      </section>

      {/* =====================================================
          PRODUK TERBARU (DINAMIS DARI DATABASE)
      ====================================================== */}
      <section className="border-y border-[#191817]/10 bg-[#E9E2D5]">
        <div className="mx-auto max-w-375 px-5 py-20 md:px-10 md:py-28">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#A64B2A]">
                Produk Terbaru
              </p>
              <h2 className="text-4xl font-black uppercase tracking-[-0.06em] md:text-6xl">
                Terbaru
              </h2>
            </div>
            <Link
              href="/produk"
              className="hidden text-[10px] font-black uppercase tracking-[0.2em] md:block"
            >
              Lihat Semua →
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#191817]/6it0">
              Belum ada produk yang ditambahkan. Silakan tambah produk melalui
              halaman admin.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/produk/${product.slug}`}
                  className="group"
                >
                  <div className="relative aspect-4/5 overflow-hidden bg-[#D5CCBC]">
                    <Image
                      src={product.images[0] || "/batik-sementara.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    {product.isNew && (
                      <span className="absolute left-4 top-4 rounded-full bg-[#F4F0E7] px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em]">
                        Baru
                      </span>
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-4 pt-5">
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-[-0.04em] transition group-hover:text-[#A64B2A]">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#191817]/45">
                        {product.category?.name || "Batik"}
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
      </section>

      {/* =====================================================
          PROMO / CTA
      ====================================================== */}
      <section className="mx-auto max-w-375 px-5 py-20 md:px-10 md:py-28">
        <div className="relative overflow-hidden bg-[#D5A15A] px-7 py-14 md:px-16 md:py-20">
          <div className="absolute -right-10 -top-20 text-[200px] font-black leading-none text-black/5">
            BATIK
          </div>
          <p className="relative text-[10px] font-bold uppercase tracking-[0.25em]">
            Koleksi Nusantara
          </p>
          <h2 className="relative mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] md:text-7xl">
            Temukan batik
            <br />
            favoritmu.
          </h2>
          <p className="relative mt-6 max-w-lg text-sm leading-6 text-[#191817]/70">
            Pilih dari berbagai koleksi batik pria, wanita, couple, dan produk
            lainnya.
          </p>
          <Link
            href="/produk"
            className="relative mt-8 inline-flex rounded-full bg-[#191817] px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-white transition hover:bg-[#A64B2A]"
          >
            Lihat Semua Produk
          </Link>
        </div>
      </section>
    </main>
  );
}
