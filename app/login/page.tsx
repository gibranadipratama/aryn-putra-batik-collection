"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function UserLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false, 
      });

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Berhasil masuk, Selamat Datang!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-(--color-bg) p-5 font-sans">
      
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-size-[16px_16px] opacity-30 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[8px_8px_0_rgba(139,94,60,0.3)]">
        
        <div className="mb-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2) mb-1.5">
            Aryn Putra Batik Collection
          </p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark)">
            Selamat Datang
          </h1>
          <p className="mt-1 text-xs text-(--color-text-secondary)">
            Masuk untuk melanjutkan belanja koleksi batik terbaik.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-(--color-text-secondary)">
              <Mail className="h-4 w-4" />
            </div>
            <input 
              required 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) py-3 pl-10 pr-4 text-xs font-medium text-(--color-text-primary) outline-none transition-all focus:border-(--color-primary) focus:shadow-[2px_2px_0_rgba(139,94,60,0.2)]" 
              placeholder="Alamat Email"
            />
          </div>

          {/* Input Password dengan Icon Mata */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-(--color-text-secondary)">
              <Lock className="h-4 w-4" />
            </div>
            <input 
              required 
              type={showPassword ? "text" : "password"} 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) py-3 pl-10 pr-10 text-xs font-medium text-(--color-text-primary) outline-none transition-all focus:border-(--color-primary) focus:shadow-[2px_2px_0_rgba(139,94,60,0.2)]" 
              placeholder="Kata Sandi"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-(--color-text-secondary) transition-colors hover:text-(--color-primary-dark)"
              aria-label="Tampilkan atau sembunyikan kata sandi"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-md border-2 border-(--color-primary-dark) bg-(--color-primary-dark) py-3.5 text-xs font-bold uppercase tracking-widest text-(--color-surface) shadow-[3px_3px_0_rgba(99,50,26,0.4)] transition-all hover:-translate-y-0.5 hover:bg-(--color-primary) disabled:opacity-50"
          >
            {isLoading ? "Mengecek..." : "Masuk Sekarang"} 
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-8 space-y-3 border-t-2 border-(--color-border) pt-6 text-center">
          <p className="text-xs font-bold text-(--color-text-secondary)">
            Belum punya akun?{" "}
            <Link href="/register" className="text-(--color-primary-dark) underline underline-offset-4 hover:text-(--color-primary)">
              Daftar di sini
            </Link>
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-(--color-text-secondary) pt-1">
            <Link href="/admin/login" className="hover:text-(--color-primary-dark) hover:underline">Masuk sebagai Admin?</Link>
          </p>
          
          <div className="mt-4 border-t border-dashed border-(--color-border) pt-3">
            <Link href="/" className="inline-block text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary) transition-colors hover:text-(--color-primary-dark)">
              &larr; Kembali ke Beranda
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}