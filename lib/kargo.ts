/**
 * Kargo / desi hesabı — Yurtiçi Kargo perakende tarifesi
 *
 * Yurtiçi formülü: hacim(dm³) = (En×Boy×Yük)/1000 ; desi = hacim/5
 * yani efektif (En×Boy×Yük)/5000. Ağırlık ile kıyaslanır, büyüğü alınır.
 *
 * Tarife (onaylandı):
 *   1–3 desi  : 250 TL sabit
 *   4 desi ve üstü : 250 + (desi − 3) × 80 TL
 *
 * İstif katsayısı: aynı üründen 2. ve sonraki adetler tam desi eklemez.
 * Katsayılar Hepsiburada gerçek gönderi verisinden çıkarıldı.
 */

export const TABAN_UCRET = 250;      // 1–3 desi sabit
export const TABAN_DESI = 3;
export const DESI_BASI = 80;         // 4–10 desi arası birim

/** kademeli birim fiyat — gerçek tarifeler gibi desi arttıkça birim düşer */
export const KADEMELER: { ustSinir: number; birim: number }[] = [
  { ustSinir: 10, birim: 80 },   //  4–10 desi
  { ustSinir: 30, birim: 55 },   // 11–30 desi
  { ustSinir: 60, birim: 40 },   // 31–60 desi
  { ustSinir: Infinity, birim: 30 }, // 60+
];

/** kategori → ek adet katsayısı (ilk adedin yüzdesi) */
const ISTIF: Record<string, number> = {
  "Elektrikçi Eldiveni": 0.05,
  "Araç Stoperi": 0.15,
  "Katlanabilir Levha": 0.25,
  "Uyarı Levhası": 0.25,
  "Üçgen Levha": 0.25,
  "Kare Levha": 0.25,
  "Dikdörtgen Levha": 0.25,
  "Yuvarlak Levha": 0.25,
  "Ekstra Yuvarlak Levha": 0.25,
  "Panel Levhası": 0.25,
  "El Uyarı Levhası": 0.25,
  "Zemin İşaretleme": 0.30,
  "Hız Kesici Kasis": 0.35,
  "Trafik Konisi": 0.40,
  "Duba & Kaldırım Sınırlama": 0.40,
  "Refüj Başı Dubası": 0.45,
  "Delinatör": 0.50,
  "Şerit Ayırıcı": 0.55,
  "Uyarı Dikmesi": 0.55,
  "Güvenlik Bariyeri": 0.60,
  "Kolon Köşe Koruyucu": 0.30,
  "Ağırlık Tabanı": 0.60,
  "Güvenlik Aynası": 0.50,
  "Solar & Flaşör Lamba": 0.20,
  "Yol Butonu": 0.10,
  "Zincir": 0.60,
  "Vida": 0.10,
  "Dübel": 0.10,
  "Zincir Kancası": 0.10,
  "Dikme Kelepçesi": 0.15,
  "Koni Kulpu": 0.15,
  "Bağlantı Aparatı": 0.10,
  "Kablo Koruyucu": 0.30,
};
const ISTIF_VARSAYILAN = 0.50;

export function istifKatsayisi(kategori: string) {
  return ISTIF[kategori] ?? ISTIF_VARSAYILAN;
}

export type KargoSatiri = { desi: number; adet: number; kategori: string };

/** bir satırın toplam desisi: ilk adet tam, sonrakiler katsayılı */
export function satirDesi({ desi, adet, kategori }: KargoSatiri) {
  if (adet <= 0) return 0;
  const k = istifKatsayisi(kategori);
  return desi + desi * k * (adet - 1);
}

/** sepetin toplam desisi (yukarı yuvarlanır, en az 1) */
export function toplamDesi(satirlar: KargoSatiri[]) {
  const t = satirlar.reduce((s, r) => s + satirDesi(r), 0);
  if (t <= 0) return 0;              // desi 0 olan ürünler (test) kargo doğurmaz
  return Math.max(1, Math.ceil(t));
}

/** desiden kargo ücreti */
export function kargoUcreti(desi: number) {
  if (desi <= 0) return 0;           // kargosuz sepet
  if (desi <= TABAN_DESI) return TABAN_UCRET;
  let ucret = TABAN_UCRET;
  let alt = TABAN_DESI;
  for (const { ustSinir, birim } of KADEMELER) {
    if (desi <= alt) break;
    const dilim = Math.min(desi, ustSinir) - alt;
    ucret += dilim * birim;
    alt = Math.min(desi, ustSinir);
  }
  return Math.round(ucret);
}

/** sepetten doğrudan ücret + desi */
export function kargoHesapla(satirlar: KargoSatiri[]) {
  const desi = toplamDesi(satirlar);
  return { desi, ucret: kargoUcreti(desi) };
}

export const formatTL = (n: number) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 2 }).format(n);
