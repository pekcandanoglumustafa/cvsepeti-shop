import { notFound } from "next/navigation";
import Link from "next/link";
import {
  allProducts,
  getProduct,
  categorySlug,
  formatPrice,
  kisiyeOzel,
} from "@/lib/products";
import AddToCart from "@/components/AddToCart";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import StickyBuyBar from "@/components/StickyBuyBar";
import KargoBilgi from "@/components/KargoBilgi";
import TeknikCizim from "@/components/TeknikCizim";

import UrunSema from "@/components/UrunSema";
import { urunSSS } from "@/lib/sss";
import { OG_DEFAULTS } from "@/lib/site";
import { urunBasligi, aciklama } from "@/lib/seo";
import { urunDesi } from "@/lib/kargo";
import { FIRMA } from "@/lib/firma";

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Ürün" };
  // Ödeme testi için duran ürün — sayfası kalsın ama Google indekslemesin
  if (p.id === "TEST-1") {
    return { title: "Test ürünü", robots: { index: false, follow: false } };
  }
  const ozet = [p.boyut, p.malzeme, p.f_reflektif].filter(Boolean).join(" · ");
  const fiyat = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(p.price);
  return {
    // absolute: layout'taki "%s | marka" şablonunu atlar — marka ekini uzunluğa göre
    // urunBasligi'nin kendisi karar vererek ekliyor
    title: {
      absolute: urunBasligi(p.name, p.kod, [p.boyut, p.malzeme, p.f_reflektif]),
    },
    description: aciklama(
      `${p.name} (${p.kod}) ${fiyat}.`,
      ozet && `${ozet}.`,
      "Stokta, 1-2 iş gününde kargoda.",
      "Yurtiçi Kargo ile Türkiye geneline gönderim.",
    ),
    alternates: { canonical: `/urun/${p.slug}` },
    openGraph: {
      ...OG_DEFAULTS,
      url: `/urun/${p.slug}`,
      title: p.name,
      description: `${p.category} · ${ozet}`,
      images: p.images[0] ? [{ url: p.images[0] }] : OG_DEFAULTS.images,
      type: "website",
    },
  };
}

