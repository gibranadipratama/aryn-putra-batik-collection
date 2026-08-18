"use client";

import { useState, useTransition, useEffect } from "react";
import { useSession } from "next-auth/react";
import { User, Phone, MapPin, Save, AlertCircle, Edit2 } from "lucide-react";
import toast from "react-hot-toast";
import { updateProfile } from "@/actions/profile";

export default function AccountPage() {
  const { data: session, update } = useSession();
  const [isPending, startTransition] = useTransition();

  // State untuk mengontrol apakah form sedang dalam mode edit atau hanya dilihat (read-only)
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Efek ini memastikan data otomatis terisi ke dalam form begitu session berhasil dimuat dari server
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        phone: (session.user as any).phone || "",
        address: (session.user as any).address || "",
      });
    }
  }, [session]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = (session?.user as any)?.id;

    if (!userId) {
      toast.error("Sesi Anda tidak valid. Silakan login ulang.");
      return;
    }

    startTransition(async () => {
      const res = await updateProfile(userId, formData);
      if (res.success) {
        toast.success(res.message);
        // Perbarui sesi agar data baru langsung terbaca di seluruh aplikasi
        await update({ 
          name: formData.name,
          phone: formData.phone,
          address: formData.address 
        });
        setIsEditing(false); // Matikan mode edit setelah berhasil disimpan
      } else {
        toast.error(res.message);
      }
    });
  };

  // Fungsi untuk membatalkan edit dan mengembalikan data ke kondisi semula
  const handleCancelEdit = () => {
    setIsEditing(false);
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        phone: (session.user as any).phone || "",
        address: (session.user as any).address || "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-(--color-bg) py-12 px-5 font-sans flex items-center justify-center">
      <div className="w-full max-w-xl rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[8px_8px_0_rgba(139,94,60,0.3)]">
        
        {/* Header */}
        <div className="mb-8 border-b-2 border-(--color-border) pb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-(--color-border) bg-(--color-primary-dark) text-(--color-accent) shadow-[3px_3px_0_rgba(58,40,27,0.4)]">
            <User className="h-7 w-7" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2)">Pengaturan Akun</p>
          <h1 className="mt-1 text-2xl font-black uppercase tracking-wider text-(--color-primary-dark)">Profil Pelanggan</h1>
        </div>

        {/* Info Peringatan Kuota */}
        <div className="mb-6 flex items-start gap-3 rounded-md border-2 border-(--color-accent) bg-(--color-accent)/10 p-4 text-(--color-text-primary)">
          <AlertCircle className="h-5 w-5 shrink-0 text-(--color-accent-2) mt-0.5" />
          <div className="text-xs leading-relaxed">
            <p className="font-bold uppercase tracking-wider">Ketentuan Perubahan Data:</p>
            <p className="text-(--color-text-secondary) mt-0.5">Demi keamanan akun, Anda hanya diberikan batas maksimal <span className="font-bold text-(--color-primary-dark)">2 kali sehari</span> untuk mengubah Nama Lengkap, No HP, dan Alamat.</p>
          </div>
        </div>

        {/* Form Profil */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Input Nama Lengkap */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
              <User className="h-3.5 w-3.5" /> Nama Lengkap
            </label>
            <div className="relative">
              <input 
                required 
                type="text" 
                readOnly={!isEditing}
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className={`w-full rounded-md py-3 pl-4 pr-10 text-xs font-medium outline-none transition-all ${isEditing ? "border-2 border-(--color-border) bg-(--color-bg) text-(--color-text-primary) focus:border-(--color-primary) focus:shadow-[2px_2px_0_rgba(139,94,60,0.2)]" : "border-2 border-transparent bg-(--color-bg)/50 text-(--color-text-secondary) cursor-default"}`} 
                placeholder="Masukkan nama lengkap"
              />
              {/* Ikon Edit di Kanan (Hanya muncul jika belum mode edit) */}
              {!isEditing && (
                <button type="button" onClick={() => setIsEditing(true)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-(--color-text-secondary) hover:text-(--color-primary-dark) transition-colors" title="Edit Data">
                  <Edit2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Input Nomor HP */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
              <Phone className="h-3.5 w-3.5" /> Nomor WhatsApp / Handphone
            </label>
            <div className="relative">
              <input 
                required 
                type="text" 
                readOnly={!isEditing}
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                className={`w-full rounded-md py-3 pl-4 pr-10 text-xs font-medium outline-none transition-all ${isEditing ? "border-2 border-(--color-border) bg-(--color-bg) text-(--color-text-primary) focus:border-(--color-primary) focus:shadow-[2px_2px_0_rgba(139,94,60,0.2)]" : "border-2 border-transparent bg-(--color-bg)/50 text-(--color-text-secondary) cursor-default"}`} 
                placeholder="Contoh: 081234567890"
              />
              {!isEditing && (
                <button type="button" onClick={() => setIsEditing(true)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-(--color-text-secondary) hover:text-(--color-primary-dark) transition-colors" title="Edit Data">
                  <Edit2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Input Alamat */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
              <MapPin className="h-3.5 w-3.5" /> Alamat Pengiriman Lengkap
            </label>
            <div className="relative">
              <textarea 
                required 
                rows={3}
                readOnly={!isEditing}
                value={formData.address} 
                onChange={(e) => setFormData({...formData, address: e.target.value})} 
                className={`w-full resize-none rounded-md py-3 pl-4 pr-10 text-xs font-medium outline-none transition-all ${isEditing ? "border-2 border-(--color-border) bg-(--color-bg) text-(--color-text-primary) focus:border-(--color-primary) focus:shadow-[2px_2px_0_rgba(139,94,60,0.2)]" : "border-2 border-transparent bg-(--color-bg)/50 text-(--color-text-secondary) cursor-default"}`} 
                placeholder="Jalan, Nomor Rumah, Kecamatan, Kota, Kode Pos"
              />
              {!isEditing && (
                <button type="button" onClick={() => setIsEditing(true)} className="absolute right-3 top-4 p-1 text-(--color-text-secondary) hover:text-(--color-primary-dark) transition-colors" title="Edit Data">
                  <Edit2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Tombol Simpan & Batal (Hanya muncul saat mode edit diaktifkan) */}
          {isEditing && (
            <div className="mt-6 flex gap-3">
              <button 
                type="button" 
                disabled={isPending}
                onClick={handleCancelEdit}
                className="w-1/3 rounded-md border-2 border-(--color-border) bg-(--color-bg) py-3.5 text-xs font-bold uppercase tracking-widest text-(--color-text-secondary) transition-all hover:bg-(--color-border)/20 disabled:opacity-50"
              >
                Batal
              </button>
              <button 
                type="submit" 
                disabled={isPending}
                className="group flex flex-1 items-center justify-center gap-2 rounded-md border-2 border-(--color-primary-dark) bg-(--color-primary-dark) py-3.5 text-xs font-bold uppercase tracking-widest text-(--color-surface) shadow-[3px_3px_0_rgba(99,50,26,0.4)] transition-all hover:-translate-y-0.5 hover:bg-(--color-primary) disabled:opacity-50"
              >
                {isPending ? "Menyimpan..." : "Simpan Perubahan"} 
                <Save className="h-4 w-4" />
              </button>
            </div>
          )}
        </form>

      </div>
    </div>
  );
}