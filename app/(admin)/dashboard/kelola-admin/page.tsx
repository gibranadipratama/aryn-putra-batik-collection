import { getAdmins } from "@/actions/admin";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const admins = await getAdmins();

  return <AdminClient admins={admins} />;
}