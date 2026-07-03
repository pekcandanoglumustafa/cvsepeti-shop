"use client";

import Link from "next/link";
import { categories, categorySlug } from "@/lib/products";

export default function Footer() {
  return (
    <footer style={{ marginTop: 40 }}>
      {/* Kayan ücretsiz kargo şeridi */}
      <div style={{ background: "var(--orange)", overflow: "hidden", padding: "9px 0" }}>
        <div className="ship-marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ color: "#fff", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", padding: "0 28px" }}>
              ✦ Türkiye&apos;nin Her Yerine Hızlı Kargo ✦ Kurumsal Fatura ✦ iyzico ile Güvenli Ödeme
            </span>
          ))}
        </div>
      </div>

      <div style={{ background: "var(--dark)", color: "#bbb" }}>
        <div className="container" style={{ padding: "44px 20px 28px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.2fr", gap: 36, marginBottom: 32 }} className="footer-grid">
            {/* Marka */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 18 }}>C</div>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>CV SEPETİ</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 280, marginBottom: 16 }}>
                Trafik güvenliği, su yalıtımı ve iş güvenliği ekipmanları. Konya Teknokent firması. Jandarma, Sahil Güvenlik ve kamu kurumu referanslı.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <a href="https://wa.me/905076584245" target="_blank" rel="noreferrer"
                  style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: "#25D366", padding: "6px 12px", borderRadius: 5, textDecoration: "none" }}>
                  WhatsApp
                </a>
                <a href="https://www.instagram.com/cvsepetii" target="_blank" rel="noreferrer"
                  style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: "#E1306C", padding: "6px 12px", borderRadius: 5, textDecoration: "none" }}>
                  Instagram
                </a>
              </div>
            </div>

            {/* Kategoriler 1 */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>Mağaza</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <Link href="/urunler" style={{ fontSize: 13, color: "#bbb", textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "#bbb"}
                >Tüm Ürünler</Link>
                {categories.slice(0, 5).map(c => (
                  <Link key={c} href={`/kategori/${categorySlug(c)}`}
                    style={{ fontSize: 13, color: "#bbb", textDecoration: "none" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "#bbb"}
                  >{c}</Link>
                ))}
              </div>
            </div>

            {/* Kategoriler 2 */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>Kategoriler</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {categories.slice(5).map(c => (
                  <Link key={c} href={`/kategori/${categorySlug(c)}`}
                    style={{ fontSize: 13, color: "#bbb", textDecoration: "none" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "#bbb"}
                  >{c}</Link>
                ))}
              </div>
            </div>

            {/* İletişim */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>İletişim</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <a href="tel:05076584245" style={{ fontSize: 14, color: "#fff", textDecoration: "none", fontWeight: 700 }}>📞 0 507 658 42 45</a>
                <a href="https://wa.me/905076584245" style={{ fontSize: 13, color: "#25D366", textDecoration: "none", fontWeight: 600 }}>💬 WhatsApp ile Yaz</a>
                <p style={{ fontSize: 13, lineHeight: 1.6 }}>Akademi Mah. Gürbulut Sk.<br />Teknokent No:67<br />Selçuklu / Konya</p>
                <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 5 }}>
                  {["iyzico Güvenli Ödeme", "CE & TSE Belgeli", "Hızlı Kargo"].map(t => (
                    <span key={t} style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "var(--orange)", fontWeight: 800 }}>✓</span> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <p style={{ fontSize: 12, color: "#888" }}>© 2025 CV Sepeti. Tüm hakları saklıdır.</p>
            <p style={{ fontSize: 12, color: "#888" }}>Kredi kartı bilgileriniz 256bit SSL sertifikası ile korunmaktadır.</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
