import { allProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata = { title: "Tüm Ürünler | CV Sepeti" };

export default function UrunlerPage() {
  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px 96px" }}>
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--orange)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Katalog</p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 12, color: "var(--text)" }}>
          Tüm Ürünler
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-secondary)" }}>
          {allProducts.length} ürün · Trafik güvenliği, yalıtım ve iş ekipmanları
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {allProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
