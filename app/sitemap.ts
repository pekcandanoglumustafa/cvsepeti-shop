import type { MetadataRoute } from "next";
import { allProducts, categories, categorySlug } from "@/lib/products";
import { tumYazilar } from "@/lib/blog";

import { SITE_URL as BASE } from "@/lib/site";

/**
 * lastModified için sabit tarihler kullanıyoruz.
 *
 * Önceden her sayfaya `new Date()` yazılıyordu: her deploy'da sitenin tamamı
 * "bugün değişti" diye bildiriliyordu. Google bunu fark edince lastModified
 * sinyaline bütünüyle güvenmeyi bırakıyor ve gerçekten değişen sayfaları da
 * geç tarıyor. Katalog ya da kurumsal metinler değiştiğinde ilgili tarihi
 * elle güncellemek doğru davranış.
 */
const KATALOG_GUNCELLEME = new Date("2026-10-18");
const KURUMSAL_GUNCELLEME = new Date("2026-10-18");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: KATALOG_GUNCELLEME, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/urunler`, lastModified: KATALOG_GUNCELLEME, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/blog`, lastModified: KURUMSAL_GUNCELLEME, changeFrequency: "weekly", priority: 0.8 },

    // kurumsal ve yasal sayfalar
    { url: `${BASE}/hakkimizda`, lastModified: KURUMSAL_GUNCELLEME, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/iletisim`, lastModified: KURUMSAL_GUNCELLEME, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/teslimat-ve-iade`, lastModified: KURUMSAL_GUNCELLEME, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/mesafeli-satis-sozlesmesi`, lastModified: KURUMSAL_GUNCELLEME, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/gizlilik-ve-kvkk`, lastModified: KURUMSAL_GUNCELLEME, changeFrequency: "yearly", priority: 0.3 },

    ...categories.map((c) => ({
      url: `${BASE}/kategori/${categorySlug(c)}`,
      lastModified: KATALOG_GUNCELLEME, changeFrequency: "weekly" as const, priority: 0.9,
    })),
    ...allProducts.map((p) => ({
      url: `${BASE}/urun/${p.slug}`,
      lastModified: KATALOG_GUNCELLEME, changeFrequency: "monthly" as const, priority: 0.8,
    })),
    ...tumYazilar().map((y) => ({
      url: `${BASE}/blog/${y.slug}`,
      lastModified: new Date(y.guncelleme || y.tarih),
      changeFrequency: "monthly" as const, priority: 0.7,
    })),
  ];
}
