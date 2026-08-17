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

// Pilihan standar ukuran baju batik (bisa disesuaikan)
const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL", "XXXL", "All Size"];

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

  const [variants, setVariants] = useState<{ size: string; stock: number }[]>([]);

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
      toast.error("Minimal harus ada 1 ukuran yang dipilih!");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div
        className="absolute inset-0 bg-(--color-text-primary)/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border-2 border-(--color-border) bg-(--color-bg) shadow-[8px_8px_0_rgba(139,94,60,0.3)]">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b-2 border-(--color-border) bg-(--color-surface) px-6 py-4">
          <h2 className="text-lg font-bold uppercase tracking-wider text-(--color-primary-dark)">
            {initialData ? "Edit Produk" : "Tambah Produk Baru"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-(--color-text-secondary) hover:bg-(--color-border) hover:text-(--color-primary-dark)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Konten Scrollable */}
        <div className="overflow-y-auto p-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {/* Kiri: Data Utama */}
            <div className="space-y-5 rounded-lg border-2 border-(--color-border) bg-(--color-surface) p-6 lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={handleNameChange}
                    className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) p-3 text-sm text-(--color-text-primary) outline-none transition focus:border-(--color-primary)"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                    Kategori
                  </label>
                  <select
                    required
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) p-3 text-sm text-(--color-text-primary) outline-none transition focus:border-(--color-primary)"
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
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                    Harga Asli (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) p-3 text-sm text-(--color-text-primary) outline-none transition focus:border-(--color-primary)"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                    Diskon (%) - Opsional
                  </label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="Contoh: 15"
                    className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) p-3 text-sm text-(--color-text-primary) outline-none transition focus:border-(--color-primary)"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                  Deskripsi Produk
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-md border-2 border-(--color-border) bg-(--color-bg) p-3 text-sm text-(--color-text-primary) outline-none transition focus:border-(--color-primary)"
                />
              </div>
            </div>

            {/* Kanan: Gambar & Varian */}
            <div className="space-y-6">
              
              {/* Box Upload */}
              <div className="rounded-lg border-2 border-(--color-border) bg-(--color-surface) p-6 text-center">
                <label className="mb-4 block text-left text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                  Foto Produk (Max 2MB)
                </label>
                <div className="relative flex min-h-35 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-(--color-border) bg-(--color-bg) transition hover:border-(--color-primary)">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  />
                  {imageBase64 ? (
                    <img
                      src={imageBase64}
                      alt="Preview"
                      className="absolute inset-0 h-full w-full rounded-md object-cover"
                    />
                  ) : (
                    <>
                      <UploadCloud className="mb-2 h-8 w-8 text-(--color-text-secondary)/60" />
                      <span className="text-xs font-bold text-(--color-text-secondary)">
                        Klik untuk upload file
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Box Varian */}
              <div className="rounded-lg border-2 border-(--color-border) bg-(--color-surface) p-6">
                <div className="mb-4 flex items-center justify-between border-b-2 border-(--color-border) pb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-(--color-primary-dark)">
                    Ukuran & Stok
                  </h3>
                  <span className="rounded-md bg-(--color-primary) px-2.5 py-1 text-[10px] font-bold uppercase text-(--color-surface)">
                    Total Stok: {totalStock}
                  </span>
                </div>

                <div className="max-h-48 space-y-2.5 overflow-y-auto pr-2">
                  {variants.map((v, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-md border-2 border-(--color-border) bg-(--color-bg) p-2"
                    >
                      {/* DROPDOWN UKURAN GANTI INPUT KETIK */}
                      <select
                        value={v.size}
                        onChange={(e) =>
                          handleVariantChange(index, "size", e.target.value)
                        }
                        className="w-1/3 rounded bg-(--color-surface) p-2 text-xs font-bold uppercase text-(--color-text-primary) outline-none transition focus:border-(--color-primary)"
                      >
                        <option value="" disabled>
                          Pilih
                        </option>
                        {AVAILABLE_SIZES.map((sizeOption) => (
                          <option key={sizeOption} value={sizeOption}>
                            {sizeOption}
                          </option>
                        ))}
                      </select>

                      <div className="flex w-2/3 items-center gap-2">
                        <span className="text-[10px] font-bold text-(--color-text-secondary)">
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
                          className="w-full rounded bg-(--color-surface) p-2 text-xs text-(--color-text-primary) outline-none transition focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary)"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setVariants(variants.filter((_, i) => i !== index))
                          }
                          className="rounded p-1.5 text-(--color-danger) transition hover:bg-(--color-danger)/10"
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
                    setVariants([...variants, { size: "M", stock: 0 }])
                  }
                  className="mt-3 w-full rounded-md border-2 border-(--color-primary) py-2.5 text-xs font-bold uppercase text-(--color-primary) transition hover:bg-(--color-primary) hover:text-(--color-surface)"
                >
                  + Ukuran Lain
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-md bg-(--color-primary) py-4 text-center text-xs font-bold uppercase tracking-widest text-(--color-surface) shadow-[4px_4px_0_rgba(139,94,60,0.3)] transition hover:-translate-y-0.5 hover:bg-(--color-primary-dark) disabled:opacity-50"
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