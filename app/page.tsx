import Link from "next/link";
import { allProducts, categories, categorySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Banner from "@/components/Banner";
import GuvenBandi from "@/components/GuvenBandi";
import Referanslar from "@/components/Referanslar";
import GuvenSerit from "@/components/GuvenSerit";
import { tumYazilar } from "@/lib/blog";
import kapaklar from "@/data/kategori_kapak.json";
import coksatan from "@/data/coksatan.json";

export const metadata = { alternates: { canonical: "/" } };

const KAPAK = kapaklar as Record<string, { img: string; w: number; adet: number }>;

/**
 * ANA SAYFA — sade.
 *
 * Banner, çok satanlar, kategoriler, referanslar, rehberler. Başka bir şey yok.
 * Önceden 81 ürün kartı, 35 karolu mozaik ve üç ayrı güven şeridi vardı;
 * ziyaretçi çok şey görüp hiçbirine odaklanamıyordu.
 */
export default function Home() {
  const sayilar = categories
    .map((c) => ({ c, n: allProducts.filter((p) => p.category === c).length }))
    .sort((a, b) => b.n - a.n);

  const csSlug = (coksatan as { slug: string }[]).map((c) => c.slug);
  const cokSatanlar = csSlug
    .map((sl) => allProducts.find((x) => x.slug === sl))
    .filter(Boolean)
    .slice(0, 10) as NonNullable<ReturnType<typeof allProducts.find>>[];

  return (
    <main>
      <GuvenSerit />
      <Banner urunSayisi={allProducts.length} />

      {/* ÇOK SATANLAR */}
      {cokSatanlar.length > 0 && (
        <section style={{ maxWidth: 1520, margin: "0 auto", padding: "60px 20px 0" }}>
          <Baslik baslik="Çok satanlar" href="/urunler" />
          <div className="grid-one">
            {cokSatanlar.map((p, i) => <ProductCard key={p.id} product={p} oncelik={i < 4} />)}
          </div>
        </section>
      )}

      {/* KATEGORİLER */}
      <section style={{ maxWidth: 1520, margin: "0 auto", padding: "60px 20px 0" }}>
        <Baslik baslik="Kategoriler" href="/urunler" bagAd="Tüm katalog" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "30px 22px" }}>
          {sayilar.slice(0, 8).map(({ c, n }) => (
            <CategoryCard key={c} kategori={c} adet={n} gorsel={KAPAK[c]?.img} />
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 30 }}>
          {sayilar.slice(8).map(({ c, n }) => (
            <Link key={c} href={`/kategori/${categorySlug(c)}`} className="label" prefetch={false}
                  style={{ padding: "9px 13px", border: "1px solid var(--hair)",
                           color: "var(--ink)", textDecoration: "none" }}>
              {c} <span style={{ color: "var(--dim)" }}>{n}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* REFERANSLAR */}
      <section style={{ paddingTop: 64 }}>
        <div style={{ maxWidth: 1520, margin: "0 auto", padding: "0 20px 16px" }}>
          <h2 className="display" style={{ fontSize: "clamp(20px,2.6vw,30px)" }}>Teslim ettiğimiz kurumlar</h2>
        </div>
        <Referanslar />
      </section>

      {/* REHBERLER */}
      <section style={{ maxWidth: 1520, margin: "0 auto", padding: "60px 20px 0" }}>
        <Baslik baslik="Ürün seçim rehberleri" href="/blog" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22 }}>
          {tumYazilar().slice(0, 4).map((y) => (
            <Link key={y.slug} href={`/blog/${y.slug}`} className="card" prefetch={false}
                  style={{ textDecoration: "none", color: "inherit", borderTop: "2px solid var(--ink)", paddingTop: 12 }}>
              <span className="eyebrow" style={{ color: "var(--hi)" }}>{y.kategori}</span>
              <h3 className="name" style={{ marginTop: 8, fontSize: 15, fontWeight: 800, lineHeight: 1.25 }}>
                {y.baslik}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <div style={{ paddingTop: 64 }}><GuvenBandi /></div>

      {/* KURUMSAL ALIM */}
      <section style={{ background: "var(--ink)", color: "var(--paper)", marginTop: 72 }}>
        <div style={{ maxWidth: 1520, margin: "0 auto", padding: "56px 20px",
                      display: "flex", flexWrap: "wrap", gap: 34, justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="display" style={{ fontSize: "clamp(24px,3.6vw,40px)", maxWidth: 520 }}>
            Belediye, şantiye ve<br />filo alımlarında teklif
          </h2>
          <div style={{ maxWidth: 380 }}>
            <p style={{ fontSize: 14.5, color: "#9A9A9A", lineHeight: 1.65, marginBottom: 18 }}>
              Teknik şartnameye göre ürün eşleştirip birim fiyat teklif cetvelini hazırlıyoruz.
            </p>
            <Link href="/iletisim" className="btn"
                  style={{ background: "var(--paper)", borderColor: "var(--paper)", color: "var(--ink)" }}>
              Teklif iste
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Baslik({ baslik, href, bagAd = "Tümü" }: { baslik: string; href: string; bagAd?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between",
                  gap: 16, marginBottom: 18 }}>
      <h2 className="display" style={{ fontSize: "clamp(20px,2.6vw,30px)" }}>{baslik}</h2>
      <Link href={href} className="label" prefetch={false}
            style={{ color: "var(--hi)", textDecoration: "none", whiteSpace: "nowrap" }}>
        {bagAd} →
      </Link>
    </div>
  );
}
