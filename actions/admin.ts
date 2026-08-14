"use server";

import prisma from "@/lib/prisma";
// Catatan: Jika Anda menggunakan NextAuth/Bcrypt, Anda bisa mengimpor bcrypt di sini untuk mengenkripsi password baru.

export async function getAdmins() {
  try {
    // Mengambil pengguna yang memiliki role ADMIN
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
      orderBy: { createdAt: "desc" },
    });
    return admins;
  } catch (error) {
    console.error("Gagal mengambil data admin:", error);
    return [];
  }
}

export async function createAdmin(data: any) {
  try {
    // Pengecekan email agar tidak duplikat
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) return { success: false, message: "Email sudah terdaftar!" };

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password, // Ingat: Di produksi nyata, password ini harus di-hash (misal pakai bcrypt)
        role: "ADMIN",
      },
    });
    return { success: true, message: "Admin baru berhasil ditambahkan!" };
  } catch (error) {
    return { success: false, message: "Gagal menambahkan admin." };
  }
}

export async function updateAdmin(id: string, data: any) {
  try {
    const updateData: any = { name: data.name, email: data.email };
    // Update password hanya jika form password diisi
    if (data.password && data.password.trim() !== "") {
      updateData.password = data.password; 
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });
    return { success: true, message: "Data admin berhasil diperbarui!" };
  } catch (error) {
    return { success: false, message: "Gagal memperbarui admin." };
  }
}

export async function deleteAdmin(id: string) {
  try {
    await prisma.user.delete({ where: { id } });
    return { success: true, message: "Admin berhasil dihapus!" };
  } catch (error) {
    return { success: false, message: "Gagal menghapus admin." };
  }
}