"use server";

import crypto from "crypto";

export async function createIpaymuPayment(orderData: {
  orderId: string;
  amount: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
}) {
  const va = process.env.IPAYMU_VA;
  const apiKey = process.env.IPAYMU_API_KEY;
  const isProd = process.env.IPAYMU_MODE === "production";
  
  // URL Endpoint iPaymu (Sandbox vs Production)
  const baseUrl = isProd 
    ? "https://my.ipaymu.com/api/v2/payment" 
    : "https://sandbox.ipaymu.com/api/v2/payment";

  // Data produk/pesanan yang dikirim ke iPaymu
  const body = {
    product: ["Pesanan Batik Aryn Putra - " + orderData.orderId],
    qty: [1],
    price: [orderData.amount],
    returnUrl: `${process.env.NEXTAUTH_URL}/pesanan/sukses`,
    cancelUrl: `${process.env.NEXTAUTH_URL}/pesanan/batal`,
    notifyUrl: `${process.env.NEXTAUTH_URL}/api/webhook/ipaymu`, // Untuk tangkap status otomatis
    referenceId: orderData.orderId, // ID unik pesanan di database Anda
    buyerName: orderData.buyerName,
    buyerEmail: orderData.buyerEmail,
    buyerPhone: orderData.buyerPhone,
  };

  // iPaymu v2 Signature Generation (Keamanan Request)
  const jsonBody = JSON.stringify(body);
  const hashBody = crypto.createHash('sha256').update(jsonBody).digest('hex');
  const stringToSign = `POST:${va}:${hashBody}:${apiKey}`;
  const signature = crypto.createHmac('sha256', apiKey!).update(stringToSign).digest('hex');

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Hapus 'key: apiKey!' karena iPaymu v2 hanya butuh va dan signature
        signature: signature,
        va: va!,
      },
      body: jsonBody,
    });

    const result = await response.json();

    // 👇 TAMBAHKAN LOG INI UNTUK MELIHAT JAWABAN ASLI IPAYMU 👇
    console.log("==== [DEBUG IPAYMU RESPONSE] ====");
    console.log(result);
    console.log("=================================");

    // iPaymu menggunakan huruf kapital (Status, Success, Data, Url, SessionID, Message)
    if (result.Status === 200 || result.Success === true) {
      return {
        success: true,
        paymentUrl: result.Data.Url, 
        sessionId: result.Data.SessionID,
      };
    } else {
      return { success: false, message: result.Message || "Gagal membuat transaksi iPaymu." };
    }
  } catch (error) {
    console.error("iPaymu Error:", error);
    return { success: false, message: "Terjadi kesalahan koneksi ke iPaymu." };
  }
}