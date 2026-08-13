"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Trash2, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { createProduct, updateProduct } from "@/actions/product";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: any[];
  initialData?: any;
}

export default function ProductModal({
  isOpen,
  onClose,
  categories,
  initialData,
}: ProductModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  const [variants, setVariants] = useState<{ size: string; stock: number }[]>(
    [],
  );

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSlug(initialData.slug);
      setDescription(initialData.description);
      setPrice(initialData.price.toString());
      setDiscount(initialData.discount?.toString() || "");
      setCategoryId(initialData.categoryId || "");
      setImageBase64(initialData.images[0] || "");

      if (initialData.variants && initialData.variants.length > 0) {
        setVariants(initialData.variants);
      }
    } else {
      setName("");
      setSlug("");
      setDescription("");
      setPrice("");
      setDiscount("");
      setCategoryId("");
      setImageBase64("");
      setVariants([
        { size: "S", stock: 0 },
        { size: "M", stock: 0 },
        { size: "L", stock: 0 },
        { size: "XL", stock: 0 },
      ]);
    }
  }, [initialData, isOpen]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-"),
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 2MB!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImageBase64(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleVariantChange = (
    index: number,
    field: "size" | "stock",
    value: string | number,
  ) => {
    const newVariants = [...variants];
    newVariants[index][field] = value as never;
    setVariants(newVariants);
  };

  const totalStock = variants.reduce(
    (sum, v) => sum + (Number(v.stock) || 0),
    0,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageBase64) {
      toast.error("Pilih gambar produk terlebih dahulu!");
      return;
    }

    const finalVariants = variants.filter((v) => v.size.trim() !== "");

    if (finalVariants.length === 0) {
      toast.error("Minimal harus ada 1 ukuran yang diisi!");
      return;
    }

    startTransition(async () => {
      const payload = {
        name,
        slug,
        description,
        price: Number(price),
        discount: Number(discount) || 0,
        categoryId,
        images: [imageBase64],
        variants: finalVariants,
      };

      const res = initialData
        ? await updateProduct(initialData.id, payload)
        : await createProduct(payload);

      if (res.success) {
        toast.success(res.message);
        router.refresh();
        onClose();
      } else {
        toast.error(res.message);
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-[#0B1F33]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col bg-[#F4F0E7] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#0B1F33]/10 bg-white px-6 py-4">
          <h2 className="text-lg font-black uppercase tracking-wider text-[#0B1F33]">
            {initialData ? "Edit Produk" : "Tambah Produk Baru"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-[#0B1F33]/5 text-[#0B1F33]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            <div className="space-y-5 bg-white shadow-sm border border-[#0B1F33]/5 p-6 lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#162A3D]/60 mb-2">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={handleNameChange}
                    className="w-full border border-[#0B1F33]/10 bg-[#EDE6DA] p-3 text-xs outline-none focus:border-[#A88A3D]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#162A3D]/60 mb-2">
                    Kategori
                  </label>
                  <select
                    required
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full border border-[#0B1F33]/10 bg-[#EDE6DA] p-3 text-xs outline-none focus:border-[#A88A3D]"
                  >
                    <option value="" disabled>
                      -- Pilih Kategori --
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#162A3D]/60 mb-2">
                    Harga Asli (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border border-[#0B1F33]/10 bg-[#EDE6DA] p-3 text-xs outline-none focus:border-[#A88A3D]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#162A3D]/60 mb-2">
                    Diskon (%) - Opsional
                  </label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="Contoh: 15"
                    className="w-full border border-[#0B1F33]/10 bg-[#EDE6DA] p-3 text-xs outline-none focus:border-[#A88A3D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#162A3D]/60 mb-2">
                  Deskripsi Produk
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-[#0B1F33]/10 bg-[#EDE6DA] p-3 text-xs outline-none focus:border-[#A88A3D]"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm border border-[#0B1F33]/5 p-6 text-center">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#162A3D]/60 mb-4 text-left">
                  Foto Produk (Max 2MB)
                </label>
                <div className="relative flex min-h-30 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[#0B1F33]/20 bg-[#EDE6DA] transition hover:border-[#A88A3D]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                  />
                  {imageBase64 ? (
                    <img
                      src={imageBase64}
                      alt="Preview"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <UploadCloud className="h-8 w-8 text-[#0B1F33]/30 mb-2" />
                      <span className="text-[10px] font-bold text-[#0B1F33]/50">
                        Klik untuk upload file
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-white shadow-sm border border-[#0B1F33]/5 p-6">
                <div className="flex items-center justify-between mb-4 border-b border-[#0B1F33]/10 pb-3">
                  <h3 className="text-[10px] font-black uppercase tracking-wider text-[#0B1F33]">
                    Ukuran & Stok
                  </h3>
                  <span className="text-[9px] font-bold uppercase bg-[#0B1F33] text-[#A88A3D] px-2 py-1 rounded-sm">
                    Total Stok: {totalStock}
                  </span>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {variants.map((v, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-[#EDE6DA] p-1.5 border border-[#0B1F33]/10"
                    >
                      <input
                        type="text"
                        value={v.size}
                        onChange={(e) =>
                          handleVariantChange(index, "size", e.target.value)
                        }
                        className="w-1/3 bg-transparent p-1.5 text-xs font-bold outline-none uppercase text-[#0B1F33]"
                        placeholder="Size"
                      />
                      <div className="flex w-2/3 items-center gap-2">
                        <span className="text-[9px] font-bold text-[#0B1F33]/40">
                          STOK:
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={v.stock}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "stock",
                              Number(e.target.value),
                            )
                          }
                          className="w-full bg-white p-1.5 text-xs outline-none border border-[#0B1F33]/10 focus:border-[#A88A3D] text-[#0B1F33]"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setVariants(variants.filter((_, i) => i !== index))
                          }
                          className="text-red-500 p-1.5 hover:bg-red-50 hover:text-red-700 transition"
                          title="Hapus Ukuran"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setVariants([...variants, { size: "", stock: 0 }])
                  }
                  className="w-full mt-3 border border-[#0B1F33]/20 py-2.5 text-[9px] font-bold uppercase text-[#0B1F33] hover:bg-[#0B1F33] hover:text-[#E8E0D3] transition"
                >
                  + Ukuran Lain
                </button>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#0B1F33] py-4 text-center text-xs font-black uppercase tracking-[0.2em] text-[#E8E0D3] transition hover:bg-[#A88A3D] hover:text-[#0B1F33] disabled:opacity-50 shadow-md"
              >
                {isPending
                  ? "Menyimpan..."
                  : initialData
                    ? "Simpan Perubahan"
                    : "Simpan Produk"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
