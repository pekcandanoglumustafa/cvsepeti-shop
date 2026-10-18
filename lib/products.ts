import products from "@/data/products.json";
import type { Geo } from "@/lib/kargo";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  price_kdv: number;
  kdv_orani: number;
  originalPrice?: number; // liste fiyatı (varsa indirim rozeti gösterilir)
  description: string;
  stock: number;
  images: string[];
  desi: number;
  color: string;
  size: string;
  dims: string;
  kod: string;
  boyut: string;
  malzeme: string;
  taban: string;
  reflektif: string;
  seri: string;
  varyant: string;
  agirlik_kg: number;
  f_boy: string;
  f_malzeme: string;
  f_reflektif: string;
  f_taban: string;
  f_seri: string;
  olcu3: number[];
  /** Paketleme sınıfı — kargo desisi bundan hesaplanıyor (lib/kargo.ts). */
  geo: Geo;
  agirlikli?: boolean;
  koli_olcu?: number[];
  koli_adet?: number;
  renk?: string;
  montaj?: string;
  montaj_dahil?: boolean;
  taban_olcu?: string;
  reflektif_detay?: string;
};

/** Ham JSON — yalnızca bu dosyanın içinde kullanılır. */
type HamUrun = Product & { tedarikci?: string };

/**
 * `tedarikci` alanı hiçbir ekranda gösterilmiyor ama Product nesnesi olduğu gibi
 * tarayıcıya iniyordu: /urunler sayfasının kaynağında tedarikçi adı 517 kez geçiyordu.
 * Hangi üründe kiminle çalıştığımız rakibe açık bilgi olmamalı — alanı burada,
 * veri katmanında kesiyoruz ki hiçbir sayfadan dışarı sızmasın.
 */
const tumUrunler: Product[] = (products as unknown as HamUrun[]).map((p) => {
  const { tedarikci: _gizli, ...acik } = p;
  return acik as Product;
});

/**
 * Müşteriye görünen katalog.
 *
 * TEST-1 ("TEST ÜRÜNÜ – Satın Almayın") burada ayıklanıyor. Önceden yalnızca
 * ana sayfada filtreleniyordu; katalogda ilk sırada, kategori sayfalarında ve
 * aramada görünüyor, sayfası fiyatı ve "Sepete ekle" düğmesiyle satışa açık
 * duruyordu. Müşterinin sipariş verebileceği bir test kaydıydı.
 *
 * Sayfası doğrudan adresle hâlâ açılıyor (getProduct tüm listeye bakıyor) ki
 * ödeme testi yapılabilsin — ama hiçbir listede, sitemap'te ya da aramada yok.
 */
export const TEST_URUN_ID = "TEST-1";
export const allProducts: Product[] = tumUrunler.filter(
  (p) => p.id !== TEST_URUN_ID,
);

/**
 * Liste ve filtre bileşenlerine giden hafif ürün.
 * Tam Product nesnesi 518 ürün için ~455 KB; kartın ve filtrelerin ihtiyacı olan
 * alanlar ~156 KB. description, geo, olcu3, dims gibi alanların katalog sayfasında
 * tarayıcıya inmesi gereksiz.
 */
/**
 * Kargo alanları (olcu3, geo, agirlik_kg, koli bilgisi) de taşınıyor: ürün
 * kartındaki "Sepete ekle" düğmesi ürün sayfasına uğramadan sepete yazıyor
 * ve sepetin desi hesabı bu alanlara dayanıyor. Onlarsız kargo bedeli sıfır
 * çıkar. Hepsi küçük sayısal alanlar; asıl yükü yapan description, geo
 * açıklaması ve dims gibi alanlar hâlâ dışarıda.
 */
export type KartUrun = Pick<
  Product,
  | "id"
  | "slug"
  | "name"
  | "kod"
  | "category"
  | "boyut"
  | "stock"
  | "price"
  | "price_kdv"
  | "images"
  | "montaj_dahil"
  | "malzeme"
  | "reflektif"
  | "f_boy"
  | "f_malzeme"
  | "f_reflektif"
  | "f_taban"
  | "f_seri"
  | "olcu3"
  | "geo"
  | "agirlik_kg"
> & {
  agirlikli?: boolean;
  koli_olcu?: number[];
  koli_adet?: number;
};

