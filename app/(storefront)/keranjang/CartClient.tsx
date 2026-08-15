"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { updateCartItemQuantity, removeCartItem } from "@/actions/cart";

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
};

export default function CartClient({ initialItems }: { initialItems: any[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [isPending, startTransition] = useTransition();

  // Hitung Total Belanja secara real-time
  const subtotal = items.reduce((total, item) => {
    const product = item.variant.product;
    const finalPrice = product.discount > 0 
      ? product.price - (product.price * product.discount) / 100 
      : product.price;
    return total + (finalPrice * item.quantity);
  }, 0);

  const handleUpdateQuantity = (itemId: string, currentQty: number, change: number, maxStock: number) => {
    const newQty = currentQty + change;
    
    if (newQty < 1) return;
    if (newQty > maxStock) {
      toast.error(`Maaf, stok barang ini sisa ${maxStock}`);
      return;
    }

    // Optimistic Update UI
    setItems(items.map(i => i.id === itemId ? { ...i, quantity: newQty } : i));

    // Update ke Database via Server Action
    startTransition(async () => {
      const res = await updateCartItemQuantity(itemId, newQty);
      if (!res.success) {
        toast.error(res.message || "Gagal mengubah jumlah barang.");
        setItems(initialItems);
      }
    });
  };

  const handleRemove = (itemId: string) => {
    // Optimistic hapus dari UI
    setItems(items.filter(i => i.id !== itemId));
    
    startTransition(async () => {
      const res = await removeCartItem(itemId);
      if (res.success) {
        toast.success(res.message || "Barang berhasil dihapus."); 
        router.refresh(); 
      } else {
        toast.error(res.message || "Gagal menghapus barang."); 
        setItems(initialItems); 
      }
    });
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-(--color-bg) p-5 text-center font-sans">
        <div className="h-20 w-20 rounded-full border-2 border-(--color-border) bg-(--color-surface) flex items-center justify-center mb-6 shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
          <ShoppingBag className="h-8 w-8 text-(--color-text-secondary)" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-wider text-(--color-primary-dark)">Keranjang Kosong</h2>
        <p className="mt-2 text-sm text-(--color-text-secondary) mb-8">Anda belum menambahkan koleksi batik apapun.</p>
        <Link href="/" className="rounded-md border-2 border-(--color-primary) bg-(--color-primary) px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-(--color-surface) shadow-[3px_3px_0_rgba(139,94,60,0.3)] transition-all hover:-translate-y-0.5 hover:bg-(--color-primary-dark)">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-bg) py-12 px-5 md:px-8 font-sans">
      <div className="mx-auto max-w-6xl">
        
        {/* HEADER KERANJANG */}
        <div className="mb-8 rounded-xl border-2 border-(--color-border) bg-(--color-surface) px-6 py-6 shadow-[4px_4px_0_rgba(139,94,60,0.2)]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2) mb-1">Manajemen Belanja</p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark)">Keranjang Anda</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* BAGIAN KIRI: DAFTAR PRODUK */}
          <div className="lg:w-2/3 space-y-4">
            {items.map((item) => {
              const product = item.variant.product;
              const finalPrice = product.discount > 0 
                ? product.price - (product.price * product.discount) / 100 
                : product.price;

              return (
                <div key={item.id} className="relative flex gap-4 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-4 shadow-[4px_4px_0_rgba(139,94,60,0.15)] transition-all hover:shadow-[6px_6px_0_rgba(139,94,60,0.25)]">
                  
                  {/* Gambar Produk */}
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-md border border-(--color-border) bg-(--color-bg)">
                    <Image src={product.images[0] || "/batik-default.jpg"} alt={product.name} fill className="object-cover" />
                  </div>

                  {/* Info Produk */}
                  <div className="flex flex-1 flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="pr-6 text-sm font-bold uppercase tracking-wide text-(--color-primary-dark) md:text-base line-clamp-1">{product.name}</h3>
                        <button 
                          onClick={() => handleRemove(item.id)}
                          disabled={isPending}
                          className="absolute right-4 top-4 rounded p-1 text-(--color-danger) transition hover:bg-(--color-danger)/10"
                          title="Hapus item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-(--color-text-secondary)">
                        Ukuran: <span className="text-(--color-primary)">{item.variant.size}</span>
                      </p>
                    </div>

                    <div className="mt-4 flex items-end justify-between">
                      {/* Harga */}
                      <div>
                        {product.discount > 0 && (
                          <p className="text-[10px] text-(--color-text-secondary) line-through">{formatRupiah(product.price)}</p>
                        )}
                        <p className="text-sm font-bold text-(--color-text-primary) md:text-base">{formatRupiah(finalPrice)}</p>
                      </div>

                      {/* Kontrol Kuantitas */}
                      <div className="flex items-center gap-2 rounded-md border-2 border-(--color-border) bg-(--color-bg) p-1">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, -1, item.variant.stock)}
                          disabled={item.quantity <= 1 || isPending}
                          className="flex h-6 w-6 items-center justify-center rounded border border-(--color-border) bg-(--color-surface) text-(--color-text-primary) transition hover:bg-(--color-primary) hover:text-(--color-surface) disabled:opacity-40"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-(--color-text-primary)">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, 1, item.variant.stock)}
                          disabled={item.quantity >= item.variant.stock || isPending}
                          className="flex h-6 w-6 items-center justify-center rounded border border-(--color-border) bg-(--color-surface) text-(--color-text-primary) transition hover:bg-(--color-primary) hover:text-(--color-surface) disabled:opacity-40"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BAGIAN KANAN: RINGKASAN & PEMBAYARAN */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 rounded-xl border-2 border-(--color-border) bg-(--color-primary-dark) p-6 text-(--color-surface) shadow-[6px_6px_0_rgba(139,94,60,0.3)]">
              <h3 className="mb-4 border-b-2 border-(--color-border) pb-4 text-xs font-bold uppercase tracking-widest text-(--color-accent)">Ringkasan Pesanan</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-xs opacity-80">Total Harga ({items.length} Barang)</span>
                  <span className="font-bold">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs opacity-80">Biaya Pengiriman</span>
                  <span className="font-bold text-(--color-accent)">Dihitung di Checkout</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t-2 border-(--color-border) pt-4">
                <span className="text-xs font-bold uppercase tracking-widest">Total Belanja</span>
                <span className="text-lg font-black text-(--color-accent)">{formatRupiah(subtotal)}</span>
              </div>

              <button 
                onClick={handleCheckout}
                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-(--color-accent) py-3.5 text-xs font-bold uppercase tracking-widest text-(--color-text-primary) shadow-[3px_3px_0_rgba(58,40,27,0.4)] transition-all hover:-translate-y-0.5 hover:bg-(--color-surface)"
              >
                Lanjut ke Pembayaran <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest opacity-70">
                <ShieldCheck className="h-3.5 w-3.5 text-(--color-accent)" /> Transaksi Aman & Terenkripsi
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}