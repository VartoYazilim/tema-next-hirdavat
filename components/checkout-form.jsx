"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/context/store-context";
import { formatCurrency, formatDate } from "@/lib/format";

export function CheckoutForm() {
  const { cartItemsDetailed, cartSubtotal, createOrder, user } = useStore();
  const [createdOrder, setCreatedOrder] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const order = createOrder({
      formValues: payload,
      note: "Sipariş oluşturuldu."
    });

    setCreatedOrder(order);
    event.currentTarget.reset();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="card-surface p-6 sm:p-8">
        <div className="mb-6">
          <span className="eyebrow">Güvenli Ödeme</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight">Teslimat ve ödeme bilgileri</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-on-surface-variant">
            Siparişinizi tamamlamak için teslimat ve kart bilgilerinizi girin. Tüm adımlar tek sayfada düzenlenmiştir.
          </p>
        </div>

        {createdOrder ? (
          <div className="rounded-3xl bg-surface-container-low p-6">
            <div className="text-sm font-black uppercase tracking-[0.24em] text-primary">
              Siparişiniz alındı
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Teşekkür ederiz</h2>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">
              Sipariş numarası: <span className="font-bold text-on-surface">{createdOrder.id}</span>
            </p>
            <p className="text-sm leading-7 text-on-surface-variant">
              Oluşturulma zamanı: {formatDate(createdOrder.createdAt)}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link className="btn-primary" href="/urunler">
                Alışverişe Devam Et
              </Link>
              <Link className="btn-secondary" href="/hesap">
                Hesabımı Gör
              </Link>
            </div>
          </div>
        ) : null}

        <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <input className="input-field" defaultValue={user?.firstName ?? ""} name="firstName" placeholder="Ad" />
          <input className="input-field" defaultValue={user?.lastName ?? ""} name="lastName" placeholder="Soyad" />
          <input className="input-field md:col-span-2" defaultValue={user?.email ?? ""} name="email" placeholder="E-posta" />
          <input className="input-field md:col-span-2" defaultValue={user?.address ?? ""} name="address" placeholder="Teslimat adresi" />
          <input className="input-field" name="cardName" placeholder="Kart üzerindeki ad soyad" />
          <input className="input-field" name="cardNumber" placeholder="Kart numarası" />
          <input className="input-field" name="expiry" placeholder="Son kullanma tarihi" />
          <input className="input-field" name="cvv" placeholder="CVV" />
          <textarea className="input-field md:col-span-2 min-h-[120px]" name="orderNote" placeholder="Sipariş notu"></textarea>
          <div className="md:col-span-2">
            <button className="btn-primary w-full sm:w-auto" type="submit">
              Siparişi Tamamla
            </button>
          </div>
        </form>
      </div>

      <aside className="space-y-6">
        <div className="card-surface p-6">
          <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-primary">
            Sipariş Özeti
          </div>
          <div className="space-y-4">
            {cartItemsDetailed.length > 0 ? (
              cartItemsDetailed.map((item) => (
                <div key={item.slug} className="flex items-center justify-between gap-4 text-sm">
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-on-surface-variant">Adet: {item.quantity}</div>
                  </div>
                  <div className="font-black">{formatCurrency(item.lineTotal)}</div>
                </div>
              ))
            ) : (
              <p className="text-sm leading-7 text-on-surface-variant">
                Sepetinizde ürün bulunmuyor. Dilerseniz ürün ekleyerek toplam tutarı burada görüntüleyebilirsiniz.
              </p>
            )}
          </div>
          <div className="mt-6 border-t border-outline-variant/20 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span>Ara toplam</span>
              <span className="font-bold">{formatCurrency(cartSubtotal)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>Kargo</span>
              <span className="font-bold">{cartSubtotal > 0 ? formatCurrency(149.9) : "Ücretsiz"}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
