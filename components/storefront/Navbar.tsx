'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
      
      {/* 1. UTILITY BAR (Hanya tampil di Desktop/Tablet besar) */}
      <div className="hidden md:flex bg-[#D4AF37] text-[#172554] h-10 items-center justify-between px-10 text-[13px] font-bold tracking-widest uppercase">
        <div>Batik Premium Nusantara</div>
        <div className="flex items-center space-x-6">
          <Link href="/bantuan" className="hover:text-white transition">Bantuan</Link>
          <Link href="/login" className="hover:text-white transition flex items-center gap-2">
            <User className="w-4 h-4" /> Login / Daftar
          </Link>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <header className="w-full bg-[#FFFFF0] border-b border-gray-200 relative">
        <div className="px-4 md:px-10 h-20 flex items-center justify-between">
          
          {/* TOMBOL MENU MOBILE */}
          <button 
            className="lg:hidden p-2 text-[#172554] -ml-2 hover:text-[#D4AF37] transition"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>

          {/* Navigasi Kiri (Diperbarui dengan Beranda & Katalog) */}
          <nav className="hidden lg:flex flex-1 items-center gap-6 xl:gap-8 text-[14px] xl:text-[15px] font-bold uppercase tracking-wide text-[#172554]">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Beranda</Link>
            <Link href="/produk" className="hover:text-[#D4AF37] transition-colors">Katalog</Link>
            <Link href="/kategori/pria" className="hover:text-[#D4AF37] transition-colors">Pria</Link>
            <Link href="/kategori/wanita" className="hover:text-[#D4AF37] transition-colors">Wanita</Link>
          </nav>

          {/* Tengah: Brand Name */}
          <Link href="/" className="flex-1 lg:flex-none flex justify-center items-center">
            <span className="font-black text-2xl md:text-3xl text-[#172554] tracking-tighter uppercase">
              Aryn Putra
            </span>
          </Link>

          {/* Kanan: Ikon Aksi */}
          <div className="flex-1 flex items-center justify-end gap-3 md:gap-5">
            <button className="hidden sm:block p-2 text-[#172554] hover:text-[#D4AF37] transition">
              <Search className="w-6 h-6" />
            </button>

            <Link href="/login" className="hidden lg:block p-2 text-[#172554] hover:text-[#D4AF37] transition" title="Login / Daftar">
              <User className="w-6 h-6" />
            </Link>

            <Link href="/keranjang" className="p-2 text-[#172554] hover:text-[#D4AF37] transition relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute top-1 right-0 bg-[#172554] text-[#FFFFF0] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* 3. DROPDOWN MENU MOBILE & TABLET */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-[#FFFFF0] border-b border-gray-200 shadow-xl z-50 flex flex-col py-6 px-6 gap-5">
            <Link href="/" onClick={toggleMenu} className="text-[#172554] font-bold uppercase tracking-widest text-lg border-b border-[#172554]/10 pb-3 hover:text-[#D4AF37] transition">Beranda</Link>
            <Link href="/produk" onClick={toggleMenu} className="text-[#172554] font-bold uppercase tracking-widest text-lg border-b border-[#172554]/10 pb-3 hover:text-[#D4AF37] transition">Katalog Produk</Link>
            <Link href="/kategori/pria" onClick={toggleMenu} className="text-[#172554] font-bold uppercase tracking-widest text-lg border-b border-[#172554]/10 pb-3 hover:text-[#D4AF37] transition">Koleksi Pria</Link>
            <Link href="/kategori/wanita" onClick={toggleMenu} className="text-[#172554] font-bold uppercase tracking-widest text-lg border-b border-[#172554]/10 pb-3 hover:text-[#D4AF37] transition">Koleksi Wanita</Link>
            
            <Link 
              href="/login" 
              onClick={toggleMenu}
              className="mt-4 flex items-center justify-center gap-2 w-full py-4 bg-[#172554] text-[#FFFFF0] font-black uppercase tracking-widest rounded-full hover:bg-[#D4AF37] hover:text-[#172554] transition shadow-md"
            >
              <User className="w-5 h-5" />
              Login / Daftar
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}