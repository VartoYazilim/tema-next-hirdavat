import { ListingClient } from "@/components/listing-client";
import { getAllProducts, getBrands, getCategories } from "@/lib/products";

export default async function ProductsPage({ searchParams }) {
  const products = getAllProducts();
  const categories = getCategories();
  const brands = getBrands();
  const params = await searchParams;
  const initialCategory = typeof params?.kategori === "string" ? params.kategori : "";

  return (
    <section className="section-space">
      <div className="container-shell">
        <ListingClient
          brands={brands}
          categories={categories}
          initialCategory={initialCategory}
          products={products}
        />
      </div>
    </section>
  );
}
