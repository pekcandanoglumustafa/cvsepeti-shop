import Link from "next/link";
import CategoryMarquee from "@/components/CategoryMarquee";
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
  const featured = (() => {
    const seen = new Set<string>();
    const picked: typeof allProducts = [];
    for (const p of allProducts) {
      if (p.images[0] && !seen.has(p.category) && picked.length < 10) {
        seen.add(p.category);
        picked.push(p);
      }
    }
    return picked;
  })();

  const cones = allProducts.filter(p => p.category === "Trafik Konisi & Duba" && p.images[0]).slice(0, 4);
  const levhalar = allProducts.filter(p => p.category === "Trafik Uyarı Levhaları" && p.images[0]).slice(0, 4);

  return (
    <main>
      {/* ─── HERO ─── */}
      <section style={{ background: "#fff", borderBottom: "1px solid var(--border)", padding: "40px 0 32px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }} className="hero-grid">
            <div>
              <span style={{ display: "inline-block", background: "var(--orange-light)", color: "var(--orange)", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 4, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Konya Teknokent · Yerli Üretim
              </span>
              <h1 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "var(--text)", lineHeight: 1.2, marginBottom: 16, letterSpacing: "-0.01em" }}>
                Trafik & İş Güvenliği<br />
                <span style={{ color: "var(--orange)" }}>Ekipmanları</span>
              </h1>
              <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 28, maxWidth: 420 }}>
                246 ürün çeşidi, CE & TSE belgeli kalite. Belediyeler, inşaat firmaları ve kurumsal alıcılar için hızlı teslimat.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/urunler" className="btn-primary">Ürünleri İncele →</Link>
                <a href="https://wa.me/905076584245" className="btn-outline">Teklif Al</a>
              </div>

              {/* Trust badges */}
              <div style={{ display: "flex", gap: 20, marginTop: 28, flexWrap: "wrap" }}>
                {[["✓", "CE & TSE Belgeli"], ["✓", "Hızlı Kargo"], ["✓", "Kurumsal Fatura"], ["✓", "iyzico Güvenli"]].map(([icon, label]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ color: "var(--orange)", fontWeight: 700, fontSize: 13 }}>{icon}</span>
                    <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { value: "246+", label: "Ürün Çeşidi", icon: "📦" },
                { value: "5.000+", label: "Mutlu Müşteri", icon: "⭐" },
                { value: "10+", label: "Yıl Deneyim", icon: "🏆" },
                { value: "2 Gün", label: "Ortalama Kargo", icon: "🚚" },
              ].map((s) => (
                <div key={s.label} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 10, padding: "20px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 2 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section style={{ padding: "28px 0 0" }}>
        <div className="container">
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            <Link href="/urunler"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fff", border: "1.5px solid var(--border)", borderRadius: 20, padding: "7px 14px", fontSize: 13, fontWeight: 600, color: "var(--text)", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0, transition: "border-color 0.15s" }}
            >
              🏪 Tümü
            </Link>
            {categories.map((c) => (
              <Link key={c} href={`/kategori/${categorySlug(c)}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fff", border: "1.5px solid var(--border)", borderRadius: 20, padding: "7px 14px", fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0, transition: "border-color 0.15s, color 0.15s" }}
              >
                {categoryEmoji[c] || "📦"} {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section style={{ padding: "28px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--text)" }}>Öne Çıkan Ürünler</h2>
            <Link href="/urunler" style={{ fontSize: 13, color: "var(--orange)", fontWeight: 600, textDecoration: "none" }}>Tümünü Gör →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 12 }}>
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ─── BANNER ─── */}
      <section style={{ padding: "0 0 28px" }}>
        <div className="container">
          <div style={{ background: "linear-gradient(135deg, #e8420a 0%, #c93708 100%)", borderRadius: 12, padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Toplu sipariş indirimi</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>Belediye, inşaat ve kurumsal alımlar için özel fiyat. Hemen yazın.</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <a href="https://wa.me/905076584245" style={{ background: "#fff", color: "var(--orange)", padding: "10px 20px", borderRadius: 7, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>WhatsApp</a>
              <a href="tel:05076584245" style={{ background: "rgba(255,255,255,0.2)", color: "#fff", padding: "10px 20px", borderRadius: 7, fontWeight: 600, fontSize: 14, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)" }}>Telefon</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONES ─── */}
      {cones.length > 0 && (
        <section style={{ padding: "0 0 28px" }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--text)" }}>🚧 Trafik Konisi & Duba</h2>
              <Link href="/kategori/trafik-konisi-ve-duba" style={{ fontSize: 13, color: "var(--orange)", fontWeight: 600, textDecoration: "none" }}>Tümünü Gör →</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 12 }}>
              {cones.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ─── LEVHALAR ─── */}
      {levhalar.length > 0 && (
        <section style={{ padding: "0 0 40px" }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--text)" }}>🚦 Trafik Uyarı Levhaları</h2>
              <Link href="/kategori/trafik-uyari-levhalari" style={{ fontSize: 13, color: "var(--orange)", fontWeight: 600, textDecoration: "none" }}>Tümünü Gör →</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 12 }}>
              {levhalar.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ─── SEO CONTENT ─── */}
      <section style={{ background: "#fff", borderTop: "1px solid var(--border)", padding: "40px 0" }}>
        <div className="container">
          <h2 style={{ fontSize: 17, fontWeight: 800, color: "var(--text)", marginBottom: 12 }}>
            Trafik Güvenliği ve Yalıtım Ürünlerinde Güvenilir Adres
          </h2>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: 820 }}>
            <p style={{ marginBottom: 12 }}>
              CV Sepeti, Konya Teknokent bünyesinde faaliyet gösteren, <strong>trafik konisi</strong>, <strong>delinatör</strong>, <strong>trafik uyarı levhaları</strong>, <strong>su yalıtım membranı</strong> ve <strong>iş güvenliği ekipmanları</strong> alanında uzmanlaşmış bir teknoloji firmasıdır. Belediyeler, inşaat firmaları, şantiyeler ve kurumsal alıcılar için CE ve TSE belgeli ürünler sunuyoruz.
            </p>
            <p style={{ marginBottom: 12 }}>
              Ürün gamımızda <strong>trafik dubası</strong>, <strong>kasis ve yol butonu</strong>, <strong>güvenlik aynası</strong>, <strong>araç stoperi</strong>, <strong>dikme ve panel sistemleri</strong>, <strong>elektrikçi eldiveni</strong> ve bitümlü <strong>su yalıtım membranları</strong> bulunmaktadır. Tüm ürünlerimiz yerli üretim olup Türkiye'nin her yerine hızlı kargo ile gönderilmektedir.
            </p>
            <p>
              Toplu siparişlerde özel fiyatlandırma, kurumsal fatura ve iyzico altyapısı ile güvenli ödeme imkânı sağlıyoruz. Sorularınız için WhatsApp üzerinden 7/24 bize ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none !important; }
        }
      `}</style>
    </main>
  );
}
