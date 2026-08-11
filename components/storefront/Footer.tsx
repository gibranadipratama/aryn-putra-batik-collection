import Link from 'next/link';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#172554] text-[#FFFFF0] pt-16 pb-8 border-t-[4px] border-[#D4AF37]">
      <div className="w-full px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          
          {/* Kolom 1: Brand Info */}
          <div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-6 text-[#D4AF37]">Aryn Putra</h3>
            <p className="text-[#FFFFF0]/80 text-sm md:text-base leading-relaxed mb-6">
              Menghadirkan mahakarya batik Nusantara dengan kualitas premium. Memadukan tradisi klasik dengan gaya modern yang abadi untuk menemani setiap momen berharga Anda.
            </p>
          </div>

          {/* Kolom 2: Layanan Pelanggan */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-widest mb-6">Layanan Pelanggan</h4>
            <ul className="space-y-4 text-sm md:text-[15px] text-[#FFFFF0]/80">
              <li><Link href="/bantuan" className="hover:text-[#D4AF37] transition">Pusat Bantuan (FAQ)</Link></li>
              <li><Link href="/pengiriman" className="hover:text-[#D4AF37] transition">Informasi Pengiriman</Link></li>
              <li><Link href="/retur" className="hover:text-[#D4AF37] transition">Kebijakan Retur & Penukaran</Link></li>
              <li><Link href="/panduan-ukuran" className="hover:text-[#D4AF37] transition">Panduan Ukuran</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Kategori / Koleksi (Diperbarui tanpa dropdown) */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-widest mb-6">Kategori Produk</h4>
            <ul className="space-y-4 text-sm md:text-[15px] text-[#FFFFF0]/80">
              <li><Link href="/kategori/pria" className="hover:text-[#D4AF37] transition">Koleksi Pria</Link></li>
              <li><Link href="/kategori/wanita" className="hover:text-[#D4AF37] transition">Koleksi Wanita</Link></li>
              <li><Link href="/kategori/seragam" className="hover:text-[#D4AF37] transition">Pemesanan Seragam</Link></li>
              
              {/* Bagian Lain-lain dibuat menjadi Sub-List yang rapi */}
              <li className="pt-2">
                <span className="block mb-3 font-semibold text-[#FFFFF0]">Koleksi Lainnya:</span>
                <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#D4AF37]/50">
                  <Link href="/kategori/kain" className="hover:text-[#D4AF37] transition">Kain Batik 2 Meter</Link>
                  <Link href="/kategori/cargo" className="hover:text-[#D4AF37] transition">Celana Cargo</Link>
                  <Link href="/kategori/sprei" className="hover:text-[#D4AF37] transition">Sprei Premium</Link>
                </div>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-widest mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm md:text-[15px] text-[#FFFFF0]/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="leading-relaxed">Pekalongan, Jawa Tengah</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>WA: 081542622909</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>bgssanap9@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Jam Operasional: 09:00 - 17:00</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom: Copyright & Legal */}
        <div className="pt-8 border-t border-[#FFFFF0]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-[#FFFFF0]/50">
          <p>&copy; {new Date().getFullYear()} Aryn Putra Batik Collection. Hak Cipta Dilindungi.</p>
          <div className="flex gap-4">
            <Link href="/privasi" className="hover:text-[#FFFFF0] transition">Kebijakan Privasi</Link>
            <Link href="/syarat" className="hover:text-[#FFFFF0] transition">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}