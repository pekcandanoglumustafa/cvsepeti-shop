import { notFound } from "next/navigation";
import Link from "next/link";
import { allProducts, getProduct, categorySlug, formatPrice } from "@/lib/products";
import AddToCart from "@/components/AddToCart";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import StickyBuyBar from "@/components/StickyBuyBar";
import KargoBilgi from "@/components/KargoBilgi";
import Fiyat from "@/components/Fiyat";
import UrunSema from "@/components/UrunSema";
import { urunSSS } from "@/lib/sss";

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Ürün" };
  const ozet = [p.boyut, p.malzeme, p.f_reflektif].filter(Boolean).join(" · ");
  return {
    title: `${p.name}${ozet ? ` — ${ozet}` : ""}`,
    description: `${p.name} (${p.kod}) ${new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY",maximumFractionDigits:0}).format(p.price)} + KDV. ${ozet ? ozet + ". " : ""}Stokta, 1-2 iş gününde kargoda. Yurtiçi Kargo ile Türkiye geneline gönderim.`,
    alternates: { canonical: `/urun/${p.slug}` },
    openGraph: {
      title: p.name,
      description: `${p.category} · ${ozet}`,
      images: p.images[0] ? [{ url: p.images[0] }] : undefined,
      type: "website",
    },
  };
}

export default async function Urun({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const spec = ([
    ["Ürün kodu", p.kod],
    ["Kategori", p.category],
    ["Ölçü", p.boyut],
    ["Malzeme", p.malzeme],
    ["Taban", p.taban ? `${p.taban} tabanlı` : ""],
    ["Reflektif", p.reflektif ? (/^\d+$/.test(p.reflektif) ? `${p.reflektif} adet bant` : p.reflektif) : ""],
    ["Varyant", p.varyant],
    ["Seri", p.seri === "EKO" ? "Ekonomik" : "Standart"],
    ["Ağırlık", p.agirlik_kg ? `${p.agirlik_kg} kg` : ""],
    ["Kargo desisi", `${p.desi} desi`],
  ] as [string,string][]).filter(([, v]) => v);

  const sorular = urunSSS(p);
  const benzer = allProducts.filter(x => x.category === p.category && x.slug !== p.slug).slice(0, 4);

  return (
    <main style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 24px 110px" }}>
      <nav className="eyebrow" style={{ color: "var(--muted)", marginBottom: 26 }}>
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Ana sayfa</Link>
        {" / "}
        <Link href={`/kategori/${categorySlug(p.category)}`} style={{ color: "inherit", textDecoration: "none" }}>{p.category}</Link>
      </nav>

      <div className="urun-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 64, alignItems: "start" }}>
        <ProductGallery images={p.images} name={p.name} />

        <div>
          <p className="eyebrow" style={{ color: "var(--hi)" }}>{p.kod}</p>
          <h1 className="display" style={{ fontSize: "clamp(26px,3.6vw,46px)", marginTop: 10 }}>{p.name}</h1>

          <div style={{ margin: "26px 0 22px" }}>
            <Fiyat haric={p.price} dahil={p.price_kdv} boyut="buyuk" />
            <p className="label" style={{ color: "var(--dim)", marginTop: 8 }}>Kargo hariç</p>
          </div>

          <div className="band-thin" style={{ marginBottom: 22 }} />

          <AddToCart product={p} />

          <p style={{ marginTop: 12, fontSize: 12.5, color: "var(--dim)", textAlign: "center", lineHeight: 1.6 }}>
            Sipariş için görüşmenize gerek yok — sepete ekleyip kartla ödeyin.
          </p>

          <div style={{ marginTop: 26 }}>
            <KargoBilgi product={p} />
          </div>

          {/* TEKNİK ÖZELLİKLER — asıl içerik bu */}
          <div style={{ marginTop: 36 }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>Teknik özellikler</p>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {spec.map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: "1px solid var(--line)" }}>
                    <td className="label" style={{ padding: "11px 0", color: "var(--muted)", width: "42%" }}>{k}</td>
                    <td style={{ padding: "11px 0", fontSize: 14, fontWeight: 600 }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ marginTop: 26, fontSize: 14, color: "var(--muted)", lineHeight: 1.7, whiteSpace: "pre-line" }}>
            {p.description}
          </p>
        </div>
      </div>

      {benzer.length > 0 && (
        <section style={{ marginTop: 72 }}>
          <h2 className="display" style={{ fontSize: 28, marginBottom: 20 }}>Aynı kategoriden</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 26 }}>
            {benzer.map((x) => <ProductCard key={x.id} product={x} />)}
          </div>
        </section>
      )}

      {/* SIK SORULAN SORULAR — hem müşteri hem AI motorları için */}
      <section style={{ marginTop: 72, maxWidth: 860 }}>
        <h2 className="display d3" style={{ marginBottom: 8 }}>Sık sorulan sorular</h2>
        <div className="rule" style={{ marginBottom: 4 }} />
        {sorular.map((f) => (
          <details key={f.s} style={{ borderBottom: "1px solid var(--hair)", padding: "16px 0" }}>
            <summary style={{ cursor: "pointer", fontWeight: 700, fontSize: 15, listStyle: "none",
                              display: "flex", justifyContent: "space-between", gap: 14 }}>
              {f.s}<span style={{ color: "var(--dim)" }}>+</span>
            </summary>
            <p style={{ marginTop: 11, fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{f.c}</p>
          </details>
        ))}
      </section>

      <UrunSema p={p} kategoriSlug={categorySlug(p.category)} sss={sorular} />
      <StickyBuyBar product={p} />

      <style>{`@media (max-width:820px){.urun-grid{grid-template-columns:1fr!important;gap:28px!important}}`}</style>
    </main>
  );
}
