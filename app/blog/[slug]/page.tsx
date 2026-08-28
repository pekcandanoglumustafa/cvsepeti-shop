import { notFound } from "next/navigation";
import Link from "next/link";
import { tumYazilar, yaziGetir } from "@/lib/blog";
import { mdToHtml } from "@/lib/md";
import { getProduct } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const BASE = "https://www.trafikurunleri.com";

export function generateStaticParams() {
  return tumYazilar().map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const y = yaziGetir(slug);
  if (!y) return { title: "Yazı bulunamadı" };
  return {
    title: y.baslik,
    description: y.ozet,
    alternates: { canonical: `/blog/${y.slug}` },
    openGraph: { type: "article", title: y.baslik, description: y.ozet,
                 publishedTime: y.tarih, modifiedTime: y.guncelleme || y.tarih },
  };
}

export default async function Yazi({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const y = yaziGetir(slug);
  if (!y) notFound();

  const urunler = (y.ilgiliUrunler || []).map(getProduct).filter(Boolean) as any[];
  const digerleri = tumYazilar().filter((x) => x.slug !== y.slug).slice(0, 3);

  const sema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${BASE}/blog/${y.slug}/#yazi`,
        headline: y.baslik,
        description: y.ozet,
        datePublished: y.tarih,
        dateModified: y.guncelleme || y.tarih,
        inLanguage: "tr-TR",
        author: { "@id": `${BASE}/#kurulus` },
        publisher: { "@id": `${BASE}/#kurulus` },
        mainEntityOfPage: `${BASE}/blog/${y.slug}`,
        keywords: y.etiketler.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: BASE },
          { "@type": "ListItem", position: 2, name: "Rehberler", item: `${BASE}/blog` },
          { "@type": "ListItem", position: 3, name: y.baslik, item: `${BASE}/blog/${y.slug}` },
        ],
      },
      y.sss && y.sss.length > 0 && {
        "@type": "FAQPage",
        mainEntity: y.sss.map((f) => ({
          "@type": "Question", name: f.s,
          acceptedAnswer: { "@type": "Answer", text: f.c },
        })),
      },
    ].filter(Boolean),
  };

  return (
    <main style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px 60px" }}>
      <Link href="/blog" className="eyebrow" style={{ color: "var(--dim)", textDecoration: "none" }}>← Rehberler</Link>

      <div style={{ display: "flex", gap: 12, margin: "20px 0 12px", flexWrap: "wrap" }}>
        <span className="eyebrow" style={{ color: "var(--hi)" }}>{y.kategori}</span>
        <span className="eyebrow" style={{ color: "var(--dim)" }}>
          {new Date(y.tarih).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })} · {y.okuma} dk
        </span>
      </div>

      <h1 className="display" style={{ fontSize: "clamp(28px,5vw,50px)", lineHeight: 1.02 }}>{y.baslik}</h1>

      {/* AI motorlarının alıntılayacağı doğrudan özet */}
      <div style={{ marginTop: 26, padding: 20, background: "var(--tile)", borderLeft: "4px solid var(--ink)" }}>
        <p className="eyebrow" style={{ color: "var(--dim)", marginBottom: 8 }}>Kısa cevap</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.65 }}>{y.ozet}</p>
      </div>

      <article className="yazi" dangerouslySetInnerHTML={{ __html: mdToHtml(y.icerik) }} />

      {urunler.length > 0 && (
        <section style={{ marginTop: 56 }}>
          <div className="rule" style={{ marginBottom: 22 }} />
          <h2 className="display d3" style={{ marginBottom: 20 }}>Bu yazıda geçen ürünler</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: "32px 20px" }}>
            {urunler.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {digerleri.length > 0 && (
        <section style={{ marginTop: 56 }}>
          <div className="hair" style={{ marginBottom: 20 }} />
          <p className="eyebrow" style={{ color: "var(--dim)", marginBottom: 14 }}>Diğer rehberler</p>
          {digerleri.map((d) => (
            <Link key={d.slug} href={`/blog/${d.slug}`} className="card"
                  style={{ display: "block", padding: "13px 0", borderBottom: "1px solid var(--hair)",
                           textDecoration: "none", color: "inherit" }}>
              <span className="name" style={{ fontSize: 15, fontWeight: 700 }}>{d.baslik}</span>
            </Link>
          ))}
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sema) }} />

      <style>{`
        .yazi{margin-top:34px}
        .yazi h2{font-weight:900;text-transform:none;letter-spacing:-0.025em;
                 font-size:clamp(20px,2.6vw,27px);line-height:1.15;margin:40px 0 14px}
        .yazi h3{font-weight:800;font-size:18px;margin:28px 0 10px}
        .yazi p{font-size:16px;line-height:1.75;margin-bottom:18px;color:#1A1A1A}
        .yazi ul,.yazi ol{margin:0 0 20px 20px}
        .yazi li{font-size:16px;line-height:1.7;margin-bottom:9px}
        .yazi strong{font-weight:800}
        .yazi table{width:100%;border-collapse:collapse;margin:22px 0;font-size:14.5px}
        .yazi th{text-align:left;padding:11px 10px;border-bottom:2px solid var(--ink);
                 font-size:11.5px;text-transform:uppercase;letter-spacing:.09em}
        .yazi td{padding:11px 10px;border-bottom:1px solid var(--hair)}
        .yazi blockquote{border-left:4px solid var(--ink);padding-left:18px;margin:22px 0;color:var(--muted)}
        .yazi a{color:var(--hi)}
      `}</style>
    </main>
  );
}
