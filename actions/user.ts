"use server";

import prisma from "../lib/prisma"; 
import { Role } from "@prisma/client";

export async function getCustomers() {
  try {
    const customers = await prisma.user.findMany({
      where: {
        role: Role.USER, // Hanya mengambil akun dengan role USER (pelanggan)
      },
      include: {
        _count: {
          select: { orders: true }, // Menghitung otomatis total pesanan per pelanggan
        },
      },
      orderBy: {
        createdAt: "desc", // Urutkan dari pelanggan terbaru
      },
    });
    
    return customers;
  } catch (error) {
    console.error("Gagal mengambil data pelanggan:", error);
    return [];
  }
}