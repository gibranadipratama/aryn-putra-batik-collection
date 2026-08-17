"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createIpaymuPayment } from "@/actions/payment";

export async function processCheckout(userId: string) {
  try {
    // 1. Ambil data user beserta keranjang dan profil lengkapnya
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        cart: {
          include: {
            items: { include: { variant: { include: { product: true } } } },
          },
        },
      },
    });

    if (!user || !user.cart || user.cart.items.length === 0) {
      return { success: false, message: "Keranjang Anda kosong." };
    }

    // WAJIB: Pastikan pelanggan sudah mengisi alamat dan no HP di profil
    if (!user.phone || !user.address) {
      return {
        success: false,
        requireProfileUpdate: true,
        message:
          "Harap lengkapi Alamat dan Nomor HP di pengaturan profil sebelum checkout.",
      };
    }

    let totalAmount = 0;
    const orderItemsData = [];

    // 2. Hitung Total Harga & Siapkan Data Item secara Server-Side
    for (const item of user.cart.items) {
      const product = item.variant.product;

      const discountValue = product.discount ?? 0;

      const finalPrice =
        discountValue > 0
          ? product.price - (product.price * discountValue) / 100
          : product.price;

      totalAmount += finalPrice * item.quantity;

      orderItemsData.push({
        variantId: item.variantId,
        quantity: item.quantity,
        price: finalPrice,
      });

      // 3. Kurangi Stok Barang di Database
      await prisma.productVariant.update({
        where: { id: item.variantId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // 4. Buat Nomor Invoice Unik & Simpan Data Pesanan (Order)
    const orderNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        totalAmount,
        status: "PENDING",
        shippingAddress: user.address,
        customerName: user.name || "Pelanggan",
        customerPhone: user.phone,
        items: {
          create: orderItemsData,
        },
      },
    });

    // 5. Kosongkan Keranjang Belanja
    await prisma.cartItem.deleteMany({
      where: { cartId: user.cart.id },
    });

    revalidatePath("/keranjang");

    const paymentResult = await createIpaymuPayment({
      orderId: order.orderNumber, // Gunakan nomor invoice
      amount: totalAmount,        // Total harga dari kalkulasi keranjang
      buyerName: user.name || "Pelanggan",
      buyerEmail: user.email,
      buyerPhone: user.phone || "080000000000",
    });

    if (paymentResult.success && paymentResult.paymentUrl) {
      // Jika berhasil tembus ke iPaymu, kembalikan URL pembayaran ke frontend
      return { 
        success: true, 
        orderId: order.id, 
        orderNumber: order.orderNumber, 
        paymentUrl: paymentResult.paymentUrl, // <-- URL INI YANG AKAN DIBUKA PEMBELI
        message: "Pesanan dibuat! Mengarahkan ke pembayaran..." 
      };
    } else {
      // Jika iPaymu sedang error, pesanan tetap tersimpan sebagai PENDING, 
      // tapi kita beritahu user bahwa sistem pembayaran sedang gangguan
      return {
        success: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        paymentUrl: null,
        message: "Pesanan dibuat, tetapi gagal memuat halaman pembayaran. " + paymentResult.message
      };
    }

  } catch (error) {
    console.error("Error Checkout:", error);
    return { success: false, message: "Terjadi kesalahan sistem saat checkout." };
  }
}

