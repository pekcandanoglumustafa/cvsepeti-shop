import Link from "next/link";
import { allProducts, categories, categorySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const categoryEmoji: Record<string, string> = {
  "Trafik Konisi & Duba": "🚧",
  "Trafik Uyarı Levhaları": "🚦",
  "Yalıtım Malzemesi": "🏗️",
  "Yol İşaretleme & Kasis": "🛑",
  "Dikme & Panel Sistemleri": "⚠️",
  "Delinatör": "🔶",
  "İş Güvenliği Ekipmanları": "🦺",
  "Güvenlik Bariyeri & Aynası": "🪞",
  "Araç Stoperi": "🚗",
  "Elektrikçi Eldiveni": "⚡",
};

export default function Home() {
  const featured = allProducts.filter((p) => p.images[0]).slice(0, 8);
  const membranes = allProducts.filter((p) => p.category === "Yalıtım Malzemesi").slice(0, 4);
  const cones = allProducts.filter((p) => p.category === "Trafik Konisi & Duba" && p.images[0]).slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section style={{ background: "var(--off-white)", padding: "80px 20px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 17, color: "var(--orange)", fontWeight: 600, marginBottom: 8 }}>
            Trafik & Güvenlik Ekipmanları
          </p>
          <h1 style={{ fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.08, color: "var(--text)", marginBottom: 16 }}>
            Güvenliği ciddiye alın.
          </h1>
          <p style={{ fontSize: 21, color: "var(--text-secondary)", maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.4 }}>
            Trafik malzemeleri, su yalıtım membranları, uyarı sistemleri. 246 ürün, hızlı kargo.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/urunler" style={{ background: "var(--text)", color: "#fff", padding: "14px 28px", borderRadius: 980, fontSize: 17, fontWeight: 500, textDecoration: "none", transition: "background .2s" }}>
              Alışverişe başla
            </Link>
            <a href="tel:05076584245" style={{ background: "transparent", color: "var(--blue)", padding: "14px 28px", borderRadius: 980, fontSize: 17, fontWeight: 500, textDecoration: "none" }}>
              Bizi ara →
            </a>
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "64px 20px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 24, color: "var(--text)" }}>
          Kategoriler
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/kategori/${categorySlug(c)}`}
              style={{
                background: "var(--off-white)",
                borderRadius: 14,
                padding: "20px 16px",
                textDecoration: "none",
                color: "var(--text)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                transition: "background .2s",
              }}
            >
              <span style={{ fontSize: 28 }}>{categoryEmoji[c] || "📦"}</span>
              <span style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{c}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "0 20px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--text)" }}>Öne çıkanlar</h2>
          <Link href="/urunler" style={{ fontSize: 17, color: "var(--blue)", textDecoration: "none" }}>Tümünü gör</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Membranes */}
      {membranes.length > 0 && (
        <section style={{ background: "var(--off-white)", padding: "64px 20px" }}>
          <div style={{ maxWidth: 980, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--text)" }}>Su Yalıtım Membranları</h2>
              <Link href="/kategori/yalitim-malzemesi" style={{ fontSize: 17, color: "var(--blue)", textDecoration: "none" }}>Tümünü gör</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
              {membranes.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cones */}
      {cones.length > 0 && (
        <section style={{ maxWidth: 980, margin: "0 auto", padding: "64px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--text)" }}>Trafik Konileri & Dubalar</h2>
            <Link href="/kategori/trafik-konisi-duba" style={{ fontSize: 17, color: "var(--blue)", textDecoration: "none" }}>Tümünü gör</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
            {cones.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* CTA banner */}
      <section style={{ background: "var(--text)", color: "#fff", padding: "64px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 12 }}>
            Toplu sipariş için iletişime geçin.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>
            Belediyeler, inşaat şirketleri ve kurumsal müşteriler için özel fiyat.
          </p>
          <a
            href="https://wa.me/905076584245"
            style={{ display: "inline-block", background: "#fff", color: "var(--text)", padding: "14px 28px", borderRadius: 980, fontSize: 17, fontWeight: 500, textDecoration: "none" }}
          >
            WhatsApp'tan yaz
          </a>
        </div>
      </section>
    </main>
  );
}
