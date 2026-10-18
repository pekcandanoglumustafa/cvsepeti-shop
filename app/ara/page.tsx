import Link from "next/link";
import { eslesir, urunMetni } from "@/lib/arama";
import { sayfaBasligi } from "@/lib/seo";
import { allProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";

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
    <main style={{ padding: "24px 0 48px" }}>
      <div className="container">
        <div style={{ marginBottom: 24 }}>
          {query ? (
            <>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 4 }}>
                &quot;{query}&quot; için arama sonuçları
              </h1>
              <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                {results.length > 0
                  ? `${results.length} ürün bulundu`
                  : "Sonuç bulunamadı"}
              </p>
            </>
          ) : (
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>Arama</h1>
          )}
        </div>

        {results.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 12 }}>
            {results.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : query ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-secondary)" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text)" }}>
              &quot;{query}&quot; için sonuç bulunamadı
            </p>
            <p style={{ fontSize: 14, marginBottom: 24 }}>Farklı bir kelime deneyin ya da tüm ürünlere göz atın.</p>
            <Link href="/urunler" className="btn-primary">Tüm Ürünlere Git →</Link>
          </div>
        ) : null}
      </div>
    </main>
  );
}
