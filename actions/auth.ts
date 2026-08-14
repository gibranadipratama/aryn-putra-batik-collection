"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: any) {
  try {
    const { name, email, password } = formData;

    // 1. Cek apakah email sudah dipakai
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, message: "Email sudah terdaftar. Silakan gunakan email lain atau masuk (login)." };
    }

    // 2. Enkripsi password (Hashing)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Simpan ke database
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER", // Otomatis menjadi pelanggan biasa
      },
    });

    return { success: true, message: "Pendaftaran berhasil! Silakan login." };
  } catch (error) {
    console.error("Error register:", error);
    return { success: false, message: "Terjadi kesalahan sistem saat mendaftar." };
  }
}