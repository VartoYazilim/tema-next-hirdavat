"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { formatCurrency } from "@/lib/format";

function FilterSection({ children, defaultOpen = true, title }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-outline-variant/10 pb-5 last:border-b-0 last:pb-0">
      <button
        className="flex w-full items-center justify-between gap-3 text-left"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className="text-sm font-black uppercase tracking-[0.24em] text-primary">
          {title}
        </span>
        <span
          className={`material-symbols-outlined text-lg text-on-surface-variant transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>
      {open ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

export function ListingClient({ products, categories, brands, initialCategory = "" }) {
  const maxPrice = Math.max(...products.map((product) => product.price));
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxSelectedPrice, setMaxSelectedPrice] = useState(maxPrice);
  const [minimumRating, setMinimumRating] = useState(0);
  const [sortBy, setSortBy] = useState("onerilen");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("tr-TR");

    const filtered = products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLocaleLowerCase("tr-TR").includes(normalizedSearch) ||
        product.summary.toLocaleLowerCase("tr-TR").includes(normalizedSearch) ||
        product.tags.some((tag) => tag.toLocaleLowerCase("tr-TR").includes(normalizedSearch));

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesPrice = product.price <= maxSelectedPrice;
      const matchesRating = product.rating >= minimumRating;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "fiyat-artan") {
        return a.price - b.price;
      }
      if (sortBy === "fiyat-azalan") {
        return b.price - a.price;
      }
      if (sortBy === "puan") {
        return b.rating - a.rating;
      }
      return b.reviewCount - a.reviewCount;
    });
  }, [maxSelectedPrice, minimumRating, products, search, selectedBrands, selectedCategories, sortBy]);

  const toggleValue = (value, entries, update) => {
    update(entries.includes(value) ? entries.filter((item) => item !== value) : [...entries, value]);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="space-y-6">
        <div className="card-surface p-5">
          <FilterSection title="Arama">
            <input
              className="input-field"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ürün, marka veya kategori ara"
              value={search}
            />
          </FilterSection>
        </div>

        <div className="card-surface space-y-5 p-5">
          <FilterSection title="Kategori">
            <div className="space-y-3">
              {categories.map((category) => (
                <label key={category.name} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-3">
                    <input
                      checked={selectedCategories.includes(category.name)}
                      onChange={() =>
                        toggleValue(category.name, selectedCategories, setSelectedCategories)
                      }
                      type="checkbox"
                    />
                    <span>{category.name}</span>
                  </span>
                  <span className="text-on-surface-variant">{category.count}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Marka" defaultOpen={false}>
            <div className="space-y-3">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-3 text-sm">
                  <input
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleValue(brand, selectedBrands, setSelectedBrands)}
                    type="checkbox"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Fiyat Aralığı" defaultOpen={false}>
            <input
              className="w-full accent-primary"
              max={maxPrice}
              min={0}
              onChange={(event) => setMaxSelectedPrice(Number(event.target.value))}
              type="range"
              value={maxSelectedPrice}
            />
            <div className="mt-3 flex items-center justify-between text-xs font-bold text-on-surface-variant">
              <span>{formatCurrency(0)}</span>
              <span>{formatCurrency(maxSelectedPrice)}</span>
            </div>
          </FilterSection>

          <FilterSection title="Minimum Puan" defaultOpen={false}>
            <div className="grid grid-cols-4 gap-2">
              {[0, 3, 4, 4.5].map((value) => (
                <button
                  key={value}
                  className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                    minimumRating === value
                      ? "border-primary bg-primary text-white"
                      : "border-outline-variant/30 bg-white"
                  }`}
                  onClick={() => setMinimumRating(value)}
                  type="button"
                >
                  {value === 0 ? "Hepsi" : `${value}+`}
                </button>
              ))}
            </div>
          </FilterSection>
        </div>
      </aside>

      <section className="space-y-8">
        <div className="flex flex-col gap-4 rounded-3xl bg-surface-container-low p-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Endüstriyel Ürünler</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-on-surface-variant">
              Yüksek performanslı ekipmanlar, profesyonel el aletleri ve yoğun kullanıma uygun saha çözümleri.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-on-surface-variant">
              {filteredProducts.length} ürün gösteriliyor
            </span>
            <select
              className="input-field min-w-[190px] py-3"
              onChange={(event) => setSortBy(event.target.value)}
              value={sortBy}
            >
              <option value="onerilen">Önerilen</option>
              <option value="fiyat-artan">Fiyat: Artan</option>
              <option value="fiyat-azalan">Fiyat: Azalan</option>
              <option value="puan">Puanı En Yüksek</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="card-surface p-10 text-center">
            <h2 className="text-2xl font-black tracking-tight">Sonuç bulunamadı</h2>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">
              Filtreleri güncelleyerek ya da farklı bir arama ifadesi deneyerek ürünleri yeniden listeleyebilirsiniz.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
