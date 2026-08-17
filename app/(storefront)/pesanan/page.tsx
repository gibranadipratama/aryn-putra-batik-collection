import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getOrdersByUser } from "@/actions/order";
import OrdersClient from "./OrdersClient";

export default async function PesananStorefrontPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;

  if (!userId) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F4F0E7] p-5 text-center">
        <p className="text-sm font-bold text-red-600">Sesi akun tidak valid. Silakan keluar dan masuk (login) kembali.</p>
      </div>
    );
  }

  const res = await getOrdersByUser(userId);

  // 👇 TAMBAHKAN userId={userId} DI SINI 👇
  return <OrdersClient orders={res.orders || []} userId={userId} />;
}