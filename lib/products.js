import products from "@/data/products.json";

export function getAllProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getBestSellerProducts() {
  return products.filter((product) => product.bestSeller);
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product) {
  return products
    .filter((entry) => entry.slug !== product.slug && entry.category === product.category)
    .slice(0, 3);
}

export function getCategories() {
  return Array.from(new Set(products.map((product) => product.category))).map((name) => ({
    name,
    count: products.filter((product) => product.category === name).length,
    image: products.find((product) => product.category === name)?.image
  }));
}

export function getBrands() {
  return Array.from(new Set(products.map((product) => product.brand)));
}
