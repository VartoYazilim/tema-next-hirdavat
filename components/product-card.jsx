"use client";

import Link from "next/link";
import { useStore } from "@/context/store-context";
import { formatCurrency } from "@/lib/format";

function Rating({ value, reviews }) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-2 text-xs text-on-surface-variant">
      <div className="flex gap-1 text-primary">
        {Array.from({ length: 5 }).map((_, index) => {
          const filled = index < fullStars || (index === fullStars && hasHalfStar);
          return <span key={index}>{filled ? "★" : "☆"}</span>;
        })}
      </div>
      <span>({reviews} değerlendirme)</span>
    </div>
  );
}

export function ProductCard({ product, variant = "catalog" }) {
  const { addToCart } = useStore();
  const isShowcase = variant === "showcase";

  return (
    <article
      className={
        isShowcase
          ? "group"
          : "group overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest shadow-soft"
      }
    >
      <Link href={`/urunler/${product.slug}`} className="block">
        <div
          className={`relative overflow-hidden ${
            isShowcase
              ? "mb-6 aspect-[4/3] rounded-xl bg-surface-container-lowest p-8"
              : "aspect-[4/3] bg-surface-container-low p-6"
          }`}
        >
          <img
            alt={product.name}
            className={`transition duration-500 group-hover:scale-105 ${
              isShowcase ? "h-full w-full object-contain" : "h-full w-full object-cover"
            }`}
            src={product.image}
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="chip">{product.badge}</span>
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              {product.power}
            </span>
          </div>
        </div>
      </Link>

      <div className={isShowcase ? "space-y-3" : "space-y-4 p-5"}>
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-on-surface-variant">
            {product.category}
          </div>
          <Link href={`/urunler/${product.slug}`} className="block">
            <h3 className="text-xl font-black tracking-tight transition group-hover:text-primary">
              {product.name}
            </h3>
          </Link>
          <p className="line-clamp-2 text-sm leading-6 text-on-surface-variant">
            {product.summary}
          </p>
        </div>
        <Rating value={product.rating} reviews={product.reviewCount} />
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-2xl font-black tracking-tight">{formatCurrency(product.price)}</div>
            <div className="text-xs text-on-surface-variant line-through">
              {formatCurrency(product.compareAtPrice)}
            </div>
          </div>
          {isShowcase ? null : (
            <button
              className="btn-primary whitespace-nowrap"
              onClick={() => addToCart(product.slug, 1)}
              type="button"
            >
              Sepete Ekle
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
