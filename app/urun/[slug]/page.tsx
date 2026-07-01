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
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px 96px" }}>
      {/* Breadcrumb */}
      <nav style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--text-tertiary)", marginBottom: 40, flexWrap: "wrap" }}>
        <Link href="/" style={{ color: "var(--orange)", textDecoration: "none" }}>Ana Sayfa</Link>
        <ChevronRight size={12} />
        <Link href={`/kategori/${categorySlug(product.category)}`} style={{ color: "var(--orange)", textDecoration: "none" }}>{product.category}</Link>
        <ChevronRight size={12} />
        <span>{product.name}</span>
      </nav>

      {/* Product layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="product-grid">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <p style={{ fontSize: 12, color: "var(--orange)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, fontWeight: 600 }}>
            {product.category}
          </p>
          <h1 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.2, marginBottom: 20 }}>
            {product.name}
          </h1>

          {product.stock > 0 ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#22c55e", fontWeight: 600, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", padding: "4px 12px", borderRadius: 980, marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} /> Stokta var
            </span>
          ) : (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-tertiary)", fontWeight: 600, background: "var(--surface-2)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 980, marginBottom: 24 }}>
              Stokta yok
            </span>
          )}

          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 40, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.025em", lineHeight: 1 }}>
              {formatPrice(product.price)}
            </p>
            <p style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 6 }}>KDV dahil · Kargo ayrıca hesaplanır</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            <AddToCart product={product} />
            <a
              href="https://wa.me/905076584245"
              style={{ display: "block", textAlign: "center", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e", padding: "14px", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none", transition: "background 0.2s" }}
            >
              💬 WhatsApp'tan sipariş ver
            </a>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
            {["CE Sertifikalı", "Hızlı Kargo", "Kurumsal Fatura"].map((badge) => (
              <span key={badge} style={{ fontSize: 12, color: "var(--text-secondary)", background: "var(--surface)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 6, fontWeight: 500 }}>
                ✓ {badge}
              </span>
            ))}
          </div>

          {description && (
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: "var(--text)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Ürün Açıklaması</h2>
              <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {description}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ marginTop: 80, borderTop: "1px solid var(--border)", paddingTop: 56 }}>
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--orange)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Benzer Ürünler</p>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text)" }}>Şunlara da baktınız mı?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 640px) {
          .product-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </main>
  );
}
