"use server";

import prisma from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

// 1. Mengambil semua data pesanan
export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: true, // Mengambil detail barang yang dibeli (OrderItem)
      },
    });
    return orders;
  } catch (error) {
    console.error("Gagal mengambil data pesanan:", error);
    return [];
  }
}

// 2. MENGUBAH STATUS PESANAN
export async function updateOrderStatus(id: string, newStatus: string) {
  try {
    await prisma.order.update({
      where: { id },
      data: { status: newStatus as OrderStatus }, 
    });
    
    return { success: true, message: `Status pesanan berhasil diubah menjadi ${newStatus}` };
  } catch (error) {
    console.error("Gagal mengubah status pesanan:", error);
    return { success: false, message: "Gagal mengubah status pesanan." };
  }
}