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

const heroSlides = [
  {
    title: "Trafik Güvenliği Ekipmanları",
    subtitle: "Koniler, delinatörler, levhalar — CE & TSE belgeli, yerli üretim",
    cta: "Ürünleri İncele",
    href: "/urunler",
    emoji: "🚧",
    bg: "linear-gradient(120deg, #e8420a 0%, #b23208 100%)",
  },
  {
    title: "Su Yalıtım Membranları",
    subtitle: "Bitümlü membranlar, profesyonel yalıtım çözümleri",
    cta: "Membranları Gör",
    href: "/kategori/yalitim-malzemesi",
    emoji: "🏗️",
    bg: "linear-gradient(120deg, #232323 0%, #4a4a4a 100%)",
  },
  {
    title: "Kurumsal & Toplu Sipariş",
    subtitle: "Belediyeler ve inşaat firmaları için özel fiyatlandırma",
    cta: "Teklif Al",
    href: "https://wa.me/905076584245",
    emoji: "🏢",
    bg: "linear-gradient(120deg, #1a8f3c 0%, #10692a 100%)",
  },
];

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

  const cones = allProducts.filter(p => p.category === "Trafik Konisi & Duba" && p.images[0]).slice(0, 5);
  const levhalar = allProducts.filter(p => p.category === "Trafik Uyarı Levhaları" && p.images[0]).slice(0, 5);
  const membranes = allProducts.filter(p => p.category === "Yalıtım Malzemesi" && p.images[0]).slice(0, 5);

  return (
    <main>
      {/* ═══ HERO SLIDER ═══ */}
      <section style={{ padding: "16px 0 0" }}>
        <div className="container">
          <div style={{ overflow: "hidden", borderRadius: 12, boxShadow: "var(--shadow)" }}>
            <div className="hero-track">
              {heroSlides.map((s) => (
                <div key={s.title} style={{ width: "100%", flexShrink: 0, background: s.bg, padding: "48px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, minHeight: 240 }}>
                  <div style={{ maxWidth: 520 }}>
                    <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 10, letterSpacing: "-0.01em" }}>
                      {s.title}
                    </h2>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 22 }}>{s.subtitle}</p>
                    <Link href={s.href} style={{ display: "inline-block", background: "#fff", color: "var(--text)", padding: "11px 26px", borderRadius: 6, fontWeight: 800, fontSize: 14, textDecoration: "none" }}>
                      {s.cta} →
                    </Link>
                  </div>
                  <span style={{ fontSize: 96, lineHeight: 1 }} className="hero-emoji">{s.emoji}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GÜVEN ROZETLERI ═══ */}
      <section style={{ padding: "20px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }} className="trust-grid">
            {[
              { icon: "🚚", title: "Hızlı Kargo", desc: "Türkiye'nin her yerine" },
              { icon: "✅", title: "%100 Orijinal Ürün", desc: "CE & TSE belgeli, yerli üretim" },
              { icon: "🔒", title: "Güvenli Alışveriş", desc: "256bit SSL + iyzico altyapısı" },
              { icon: "🧾", title: "Kurumsal Fatura", desc: "Toplu siparişe özel fiyat" },
            ].map((t) => (
              <div key={t.title} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 8, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12, boxShadow: "var(--shadow-sm)" }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{t.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 13.5, fontWeight: 800, color: "var(--text)", lineHeight: 1.25 }}>{t.title}</p>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.35 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ÖNE ÇIKAN ÜRÜNLER ═══ */}
      <section style={{ padding: "12px 0 28px" }}>
        <div className="container">
          <div className="section-title"><span>⭐ Öne Çıkan Ürünler</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 12 }}>
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ═══ KATEGORİ KARTLARI ═══ */}
      <section style={{ padding: "0 0 28px" }}>
        <div className="container">
          <div className="section-title"><span>📂 Kategoriler</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 10 }}>
            {categories.map((c) => (
              <Link key={c} href={`/kategori/${categorySlug(c)}`}
                style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 8, padding: "18px 14px", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center", boxShadow: "var(--shadow-sm)" }}
              >
                <span style={{ fontSize: 34 }}>{categoryEmoji[c] || "📦"}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>{c}</span>
                <span style={{ fontSize: 11.5, color: "var(--orange)", fontWeight: 700 }}>
                  {allProducts.filter(p => p.category === c).length} ürün →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRAFİK KONİSİ ═══ */}
      {cones.length > 0 && (
        <section style={{ padding: "0 0 28px" }}>
          <div className="container">
            <div className="section-title"><span>🚧 Trafik Konisi & Duba</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 12 }}>
              {cones.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <Link href={`/kategori/${categorySlug("Trafik Konisi & Duba")}`} className="btn-outline">Tümünü Gör →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ TAM GENİŞLİK KURUMSAL BANNER ═══ */}
      <section style={{ padding: "0 0 28px" }}>
        <div className="container">
          <div style={{ background: "linear-gradient(120deg, var(--dark) 0%, #3d3d3d 100%)", borderRadius: 12, padding: "32px 36px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 18 }}>
            <div>
              <p style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Belediye & Şantiye Toplu Alımları</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>Jandarma, Sahil Güvenlik, hastane ve üniversite referanslarımızla kurumsal tedarik. EKAP deneyimi.</p>
            </div>
            <a href="https://wa.me/905076584245" className="btn-primary" style={{ fontSize: 15, padding: "13px 28px" }}>
              💬 Hemen Teklif Al
            </a>
          </div>
        </div>
      </section>

      {/* ═══ UYARI LEVHALARI ═══ */}
      {levhalar.length > 0 && (
        <section style={{ padding: "0 0 28px" }}>
          <div className="container">
            <div className="section-title"><span>🚦 Trafik Uyarı Levhaları</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 12 }}>
              {levhalar.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <Link href={`/kategori/${categorySlug("Trafik Uyarı Levhaları")}`} className="btn-outline">Tümünü Gör →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ MEMBRANLAR ═══ */}
      {membranes.length > 0 && (
        <section style={{ padding: "0 0 28px" }}>
          <div className="container">
            <div className="section-title"><span>🏗️ Su Yalıtım Membranları</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 12 }}>
              {membranes.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <Link href={`/kategori/${categorySlug("Yalıtım Malzemesi")}`} className="btn-outline">Tümünü Gör →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ SEO İÇERİK ═══ */}
      <section style={{ background: "#fff", borderTop: "1px solid var(--border)", padding: "36px 0" }}>
        <div className="container">
          <h2 style={{ fontSize: 17, fontWeight: 800, color: "var(--text)", marginBottom: 12 }}>
            Trafik Güvenliği ve Yalıtım Ürünlerinde Güvenilir Adres
          </h2>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: 860 }}>
            <p style={{ marginBottom: 12 }}>
              CV Sepeti, Konya Teknokent bünyesinde faaliyet gösteren, <strong>trafik konisi</strong>, <strong>delinatör</strong>, <strong>trafik uyarı levhaları</strong>, <strong>su yalıtım membranı</strong> ve <strong>iş güvenliği ekipmanları</strong> alanında uzmanlaşmış bir teknoloji firmasıdır. Belediyeler, inşaat firmaları, şantiyeler ve kurumsal alıcılar için CE ve TSE belgeli ürünler sunuyoruz.
            </p>
            <p style={{ marginBottom: 12 }}>
              Ürün gamımızda <strong>trafik dubası</strong>, <strong>kasis ve yol butonu</strong>, <strong>güvenlik aynası</strong>, <strong>araç stoperi</strong>, <strong>dikme ve panel sistemleri</strong>, <strong>elektrikçi eldiveni</strong> ve bitümlü <strong>su yalıtım membranları</strong> bulunmaktadır. Tüm ürünlerimiz yerli üretim olup Türkiye&apos;nin her yerine hızlı kargo ile gönderilmektedir.
            </p>
            <p>
              Toplu siparişlerde özel fiyatlandırma, kurumsal fatura ve iyzico altyapısı ile güvenli ödeme imkânı sağlıyoruz. Sorularınız için WhatsApp üzerinden 7/24 bize ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .trust-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-emoji { display: none; }
        }
        @media (max-width: 480px) {
          .trust-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
