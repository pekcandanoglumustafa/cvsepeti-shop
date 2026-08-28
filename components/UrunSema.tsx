import type { Product } from "@/lib/products";

const BASE = "https://www.trafikurunleri.com";

/** Product + Offer + BreadcrumbList + FAQPage — Google AI Overviews için */
export default function UrunSema({ p, kategoriSlug, sss }: {
  p: Product; kategoriSlug: string; sss: { s: string; c: string }[];
}) {
  const url = `${BASE}/urun/${p.slug}`;
  const gorsel = p.images[0] ? `${BASE}${p.images[0]}` : undefined;

  const ozellik = [
    p.boyut && { "@type": "PropertyValue", name: "Ölçü", value: p.boyut },
    p.malzeme && { "@type": "PropertyValue", name: "Malzeme", value: p.malzeme },
    p.f_reflektif && { "@type": "PropertyValue", name: "Reflektif", value: p.f_reflektif },
    p.f_taban && { "@type": "PropertyValue", name: "Taban", value: p.f_taban },
    p.agirlik_kg && { "@type": "PropertyValue", name: "Ağırlık", value: `${p.agirlik_kg} kg` },
    { "@type": "PropertyValue", name: "Kargo desisi", value: String(p.desi) },
  ].filter(Boolean);

  const sema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}/#urun`,
        name: p.name,
        sku: p.kod,
        mpn: p.kod,
        description: p.description?.replace(/\n+/g, " ").slice(0, 500),
        image: gorsel ? [gorsel] : undefined,
        category: p.category,
        brand: { "@type": "Brand", name: "Trafik Ürünleri" },
        additionalProperty: ozellik,
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "TRY",
          price: p.price_kdv.toFixed(2),
          priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
          availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": `${BASE}/#kurulus` },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingDestination: { "@type": "DefinedRegion", addressCountry: "TR" },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
              transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
            },
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: BASE },
          { "@type": "ListItem", position: 2, name: "Katalog", item: `${BASE}/urunler` },
          { "@type": "ListItem", position: 3, name: p.category, item: `${BASE}/kategori/${kategoriSlug}` },
          { "@type": "ListItem", position: 4, name: p.name, item: url },
        ],
      },
      sss.length > 0 && {
        "@type": "FAQPage",
        mainEntity: sss.map((f) => ({
          "@type": "Question", name: f.s,
          acceptedAnswer: { "@type": "Answer", text: f.c },
        })),
      },
    ].filter(Boolean),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sema) }} />;
}
