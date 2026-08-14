"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck, Plus, Edit, Trash2, X, Lock, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { createAdmin, updateAdmin, deleteAdmin } from "@/actions/admin";

export default function AdminClient({ admins }: { admins: any[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");

  // State Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<any>(null);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const filteredAdmins = admins.filter(admin => 
    admin.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    admin.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingAdmin(null);
    setFormData({ name: "", email: "", password: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (admin: any) => {
    setEditingAdmin(admin);
    setFormData({ name: admin.name, email: admin.email, password: "" }); // Password dikosongkan untuk keamanan
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setAdminToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!adminToDelete) return;
    startTransition(async () => {
      const res = await deleteAdmin(adminToDelete);
      if (res.success) {
        toast.success(res.message);
        setIsConfirmOpen(false);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdmin && !formData.password) {
      toast.error("Password wajib diisi untuk admin baru!");
      return;
    }

    startTransition(async () => {
      const res = editingAdmin 
        ? await updateAdmin(editingAdmin.id, formData)
        : await createAdmin(formData);

      if (res.success) {
        toast.success(res.message);
        setIsModalOpen(false);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#A88A3D]">Keamanan & Sistem</p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tighter text-[#0B1F33] md:text-4xl">Kelola Admin</h1>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-[#0B1F33] px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#E8E0D3] shadow-md transition-all hover:bg-[#A88A3D] hover:text-[#0B1F33]">
          <Plus className="h-4 w-4" /> Tambah Admin Baru
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#162A3D]/40" />
          <input 
            placeholder="Cari nama atau email admin..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white shadow-sm border border-[#0B1F33]/5 py-3.5 pl-11 pr-4 text-xs text-[#0B1F33] outline-none transition-all focus:border-[#A88A3D]" 
          />
        </div>
      </div>

      {/* TABEL ADMIN */}
      {filteredAdmins.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white shadow-sm border border-[#0B1F33]/5 p-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0B1F33]/5">
            <ShieldCheck className="h-8 w-8 text-[#0B1F33]/30" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F33]">Tidak Ada Data</h3>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-sm border border-[#0B1F33]/5">
          <table className="w-full text-left text-xs text-[#0B1F33]">
            <thead className="bg-[#0B1F33] text-[#E8E0D3] uppercase tracking-widest text-[9px] font-bold">
              <tr>
                <th className="px-6 py-4">Nama Admin</th>
                <th className="px-6 py-4">Email / Kontak</th>
                <th className="px-6 py-4">Role Akses</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0B1F33]/5">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="transition hover:bg-[#0B1F33]/5">
                  <td className="px-6 py-4 font-black uppercase">{admin.name}</td>
                  <td className="px-6 py-4 text-[#0B1F33]/70">{admin.email}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-sm flex w-max items-center gap-1.5">
                      <ShieldCheck className="h-3 w-3" /> Administrator
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                    <button onClick={() => handleEdit(admin)} className="bg-[#EDE6DA] p-2 hover:bg-[#0B1F33] hover:text-[#E8E0D3] transition">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDeleteClick(admin.id)} className="bg-red-50 text-red-600 p-2 hover:bg-red-600 hover:text-white transition">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL FORM TAMBAH/EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0B1F33]/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#0B1F33]/10 bg-[#F4F0E7] px-6 py-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#0B1F33]">
                {editingAdmin ? "Edit Data Admin" : "Tambah Admin Baru"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-red-500"><X className="h-5 w-5" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0B1F33]/70">
                  <User className="h-3 w-3" /> Nama Lengkap
                </label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-[#0B1F33]/10 bg-[#EDE6DA] p-3 text-xs outline-none focus:border-[#A88A3D]" />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0B1F33]/70">
                  <Mail className="h-3 w-3" /> Alamat Email
                </label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border border-[#0B1F33]/10 bg-[#EDE6DA] p-3 text-xs outline-none focus:border-[#A88A3D]" />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0B1F33]/70">
                  <Lock className="h-3 w-3" /> Kata Sandi (Password)
                </label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder={editingAdmin ? "Biarkan kosong jika tidak ingin mengubah password" : "Buat password yang kuat"} className="w-full border border-[#0B1F33]/10 bg-[#EDE6DA] p-3 text-xs outline-none focus:border-[#A88A3D]" />
              </div>

              <button type="submit" disabled={isPending} className="mt-4 w-full bg-[#0B1F33] py-3.5 text-xs font-black uppercase tracking-[0.2em] text-[#E8E0D3] transition hover:bg-[#A88A3D] disabled:opacity-50">
                {isPending ? "Menyimpan..." : "Simpan Data"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS (Reusable) */}
      <ConfirmModal 
        isOpen={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)} 
        onConfirm={confirmDelete} 
        title="Hapus Admin?" 
        message="Apakah Anda yakin ingin menghapus admin ini? Mereka akan segera kehilangan akses masuk ke sistem dashboard ini." 
        isLoading={isPending} 
      />
    </div>
  );
}