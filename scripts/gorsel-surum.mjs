/**
 * Görsel yollarına içerik özetinden bir sürüm ekler: /images/x.webp?v=1a2b3c4d
 *
 * Neden: next.config.ts /images ve /kart için "1 yıl, immutable" önbellek
 * veriyor. Bir görsel AYNI ADLA yenilendiğinde (ör. bulanık ürün fotoğrafı
 * düzeltildiğinde) daha önce siteye girmiş tarayıcılar eskisini göstermeye
 * devam ediyordu — Kilitli Park Bariyeri (ZTM01) böyle kaldı.
 * Sürum parametresi dosya içeriğinden üretildiği için görsel değişince
 * adres de değişir, değişmeyen görselin önbelleği bozulmaz.
 *
 * Görsel eklendiğinde/değiştiğinde:
 *   node scripts/kart-gorselleri.mjs && node scripts/gorsel-surum.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const DOSYALAR = [
  "data/products.json",
  "data/hero.json",
  "data/kategori_kapak.json",
  "data/kategori_vitrin.json",
];

const ozet = (yol) => {
  const dosya = "public" + yol;
  if (!existsSync(dosya)) return null;
  return createHash("md5").update(readFileSync(dosya)).digest("hex").slice(0, 8);
};

let degisen = 0, eksik = 0;
const surumle = (deger) => {
  if (typeof deger !== "string" || !deger.startsWith("/images/")) return deger;
  const yalin = deger.split("?")[0];
  const v = ozet(yalin);
  if (!v) { eksik++; console.warn("dosya yok:", yalin); return deger; }
  const yeni = `${yalin}?v=${v}`;
  if (yeni !== deger) degisen++;
  return yeni;
};
const gez = (x) =>
  Array.isArray(x) ? x.map(gez)
  : x && typeof x === "object" ? Object.fromEntries(Object.entries(x).map(([k, v]) => [k, gez(v)]))
  : surumle(x);

for (const f of DOSYALAR) {
  if (!existsSync(f)) continue;
  const ham = readFileSync(f, "utf8");
  const girinti = ham.match(/\n( +)\S/)?.[1] ?? " ";
  writeFileSync(f, JSON.stringify(gez(JSON.parse(ham)), null, girinti.length) + (ham.endsWith("\n") ? "\n" : ""));
}
console.log(`${degisen} görsel adresi güncellendi${eksik ? `, ${eksik} dosya bulunamadı` : ""}`);
