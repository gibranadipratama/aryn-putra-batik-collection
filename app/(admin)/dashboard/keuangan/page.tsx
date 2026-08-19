import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { getFinanceReport } from "@/actions/finance";
import FinanceClient from "./FinanceClient";

export const dynamic = "force-dynamic";

export default async function KeuanganPage() {
  const session = await getServerSession(authOptions);
  
  const user = session?.user as any;

  // 3. Cek apakah role-nya bukan SUPERADMIN
  if (user?.role !== "SUPERADMIN") {
    // Tendang kembali ke dashboard utama jika bukan superadmin
    redirect("/dashboard"); 
  }

  const report = await getFinanceReport();

  return (
    <main>
      <FinanceClient report={report} />
    </main>
  );
}