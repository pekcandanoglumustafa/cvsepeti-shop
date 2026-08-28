import type { MetadataRoute } from "next";
import { allProducts, categories, categorySlug } from "@/lib/products";
import { tumYazilar } from "@/lib/blog";

const BASE = "https://www.trafikurunleri.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const bugun = new Date();
  return [
    { url: BASE, lastModified: bugun, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/urunler`, lastModified: bugun, changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE}/blog`, lastModified: bugun, changeFrequency: "weekly", priority: 0.8 },
    ...categories.map((c) => ({
      url: `${BASE}/kategori/${categorySlug(c)}`,
      lastModified: bugun, changeFrequency: "weekly" as const, priority: 0.9,
    })),
    ...allProducts.filter((p) => p.id !== "TEST-1").map((p) => ({
      url: `${BASE}/urun/${p.slug}`,
      lastModified: bugun, changeFrequency: "weekly" as const, priority: 0.8,
    })),
    ...tumYazilar().map((y) => ({
      url: `${BASE}/blog/${y.slug}`,
      lastModified: new Date(y.guncelleme || y.tarih),
      changeFrequency: "monthly" as const, priority: 0.7,
    })),
  ];
}
