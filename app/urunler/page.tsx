import { allProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata = { title: "Tüm Ürünler | CV Sepeti" };

export default function UrunlerPage() {
  return (
    <main style={{ padding: "24px 0 48px" }}>
      <div className="container">
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--text)", marginBottom: 4 }}>Tüm Ürünler</h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>{allProducts.length} ürün listeleniyor</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 12 }}>
          {allProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </main>
  );
}
