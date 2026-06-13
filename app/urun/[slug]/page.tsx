import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import {
  allProducts,
  getProduct,
  formatPrice,
  cleanDescription,
  categorySlug,
} from "@/lib/products";
import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  return {
    title: product ? `${product.name} | CV Sepeti` : "Ürün | CV Sepeti",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const description = cleanDescription(product.name, product.description);
  const related = allProducts
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-1 text-xs text-[var(--ink-soft)] mb-6 flex-wrap">
        <Link href="/" className="hover:text-[var(--gold)]">
          Ana Sayfa
        </Link>
        <ChevronRight size={12} />
        <Link
          href={`/kategori/${categorySlug(product.category)}`}
          className="hover:text-[var(--gold)]"
        >
          {product.category}
        </Link>
        <ChevronRight size={12} />
        <span className="text-[var(--text)]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <ProductGallery images={product.images} name={product.name} />

        <div className="flex flex-col">
          <span className="tag-stencil text-xs text-[var(--gold)] mb-2">
            {product.category}
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
            {product.name}
          </h1>

          <div className="flex flex-wrap gap-4 mt-3 text-sm text-[var(--ink-soft)]">
            {product.color && <span>Renk: {product.color}</span>}
            {product.size && <span>Beden: {product.size}</span>}
            {product.dims && <span>Ebat: {product.dims}</span>}
          </div>

          <div className="mt-5 font-display text-3xl sm:text-4xl font-bold text-[var(--gold)]">
            {formatPrice(product.price)}
          </div>
          <p className="text-xs text-[var(--ink-soft)] mt-1">KDV dahil, kargo hariç</p>

          <div className="hazard-stripe-thin my-6" />

          <AddToCart product={product} />

          {description && (
            <div className="mt-10">
              <h2 className="font-display tag-stencil text-sm mb-3">
                Ürün Açıklaması
              </h2>
              <p className="text-sm leading-relaxed text-[var(--ink-soft)] whitespace-pre-line">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold mb-6">
            Benzer Ürünler
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
