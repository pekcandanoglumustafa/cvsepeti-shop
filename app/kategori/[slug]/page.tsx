import { notFound } from "next/navigation";
import Link from "next/link";
import { allProducts, categories, categorySlug, categoryBySlug, kartUrunler } from "@/lib/products";
import ProductFilters from "@/components/ProductFilters";
import { OG_DEFAULTS, breadcrumbLd } from "@/lib/site";
import { sayfaBasligi, aciklama } from "@/lib/seo";
import { KATEGORI_ICERIK } from "@/data/kategori_icerik";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: categorySlug(c) }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = categoryBySlug(slug);
  const n = c ? allProducts.filter((p) => p.category === c).length : 0;
  return {
    title: { absolute: sayfaBasligi(c ? `${c} — ${n} ürün` : "Kategori") },
    // Kategori tanıtım metninin ilk cümlesi, jenerik "filtreleyin" cümlesinden
    // çok daha iyi tıklama çekiyor — arama sonucunda görünen metin bu.
    description: c
      ? aciklama(
          KATEGORI_ICERIK[c]?.giris.split(". ")[0] + ".",
          `${n} ürün, ölçü ve malzemesiyle listeli.`,
        )
      : undefined,
    alternates: { canonical: `/kategori/${slug}` },
    openGraph: { ...OG_DEFAULTS, url: `/kategori/${slug}`, title: c ? `${c} — ${n} ürün` : "Kategori" },
  };
}

export default async function Kategori({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) notFound();
  const items = allProducts.filter((p) => p.category === cat);
  const digerleri = categories.filter((c) => c !== cat).slice(0, 10);
  const icerik = KATEGORI_ICERIK[cat];

  return (
    <main style={{ maxWidth: 1520, margin: "0 auto", padding: "40px 24px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([
        ["Ana sayfa", "/"], ["Katalog", "/urunler"], [cat, `/kategori/${slug}`],
      ])) }} />
      <Link href="/urunler" className="eyebrow" style={{ color: "var(--dim)", textDecoration: "none" }}>← Katalog</Link>
      <h1 className="display d2" style={{ marginTop: 16 }}>{cat}</h1>
      <p className="label" style={{ color: "var(--dim)", marginTop: 14 }}>{items.length} ürün</p>
      {icerik && (
        <p style={{ marginTop: 18, maxWidth: 760, fontSize: 15.5, lineHeight: 1.75, color: "var(--muted)" }}>
          {icerik.giris}
        </p>
      )}
      <div className="rule" style={{ margin: "32px 0 30px" }} />

      <ProductFilters urunler={kartUrunler(items)} baslik={cat} />

      {icerik && (
        <section style={{ maxWidth: 760, margin: "76px 0 0" }}>
          <div className="band" style={{ marginBottom: 34 }} />
          <h2 className="display d3" style={{ marginBottom: 8 }}>{cat} seçim rehberi</h2>
          {icerik.bolumler.map((b) => (
            <div key={b.baslik} style={{ marginTop: 30 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-.01em", marginBottom: 9 }}>{b.baslik}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--muted)", margin: 0 }}>{b.metin}</p>
            </div>
          ))}
        </section>
      )}

      <div className="hair" style={{ margin: "70px 0 24px" }} />
      <p className="eyebrow" style={{ color: "var(--dim)", marginBottom: 14 }}>Diğer kategoriler</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
        {digerleri.map((c) => (
          <Link key={c} href={`/kategori/${categorySlug(c)}`} className="label" prefetch={false}
            style={{ padding: "10px 15px", border: "1px solid var(--hair)", color: "var(--ink)", textDecoration: "none" }}>
            {c}
          </Link>
        ))}
      </div>
    </main>
  );
}
