import { MetadataRoute } from "next";
import { allProducts, categories, categorySlug } from "@/lib/products";

const BASE = "https://www.cvsepeti.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/urunler`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE}/kategori/${categorySlug(c)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = allProducts.map((p) => ({
    url: `${BASE}/urun/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
