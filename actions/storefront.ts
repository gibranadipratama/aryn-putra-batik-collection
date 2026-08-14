"use server";

import prisma from "@/lib/prisma";

export async function getProductsByCategorySlug(slug: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: {
          slug: slug, 
        },
      },
      include: {
        category: true,
        variants: true,
      },
      orderBy: { createdAt: "desc" },
    });
    
    return products;
  } catch (error) {
    console.error("Gagal mengambil data produk publik:", error);
    return [];
  }
}