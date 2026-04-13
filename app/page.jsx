import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getBestSellerProducts, getCategories, getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const categories = getCategories();
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellerProducts().slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden bg-surface px-8 py-20">
        <div className="container-shell grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="z-10 lg:col-span-6">
            <span className="eyebrow mb-6">Yeni Nesil Seri</span>
            <h1 className="text-6xl font-extrabold leading-[1.05] tracking-tighter text-on-background md:text-7xl">
              Aşırı hassasiyet için <br />
              <span className="text-primary italic">tasarlandı.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-on-surface-variant">
              Cobalt-X Fırçasız Seri, yüksek torku kontrollü hassasiyetle bir araya getirir. Hata payını azaltmak isteyen profesyonel kullanıcılar için geliştirildi.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link className="btn-primary px-8 py-4" href="/urunler">
                Alışverişe Başla
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
              <Link
                className="btn-secondary px-8 py-4"
                href="/urunler/kobalt-x-18v-profesyonel-matkap"
              >
                Teknik Özellikler
              </Link>
            </div>
          </div>

          <div className="relative h-[500px] lg:col-span-6 lg:h-[600px]">
            <div className="absolute inset-0 rotate-2 rounded-xl bg-surface-container-low" />
            <img
              alt="Profesyonel matkap"
              className="absolute inset-0 z-20 h-full w-full rounded-xl object-cover shadow-2xl"
              src={featuredProducts[0].image}
            />
            <div className="absolute -bottom-6 -left-6 z-30 hidden rounded-lg bg-surface-container-highest p-6 shadow-xl md:block">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-tight text-on-surface-variant">
                    Anlık Güç
                  </div>
                  <div className="text-xl font-black">1.400 IN-LBS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <div className="mb-12 flex justify-between gap-4">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-on-surface">
                Profesyonel Kategoriler
              </h2>
              <p className="mt-2 text-on-surface-variant">
                Uygulama alanına ve profesyonel gereksinime göre filtrelenmiş ürün gruplarını inceleyin.
              </p>
            </div>
            <Link className="flex items-center gap-1 text-sm font-bold text-primary" href="/urunler">
              Kataloğu Gör
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/urunler?kategori=${encodeURIComponent(category.name)}`}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-surface-container-low"
              >
                <img
                  alt={category.name}
                  className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
                  src={category.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                  <p className="mt-1 text-xs text-stone-300">{category.count} ürün</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-surface-container-low">
        <div className="container-shell">
          <div className="relative overflow-hidden rounded-2xl bg-industrial-gradient p-12 md:p-20">
            <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-10">
              <span className="material-symbols-outlined text-[400px]">architecture</span>
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-5xl font-extrabold text-white">İlk Siparişe %15 İndirim</h2>
              <p className="mb-10 mt-6 text-lg text-white/90">
                Iron & Amber profesyonel ağına katılın, yeni teknik ürün lansmanlarına ve mimari seviye tedarik kampanyalarına erken erişim alın.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <input
                  className="flex-1 rounded-lg border border-white/20 bg-white/10 px-6 py-4 text-white placeholder:text-white/60 outline-none backdrop-blur-md"
                  placeholder="profesyonel@email.com"
                  type="email"
                />
                <button className="rounded-lg bg-on-background px-8 py-4 font-bold text-white transition-colors hover:bg-stone-800">
                  Kayıt Ol
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <h2 className="mb-12 text-4xl font-extrabold tracking-tight text-on-surface">
            Çok Satanlar: Saha Testli
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} variant="showcase" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
