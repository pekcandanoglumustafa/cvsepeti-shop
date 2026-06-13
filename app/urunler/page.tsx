import { allProducts, categories, categorySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const metadata = {
  title: "Tüm Ürünler | CV Sepeti",
};

export default function ProductsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">
          Tüm Ürünler
        </h1>
        <p className="text-[var(--ink-soft)] mt-2">
          {allProducts.length} ürün listeleniyor
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-[var(--line)]">
        <Link
          href="/urunler"
          className="tag-stencil text-xs whitespace-nowrap px-3 py-2 bg-[var(--ink)] text-[var(--paper)]"
        >
          Tümü
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/kategori/${categorySlug(c)}`}
            className="tag-stencil text-xs whitespace-nowrap px-3 py-2 border border-[var(--line)] hover:border-[var(--ink)] transition-colors"
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allProducts.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  );
}
