"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar"; 
import { Toaster } from "react-hot-toast";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function AdminDashboardContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const closeMobileSidebar = () => setIsMobileOpen(false);

  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const toggleDesktopCollapse = () => setIsDesktopCollapsed(!isDesktopCollapsed);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (
      status === "authenticated" && 
      (session?.user as any)?.role !== "ADMIN" && 
      (session?.user as any)?.role !== "SUPERADMIN"
    ) {
      router.replace("/");
    }
  }, [status, session, router]);

  if (
    status === "loading" || 
    (status === "authenticated" && 
      (session?.user as any)?.role !== "ADMIN" && 
      (session?.user as any)?.role !== "SUPERADMIN")
  ) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#E8E0D3] text-[#162A3D]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0B1F33]/20 border-t-[#A88A3D]" />
        <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#162A3D]/70">
          Memverifikasi Akses Admin...
        </p>
      </div>
    );
  }

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

      <Sidebar 
        isMobileOpen={isMobileOpen} 
        closeMobileSidebar={closeMobileSidebar}
        isDesktopCollapsed={isDesktopCollapsed}
        toggleDesktopCollapse={toggleDesktopCollapse}
      />

      <div className={`flex min-h-screen flex-col transition-all duration-300 ease-in-out ${isDesktopCollapsed ? "lg:pl-22" : "lg:pl-64"}`}>
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
        
        <main className="flex-1 p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminDashboardContent>{children}</AdminDashboardContent>
    </SessionProvider>
  );
}