export default async function Urun({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const ozel = kisiyeOzel(p);

  const spec = (
    [
      ["Ürün kodu", p.kod],
      ["Kategori", p.category],
      ["Ölçü", p.boyut],
      ["Malzeme", p.malzeme],
      ["Taban", p.taban ? `${p.taban} tabanlı` : ""],
      [
        "Reflektif",
        p.reflektif
          ? /^\d+$/.test(p.reflektif)
            ? `${p.reflektif} adet bant`
            : p.reflektif
          : "",
      ],
      ["Varyant", p.varyant],
      ["Seri", p.seri === "EKO" ? "Ekonomik" : "Standart"],
      ["Taban ölçüsü", (p as any).taban_olcu || ""],
      ["Renk", (p as any).renk || ""],
      ["Reflektif detay", (p as any).reflektif_detay || ""],
      ["Montaj", (p as any).montaj || ""],
      [
        "Montaj gereçleri",
        (p as any).montaj_dahil ? "Vida ve dübel ürüne dahildir" : "",
      ],
      ["Ağırlık", p.agirlik_kg ? `${p.agirlik_kg} kg` : ""],
      [
        "Koli içi adet",
        (p as any).koli_adet ? `${(p as any).koli_adet} adet` : "",
      ],
      [
        "Koli ölçüsü",
        (p as any).koli_olcu ? `${(p as any).koli_olcu.join(" × ")} cm` : "",
      ],
      // Müşteriden tahsil edilen desi bu — veride duran eski p.desi sabiti değil.
      // İkisi farklıydı: tabloda 5 yazarken sepette 9 desi hesaplanıyordu.
      ["Kargo desisi", `${urunDesi(p)} desi`],
    ] as [string, string][]
  ).filter(([, v]) => v);

  const sorular = urunSSS(p);
  const benzer = allProducts
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .slice(0, 4);

  return (
    <main className="wrap" style={{ paddingBottom: 110 }}>
      <nav className="breadcrumbs">
        <Link href="/">Ana sayfa</Link>
        <span>/</span>
        <Link href={`/kategori/${categorySlug(p.category)}`}>{p.category}</Link>
        <span>/</span>
        <b>{p.kod}</b>
      </nav>
      <div className="product-layout">
        <ProductGallery images={p.images} name={p.name} />

        <div className="product-detail">
          <Link
            className="product-category"
            href={`/kategori/${categorySlug(p.category)}`}
          >
            {p.category}
          </Link>
          <p className="product-detail-code">Ürün kodu: {p.kod}</p>
          <h1>{p.name}</h1>

          <div className="detail-price">
            <div className="price">
              {formatPrice(p.price_kdv)}
              <small>KDV dahil</small>
            </div>
            <div className="net-price">
              {formatPrice(p.price)} + KDV · Kargo hariç
            </div>
          </div>
          <AddToCart product={p} />

          <p
            style={{
              marginTop: 12,
              fontSize: 12.5,
              color: "var(--dim)",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Sipariş için görüşmenize gerek yok — sepete ekleyip kartla ödeyin.
          </p>

          <div
            className="guven-satir"
            style={{
              marginTop: 18,
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            {[
              ...((p as any).montaj_dahil ? ["Vida ve dübel dahil"] : []),
              "iyzico ile güvenli ödeme",
              "1-2 iş gününde kargoda",
            ].map((t) => (
              <span
                key={t}
                className="eyebrow"
                style={{ color: "var(--muted)" }}
              >
                ✓ {t}
              </span>
            ))}
            {/* Kişiye özel üretilen üründe cayma hakkı yok — rozet her üründe
                aynı şeyi yazıyordu ve Teslimat/İade sayfasıyla çelişiyordu. */}
            {!ozel && (
              <Link
                href="/teslimat-ve-iade"
                className="eyebrow"
                style={{ color: "var(--muted)", textDecoration: "none" }}
              >
                ✓ 14 gün cayma hakkı
              </Link>
            )}
          </div>

          {ozel && (
            <div
              style={{
                marginTop: 16,
                padding: "14px 16px",
                border: "2px solid var(--line)",
                background: "var(--tile)",
              }}
            >
              <p
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.65,
                  color: "var(--muted)",
                }}
              >
                <strong style={{ color: "var(--ink)" }}>
                  Kişiye özel üretim.
                </strong>{" "}
                Baskı metnini veya tasarım dosyanızı sipariş sonrası{" "}
                <a
                  href={`mailto:${FIRMA.eposta}`}
                  style={{ color: "var(--ink)" }}
                >
                  {FIRMA.eposta}
                </a>{" "}
                adresine ya da{" "}
                <a
                  href={FIRMA.whatsapp}
                  rel="noopener"
                  style={{ color: "var(--ink)" }}
                >
                  WhatsApp
                </a>
                {"'"}tan sipariş numaranızla gönderin. Üretim onayınızdan sonra
                başlar. Size özel üretildiği için{" "}
                <Link href="/teslimat-ve-iade" style={{ color: "var(--ink)" }}>
                  cayma hakkı kapsamı dışındadır
                </Link>
                .
              </p>
            </div>
          )}

          <div style={{ marginTop: 22 }}>
            <KargoBilgi product={p} />
          </div>
        </div>
      </div>
      <div className="product-info-panels">
        <section>
          <h2 className="panel-title">Teknik özellikler</h2>
          <table className="spec-table">
            <tbody>
              {spec.map(([k, v]) => (
                <tr key={k}>
                  <th>{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2 className="panel-title">Ürün hakkında</h2>
          <p className="product-description" style={{ whiteSpace: "pre-line" }}>
            {p.description}
          </p>
          <TeknikCizim p={p} />
        </section>
      </div>

      {benzer.length > 0 && (
        <section style={{ marginTop: 72 }}>
          <h2 className="display" style={{ fontSize: 28, marginBottom: 20 }}>
            Aynı kategoriden
          </h2>
          <div className="product-grid">
            {benzer.map((x) => (
              <ProductCard key={x.id} product={x} />
            ))}
          </div>
        </section>
      )}

      {/* SIK SORULAN SORULAR — hem müşteri hem AI motorları için */}
      <section style={{ marginTop: 72, maxWidth: 860 }}>
        <h2 className="display d3" style={{ marginBottom: 8 }}>
          Sık sorulan sorular
        </h2>
        <div className="rule" style={{ marginBottom: 4 }} />
        {sorular.map((f) => (
          <details
            key={f.s}
            style={{ borderBottom: "1px solid var(--hair)", padding: "16px 0" }}
          >
            <summary
              style={{
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 15,
                listStyle: "none",
                display: "flex",
                justifyContent: "space-between",
                gap: 14,
              }}
            >
              {f.s}
              <span style={{ color: "var(--dim)" }}>+</span>
            </summary>
            <p
              style={{
                marginTop: 11,
                fontSize: 14,
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              {f.c}
            </p>
          </details>
        ))}
      </section>

      <UrunSema p={p} kategoriSlug={categorySlug(p.category)} sss={sorular} />
      <StickyBuyBar product={p} />

      <style>{`@media (max-width:820px){.urun-grid{grid-template-columns:1fr!important;gap:28px!important}}`}</style>
    </main>
  );
}
