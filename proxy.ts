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

// Ürün kodları slug biçiminde: "ZT358" → "zt358", "12251 UB R" → "12251-ub-r", "PL 8010" → "pl-8010"
const kodlar = urunler
  .map((p) => {
    const kod = categorySlug(p.kod);
    const bas = kod.split("-")[0];
    // "pl" gibi rakamsız baş kısım kod sayılmaz; saf sayılar ölçüyle karışmasın diye en az 4 hane
    const basKod = /[a-z]/.test(bas) ? /\d{3,}/.test(bas) : /^\d{4,}$/.test(bas);
    return { slug: p.slug, kod, bitisik: kod.replace(/-/g, ""), bas: basKod ? bas : "" };
  })
  .filter((k) => k.kod);

function kodEslesmesi(eskiSlug: string): string | null {
  const s = `-${eskiSlug}-`;
  // 1) Kodun tamamı geçiyorsa en uzun (en spesifik) kod kazanır: "zt75110-dar" > "zt75110-da"
  let best: { slug: string; uzunluk: number } | null = null;
  for (const k of kodlar) {
    if (s.includes(`-${k.kod}-`) || s.includes(`-${k.bitisik}-`)) {
      if (!best || k.kod.length > best.uzunluk) best = { slug: k.slug, uzunluk: k.kod.length };
    }
  }
  if (best) return best.slug;
  // 2) Sadece baş kısım geçiyorsa ("12251" var, "ub-r" yok) aynı kod ailesinin ilk ürünü
  const parcalar = new Set(eskiSlug.split("-"));
  return kodlar.find((k) => k.bas && parcalar.has(k.bas))?.slug ?? null;
}

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

// Eski kurumsal/yasal sayfalar → yeni karşılıkları (sıra önemli: özelden genele)
const KURUMSAL_HINTS: [string, string][] = [
  ["mesafeli", "/mesafeli-satis-sozlesmesi"],
  ["sozlesme", "/mesafeli-satis-sozlesmesi"],
  ["kvkk", "/gizlilik-ve-kvkk"],
  ["gizlilik", "/gizlilik-ve-kvkk"],
  ["aydinlatma", "/gizlilik-ve-kvkk"],
  ["cerez", "/gizlilik-ve-kvkk"],
  ["iade", "/teslimat-ve-iade"],
  ["teslimat", "/teslimat-ve-iade"],
  ["kargo", "/teslimat-ve-iade"],
  ["cayma", "/teslimat-ve-iade"],
  ["iletisim", "/iletisim"],
  // joined boşlukla birleştirildiği için anahtarlar tek kelime olmalı ("bize-ulasin" tutmaz)
  ["ulasin", "/iletisim"],
  ["hakkimizda", "/hakkimizda"],
  ["kurumsal", "/hakkimizda"],
  ["referans", "/hakkimizda"],
];

function tokens(s: string): Set<string> {
  // Türkçe karakterleri sadeleştir (slug'lar ASCII); sayılar (ölçü/kod) kısa da olsa önemli
  return new Set(categorySlug(s).split("-").filter((w) => w.length > 2 || /^\d+$/.test(w)));
}

function benzerlik(t: Set<string>, aday: string) {
  const at = tokens(aday);
  let ortak = 0;
  for (const w of t) if (at.has(w)) ortak++;
  return ortak / Math.max(t.size, at.size);
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

  const son = segs[segs.length - 1];
  // public/ altındaki gerçek dosyalar (svg, png, txt...) — sayfa uzantıları hariç
  if (/\.[a-z0-9]{2,5}$/i.test(son) && !/\.(html?|php|aspx?)$/i.test(son)) return NextResponse.next();

  // Eski URL: son segmenti kullan (/eski-slug, /urun-kategori/x, /product/x, /x.html, /urun/eski-slug ...)
  const raw = son.replace(/\.(html?|php|aspx?)$/i, "");
  const kok = segs.length === 1;
  // Eski kategori yolları ürün eşleşmesine düşmesin, doğrudan kategoriye gitsin
  const isCategoryPath = segs.length > 1 && /^(kategori|urun-kategori|product-category|category|kategoriler)$/i.test(segs[0]);
  // Hiçbir kural tutmadıysa 404 döneriz.
  // Her bilinmeyen URL'i /urunler'e yönlendirmek Google tarafından "soft 404" sayılıyor:
  // sayfa gerçekte yok ama 301 + 200 dönüyor. Bu hem tarama bütçesini harcıyor hem de
  // ölü URL'lerin indeksten temizlenmesini engelliyor. 404 sayfası kullanıcıyı zaten
  // aramaya ve kataloğa yönlendiriyor.
  const sonCare = () => NextResponse.next();

  const legacy = kok ? LEGACY_EXACT[raw.toLowerCase()] : undefined;
  if (legacy) return redirect(legacy);

  const eskiSlug = categorySlug(raw);
  const t = tokens(raw);
  if (!eskiSlug || t.size === 0) return sonCare();

  // 1) Ürün kodu (zt358, 12251 ...) → ürün sayfası
  if (!isCategoryPath) {
    const kodlu = kodEslesmesi(eskiSlug);
    if (kodlu) return redirect(`/urun/${kodlu}`);
  }

  // 2) Kategori adıyla birebir aynı eski sayfa → kategori
  if (categorySlugs.has(eskiSlug)) return redirect(`/kategori/${eskiSlug}`);

  // 3) Ürün adı benzerliği (kodsuz eski ürün slug'ları)
  if (!isCategoryPath) {
    let best = "";
    let bestScore = 0;
    for (const p of urunler) {
      const score = benzerlik(t, p.slug);
      if (score > bestScore) [best, bestScore] = [p.slug, score];
    }
    if (best && bestScore >= 0.45) return redirect(`/urun/${best}`);
  }

  // 4) Kategori adı benzerliği
  let bestCat = "";
  let bestCatScore = 0;
  for (const c of categorySlugs) {
    const score = benzerlik(t, c);
    if (score > bestCatScore) [bestCat, bestCatScore] = [c, score];
  }
  if (bestCat && bestCatScore >= 0.5) return redirect(`/kategori/${bestCat}`);

  // 5) Anahtar kelimeden kategoriye
  const joined = [...t].join(" ");
  for (const [kw, target] of KEYWORD_TARGET) {
    if (joined.includes(kw)) return redirect(target);
  }

  // 6) Eski kurumsal/yasal sayfalar → yeni karşılıkları
  for (const [kw, target] of KURUMSAL_HINTS) {
    if (joined.includes(kw)) return redirect(target);
  }

  // 7) Hiçbiri tutmadı
  return sonCare();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
