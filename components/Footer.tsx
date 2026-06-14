import Link from "next/link";
import { categories, categorySlug } from "@/lib/products";

export default function Footer() {
  return (
    <footer style={{ background: "var(--off-white)", borderTop: "1px solid var(--border)", marginTop: 80 }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "48px 20px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32, marginBottom: 40 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>CV Sepeti</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/urunler" style={{ fontSize: 12, color: "var(--text-secondary)", textDecoration: "none" }}>Tüm Ürünler</Link>
              <Link href="/sepet" style={{ fontSize: 12, color: "var(--text-secondary)", textDecoration: "none" }}>Sepet</Link>
            </div>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>Kategoriler</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {categories.map((c) => (
                <Link key={c} href={`/kategori/${categorySlug(c)}`} style={{ fontSize: 12, color: "var(--text-secondary)", textDecoration: "none" }}>{c}</Link>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>İletişim</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="tel:05076584245" style={{ fontSize: 12, color: "var(--text-secondary)", textDecoration: "none" }}>0 507 658 42 45</a>
              <a href="https://wa.me/905076584245" style={{ fontSize: 12, color: "var(--text-secondary)", textDecoration: "none" }}>WhatsApp</a>
              <a href="https://www.instagram.com/cvsepetii" style={{ fontSize: 12, color: "var(--text-secondary)", textDecoration: "none" }}>Instagram</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Copyright © 2024 CV Sepeti. Tüm hakları saklıdır.</p>
          <p style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Fiyatlarımıza kargo dahildir · iyzico ile güvenli ödeme</p>
        </div>
      </div>
    </footer>
  );
}
