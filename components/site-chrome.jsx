"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/context/store-context";

const categoryLinks = [
  "Matkap ve Vidalama",
  "El Aletleri",
  "İnşaat Ekipmanları",
  "İş Güvenliği"
];

const mobileLinks = [
  { href: "/", label: "Ana Sayfa", icon: "home" },
  { href: "/urunler", label: "Ürünler", icon: "storefront" },
  { href: "/hesap", label: "Hesap", icon: "person" },
  { href: "/sepet", label: "Sepet", icon: "shopping_cart" }
];

function CartNotice() {
  const { cartNotice, dismissCartNotice } = useStore();

  if (!cartNotice) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-24 z-[70] flex justify-center px-4">
      <div className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-outline-variant/20 bg-white/95 p-4 shadow-2xl backdrop-blur">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <span className="material-symbols-outlined">check</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-black tracking-tight">{cartNotice.title}</div>
          <div className="mt-1 text-sm leading-6 text-on-surface-variant">{cartNotice.message}</div>
        </div>
        <button
          className="rounded-full p-1 text-on-surface-variant transition hover:bg-surface-container-low"
          onClick={dismissCartNotice}
          type="button"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </div>
  );
}

export function SiteChrome({ children }) {
  const pathname = usePathname();
  const { cartCount, user } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-outline-variant/20 bg-stone-50/95 shadow-sm backdrop-blur">
        <div className="container-shell">
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-10">
              <Link href="/" className="text-2xl font-black tracking-tight text-stone-900">
                VY | Hırdavat
              </Link>

              <div className="relative hidden nav-dropdown py-2 lg:block">
                <button className="flex items-center gap-1 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900">
                  <span>Kategoriler</span>
                  <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                </button>
                <div className="nav-dropdown-menu absolute left-0 mt-2 hidden w-56 rounded-lg border border-stone-100 bg-stone-50 py-2 shadow-xl">
                  {categoryLinks.map((category) => (
                    <Link
                      key={category}
                      href={`/urunler?kategori=${encodeURIComponent(category)}`}
                      className="block px-4 py-2 text-sm text-stone-600 transition hover:bg-stone-100 hover:text-primary"
                    >
                      {category}
                    </Link>
                  ))}
                  <Link
                    href="/urunler"
                    className="mt-1 block border-t border-stone-100 px-4 py-2 text-sm font-bold text-primary transition hover:bg-stone-100"
                  >
                    Yeni Gelenler
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <div className="relative w-72">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  search
                </span>
                <input
                  className="w-full rounded-xl border-none bg-surface-container-low px-10 py-3 text-sm outline-none"
                  placeholder="Katalogda ara..."
                  type="text"
                />
              </div>

              <Link
                href="/hesap"
                className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition ${
                  pathname === "/hesap"
                    ? "text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                <span className="material-symbols-outlined">person</span>
                <span>{user ? `${user.firstName} ${user.lastName}` : "Hesap"}</span>
              </Link>

              <Link
                href="/sepet"
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                  pathname === "/sepet" || pathname === "/odeme"
                    ? "bg-primary text-white"
                    : "text-primary hover:bg-stone-200/50"
                }`}
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                <span>Sepet ({cartCount})</span>
              </Link>
            </div>

            <button
              className="rounded-lg border border-outline-variant/30 px-4 py-2 text-sm font-semibold lg:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              type="button"
            >
              Menü
            </button>
          </div>

          {mobileOpen ? (
            <div className="border-t border-outline-variant/10 py-4 lg:hidden">
              <div className="rounded-[1.75rem] bg-white p-4 shadow-soft">
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-4">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.24em] text-primary">
                      Hızlı Erişim
                    </div>
                    <div className="mt-1 text-base font-black">
                      {user ? `${user.firstName} ${user.lastName}` : "Hesabınıza gidin"}
                    </div>
                  </div>
                  <Link
                    href="/hesap"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="material-symbols-outlined">north_east</span>
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {mobileLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`rounded-2xl border px-4 py-4 transition ${
                          active
                            ? "border-primary bg-primary text-white"
                            : "border-outline-variant/20 bg-white text-on-surface"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="material-symbols-outlined text-xl">{link.icon}</span>
                        <div className="mt-3 text-sm font-bold">{link.label}</div>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-2xl bg-stone-900 px-4 py-4 text-white">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-black uppercase tracking-[0.24em] text-white/70">
                        Sepet Özeti
                      </div>
                      <div className="mt-1 text-lg font-black">{cartCount} ürün seçildi</div>
                    </div>
                    <Link
                      href="/sepet"
                      className="rounded-xl bg-primary px-4 py-2 text-sm font-bold"
                      onClick={() => setMobileOpen(false)}
                    >
                      Sepete Git
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <CartNotice />

      <main>{children}</main>

      <footer className="mt-20 bg-stone-900 text-white">
        <div className="container-shell grid gap-10 py-14 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-4">
            <div className="text-xl font-black tracking-tight">VY | Hırdavat</div>
            <p className="max-w-sm text-sm leading-7 text-stone-400">
              Profesyonel ekipman, mimari tedarik ve yoğun saha kullanımı için seçilmiş ürünler.
            </p>
          </div>

          <div>
            <div className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-white/80">
              Hızlı Erişim
            </div>
            <div className="space-y-3 text-sm text-stone-400">
              <div>
                <Link href="/urunler" className="transition hover:text-white">
                  Ürünler
                </Link>
              </div>
              <div>
                <Link href="/sepet" className="transition hover:text-white">
                  Sepetim
                </Link>
              </div>
              <div>
                <Link href="/hesap" className="transition hover:text-white">
                  Hesabım
                </Link>
              </div>
              <div>
                <Link href="/odeme" className="transition hover:text-white">
                  Ödeme
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-white/80">
              Kategoriler
            </div>
            <div className="space-y-3 text-sm text-stone-400">
              {categoryLinks.map((category) => (
                <div key={category}>{category}</div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-bold uppercase tracking-[0.24em] text-white/80">
              İletişim
            </div>
            <div className="rounded-2xl bg-stone-800 p-5 text-sm leading-7 text-stone-300">
              <div>
                Mail:{" "}
                <a className="font-semibold text-white/90 hover:text-white" href="mailto:bilgi@vartoyazilim.com">
                  bilgi@vartoyazilim.com
                </a>
              </div>
              <div>
                Instagram:{" "}
                <a
                  className="font-semibold text-white/90 hover:text-white"
                  href="https://instagram.com/vartoyazilim"
                  rel="noreferrer"
                  target="_blank"
                >
                  instagram.com/vartoyazilim
                </a>
              </div>
              <div>
                Numara:{" "}
                <a className="font-semibold text-white/90 hover:text-white" href="tel:+905012998492">
                  0501 299 8492
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
