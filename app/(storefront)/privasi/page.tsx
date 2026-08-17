import Link from "next/link";
import { Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-(--color-bg) py-12 px-5 md:px-8 font-sans">
      <div className="mx-auto max-w-4xl">
        
        <div className="mb-10 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[6px_6px_0_rgba(139,94,60,0.25)] text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-(--color-border) bg-(--color-primary-dark) text-(--color-accent) shadow-[3px_3px_0_rgba(58,40,27,0.4)]">
            <Lock className="h-7 w-7" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2) mb-1">Keamanan Data</p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark)">Kebijakan Privasi</h1>
          <p className="mt-2 text-xs text-(--color-text-secondary)">Komitmen kami dalam melindungi kerahasiaan dan data pribadi Anda.</p>
        </div>

        <div className="space-y-6 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[6px_6px_0_rgba(139,94,60,0.2)] text-xs leading-relaxed text-(--color-text-secondary)">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-(--color-primary-dark) mb-2">1. Pengumpulan Informasi</h2>
            <p>Kami mengumpulkan informasi pribadi saat Anda mendaftar akun, melakukan transaksi checkout, atau memperbarui profil. Informasi tersebut meliputi nama lengkap, alamat email, nomor telepon, dan alamat pengiriman.</p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-(--color-primary-dark) mb-2">2. Penggunaan Informasi</h2>
            <p>Data yang Anda berikan digunakan sepenuhnya untuk memproses pesanan, mengelola pengiriman, memverifikasi transaksi pembayaran, serta meningkatkan kualitas layanan dan komunikasi pelanggan.</p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-(--color-primary-dark) mb-2">3. Perlindungan & Keamanan Data</h2>
            <p>Kami menerapkan standar keamanan enkripsi password (hashing) dan sistem manajemen basis data yang ketat guna mencegah akses tidak sah, perubahan, atau penyalahgunaan data pribadi Anda.</p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-(--color-primary-dark) mb-2">4. Perubahan Kebijakan</h2>
            <p>Aryn Putra Batik berhak untuk memperbarui halaman Kebijakan Privasi ini sewaktu-waktu demi menyesuaikan dengan perkembangan sistem operasional maupun regulasi hukum yang berlaku.</p>
          </section>
        </div>

      </div>
    </div>
  );
}