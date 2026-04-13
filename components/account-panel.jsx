"use client";

import { useState } from "react";
import { useStore } from "@/context/store-context";
import { formatDate } from "@/lib/format";

export function AccountPanel() {
  const { orders, registerUser, user } = useStore();
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    registerUser(payload);
    setMessage("Hesabınız oluşturuldu.");
    event.currentTarget.reset();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="card-surface p-6 sm:p-8">
        <div className="mb-6">
          <span className="eyebrow">Üyelik</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight">Hesap oluşturun</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-on-surface-variant">
            Siparişlerinizi takip etmek, teslimat bilgilerinizi kaydetmek ve sonraki alışverişlerde daha hızlı işlem yapmak için hesap bilgilerinizi girin.
          </p>
        </div>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <input className="input-field" name="firstName" placeholder="Ad" />
          <input className="input-field" name="lastName" placeholder="Soyad" />
          <input className="input-field md:col-span-2" name="email" placeholder="E-posta" type="email" />
          <input className="input-field" name="phone" placeholder="Telefon" />
          <input className="input-field" name="company" placeholder="Firma" />
          <textarea className="input-field md:col-span-2 min-h-[120px]" name="address" placeholder="Adres"></textarea>
          <div className="md:col-span-2 flex flex-wrap items-center gap-4">
            <button className="btn-primary" type="submit">
              Hesap Oluştur
            </button>
            {message ? <span className="text-sm font-semibold text-primary">{message}</span> : null}
          </div>
        </form>
      </div>

      <div className="space-y-6">
        <div className="card-surface p-6">
          <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-primary">
            Hesap Bilgileri
          </div>
          {user ? (
            <div className="space-y-2 text-sm leading-7">
              <div className="text-xl font-black">
                {user.firstName} {user.lastName}
              </div>
              <div>{user.email}</div>
              <div>{user.phone}</div>
              <div>{user.company}</div>
              <div className="text-on-surface-variant">{user.address}</div>
            </div>
          ) : (
            <p className="text-sm leading-7 text-on-surface-variant">
              Henüz kayıtlı bir hesap bulunmuyor.
            </p>
          )}
        </div>

        <div className="card-surface p-6">
          <div className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-primary">
            Son Siparişler
          </div>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="rounded-2xl bg-surface-container-low p-4 text-sm">
                  <div className="font-black">{order.id}</div>
                  <div className="text-on-surface-variant">{formatDate(order.createdAt)}</div>
                  <div className="mt-2 font-semibold text-primary">{order.status}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-7 text-on-surface-variant">
              Sipariş verdiğinizde bu alanda son işlemleriniz görüntülenir.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
