"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Package, ShoppingBag, Users, ShieldCheck, 
  LogOut, X, ChevronLeft, ChevronRight, MonitorPlay
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
          className="fixed inset-0 z-40 bg-[#0B1F33]/70 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={closeMobileSidebar}
        />
      )}

      {/* SIDEBAR UTAMA */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#0B1F33] text-[#E8E0D3] shadow-2xl transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isDesktopCollapsed ? "lg:w-22" : "w-64"}
        `}
      >
        {/* TOMBOL COLLAPSE KHUSUS DESKTOP */}
        <button
          onClick={toggleDesktopCollapse}
          className="absolute -right-3 top-6 z-50 hidden h-6 w-6 items-center justify-center rounded-full bg-[#A88A3D] text-[#0B1F33] shadow-md transition-transform hover:scale-110 lg:flex"
        >
          {isDesktopCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {/* HEADER BRANDING */}
        <div className={`relative flex h-20 items-center border-b border-[#E8E0D3]/10 px-6 transition-all ${isDesktopCollapsed ? "justify-center px-0" : "justify-between"}`}>
          <div className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100"}`}>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A88A3D]">Batik Collection</p>
            <h2 className="mt-1 text-lg font-black uppercase tracking-wider text-white">Aryn Putra</h2>
          </div>
          
          {isDesktopCollapsed && (
            <h2 className="text-xl font-black text-[#A88A3D]">AP</h2>
          )}

          {!isDesktopCollapsed && (
            <button onClick={closeMobileSidebar} className="lg:hidden text-[#E8E0D3]/60 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* INFO PROFIL ADMIN */}
        <div className={`flex items-center gap-3 border-b border-[#E8E0D3]/10 p-6 transition-all ${isDesktopCollapsed ? "justify-center p-4" : ""}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A88A3D] text-sm font-black text-[#0B1F33]">
            AP
          </div>
          <div className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100"}`}>
            <p className="text-xs font-bold text-white">Administrator</p>
            <p className="text-[9px] uppercase tracking-widest text-[#E8E0D3]/50">Admin Toko</p>
          </div>
        </div>

        {/* DAFTAR MENU NAVIGASI (Dengan Custom CSS untuk sembunyikan scrollbar) */}
        <div className="flex-1 overflow-y-auto py-6 px-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* Untuk webkit (Chrome, Safari, Edge) ditangani via className (opsional) atau inline style ini cukup */}
          <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>
          
          <p className={`mb-4 px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E8E0D3]/40 transition-all ${isDesktopCollapsed ? "text-center px-0 text-[8px]" : ""}`}>
            {isDesktopCollapsed ? "Menu" : "Menu Utama"}
          </p>
          
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const isActive = item.href === "/dashboard" 
                ? pathname === "/dashboard" 
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMobileSidebar} 
                  className={`group relative flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-200
                    ${isDesktopCollapsed ? "justify-center px-0 mx-2" : ""}
                    ${isActive 
                      ? "bg-[#A88A3D] text-[#0B1F33] shadow-md" 
                      : "text-[#E8E0D3]/70 hover:bg-[#E8E0D3]/10 hover:text-white"
                    }
                  `}
                >
                  <item.icon className={`shrink-0 transition-transform group-hover:scale-110 ${isDesktopCollapsed ? "h-5 w-5" : "h-4 w-4"}`} />
                  
                  <span className={`text-xs font-bold whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? "w-0 hidden opacity-0" : "w-auto opacity-100"}`}>
                    {item.label}
                  </span>

                  {isDesktopCollapsed && (
                    <div className="absolute left-16 z-50 rounded-lg bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#0B1F33] shadow-xl opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* MENU BAWAH (Toko & Keluar) */}
        <div className="border-t border-[#E8E0D3]/10 p-5">
          <div className="flex flex-col gap-2">
            <Link 
              href="/"
              target="_blank" 
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-[#E8E0D3]/70 transition-all hover:bg-[#E8E0D3]/10 hover:text-white ${isDesktopCollapsed ? "justify-center px-0 mx-1" : ""}`}
            >
              <MonitorPlay className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
              <span className={`text-xs font-bold whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? "w-0 hidden opacity-0" : "w-auto opacity-100"}`}>
                Lihat Etalase
              </span>
              {isDesktopCollapsed && (
                <div className="absolute left-16 z-50 rounded-lg bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#0B1F33] shadow-xl opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible whitespace-nowrap">
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