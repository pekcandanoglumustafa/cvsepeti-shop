import Link from "next/link";
import { allProducts, categories, categorySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata = { title: "Tüm Katalog | CV Sepeti" };

export default function Urunler() {
  return (
    <main style={{ maxWidth: 1360, margin: "0 auto", padding: "48px 20px 40px" }}>
      <p className="eyebrow" style={{ color: "var(--hi)", marginBottom: 14 }}>Katalog</p>
      <h1 className="display" style={{ fontSize: "clamp(36px,7vw,84px)" }}>Tüm ürünler</h1>
      <p className="label" style={{ color: "var(--muted)", marginTop: 12 }}>{allProducts.length} ürün · {categories.length} kategori</p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "28px 0 34px" }}>
        {categories.map((c) => (
          <Link key={c} href={`/kategori/${categorySlug(c)}`} className="label"
            style={{ padding: "9px 14px", border: "1px solid var(--line)", color: "var(--ink)", textDecoration: "none" }}>
            {c}
          </Link>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 26 }}>
        {allProducts.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  );
}
