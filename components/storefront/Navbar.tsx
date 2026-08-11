'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F2E7] text-[#102A43]">
      <div className="mx-auto max-w-375 px-5 md:px-10">
        <div className="flex min-h-19.5 items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={toggleMenu} aria-label="Buka menu" className="rounded-full p-2 transition hover:bg-[#102A43]/5 lg:hidden">
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/" className="flex flex-col leading-none">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A227]">Batik Collection</span>
              <span className="mt-1 text-xl font-black uppercase tracking-[-0.06em] md:text-2xl">ARYN PUTRA</span>
            </Link>
          </div>
          <nav className="hidden items-center gap-8 lg:flex">
            <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.2em] transition hover:text-[#C9A227]">
              Beranda
            </Link>
            <Link href="/produk" className="text-[10px] font-bold uppercase tracking-[0.2em] transition hover:text-[#C9A227]">
              Katalog
            </Link>
            <Link href="/kategori/pria" className="text-[10px] font-bold uppercase tracking-[0.2em] transition hover:text-[#C9A227]">
              Pria
            </Link>
            <Link href="/kategori/wanita" className="text-[10px] font-bold uppercase tracking-[0.2em] transition hover:text-[#C9A227]">
              Wanita
            </Link>
            <Link href="/kategori/couple" className="text-[10px] font-bold uppercase tracking-[0.2em] transition hover:text-[#C9A227]">
              Couple
            </Link>
            <Link href="/kategori/lain-lain" className="text-[10px] font-bold uppercase tracking-[0.2em] transition hover:text-[#C9A227]">
              Lain-lain
            </Link>
          </nav>
          <div className="flex items-center gap-1 md:gap-2">
            <Link href="/produk" aria-label="Cari produk" className="rounded-full p-2.5 transition hover:bg-[#102A43]/5 hover:text-[#C9A227]">
              <Search className="h-4.5 w-4.5" />
            </Link>
            <Link href="/login" aria-label="Login" className="hidden rounded-full p-2.5 transition hover:bg-[#102A43]/5 hover:text-[#C9A227] sm:block">
              <User className="h-4.5 w-4.5" />
            </Link>
            <Link href="/keranjang" aria-label="Keranjang" className="relative rounded-full p-2.5 transition hover:bg-[#102A43]/5 hover:text-[#C9A227]">
              <ShoppingBag className="h-4.5 w-4.5" />
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C9A227] px-1 text-[8px] font-black text-[#102A43]">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="border-t border-[#102A43]/10 bg-[#F7F2E7] lg:hidden">
          <nav className="mx-auto flex max-w-375 flex-col px-5 py-4 md:px-10">
            <Link href="/" onClick={toggleMenu} className="border-b border-[#102A43]/10 py-4 text-sm font-black uppercase tracking-[0.15em]">
              Beranda
            </Link>
            <Link href="/produk" onClick={toggleMenu} className="border-b border-[#102A43]/10 py-4 text-sm font-black uppercase tracking-[0.15em]">
              Katalog
            </Link>
            <Link href="/kategori/pria" onClick={toggleMenu} className="border-b border-[#102A43]/10 py-4 text-sm font-black uppercase tracking-[0.15em]">
              Pria
            </Link>
            <Link href="/kategori/wanita" onClick={toggleMenu} className="border-b border-[#102A43]/10 py-4 text-sm font-black uppercase tracking-[0.15em]">
              Wanita
            </Link>
            <Link href="/kategori/couple" onClick={toggleMenu} className="border-b border-[#102A43]/10 py-4 text-sm font-black uppercase tracking-[0.15em]">
              Couple
            </Link>
            <Link href="/kategori/lain-lain" onClick={toggleMenu} className="border-b border-[#102A43]/10 py-4 text-sm font-black uppercase tracking-[0.15em]">
              Lain-lain
            </Link>
            <Link href="/login" onClick={toggleMenu} className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#102A43] py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#F7F2E7]">
              <User className="h-4 w-4" />
              Login / Daftar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}