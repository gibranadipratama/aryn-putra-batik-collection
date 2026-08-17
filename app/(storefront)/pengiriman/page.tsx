import Link from "next/link";
import { Truck, ShieldCheck, Clock, MapPin } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-(--color-bg) py-12 px-5 md:px-8 font-sans">
      <div className="mx-auto max-w-4xl">
        
        <div className="mb-10 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[6px_6px_0_rgba(139,94,60,0.25)] text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-(--color-border) bg-(--color-primary-dark) text-(--color-accent) shadow-[3px_3px_0_rgba(58,40,27,0.4)]">
            <Truck className="h-7 w-7" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2) mb-1">Logistik & Kurir</p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark)">Informasi Pengiriman</h1>
          <p className="mt-2 text-xs text-(--color-text-secondary)">Ketentuan dan estimasi pengiriman pesanan batik ke seluruh wilayah Indonesia.</p>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
            <h2 className="text-xs font-black uppercase tracking-widest text-(--color-primary-dark) mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-(--color-accent-2)" /> Asal Pengiriman
            </h2>
            <p className="text-xs text-(--color-text-secondary) leading-relaxed">
              Seluruh produk dikirim langsung dari pusat produksi dan gudang utama kami di <span className="font-bold text-(--color-primary-dark)">Pekalongan, Jawa Tengah</span>.
            </p>
          </div>

          <div className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
            <h2 className="text-xs font-black uppercase tracking-widest text-(--color-primary-dark) mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-(--color-accent-2)" /> Estimasi Waktu Pengiriman
            </h2>
            <ul className="space-y-2 text-xs text-(--color-text-secondary) list-disc list-inside leading-relaxed">
              <li><strong className="text-(--color-primary-dark)">Wilayah Jawa:</strong> 2 - 4 hari kerja setelah pembayaran terkonfirmasi.</li>
              <li><strong className="text-(--color-primary-dark)">Luar Pulau Jawa:</strong> 3 - 7 hari kerja tergantung jalur penerbangan/laut ekspedisi.</li>
              <li><strong className="text-(--color-primary-dark)">Proses Pengemasan:</strong> 1 hari kerja (pesanan di atas jam 15:00 WIB berpotensi dikirim keesokan harinya).</li>
            </ul>
          </div>

          <div className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
            <h2 className="text-xs font-black uppercase tracking-widest text-(--color-primary-dark) mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-(--color-accent-2)" /> Mitra Ekspedisi & Asuransi
            </h2>
            <p className="text-xs text-(--color-text-secondary) leading-relaxed">
              Kami bekerja sama dengan berbagai jasa ekspedisi terpercaya di Indonesia. Setiap pengiriman dilengkapi dengan opsi nomor resi (tracking number) yang dapat dicek langsung pada halaman riwayat pesanan akun Anda.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}