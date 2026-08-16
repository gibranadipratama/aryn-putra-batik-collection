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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<any>(null);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<string | null>(null);

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
    setFormData({ name: admin.name, email: admin.email, password: "" }); 
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
    <div className="mx-auto max-w-7xl font-sans">
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end rounded-xl border-2 border-(--color-border) bg-(--color-surface) px-6 py-6 shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2)">Keamanan & Sistem</p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-4xl">Kelola Admin</h1>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 rounded-md border-2 border-(--color-primary-dark) bg-(--color-primary-dark) px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-(--color-surface) shadow-[3px_3px_0_rgba(99,50,26,0.4)] transition-all hover:-translate-y-0.5 hover:bg-(--color-primary)">
          <Plus className="h-4 w-4" /> Tambah Admin Baru
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-text-secondary)" />
          <input 
            placeholder="Cari nama atau email admin..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border-2 border-(--color-border) bg-(--color-surface) py-3.5 pl-10 pr-4 text-xs font-medium text-(--color-text-primary) outline-none transition-all focus:border-(--color-primary) focus:shadow-[4px_4px_0_rgba(139,94,60,0.2)]" 
          />
        </div>
      </div>

      {/* TABEL ADMIN */}
      {filteredAdmins.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-(--color-border) bg-(--color-surface) p-16 text-center shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-(--color-border) bg-(--color-bg)">
            <ShieldCheck className="h-8 w-8 text-(--color-text-secondary)" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-wider text-(--color-primary-dark)">Tidak Ada Data</h3>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border-2 border-(--color-border) bg-(--color-surface) shadow-[6px_6px_0_rgba(139,94,60,0.25)]">
          <table className="w-full text-left text-xs text-(--color-text-primary)">
            <thead className="border-b-2 border-(--color-border) bg-(--color-bg) text-[9px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
              <tr>
                <th className="px-6 py-4">Nama Admin</th>
                <th className="px-6 py-4">Email / Kontak</th>
                <th className="px-6 py-4">Role Akses</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed divide-(--color-border)">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="transition hover:bg-(--color-bg)">
                  <td className="px-6 py-4 font-black uppercase text-(--color-primary-dark)">{admin.name}</td>
                  <td className="px-6 py-4 text-(--color-text-secondary)">{admin.email}</td>
                  <td className="px-6 py-4">
                    <span className="flex w-max items-center gap-1.5 rounded-md border border-(--color-success) bg-(--color-success)/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-(--color-success)">
                      <ShieldCheck className="h-3 w-3" /> Administrator
                    </span>
                  </td>
                  <td className="flex items-center justify-center gap-2 px-6 py-4 text-center">
                    <button onClick={() => handleEdit(admin)} className="rounded border border-(--color-border) bg-(--color-surface) p-2 text-(--color-text-primary) shadow-[2px_2px_0_rgba(139,94,60,0.2)] transition hover:-translate-y-0.5 hover:bg-(--color-primary) hover:text-(--color-surface)">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDeleteClick(admin.id)} className="rounded border border-(--color-danger) bg-(--color-surface) p-2 text-(--color-danger) shadow-[2px_2px_0_rgba(168,69,47,0.2)] transition hover:-translate-y-0.5 hover:bg-(--color-danger) hover:text-white">
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
          <div className="absolute inset-0 bg-(--color-primary-dark)/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-md rounded-xl border-2 border-(--color-border) bg-(--color-surface) shadow-[8px_8px_0_rgba(139,94,60,0.3)]">
            <div className="flex items-center justify-between border-b-2 border-(--color-border) bg-(--color-bg) px-6 py-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-(--color-primary-dark)">
                {editingAdmin ? "Edit Data Admin" : "Tambah Admin Baru"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="rounded-full p-2 text-(--color-text-secondary) transition hover:bg-(--color-border) hover:text-(--color-primary-dark)"><X className="h-5 w-5" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              <div>
                <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                  <User className="h-3 w-3" /> Nama Lengkap
                </label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) p-3 text-xs outline-none transition focus:border-(--color-primary)" />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                  <Mail className="h-3 w-3" /> Alamat Email
                </label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) p-3 text-xs outline-none transition focus:border-(--color-primary)" />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                  <Lock className="h-3 w-3" /> Kata Sandi (Password)
                </label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder={editingAdmin ? "Biarkan kosong jika tidak ingin mengubah password" : "Buat password yang kuat"} className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) p-3 text-xs outline-none transition focus:border-(--color-primary)" />
              </div>

              <button type="submit" disabled={isPending} className="mt-4 w-full rounded-md border-2 border-(--color-primary-dark) bg-(--color-primary-dark) py-3.5 text-xs font-bold uppercase tracking-widest text-(--color-surface) shadow-[4px_4px_0_rgba(99,50,26,0.3)] transition hover:-translate-y-0.5 hover:bg-(--color-primary) disabled:opacity-50">
                {isPending ? "Menyimpan..." : "Simpan Data"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS */}
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