import { NextRequest, NextResponse } from "next/server";
import products from "@/data/products.json";
import { categorySlug } from "@/lib/products";

/**
 * Eski siteden kalan URL'ler için 301 yönlendirme.
 * Eski yapı kök seviyede slug'dı: /zt358-engelli-arac-park-yeridikdortgen-uyari-levhasi
 * Sıra: ürün kodu → ürün adı benzerliği → kategori → /urunler (kökte 404 kalmaz)
 */

// Yeni sitenin bilinen yolları — bunlara dokunma (segment bazlı: "/urun" ≠ "/urun-kategori")
const KNOWN_PREFIXES = [
  "/urunler", "/sepet", "/odeme", "/odeme-sonuc", "/ara", "/blog",
  "/api", "/_next", "/images", "/marka",
  // kurumsal ve yasal sayfalar — bunlar artık gerçekten var, yönlendirilmemeli
  "/iletisim", "/hakkimizda", "/mesafeli-satis-sozlesmesi", "/teslimat-ve-iade", "/gizlilik-ve-kvkk",
];
const KNOWN_FILES = [
  "/favicon.ico", "/icon.svg", "/apple-icon.svg", "/sitemap.xml", "/robots.txt",
  "/llms.txt", "/urun-akisi.xml",
];

function isKnown(path: string) {
  return KNOWN_FILES.includes(path) || KNOWN_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
}

type P = { id: string; slug: string; category: string; kod: string };
const urunler = (products as P[]).filter((p) => p.id !== "TEST-1");
const productSlugs = new Set((products as P[]).map((p) => p.slug));
const categorySlugs = new Set(urunler.map((p) => categorySlug(p.category)));

// Ürün kodları slug biçiminde: "ZT358" → "zt358", "12251 UB R" → "12251-ub-r", "PL 8010" → "pl-80���q�^