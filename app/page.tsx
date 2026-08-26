import Link from "next/link";
import { allProducts, categories, categorySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Image from "next/image";
import kapaklar from "@/data/kategori_kapak.json";
import hero from "@/data/hero.json";

const KAPAK = kapaklar as Record<string, { img: string; w: number; adet: number }>;

export default function Home() {
  const sayilar = categories
    .map((c) => ({ c, n: allProducts.filter((p) => p.category === c).length }))
    .sort((a, b) => b.n - a.n);

  // kapağı yüksek çözünürlüklü olan kategoriler öne
  const vitrin = [...sayilar].sort((a, b) => (KAPAK[b.c]?.w ?? 0) - (KAPAK[a.c]?.w ?? 0)).slice(0, 8);
  const oneCikan = allProducts
    .filter((p) => p.images[0] && (KAPAK[p.category]?.w ?? 0) >= 1000)
    .slice(0, 8);

  return (
    <main>
      {/* ---- HERO ---- */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "48px 24px 0" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <p className="eyebrow" style={{ color: "var(--hi)" }}>Trafik · Yol · İş Güvenliği</p>
            <h1 className="display d1" style={{ marginTop: 18 }}>
              Sahada ne<br />gerekiyorsa<br />stokta.
            </h1>
            <p className="lede" style={{ marginTop: 24, maxWidth: 440 }}>
              {allProducts.length} ürün, ölçü ve teknik özellikleriyle listeli.
              Seçin, sepete atın, kartla ödeyin — telefon beklemeden.
            </p>
            <div style={{ marginTop: 30, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link href="/urunler" className="btn btn-solid">Katalogu aç</Link>
              <Link href="/urunler" className="btn btn-ghost">Ürün kodu ile ara</Link>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto", gap: 10 }}>
            {(hero as {img:string;ad:string;kat:string}[]).map((h, i) => (
              <div key={h.img} className="tile"
                   style={{ gridColumn: i === 0 ? "span 2" : "span 1",
                            aspectRatio: i === 0 ? "16/10" : "1/1",
                            border: "1px solid var(--hair)" }}>
                <Image src={h.img} alt={h.ad} fill unoptimized priority={i === 0}
                       sizes="(max-width:900px) 100vw, 40vw"
                       style={{ objectFit: "contain", padding: "7%" }} />
                <span className="eyebrow" style={{ position: "absolute", left: 12, bottom: 10, color: "var(--dim)" }}>
                  {h.kat}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rule" style={{ marginTop: 44 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))" }}>
          {([["Ürün", allProducts.length], ["Kategori", categories.length],
             ["Kargo", "Yurtiçi"], ["Sevk", "Konya"]] as [string, string | number][]).map(([k, v], i) => (
            <div key={k} style={{ padding: "22px 0 26px",
                                  borderRight: i < 3 ? "1px solid var(--hair)" : "none", paddingRight: 20 }}>
              <p className="display" style={{ fontSize: 34 }}>{v}</p>
              <p className="eyebrow" style={{ color: "var(--dim)", marginTop: 7 }}>{k}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="band" style={{ margin: "8px 0 56px" }} />

      {/* ---- KATEGORİ VİTRİNİ (görselli) ---- */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 26 }}>
          <h2 className="display d2">Kategoriler</h2>
          <Link href="/urunler" className="label" style={{ color: "var(--hi)", textDecoration: "none" }}>
            Tümü →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "40px 28px" }}>
          {vitrin.map(({ c, n }) => (
            <CategoryCard key={c} kategori={c} adet={n} gorsel={KAPAK[c]?.img} />
          ))}
        </div>
      </section>

      {/* ---- ÖNE ÇIKAN ÜRÜNLER ---- */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "80px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 26 }}>
          <h2 className="display d2">Öne çıkanlar</h2>
          <Link href="/urunler" className="label" style={{ color: "var(--hi)", textDecoration: "none" }}>Tümü →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: "44px 28px" }}>
          {oneCikan.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ---- TÜM KATEGORİLER: tipografik dizin ---- */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "88px 24px 0" }}>
        <h2 className="display d2" style={{ marginBottom: 22 }}>Tüm kategoriler</h2>
        <div className="rule" />
        {sayilar.map(({ c, n }) => (
          <Link key={c} href={`/kategori/${categorySlug(c)}`} className="cat"
                style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between",
                         gap: 20, padding: "17px 2px", borderBottom: "1px solid var(--hair)" }}>
            <span className="t display" style={{ fontSize: "clamp(17px,2.5vw,27px)" }}>{c}</span>
            <span className="eyebrow" style={{ color: "var(--dim)", whiteSpace: "nowrap" }}>{n} ürün</span>
          </Link>
        ))}
      </section>

      {/* ---- B2B ---- */}
      <section style={{ background: "var(--ink)", color: "var(--paper)", marginTop: 88 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "80px 24px",
                      display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p className="eyebrow" style={{ color: "var(--hi)" }}>Kurumsal alım</p>
            <h2 className="display d2" style={{ marginTop: 18, maxWidth: 700 }}>
              Baştan sona<br />kendiniz<br />sipariş verin
            </h2>
          </div>
          <div style={{ maxWidth: 430 }}>
            <p className="lede" style={{ color: "#9A9A9A", marginBottom: 22 }}>
              Sipariş için kimseyle görüşmenize gerek yok. Katalogdan seçin, sepete atın,
              kurumsal fatura bilgilerinizi girin, kartla ödeyin. Fatura ve kargo takibi
              e-postanıza gelir.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/urunler" className="btn"
                 style={{ background: "var(--paper)", borderColor: "var(--paper)", color: "var(--ink)" }}>
                Katalogu aç
              </Link>
              <a href="tel:05076584245" className="btn"
                 style={{ borderColor: "#3A3A3A", color: "var(--paper)" }}>
                Yine de arayın
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`@media (max-width:900px){.hero-grid{grid-template-columns:1fr!important;gap:32px!important}}`}</style>
    </main>
  );
}
