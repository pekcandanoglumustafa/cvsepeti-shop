import { NextRequest, NextResponse } from "next/server";
import products from "@/data/products.json";
import { categorySlug } from "@/lib/products";

// Yeni sitenin bilinen yolları — bunlara dokunma
const KNOWN_PREFIXES = [
  "/urun", "/urunler", "/kategori", "/sepet", "/odeme", "/odeme-sonuc",
  "/ara", "/api", "/_next", "/images", "/favicon", "/sitemap", "/robots",
];

type P = { slug: string; category: string };
const slugs: P[] = (products as P[]).map((p) => ({ slug: p.slug, category: p.category }));

// Eski blog/kategori sayfaları için anahtar kelime → kategori eşleşmesi
const KEYWORD_CATEGORY: [string, string][] = [
  ["membran", "Yalıtım Malzemesi"],
  ["yalitim", "Yalıtım Malzemesi"],
  ["koni", "Trafik Konisi & Duba"],
  ["duba", "Trafik Konisi & Duba"],
  ["levha", "Trafik Uyarı Levhaları"],
  ["delinator", "Delinatör"],
  ["kasis", "Yol İşaretleme & Kasis"],
  ["stoper", "Araç Stoperi"],
  ["bariyer", "Güvenlik Bariyeri & Aynası"],
  ["ayna", "Güvenlik Bariyeri & Aynası"],
  ["eldiven", "Elektrikçi Eldiveni"],
  ["dikme", "Dikme & Panel Sistemleri"],
];

function tokens(s: string): Set<string> {
  return new Set(s.toLowerCase().split(/[^a-z0-9ğüşıöç]+/).filter((w) => w.length > 2));
}

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === "/" || KNOWN_PREFIXES.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }

  const raw = decodeURIComponent(path.replace(/^\/+|\/+$/g, ""));
  if (!raw || raw.includes("/")) return NextResponse.next();

  const t = tokens(raw);
  if (t.size === 0) return NextResponse.next();

  // 1) Ürün slug'ı ile bulanık eşleşme
  let best: P | null = null;
  let bestScore = 0;
  for (const p of slugs) {
    const pt = tokens(p.slug);
    let inter = 0;
    for (const w of t) if (pt.has(w)) inter++;
    const score = inter / Math.max(t.size, pt.size);
    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  }
  if (best && bestScore >= 0.45) {
    return NextResponse.redirect(new URL(`/urun/${best.slug}`, req.url), 301);
  }

  // 2) Anahtar kelimeden kategoriye
  const joined = [...t].join(" ");
  for (const [kw, cat] of KEYWORD_CATEGORY) {
    if (joined.includes(kw)) {
      return NextResponse.redirect(new URL(`/kategori/${categorySlug(cat)}`, req.url), 301);
    }
  }

  // 3) Eski kurumsal/blog sayfaları → ana sayfa
  const HOME_HINTS = ["hakkimizda", "iletisim", "blog", "referans", "aldis", "hava", "web", "site", "hizmet", "kamu", "ihale"];
  if (HOME_HINTS.some((h) => joined.includes(h))) {
    return NextResponse.redirect(new URL("/", req.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
