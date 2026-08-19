import { getAdmins } from "@/actions/admin";
import AdminClient from "./AdminClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Ambil daftar admin
  const admins = await getAdmins();
  
  // Ambil sesi user yang sedang login saat ini
  const session = await getServerSession(authOptions);

  return (
    <AdminClient 
      admins={admins} 
      currentUser={session?.user}
    />
  );
}