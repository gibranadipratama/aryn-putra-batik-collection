import Navbar from "@/components/storefront/Navbar";
import Footer from "@/components/storefront/Footer"; 
import Providers from "@/components/Providers"; 

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. Bungkus seluruh isi return dengan <Providers>
    <Providers>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {/* Konten Halaman */}
        <div className="grow">{children}</div>
        <Footer />
      </div>
    </Providers>
  );
}