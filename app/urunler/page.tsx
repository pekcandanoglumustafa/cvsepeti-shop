import { allProducts, categories, kartUrunler } from "@/lib/products";
import CategoryCard from "@/components/CategoryCard";
import ProductFilters from "@/components/ProductFilters";
import kapaklar from "@/data/kategori_kapak.json";
import { OG_DEFAULTS } from "@/lib/site";
import { sayfaBasligi } from "@/lib/seo";
const KAPAK = kapaklar as Record<string, { img: string; w: number; adet: number }>;

export const metadata = {
  // absolute: layout'taki "%s | marka" şablonu markayı ikinci kez ekliyordu
  // ("Tüm Katalog | Trafik Ürünleri | Trafik Ürünleri")
  title: { absolute: sayfaBasligi("Tüm katalog") },
  description: "Trafik güvenliği, yol işaretleme ve iş güvenliği ekipmanları. Ölçü, malzeme ve reflektif tipine göre filtreleyin.",
  alternates: { canonical: "/urunler" },
  openGraph: { ...OG_DEFAULTS, url: "/urunler", title: "Tüm katalog" },
};

export default function Urunler() {
  const sayilar = categories
    .map((c) => ({ c, n: allProducts.filter((p) => p.category === c).length }))
    .sort((a, b) => b.n - a.n);

  return (
    <main style={{ maxWidth: 1520, margin: "0 auto", padding: "48px 24px 40px" }}>
      <p className="eyebrow" style={{ color: "var(--hi)" }}>Katalog</p>
      <h1 className="display d2" style={{ marginTop: 16 }}>Tüm ürünler</h1>
      <p className="label" style={{ color: "var(--dim)", marginTop: 14 }}>
        {allProducts.length} ürün · {categories.length} kategori
      </p>

      <div className="rule" style={{ margin: "34px 0 30px" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "34px 24px", marginBottom: 66 }}>
        {sayilar.map(({ c, n }) => <CategoryCard key={c} kategori={c} adet={n} gorsel={KAPAK[c]?.img} />)}
      </div>

      <div className="rule" style={{ marginBottom: 40 }} />
      <ProductFilters urunler={kartUrunler(allProducts)} baslik="Tüm ürünler" />
    </main>
  );
}
