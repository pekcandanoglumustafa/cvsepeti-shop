import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Lock } from "lucide-react";
import { allProducts, categories, categorySlug, productsByCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const categoryHeroOverride: Record<string, string> = {
  "Dikme & Panel Sistemleri":
    "https://cdn.dsmcdn.com/ty1904/prod/QC_PREP/20260510/14/5cd6297e-9e5b-31f7-ad7d-2f932253f1f3/1_org_zoom.jpg",
};

export default function Home() {
  const featured = allProducts.filter((p) => p.images.length > 0).slice(0, 8);
  const mainCategories = categories.filter((c) =>
    [
      "Trafik Uyarı Levhaları",
      "Trafik Konisi & Duba",
      "Yalıtım Malzemesi",
      "Dikme & Panel Sistemleri",
      "Yol İşaretleme & Kasis",
      "Delinatör",
    ].includes(c)
  );

  return (
    <main>
      {/* HERO */}
      <section className="relative bg-[var(--ink)] text-[var(--paper)] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1620339414148-b5bcbee96e30?auto=format&fit=crop&w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28">
          <span className="tag-stencil text-[var(--safety-orange)] text-sm">
            Konya Teknokent · Yerli Üretim
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold mt-4 max-w-3xl leading-tight">
            Yolda, Çatıda ve Sahada{" "}
            <span className="text-[var(--safety-orange)]">Güvenlik</span> Bizim İşimiz
          </h1>
          <p className="mt-5 max-w-xl text-[var(--paper-deep)] text-base sm:text-lg">
            Trafik uyarı levhaları, ikaz ürünleri, su yalıtım membranları ve iş
            güvenliği ekipmanlarında 237 ürünlük geniş katalog. Hızlı kargo,
            güvenli online ödeme.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/urunler"
              className="flex items-center gap-2 bg-[var(--safety-orange)] text-white px-6 py-3.5 font-display tag-stencil text-sm hover:bg-[var(--safety-orange-dark)] transition-colors"
            >
              Tüm Ürünleri Gör <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        <div className="hazard-stripe" />
      </section>

      {/* TRUST BAR */}
      <section className="bg-white border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <Truck className="text-[var(--safety-orange)]" size={28} />
            <span>Hızlı Kargo</span>
          </div>
          <div className="flex items-center gap-3">
            <Lock className="text-[var(--safety-orange)]" size={28} />
            <span>iyzico Güvenli Ödeme</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-[var(--safety-orange)]" size={28} />
            <span>237+ Ürün Çeşidi</span>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">
          Kategoriler
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainCategories.map((cat) => {
            const products = productsByCategory(cat);
            const withImg = products.find((p) => p.images.length > 0) || products[0];
            const img = categoryHeroOverride[cat] || withImg?.images[0];
            return (
              <Link
                key={cat}
                href={`/kategori/${categorySlug(cat)}`}
                className="relative group h-56 overflow-hidden border border-[var(--line)] bg-white"
              >
                {img && (
                  <Image
                    src={img}
                    alt={cat}
                    fill
                    className="object-cover scale-105 group-hover:scale-[1.12] transition-transform duration-300"
                    unoptimized
                  />
                )}
                <div className="absolute inset-0 bg-[var(--ink)]/40 group-hover:bg-[var(--ink)]/55 transition-colors" />
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="font-display tag-stencil text-white text-base">
                    {cat}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="hazard-stripe-thin" />

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            Öne Çıkan Ürünler
          </h2>
          <Link
            href="/urunler"
            className="tag-stencil text-sm text-[var(--safety-orange-dark)] hover:underline flex items-center gap-1"
          >
            Tümü <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
