"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { registerUser } from "@/actions/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    startTransition(async () => {
      const res = await registerUser(formData);
      if (res.success) {
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F4F0E7] p-5">
      {/* Background Glow */}
      <div className="absolute -left-20 top-0 h-72 w-72 animate-pulse rounded-full bg-[#A88A3D]/20 blur-3xl"></div>
      <div className="absolute -right-20 bottom-10 h-80 w-80 animate-pulse rounded-full bg-[#0B1F33]/10 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md transform rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl backdrop-blur-xl">
        
        {/* HEADER TANPA ICON - DIGANTI TEKS SAPAAN */}
        <div className="mb-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A88A3D] mb-2">
            Aryn Putra Batik Collection
          </p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-[#0B1F33]">
            Buat Akun
          </h1>
          <p className="mt-1 text-xs text-[#0B1F33]/60">
            Daftarkan diri Anda untuk mulai berbelanja koleksi batik terbaik.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#0B1F33]/40">
              <User className="h-4 w-4" />
            </div>
            <input 
              required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
              className="w-full rounded-xl border-2 border-transparent bg-[#0B1F33]/5 py-3.5 pl-11 pr-4 text-sm text-[#0B1F33] outline-none transition-all focus:border-[#A88A3D]/50 focus:bg-white focus:ring-4 focus:ring-[#A88A3D]/10" 
              placeholder="Nama Lengkap"
            />
          </div>

          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#0B1F33]/40">
              <Mail className="h-4 w-4" />
            </div>
            <input 
              required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} 
              className="w-full rounded-xl border-2 border-transparent bg-[#0B1F33]/5 py-3.5 pl-11 pr-4 text-sm text-[#0B1F33] outline-none transition-all focus:border-[#A88A3D]/50 focus:bg-white focus:ring-4 focus:ring-[#A88A3D]/10" 
              placeholder="Alamat Email"
            />
          </div>

          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#0B1F33]/40">
              <Lock className="h-4 w-4" />
            </div>
            <input 
              required type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} 
              className="w-full rounded-xl border-2 border-transparent bg-[#0B1F33]/5 py-3.5 pl-11 pr-4 text-sm text-[#0B1F33] outline-none transition-all focus:border-[#A88A3D]/50 focus:bg-white focus:ring-4 focus:ring-[#A88A3D]/10" 
              placeholder="Kata Sandi"
            />
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F33] py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#E8E0D3] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#A88A3D] hover:text-[#0B1F33] disabled:opacity-50"
          >
            {isPending ? "Mendaftarkan..." : "Daftar Sekarang"} 
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-8 text-center space-y-3 border-t border-[#0B1F33]/10 pt-6">
          <p className="text-xs font-bold text-[#0B1F33]/60">
            Sudah memiliki akun?{" "}
            <Link href="/login" className="text-[#0B1F33] hover:text-[#A88A3D] underline underline-offset-4">
              Masuk di sini
            </Link>
          </p>
          
          {/* NAVIGASI KEMBALI KE BERANDA */}
          <div className="pt-3 mt-3 border-t border-[#0B1F33]/5">
            <Link href="/" className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#0B1F33]/50 hover:text-[#A88A3D] transition-colors">
              &larr; Kembali ke Beranda
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}