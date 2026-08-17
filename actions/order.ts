"use server";

import prisma from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

// 1. Mengambil semua data pesanan (untuk admin)
export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            variant: {
              include: { product: true },
            },
          },
        },
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

    return {
      success: true,
      message: `Status pesanan berhasil diubah menjadi ${newStatus}`,
    };
  } catch (error) {
    console.error("Gagal mengubah status pesanan:", error);
    return { success: false, message: "Gagal mengubah status pesanan." };
  }
}

// 3. Mengambil pesanan milik satu pelanggan (untuk halaman /pesanan storefront)
export async function getOrdersByUser(userId: string) {
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: { variant: { include: { product: true } } },
        },
      },
    });
    return { success: true, orders };
  } catch (error) {
    console.error("Gagal mengambil pesanan pelanggan:", error);
    return {
      success: false,
      message: "Gagal mengambil daftar pesanan.",
      orders: [],
    };
  }
}

// 4. Mengambil detail satu pesanan, khusus untuk pemiliknya
export async function getOrderDetail(orderNumber: string, userId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: { include: { variant: { include: { product: true } } } },
      },
    });

    if (!order) return { success: false, message: "Pesanan tidak ditemukan." };
    if (order.userId !== userId)
      return {
        success: false,
        message: "Anda tidak memiliki akses ke pesanan ini.",
      };

    return { success: true, order };
  } catch (error) {
    console.error("Gagal mengambil detail pesanan:", error);
    return { success: false, message: "Gagal mengambil detail pesanan." };
  }
}


// Batalkan pesanan dengan alasan
export async function cancelOrder(orderId: string, reason: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "CANCELLED",
        cancelReason: reason,
      },
    });

    revalidatePath("/pesanan");
    revalidatePath("/dashboard/pesanan");
    
    return { success: true, message: "Pesanan berhasil dibatalkan." };
  } catch (error) {
    console.error("Error cancelOrder:", error);
    return { success: false, message: "Gagal membatalkan pesanan." };
  }
}

// Hapus riwayat pesanan (khusus pesanan yang sudah dibatalkan/selesai)
export async function deleteOrderHistory(orderId: string, userId: string) {
  try {
    // Pastikan pesanan benar-benar milik user tersebut dan statusnya CANCELLED
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: userId }
    });

    if (!order) {
      return { success: false, message: "Pesanan tidak ditemukan." };
    }

    if (order.status !== "CANCELLED") {
      return { success: false, message: "Hanya pesanan yang dibatalkan yang dapat dihapus." };
    }

    // Hapus item terkait dulu lalu hapus order-nya
    await prisma.orderItem.deleteMany({ where: { orderId: orderId } });
    await prisma.order.delete({ where: { id: orderId } });

    revalidatePath("/pesanan");
    return { success: true, message: "Riwayat pesanan berhasil dihapus." };
  } catch (error) {
    console.error("Error deleteOrderHistory:", error);
    return { success: false, message: "Gagal menghapus riwayat pesanan." };
  }
}