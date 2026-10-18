/**
 * ARAMA NORMALİZASYONU — katalog filtresi ve /ara aynı mantığı kullanır.
 *
 * Çözdüğü üç sorun:
 *
 * 1) Boşluk. "75cm delinatör" 4 sonuç, "75 cm delinatör" 22 sonuç veriyordu;
 *    ilkinde ZT8075 hiç çıkmıyordu. Artık ayraçsız hâl de karşılaştırılıyor,
 *    "zt 8075", "ZT8075" ve "zt-8075" aynı ürünü buluyor.
 *
 * 2) Türkçe harfler. Kullanıcı "delinator" yazdığında "delinatör" bulunmalı.
 *
 * 3) Türkçe İ tuzağı. "İ".toLowerCase() → "i̇" (i + U+0307 birleşik nokta)
 *    üretir; eski kod önce toLowerCase çağırdığı için İ→i dönüşümü hiç
 *    çalışmıyordu. Burada harf eşlemesi küçültmeden ÖNCE yapılıyor.
 */

const HARF: Record<string, string> = {
  "İ": "i", "I": "i", "ı": "i", "i": "i",
  "Ş": "s", "ş": "s", "Ğ": "g", "ğ": "g",
  "Ü": "u", "ü": "u", "Ö": "o", "ö": "o", "Ç": "c", "ç": "c",
  "Â": "a", "â": "a", "Î": "i", "î": "i", "Û": "u", "û": "u",
};

/** Küçük harfe indirger, Türkçe harfleri ASCII karşılığına katlar. */
export function sadelestir(s: string): string {
  return (s || "")
    .replace(/[İIıiŞşĞğÜüÖöÇçÂâÎîÛû]/g, (c) => HARF[c] ?? c)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Ayraçları tamamen kaldırır: "75 cm" → "75cm", "12251 UB R" → "12251ubr" */
export function sikistir(s: string): string {
  return sadelestir(s).replace(/[^a-z0-9]+/g, "");
}

/** Bir ürünün aranabilir metni — kod ve ölçü dahil. */
export function urunMetni(p: {
  name?: string; kod?: string; category?: string; boyut?: string;
  malzeme?: string; varyant?: string; renk?: string;
}): string {
  return [p.name, p.kod, p.category, p.boyut, p.malzeme, p.varyant, p.renk]
    .filter(Boolean).join(" ");
}

/**
 * Sorgudaki her kelime metinde geçiyor mu?
 * Hem normal hem ayraçsız hâl denenir — biri tutarsa eşleşme sayılır.
 */
export function eslesir(metin: string, sorgu: string): boolean {
  const q = sadelestir(sorgu);
  if (!q) return false;
  const duz = sadelestir(metin);
  const sikis = sikistir(metin);
  return q.split(" ").filter(Boolean).every((t) => duz.includes(t) || sikis.includes(sikistir(t)));
}
