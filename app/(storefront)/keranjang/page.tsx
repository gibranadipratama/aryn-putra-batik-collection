import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; 
import { getCart } from "@/actions/cart";
import CartClient from "./CartClient";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  // 1. Ambil sesi pengguna yang sedang aktif
    const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }

  // 2. Ambil ID user dari sesi (pastikan callback NextAuth sudah menyertakan id)
  const userId = (session.user as any).id;

  if (!userId) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F4F0E7] p-5 text-center">
        <p className="text-sm font-bold text-red-600">Sesi akun tidak valid. Silakan keluar dan masuk (login) kembali.</p>
      </div>
    );
  }

  // 3. Tarik data keranjang berdasarkan userId dari database
  const res = await getCart(userId);
  const initialItems = res.cart?.items || [];

  return <CartClient initialItems={initialItems} />;
}