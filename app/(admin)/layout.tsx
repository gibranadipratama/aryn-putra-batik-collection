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
  const [open, setOpen] = useState(false);
  const closeSidebar = () => setOpen(false);

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
          success: {
            iconTheme: {
              primary: '#A88A3D',
              secondary: '#0B1F33',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#E8E0D3',
            },
          },
        }} 
      />

      <Sidebar open={open} closeSidebar={closeSidebar} />

      <div className="min-h-screen lg:pl-65">
        {/* HEADER KHUSUS MOBILE & TABLET (Disembunyikan di Desktop lewat lg:hidden) */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#0B1F33]/10 bg-[#E8E0D3]/95 px-5 backdrop-blur-md md:px-8 lg:hidden">
          <button
            onClick={() => setOpen(true)}
            aria-label="Buka sidebar"
            className="flex h-9 w-9 items-center justify-center border border-[#0B1F33]/10 bg-[#EDE6DA] transition hover:bg-[#0B1F33] hover:text-[#E8E0D3]"
          >
            <Menu className="h-4 w-4" />
          </button>
          
          <div className="text-right">
            <p className="text-[9px] font-bold uppercase tracking-[0.15em]">
              Admin Panel
            </p>
            <p className="mt-0.5 text-[8px] text-[#162A3D]/60">ARYN PUTRA</p>
          </div>
        </header>
        
        {/* KONTEN UTAMA */}
        <main className="min-h-screen p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}