"use server";

import prisma from "@/lib/prisma";

export async function getCustomers() {
  try {
    // Mengambil data pelanggan. 
    // Catatan: Ubah 'prisma.user' menjadi 'prisma.customer' jika nama model Anda di schema adalah Customer
    const customers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        orders: true, // Mengambil relasi riwayat pesanan agar kita bisa hitung total belanjanya
      },
    });
    return customers;
  } catch (error) {
    console.error("Gagal mengambil data pelanggan:", error);
    return [];
  }
}