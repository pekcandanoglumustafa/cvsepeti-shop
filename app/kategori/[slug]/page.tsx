import { notFound } from "next/navigation";
import Link from "next/link";
import { allProducts, categories, categorySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: categorySlug(c) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categories.find((c) => categorySlug(c) === slug);
  return { title: cat ? `${cat} | CV Sepeti` : "Kategori | CV Sepeti" };
}

export default async function KategoriPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categories.find((c) => categorySlug(c) === slug);
  if (!cat) notFound();
  const products = allProducts.filter((p) => p.category === cat);

  return (
    <main style={{ padding: "24px 0 48px" }}>
      <div className="container">
        <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-tertiary)", marginBottom: 16 }}>
          <Link href="/" style={{ color: "var(--orange)", textDecoration: "none" }}>Ana Sayfa</Link>
          <span>›</span>
          <Link href="/urunler" style={{ color: "var(--orange)", textDecoration: "none" }}>Ürünler</Link>
          <span>›</span>
          <span>{cat}</span>
        </nav>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 4 }}>{cat}</h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>{products.length} ürün</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 12 }}>
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </main>
  );
}
