import { notFound } from "next/navigation";
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
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "48px 20px 80px" }}>
      <h1 style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8, color: "var(--text)" }}>
        {cat}
      </h1>
      <p style={{ fontSize: 17, color: "var(--text-secondary)", marginBottom: 40 }}>
        {products.length} ürün
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 24 }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
