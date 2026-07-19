import Link from "next/link";
import { allProducts, categories, categorySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { thumb } from "@/lib/img";
import SearchBar from "@/components/SearchBar";

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

function categoryImage(cat: string): string | null {
  const p = allProducts.find((x) => x.category === cat && x.images[0]);
  return p ? p.images[0] : null;
}

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
      {/* ═══ HERO ═══ */}
      <section style={{ background: "linear-gradient(135deg, #1c1c1c 0%, #2d2d2d 55%, #3a2317 100%)", padding: "44px 0 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -120, right: -80, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,66,10,0.22) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, alignItems: "center" }} className="hero-grid2">
            {/* Sol: başlık + arama */}
            <div>
              <span style={{ display: "inline-block", background: "rgba(232,66,10,0.18)", border: "1px solid rgba(232,66,10,0.45)", color: "#ff8a5c", fontSize: 12, fontWeight: 800, padding: "5px 12px", borderRadius: 20, marginBottom: 18, letterSpacing: "0.05em" }}>
                🏭 KONYA TEKNOKENT · YERLİ ÜRETİM
              </span>
              <h1 style={{ fontSize: "clamp(28px, 4.5vw, 46px)", fontWeight: 800, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.015em", marginBottom: 14 }}>
                Sahada güvenlik,<br />
                <span style={{ color: "var(--orange)" }}>tek adreste.</span>
              </h1>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 24, maxWidth: 440 }}>
                246 çeşit trafik güvenliği, su yalıtımı ve iş güvenliği ekipmanı. CE & TSE belgeli. Jandarma, Sahil Güvenlik ve kamu kurumu referanslı.
              </p>

              {/* Hero arama */}
              <div style={{ maxWidth: 460, marginBottom: 14 }}>
                <SearchBar />
              </div>

              {/* Popüler aramalar */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>Popüler:</span>
                {[
                  ["Trafik Konisi", "/kategori/trafik-konisi-ve-duba"],
                  ["Delinatör", "/kategori/delinator"],
                  ["Membran", "/kategori/yalitim-malzemesi"],
                  ["Uyarı Levhası", "/kategori/trafik-uyari-levhalari"],
                ].map(([label, href]) => (
                  <Link key={label} href={href}
                    style={{ fontSize: 12.5, color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", padding: "5px 12px", borderRadius: 16, textDecoration: "none", fontWeight: 600 }}
                  >{label}</Link>
                ))}
              </div>
            </div>

            {/* Sağ: gerçek ürün foto kolajı */}
            <div className="hero-collage" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                ["Trafik Konisi & Duba", "Koniler & Dubalar"],
                ["Trafik Uyarı Levhaları", "Uyarı Levhaları"],
                ["Yalıtım Malzemesi", "Su Yalıtımı"],
                ["Delinatör", "Delinatörler"],
              ].map(([cat, label], i) => {
                const img = categoryImage(cat);
                if (!img) return null;
                return (
                  <Link key={cat} href={`/kategori/${categorySlug(cat)}`}
                    style={{ background: "#fff", borderRadius: 12, overflow: "hidden", textDecoration: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.35)", transform: i % 2 === 0 ? "translateY(-6px)" : "translateY(6px)", display: "block" }}
                  >
                    <div style={{ aspectRatio: "1/1", position: "relative", padding: 8 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={thumb(img, 400)} alt={label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 800, color: "var(--text)", textAlign: "center", padding: "0 8px 10px" }}>{label}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Alt istatistik şeridi */}
          <div style={{ display: "flex", gap: 0, marginTop: 36, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, flexWrap: "wrap" }} className="hero-stats">
            {[["246+", "Ürün Çeşidi"], ["5.000+", "Mutlu Müşteri"], ["10+", "Yıl Deneyim"], ["2 Gün", "Ort. Kargo Süresi"]].map(([v, l]) => (
              <div key={l} style={{ flex: 1, minWidth: 120, textAlign: "center" }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{v}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{l}</p>
              </div>
            ))}
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
            {categories.map((c) => {
              const img = categoryImage(c);
              return (
                <Link key={c} href={`/kategori/${categorySlug(c)}`}
                  style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 8, padding: "12px 12px 14px", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center", boxShadow: "var(--shadow-sm)" }}
                >
                  <div style={{ width: "100%", aspectRatio: "1/1", position: "relative", background: "#fff" }}>
                    {img ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={thumb(img)} alt={c} style={{ width: "100%", height: "100%", objectFit: "contain" }} loading="lazy" />
                    ) : (
                      <span style={{ fontSize: 40, display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>{categoryEmoji[c] || "📦"}</span>
                    )}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>{c}</span>
                  <span style={{ fontSize: 11.5, color: "var(--orange)", fontWeight: 700 }}>
                    {allProducts.filter(p => p.category === c).length} ürün →
                  </span>
                </Link>
              );
            })}
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
          .hero-grid2 { grid-template-columns: 1fr !important; }
          .hero-collage { max-width: 380px; margin: 0 auto; }
        }
        @media (max-width: 480px) {
          .trust-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
