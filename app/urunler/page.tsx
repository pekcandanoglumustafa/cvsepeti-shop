import { allProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata = { title: "Tüm Ürünler | CV Sepeti" };

export default function UrunlerPage() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "48px 20px 80px" }}>
      <h1 style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8, color: "var(--text)" }}>
        Tüm Ürünler
      </h1>
      <p style={{ fontSize: 17, color: "var(--text-secondary)", marginBottom: 40 }}>
        {allProducts.length} ürün
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 24 }}>
        {allProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
