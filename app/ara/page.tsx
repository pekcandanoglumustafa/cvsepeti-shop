import Link from "next/link";
import { allProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";

export function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return { title: "Arama | CV Sepeti" };
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/ı/g, "i").replace(/İ/g, "i")
    .replace(/ş/g, "s").replace(/Ş/g, "s")
    .replace(/ğ/g, "g").replace(/Ğ/g, "g")
    .replace(/ü/g, "u").replace(/Ü/g, "u")
    .replace(/ö/g, "o").replace(/Ö/g, "o")
    .replace(/ç/g, "c").replace(/Ç/g, "c");
}

export default async function AraPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = (q || "").trim();
  const norm = normalize(query);

  const results = query
    ? allProducts.filter(p => {
        const name = normalize(p.name);
        const cat = normalize(p.category);
        const desc = normalize(p.description || "");
        // Split query into words, all must match somewhere
        const words = norm.split(/\s+/).filter(Boolean);
        return words.every(w => name.includes(w) || cat.includes(w) || desc.includes(w));
      })
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
