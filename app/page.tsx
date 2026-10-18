import Link from "next/link";
import { allProducts, categories, categorySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import AnaArama from "@/components/AnaArama";
import KullanimAlanlari from "@/components/KullanimAlanlari";
import GuvenBandi from "@/components/GuvenBandi";
import Referanslar from "@/components/Referanslar";
import GuvenSerit from "@/components/GuvenSerit";
import OdemeSerit from "@/components/OdemeSerit";
import { tumYazilar } from "@/lib/blog";
import kapaklar from "@/data/kategori_kapak.json";
import coksatan from "@/data/coksatan.json";

export const metadata = { alternates: { canonical: "/" } };

const KAPAK = kapaklar as Record<string, { img: string; w: number; adet: number }>;

/**
 * ANA SAYFA DÜZENİ
 *
 * Önceki hâlinde 81 ürün kartı ve 35 mozaik karo vardı; üç ayrı blok aynı işi
 * yapıyordu (kategori mozaiği, "her kategoriden", "tüm kategoriler") ve
 * seçim mantığı olmayan 60 ürün sıralanıyordu. Ziyaretçi çok ürün görüyor
 * ama kendi işine hangisinin yaradığını anlamıyordu. Arama kutusu hiç yoktu.
 *
 * Yeni sıra, ziyaretçinin sorduğu sırayla:
 *   1. Ne satıyorsunuz + ARAMA (kod bilen doğrudan bulsun)
 *   2. Hangi iş için? — kullanım alanları
 *   3. En çok tercih edilenler
 *   4. Ana kategoriler
 *   5. Kime sattık — kurum referansları
 *   6. Nasıl seçerim — rehberler
 *   7. Tüm kategoriler (tam liste, iç bağlantı için de gerekli)
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

  // Ana kategoriler: ürün sayısı en yüksek 8 tanesi
  const anaKategoriler = sayilar.slice(0, 8);

  return (
    <main>
      <GuvenSerit />
      <OdemeSerit />

      {/* 1 — GİRİŞ + ARAMA */}
      <section style={{ maxWidth: 1520, margin: "0 auto", padding: "40px 20px 0" }}>
        <p className="eyebrow" style={{ color: "var(--hi)" }}>Konya Teknokent</p>
        <h1 className="display" style={{ fontSize: "clamp(30px,5.2vw,62px)", marginTop: 10, maxWidth: 820 }}>
          Trafik ve yol<br />güvenliği ekipmanları
        </h1>
        <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.7, color: "var(--muted)", maxWidth: 620 }}>
          {allProducts.length} ürün, ölçü ve teknik özellikleriyle listeli. Kamu kurumlarına ve
          özel sektöre satış, bireysel ve kurumsal fatura.
        </p>

        <div style={{ marginTop: 26 }}>
          <AnaArama />
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
          <Link href="/urunler" className="btn btn-solid" style={{ padding: "15px 24px" }}>
            Tüm katalog
          </Link>
          <Link href="/iletisim" className="btn btn-ghost" style={{ padding: "15px 24px" }}>
            Teklif iste
          </Link>
        </div>
      </section>

      {/* 2 — HANGİ İŞ İÇİN */}
      <section style={{ maxWidth: 1520, margin: "0 auto", padding: "56px 20px 0" }}>
        <Baslik baslik="Hangi iş için?" href="/urunler" bagAd="Tüm kategoriler" />
        <KullanimAlanlari />
      </section>

      {/* 3 — ÇOK SATANLAR */}
      {cokSatanlar.length > 0 && (
        <section style={{ maxWidth: 1520, margin: "0 auto", padding: "56px 20px 0" }}>
          <Baslik baslik="Çok satanlar" href="/urunler" />
          <div className="grid-one">
            {cokSatanlar.map((p, i) => <ProductCard key={p.id} product={p} oncelik={i < 4} />)}
          </div>
        </section>
      )}

      {/* 4 — ANA KATEGORİLER */}
      <section style={{ maxWidth: 1520, margin: "0 auto", padding: "56px 20px 0" }}>
        <Baslik baslik="Ana kategoriler" href="/urunler" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "30px 22px" }}>
          {anaKategoriler.map(({ c, n }) => (
            <CategoryCard key={c} kategori={c} adet={n} gorsel={KAPAK[c]?.img} />
          ))}
        </div>
      </section>

      {/* 5 — REFERANSLAR */}
      <section style={{ paddingTop: 60 }}>
        <div style={{ maxWidth: 1520, margin: "0 auto", padding: "0 20px 14px" }}>
          <h2 className="display" style={{ fontSize: "clamp(20px,2.6vw,30px)" }}>Teslim ettiğimiz kurumlar</h2>
        </div>
        <Referanslar />
      </section>

      {/* 6 — REHBERLER */}
      <section style={{ maxWidth: 1520, margin: "0 auto", padding: "56px 20px 0" }}>
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

      <div style={{ paddingTop: 56 }}><GuvenBandi /></div>

      {/* 7 — TÜM KATEGORİLER */}
      <section style={{ maxWidth: 1520, margin: "0 auto", padding: "56px 20px 0" }}>
        <Baslik baslik="Tüm kategoriler" href="/urunler" bagAd="Katalogu aç" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {sayilar.map(({ c, n }) => (
            <Link key={c} href={`/kategori/${categorySlug(c)}`} className="label" prefetch={false}
                  style={{ padding: "9px 13px", border: "1px solid var(--hair)",
                           color: "var(--ink)", textDecoration: "none" }}>
              {c} <span style={{ color: "var(--dim)" }}>{n}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* KURUMSAL ALIM */}
      <section style={{ background: "var(--ink)", color: "var(--paper)", marginTop: 72 }}>
        <div style={{ maxWidth: 1520, margin: "0 auto", padding: "56px 20px",
                      display: "flex", flexWrap: "wrap", gap: 34, justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p className="eyebrow" style={{ color: "var(--hi)" }}>Kurumsal alım</p>
            <h2 className="display" style={{ fontSize: "clamp(24px,3.6vw,42px)", marginTop: 12, maxWidth: 560 }}>
              Belediye, şantiye ve<br />filo alımlarında teklif
            </h2>
          </div>
          <div style={{ maxWidth: 400 }}>
            <p style={{ fontSize: 14.5, color: "#9A9A9A", lineHeight: 1.65, marginBottom: 18 }}>
              Doğrudan temin ve ihale süreçlerinde teknik şartnameye göre ürün eşleştirip
              birim fiyat teklif cetvelini hazırlıyoruz. Şartnameyi gönderin, aynı gün dönelim.
            </p>
            <Link href="/iletisim"
                  className="btn"
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