export const kartUrun = (p: Product): KartUrun => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  kod: p.kod,
  category: p.category,
  boyut: p.boyut,
  montaj_dahil: p.montaj_dahil,
  malzeme: p.malzeme, reflektif: p.reflektif,
  stock: p.stock,
  price: p.price,
  price_kdv: p.price_kdv,
  images: p.images,
  f_boy: p.f_boy,
  f_malzeme: p.f_malzeme,
  f_reflektif: p.f_reflektif,
  f_taban: p.f_taban,
  f_seri: p.f_seri,
  olcu3: p.olcu3,
  geo: p.geo,
  agirlik_kg: p.agirlik_kg,
  agirlikli: p.agirlikli,
  koli_olcu: p.koli_olcu,
  koli_adet: p.koli_adet,
});

export const kartUrunler = (liste: Product[]): KartUrun[] =>
  liste.map(kartUrun);

/**
 * Müşterinin isteğine göre üretilen ürünler (özel baskı, dekota baskı).
 *
 * Mesafeli Sözleşmeler Yönetmeliği m.15 uyarınca bunlarda cayma hakkı
 * kullanılamaz. Ürün sayfası her üründe "14 gün cayma hakkı" rozeti
 * gösteriyordu — Teslimat ve İade sayfasının istisna olarak yazdığı
 * ürünlerde bile. Çelişkiyi kapatmak için bu ayrım gerekiyor.
 *
 * "Kaygan Zemin Baskılı" gibi hazır desenli ürünler bu kapsamda DEĞİL:
 * onlar stoktan satılıyor ve cayma hakkı normal işliyor.
 */
const OZEL_URETIM = /özel bask|ozel bask|kişiye özel|dekota bask|decota bask/i;
export const kisiyeOzel = (p: { name: string }) => OZEL_URETIM.test(p.name);

/**
 * Ölçüsü bilinmeyen ürünler.
 *
 * Bu ürünlerde olcu3 alanı kargo hesabı yapılabilsin diye varsayılan
 * [25, 20, 12] değerini taşıyor — gerçek ölçü değil, tahmin.
 * 517 üründen 91'i bu durumda ve hepsinin "boyut" alanı boş.
 *
 * Sorun: teknik çizim bu sayıdan üretiliyordu, yani ölçüsü bilinmeyen
 * ürünlerde "25 × 20 cm" yazan uydurma bir şema çiziliyordu. Şartnameyle
 * karşılaştırma yapan kurumsal müşteriyi yanlış yönlendirir. Çizim artık
 * bu ürünlerde gösterilmiyor.
 *
 * Kargo hesabı tahmini kullanmaya devam ediyor — bir rakam gerekiyor ve
 * eldeki en iyi tahmin bu.
 */
const OLCU_VARSAYILAN = [25, 20, 12];
export const olcuBilinmiyor = (p: { olcu3?: number[] }) => {
  const o = p.olcu3;
  return !o || o.length < 3 || OLCU_VARSAYILAN.every((v, i) => o[i] === v);
};

export const categories = Array.from(
  new Set(allProducts.map((p) => p.category)),
).sort();

export const categorySlug = (cat: string) =>
  cat
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/&/g, "ve")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const categoryBySlug = (slug: string) =>
  categories.find((c) => categorySlug(c) === slug);

/** Test ürünü dahil — sayfası doğrudan adresle açılabilsin diye tüm listeye bakar. */
export const getProduct = (slug: string) =>
  tumUrunler.find((p) => p.slug === slug);

export const productsByCategory = (cat: string) =>
  allProducts.filter((p) => p.category === cat);

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  }).format(price);

// Strip leading product-name repetition from Trendyol-style descriptions
export const cleanDescription = (name: string, desc: string) => {
  if (!desc) return "";
  let d = desc.trim();
  if (d.toLowerCase().startsWith(name.toLowerCase())) {
    d = d.slice(name.length).trim();
  }
  return d.replace(/^[-–—:\s]+/, "");
};

/** KDV hariç büyük, KDV dahil küçük gösterim için */
export const KDV_ORANI = 0.2;
export const kdvDahil = (haricFiyat: number) => haricFiyat * (1 + KDV_ORANI);
