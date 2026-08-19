import { getCustomers } from "@/actions/customer";
import PelangganClient from "../pelanggan/PelangganClient";

export const dynamic = "force-dynamic";

export default async function PelangganPage() {
  // Ambil data pelanggan dari database
  const customers = await getCustomers();

  // Kirim data ke Client Component
  return <PelangganClient customers={customers} />;
}