"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar"; 
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State untuk Sidebar HP
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const closeMobileSidebar = () => setIsMobileOpen(false);

  // State untuk Sidebar Desktop (Lebar/Sempit)
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const toggleDesktopCollapse = () => setIsDesktopCollapsed(!isDesktopCollapsed);

  return (
    <div className="min-h-screen bg-[#E8E0D3] text-[#162A3D]">
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#0B1F33',
            color: '#E8E0D3',
            border: '1px solid #A88A3D',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          },
          success: { iconTheme: { primary: '#A88A3D', secondary: '#0B1F33' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#E8E0D3' } },
        }} 
      />

      {/* Mengirimkan State ke Komponen Sidebar */}
      <Sidebar 
        isMobileOpen={isMobileOpen} 
        closeMobileSidebar={closeMobileSidebar}
        isDesktopCollapsed={isDesktopCollapsed}
        toggleDesktopCollapse={toggleDesktopCollapse}
      />

      {/* KONTEN UTAMA: Padding kiri berubah HANYA saat state isDesktopCollapsed berubah */}
      <div 
        className={`min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
          isDesktopCollapsed ? "lg:pl-22" : "lg:pl-64"
        }`}
      >
        {/* HEADER KHUSUS MOBILE & TABLET */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#0B1F33]/10 bg-[#E8E0D3]/95 px-5 backdrop-blur-md md:px-8 lg:hidden">
          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label="Buka sidebar"
            className="flex h-9 w-9 items-center justify-center border border-[#0B1F33]/10 bg-[#EDE6DA] transition hover:bg-[#0B1F33] hover:text-[#E8E0D3]"
          >
            <Menu className="h-4 w-4" />
          </button>
          
          <div className="text-right">
            <p className="text-[9px] font-bold uppercase tracking-[0.15em]">Admin Panel</p>
            <p className="mt-0.5 text-[8px] text-[#162A3D]/60">ARYN PUTRA</p>
          </div>
        </header>
        
        {/* AREA KONTEN HALAMAN */}
        <main className="flex-1 p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}