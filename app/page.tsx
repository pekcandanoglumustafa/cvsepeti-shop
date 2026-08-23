import Link from "next/link";
import { allProducts, categories, categorySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const öne = allProducts.filter(p => p.images[0]).slice(0, 8);
  const koni = allProducts.filter(p => p.category === "Trafik Konisi").slice(0, 4);
  const kasis = allProducts.filter(p => p.category === "Hız Kesici Kasis").slice(0, 4);
  const büyükKat = categories
    .map(c => ({ c, n: allProducts.filter(p => p.category === c).length }))
    .sort((a, b) => b.n - a.n).slice(0, 12);

  return (
    <main>
      {/* HERO — tez: katalog genişliği */}
      <section style={{ borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", padding: "72px 20px 56px" }}>
          <p className="eyebrow" style={{ color: "var(--hi)", marginBottom: 22 }}>
            Trafik · Yol · İş Güvenliği
          </p>
          <h1 className="display" style={{ fontSize: "clamp(46px,10.5vw,148px)", maxWidth: 1150 }}>
            Sahada ne<br />gerekiyorsa<br />stokta.
          </h1>

          <div style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: 44, alignItems: "flex-end",
                        justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 44, flexWrap: "wrap" }}>
              {[["Ürün", allProducts.length], ["Kategori", categories.length], ["Kargo", "Yurtiçi"]].map(([k, v]) => (
                <div key={String(k)}>
                  <p className="display" style={{ fontSize: 40 }}>{v}</p>
                  <p className="eyebrow" style={{ color: "var(--muted)", marginTop: 4 }}>{k}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/urunler" className="btn btn-solid">Katalogu aç</Link>
              <a href="https://wa.me/905076584245" className="btn btn-ghost">Toplu sipariş</a>
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORİLER — tipografik, ürün adedi bilgi taşıyor */}
      <section style={{ maxWidth: 1360, margin: "0 auto", padding: "56px 20px" }}>
        <h2 className="display" style={{ fontSize: 30, marginBottom: 20 }}>Kategoriler</h2>
        <div style={{ borderTop: "2px solid var(--ink)" }}>
          {büyükKat.map(({ c, n }) => (
            <Link key={c} href={`/kategori/${categorySlug(c)}`}
              style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 20,
                       padding: "18px 2px", borderBottom: "1px solid var(--line)",
                       textDecoration: "none", color: "var(--ink)" }}>
              <span className="display" style={{ fontSize: "clamp(20px,3.4vw,34px)" }}>{c}</span>
              <span className="label" style={{ color: "var(--muted)", whiteSpace: "nowrap" }}>{n} ürün</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ÖNE ÇIKANLAR */}
      <Grid title="Öne çıkanlar" href="/urunler" items={öne} />

      {/* ŞERİT */}
      <div className="band" style={{ margin: "16px 0" }} />

      <Grid title="Trafik konileri" href={`/kategori/${categorySlug("Trafik Konisi")}`} items={koni} />
      <Grid title="Hız kesici kasisler" href={`/kategori/${categorySlug("Hız Kesici Kasis")}`} items={kasis} />

      {/* B2B ŞERİDİ */}
      <section style={{ background: "var(--ink)", color: "var(--paper)", marginTop: 56 }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", padding: "64px 20px",
                      display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 className="display" style={{ fontSize: "clamp(28px,5vw,54px)", maxWidth: 620 }}>
              Belediye, şantiye,<br />filo alımı
            </h2>
            <p style={{ marginTop: 14, color: "#9C9C99", maxWidth: 460, fontSize: 15 }}>
              Adetli alımlarda özel fiyat. Ürün kodunu ve miktarı iletin, aynı gün dönüş yapalım.
            </p>
          </div>
          <a href="https://wa.me/905076584245" className="btn"
             style={{ background: "var(--hivis)", borderColor: "var(--hivis)", color: "var(--ink)" }}>
            Teklif al
          </a>
        </div>
      </section>
    </main>
  );
}

function Grid({ title, href, items }: { title: string; href: string; items: any[] }) {
  if (!items.length) return null;
  return (
    <section style={{ maxWidth: 1360, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 className="display" style={{ fontSize: 30 }}>{title}</h2>
        <Link href={href} className="label" style={{ color: "var(--hi)", textDecoration: "none" }}>Tümü →</Link>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 26 }}>
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
