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

  const siteUrl = process.env.NEXTAUTH_URL?.replace(/\/$/, "") || "";

  // Data produk/pesanan yang dikirim ke iPaymu
  const body = {
    product: ["Pesanan Batik Aryn Putra - " + orderData.orderId],
    qty: [1],
    price: [orderData.amount],
    returnUrl: `${siteUrl}/pesanan/sukses`,
    cancelUrl: `${siteUrl}/pesanan/batal`,
    notifyUrl: `${siteUrl}/api/webhook/ipaymu`,
    referenceId: orderData.orderId,
    buyerName: orderData.buyerName,
    buyerEmail: orderData.buyerEmail,
    buyerPhone: orderData.buyerPhone,
  };

  // iPaymu v2 Signature Generation (Keamanan Request)
  const jsonBody = JSON.stringify(body);
  const hashBody = crypto.createHash("sha256").update(jsonBody).digest("hex");
  const stringToSign = `POST:${va}:${hashBody}:${apiKey}`;
  const signature = crypto
    .createHmac("sha256", apiKey!)
    .update(stringToSign)
    .digest("hex");

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        signature: signature,
        va: va!,
      },
      body: jsonBody,
    });

    const result = await response.json();

    // LOG UNTUK MELIHAT JAWABAN IPAYMU
    console.log("==== [DEBUG IPAYMU RESPONSE] ====");
    console.log(result);
    console.log("=================================");

    if (result.Status === 200 || result.Success === true) {
      return {
        success: true,
        paymentUrl: result.Data.Url,
        sessionId: result.Data.SessionID,
      };
    } else {
      return {
        success: false,
        message: result.Message || "Gagal membuat transaksi iPaymu.",
      };
    }
  } catch (error) {
    console.error("iPaymu Error:", error);
    return { success: false, message: "Terjadi kesalahan koneksi ke iPaymu." };
  }
}
