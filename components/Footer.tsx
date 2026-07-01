"use client";

import Link from "next/link";
import { categories, categorySlug } from "@/lib/products";

export default function Footer() {
  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", marginTop: 0 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ width: 32, height: 32, borderRadius: 8, background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff" }}>C</span>
              <span style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>CV Sepeti</span>
            </div>
            <p style={{ fontSize: 14, color: "var(--text-tertiary)", lineHeight: 1.6, maxWidth: 280, marginBottom: 20 }}>
              Trafik güvenliği, su yalıtımı ve iş güvenliği ekipmanları. Konya Teknokent'ten Türkiye'ye hizmet veriyoruz.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="https://www.instagram.com/cvsepetii" target="_blank" rel="noreferrer"
                style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid var(--border-solid)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", textDecoration: "none", fontSize: 16, transition: "border-color 0.2s, color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--orange)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-solid)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
              >
                IG
              </a>
              <a href="https://wa.me/905076584245" target="_blank" rel="noreferrer"
                style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid var(--border-solid)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", textDecoration: "none", fontSize: 12, fontWeight: 600, transition: "border-color 0.2s, color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#22c55e"; e.currentTarget.style.color = "#22c55e"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-solid)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
              >
                WA
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>Ürünler</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/urunler" style={{ fontSize: 14, color: "var(--text-tertiary)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-tertiary)")}
              >Tüm Ürünler</Link>
              {categories.slice(0, 5).map((c) => (
                <Link key={c} href={`/kategori/${categorySlug(c)}`}
                  style={{ fontSize: 14, color: "var(--text-tertiary)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-tertiary)")}
                >{c}</Link>
              ))}
            </div>
          </div>

          {/* More categories */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>Kategoriler</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {categories.slice(5).map((c) => (
                <Link key={c} href={`/kategori/${categorySlug(c)}`}
                  style={{ fontSize: 14, color: "var(--text-tertiary)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-tertiary)")}
                >{c}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>İletişim</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="tel:05076584245" style={{ fontSize: 14, color: "var(--text-tertiary)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-tertiary)")}
              >0 507 658 42 45</a>
              <a href="https://wa.me/905076584245" style={{ fontSize: 14, color: "var(--text-tertiary)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#22c55e")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-tertiary)")}
              >WhatsApp</a>
              <p style={{ fontSize: 14, color: "var(--text-tertiary)", lineHeight: 1.5 }}>Akademi Mah. Gürbulut Sk.<br />Teknokent No:67<br />Selçuklu / Konya</p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 13, color: "var(--text-tertiary)" }}>© 2025 CV Sepeti. Tüm hakları saklıdır.</p>
          <p style={{ fontSize: 13, color: "var(--text-tertiary)" }}>iyzico ile güvenli ödeme · Hızlı kargo</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
