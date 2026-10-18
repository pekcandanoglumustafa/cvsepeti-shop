import { SITE_NAME } from "@/lib/site";

/**
 * Arama sonucu başlığı ve açıklaması için uzunluk yönetimi.
 *
 * Sorun: başlıklar ürün adının içinde zaten geçen bilgiyi tekrar ekliyordu —
 * "45 cm Delinatörlü PVC Şerit Ayırıcı Eko – 16045ECO — 45 cm · PVC | Trafik Ürünleri"
 * 82 karakter; Google ~60 karakterde kesiyor, dolayısıyla marka adı ve ayırt edici
 * bilgi hiç görünmüyordu. 517 ürün başlığının 417'si bu durumdaydı.
 */

export const BASLIK_SINIRI = 60;
export const ACIKLAMA_SINIRI = 155;

const MARKA_EKI = ` | ${SITE_NAME}`;

/**
 * Türkçe küçültme: "SİYAH".toLowerCase() → "si̇yah" (araya U+0307 birleşik nokta
 * giriyor) ve karşılaştırma tutmuyor. Birleşik noktayı ayıklıyoruz.
 */
const sade = (s: string) => s.toLocaleLowerCase("tr").replace(/̇/g, "").trim();

/** Kelime ortasından kesmez; sınırın altındaki son boşluktan keser. */
export function kirp(metin: string, sinir: number): string {
  const m = metin.trim();
  if (m.length <= sinir) return m;
  const kesik = m.slice(0, sinir);
  const bosluk = kesik.lastIndexOf(" ");
  // sondaki boşta kalan ayraçları temizle ("... 50cm / – kod" gibi görünmesin)
  return (bosluk > sinir * 0.6 ? kesik.slice(0, bosluk) : kesik).replace(/[\s·/,:;·–—-]+$/, "");
}

/**
 * Ürün başlığı: ad + ürün kodu + adda GEÇMEYEN özellikler + sığarsa marka.
 * Sonuç layout'taki "%s | marka" şablonunu atlatmak için absolute olarak verilir.
 *
 * Ürün kodu her zaman başlıkta kalır. İki sebeple: kodlar doğrudan aranıyor
 * (Search Console'da "zt777" tek başına 1.114 gösterim almış) ve bazı ürünlerin
 * adı birebir aynı — kod kesilince başlıklar birbirinin kopyası oluyor.
 */
export function urunBasligi(ad: string, kod: string | undefined, ozellikler: (string | undefined)[]): string {
  const temiz = ad.trim();
  const k = (kod || "").trim();

  // Ürün adı çoğu üründe "... – 11862 FL S" biçiminde kodla bitiyor. Kodu önce
  // addan ayırıyoruz ki kırpma onu kesmesin; sonra sonuna geri ekliyoruz.
  // Ayırmadan kırpınca aynı seriden iki ürünün başlığı birebir aynı oluyordu.
  const kacir = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  let govde = k ? temiz.replace(new RegExp(`\\s*[–—-]\\s*${kacir}\\s*$`, "i"), "").trim() : temiz;

  // kod adın başka bir yerinde geçiyorsa tekrar ekleme
  const kodEki = k && !sade(govde).includes(sade(k)) ? ` – ${k}` : "";
  if (govde.length + kodEki.length > BASLIK_SINIRI) {
    govde = kirp(govde, BASLIK_SINIRI - kodEki.length);
  }

  let baslik = govde + kodEki;
  const icerik = sade(baslik);

  for (const o of ozellikler) {
    if (!o) continue;
    const s = sade(o);
    if (!s || icerik.includes(s)) continue;          // başlıkta zaten varsa ekleme
    const aday = `${baslik} · ${o.trim()}`;
    if (aday.length > BASLIK_SINIRI) break;          // sığmıyorsa dur
    baslik = aday;
  }

  return baslik.length + MARKA_EKI.length <= BASLIK_SINIRI
    ? baslik + MARKA_EKI
    : kirp(baslik, BASLIK_SINIRI);
}

/** Kategori/sayfa başlığı: markayı ancak sığarsa ekler. */
export function sayfaBasligi(baslik: string): string {
  const b = baslik.trim();
  return b.length + MARKA_EKI.length <= BASLIK_SINIRI ? b + MARKA_EKI : kirp(b, BASLIK_SINIRI);
}

/** Meta açıklama: parçaları sırayla ekler, sınırı aşanı atar. */
export function aciklama(...parcalar: (string | undefined | false)[]): string {
  let out = "";
  for (const p of parcalar) {
    if (!p) continue;
    const s = String(p).trim().replace(/\s+/g, " ");
    if (!s) continue;
    const aday = out ? `${out} ${s}` : s;
    if (aday.length > ACIKLAMA_SINIRI) break;
    out = aday;
  }
  return out;
}
