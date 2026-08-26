import Link from "next/link";
import { allProducts, categories, categorySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import kapaklar from "@/data/kategori_kapak.json";
const KAPAK = kapaklar as Record<string, { img: string; w: number; adet: number }>;

export const metadata = { title: "Tüm Katalog | CV Sepeti" };

export default function Urunler() {
  const sayilar = categories
    .map((c) => ({ c, n: allProducts.filter((p) => p.category === c).length }))
    .sort((a, b) => b.n - a.n);

  return (
    <main style={{ maxWidth: 1440, margin: "0 auto", padding: "48px 24px 40px" }}>
      <p className="eyebrow" style={{ color: "var(--hi)" }}>Katalog</p>
      <h1 className="display d2" style={{ marginTop: 16 }}>Tüm ürünler</h1>
      <p className="label" style={{ color: "var(--dim)", marginTop: 14 }}>
        {allProducts.length} ürün · {categories.length} kategori
      </p>

      <div className="rule" style={{ margin: "34px 0 30px" }} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(215px,1fr))", gap: "36px 26px", marginBottom: 70 }}>
        {sayilar.map(({ c, n }) => <CategoryCard key={c} kategori={c} adet={n} gorsel={KAPAK[c]?.img} />)}
      </div>

      <div className="band" style={{ marginBottom: 44 }} />
      <h2 className="display d3" style={{ marginBottom: 26 }}>Bütün ürünler</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(215px,1fr))", gap: "44px 26px" }}>
        {allProducts.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  );
}
