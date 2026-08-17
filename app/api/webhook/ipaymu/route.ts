import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // 1. Ambil data yang dikirimkan oleh server iPaymu
    const data = await req.json();

    // 2. Tangkap parameter penting
    // reference_id adalah orderNumber (contoh: INV-123...) yang kita kirim saat checkout
    const referenceId = data.reference_id; 
    const statusCode = data.status_code; 
    const status = data.status;

    // Pastikan referenceId ada agar tidak error
    if (!referenceId) {
      return NextResponse.json({ success: false, message: "Reference ID tidak ditemukan." }, { status: 400 });
    }

    // 3. Cek Status Pembayaran
    // Kode 1 (atau status "success" / "berhasil") artinya pembayaran telah lunas
    if (statusCode === 1 || status?.toLowerCase() === "success" || status?.toLowerCase() === "berhasil") {
      
      await prisma.order.update({
        where: { orderNumber: referenceId },
        data: { status: "PROCESSING" }, // Ubah status jadi Diproses/Lunas
      });

      return NextResponse.json({ success: true, message: "Pesanan berhasil dilunasi." });
    }

    // 4. (Opsional) Jika pembayaran expired atau dibatalkan
    // Kode -2 atau -3 biasanya berarti pembayaran gagal atau kadaluarsa
    if (statusCode === -2 || statusCode === -3 || status?.toLowerCase() === "expired") {
      
      await prisma.order.update({
        where: { orderNumber: referenceId },
        data: { 
          status: "CANCELLED",
          cancelReason: "Waktu pembayaran telah habis (Expired) atau dibatalkan otomatis oleh sistem."
        },
      });

      return NextResponse.json({ success: true, message: "Pesanan otomatis dibatalkan (Expired/Failed)." });
    }

    // Jika statusnya pending atau hal lain, biarkan saja
    return NextResponse.json({ success: true, message: "Webhook diterima, tapi tidak ada perubahan status." });

  } catch (error) {
    console.error("Error Webhook iPaymu:", error);
    return NextResponse.json({ success: false, message: "Terjadi kesalahan internal pada server Webhook." }, { status: 500 });
  }
}