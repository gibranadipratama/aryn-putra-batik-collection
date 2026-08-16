"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Package, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import ProductModal from "@/components/ui/ProductModal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { deleteProduct } from "@/actions/product";

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
};

export default function ProdukClient({ products, categories }: { products: any[], categories: any[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null); 

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAdd = () => {
    setEditingProduct(null); 
    setIsModalOpen(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product); 
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!productToDelete) return;

    startTransition(async () => {
      const res = await deleteProduct(productToDelete);
      
      if (res.success) {
        toast.success(res.message);
        router.refresh(); 
        setIsConfirmOpen(false); 
        setProductToDelete(null); 
      } else {
        toast.error(res.message);
      }
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "ALL" || product.categoryId === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl font-sans">
      {/* HEADER SECTION */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end rounded-xl border-2 border-(--color-border) bg-(--color-surface) px-6 py-6 shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2)">Management</p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark) md:text-4xl">Produk</h1>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 rounded-md border-2 border-(--color-primary-dark) bg-(--color-primary-dark) px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-(--color-surface) shadow-[3px_3px_0_rgba(99,50,26,0.4)] transition-all hover:-translate-y-0.5 hover:bg-(--color-primary)">
          <Plus className="h-4 w-4" /> Tambah Produk
        </button>
      </div>

      {/* FILTER & SEARCH BAR SECTION */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-text-secondary)" />
          <input 
            placeholder="Cari produk..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border-2 border-(--color-border) bg-(--color-surface) py-3.5 pl-10 pr-4 text-xs font-medium text-(--color-text-primary) outline-none transition-all focus:border-(--color-primary) focus:shadow-[4px_4px_0_rgba(139,94,60,0.2)]" 
          />
        </div>
        <div className="flex items-center gap-2 rounded-md border-2 border-(--color-border) bg-(--color-surface) px-4 py-2.5 shadow-[2px_2px_0_rgba(139,94,60,0.15)]">
          <span className="flex h-6 w-6 items-center justify-center rounded border border-(--color-border) bg-(--color-bg) text-[9px] font-bold text-(--color-primary-dark)">
            {filteredProducts.length}
          </span>
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">Total Produk</p>
        </div>
      </div>

      {/* TOMBOL FILTER KATEGORI */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory("ALL")}
          className={`rounded-md border-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
            selectedCategory === "ALL"
              ? "border-(--color-primary-dark) bg-(--color-primary-dark) text-(--color-surface) shadow-[2px_2px_0_rgba(99,50,26,0.4)]"
              : "border-(--color-border) bg-(--color-surface) text-(--color-text-primary) shadow-[2px_2px_0_rgba(139,94,60,0.2)] hover:-translate-y-0.5"
          }`}
        >
          Semua Kategori
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`rounded-md border-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
              selectedCategory === cat.id
                ? "border-(--color-primary-dark) bg-(--color-primary-dark) text-(--color-surface) shadow-[2px_2px_0_rgba(99,50,26,0.4)]"
                : "border-(--color-border) bg-(--color-surface) text-(--color-text-primary) shadow-[2px_2px_0_rgba(139,94,60,0.2)] hover:-translate-y-0.5"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* CONTENT SECTION */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-(--color-border) bg-(--color-surface) p-16 text-center shadow-[4px_4px_0_rgba(139,94,60,0.15)] transition-all">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-(--color-border) bg-(--color-bg)">
            <Package className="h-8 w-8 text-(--color-text-secondary)" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-wider text-(--color-primary-dark)">Tidak Ada Produk</h3>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-(--color-text-secondary)">
            Tidak ditemukan produk yang sesuai dengan filter atau kata kunci pencarian Anda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative flex flex-col rounded-md border-2 border-(--color-border) bg-(--color-surface) p-4 shadow-[4px_4px_0_rgba(139,94,60,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(139,94,60,0.3)]">
              
              <div className="relative aspect-square w-full overflow-hidden border border-(--color-border) bg-(--color-bg)">
                <Image src={product.images[0] || "/batik-sementara.jpg"} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:sepia-[.1]" />
                
                {product.discount > 0 && (
                  <span className="absolute left-3 top-3 rounded border border-(--color-danger) bg-(--color-danger) px-2.5 py-1 text-[9px] font-bold text-white shadow-[2px_2px_0_rgba(168,69,47,0.4)]">
                    -{product.discount}%
                  </span>
                )}
                
                <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-100 transition-opacity duration-300 sm:opacity-0 group-hover:opacity-100">
                  <button onClick={() => handleEdit(product)} title="Edit Produk" className="flex h-8 w-8 items-center justify-center rounded border border-(--color-border) bg-(--color-surface) text-(--color-text-primary) shadow-[2px_2px_0_rgba(139,94,60,0.3)] transition-colors hover:bg-(--color-primary) hover:text-(--color-surface)">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDeleteClick(product.id)} disabled={isPending} title="Hapus Produk" className="flex h-8 w-8 items-center justify-center rounded border border-(--color-danger) bg-(--color-surface) text-(--color-danger) shadow-[2px_2px_0_rgba(168,69,47,0.3)] transition-colors hover:bg-(--color-danger) hover:text-white disabled:opacity-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-5 flex flex-1 flex-col">
                <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-accent-2)">
                  {product.category?.name || "Kategori"}
                </p>
                <h3 className="mt-1.5 line-clamp-2 text-xs font-bold uppercase tracking-wide text-(--color-primary-dark)">
                  {product.name}
                </h3>
                
                <div className="flex-1"></div>

                <div className="mt-4 flex flex-col justify-end border-t-2 border-dashed border-(--color-border) pt-4">
                  {product.discount > 0 ? (
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] font-bold text-(--color-text-secondary) line-through">
                        {formatRupiah(product.price)}
                      </p>
                      <p className="text-sm font-black text-(--color-danger)">
                        {formatRupiah(product.price - (product.price * product.discount) / 100)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm font-black text-(--color-primary-dark)">
                      {formatRupiah(product.price)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} categories={categories} initialData={editingProduct} />
      <ConfirmModal isOpen={isConfirmOpen} onClose={() => { setIsConfirmOpen(false); setProductToDelete(null); }} onConfirm={confirmDelete} title="Hapus Produk?" message="Apakah Anda yakin ingin menghapus produk ini? Semua data terkait varian dan stok akan hilang secara permanen dan tidak dapat dikembalikan." isLoading={isPending} />
    </div>
  );
}