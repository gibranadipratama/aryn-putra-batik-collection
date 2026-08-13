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

  // State untuk Filter Kategori & Pencarian
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

  // LOGIKA FILTER PRODUK (Berdasarkan Kategori & Kata Kunci Pencarian)
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "ALL" || product.categoryId === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl">
      {/* HEADER SECTION */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#A88A3D]">Management</p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tighter text-[#0B1F33] md:text-4xl">Produk</h1>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-[#0B1F33] px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#E8E0D3] shadow-md transition-all hover:bg-[#A88A3D] hover:text-[#0B1F33] hover:shadow-lg">
          <Plus className="h-4 w-4" /> Tambah Produk
        </button>
      </div>

      {/* FILTER & SEARCH BAR SECTION */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#162A3D]/40" />
          <input 
            placeholder="Cari produk..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white shadow-sm border border-[#0B1F33]/5 py-3.5 pl-11 pr-4 text-xs text-[#0B1F33] outline-none transition-all focus:border-[#A88A3D] focus:ring-1 focus:ring-[#A88A3D]" 
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0B1F33] text-[9px] font-bold text-[#E8E0D3]">
            {filteredProducts.length}
          </span>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#162A3D]/60">Menampilkan Produk</p>
        </div>
      </div>

      {/* TOMBOL FILTER KATEGORI */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory("ALL")}
          className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm ${
            selectedCategory === "ALL"
              ? "bg-[#0B1F33] text-[#A88A3D]"
              : "bg-white text-[#0B1F33] hover:bg-[#0B1F33]/10"
          }`}
        >
          Semua Kategori
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm ${
              selectedCategory === cat.id
                ? "bg-[#0B1F33] text-[#A88A3D]"
                : "bg-white text-[#0B1F33] hover:bg-[#0B1F33]/10"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* CONTENT SECTION */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white shadow-sm border border-[#0B1F33]/5 p-16 text-center transition-all">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0B1F33]/5">
            <Package className="h-8 w-8 text-[#0B1F33]/30" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F33]">Tidak Ada Produk</h3>
          <p className="mt-2 max-w-sm text-xs text-[#0B1F33]/50 leading-relaxed">
            Tidak ditemukan produk yang sesuai dengan filter atau kata kunci pencarian Anda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative flex flex-col bg-white p-4 shadow-sm border border-[#0B1F33]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#A88A3D]/30">
              
              <div className="relative aspect-square w-full overflow-hidden bg-[#F4F0E7]">
                <Image src={product.images[0] || "/batik-sementara.jpg"} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                
                {product.discount > 0 && (
                  <span className="absolute left-3 top-3 bg-red-600 px-2.5 py-1 text-[9px] font-black text-white shadow-sm">
                    -{product.discount}%
                  </span>
                )}
                
                <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-100 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button onClick={() => handleEdit(product)} title="Edit Produk" className="flex h-8 w-8 items-center justify-center bg-white text-[#0B1F33] shadow-md hover:bg-[#A88A3D] hover:text-white transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDeleteClick(product.id)} disabled={isPending} title="Hapus Produk" className="flex h-8 w-8 items-center justify-center bg-white text-red-600 shadow-md hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-5 flex flex-1 flex-col">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A88A3D]">
                  {product.category?.name || "Kategori"}
                </p>
                <h3 className="mt-1.5 text-sm font-black uppercase text-[#0B1F33] line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex-1"></div>

                <div className="mt-4 flex flex-col justify-end border-t border-[#0B1F33]/5 pt-4">
                  {product.discount > 0 ? (
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] font-bold text-[#0B1F33]/40 line-through decoration-[#0B1F33]/30">
                        {formatRupiah(product.price)}
                      </p>
                      <p className="text-sm font-black text-red-600">
                        {formatRupiah(product.price - (product.price * product.discount) / 100)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm font-black text-[#0B1F33]">
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