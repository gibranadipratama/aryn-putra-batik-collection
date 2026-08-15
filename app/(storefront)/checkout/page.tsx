import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import CheckoutClient from "./CheckoutClient";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;

  // Tarik data user dan keranjang
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      cart: {
        include: {
          items: {
            include: { variant: { include: { product: true } } }
          }
        }
      }
    }
  });

  const cartItems = user?.cart?.items || [];

  // Tolak akses jika keranjang kosong
  if (cartItems.length === 0) {
    redirect("/keranjang");
  }

  return <CheckoutClient user={user} cartItems={cartItems} />;
}