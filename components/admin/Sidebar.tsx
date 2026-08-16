"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Package, ShoppingBag, Users, ShieldCheck, 
  X, ChevronLeft, ChevronRight, MonitorPlay
} from "lucide-react";

interface SidebarProps {
  isMobileOpen: boolean;
  closeMobileSidebar: () => void;
  isDesktopCollapsed: boolean;
  toggleDesktopCollapse: () => void;
}

export default function Sidebar({ 
  isMobileOpen, 
  closeMobileSidebar, 
  isDesktopCollapsed, 
  toggleDesktopCollapse 
}: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Produk", icon: Package, href: "/dashboard/produk" },
    { label: "Pesanan", icon: ShoppingBag, href: "/dashboard/pesanan" },
    { label: "Pelanggan", icon: Users, href: "/dashboard/pelanggan" },
    { label: "Kelola Admin", icon: ShieldCheck, href: "/dashboard/kelola-admin" },
  ];

  return (
    <>
      {/* OVERLAY KHUSUS MOBILE */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-(--color-text-primary)/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* SIDEBAR UTAMA */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r-4 border-(--color-border) bg-(--color-primary-dark) text-(--color-surface) font-sans shadow-[6px_0_15px_rgba(58,40,27,0.3)] transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isDesktopCollapsed ? "lg:w-22" : "w-64"}
        `}
      >
        {/* TOMBOL COLLAPSE KHUSUS DESKTOP */}
        <button
          onClick={toggleDesktopCollapse}
          className="absolute -right-3 top-6 z-50 hidden h-6 w-6 items-center justify-center rounded-full border-2 border-(--color-border) bg-(--color-accent) text-(--color-primary-dark) shadow-[2px_2px_0_rgba(139,94,60,0.5)] transition-transform hover:scale-110 lg:flex"
        >
          {isDesktopCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {/* HEADER BRANDING */}
        <div className={`relative flex h-20 items-center border-b-2 border-(--color-border) px-6 transition-all ${isDesktopCollapsed ? "justify-center px-0" : "justify-between"}`}>
          <div className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? "hidden w-0 opacity-0" : "w-auto opacity-100"}`}>
            <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-accent)">Batik Collection</p>
            <h2 className="mt-1 text-lg font-black uppercase tracking-wider text-(--color-surface)">Aryn Putra</h2>
          </div>
          
          {isDesktopCollapsed && (
            <h2 className="text-xl font-black text-(--color-accent)">AP</h2>
          )}

          {!isDesktopCollapsed && (
            <button onClick={closeMobileSidebar} className="text-(--color-surface)/60 transition hover:text-(--color-surface) lg:hidden">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* INFO PROFIL ADMIN */}
        <div className={`flex items-center gap-3 border-b-2 border-(--color-border) bg-(--color-border)/10 p-6 transition-all ${isDesktopCollapsed ? "justify-center p-4" : ""}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-(--color-border) bg-(--color-accent) text-sm font-black text-(--color-primary-dark) shadow-[2px_2px_0_rgba(58,40,27,0.4)]">
            AP
          </div>
          <div className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? "hidden w-0 opacity-0" : "w-auto opacity-100"}`}>
            <p className="text-xs font-bold text-(--color-surface)">Administrator</p>
            <p className="text-[9px] uppercase tracking-widest text-(--color-surface)/60">Admin Toko</p>
          </div>
        </div>

        {/* DAFTAR MENU NAVIGASI */}
        <div className="flex-1 overflow-y-auto px-3 py-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>
          
          <p className={`mb-4 px-3 text-[9px] font-bold uppercase tracking-widest text-(--color-surface)/50 transition-all ${isDesktopCollapsed ? "px-0 text-center text-[8px]" : ""}`}>
            {isDesktopCollapsed ? "Menu" : "Menu Utama"}
          </p>
          
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = item.href === "/dashboard" 
                ? pathname === "/dashboard" 
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMobileSidebar} 
                  className={`group relative flex items-center gap-3 rounded-md px-4 py-3.5 transition-all duration-200
                    ${isDesktopCollapsed ? "mx-2 justify-center px-0" : ""}
                    ${isActive 
                      ? "border-2 border-(--color-border) bg-(--color-accent) text-(--color-primary-dark) shadow-[3px_3px_0_rgba(58,40,27,0.4)]" 
                      : "border-2 border-transparent text-(--color-surface)/80 hover:border-(--color-border)/50 hover:bg-(--color-surface)/5 hover:text-(--color-surface)"
                    }
                  `}
                >
                  <item.icon className={`shrink-0 transition-transform group-hover:scale-110 ${isDesktopCollapsed ? "h-5 w-5" : "h-4 w-4"}`} />
                  
                  <span className={`whitespace-nowrap text-xs font-bold transition-all duration-300 ${isDesktopCollapsed ? "hidden w-0 opacity-0" : "w-auto opacity-100"}`}>
                    {item.label}
                  </span>

                  {isDesktopCollapsed && (
                    <div className="invisible absolute left-16 z-50 whitespace-nowrap rounded-md border-2 border-(--color-border) bg-(--color-surface) px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-(--color-primary-dark) opacity-0 shadow-[4px_4px_0_rgba(139,94,60,0.3)] transition-all group-hover:visible group-hover:opacity-100">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* MENU BAWAH (Toko & Keluar) */}
        <div className="border-t-2 border-(--color-border) p-5">
          <div className="flex flex-col gap-2">
            <Link 
              href="/"
              target="_blank" 
              className={`group relative flex items-center gap-3 rounded-md border-2 border-transparent px-3 py-3 text-(--color-surface)/80 transition-all hover:border-(--color-border)/50 hover:bg-(--color-surface)/5 hover:text-(--color-surface) ${isDesktopCollapsed ? "mx-1 justify-center px-0" : ""}`}
            >
              <MonitorPlay className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
              <span className={`whitespace-nowrap text-xs font-bold transition-all duration-300 ${isDesktopCollapsed ? "hidden w-0 opacity-0" : "w-auto opacity-100"}`}>
                Lihat Etalase
              </span>
              {isDesktopCollapsed && (
                <div className="invisible absolute left-16 z-50 whitespace-nowrap rounded-md border-2 border-(--color-border) bg-(--color-surface) px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-(--color-primary-dark) opacity-0 shadow-[4px_4px_0_rgba(139,94,60,0.3)] transition-all group-hover:visible group-hover:opacity-100">
                  Halaman Toko
                </div>
              )}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}