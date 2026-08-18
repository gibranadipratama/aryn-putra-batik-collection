"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Nomor WhatsApp Admin (Gunakan format awalan 62)
    const adminPhoneNumber = "6281542622909";

    // 2. Susun format teks mentah
    const rawText = `*Halo Admin Aryn Putra Batik,* Saya ingin bertanya:

*Nama:* ${formData.name}
*Email:* ${formData.email}
*Subjek:* ${formData.subject}

*Pesan:*
${formData.message}`;

    // 3. Encode teks agar aman dan rapi saat dimasukkan ke URL (mengganti spasi/enter otomatis)
    const encodedText = encodeURIComponent(rawText);

    // 4. Buat tautan URL WhatsApp API
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodedText}`;

    // 5. Beri notifikasi dan buka tab WhatsApp baru
    toast.success("Mengarahkan ke WhatsApp...");
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-(--color-bg) py-12 px-5 md:px-8 font-sans">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="mb-10 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 text-center shadow-[6px_6px_0_rgba(139,94,60,0.25)]">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2)">
            Layanan Pelanggan
          </p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-4xl">
            Hubungi Kami
          </h1>
          <p className="mt-2 text-xs text-(--color-text-secondary)">
            Punya pertanyaan seputar produk batik kami? Kirim pesan langsung via
            WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* INFO KONTAK */}
          <div className="flex flex-col gap-6 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
            <h3 className="text-sm font-black uppercase tracking-wider text-(--color-primary-dark)">
              Informasi Toko
            </h3>

            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-(--color-border) bg-(--color-bg) text-(--color-primary-dark)">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                  Lokasi Toko
                </h3>
                <p className="mt-1 text-xs font-bold leading-relaxed text-(--color-primary-dark)">
                  Pekalongan, Jawa Tengah, Indonesia
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-(--color-border) bg-(--color-bg) text-(--color-primary-dark)">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                  WhatsApp
                </h3>
                <p className="mt-1 text-xs font-bold text-(--color-primary-dark)">
                  0815 4262 2909
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-(--color-border) bg-(--color-bg) text-(--color-primary-dark)">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                  Email
                </h3>
                <p className="mt-1 text-xs font-bold text-(--color-primary-dark)">
                  bgssanap9@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* FORM KONTAK WHATSAPP */}
          <div className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[6px_6px_0_rgba(139,94,60,0.2)] lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-text-secondary)" />
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Nama Anda"
                      className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) py-3 pl-10 pr-4 text-xs font-medium text-(--color-text-primary) outline-none transition focus:border-(--color-primary)"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                    Email Aktif
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-text-secondary)" />
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="nama@email.com"
                      className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) py-3 pl-10 pr-4 text-xs font-medium text-(--color-text-primary) outline-none transition focus:border-(--color-primary)"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                  Subjek Pesan
                </label>
                <input
                  required
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Contoh: Tanya ketersediaan stok baju"
                  className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) px-4 py-3 text-xs font-medium text-(--color-text-primary) outline-none transition focus:border-(--color-primary)"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                  Pesan Anda
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                  className="w-full resize-none rounded-md border-2 border-(--color-border) bg-(--color-bg) px-4 py-3 text-xs font-medium text-(--color-text-primary) outline-none transition focus:border-(--color-primary)"
                />
              </div>

              {/* Tombol dengan warna brand WhatsApp namun shadow khas retro */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-[#166534] bg-[#15803d] py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-[4px_4px_0_rgba(20,83,45,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[#166534]"
              >
                <MessageCircle className="h-4 w-4" />
                Kirim Pesan via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
