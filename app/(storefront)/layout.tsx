import Link from 'next/link';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="border-b bg-white p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-xl text-amber-800">Aryn Putra Batik</div>
          <nav className="space-x-6 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-amber-800">Beranda</Link>
            <Link href="/produk" className="hover:text-amber-800">Katalog</Link>
            <Link href="/keranjang" className="hover:text-amber-800">Keranjang</Link>
          </nav>
        </div>
      </header>

      {/* Konten Halaman */}
      <div className="grow">{children}</div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Aryn Putra Batik Collection. All rights reserved.</p>
      </footer>
    </div>
  );
}