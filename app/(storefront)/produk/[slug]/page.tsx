import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Fetch data produk beserta varian (ukuran/stok) dan kategorinya
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      variants: true,
      category: true,
    },
  });

  if (!product) {
    notFound(); // Menampilkan halaman 404 jika produk tidak ditemukan
  }

  return <ProductDetailClient product={product} />;
}