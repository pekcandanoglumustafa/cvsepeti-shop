import Link from "next/link";
import Logo from "@/components/Logo";
import { categories, categorySlug, allProducts } from "@/lib/products";

export default function Footer() {
  return (
    <footer style={{ marginTop: 96 }}>
      <div className="band" />
      <div style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", padding: "56px 20px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 40 }}>
            <div>
              <div style={{ marginBottom: 14 }}><Logo color="#fff" /></div>
              <p style={{ fontSize: 13, color: "#9C9C99", lineHeight: 1.6, maxWidth: 260 }}>
                Trafik güvenliği, yol işaretleme ve iş güvenliği ekipmanları. Konya Teknokent.
              </p>
            </div>
            <div>
              <p className="eyebrow" style={{ color: "var(--hi)", marginBottom: 14 }}>Katalog</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {categories.slice(0, 9).map((c) => (
                  <Link key={c} href={`/kategori/${categorySlug(c)}`}
                        style={{ fontSize: 13, color: "#C9C9C6", textDecoration: "none" }}>{c}</Link>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow" style={{ color: "var(--hi)", marginBottom: 14 }}>Sipariş</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <Link href="/urunler" style={{ fontSize: 13, color: "#C9C9C6", textDecoration: "none" }}>
                  Tüm Ürünler ({allProducts.length})
                </Link>
                <Link href="/sepet" style={{ fontSize: 13, color: "#C9C9C6", textDecoration: "none" }}>Sepet</Link>
                <Link href="/blog" style={{ fontSize: 13, color: "#C9C9C6", textDecoration: "none" }}>Rehberler</Link>
                <a href="tel:05076584245" style={{ fontSize: 13, color: "#C9C9C6", textDecoration: "none" }}>0 507 658 42 45</a>
                <a href="https://wa.me/905076584245" style={{ fontSize: 13, color: "#7E7E7B", textDecoration: "none" }}>WhatsApp (teknik soru)</a>
              </div>
            </div>
            <div>
              <p className="eyebrow" style={{ color: "var(--hi)", marginBottom: 14 }}>Kargo</p>
              <p style={{ fontSize: 13, color: "#9C9C99", lineHeight: 1.7 }}>
                Yurtiçi Kargo ile gönderim.<br />Kargo ücreti desi üzerinden ödeme adımında hesaplanır.
              </p>
            </div>
          </div>
          <div style={{ marginTop: 44, paddingTop: 22, borderTop: "1px solid #1F1F1F",
                        display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between" }}>
            <p style={{ fontSize: 12, color: "#6B6B68" }}>© 2026 trafikurunleri.com · Pekcandanoğlu</p>
            <p style={{ fontSize: 12, color: "#6B6B68" }}>Fiyatlar KDV hariçtir · KDV %20 · iyzico ile güvenli ödeme</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
