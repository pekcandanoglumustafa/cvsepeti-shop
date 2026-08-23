import { notFound } from "next/navigation";
import Link from "next/link";
import { allProducts, categories, categorySlug, categoryBySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: categorySlug(c) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = categoryBySlug(slug);
  return { title: c ? `${c} | CV Sepeti` : "Kategori | CV Sepeti" };
}

export default async function Kategori({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) notFound();
  const items = allProducts.filter((p) => p.category === cat);

  return (
    <main style={{ maxWidth: 1360, margin: "0 auto", padding: "40px 20px" }}>
      <Link href="/urunler" className="eyebrow" style={{ color: "var(--muted)", textDecoration: "none" }}>
        ← Katalog
      </Link>
      <h1 className="display" style={{ fontSize: "clamp(34px,6.5vw,76px)", marginTop: 14 }}>{cat}</h1>
      <p className="label" style={{ color: "var(--muted)", marginTop: 10, marginBottom: 32 }}>{items.length} ürün</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 26 }}>
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  );
}
