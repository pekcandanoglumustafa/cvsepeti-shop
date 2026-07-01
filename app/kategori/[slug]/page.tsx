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
  if (!cat) return { title: "Kategori | CV Sepeti" };
  const count = allProducts.filter((p) => p.category === cat).length;
  return {
    title: `${cat} - ${count} Ürün Uygun Fiyat`,
    description: `${cat} kategorisinde ${count} ürün. CE & TSE belgeli, hızlı kargo, kurumsal fatura ve toplu sipariş imkanı. CV Sepeti güvencesiyle en uygun fiyatlar.`,
    alternates: { canonical: `https://www.cvsepeti.org/kategori/${slug}` },
    openGraph: {
      title: `${cat} | CV Sepeti`,
      description: `${count} ${cat.toLowerCase()} ürünü uygun fiyatlarla.`,
      url: `https://www.cvsepeti.org/kategori/${slug}`,
    },
  };
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
