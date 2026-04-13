import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/product-detail-client";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({
    slug: product.slug
  }));
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="mb-6 text-sm text-on-surface-variant">
          Ana Sayfa / Ürünler / <span className="font-semibold text-on-surface">{product.name}</span>
        </div>
        <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      </div>
    </section>
  );
}
