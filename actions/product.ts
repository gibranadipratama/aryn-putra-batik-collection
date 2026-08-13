"use server";

import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";

// create produk
export async function createProduct(formData: {
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: string;
  images: string[];
  variants: { size: string; stock: number }[];
}) {
  try {
    // 1. Simpan produk baru beserta variannya ke database menggunakan Prisma
    await prisma.product.create({
      data: {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        price: Number(formData.price),
        images: formData.images,
        categoryId: formData.categoryId,
        // Menyimpan varian ukuran dan stok secara otomatis bersama produk
        variants: {
          create: formData.variants.map((v) => ({
            size: v.size,
            stock: Number(v.stock),
          })),
        },
      },
    });

    // 2. Revalidasi halaman produk agar data terbaru langsung muncul di UI
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
      take: 3, // Mengambil 3 produk terbaru untuk beranda
      orderBy: { createdAt: "desc" },
      include: {
        category: true, // Mengambil data relasi kategori
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
        // Jika ada parameter pencarian, cari berdasarkan nama produk
        name: search ? { contains: search, mode: "insensitive" } : undefined,
        // Jika ada parameter kategori, filter berdasarkan slug kategori
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

// update
export async function updateProduct(id: string, data: any) {
  try {
    // Bersihkan data varian agar hanya mengambil size dan stock
    // Ini mencegah error bentrok ID bawaan database saat proses edit
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
        price: data.price,
        discount: data.discount,
        categoryId: data.categoryId,
        images: data.images,
        variants: {
          deleteMany: {}, // Hapus semua varian lama
          create: cleanVariants, // Masukkan varian baru yang sudah bersih
        },
      },
    });
    return { success: true, message: "Produk berhasil diperbarui!" };
  } catch (error) {
    console.error("Gagal memperbarui produk:", error);
    return { success: false, message: "Gagal memperbarui produk." };
  }
}


// delete
export async function deleteProduct(id: string) {
  try {
    // Prisma akan otomatis menghapus varian yang terhubung jika onUpdate/onDelete cascade diatur,
    // Jika tidak, kita hapus variannya terlebih dahulu secara manual agar tidak error relasi
    await prisma.productVariant.deleteMany({
      where: { productId: id },
    });

    await prisma.product.delete({
      where: { id },
    });
    
    return { success: true, message: "Produk berhasil dihapus!" };
  } catch (error) {
    console.error("Gagal menghapus produk:", error);
    return { success: false, message: "Gagal menghapus produk. Produk mungkin terhubung dengan pesanan." };
  }
}