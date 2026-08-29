import { allProducts } from "@/lib/products";

const BASE = "https://www.trafikurunleri.com";

/**
 * Google Merchant Center ürün akışı (RSS 2.0 + g: ad alanı).
 * Merchant Center'a bu adres verilir; ürünler otomatik çekilir,
 * Google Alışveriş ve ücretsiz ürün listelemelerinde görünür.
 */
export const revalidate = 3600;

export async function GET() {
  const esc = (s: unknown) =>
    String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const kargo = (desi: number) =>
    desi <= 3 ? 250 : 250 + (Math.min(desi, 10) - 3) * 55 + Math.max(0, Math.min(desi, 25) - 10) * 35;

  const items = allProducts
    .filter((p) => p.id !== "TEST-1" && p.images[0] && p.price > 0)
    .map((p) => {
      const ozet = [p.boyut, p.malzeme, p.f_reflektif, p.f_taban && `${p.f_taban} tabanlı`]
        .filter(Boolean).join(" · ");
      const aciklama =
        `${p.name}. ${ozet ? ozet + ". " : ""}Ürün kodu ${p.kod}. ` +
        `${p.agirlik_kg ? `Ağırlık ${p.agirlik_kg} kg. ` : ""}` +
        `Kargo desisi ${p.desi}. Stokta, 1-2 iş gününde kargoda. Yurtiçi Kargo ile Türkiye geneline gönderim.`;

      const detay = [
        p.boyut && ["Ölçü", p.boyut],
        p.malzeme && ["Malzeme", p.malzeme],
        p.f_reflektif && ["Reflektif", p.f_reflektif],
        p.f_taban && ["Taban", p.f_taban],
      ].filter(Boolean) as [string, string][];

      return `    <item>
      <g:id>${esc(p.kod || p.slug)}</g:id>
      <title>${esc(p.name.slice(0, 150))}</title>
      <link>${BASE}/urun/${p.slug}</link>
      <description>${esc(aciklama.slice(0, 5000))}</description>
      <g:image_link>${BASE}${p.images[0]}</g:image_link>
      <g:availability>${p.stock > 0 ? "in_stock" : "out_of_stock"}</g:availability>
      <g:price>${p.price_kdv.toFixed(2)} TRY</g:price>
      <g:condition>new</g:condition>
      <g:brand>Trafik Ürünleri</g:brand>
      <g:mpn>${esc(p.kod)}</g:mpn>
      <g:identifier_exists>no</g:identifier_exists>
      <g:product_type>${esc(p.category)}</g:product_type>
      <g:google_product_category>2496</g:google_product_category>
      <g:shipping><g:country>TR</g:country><g:service>Yurtiçi Kargo</g:service><g:price>${kargo(p.desi).toFixed(2)} TRY</g:price></g:shipping>
      <g:shipping_weight>${(p.agirlik_kg || p.desi).toFixed(2)} kg</g:shipping_weight>
${detay.map(([a, v]) => `      <g:product_detail><g:section_name>Teknik</g:section_name><g:attribute_name>${esc(a)}</g:attribute_name><g:attribute_value>${esc(v)}</g:attribute_value></g:product_detail>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Trafik Ürünleri — Ürün Akışı</title>
    <link>${BASE}</link>
    <description>Trafik güvenliği, yol işaretleme ve iş güvenliği ekipmanları</description>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=3600" },
  });
}
