import { getFilteredProducts, getAllCategories } from "@/actions/product";
import ProdukClient from "../produk/ProdukClient";

export const dynamic = "force-dynamic";

export default async function ProdukPage() {
  // Ambil data produk dan kategori dari database
  const products = await getFilteredProducts();
  const categories = await getAllCategories();

  // Kirim data tersebut ke komponen antarmuka (UI)
  return <ProdukClient products={products} categories={categories} />;
}