import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: "70px 0" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 520 }}>
        <p style={{ fontSize: 64, marginBottom: 8 }}>🚧</p>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10 }}>Sayfa Bulunamadı</h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 26 }}>
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Ürünlerimize göz atabilir veya bize ulaşabilirsiniz.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/urunler" className="btn-primary">Tüm Ürünler</Link>
          <a href="https://wa.me/905076584245" className="btn-outline">WhatsApp Destek</a>
        </div>
      </div>
    </main>
  );
}
