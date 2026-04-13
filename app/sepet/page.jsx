"use client";

import Link from "next/link";
import { QuantityStepper } from "@/components/quantity-stepper";
import { useStore } from "@/context/store-context";
import { formatCurrency } from "@/lib/format";

export default function CartPage() {
  const { cartItemsDetailed, cartSubtotal, removeFromCart, updateCartQuantity } = useStore();

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight">Sepetim</h1>
          <p className="mt-3 text-sm leading-7 text-on-surface-variant">
            Seçtiğiniz ürünleri gözden geçirin, adetleri düzenleyin ve siparişinizi tamamlayın.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            {cartItemsDetailed.length > 0 ? (
              cartItemsDetailed.map((item) => (
                <article key={item.slug} className="card-surface p-5 sm:p-6">
                  <div className="flex flex-col gap-5 md:flex-row">
                    <img alt={item.name} className="h-36 w-full rounded-2xl object-cover md:w-40" src={item.image} />
                    <div className="flex flex-1 flex-col justify-between gap-4">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row">
                        <div>
                          <span className="chip">{item.power}</span>
                          <h2 className="mt-3 text-2xl font-black tracking-tight">{item.name}</h2>
                          <p className="mt-2 text-sm leading-7 text-on-surface-variant">{item.summary}</p>
                        </div>
                        <div className="text-2xl font-black">{formatCurrency(item.lineTotal)}</div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <QuantityStepper
                          onChange={(value) => updateCartQuantity(item.slug, value)}
                          value={item.quantity}
                        />
                        <button
                          className="text-sm font-bold text-error"
                          onClick={() => removeFromCart(item.slug)}
                          type="button"
                        >
                          Ürünü kaldır
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="card-surface p-10 text-center">
                <h2 className="text-2xl font-black tracking-tight">Sepetinizde ürün bulunmuyor</h2>
                <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                  Kataloğumuzdan ürün seçerek alışverişinizi başlatabilirsiniz.
                </p>
                <Link className="btn-primary mt-6" href="/urunler">
                  Ürünlere Git
                </Link>
              </div>
            )}
          </div>

          <aside className="card-surface h-fit p-6">
            <div className="text-sm font-black uppercase tracking-[0.24em] text-primary">Sipariş Özeti</div>
            <div className="mt-6 flex items-center justify-between text-sm">
              <span>Ara toplam</span>
              <span className="font-bold">{formatCurrency(cartSubtotal)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span>Kargo</span>
              <span className="font-bold">{cartItemsDetailed.length > 0 ? formatCurrency(149.9) : "Ücretsiz"}</span>
            </div>
            <div className="mt-6 border-t border-outline-variant/20 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">Genel toplam</span>
                <span className="text-2xl font-black">
                  {formatCurrency(cartSubtotal + (cartItemsDetailed.length > 0 ? 149.9 : 0))}
                </span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <Link className="btn-primary w-full" href="/odeme">
                Siparişi Tamamla
              </Link>
              <Link className="btn-secondary w-full" href="/hesap">
                Hesap Bilgilerim
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
