import Footer from '@/components/storefront/Footer';
import Navbar from '@/components/storefront/Navbar';
import Link from 'next/link';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Konten Halaman */}
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}