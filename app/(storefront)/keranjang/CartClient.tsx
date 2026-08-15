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

    // Optimistic Update UI (Biar kerasa responsif dan ga lag)
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
    // Nanti ini akan diarahkan ke halaman /checkout 
    // di mana integrasi Payment Gateway dipanggil.
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F4F0E7] p-5 text-center">
        <div className="h-24 w-24 rounded-full bg-[#0B1F33]/5 flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-[#0B1F33]/20" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-widest text-[#0B1F33]">Keranjang Kosong</h2>
        <p className="mt-2 text-sm text-[#0B1F33]/60 mb-8">Anda belum menambahkan koleksi batik apapun.</p>
        <Link href="/" className="bg-[#0B1F33] text-[#E8E0D3] px-8 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#A88A3D] hover:text-[#0B1F33] transition-all shadow-lg">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F0E7] py-12 px-5 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-black uppercase tracking-widest text-[#0B1F33] mb-8">Keranjang Anda</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* BAGIAN KIRI: DAFTAR PRODUK */}
          <div className="lg:w-2/3 space-y-4">
            {items.map((item) => {
              const product = item.variant.product;
              const finalPrice = product.discount > 0 
                ? product.price - (product.price * product.discount) / 100 
                : product.price;

              return (
                <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-[#0B1F33]/5 relative overflow-hidden transition-all hover:shadow-md">
                  
                  {/* Gambar Produk */}
                  <div className="relative h-28 w-24 shrink-0 rounded-xl overflow-hidden bg-[#EDE6DA]">
                    <Image src={product.images[0] || "/batik-default.jpg"} alt={product.name} fill className="object-cover" />
                  </div>

                  {/* Info Produk */}
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-black uppercase tracking-wide text-[#0B1F33] text-sm md:text-base line-clamp-1 pr-6">{product.name}</h3>
                        <button 
                          onClick={() => handleRemove(item.id)}
                          disabled={isPending}
                          className="text-red-400 hover:text-red-600 absolute right-4 top-4 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#0B1F33]/50 mt-1">
                        Ukuran: <span className="text-[#A88A3D]">{item.variant.size}</span>
                      </p>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      {/* Harga */}
                      <div>
                        {product.discount > 0 && (
                          <p className="text-[10px] line-through text-[#0B1F33]/40">{formatRupiah(product.price)}</p>
                        )}
                        <p className="font-black text-[#0B1F33] text-sm md:text-base">{formatRupiah(finalPrice)}</p>
                      </div>

                      {/* Kontrol Kuantitas */}
                      <div className="flex items-center gap-3 bg-[#0B1F33]/5 rounded-lg p-1 border border-[#0B1F33]/10">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, -1, item.variant.stock)}
                          disabled={item.quantity <= 1 || isPending}
                          className="h-6 w-6 flex items-center justify-center rounded-md bg-white shadow-sm text-[#0B1F33] disabled:opacity-50 hover:bg-[#A88A3D] hover:text-white transition"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-black w-4 text-center text-[#0B1F33]">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, 1, item.variant.stock)}
                          disabled={item.quantity >= item.variant.stock || isPending}
                          className="h-6 w-6 flex items-center justify-center rounded-md bg-white shadow-sm text-[#0B1F33] disabled:opacity-50 hover:bg-[#A88A3D] hover:text-white transition"
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
            <div className="sticky top-24 bg-[#0B1F33] text-[#E8E0D3] rounded-3xl p-6 shadow-2xl">
              <h3 className="text-sm font-black uppercase tracking-widest border-b border-white/10 pb-4 mb-4">Ringkasan Pesanan</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-70">Total Harga ({items.length} Barang)</span>
                  <span className="font-bold">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Biaya Pengiriman</span>
                  <span className="font-bold text-[#A88A3D]">Dihitung di Checkout</span>
                </div>
              </div>

              <div className="border-t border-white/10 mt-6 pt-4 flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest">Total Belanja</span>
                <span className="text-xl font-black text-[#A88A3D]">{formatRupiah(subtotal)}</span>
              </div>

              <button 
                onClick={handleCheckout}
                className="mt-8 group flex w-full items-center justify-center gap-2 rounded-xl bg-[#A88A3D] py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1F33] shadow-lg transition-all hover:bg-white"
              >
                Lanjut ke Pembayaran <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest text-white/40">
                <ShieldCheck className="h-3 w-3" /> Transaksi Aman & Terenkripsi
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}