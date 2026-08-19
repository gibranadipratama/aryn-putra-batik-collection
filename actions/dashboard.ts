"use server";

import prisma from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function getDashboardStats() {
  try {
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
    
    // 1. Total Pendapatan Keseluruhan
    const totalRevenue = completedOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // 2. LOGIKA PENDAPATAN BULAN INI
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Tanggal 1 bulan ini
    
    const thisMonthRevenue = completedOrders
      .filter((order) => new Date(order.createdAt) >= startOfMonth)
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    const totalOrders = await prisma.order.count();
    const totalCustomers = await prisma.user.count(); 

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    const lowStockItems = await prisma.productVariant.findMany({
      where: { stock: { lte: 5 } },
      include: { product: true },
      orderBy: { stock: "asc" },
      take: 5, 
    });

    return {
      totalRevenue,
      thisMonthRevenue,
      totalOrders,
      totalCustomers,
      recentOrders,
      lowStockItems,
    };
  } catch (error) {
    console.error("Gagal mengambil data dashboard:", error);
    return {
      totalRevenue: 0,
      thisMonthRevenue: 0,
      totalOrders: 0,
      totalCustomers: 0,
      recentOrders: [],
      lowStockItems: [],
    };
  }
}