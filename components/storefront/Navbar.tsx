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
  Phone, // Ikon untuk halaman contact
} from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAuthenticated = status === "authenticated";

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "/about" },
    { name: "Katalog", href: "/produk" },
    { name: "Pria", href: "/kategori/pria" },
    { name: "Wanita", href: "/kategori/wanita" },
    { name: "Couple", href: "/kategori/couple" },
    { name: "Lain-lain", href: "/kategori/lain-lain" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-(--color-border) bg-(--color-primary-dark) text-(--color-surface) shadow-sm font-sans">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex min-h-20 items-center justify-between">
          {/* KIRI: LOGO & MOBILE MENU */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Buka menu"
              className="rounded-md border border-(--color-border)/50 p-2 transition hover:bg-(--color-surface)/10 lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-(--color-surface)" />
              ) : (
                <Menu className="h-5 w-5 text-(--color-surface)" />
              )}
            </button>

            <Link href="/" className="flex flex-col leading-none">
              <span className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent)">
                Batik Collection
              </span>
              <span className="mt-1 text-xl font-black uppercase tracking-wide text-(--color-surface) md:text-2xl">
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
                  className={`group relative py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-(--color-accent)"
                      : "text-(--color-surface)/70 hover:text-(--color-surface)"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-(--color-accent) transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* KANAN: CONTACT, CART & PROFILE */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* CONTACT ICON (HUBUNGI KAMI) */}
            <Link
              href="/contact"
              title="Hubungi Kami"
              aria-label="Hubungi Kami"
              className="relative rounded-full border border-(--color-border)/30 bg-(--color-surface)/10 p-2.5 text-(--color-surface) transition hover:-translate-y-0.5 hover:border-(--color-accent) hover:text-(--color-accent) hover:shadow-[2px_2px_0_rgba(201,168,118,0.4)]"
            >
              <Phone className="h-5 w-5" />
            </Link>

            {/* CART */}
            {isAuthenticated ? (
              <Link
                href="/keranjang"
                aria-label="Keranjang"
                className="relative rounded-full border border-(--color-border)/30 bg-(--color-surface)/10 p-2.5 text-(--color-surface) transition hover:-translate-y-0.5 hover:border-(--color-accent) hover:text-(--color-accent) hover:shadow-[2px_2px_0_rgba(201,168,118,0.4)]"
              >
                <ShoppingBag className="h-5 w-5" />
              </Link>
            ) : (
              <Link
                href="/login"
                title="Login untuk berbelanja"
                aria-label="Login untuk berbelanja"
                className="relative rounded-full border border-dashed border-(--color-border)/50 bg-transparent p-2.5 text-(--color-surface)/70 transition hover:border-(--color-accent) hover:bg-(--color-surface)/10 hover:text-(--color-accent)"
              >
                <ShoppingBag className="h-5 w-5" />
              </Link>
            )}

            {/* PEMISAH */}
            <div className="mx-1 hidden h-6 w-0.5 bg-(--color-border)/30 sm:block" />

            {/* LOGIN / PROFILE */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  aria-label="Menu profil"
                  className="flex items-center gap-1.5 rounded-full border border-(--color-border)/30 bg-(--color-surface)/10 p-1 pr-2 transition hover:border-(--color-accent) hover:bg-(--color-surface)/20"
                >
                  {session?.user?.image ? (
                    <div className="relative h-8 w-8 overflow-hidden rounded-full border border-(--color-border)">
                      <Image
                        src={session.user.image}
                        alt="Profil"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-accent) text-(--color-primary-dark)">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                  <ChevronDown
                    className={`hidden h-4 w-4 text-(--color-surface) transition-transform md:block ${
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

                    <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-lg border-2 border-(--color-border) bg-(--color-surface) text-(--color-text-primary) shadow-[4px_4px_0_rgba(139,94,60,0.25)]">
                      {/* USER INFO */}
                      <div className="border-b-2 border-(--color-border) bg-(--color-bg) px-4 py-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-(--color-accent-2)">
                          Masuk sebagai
                        </p>
                        <p className="mt-1 truncate text-sm font-bold text-(--color-primary-dark)">
                          {session?.user?.name || "Pelanggan"}
                        </p>
                      </div>

                      {/* ORDERS */}
                      <div className="p-2">
                        <Link
                          href="/pesanan"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-(--color-text-primary) transition hover:bg-(--color-primary) hover:text-(--color-surface)"
                        >
                          <Package className="h-4 w-4" />
                          Pesanan Saya
                        </Link>
                      </div>

                      {/* ACCOUNT */}
                      <div className="p-2 pt-0">
                        <Link
                          href="/akun"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-(--color-text-primary) transition hover:bg-(--color-primary) hover:text-(--color-surface)"
                        >
                          <Settings className="h-4 w-4" />
                          Kelola Akun
                        </Link>
                      </div>

                      {/* LOGOUT */}
                      <div className="border-t-2 border-(--color-border) bg-(--color-bg) p-2">
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-(--color-danger) transition hover:bg-(--color-danger) hover:text-white"
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
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  aria-label="Login"
                  className="hidden rounded-full border border-(--color-border)/30 bg-(--color-surface)/10 p-2.5 text-(--color-surface) transition hover:-translate-y-0.5 hover:border-(--color-accent) hover:text-(--color-accent) hover:shadow-[2px_2px_0_rgba(201,168,118,0.4)] sm:block"
                >
                  <User className="h-5 w-5" />
                </Link>

                <Link
                  href="/register"
                  className="hidden rounded-md border-2 border-(--color-accent) bg-(--color-accent) px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-(--color-primary-dark) shadow-[2px_2px_0_rgba(201,168,118,0.4)] transition hover:-translate-y-0.5 hover:bg-(--color-surface) sm:block"
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
        <div className="border-t-2 border-(--color-border)/50 bg-(--color-primary-dark) lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4 md:px-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`border-b border-dashed border-(--color-border)/30 py-4 text-sm font-bold uppercase tracking-wider transition ${
                    isActive
                      ? "text-(--color-accent)"
                      : "text-(--color-surface)/70 hover:text-(--color-surface)"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* ORDER MOBILE */}
            {isAuthenticated && (
              <Link
                href="/pesanan"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 border-b border-dashed border-(--color-border)/30 py-4 text-sm font-bold uppercase tracking-wider text-(--color-accent) hover:text-(--color-surface)"
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
                  className="flex items-center justify-center gap-2 rounded-md border-2 border-(--color-accent) bg-(--color-accent) py-4 text-xs font-bold uppercase tracking-wider text-(--color-primary-dark) shadow-[3px_3px_0_rgba(201,168,118,0.4)] transition hover:bg-(--color-surface)"
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
