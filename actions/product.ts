"use server";

import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";

// create produk
export async function createProduct(formData: {
  name: string;
  slug: string;
  description: string;
  price: number;
  discount?: number; // <-- Ditambahkan
  categoryId: string;
  images: string[];
  variants: { size: string; stock: number }[];
}) {
  try {
    await prisma.product.create({
      data: {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        price: Number(formData.price),
        discount: Number(formData.discount) || 0, // <-- Diskon disimpan di sini
        images: formData.images,
        categoryId: formData.categoryId,
        variants: {
          create: formData.variants.map((v) => ({
            size: v.size,
            stock: Number(v.stock),
          })),
        },
      },
    });

    revalidatePath("/dashboard/produk");
    revalidatePath("/produk");

    return { success: true, message: "Produk berhasil ditambahkan!" };
  } catch (error) {
    console.error("Gagal menambah produk:", error);
    return { success: false, message: "Terjadi kesalahan saat menyimpan produk." };
  }
}

// Produk terbaru
export async function getLatestProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
      },
    });
    return products;
  } catch (error) {
    console.error("Gagal mengambil produk terbaru:", error);
    return [];
  }
}

// search produk
export async function getFilteredProducts(search?: string, categorySlug?: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: search ? { contains: search, mode: "insensitive" } : undefined,
        category: categorySlug ? { slug: categorySlug } : undefined,
      },
      include: {
        category: true,
        variants: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return products;
  } catch (error) {
    console.error("Gagal memuat produk:", error);
    return [];
  }
}

// mengambil semua kategori untuk menu filter
export async function getAllCategories() {
  try {
    return await prisma.category.findMany();
  } catch (error) {
    console.error("Gagal memuat kategori:", error);
    return [];
  }
}

// update produk
export async function updateProduct(id: string, data: any) {
  try {
    const cleanVariants = data.variants.map((v: any) => ({
      size: v.size,
      stock: Number(v.stock),
    }));

    await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: Number(data.price),
        discount: Number(data.discount) || 0, // <-- Pastikan dikonversi ke angka
        categoryId: data.categoryId,
        images: data.images,
        variants: {
          deleteMany: {},
          create: cleanVariants,
        },
      },
    });

    revalidatePath("/dashboard/produk");
    revalidatePath("/produk");
    revalidatePath(`/produk/${data.slug}`);

    return { success: true, message: "Produk berhasil diperbarui!" };
  } catch (error) {
    console.error("Gagal memperbarui produk:", error);
    return { success: false, message: "Gagal memperbarui produk." };
  }
}

// delete produk
export async function deleteProduct(id: string) {
  try {
    await prisma.productVariant.deleteMany({
      where: { productId: id },
    });

    await prisma.product.delete({
      where: { id },
    });
    
    revalidatePath("/dashboard/produk");
    revalidatePath("/produk");

    return { success: true, message: "Produk berhasil dihapus!" };
  } catch (error) {
    console.error("Gagal menghapus produk:", error);
    return { success: false, message: "Gagal menghapus produk. Produk mungkin terhubung dengan pesanan." };
  }
}