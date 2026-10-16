import { NextRequest, NextResponse } from "next/server";
import products from "@/data/products.json";
import { categorySlug } from "@/lib/products";

// Yeni sitenin bilinen yolları — bunlara dokunma (segment bazlı: "/urun" ≠ "/urun-kategori")
const KNOWN_PREFIXES = [
  "/urunler", "/sepet", "/odeme", "/odeme-sonuc", "/ara", "/blog",
  "/api", "/_next", "/images", "/marka",
];
const KNOWN_FILES = [
  "/favicon.ico", "/icon.svg", "/apple-icon.svg", "/sitemap.xml", "/robots.txt",
  "/llms.txt", "/urun-akisi.xml",
];

function isKnown(path: string) {
  return KNOWN_FILES.includes(path) || KNOWN_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
}

type P = { slug: string; category: string };
const slugs: P[] = (products as P[]).map((p) => ({ slug: p.slug, category: p.category }));
const productSlugs = new Set(slugs.map((p) => p.slug));
const categorySlugs = new Set(slugs.map((p) => categorySlug(p.category)));

// Eski blog/kategori sayfaları için anahtar kelime → yönlendirme hedefi (sıra önemli: özelden genele)
const KEYWORD_TARGET: [string, string][] = [
  ["delinator", "Delinatör"],
  ["koni", "Trafik Konisi"],
  ["duba", "Duba & Kaldırım Sınırlama"],
  ["kasis", "Hız Kesici Kasis"],
  ["stoper", "Araç Stoperi"],
  ["bariyer", "Güvenlik Bariyeri"],
  ["ayna", "Güvenlik Aynası"],
  ["flasor", "Solar & Flaşör Lamba"],
  ["buton", "Yol Butonu"],
  ["serit", "Şerit Ayırıcı"],
  ["kolon", "Kolon Köşe Koruyucu"],
  ["isaretleme", "Zemin İşaretleme"],
  ["zincir", "Zincir"],
  ["dikme", "Dikme + Panel Sistemi"],
  ["levha", "Uyarı Levhası"],
].map(([kw, cat]) => [kw, `/kategori/${categorySlug(cat)}`] as [string, string])
  // artık satılmayan ürün grupları → katalog
  .concat([["membran", "/urunler"], ["yalitim", "/urunler"], ["eldiven", "/urunler"]]);

// Eski e-ticaret altyapılarının sabit sayfaları
const LEGACY_EXACT: Record<string, string> = {
  shop: "/urunler", magaza: "/urunler", "tum-urunler": "/urunler", products: "/urunler", urun: "/urunler", kategori: "/urunler",
  cart: "/sepet", sepetim: "/sepet", checkout: "/odeme", search: "/ara", arama: "/ara",
  index: "/", anasayfa: "/", home: "/",
};

function tokens(s: string): Set<string> {
  // Türkçe karakterleri sadeleştir (slug'lar ASCII); sayılar (ölçü/kod) kısa da olsa önemli
  return new Set(categorySlug(s).split("-").filter((w) => w.length > 2 || /^\d+$/.test(w)));
}

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  // kendine yönlendirme döngüsüne düşme
  const redirect = (to: string) =>
    to === path ? NextResponse.next() : NextResponse.redirect(new URL(to, req.url), 301);

  if (path === "/" || isKnown(path)) return NextResponse.next();

  let decoded: string;
  try {
    decoded = decodeURIComponent(path);
  } catch {
    return NextResponse.next();
  }
  const segs = decoded.split("/").filter(Boolean);
  if (segs.length === 0) return NextResponse.next();

  // Yeni sitede var olan ürün/kategori sayfaları
  if (segs.length === 2 && segs[0] === "urun" && productSlugs.has(segs[1])) return NextResponse.next();
  if (segs.length === 2 && segs[0] === "kategori" && categorySlugs.has(segs[1])) return NextResponse.next();

  // Eski URL: son segmenti kullan (/urun-kategori/x, /product/x, /x.html, /urun/eski-slug ...)
  const raw = segs[segs.length - 1].replace(/\.(html?|php|aspx?)$/i, "");
  // Eski kategori yolları ürün eşleşmesine düşmesin, doğrudan kategoriye gitsin
  const isCategoryPath = segs.length > 1 && /^(kategori|urun-kategori|product-category|category|kategoriler)$/i.test(segs[0]);

  const legacy = segs.length === 1 ? LEGACY_EXACT[raw.toLowerCase()] : undefined;
  if (legacy) return redirect(legacy);

  const t = tokens(raw);
  if (t.size === 0) return NextResponse.next();

  // Kategori adıyla birebir aynı eski sayfa → kategori
  const rawSlug = categorySlug(raw);
  if (categorySlugs.has(rawSlug)) return redirect(`/kategori/${rawSlug}`);

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
  if (!isCategoryPath && best && bestScore >= 0.45) {
    return redirect(`/urun/${best.slug}`);
  }

  // 2) Kategori slug'ı ile bulanık eşleşme (eski kategori adları genelde benzer)
  let bestCat = "";
  let bestCatScore = 0;
  for (const c of categorySlugs) {
    const ct = tokens(c);
    let inter = 0;
    for (const w of t) if (ct.has(w)) inter++;
    const score = inter / Math.max(t.size, ct.size);
    if (score > bestCatScore) {
      bestCatScore = score;
      bestCat = c;
    }
  }
  if (bestCat && bestCatScore >= 0.5) {
    return redirect(`/kategori/${bestCat}`);
  }

  // 3) Anahtar kelimeden kategoriye
  const joined = [...t].join(" ");
  for (const [kw, target] of KEYWORD_TARGET) {
    if (joined.includes(kw)) return redirect(target);
  }

  // 4) Eski kurumsal/blog sayfaları → ana sayfa
  const HOME_HINTS = ["hakkimizda", "iletisim", "blog", "referans", "aldis", "hava", "web", "site", "hizmet", "kamu", "ihale"];
  if (HOME_HINTS.some((h) => joined.includes(h))) {
    return redirect("/");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
