"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  User,
  LogOut,
  Settings,
  Package,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // State untuk Dropdown Profil & Menu Mobile
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAuthenticated = status === "authenticated";

  // Daftar Menu Navigasi
  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Katalog", href: "/produk" },
    { name: "Pria", href: "/kategori/pria" },
    { name: "Wanita", href: "/kategori/wanita" },
    { name: "Couple", href: "/kategori/couple" },
    { name: "Lain-lain", href: "/kategori/lain-lain" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F2E7] text-[#102A43]">
      <div className="mx-auto max-w-375 px-5 md:px-10">
        <div className="flex min-h-19.5 items-center justify-between">
          {/* KIRI: LOGO & MOBILE MENU */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Buka menu"
              className="rounded-full p-2 transition hover:bg-[#102A43]/5 lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            <Link href="/" className="flex flex-col leading-none">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A227]">
                Batik Collection
              </span>

              <span className="mt-1 text-xl font-black uppercase tracking-[-0.06em] md:text-2xl">
                ARYN PUTRA
              </span>
            </Link>
          </div>

          {/* TENGAH: NAVIGASI */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                    isActive
                      ? "text-[#C9A227]"
                      : "text-[#102A43] hover:text-[#C9A227]"
                  }`}
                >
                  {link.name}

                  <span
                    className={`absolute bottom-0 left-0 h-px bg-[#C9A227] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* KANAN: CART & PROFILE */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* CART */}
            {isAuthenticated ? (
              <Link
                href="/keranjang"
                aria-label="Keranjang"
                className="relative rounded-full p-2.5 transition hover:bg-[#102A43]/5 hover:text-[#C9A227]"
              >
                <ShoppingBag className="h-4.5 w-4.5" />
              </Link>
            ) : (
              <Link
                href="/login"
                title="Login untuk berbelanja"
                aria-label="Login untuk berbelanja"
                className="relative rounded-full p-2.5 text-[#102A43]/50 transition hover:bg-[#102A43]/5 hover:text-[#C9A227]"
              >
                <ShoppingBag className="h-4.5 w-4.5" />
              </Link>
            )}

            {/* PEMISAH */}
            <div className="mx-1 hidden h-5 w-px bg-[#102A43]/10 sm:block" />

            {/* LOGIN / PROFILE */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  aria-label="Menu profil"
                  className="flex items-center gap-1.5 rounded-full p-1 transition hover:bg-[#102A43]/5"
                >
                  {session?.user?.image ? (
                    <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[#C9A227]/30">
                      <Image
                        src={session.user.image}
                        alt="Profil"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#102A43] text-[#F7F2E7]">
                      <User className="h-4 w-4" />
                    </div>
                  )}

                  <ChevronDown
                    className={`hidden h-3.5 w-3.5 text-[#102A43]/50 transition-transform md:block ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* DROPDOWN PROFILE */}
                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileOpen(false)}
                    />

                    <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-[#102A43]/10 bg-[#F7F2E7] shadow-[0_18px_50px_rgba(16,42,67,0.14)]">
                      {/* USER INFO */}
                      <div className="border-b border-[#102A43]/10 px-4 py-4">
                        <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#C9A227]">
                          Masuk sebagai
                        </p>

                        <p className="mt-1 truncate text-[11px] font-black uppercase tracking-[0.08em] text-[#102A43]">
                          {session?.user?.name || "Pelanggan"}
                        </p>
                      </div>

                      {/* ORDERS */}
                      <div className="p-2">
                        <Link
                          href="/pesanan"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#102A43] transition hover:bg-[#102A43]/5 hover:text-[#C9A227]"
                        >
                          <Package className="h-4 w-4 text-[#C9A227]" />
                          Pesanan Saya
                        </Link>
                      </div>

                      {/* ACCOUNT */}
                      <div className="p-2">
                        <Link
                          href="/akun"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#102A43] transition hover:bg-[#102A43]/5 hover:text-[#C9A227]"
                        >
                          <Settings className="h-4 w-4 text-[#C9A227]" />
                          Kelola Akun
                        </Link>
                      </div>

                      {/* LOGOUT */}
                      <div className="border-t border-[#102A43]/10 p-2">
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-red-600 transition hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Keluar Akun
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center">
                <Link
                  href="/login"
                  aria-label="Login"
                  className="hidden rounded-full p-2.5 transition hover:bg-[#102A43]/5 hover:text-[#C9A227] sm:block"
                >
                  <User className="h-4.5 w-4.5" />
                </Link>

                <Link
                  href="/register"
                  className="hidden rounded-full bg-[#102A43] px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#F7F2E7] transition hover:bg-[#C9A227] hover:text-[#102A43] sm:block"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="border-t border-[#102A43]/10 bg-[#F7F2E7] lg:hidden">
          <nav className="mx-auto flex max-w-375 flex-col px-5 py-4 md:px-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`border-b border-[#102A43]/10 py-4 text-sm font-black uppercase tracking-[0.15em] transition ${
                    isActive
                      ? "text-[#C9A227]"
                      : "text-[#102A43] hover:text-[#C9A227]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* ORDER */}
            {isAuthenticated && (
              <Link
                href="/pesanan"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 border-b border-[#102A43]/10 py-4 text-sm font-black uppercase tracking-[0.15em] text-[#102A43] hover:text-[#C9A227]"
              >
                <Package className="h-4 w-4" /> Pesanan Saya
              </Link>
            )}

            {/* LOGIN MOBILE */}
            {!isAuthenticated && (
              <div className="mt-5">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#102A43] py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#F7F2E7] transition hover:bg-[#C9A227] hover:text-[#102A43]"
                >
                  <User className="h-4 w-4" />
                  Login / Daftar
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
