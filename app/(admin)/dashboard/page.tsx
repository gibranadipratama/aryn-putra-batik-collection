import { getDashboardStats } from "@/actions/dashboard";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  // Ambil rangkuman data dari database
  const stats = await getDashboardStats();

  // Kirim data ke komponen tampilan
  return <DashboardClient stats={stats} />;
}