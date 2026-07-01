"use client";

import Link from "next/link";
import { categories, categorySlug } from "@/lib/products";

export default function Footer() {
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid var(--border)", marginTop: 48 }}>
      <div className="container" style={{ padding: "40px 20px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32, marginBottom: 32 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 7, background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>C</div>
              <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text)" }}>CV Sepeti</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 260, marginBottom: 16 }}>
              Trafik güvenliği, su yalıtımı ve iş güvenliği ekipmanları. Konya Teknokent firması.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "WhatsApp", href: "https://wa.me/905076584245", color: "#25D366" },
                { label: "Instagram", href: "https://www.instagram.com/cvsepetii", color: "#E1306C" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{ fontSize: 12, fontWeight: 600, color: "#fff", background: s.color, padding: "5px 10px", borderRadius: 5, textDecoration: "none" }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.07em" }}>Ürünler</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link href="/urunler" style={{ fontSize: 13, color: "var(--text-secondary)", textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"}
              >Tüm Ürünler</Link>
              {categories.slice(0, 5).map(c => (
                <Link key={c} href={`/kategori/${categorySlug(c)}`}
                  style={{ fontSize: 13, color: "var(--text-secondary)", textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"}
                >{c}</Link>
              ))}
            </div>
          </div>

          {/* More cats */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.07em" }}>Kategoriler</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {categories.slice(5).map(c => (
                <Link key={c} href={`/kategori/${categorySlug(c)}`}
                  style={{ fontSize: 13, color: "var(--text-secondary)", textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"}
                >{c}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.07em" }}>İletişim</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="tel:05076584245" style={{ fontSize: 13, color: "var(--text-secondary)", textDecoration: "none", fontWeight: 600 }}>0 507 658 42 45</a>
              <a href="https://wa.me/905076584245" style={{ fontSize: 13, color: "#25D366", textDecoration: "none", fontWeight: 600 }}>WhatsApp ile Yaz</a>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>Konya Teknokent<br />Selçuklu / Konya</p>
            </div>

            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
              {["iyzico Güvenli Ödeme", "Hızlı Kargo", "Kurumsal Fatura"].map(t => (
                <span key={t} style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ color: "var(--orange)", fontWeight: 700 }}>✓</span> {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontSize: 12, color: "var(--text-tertiary)" }}>© 2025 CV Sepeti. Tüm hakları saklıdır.</p>
          <p style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Mustafa Pekcandanoğlu · Konya Teknokent</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
