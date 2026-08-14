import { getProductsByCategorySlug } from "@/actions/storefront";
import CategoryClient from "./CategoryClient";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const products = await getProductsByCategorySlug(slug);

  return (
    <CategoryClient 
      products={products} 
      categorySlug={slug} 
    />
  );
}