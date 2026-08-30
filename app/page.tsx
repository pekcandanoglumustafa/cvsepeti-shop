import Link from "next/link";
import { allProducts, categories, categorySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import HeroMozaik from "@/components/HeroMozaik";
import GuvenBandi from "@/components/GuvenBandi";
import Referanslar from "@/components/Referanslar";
import GuvenSerit from "@/components/GuvenSerit";
import OdemeSerit from "@/components/OdemeSerit";
import { tumYazilar } from "@/lib/blog";
import kapaklar from "@/data/kategori_kapak.json";
import coksatan from "@/data/coksatan.json";
import katVitrinData from "@/data/kategori_vitrin.json";

const KAPAK = kapaklar as Record<string, { img: string; w: number; adet: number }>;

export default function Home() {
  const sayilar = categories
    .map((c) => ({ c, n: allProducts.filter((p) => p.category === c).length }))
    .sort((a, b) => b.n - a.n);

  const gorselli = allProducts.filter((p) => p.images[0] && p.id !== "TEST-1");
  const netGorselli = gorselli.filter((p) => (KAPAK[p.category]?.w ?? 0) >= 1000);
  const csSlug = (coksatan as { slug: string }[]).map((c) => c.slug);
  const cokSatanlar = csSlug.map((sl) => allProducts.find((x) => x.slug === sl)).filter(Boolean).slice(0, 9) as any[];
  const csSet = new Set(cokSatanlar.map((x) => x.slug));
  const kategoriVitrini = (katVitrinData as { kat: string; slug: string; adet: number }[])
    .map((v) => ({ ...v, urun: allProducts.find((x) => x.slug === v.slug) }))
    .filter((v) => v.urun);
  const vitrin = netGorselli.filter((x) => !csSet.has(x.slug)).slice(0, 24);
  const koni = gorselli.filter((p) => p.category === "Trafik Konisi").slice(0, 12);
  const delinator = gorselli.filter((p) => p.category === "Delinatör").slice(0, 12);
  const kasis = gorselli.filter((p) => p.category === "Hız Kesici Kasis").slice(0, 12);
  const katVitrin = [...sayilar].sort((a, b) => (KAPAK[b.c]?.w ?? 0) - (KAPAK[a.c]?.w ?? 0)).slice(0, 12);

  return (
    <main>
      <GuvenSerit />
      <OdemeSerit />

      {/* ---- ÜRÜN ODAKLI GİRİŞ ---- */}
      <section style={{ maxWidth: 1520, margin: "0 auto", padding: "26px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                      gap: 20, flexWrap: "wrap", marginBottom: 18 }}>
          <div>
            <p className="eyebrow" style={{ color: "var(--hi)" }}>Fabrikadan doğrudan satış</p>
            <h1 className="display" style={{ fontSize: "clamp(30px,5.2vw,62px)", marginTop: 10 }}>
              Trafik ve yol<br />güvenliği ekipmanları
            </h1>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/urunler" className="btn btn-solid" style={{ padding: "16px 26px" }}>
              Tüm ürünler
            </Link>
          </div>
        </div>

        {/* ÇOK SATANLAR */}
        {cokSatanlar.length > 0 && (
          <>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 13 }}>
              <span className="display" style={{ fontSize: "clamp(17px,2.2vw,24px)" }}>Çok satanlar</span>
              <span className="eyebrow" style={{ color: "var(--dim)" }}>En çok tercih edilen ürünler</span>
            </div>
            <div className="grid-one" style={{ marginBottom: 34 }}>
              {cokSatanlar.map((p, i) => <ProductCard key={p.id} product={p} oncelik={i < 3} />)}
            </div>
          </>
        )}

        {/* ne sattığımızı tek bakışta gösteren kategori mozaiği */}
        <HeroMozaik />

        <div className="rule" style={{ margin: "34px 0 18px" }} />

        {/* HER KATEGORİDEN BİR ÜRÜN — ne sattığımızı ürünle göster */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
          <span className="display" style={{ fontSize: "clamp(17px,2.2vw,24px)" }}>Her kategoriden</span>
          <span className="eyebrow" style={{ color: "var(--dim)" }}>{kategoriVitrini.length} ürün grubu</span>
        </div>
        <div className="grid-urun" style={{ marginBottom: 40 }}>
          {kategoriVitrini.map((v) => (
            <div key={v.kat}>
              <ProductCard product={v.urun as any} />
              <Link href={`/kategori/${categorySlug(v.kat)}`}
                    style={{ display: "block", marginTop: 5, fontSize: 10, fontWeight: 800,
                             textTransform: "uppercase", letterSpacing: ".06em",
                             color: "var(--hi)", textDecoration: "none" }}>
                {v.kat} · {v.adet} →
              </Link>
            </div>
          ))}
        </div>

        <div className="hair" style={{ margin: "0 0 20px" }} />

        <div className="grid-urun">
          {vitrin.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <Referanslar />

      <Bolum baslik="Trafik konileri" href={`/kategori/${categorySlug("Trafik Konisi")}`} urunler={koni} />
      <Bolum baslik="Delinatörler" href={`/kategori/${categorySlug("Delinatör")}`} urunler={delinator} />
      <Bolum baslik="Hız kesici kasisler" href={`/kategori/${categorySlug("Hız Kesici Kasis")}`} urunler={kasis} />

      {/* ---- KATEGORİ LİSTESİ ---- */}
      <section style={{ maxWidth: 1520, margin: "0 auto", padding: "56px 20px 0" }}>
        <Baslik baslik="Tüm kategoriler" href="/urunler" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {sayilar.map(({ c, n }) => (
            <Link key={c} href={`/kategori/${categorySlug(c)}`} className="label"
                  style={{ padding: "9px 13px", border: "1px solid var(--hair)",
                           color: "var(--ink)", textDecoration: "none" }}>
              {c} <span style={{ color: "var(--dim)" }}>{n}</span>
            </Link>
          ))}
        </div>
      </section>

      <GuvenBandi />

      {/* ---- KURUMSAL ---- */}
      <section style={{ background: "var(--ink)", color: "var(--paper)", marginTop: 64 }}>
        <div style={{ maxWidth: 1520, margin: "0 auto", padding: "56px 20px",
                      display: "flex", flexWrap: "wrap", gap: 34, justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p className="eyebrow" style={{ color: "var(--hi)" }}>Toplu alım</p>
            <h2 className="display" style={{ fontSize: "clamp(24px,3.6vw,42px)", marginTop: 12, maxWidth: 560 }}>
              Belediye, şantiye ve<br />filo alımlarında proje fiyatı
            </h2>
          </div>
          <div style={{ maxWidth: 400 }}>
            <p style={{ fontSize: 14.5, color: "#9A9A9A", lineHeight: 1.65, marginBottom: 18 }}>
              50 adet üzeri alımlarda özel fiyat uygulanır. Kurumsal fatura, ürün kodu ve
              teknik özelliklerle birlikte kesilir. Siparişi kendiniz tamamlarsınız.
            </p>
            <Link href="/urunler" className="btn"
                  style={{ background: "var(--paper)", borderColor: "var(--paper)", color: "var(--ink)" }}>
              Katalogu aç
            </Link>
          </div>
        </div>
      </section>

      {/* ---- REHBERLER ---- */}
      <section style={{ maxWidth: 1520, margin: "0 auto", padding: "56px 20px 0" }}>
        <Baslik baslik="Ürün seçim rehberleri" href="/blog" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22 }}>
          {tumYazilar().slice(0, 4).map((y) => (
            <Link key={y.slug} href={`/blog/${y.slug}`} className="card"
                  style={{ textDecoration: "none", color: "inherit", borderTop: "2px solid var(--ink)", paddingTop: 12 }}>
              <span className="eyebrow" style={{ color: "var(--hi)" }}>{y.kategori}</span>
              <h3 className="name" style={{ marginTop: 8, fontSize: 15, fontWeight: 800, lineHeight: 1.25 }}>
                {y.baslik}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function Baslik({ baslik, href }: { baslik: string; href: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
      <h2 className="display" style={{ fontSize: "clamp(20px,2.6vw,30px)" }}>{baslik}</h2>
      <Link href={href} className="label" style={{ color: "var(--hi)", textDecoration: "none" }}>Tümü →</Link>
    </div>
  );
}

function Bolum({ baslik, href, urunler }: { baslik: string; href: string; urunler: any[] }) {
  if (!urunler.length) return null;
  return (
    <section style={{ maxWidth: 1520, margin: "0 auto", padding: "48px 20px 0" }}>
      <Baslik baslik={baslik} href={href} />
      <div className="grid-urun">
        {urunler.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
