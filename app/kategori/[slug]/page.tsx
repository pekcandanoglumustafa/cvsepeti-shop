import { notFound } from "next/navigation";
import Link from "next/link";
import { allProducts, categories, categorySlug, categoryBySlug } from "@/lib/products";
import ProductFilters from "@/components/ProductFilters";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: categorySlug(c) }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = categoryBySlug(slug);
  const n = c ? allProducts.filter((p) => p.category === c).length : 0;
  return {
    title: c ? `${c} — ${n} ürün | Trafik Ürünleri` : "Kategori | Trafik Ürünleri",
    description: c ? `${c} kategorisinde ${n} ürün. Ölçü, malzeme ve reflektif tipine göre filtreleyin. Yurtiçi Kargo ile gönderim.` : undefined,
  };
}

export default async function Kategori({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) notFound();
  const items = allProducts.filter((p) => p.category === cat);
  const digerleri = categories.filter((c) => c !== cat).slice(0, 10);

  return (
    <main style={{ maxWidth: 1520, margin: "0 auto", padding: "40px 24px" }}>
      <Link href="/urunler" className="eyebrow" style={{ color: "var(--dim)", textDecoration: "none" }}>← Katalog</Link>
      <h1 className="display d2" style={{ marginTop: 16 }}>{cat}</h1>
      <p className="label" style={{ color: "var(--dim)", marginTop: 14 }}>{items.length} ürün</p>
      <div className="rule" style={{ margin: "32px 0 30px" }} />

      <ProductFilters urunler={items} baslik={cat} />

      <div className="hair" style={{ margin: "70px 0 24px" }} />
      <p className="eyebrow" style={{ color: "var(--dim)", marginBottom: 14 }}>Diğer kategoriler</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
        {digerleri.map((c) => (
          <Link key={c} href={`/kategori/${categorySlug(c)}`} className="label"
            style={{ padding: "10px 15px", border: "1px solid var(--hair)", color: "var(--ink)", textDecoration: "none" }}>
            {c}
          </Link>
        ))}
      </div>
    </main>
  );
}
