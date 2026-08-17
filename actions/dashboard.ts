"use server";

import prisma from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function getDashboardStats() {
  try {
    // 1. Gunakan enum status yang tersedia di Prisma
    const completedOrders = await prisma.order.findMany({
      where: {
        status: {
          in: [
            OrderStatus.PROCESSING,
            OrderStatus.SHIPPED,
            OrderStatus.DELIVERED,
          ],
        },
      },
    });
    
    const totalRevenue = completedOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    const totalOrders = await prisma.order.count();
    const totalCustomers = await prisma.user.count(); 

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    const lowStockItems = await prisma.productVariant.findMany({
      where: { stock: { lt: 5 } },
      include: { product: true },
      take: 5, 
    });

    return {
      totalRevenue,
      totalOrders,
      totalCustomers,
      recentOrders,
      lowStockItems,
    };
  } catch (error) {
    console.error("Gagal mengambil data dashboard:", error);
    return {
      totalRevenue: 0,
      totalOrders: 0,
      totalCustomers: 0,
      recentOrders: [],
      lowStockItems: [],
    };
  }
}