"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { User, Phone, MapPin, Save, AlertCircle, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { updateProfile } from "@/actions/profile";

export default function AccountPage() {
  const { data: session, update } = useSession();
  const [isPending, startTransition] = useTransition();

  // State form menggunakan data dari sesi yang sedang login
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    phone: (session?.user as any)?.phone || "",
    address: (session?.user as any)?.address || "",
  });

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
        // Perbarui sesi NextAuth agar data langsung sinkron
        await update({ name: formData.name });
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F0E7] py-12 px-5">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl backdrop-blur-xl">
        
        {/* Header */}
        <div className="mb-8 border-b border-[#0B1F33]/10 pb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B1F33] text-[#A88A3D] shadow-lg">
            <User className="h-8 w-8" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A88A3D]">Pengaturan Akun</p>
          <h1 className="mt-1 text-2xl font-black uppercase tracking-wider text-[#0B1F33]">Profil Pelanggan</h1>
        </div>

        {/* Info Peringatan Kuota */}
        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-[#A88A3D]/10 p-4 text-[#0B1F33]">
          <AlertCircle className="h-5 w-5 shrink-0 text-[#A88A3D] mt-0.5" />
          <div className="text-xs leading-relaxed">
            <p className="font-bold uppercase tracking-wider">Ketentuan Perubahan Data:</p>
            <p className="opacity-80 mt-0.5">Demi keamanan akun, Anda hanya diberikan batas maksimal <span className="font-black text-[#0B1F33]">2 kali sehari</span> untuk mengubah Nama Lengkap, No HP, dan Alamat.</p>
          </div>
        </div>

        {/* Form Profil */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0B1F33]/70">
              <User className="h-3.5 w-3.5" /> Nama Lengkap
            </label>
            <input 
              required 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              className="w-full rounded-xl border-2 border-transparent bg-[#0B1F33]/5 py-3.5 px-4 text-sm text-[#0B1F33] outline-none transition-all focus:border-[#A88A3D]/50 focus:bg-white focus:ring-4 focus:ring-[#A88A3D]/10" 
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0B1F33]/70">
              <Phone className="h-3.5 w-3.5" /> Nomor WhatsApp / Handphone
            </label>
            <input 
              required 
              type="text" 
              value={formData.phone} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              className="w-full rounded-xl border-2 border-transparent bg-[#0B1F33]/5 py-3.5 px-4 text-sm text-[#0B1F33] outline-none transition-all focus:border-[#A88A3D]/50 focus:bg-white focus:ring-4 focus:ring-[#A88A3D]/10" 
              placeholder="Contoh: 081234567890"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0B1F33]/70">
              <MapPin className="h-3.5 w-3.5" /> Alamat Pengiriman Lengkap
            </label>
            <textarea 
              required 
              rows={3}
              value={formData.address} 
              onChange={(e) => setFormData({...formData, address: e.target.value})} 
              className="w-full rounded-xl border-2 border-transparent bg-[#0B1F33]/5 py-3.5 px-4 text-sm text-[#0B1F33] outline-none transition-all focus:border-[#A88A3D]/50 focus:bg-white focus:ring-4 focus:ring-[#A88A3D]/10 resize-none" 
              placeholder="Jalan, Nomor Rumah, Kecamatan, Kota, Kode Pos"
            />
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F33] py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#E8E0D3] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#A88A3D] hover:text-[#0B1F33] disabled:opacity-50"
          >
            {isPending ? "Menyimpan Perubahan..." : "Simpan Perubahan Data"} 
            <Save className="h-4 w-4" />
          </button>
        </form>

      </div>
    </div>
  );
}