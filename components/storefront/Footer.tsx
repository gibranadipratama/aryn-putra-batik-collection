import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="bg-[#102A43] text-[#F7F2E7]">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-12 border-b border-[#F7F2E7]/10 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <Link href="/" className="flex flex-col leading-none">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A227]">Batik Collection</span>
              <span className="mt-2 text-3xl font-black uppercase tracking-[-0.07em] md:text-4xl">ARYN PUTRA</span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#F7F2E7]/55">
              Koleksi batik pria, wanita, couple, dan kebutuhan lainnya dengan pilihan motif dan model untuk berbagai kesempatan.
            </p>
          </div>
          <div className="md:col-span-2">
            <h3 className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#C9A227]">Belanja</h3>
            <div className="flex flex-col gap-3 text-sm text-[#F7F2E7]/55">
              <Link href="/produk" className="transition hover:text-[#F7F2E7]">Semua Produk</Link>
              <Link href="/kategori/pria" className="transition hover:text-[#F7F2E7]">Pria</Link>
              <Link href="/kategori/wanita" className="transition hover:text-[#F7F2E7]">Wanita</Link>
              <Link href="/kategori/couple" className="transition hover:text-[#F7F2E7]">Couple</Link>
              <Link href="/kategori/lain-lain" className="transition hover:text-[#F7F2E7]">Lain-lain</Link>
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#C9A227]">Bantuan</h3>
            <div className="flex flex-col gap-3 text-sm text-[#F7F2E7]/55">
              <Link href="/bantuan" className="transition hover:text-[#F7F2E7]">Pusat Bantuan</Link>
              <Link href="/pengiriman" className="transition hover:text-[#F7F2E7]">Informasi Pengiriman</Link>
              <Link href="/retur" className="transition hover:text-[#F7F2E7]">Retur & Penukaran</Link>
              <Link href="/panduan-ukuran" className="transition hover:text-[#F7F2E7]">Panduan Ukuran</Link>
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#C9A227]">Hubungi Kami</h3>
            <div className="space-y-4 text-sm text-[#F7F2E7]/55">
              <div className="flex gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-[#C9A227]" />
                <span>Pekalongan, Jawa Tengah</span>
              </div>
              <div className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#C9A227]" />
                <span>0815 4262 2909</span>
              </div>
              <div className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#C9A227]" />
                <span>bgssanap9@gmail.com</span>
              </div>
              <p className="pt-1 text-xs text-[#F7F2E7]/35">Senin - Sabtu · 09:00 - 17:00</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 py-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[#F7F2E7]/30 md:flex-row">
          <p>© {new Date().getFullYear()} ARYN PUTRA BATIK COLLECTION. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <Link href="/privasi" className="transition hover:text-[#F7F2E7]">Kebijakan Privasi</Link>
            <Link href="/syarat" className="transition hover:text-[#F7F2E7]">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}