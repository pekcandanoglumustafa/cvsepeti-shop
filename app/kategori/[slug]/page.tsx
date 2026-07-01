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
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px 96px" }}>
      <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-tertiary)", marginBottom: 40 }}>
        <Link href="/" style={{ color: "var(--orange)", textDecoration: "none" }}>Ana Sayfa</Link>
        <span>›</span>
        <Link href="/urunler" style={{ color: "var(--orange)", textDecoration: "none" }}>Ürünler</Link>
        <span>›</span>
        <span>{cat}</span>
      </nav>

      <div style={{ marginBottom: 48 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--orange)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Kategori</p>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 12, color: "var(--text)" }}>
          {cat}
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-secondary)" }}>{products.length} ürün</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
