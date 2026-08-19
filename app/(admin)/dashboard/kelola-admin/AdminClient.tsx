"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck, Trash2, X, Edit, UserPlus, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ui/ConfirmModal";
// Pastikan semua fungsi di-import, termasuk searchUsers dan promoteToAdmin
import { revokeAdmin, updateAdminRole, searchUsers, promoteToAdmin } from "@/actions/admin";

export default function AdminClient({ admins, currentUser }: { admins: any[]; currentUser: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");

  const isSuperAdmin = currentUser?.role === "SUPERADMIN";

  // State Modal Cabut Akses
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [adminToRevoke, setAdminToRevoke] = useState<string | null>(null);

  // State Modal Ubah Role 
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [adminToEdit, setAdminToEdit] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<"ADMIN" | "SUPERADMIN">("ADMIN");

  // ==========================================
  // STATE BARU: TAMBAH ADMIN DARI PELANGGAN
  // ==========================================
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addSearchQuery, setAddSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedNewAdmin, setSelectedNewAdmin] = useState<any>(null);
  const [newAdminRole, setNewAdminRole] = useState<"ADMIN" | "SUPERADMIN">("ADMIN");
  const [isSearching, setIsSearching] = useState(false);

  const filteredAdmins = admins.filter(admin => 
    admin.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    admin.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fungsi Cari Pelanggan
  const handleSearchUser = async () => {
    if (!addSearchQuery.trim()) return;
    setIsSearching(true);
    const results = await searchUsers(addSearchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  // Fungsi Angkat Pelanggan Jadi Admin
  const handlePromote = () => {
    if (!selectedNewAdmin) return;
    startTransition(async () => {
      const res = await promoteToAdmin(selectedNewAdmin.id, currentUser.email, newAdminRole);
      if (res.success) {
        toast.success(res.message);
        // Reset state modal tambah admin
        setIsAddOpen(false);
        setAddSearchQuery("");
        setSearchResults([]);
        setSelectedNewAdmin(null);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleEditClick = (admin: any) => {
    setAdminToEdit(admin);
    setSelectedRole(admin.role); 
    setIsEditRoleOpen(true);
  };

  const handleUpdateRole = () => {
    if (!adminToEdit) return;
    startTransition(async () => {
      const res = await updateAdminRole(adminToEdit.id, selectedRole, currentUser.email);
      if (res.success) {
        toast.success(res.message);
        setIsEditRoleOpen(false);
        setAdminToEdit(null);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleRevokeClick = (id: string) => {
    setAdminToRevoke(id);
    setIsConfirmOpen(true);
  };

  const confirmRevoke = () => {
    if (!adminToRevoke) return;
    startTransition(async () => {
      const res = await revokeAdmin(adminToRevoke, currentUser.email);
      if (res.success) {
        toast.success(res.message);
        setIsConfirmOpen(false);
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
        
        {/* TOMBOL TAMBAH ADMIN (Hanya muncul untuk Superadmin) */}
        {isSuperAdmin && (
          <button 
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 rounded-md border-2 border-(--color-primary-dark) bg-(--color-primary-dark) px-4 py-3 text-xs font-bold uppercase tracking-widest text-(--color-surface) shadow-[4px_4px_0_rgba(99,50,26,0.3)] transition hover:-translate-y-0.5 hover:bg-(--color-primary)"
          >
            <UserPlus className="h-4 w-4" /> Tambah Admin
          </button>
        )}
      </div>

      {/* SEARCH BAR UNTUK TABEL */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-text-secondary)" />
          <input 
            placeholder="Cari nama atau email admin..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border-2 border-(--color-border) bg-(--color-surface) py-3.5 pl-10 pr-4 text-xs font-medium text-(--color-text-primary) outline-none transition-all focus:border-(--color-primary)" 
          />
        </div>
      </div>

      {/* TABEL ADMIN */}
      <div className="overflow-x-auto rounded-xl border-2 border-(--color-border) bg-(--color-surface) shadow-[6px_6px_0_rgba(139,94,60,0.25)]">
        <table className="w-full text-left text-xs text-(--color-text-primary)">
          <thead className="border-b-2 border-(--color-border) bg-(--color-bg) text-[9px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
            <tr>
              <th className="px-6 py-4">Nama Admin</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role Akses</th>
              {isSuperAdmin && <th className="px-6 py-4 text-center">Aksi</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-dashed divide-(--color-border)">
            {filteredAdmins.map((admin) => (
              <tr key={admin.id} className="transition hover:bg-(--color-bg)">
                <td className="px-6 py-4 font-black uppercase text-(--color-primary-dark)">{admin.name}</td>
                <td className="px-6 py-4 text-(--color-text-secondary)">{admin.email}</td>
                <td className="px-6 py-4">
                  <span className={`flex w-max items-center gap-1.5 rounded-md border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${admin.role === 'SUPERADMIN' ? 'border-purple-500 bg-purple-500/10 text-purple-600' : 'border-(--color-success) bg-(--color-success)/10 text-(--color-success)'}`}>
                    <ShieldCheck className="h-3 w-3" /> {admin.role}
                  </span>
                </td>
                
                {isSuperAdmin && (
                  <td className="flex items-center justify-center gap-2 px-6 py-4 text-center">
                    {admin.email !== currentUser.email && (
                      <>
                        <button onClick={() => handleEditClick(admin)} className="rounded border border-(--color-border) bg-(--color-surface) p-2 text-(--color-text-primary) shadow-[2px_2px_0_rgba(139,94,60,0.2)] transition hover:-translate-y-0.5 hover:bg-(--color-primary) hover:text-(--color-surface)" title="Ubah Role">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleRevokeClick(admin.id)} className="rounded border border-(--color-danger) bg-(--color-surface) p-2 text-(--color-danger) shadow-[2px_2px_0_rgba(168,69,47,0.2)] transition hover:-translate-y-0.5 hover:bg-(--color-danger) hover:text-white" title="Turunkan ke User">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL: TAMBAH ADMIN DARI PELANGGAN */}
      {isAddOpen && isSuperAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-(--color-primary-dark)/70 backdrop-blur-sm" onClick={() => setIsAddOpen(false)} />
          <div className="relative w-full max-w-lg rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[8px_8px_0_rgba(139,94,60,0.3)]">
            <div className="flex items-center justify-between border-b-2 border-(--color-border) pb-4 mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-(--color-primary-dark)">
                Tambah Admin Baru
              </h2>
              <button onClick={() => setIsAddOpen(false)} className="rounded-full p-1 text-(--color-text-secondary)"><X className="h-5 w-5" /></button>
            </div>
            
            <div className="space-y-4">
              {/* Cari Akun */}
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                  Cari Akun Pelanggan (Email/Nama)
                </label>
                <div className="flex gap-2">
                  <input 
                    placeholder="Masukkan nama atau email..." 
                    value={addSearchQuery}
                    onChange={(e) => setAddSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchUser()}
                    className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) py-3 px-4 text-xs font-medium outline-none focus:border-(--color-primary)"
                  />
                  <button 
                    onClick={handleSearchUser}
                    disabled={isSearching || !addSearchQuery.trim()}
                    className="rounded-md border-2 border-(--color-primary) bg-(--color-primary) px-4 font-bold text-(--color-surface) transition hover:bg-(--color-primary-dark) disabled:opacity-50"
                  >
                    {isSearching ? "..." : "Cari"}
                  </button>
                </div>
              </div>

              {/* Hasil Pencarian */}
              {searchResults.length > 0 && (
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">Hasil Pencarian:</p>
                  {searchResults.map((user) => (
                    <div 
                      key={user.id}
                      onClick={() => setSelectedNewAdmin(user)}
                      className={`cursor-pointer rounded-md border-2 p-3 flex justify-between items-center transition ${selectedNewAdmin?.id === user.id ? 'border-(--color-primary-dark) bg-(--color-primary-dark)/10' : 'border-(--color-border) bg-(--color-bg) hover:border-(--color-primary)'}`}
                    >
                      <div>
                        <p className="text-xs font-bold uppercase text-(--color-primary-dark)">{user.name}</p>
                        <p className="text-[10px] text-(--color-text-secondary)">{user.email}</p>
                      </div>
                      {selectedNewAdmin?.id === user.id && <CheckCircle2 className="h-5 w-5 text-(--color-primary-dark)" />}
                    </div>
                  ))}
                </div>
              )}

              {searchResults.length === 0 && addSearchQuery && !isSearching && (
                <p className="text-xs text-(--color-danger)">Tidak ditemukan pelanggan dengan kata kunci tersebut.</p>
              )}

              {/* Pilih Role (Muncul jika ada user yang dipilih) */}
              {selectedNewAdmin && (
                <div className="mt-4 border-t-2 border-(--color-border) pt-4">
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                    Berikan Role Akses
                  </label>
                  <select 
                    value={newAdminRole}
                    onChange={(e) => setNewAdminRole(e.target.value as "ADMIN" | "SUPERADMIN")}
                    className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) py-3 px-4 text-xs font-bold outline-none focus:border-(--color-primary)"
                  >
                    <option value="ADMIN">ADMIN (Akses Standar)</option>
                    <option value="SUPERADMIN">SUPERADMIN (Akses Penuh)</option>
                  </select>

                  <button 
                    type="button"
                    disabled={isPending}
                    onClick={handlePromote}
                    className="mt-4 w-full rounded-md border-2 border-(--color-primary-dark) bg-(--color-primary-dark) py-3.5 text-xs font-bold uppercase tracking-widest text-(--color-surface) shadow-[4px_4px_0_rgba(99,50,26,0.3)] transition hover:-translate-y-0.5 hover:bg-(--color-primary) disabled:opacity-50"
                  >
                    {isPending ? "Memproses..." : "Angkat Menjadi Admin"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: UBAH ROLE ADMIN EKSISTING */}
      {isEditRoleOpen && adminToEdit && isSuperAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-(--color-primary-dark)/70 backdrop-blur-sm" onClick={() => setIsEditRoleOpen(false)} />
          <div className="relative w-full max-w-sm rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[8px_8px_0_rgba(139,94,60,0.3)]">
            <div className="flex items-center justify-between border-b-2 border-(--color-border) pb-4 mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-(--color-primary-dark)">
                Ubah Role Akses
              </h2>
              <button onClick={() => setIsEditRoleOpen(false)} className="rounded-full p-1 text-(--color-text-secondary)"><X className="h-5 w-5" /></button>
            </div>
            
            <div className="space-y-4">
              <div className="rounded-lg bg-(--color-bg) p-3 border border-(--color-border)">
                <p className="text-[10px] uppercase text-(--color-text-secondary) font-bold">Admin Terpilih</p>
                <p className="text-xs font-black text-(--color-primary-dark) uppercase">{adminToEdit.name}</p>
                <p className="text-xs text-(--color-text-secondary)">{adminToEdit.email}</p>
              </div>
              
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                  Pilih Role Baru
                </label>
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as "ADMIN" | "SUPERADMIN")}
                  className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) py-3 px-4 text-xs font-bold outline-none focus:border-(--color-primary)"
                >
                  <option value="ADMIN">ADMIN (Akses Standar)</option>
                  <option value="SUPERADMIN">SUPERADMIN (Akses Penuh)</option>
                </select>
              </div>

              <button 
                type="button"
                disabled={isPending || selectedRole === adminToEdit.role}
                onClick={handleUpdateRole}
                className="mt-4 w-full rounded-md border-2 border-(--color-primary-dark) bg-(--color-primary-dark) py-3.5 text-xs font-bold uppercase tracking-widest text-(--color-surface) shadow-[4px_4px_0_rgba(99,50,26,0.3)] transition hover:-translate-y-0.5 hover:bg-(--color-primary) disabled:opacity-50"
              >
                {isPending ? "Memproses..." : "Simpan Perubahan Role"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: KONFIRMASI TURUNKAN PANGKAT (CABUT AKSES) */}
      <ConfirmModal 
        isOpen={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)} 
        onConfirm={confirmRevoke} 
        title="Turunkan Menjadi Pelanggan?" 
        message="Apakah Anda yakin ingin mencabut akses panel admin dari pengguna ini? Akun mereka tidak akan dihapus, melainkan dikembalikan menjadi pelanggan (USER) biasa." 
        isLoading={isPending} 
      />
    </div>
  );
}