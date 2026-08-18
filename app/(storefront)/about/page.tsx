import Image from "next/image";
import { Award, HeartHandshake, Sparkles, ShieldCheck, Target, Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-(--color-bg) px-5 py-16 font-sans md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* 1. HEADER HALAMAN */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border-2 border-(--color-border) bg-(--color-surface) px-5 py-2 text-xs font-bold uppercase tracking-widest text-(--color-accent-2) shadow-[3px_3px_0_rgba(139,94,60,0.2)]">
            Tentang Kami
          </span>
          <h1 className="text-4xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-5xl lg:text-6xl">
            Aryn Putra Batik
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-(--color-text-secondary) md:text-base">
            Melestarikan warisan budaya nusantara melalui busana batik berkualitas tinggi dari pusat industri batik Pekalongan.
          </p>
        </div>

        {/* 2. PROFIL / CERITA SINGKAT */}
        <div className="mb-16 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[8px_8px_0_rgba(139,94,60,0.3)] md:p-12">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            {/* Gambar Hero Profil */}
            <div className="group relative aspect-4/3 w-full overflow-hidden rounded-xl border-2 border-(--color-border) bg-(--color-bg) shadow-[6px_6px_0_rgba(139,94,60,0.2)] md:aspect-square">
              <Image
                src="/logo-batik.jpg"
                alt="Produksi Batik Aryn Putra"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:sepia-[.15]"
              />
            </div>
            
            {/* Teks Cerita */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-3xl">
                Warisan Budaya Dalam Sehelai Kain
              </h2>
              <div className="space-y-4 text-sm leading-loose text-(--color-text-secondary) md:text-base">
                <p>
                  Berdiri di pusat industri batik Pekalongan, <strong className="text-(--color-primary-dark)">Aryn Putra Batik</strong> hadir untuk menyediakan berbagai koleksi pakaian pria, wanita, hingga sarimbit couple. Kami fokus pada desain rapi, bahan katun halus, dan kenyamanan untuk dikenakan sehari-hari maupun acara formal.
                </p>
                <p>
                  Bermula dari usaha rumahan kecil, kami tumbuh bersama para pengrajin lokal yang mewarisi teknik membatik turun-temurun. Nama &quot;Aryn Putra&quot; dipilih sebagai simbol harapan agar generasi muda terus mengenakan dan mencintai batik sebagai identitas sehari-hari.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. VISI & MISI (Dibuat Kontras dengan Warna Gelap/Terang) */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Visi - Kartu Gelap */}
          <div className="group flex flex-col rounded-xl border-2 border-(--color-border) bg-(--color-primary-dark) p-8 text-(--color-surface) shadow-[6px_6px_0_rgba(139,94,60,0.3)] transition-transform hover:-translate-y-1 md:p-10">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl border-2 border-(--color-border) bg-(--color-accent) text-(--color-primary-dark) shadow-[3px_3px_0_rgba(58,40,27,0.4)]">
              <Eye className="h-7 w-7" />
            </div>
            <h2 className="mb-4 text-xl font-black uppercase tracking-widest text-(--color-accent)">Visi Kami</h2>
            <p className="text-sm leading-relaxed opacity-90 md:text-base">
              Menjadi merek batik pilihan keluarga Indonesia yang menjembatani nilai budaya tradisional dengan gaya hidup modern, dikenal karena konsistensi kualitas dan kejujuran dalam berkarya.
            </p>
          </div>

          {/* Misi - Kartu Terang */}
          <div className="group flex flex-col rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[6px_6px_0_rgba(139,94,60,0.2)] transition-transform hover:-translate-y-1 md:p-10">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl border-2 border-(--color-border) bg-(--color-primary-dark) text-(--color-accent) shadow-[3px_3px_0_rgba(139,94,60,0.3)]">
              <Target className="h-7 w-7" />
            </div>
            <h2 className="mb-4 text-xl font-black uppercase tracking-widest text-(--color-primary-dark)">Misi Kami</h2>
            <ul className="list-inside list-disc space-y-3 text-sm leading-relaxed text-(--color-text-secondary) md:text-base">
              <li>Menghadirkan batik berkualitas dengan harga wajar.</li>
              <li>Memberdayakan pengrajin batik lokal Pekalongan.</li>
              <li>Melestarikan motif nusantara lewat desain relevan.</li>
              <li>Memberikan pengalaman belanja yang aman dan nyaman.</li>
            </ul>
          </div>
        </div>

        {/* 4. NILAI / KEUNGGULAN KAMI */}
        <div>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-3xl">
              Nilai yang Kami Pegang
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Poin 1 */}
            <div className="group flex flex-col rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[4px_4px_0_rgba(139,94,60,0.15)] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(139,94,60,0.25)]">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-(--color-border) bg-(--color-primary-dark) text-(--color-accent) shadow-[3px_3px_0_rgba(58,40,27,0.4)] transition-transform group-hover:scale-110">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-(--color-primary-dark)">Kualitas Terjamin</h3>
              <p className="text-sm leading-relaxed text-(--color-text-secondary)">
                Material katun pilihan, jahitan rapi berstandar butik, dan pewarnaan yang awet.
              </p>
            </div>

            {/* Poin 2 */}
            <div className="group flex flex-col rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[4px_4px_0_rgba(139,94,60,0.15)] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(139,94,60,0.25)]">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-(--color-border) bg-(--color-primary-dark) text-(--color-accent) shadow-[3px_3px_0_rgba(58,40,27,0.4)] transition-transform group-hover:scale-110">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-(--color-primary-dark)">Desain Eksklusif</h3>
              <p className="text-sm leading-relaxed text-(--color-text-secondary)">
                Memadukan motif klasik dengan potongan modern untuk berbagai kebutuhan pakaian Anda.
              </p>
            </div>

            {/* Poin 3 */}
            <div className="group flex flex-col rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[4px_4px_0_rgba(139,94,60,0.15)] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(139,94,60,0.25)]">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-(--color-border) bg-(--color-primary-dark) text-(--color-accent) shadow-[3px_3px_0_rgba(58,40,27,0.4)] transition-transform group-hover:scale-110">
                <HeartHandshake className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-(--color-primary-dark)">Layanan Prima</h3>
              <p className="text-sm leading-relaxed text-(--color-text-secondary)">
                Transaksi aman, pengiriman cepat, dan layanan bantuan pelanggan yang sangat responsif.
              </p>
            </div>

            {/* Poin 4 */}
            <div className="group flex flex-col rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[4px_4px_0_rgba(139,94,60,0.15)] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(139,94,60,0.25)]">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-(--color-border) bg-(--color-primary-dark) text-(--color-accent) shadow-[3px_3px_0_rgba(58,40,27,0.4)] transition-transform group-hover:scale-110">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-(--color-primary-dark)">Batik Asli</h3>
              <p className="text-sm leading-relaxed text-(--color-text-secondary)">
                Diproduksi langsung oleh pengrajin lokal Pekalongan secara turun-temurun dan berkelanjutan.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}