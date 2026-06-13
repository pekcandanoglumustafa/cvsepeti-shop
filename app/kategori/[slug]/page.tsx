import { notFound } from "next/navigation";
import Link from "next/link";
import {
  categories,
  categorySlug,
  categoryBySlug,
  productsByCategory,
} from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: categorySlug(c) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  return { title: cat ? `${cat} | CV Sepeti` : "Kategori | CV Sepeti" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) notFound();

  const products = productsByCategory(cat);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">{cat}</h1>
        <p className="text-[var(--ink-soft)] mt-2">
          {products.length} ürün listeleniyor
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-[var(--line)]">
        <Link
          href="/urunler"
          className="tag-stencil text-xs whitespace-nowrap px-3 py-2 rounded-md border border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
        >
          Tümü
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/kategori/${categorySlug(c)}`}
            className={`tag-stencil text-xs whitespace-nowrap px-3 py-2 rounded-md transition-colors ${
              c === cat
                ? "bg-[var(--gold)] text-[var(--ink)]"
                : "border border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  );
}
