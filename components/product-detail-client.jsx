"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { QuantityStepper } from "@/components/quantity-stepper";
import { useStore } from "@/context/store-context";
import { formatCurrency } from "@/lib/format";

const tabs = [
  { id: "aciklama", label: "Açıklama" },
  { id: "teknik", label: "Teknik Özellikler" },
  { id: "yorum", label: "Müşteri Yorumları" },
  { id: "garanti", label: "Garanti" }
];

export function ProductDetailClient({ product, relatedProducts }) {
  const { addToCart } = useStore();
  const [activeImage, setActiveImage] = useState(product.gallery[0] ?? product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("aciklama");
  const [message, setMessage] = useState("");

  const handleAddToCart = () => {
    addToCart(product.slug, quantity);
    setMessage("Ürün sepete eklendi.");
  };

  return (
    <div className="space-y-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl bg-surface-container p-5">
            <img alt={product.name} className="min-h-[460px] w-full rounded-2xl object-cover" src={activeImage} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.gallery.map((image) => (
              <button
                key={image}
                className={`overflow-hidden rounded-2xl border p-1 ${
                  activeImage === image ? "border-primary" : "border-outline-variant/20"
                }`}
                onClick={() => setActiveImage(image)}
                type="button"
              >
                <img alt={product.name} className="h-24 w-full rounded-xl object-cover" src={image} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="chip">{product.badge}</span>
            <span className="chip">{product.power}</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-on-surface-variant">
            <span className="text-primary">{"★".repeat(4)}☆</span>
            <span>
              {product.rating} puan · {product.reviewCount} değerlendirme
            </span>
          </div>
          <div className="mt-6">
            <div className="text-5xl font-black tracking-tight">{formatCurrency(product.price)}</div>
            <div className="mt-2 text-sm text-on-surface-variant line-through">
              {formatCurrency(product.compareAtPrice)}
            </div>
          </div>
          <p className="mt-6 text-base leading-8 text-on-surface-variant">{product.description}</p>
          <div className="mt-6 rounded-2xl border-l-4 border-primary bg-surface-container-low p-4 text-sm">
            <div className="font-bold">{product.stockStatus}</div>
            <div className="mt-1 text-on-surface-variant">
              Hızlı teslimat ve güvenli sipariş adımlarıyla ürününüzü hemen sepetinize ekleyebilirsiniz.
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantityStepper onChange={setQuantity} value={quantity} />
            <button className="btn-primary min-w-[200px]" onClick={handleAddToCart} type="button">
              Sepete Ekle
            </button>
            <Link className="btn-secondary" href="/odeme">
              Hemen Satın Al
            </Link>
          </div>
          {message ? <div className="mt-3 text-sm font-semibold text-primary">{message}</div> : null}
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="flex flex-wrap gap-2 border-b border-outline-variant/20 px-5 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                activeTab === tab.id ? "bg-primary text-white" : "bg-surface-container-low text-on-surface-variant"
              }`}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="grid gap-8 p-6 lg:grid-cols-2">
          {activeTab === "aciklama" ? (
            <>
              <div>
                <h2 className="text-2xl font-black tracking-tight">Ürün açıklaması</h2>
                <p className="mt-4 text-sm leading-8 text-on-surface-variant">{product.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight">Öne çıkan özellikler</h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-on-surface-variant">
                  {product.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}

          {activeTab === "teknik" ? (
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-black tracking-tight">Teknik özellikler</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {product.specs.map((spec) => (
                  <div key={spec} className="rounded-2xl bg-surface-container-low p-4 text-sm font-semibold">
                    {spec}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === "yorum" ? (
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-black tracking-tight">Müşteri yorumları</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  "Yoğun saha kullanımında dengeli ve güçlü performans sunuyor.",
                  "Batarya süresi günlük servis işlerinde fazlasıyla yeterli.",
                  "Taşıma çantası ve kavrama hissi profesyonel kullanım için oldukça başarılı.",
                  "Fiyat-performans açısından güçlü ve güven veren bir ürün."
                ].map((comment) => (
                  <div key={comment} className="rounded-2xl bg-surface-container-low p-5 text-sm leading-7 text-on-surface-variant">
                    {comment}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === "garanti" ? (
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-black tracking-tight">Garanti ve destek</h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-on-surface-variant">
                Profesyonel ürün grubunda servis desteği, yedek parça erişimi ve kullanım sonrası destek süreçleri için müşteri hizmetleri ekibimizle iletişime geçebilirsiniz.
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Benzer Ürünler</div>
            <h2 className="mt-4 text-3xl font-black tracking-tight">Aynı kategoride öne çıkanlar</h2>
          </div>
          <Link className="text-sm font-bold text-primary" href="/urunler">
            Tüm ürünleri gör
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((entry) => (
            <ProductCard key={entry.id} product={entry} />
          ))}
        </div>
      </section>
    </div>
  );
}
