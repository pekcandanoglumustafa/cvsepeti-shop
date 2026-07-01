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

const stats = [
  { value: "246+", label: "Ürün" },
  { value: "5K+", label: "Müşteri" },
  { value: "10+", label: "Yıl Deneyim" },
  { value: "%100", label: "Yerli Üretim" },
];

const marqueeItems = [
  "🚧 Trafik Konisi", "🔶 Delinatör", "🏗️ Su Yalıtımı", "🚗 Araç Stoperi",
  "🦺 İş Güvenliği", "🪞 Güvenlik Aynası", "⚠️ Uyarı Levhası", "✈️ ALDIS Havacılık",
  "🚧 Trafik Konisi", "🔶 Delinatör", "🏗️ Su Yalıtımı", "🚗 Araç Stoperi",
  "🦺 İş Güvenliği", "🪞 Güvenlik Aynası", "⚠️ Uyarı Levhası", "✈️ ALDIS Havacılık",
];

export default function Home() {
  const featured = allProducts.filter((p) => p.images[0]).slice(0, 8);
  const membranes = allProducts.filter((p) => p.category === "Yalıtım Malzemesi").slice(0, 4);
  const cones = allProducts.filter((p) => p.category === "Trafik Konisi & Duba" && p.images[0]).slice(0, 4);

  return (
    <main>
      {/* ─── HERO ─── */}
      <section style={{
        position: "relative",
        padding: "100px 24px 80px",
        textAlign: "center",
        overflow: "hidden",
      }}>
        {/* glow blobs */}
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-60%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 50, right: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
          {/* badge */}
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)",
            color: "var(--orange)", fontSize: 13, fontWeight: 600,
            padding: "6px 14px", borderRadius: 980, marginBottom: 28,
          }}>
            🏭 Konya Teknokent · Yerli Üretim
          </span>

          <h1 style={{
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.06,
            color: "var(--text)",
            marginBottom: 24,
          }}>
            Güvenliği{" "}
            <span style={{
              background: "var(--grad)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>ciddiye alın.</span>
          </h1>

          <p style={{ fontSize: "clamp(16px, 2.5vw, 20px)", color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.6 }}>
            Trafik ekipmanları, su yalıtım membranları, iş güvenliği ürünleri. 246 ürün, hızlı kargo, kurumsal fiyat.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/urunler" className="btn-primary">
              Ürünleri Keşfet →
            </Link>
            <a href="https://wa.me/905076584245" className="btn-ghost">
              💬 Teklif Al
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          maxWidth: 600, margin: "64px auto 0",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2,
        }}>
          {stats.map((s) => (
            <div key={s.label} style={{ padding: "20px 16px", borderRight: "1px solid var(--border)" }}>
              <p style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>{s.value}</p>
              <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "18px 0", overflow: "hidden" }}>
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 14, fontWeight: 500, color: "var(--text-secondary)",
              padding: "0 24px", whiteSpace: "nowrap",
            }}>
              {item}
              <span style={{ color: "var(--border-solid)", marginLeft: 8 }}>·</span>
            </span>
          ))}
        </div>
      </section>

      {/* ─── BEFORE / AFTER (Manychat style) ─── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 24px" }}>
        <p style={{ textAlign: "center", fontSize: 13, fontWeight: 600, color: "var(--orange)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Neden CV Sepeti?</p>
        <h2 style={{ textAlign: "center", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 64, color: "var(--text)" }}>
          Fark yaratan <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>ekipmanlar</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="before-after-grid">
          {/* Before */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "32px" }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Diğer Tedarikçiler</p>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Uzun teslimat, soru işaretleri</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Haftalarca bekleme süreleri", "Kalite belgesi belirsiz ürünler", "Toplu sipariş desteği yok", "Teknik destek sunulmuyor"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 20, height: 20, borderRadius: 6, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--text-tertiary)", flexShrink: 0 }}>✕</span>
                  <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(239,68,68,0.05) 100%)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 20, padding: "32px" }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--orange)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>CV Sepeti ile</p>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>Hızlı, güvenilir, kurumsal</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Aynı gün kargo imkânı", "CE & TSE belgeli ürünler", "Belediye & inşaat toplu sipariş", "WhatsApp teknik destek 7/24"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 20, height: 20, borderRadius: 6, background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, color: "var(--text)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--orange)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Katalog</p>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text)" }}>Öne çıkan ürünler</h2>
            </div>
            <Link href="/urunler" style={{ fontSize: 14, color: "var(--orange)", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              Tümünü gör →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--orange)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Ürün Grupları</p>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text)" }}>Kategoriler</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
          {categories.map((c) => (
            <Link key={c} href={`/kategori/${categorySlug(c)}`}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: "20px 16px",
                textDecoration: "none",
                color: "var(--text)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                transition: "border-color 0.2s, background 0.2s",
              }}

            >
              <span style={{ fontSize: 28 }}>{categoryEmoji[c] || "📦"}</span>
              <span style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3, color: "var(--text-secondary)" }}>{c}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── MEMBRANES SPOTLIGHT ─── */}
      {membranes.length > 0 && (
        <section style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 24px" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--orange)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Yalıtım</p>
                <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text)" }}>Su Yalıtım Membranları</h2>
              </div>
              <Link href="/kategori/yalitim-malzemesi" style={{ fontSize: 14, color: "var(--orange)", textDecoration: "none", fontWeight: 600 }}>Tümünü gör →</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
              {membranes.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA BANNER ─── */}
      <section style={{ padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(249,115,22,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 16, color: "var(--text)" }}>
            Toplu sipariş veya teklif mi?
          </h2>
          <p style={{ fontSize: 17, color: "var(--text-secondary)", marginBottom: 36 }}>
            Belediyeler, inşaat firmaları ve kurumsal alıcılar için özel fiyatlandırma. Hemen yazın.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/905076584245" className="btn-primary">
              WhatsApp'tan Yaz
            </a>
            <a href="tel:05076584245" className="btn-ghost">
              Bizi Ara
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .before-after-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
