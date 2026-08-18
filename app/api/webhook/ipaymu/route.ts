import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // 1. Ambil data yang dikirimkan oleh server iPaymu (form-urlencoded)
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    // 2. Tangkap parameter penting
    const referenceId = data.reference_id;
    const statusCode = Number(data.status_code); // form values arrive as strings
    const status = data.status;

    // Pastikan referenceId ada agar tidak error
    if (!referenceId) {
      return NextResponse.json({ success: false, message: "Reference ID tidak ditemukan." }, { status: 400 });
    }

    // 3. Cek Status Pembayaran
    if (statusCode === 1 || status?.toLowerCase() === "success" || status?.toLowerCase() === "berhasil") {
      await prisma.order.update({
        where: { orderNumber: referenceId },
        data: { status: "PROCESSING" },
      });
      return NextResponse.json({ success: true, message: "Pesanan berhasil dilunasi." });
    }

    // 4. Expired / dibatalkan
    if (statusCode === -2 || statusCode === -3 || status?.toLowerCase() === "expired") {
      await prisma.order.update({
        where: { orderNumber: referenceId },
        data: {
          status: "CANCELLED",
          cancelReason: "Waktu pembayaran telah habis (Expired) atau dibatalkan otomatis oleh sistem.",
        },
      });
      return NextResponse.json({ success: true, message: "Pesanan otomatis dibatalkan (Expired/Failed)." });
    }

    return NextResponse.json({ success: true, message: "Webhook diterima, tapi tidak ada perubahan status." });
  } catch (error) {
    console.error("Error Webhook iPaymu:", error);
    return NextResponse.json({ success: false, message: "Terjadi kesalahan internal pada server Webhook." }, { status: 500 });
  }
}