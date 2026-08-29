/**
 * KARGO / DESİ HESABI
 * ────────────────────────────────────────────────────────────────
 * Doğru yaklaşım: ürün başına desi TOPLANMAZ. Sipariş koliye
 * yerleştirilir, kolinin hacmi ile toplam ağırlık karşılaştırılır,
 * hangisi büyükse ücrete o esas alınır.
 *
 * Ürünler paketleme davranışına göre sınıflanır:
 *   KONIK   koni/duba — iç içe geçer, ek adet yüksekliği az artırır
 *   BORU    delinatör/dikme — iç içe GİRMEZ, yan yana yatar
 *   YASSI   levha/kasis/stoper — düz istiflenir, kalınlık toplanır
 *   HALKA   ağırlık tabanı/kelepçe — üst üste tam oturur
 *   HACIMLI bariyer/ayna/lamba — hacim tam toplanır
 *   KUCUK   vida/dübel/buton — kutuda toplanır
 */

export type Geo = "KONIK" | "BORU" | "YASSI" | "HALKA" | "HACIMLI" | "KUCUK";

export type SepetSatiri = {
  olcu3: number[];      // [uzun, orta, kısa] cm
  geo: Geo;
  agirlik_kg: number;
  adet: number;
  agirlikli?: boolean;  // ağırlık tabanlı koni — iç içe geçmez
};

/** iç içe geçen ürünlerde her ek adedin eklediği yükseklik oranı */
const ISTIF: Record<Geo, number> = {
  KONIK: 0.22,   // koniler teleskopik — %22
  HALKA: 0.30,   // halkalar üst üste
  YASSI: 1.00,   // kalınlık tam eklenir (zaten ince)
  BORU: 1.00,    // yan yana — hacim tam eklenir ama demetlenir
  HACIMLI: 1.00,
  KUCUK: 1.00,
};

/** demetleme/paketleme verimi — boşlukları hesaba katar */
const VERIM: Record<Geo, number> = {
  KONIK: 1.00,
  BORU: 0.78,    // silindirler yan yana dizilince arada boşluk kalır ama az
  YASSI: 0.95,
  HALKA: 0.95,
  HACIMLI: 0.90,
  KUCUK: 0.55,   // küçük parçalar kutuya sıkışır
};

const BOLEN = 5000;          // Yurtiçi Kargo kendi formülü: hacim(dm³)/5 = (ExBxY)/5000
const KOLI_PAYI = 1.12;      // koli duvarı + dolgu

/** bir satırın kapladığı hacim (cm³) */
export function satirHacim({ olcu3, geo, adet, agirlikli }: SepetSatiri) {
  const [a, b, c] = olcu3.length >= 3 ? olcu3 : [25, 20, 12];
  const n = Math.max(1, adet);
  // ağırlık tabanlı koniler iç içe geçmez — gerçek gönderi verisiyle kalibre edildi
  const k = agirlikli && geo === "KONIK" ? 0.70 : (ISTIF[geo] ?? 1);

  if (geo === "KONIK" || geo === "HALKA") {
    // üst üste geçer: taban aynı kalır, yükseklik az artar
    const yukseklik = a * (1 + k * (n - 1));
    return b * c * yukseklik;
  }
  if (geo === "YASSI") {
    // düz istif: en/boy sabit, kalınlık toplanır
    return a * b * (c * n);
  }
  if (geo === "BORU") {
    // yan yana demet: uzunluk sabit, kesit alanı adet kadar artar
    const kesit = b * c * n;
    return (a * kesit) / VERIM.BORU;
  }
  // hacimli / küçük
  return ((a * b * c) * n) / VERIM[geo];
}

/** sepetin faturalanacak desisi */
export function toplamDesi(satirlar: SepetSatiri[]) {
  if (!satirlar.length) return 0;
  const hacim = satirlar.reduce((s, r) => s + satirHacim(r), 0) * KOLI_PAYI;
  const kg = satirlar.reduce((s, r) => s + (r.agirlik_kg || 0) * Math.max(1, r.adet), 0);
  const hacimsel = hacim / BOLEN;
  const desi = Math.max(hacimsel, kg);
  if (desi <= 0) return 0;
  return Math.max(1, Math.ceil(desi));
}

/* ---------------- TARİFE ---------------- */
export const TABAN_UCRET = 250;   // 1–3 desi
export const TABAN_DESI = 3;
export const KADEMELER: { ustSinir: number; birim: number }[] = [
  { ustSinir: 10, birim: 55 },
  { ustSinir: 25, birim: 35 },
  { ustSinir: 60, birim: 24 },
  { ustSinir: Infinity, birim: 16 },
];

/** kargoya sığmayan ürün: en uzun kenar > 150 cm ya da tek adet desisi > 80 */
export const BUYUK_KENAR = 150;
export const BUYUK_DESI = 80;
export function buyukHacimli(o: { olcu3: number[]; geo: Geo; agirlik_kg: number }) {
  const en = Math.max(...(o.olcu3 || [0]));
  return en > BUYUK_KENAR || urunDesi(o) > BUYUK_DESI;
}

export function kargoUcreti(desi: number) {
  if (desi <= 0) return 0;
  if (desi <= TABAN_DESI) return TABAN_UCRET;
  let u = TABAN_UCRET, alt = TABAN_DESI;
  for (const { ustSinir, birim } of KADEMELER) {
    if (desi <= alt) break;
    u += (Math.min(desi, ustSinir) - alt) * birim;
    alt = Math.min(desi, ustSinir);
  }
  return Math.round(u);
}

export function kargoHesapla(satirlar: SepetSatiri[]) {
  const desi = toplamDesi(satirlar);
  return { desi, ucret: kargoUcreti(desi) };
}

/** tek ürünün 1 adetlik desisi — ürün kartında göstermek için */
export function urunDesi(o: { olcu3: number[]; geo: Geo; agirlik_kg: number }) {
  return toplamDesi([{ ...o, adet: 1 }]);
}

export const formatTL = (n: number) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 2 }).format(n);
