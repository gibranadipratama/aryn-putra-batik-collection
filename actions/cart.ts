"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Mengambil data keranjang pelanggan
export async function getCart(userId: string) {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          orderBy: { id: 'asc' },
          include: {
            variant: {
              include: { product: true }
            }
          }
        }
      }
    });
    return { success: true, cart };
  } catch (error) {
    return { success: false, message: "Gagal mengambil keranjang." };
  }
}

// 2. Mengubah jumlah barang (Validasi Stok)
export async function updateCartItemQuantity(itemId: string, newQuantity: number) {
  try {
    // Cari item dan cek stok variannya
    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { variant: true }
    });

    if (!item) return { success: false, message: "Barang tidak ditemukan." };

    if (newQuantity > item.variant.stock) {
      return { success: false, message: `Sisa stok hanya ${item.variant.stock} pcs.` };
    }

    if (newQuantity < 1) return { success: false, message: "Jumlah minimal adalah 1." };

    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: newQuantity }
    });

    revalidatePath("/keranjang");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal mengupdate jumlah." };
  }
}

// 3. Menghapus barang dari keranjang
export async function removeCartItem(itemId: string) {
  try {
    await prisma.cartItem.delete({
      where: { id: itemId }
    });
    revalidatePath("/keranjang");
    return { success: true, message: "Barang berhasil dihapus." };
  } catch (error) {
    return { success: false, message: "Gagal menghapus barang." };
  }
}

// 4. Menambahkan barang ke keranjang dari Halaman Produk
export async function addToCart(userId: string, variantId: string, quantity: number = 1) {
  try {
    // 1. Cari keranjang milik user, jika belum ada, buatkan baru
    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    // 2. Cek apakah stok varian mencukupi
    const variant = await prisma.productVariant.findUnique({ where: { id: variantId } });
    if (!variant) return { success: false, message: "Varian tidak ditemukan." };
    if (variant.stock < quantity) return { success: false, message: "Maaf, stok tidak mencukupi." };

    // 3. Cek apakah barang dengan ukuran yang sama sudah ada di keranjang
    const existingItem = await prisma.cartItem.findUnique({
      where: { 
        cartId_variantId: { cartId: cart.id, variantId: variantId } 
      }
    });

    if (existingItem) {
      // Jika sudah ada, tambahkan jumlahnya
      const newQty = existingItem.quantity + quantity;
      if (newQty > variant.stock) return { success: false, message: "Batas maksimal stok tercapai di keranjang." };
      
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQty }
      });
    } else {
      // Jika belum ada, buat item baru di keranjang
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          variantId: variantId,
          quantity: quantity
        }
      });
    }

    revalidatePath("/keranjang");
    return { success: true, message: "Barang berhasil ditambahkan!" };
  } catch (error) {
    console.error("Error addToCart:", error);
    return { success: false, message: "Terjadi kesalahan server saat memasukkan ke keranjang." };
  }
}