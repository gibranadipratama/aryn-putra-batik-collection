import Link from "next/link";
import { HelpCircle, MessageCircle, FileText, ArrowRight } from "lucide-react";

export default function HelpPage() {
  const faqs = [
    { q: "Bagaimana cara melakukan pemesanan?", a: "Pilih produk batik yang Anda inginkan, pilih ukuran, lalu klik tombol Beli atau Keranjang. Lanjutkan ke halaman checkout untuk mengisi alamat dan melakukan pembayaran." },
    { q: "Metode pembayaran apa saja yang tersedia?", a: "Kami mendukuung berbagai metode pembayaran digital melalui gateway pembayaran aman seperti transfer bank, e-wallet, dan QRIS." },
    { q: "Berapa lama waktu pengiriman pesanan?", a: "Pengiriman biasanya memakan waktu 2-4 hari kerja untuk wilayah Jawa dan 3-7 hari kerja untuk luar pulau, tergantung jasa ekspedisi yang dipilih." },
    { q: "Apakah produk bisa ditukar jika ukuran tidak pas?", a: "Ya, kami menyediakan layanan penukaran ukuran maksimal 3 hari setelah barang diterima, dengan syarat label produk masih utuh." }
  ];

  return (
    <div className="min-h-screen bg-(--color-bg) py-12 px-5 md:px-8 font-sans">
      <div className="mx-auto max-w-4xl">
        
        <div className="mb-10 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[6px_6px_0_rgba(139,94,60,0.25)] text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-(--color-border) bg-(--color-primary-dark) text-(--color-accent) shadow-[3px_3px_0_rgba(58,40,27,0.4)]">
            <HelpCircle className="h-7 w-7" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2) mb-1">Dukungan Pelanggan</p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark)">Pusat Bantuan</h1>
          <p className="mt-2 text-xs text-(--color-text-secondary)">Temukan jawaban atas pertanyaan umum seputar layanan dan produk Aryn Putra Batik.</p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-12">
          <h2 className="text-sm font-black uppercase tracking-widest text-(--color-primary-dark) mb-4">Pertanyaan Yang Sering Diajukan (FAQ)</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
              <h3 className="text-xs font-bold uppercase tracking-wide text-(--color-primary-dark) mb-2">{faq.q}</h3>
              <p className="text-xs text-(--color-text-secondary) leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Kontak Bantuan Lain */}
        <div className="rounded-xl border-2 border-(--color-border) bg-(--color-primary-dark) p-8 text-(--color-surface) shadow-[6px_6px_0_rgba(139,94,60,0.3)] text-center">
          <h3 className="text-sm font-black uppercase tracking-widest text-(--color-accent) mb-2">Masih Butuh Bantuan?</h3>
          <p className="text-xs opacity-80 mb-6 max-w-md mx-auto">Tim customer service kami siap membantu Anda pada hari Senin - Sabtu pukul 09:00 - 17:00 WIB.</p>
          <a 
            href="https://wa.me/6281542622909" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border-2 border-(--color-accent) bg-(--color-accent) px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-(--color-text-primary) shadow-[3px_3px_0_rgba(58,40,27,0.4)] transition hover:bg-(--color-surface)"
          >
            <MessageCircle className="h-4 w-4" /> Hubungi via WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}