import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t-4 border-(--color-border) bg-(--color-primary-dark) text-(--color-surface) font-sans">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-12 border-b-2 border-(--color-border) py-16 md:grid-cols-12 md:py-20">
          
          {/* IDENTITAS BRAND */}
          <div className="md:col-span-5">
            <Link href="/" className="flex flex-col leading-none">
              <span className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent)">Batik Collection</span>
              <span className="mt-2 text-3xl font-black uppercase tracking-wider md:text-4xl">ARYN PUTRA</span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-(--color-bg) opacity-90">
              Koleksi batik pria, wanita, couple, dan kebutuhan lainnya dengan pilihan motif dan model untuk berbagai kesempatan. Dirancang rapi dan nyaman.
            </p>
          </div>
          
          {/* MENU BELANJA */}
          <div className="md:col-span-2">
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-(--color-accent)">Belanja</h3>
            <div className="flex flex-col gap-3 text-xs text-(--color-bg) opacity-90">
              <Link href="/produk" className="transition-all hover:text-(--color-accent) hover:translate-x-1">Semua Produk</Link>
              <Link href="/kategori/pria" className="transition-all hover:text-(--color-accent) hover:translate-x-1">Pria</Link>
              <Link href="/kategori/wanita" className="transition-all hover:text-(--color-accent) hover:translate-x-1">Wanita</Link>
              <Link href="/kategori/couple" className="transition-all hover:text-(--color-accent) hover:translate-x-1">Couple</Link>
              <Link href="/kategori/lain-lain" className="transition-all hover:text-(--color-accent) hover:translate-x-1">Lain-lain</Link>
            </div>
          </div>
          
          {/* MENU BANTUAN */}
          <div className="md:col-span-2">
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-(--color-accent)">Bantuan</h3>
            <div className="flex flex-col gap-3 text-xs text-(--color-bg) opacity-90">
              <Link href="/bantuan" className="transition-all hover:text-(--color-accent) hover:translate-x-1">Pusat Bantuan</Link>
              <Link href="/pengiriman" className="transition-all hover:text-(--color-accent) hover:translate-x-1">Informasi Pengiriman</Link>
              <Link href="/retur" className="transition-all hover:text-(--color-accent) hover:translate-x-1">Retur & Penukaran</Link>
              <Link href="/panduan-ukuran" className="transition-all hover:text-(--color-accent) hover:translate-x-1">Panduan Ukuran</Link>
            </div>
          </div>
          
          {/* KONTAK */}
          <div className="md:col-span-3">
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-(--color-accent)">Hubungi Kami</h3>
            <div className="space-y-4 text-xs text-(--color-bg) opacity-90">
              <div className="flex gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-(--color-accent)" />
                <span>Pekalongan, Jawa Tengah</span>
              </div>
              <div className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-(--color-accent)" />
                <span>0815 4262 2909</span>
              </div>
              <div className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-(--color-accent)" />
                <span>bgssanap9@gmail.com</span>
              </div>
              <p className="pt-1 text-[10px] opacity-60">Senin - Sabtu · 09:00 - 17:00</p>
            </div>
          </div>
        </div>
        
        {/* COPYRIGHT */}
        <div className="flex flex-col justify-between gap-4 py-6 text-[10px] font-bold uppercase tracking-wider text-(--color-bg) opacity-70 md:flex-row">
          <p>© {new Date().getFullYear()} ARYN PUTRA BATIK COLLECTION. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <Link href="/privasi" className="transition hover:text-(--color-accent)">Kebijakan Privasi</Link>
            <Link href="/syarat" className="transition hover:text-(--color-accent)">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}