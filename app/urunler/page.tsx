import { useCases } from "@/lib/use-cases";
import { allProducts, kartUrunler } from "@/lib/products";
import ProductFilters from "@/components/ProductFilters";
import { OG_DEFAULTS } from "@/lib/site";
import { sayfaBasligi } from "@/lib/seo";

export const metadata = {
  // absolute: layout'taki "%s | marka" şablonu markayı ikinci kez ekliyordu
  // ("Tüm Katalog | Trafik Ürünleri | Trafik Ürünleri")
  title: { absolute: sayfaBasligi("Tüm katalog") },
  description:
    "Trafik güvenliği, yol işaretleme ve iş güvenliği ekipmanları. Ölçü, malzeme ve reflektif tipine göre filtreleyin.",
  alternates: { canonical: "/urunler" },
  openGraph: { ...OG_DEFAULTS, url: "/urunler", title: "Tüm katalog" },
};

export default async function Urunler({
  searchParams,
}: {
  searchParams: Promise<{ use?: string }>;
}) {
  const { use } = await searchParams;
  const usage = use ? useCases[use] : undefined;
  const items = usage
    ? allProducts.filter((p) => usage.categories.includes(p.category))
    : allProducts;
  return (
    <main className="wrap">
      <div className="breadcrumbs">
        <a href="/">Ana sayfa</a>
        <span>/</span>
        <b>Katalog</b>
      </div>
      <div className="page-intro">
        <div>
          <p className="eyebrow">ÜRÜN KATALOĞU</p>
          <h1>{usage?.title || "İşinize uygun ürünü bulun."}</h1>
          <p>
            Ölçü, malzeme ve kullanım alanına göre filtreleyin. Doğru ürünü
            kolayca seçin.
          </p>
        </div>
        <a className="btn secondary small" href="/iletisim">
          Toplu alım mı yapıyorsunuz? ↗
        </a>
      </div>
      <ProductFilters
        key={use || "all"}
        urunler={kartUrunler(items)}
        baslik="Katalog ürünleri"
      />
    </main>
  );
}
