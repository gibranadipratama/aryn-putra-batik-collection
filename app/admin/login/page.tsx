"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ShieldCheck, Lock, Mail, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Email atau Password Admin salah!");
      } else {
        // Pengecekan tambahan keamanan bisa ditaruh di sini atau via middleware
        toast.success("Login Admin Berhasil!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B1F33] p-5 text-[#E8E0D3]">
      <div className="w-full max-w-md rounded-3xl border border-[#A88A3D]/30 bg-[#112942] p-8 shadow-2xl">
        
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A88A3D] text-[#0B1F33]">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A88A3D]">Panel Restriksi</p>
          <h1 className="mt-1 text-2xl font-black uppercase tracking-wider text-white">Login Admin</h1>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#E8E0D3]/60">Email Admin</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#E8E0D3]/40" />
              <input 
                required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} 
                className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none focus:border-[#A88A3D]" 
                placeholder="admin@arynputra.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#E8E0D3]/60">Password Admin</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#E8E0D3]/40" />
              <input 
                required type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} 
                className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none focus:border-[#A88A3D]" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#A88A3D] py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1F33] transition hover:bg-white disabled:opacity-50"
          >
            {isLoading ? "Memverifikasi..." : "Masuk Dashboard"} <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[10px] uppercase tracking-widest text-[#E8E0D3]/50 hover:text-white transition">
            &larr; Kembali ke Beranda Toko
          </Link>
        </div>

      </div>
    </div>
  );
}