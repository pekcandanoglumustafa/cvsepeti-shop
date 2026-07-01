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
  if (!product) return { title: "Ürün | CV Sepeti" };

  const desc = `${product.name} - ${new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(product.price)}. ${product.category} kategorisinde. CE belgeli, hızlı kargo, kurumsal fatura. CV Sepeti güvencesiyle.`;

  return {
    title: product.name,
    description: desc,
    alternates: { canonical: `https://www.cvsepeti.org/urun/${product.slug}` },
    openGraph: {
      title: product.name,
      description: desc,
      type: "website",
      url: `https://www.cvsepeti.org/urun/${product.slug}`,
      images: product.images[0] ? [{ url: product.images[0], alt: product.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: desc,
    },
  };
}
function formatPrice(n: number) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const description = cleanDescription(product.name, product.description);
  const related = allProducts.filter((p) => p.category === product.category && p.slug !== product.slug && p.images[0]).slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: description || product.name,
    image: product.images,
    category: product.category,
    brand: { "@type": "Brand", name: "CV Sepeti" },
    offers: {
      "@type": "Offer",
      url: `https://www.cvsepeti.org/urun/${product.slug}`,
      priceCurrency: "TRY",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "CV Sepeti" },
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://www.cvsepeti.org" },
      { "@type": "ListItem", position: 2, name: product.category, item: `https://www.cvsepeti.org/kategori/${categorySlug(product.category)}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://www.cvsepeti.org/urun/${product.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <main style={{ padding: "20px 0 48px" }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--text-tertiary)", marginBottom: 20, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--orange)", textDecoration: "none" }}>Ana Sayfa</Link>
          <ChevronRight size={12} />
          <Link href={`/kategori/${categorySlug(product.category)}`} style={{ color: "var(--orange)", textDecoration: "none" }}>{product.category}</Link>
          <ChevronRight size={12} />
          <span>{product.name}</span>
        </nav>

        {/* Product layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start", background: "#fff", borderRadius: 12, border: "1px solid var(--border)", padding: 28, boxShadow: "var(--shadow-sm)" }} className="product-grid">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            <p style={{ fontSize: 11, color: "var(--orange)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
              {product.category}
            </p>
            <h1 style={{ fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 800, color: "var(--text)", lineHeight: 1.3, marginBottom: 14 }}>
              {product.name}
            </h1>

            {/* Stock */}
            {product.stock > 0 ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, color: "var(--green)", fontWeight: 600, background: "#edfbf1", border: "1px solid #b7f0c8", padding: "3px 10px", borderRadius: 4, marginBottom: 16 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
                Stokta Var
              </span>
            ) : (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, color: "#888", fontWeight: 600, background: "#f4f4f4", border: "1px solid var(--border)", padding: "3px 10px", borderRadius: 4, marginBottom: 16 }}>
                Stokta Yok
              </span>
            )}

            {/* Price */}
            <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: "16px 20px", marginBottom: 20 }}>
              <p style={{ fontSize: 32, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>
                {formatPrice(product.price)}
              </p>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 3 }}>KDV dahil · Kargo ödeme adımında</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              <AddToCart product={product} />
              <a href="https://wa.me/905076584245"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#25D366", color: "#fff", padding: "12px", borderRadius: 7, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                💬 WhatsApp ile Sipariş Ver
              </a>
            </div>

            {/* Trust */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {["CE Sertifikalı", "İyzico Güvenli Ödeme", "Kurumsal Fatura", "Hızlı Kargo"].map(b => (
                <span key={b} style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", background: "var(--surface-2)", border: "1px solid var(--border)", padding: "4px 9px", borderRadius: 4 }}>
                  ✓ {b}
                </span>
              ))}
            </div>

            {description && (
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: "var(--text)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Ürün Açıklaması</h2>
                <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{description}</div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section style={{ marginTop: 36 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 16 }}>Benzer Ürünler</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 12 }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .product-grid { grid-template-columns: 1fr !important; padding: 16px !important; }
        }
      `}</style>
    </main>
    </>
  );
}
