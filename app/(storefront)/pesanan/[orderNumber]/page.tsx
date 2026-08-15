import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getOrderDetail } from "@/actions/order";
import OrderDetailClient from "./OrderDetailClient";

export default async function OrderDetailPage({ params }: { params: { orderNumber: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const res = await getOrderDetail(params.orderNumber, userId);

  if (!res.success || !res.order) {
    notFound();
  }

  return <OrderDetailClient order={res.order} />;
}