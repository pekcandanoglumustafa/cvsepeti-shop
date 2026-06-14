import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { allProducts, getProduct, categorySlug, cleanDescription } from "@/lib/products";
import AddToCart from "@/components/AddToCart";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? `${product.name} | CV Sepeti` : "Ürün | CV Sepeti" };
}

function formatPrice(n: number) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const description = cleanDescription(product.name, product.description);
  const related = allProducts
    .filter((p) => p.category === product.category && p.slug !== product.slug && p.images[0])
    .slice(0, 4);

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "32px 20px 80px" }}>
      {/* Breadcrumb */}
      <nav style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--text-tertiary)", marginBottom: 32, flexWrap: "wrap" }}>
        <Link href="/" style={{ color: "var(--blue)", textDecoration: "none" }}>Ana Sayfa</Link>
        <ChevronRight size={12} />
        <Link href={`/kategori/${categorySlug(product.category)}`} style={{ color: "var(--blue)", textDecoration: "none" }}>{product.category}</Link>
        <ChevronRight size={12} />
        <span style={{ color: "var(--text-tertiary)" }}>{product.name}</span>
      </nav>

      {/* Product layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="product-grid">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <p style={{ fontSize: 12, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, fontWeight: 500 }}>
            {product.category}
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--text)", lineHeight: 1.15, marginBottom: 16 }}>
            {product.name}
          </h1>

          {product.stock > 0 ? (
            <p style={{ fontSize: 13, color: "#1d7800", fontWeight: 500, marginBottom: 20 }}>● Stokta var</p>
          ) : (
            <p style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 500, marginBottom: 20 }}>Stokta yok</p>
          )}

          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 32, fontWeight: 600, color: "var(--text)", letterSpacing: "-0.02em" }}>
              {formatPrice(product.price)}
            </p>
            <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4 }}>KDV dahil · Kargo hariç</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            <AddToCart product={product} />
            <a
              href="https://wa.me/905076584245"
              style={{ display: "block", textAlign: "center", background: "var(--off-white)", color: "var(--text)", padding: "14px", borderRadius: 12, fontSize: 17, fontWeight: 500, textDecoration: "none" }}
            >
              WhatsApp'tan sipariş ver
            </a>
          </div>

          {description && (
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>
              <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, color: "var(--text)" }}>Ürün Açıklaması</h2>
              <div style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                {description}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ marginTop: 64, borderTop: "1px solid var(--border)", paddingTop: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 24, color: "var(--text)" }}>
            Benzer ürünler
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 24 }}>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 640px) {
          .product-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </main>
  );
}
