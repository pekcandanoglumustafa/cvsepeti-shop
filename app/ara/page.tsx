import Link from "next/link";
import { eslesir, urunMetni } from "@/lib/arama";
import { sayfaBasligi } from "@/lib/seo";
import { allProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import AramaKutusu from "@/components/AramaKutusu";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const s = (q || "").trim();
  return {
    // absolute: layout şablonu markayı bir kez daha eklemesin
    title: { absolute: sayfaBasligi(s ? `"${s}" arama sonuçları` : "Ürün ara") },
    // arama sonucu sayfaları indekslenmez — sonsuz sayıda ince varyant üretir
    robots: { index: false, follow: true },
  };
}

export default async function AraPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = (q || "").trim();

  // Ürün kodu ve ölçü de aranabilir; "75cm" ile "75 cm" aynı sonucu verir.
  // Eski hâli kodu hiç aramıyordu ve "İ" küçültmesi bozuktu.
  const results = query
    ? allProducts.filter((p) => eslesir(`${urunMetni(p)} ${p.description || ""}`, query))
    : [];

  return (
    <main className="wrap" style={{ padding: "44px 0 80px" }}>
      <h1 className="display d3">{query ? `"${query}"` : "Ürün ara"}</h1>

      <div style={{ marginTop: 20 }}>
        <AramaKutusu baslangic={query} otomatikOdak={!query} />
      </div>

      {query && (
        <p className="label" style={{ color: "var(--dim)", marginTop: 16 }}>
          {results.length > 0 ? `${results.length} ürün bulundu` : "Sonuç bulunamadı"}
        </p>
      )}

      <div className="rule" style={{ margin: "26px 0 28px" }} />

      {results.length > 0 ? (
        <div className="grid-urun">
          {results.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : query ? (
        <div style={{ padding: "40px 0 60px", maxWidth: 560 }}>
          <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--muted)" }}>
            Ürünü kodu ile aramayı deneyin (örneğin <strong style={{ color: "var(--ink)" }}>ZT8075</strong>)
            ya da ölçüsüyle (<strong style={{ color: "var(--ink)" }}>75 cm delinatör</strong>).
            Aradığınızı bulamazsanız arayın, biz bulalım.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
            <Link href="/urunler" className="btn btn-solid" style={{ padding: "14px 22px" }}>
              Tüm katalog
            </Link>
            <Link href="/iletisim" className="btn btn-ghost" style={{ padding: "14px 22px" }}>
              İletişim
            </Link>
          </div>
        </div>
      ) : null}
    </main>
  );
}
