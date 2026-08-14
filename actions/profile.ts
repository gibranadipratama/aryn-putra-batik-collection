"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(userId: string, formData: { name: string; phone: string; address: string }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { success: false, message: "Pengguna tidak ditemukan." };
    }

    const now = new Date();
    const lastUpdate = user.lastProfileUpdate ? new Date(user.lastProfileUpdate) : null;

    // Periksa apakah hari ini masih hari yang sama dengan update terakhir
    const isToday = lastUpdate && lastUpdate.toDateString() === now.toDateString();

    // Jika hari ini masih sama, ambil hitungan sekarang. Jika sudah berganti hari, reset jadi 0.
    let currentCount = isToday ? user.updateCountToday : 0;

    // Batasan maksimal 2 kali sehari
    if (currentCount >= 2) {
      return { 
        success: false, 
        message: "Batas maksimal mengganti data profil adalah 2 kali sehari. Silakan coba lagi besok." 
      };
    }

    // Lakukan pembaruan data dan increment counter
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        lastProfileUpdate: now,
        updateCountToday: currentCount + 1,
      },
    });

    revalidatePath("/akun");
    return { 
      success: true, 
      message: `Profil berhasil diperbarui! Anda tersisa ${1 - currentCount} kesempatan ubah data hari ini.` 
    };

  } catch (error) {
    console.error("Gagal memperbarui profil:", error);
    return { success: false, message: "Terjadi kesalahan pada server." };
  }
}