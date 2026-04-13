import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="card-surface p-10 text-center">
          <h1 className="text-4xl font-black tracking-tight">Sayfa bulunamadı</h1>
          <p className="mt-3 text-sm leading-7 text-on-surface-variant">
            Aradığınız içerik şu anda erişilebilir değil.
          </p>
          <Link className="btn-primary mt-6" href="/">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    </section>
  );
}
