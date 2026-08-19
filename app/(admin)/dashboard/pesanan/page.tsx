import { getOrders } from "@/actions/order";
import PesananClient from "../pesanan/PesananClient";

export const dynamic = "force-dynamic";

export default async function PesananPage() {
  // Ambil data dari database
  const orders = await getOrders();

  // Kirim data ke Client Component
  return <PesananClient orders={orders} />;
}