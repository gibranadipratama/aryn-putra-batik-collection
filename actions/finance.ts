"use server";

import prisma from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function getFinanceReport() {
  try {
    // 1. Ambil semua pesanan yang sudah dibayar/selesai
    const completedOrders = await prisma.order.findMany({
      where: {
        status: { in: [OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.DELIVERED] },
      },
      orderBy: { createdAt: "asc" },
    });

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    // Objek sementara untuk mengelompokkan pendapatan
    const monthlyData: Record<string, { label: string; revenue: number }> = {};
    let totalRevenue = 0;

    // 2. Kelompokkan data per bulan
    completedOrders.forEach((order) => {
      const amount = order.totalAmount || 0;
      totalRevenue += amount;
      
      const date = new Date(order.createdAt);
      const key = `${date.getFullYear()}-${date.getMonth()}`; // Cth: "2026-7"
      const label = `${monthNames[date.getMonth()]} ${date.getFullYear()}`; // Cth: "Agustus 2026"
      
      if (!monthlyData[key]) {
        monthlyData[key] = { label, revenue: 0 };
      }
      monthlyData[key].revenue += amount;
    });

    // Ubah ke bentuk array dan balik urutannya (terbaru di atas)
    const history = Object.values(monthlyData).reverse();

    // 3. Logika Analisis (Bulan Ini vs Bulan Lalu)
    const now = new Date();
    const currentKey = `${now.getFullYear()}-${now.getMonth()}`;
    
    let lastMonthYear = now.getFullYear();
    let lastMonthIndex = now.getMonth() - 1;
    if (lastMonthIndex < 0) {
      lastMonthIndex = 11;
      lastMonthYear -= 1;
    }
    const lastMonthKey = `${lastMonthYear}-${lastMonthIndex}`;

    const currentMonthRevenue = monthlyData[currentKey]?.revenue || 0;
    const lastMonthRevenue = monthlyData[lastMonthKey]?.revenue || 0;

    let trend = "SAMA"; // NAIK, TURUN, SAMA
    let percentage = 0;

    if (lastMonthRevenue > 0) {
      const diff = currentMonthRevenue - lastMonthRevenue;
      percentage = Math.abs((diff / lastMonthRevenue) * 100);
      if (diff > 0) trend = "NAIK";
      else if (diff < 0) trend = "TURUN";
    } else if (currentMonthRevenue > 0) {
      trend = "NAIK";
      percentage = 100;
    }

    return {
      history,
      currentMonthRevenue,
      lastMonthRevenue,
      trend,
      percentage: percentage.toFixed(1), // Ambil 1 angka di belakang koma
      totalRevenue,
    };

  } catch (error) {
    console.error("Gagal mengambil data keuangan:", error);
    return null;
  }
}