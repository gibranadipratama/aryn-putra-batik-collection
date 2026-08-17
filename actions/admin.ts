"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Mengambil semua data admin & superadmin
export async function getAdmins() {
  try {
    const admins = await prisma.user.findMany({
      where: { 
        role: { in: ["ADMIN", "SUPERADMIN"] } 
      },
      orderBy: { createdAt: "desc" },
    });
    return admins;
  } catch (error) {
    console.error("Gagal mengambil data admin:", error);
    return [];
  }
}

// 2. Pencarian User/Pelanggan biasa (yang akan diangkat jadi admin)
export async function searchUsers(query: string) {
  if (!query || query.trim() === "") return [];
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
        role: "USER", // STRICT: Hanya cari yang masih berstatus user biasa
      },
      take: 5,
    });
    return users;
  } catch (error) {
    console.error("Gagal mencari user:", error);
    return [];
  }
}

// 3. Mengangkat user menjadi ADMIN atau SUPERADMIN (Hanya Superadmin)
export async function promoteToAdmin(userId: string, currentUserEmail: string, roleToAssign: "ADMIN" | "SUPERADMIN" = "ADMIN") {
  try {
    // STRICT Pengecekan: Pastikan yang mengeksekusi adalah SUPERADMIN
    const currentUser = await prisma.user.findUnique({ where: { email: currentUserEmail } });
    if (!currentUser || currentUser.role !== "SUPERADMIN") {
      return { success: false, message: "Akses ditolak! Hanya Superadmin yang dapat mengangkat admin." };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: roleToAssign },
    });

    revalidatePath("/dashboard/kelola-admin");
    return { success: true, message: `Berhasil mengangkat pengguna menjadi ${roleToAssign}!` };
  } catch (error) {
    console.error("Gagal mengangkat admin:", error);
    return { success: false, message: "Gagal memproses data." };
  }
}

// 4. Mengubah role antar ADMIN dan SUPERADMIN (Hanya Superadmin)
export async function updateAdminRole(userId: string, newRole: "ADMIN" | "SUPERADMIN", currentUserEmail: string) {
  try {
    // STRICT Pengecekan: Pastikan yang mengeksekusi adalah SUPERADMIN
    const currentUser = await prisma.user.findUnique({ where: { email: currentUserEmail } });
    if (!currentUser || currentUser.role !== "SUPERADMIN") {
      return { success: false, message: "Akses ditolak! Hanya Superadmin yang dapat mengubah role." };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath("/dashboard/kelola-admin");
    return { success: true, message: `Role berhasil diperbarui menjadi ${newRole}!` };
  } catch (error) {
    console.error("Gagal mengubah role:", error);
    return { success: false, message: "Gagal memproses data." };
  }
}

// 5. Menurunkan/Mencabut akses admin (Hanya Superadmin)
export async function revokeAdmin(userId: string, currentUserEmail: string) {
  try {
    // STRICT Pengecekan: Pastikan yang mengeksekusi adalah SUPERADMIN
    const currentUser = await prisma.user.findUnique({ where: { email: currentUserEmail } });
    if (!currentUser || currentUser.role !== "SUPERADMIN") {
      return { success: false, message: "Akses ditolak! Hanya Superadmin yang dapat mencabut akses." };
    }

    // STRICT: Akun TIDAK DIHAPUS, hanya diturunkan pangkatnya menjadi USER biasa
    await prisma.user.update({
      where: { id: userId },
      data: { role: "USER" },
    });
    
    revalidatePath("/dashboard/kelola-admin");
    return { success: true, message: "Akses admin berhasil dicabut. Akun dikembalikan menjadi pelanggan biasa." };
  } catch (error) {
    console.error("Gagal mencabut akses:", error);
    return { success: false, message: "Gagal memproses data." };
  }
}