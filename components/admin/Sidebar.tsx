"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  X,
  ChevronRight,
  LogOut,
  Store,
} from "lucide-react";

// Pindahkan array menuItems ke dalam file Sidebar
const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/pelanggan", label: "Pelanggan", icon: Users },
  { href: "/dashboard/pesanan", label: "Pesanan", icon: ShoppingBag },
  { href: "/dashboard/produk", label: "Produk", icon: Package },
];

// Definisikan props yang diterima dari Layout
interface SidebarProps {
  open: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ open, closeSidebar }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop untuk mobile */}
      {open && (
        <button
          aria-label="Tutup sidebar"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-[#0B1F33]/45 backdrop-blur-sm lg:hidden"
        />
      )}
      
      {/* Sidebar utama */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-65 flex-col bg-[#0B1F33] text-[#E8E0D3] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-31.25 items-start justify-between border-b border-white/[0.07] px-6 pt-8">
          <Link
            href="/dashboard"
            onClick={closeSidebar}
            className="flex flex-col leading-none"
          >
            <span className="text-[8px] font-bold uppercase tracking-[0.32em] text-[#A88A3D]">
              Batik Collection
            </span>
            <span className="mt-3 text-xl font-black uppercase tracking-[-0.06em]">
              ARYN PUTRA
            </span>
          </Link>
          <button
            onClick={closeSidebar}
            className="rounded-full p-2 text-white/35 transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="border-b border-white/[0.07] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-[#A88A3D] text-[10px] font-black text-[#0B1F33]">
              AP
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#E8E0D3]">
                Administrator
              </p>
              <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-white/30">
                Admin Toko
              </p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6">
          <p className="px-3 pb-3 text-[8px] font-bold uppercase tracking-[0.28em] text-white/25">
            Menu Utama
          </p>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`group flex items-center justify-between px-4 py-3.5 transition ${
                    active
                      ? "bg-[#A88A3D] text-[#0B1F33]"
                      : "text-white/50 hover:bg-white/6 hover:text-[#E8E0D3]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4.25 w-4.25" />
                    <span className="text-[11px] font-bold">{item.label}</span>
                  </div>
                  <ChevronRight
                    className={`h-3.5 w-3.5 transition ${
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
          
          <p className="px-3 pb-3 pt-10 text-[8px] font-bold uppercase tracking-[0.28em] text-white/25">
            Toko
          </p>
          <Link
            href="/"
            onClick={closeSidebar}
            className="group flex items-center justify-between px-4 py-3.5 text-white/50 transition hover:bg-white/6 hover:text-[#E8E0D3]"
          >
            <div className="flex items-center gap-3">
              <Store className="h-4.25 w-4.25" />
              <span className="text-[11px] font-bold">Lihat Website</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
          </Link>
        </nav>
        
        <div className="border-t border-white/[0.07] p-5">
          <button className="flex w-full items-center gap-3 px-3 py-3 text-white/35 transition hover:text-[#E8E0D3]">
            <LogOut className="h-4 w-4" />
            <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
              Keluar
            </span>
          </button>
          <div className="mt-3 border-t border-white/[0.07] pt-4">
            <p className="text-[8px] uppercase tracking-[0.15em] text-white/20">
              ARYN PUTRA
            </p>
            <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-white/15">
              Batik Collection
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}