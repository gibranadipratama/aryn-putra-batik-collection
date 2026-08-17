import Link from "next/link";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-(--color-bg) py-12 px-5 md:px-8 font-sans">
      <div className="mx-auto max-w-4xl">
        
        <div className="mb-10 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[6px_6px_0_rgba(139,94,60,0.25)] text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-(--color-border) bg-(--color-primary-dark) text-(--color-accent) shadow-[3px_3px_0_rgba(58,40,27,0.4)]">
            <FileText className="h-7 w-7" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2) mb-1">Ketentuan Layanan</p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark)">Syarat & Ketentuan</h1>
          <p className="mt-2 text-xs text-(--color-text-secondary)">Ketentuan hukum dan aturan penggunaan situs web Aryn Putra Batik.</p>
        </div>

        <div className="space-y-6 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[6px_6px_0_rgba(139,94,60,0.2)] text-xs leading-relaxed text-(--color-text-secondary)">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-(--color-primary-dark) mb-2">1. Ketentuan Umum</h2>
            <p>Dengan mengakses dan menggunakan situs web Aryn Putra Batik, Anda menyatakan setuju untuk mematuhi segala syarat dan ketentuan yang tercantum di halaman ini.</p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-(--color-primary-dark) mb-2">2. Akun Pengguna</h2>
            <p>Pengguna bertanggung jawab penuh atas kerahasiaan informasi akun serta kata sandi pribadi. Segala aktivitas transaksi yang terjadi di bawah akun Anda adalah tanggung jawab Anda sepenuhnya.</p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-(--color-primary-dark) mb-2">3. Produk & Ketersediaan Stok</h2>
            <p>Kami berupaya menampilkan informasi foto produk dan rincian ukuran seakurat mungkin. Namun, perbedaan warna dapat terjadi akibat resolusi layar perangkat yang Anda gunakan.</p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-(--color-primary-dark) mb-2">4. Pembatalan & Pengembalian</h2>
            <p>Pesanan yang telah dibayar dan diproses tidak dapat dibatalkan secara sepihak. Pengembalian atau penukaran barang hanya dilayani jika terbukti terdapat cacat produksi dengan menyertakan video unboxing.</p>
          </section>
        </div>

      </div>
    </div>
  );
}