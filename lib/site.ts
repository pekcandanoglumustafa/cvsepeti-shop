/**
 * Sitenin tek domain kaynağı. canonical, og:url, sitemap, robots, JSON-LD ve ürün akışı buradan okur.
 * Domain değişince Vercel'de NEXT_PUBLIC_SITE_URL'i değiştirmek (veya buradaki varsayılanı) yeterli.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.cvsepeti.org").replace(/\/+$/, "");

/** Göreli yolu mutlak URL'ye çevirir: abs("/urunler") → https://www.cvsepeti.org/urunler */
export const abs = (path = "/") => (path === "/" ? SITE_URL : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`);

/** Marka adı (domain'den bağımsız) */
export const SITE_NAME = "trafikurunleri.com";

/** Sayfa openGraph'ı layout'takini tamamen ezer — görsel/siteName/locale kaybolmasın diye her sayfa bunu yayar */
export const OG_DEFAULTS = {
  siteName: SITE_NAME,
  locale: "tr_TR",
  type: "website" as const,
  images: [{ url: "/marka/og.png", width: 1200, height: 630, alt: SITE_NAME }],
};

/** BreadcrumbList JSON-LD: [["Ana sayfa", "/"], ["Katalog", "/urunler"], ...] */
export const breadcrumbLd = (items: [name: string, path: string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
});
