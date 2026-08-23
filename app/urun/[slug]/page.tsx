import { notFound } from "next/navigation";
import Link from "next/link";
import { allProducts, getProduct, categorySlug, formatPrice } from "@/lib/products";
import AddToCart from "@/components/AddToCart";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p ? `${p.name} | CV Sepeti` : "Ürün | CV Sepeti",
           description: p?.description?.slice(0, 155) };
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
    ["Kargo desisi", `${p.desi} desi`],
  ] as [string,string][]).filter(([, v]) => v);

  const benzer = allProducts.filter(x => x.category === p.category && x.slug !== p.slug).slice(0, 4);

  return (
    <main style={{ maxWidth: 1360, margin: "0 auto", padding: "28px 20px" }}>
      <nav className="eyebrow" style={{ color: "var(--muted)", marginBottom: 26 }}>
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Ana sayfa</Link>
        {" / "}
        <Link href={`/kategori/${categorySlug(p.category)}`} style={{ color: "inherit", textDecoration: "none" }}>{p.category}</Link>
      </nav>

      <div className="urun-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "start" }}>
        <ProductGallery images={p.images} name={p.name} />

        <div>
          <p className="eyebrow" style={{ color: "var(--hi)" }}>{p.kod}</p>
          <h1 className="display" style={{ fontSize: "clamp(26px,3.6vw,46px)", marginTop: 10 }}>{p.name}</h1>

          <div style={{ margin: "26px 0 22px", display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <span className="display" style={{ fontSize: 40, color: "var(--hi)" }}>{formatPrice(p.price)}</span>
            <span className="label" style={{ color: "var(--muted)" }}>KDV dahil · kargo hariç</span>
          </div>

          <div className="band-thin" style={{ marginBottom: 22 }} />

          <AddToCart product={p} />

          <a href={`https://wa.me/905076584245?text=${encodeURIComponent(p.kod + " – " + p.name + " için fiyat almak istiyorum.")}`}
             className="btn btn-ghost" style={{ width: "100%", marginTop: 10 }}>
            WhatsApp'tan sor
          </a>

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

      <style>{`@media (max-width:820px){.urun-grid{grid-template-columns:1fr!important;gap:28px!important}}`}</style>
    </main>
  );
}
