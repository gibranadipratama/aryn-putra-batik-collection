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

    if (!user.phone || !user.address) {
      return {
        success: false,
        requireProfileUpdate: true,
        message: "Harap lengkapi Alamat dan Nomor HP di pengaturan profil sebelum checkout.",
      };
    }

    let totalAmount = 0;
    const orderItemsData = [];

    // 2. Hitung Total Harga & Siapkan Data Item
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

    // 4. Request URL Pembayaran ke iPaymu TERLEBIH DAHULU (agar URL-nya dapat)
    const orderNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const paymentResult = await createIpaymuPayment({
      orderId: orderNumber,
      amount: totalAmount,
      buyerName: user.name || "Pelanggan",
      buyerEmail: user.email,
      buyerPhone: user.phone || "080000000000",
    });

    const paymentUrl = paymentResult.success && paymentResult.paymentUrl ? paymentResult.paymentUrl : null;

    // 5. Simpan Data Pesanan (Order) BESERTA paymentUrl ke Database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        totalAmount,
        status: "PENDING",
        shippingAddress: user.address,
        customerName: user.name || "Pelanggan",
        customerPhone: user.phone,
        paymentUrl: paymentUrl,
        items: {
          create: orderItemsData,
        },
      },
    });

    // 6. Kosongkan Keranjang Belanja
    await prisma.cartItem.deleteMany({
      where: { cartId: user.cart.id },
    });

    revalidatePath("/keranjang");

    if (paymentUrl) {
      return { 
        success: true, 
        orderId: order.id, 
        orderNumber: order.orderNumber, 
        paymentUrl: paymentUrl, 
        message: "Pesanan dibuat! Mengarahkan ke pembayaran..." 
      };
    } else {
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