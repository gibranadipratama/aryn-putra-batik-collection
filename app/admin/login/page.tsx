"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-(--color-primary-dark) p-5 font-sans text-(--color-surface)">
      
      {/* Pola Latar Belakang Klasik Restriksi Admin */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-size-[20px_20px] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md rounded-xl border-2 border-(--color-border) bg-(--color-primary-dark) p-8 shadow-[8px_8px_0_rgba(201,168,118,0.2)]">
        
        {/* HEADER ADMIN */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-(--color-border) bg-(--color-accent) text-(--color-text-primary) shadow-[3px_3px_0_rgba(58,40,27,0.4)]">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent)">Panel Restriksi</p>
          <h1 className="mt-1 text-2xl font-black uppercase tracking-wider text-(--color-surface)">Login Admin</h1>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-(--color-surface)/70">Email Admin</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-surface)/50" />
              <input 
                required 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                className="w-full rounded-md border-2 border-(--color-border) bg-(--color-surface)/10 py-3 pl-10 pr-4 text-xs font-medium text-(--color-surface) outline-none transition-all focus:border-(--color-accent) focus:bg-(--color-surface)/20" 
                placeholder="admin@arynputra.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-(--color-surface)/70">Password Admin</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-surface)/50" />
              <input 
                required 
                type={showPassword ? "text" : "password"} 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                className="w-full rounded-md border-2 border-(--color-border) bg-(--color-surface)/10 py-3 pl-10 pr-10 text-xs font-medium text-(--color-surface) outline-none transition-all focus:border-(--color-accent) focus:bg-(--color-surface)/20" 
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-(--color-surface)/50 transition-colors hover:text-(--color-accent)"
                aria-label="Tampilkan atau sembunyikan kata sandi"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border-2 border-(--color-accent) bg-(--color-accent) py-3.5 text-xs font-bold uppercase tracking-widest text-(--color-text-primary) shadow-[3px_3px_0_rgba(201,168,118,0.4)] transition-all hover:-translate-y-0.5 hover:bg-(--color-surface) disabled:opacity-50"
          >
            {isLoading ? "Memverifikasi..." : "Masuk Dashboard"} <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-8 border-t border-(--color-border)/50 pt-6 text-center">
          <Link href="/" className="inline-block text-[10px] font-bold uppercase tracking-widest text-(--color-surface)/60 transition-colors hover:text-(--color-accent)">
            &larr; Kembali ke Beranda Toko
          </Link>
        </div>

      </div>
    </div>
  );
}