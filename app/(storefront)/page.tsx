import Link from 'next/link';

export default function StorefrontPage() {
  return (
    <main className="min-h-screen bg-orange-50/30 flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">
          Aryn Putra Batik Collection
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Koleksi batik tulis, cap, dan printing terbaik dengan harga spesial untuk pembelian eceran maupun grosir (reseller).
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/produk" className="bg-amber-800 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-900 transition">
            Lihat Koleksi
          </Link>
          <Link href="/daftar" className="bg-white text-amber-800 border border-amber-800 px-6 py-3 rounded-md font-medium hover:bg-orange-50 transition">
            Daftar Reseller
          </Link>
        </div>
      </div>
    </main>
  );
}