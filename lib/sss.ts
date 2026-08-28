import type { Product } from "./products";
import { urunDesi, kargoUcreti, buyukHacimli } from "./kargo";

const tl = (n: number) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);

/**
 * Ürün bazlı sık sorulan sorular.
 * Cevaplar kısa, doğrudan ve alıntılanabilir — AI motorları böyle içeriği tercih ediyor.
 */
export function urunSSS(p: Product): { s: string; c: string }[] {
  const o = { olcu3: p.olcu3 || [25, 20, 12], geo: (p.geo || "HACIMLI") as any, agirlik_kg: p.agirlik_kg || 0 };
  const desi = urunDesi(o);
  const q: { s: string; c: string }[] = [];

  q.push({
    s: `${p.name} fiyatı ne kadar?`,
    c: `${p.name} ürününün fiyatı ${tl(p.price)} + KDV'dir. KDV dahil satış fiyatı ${tl(p.price_kdv)}. Fiyata kargo dahil değildir. Ürün kodu ${p.kod}.`,
  });

  const teknik: string[] = [];
  if (p.boyut) teknik.push(`ölçüsü ${p.boyut}`);
  if (p.malzeme) teknik.push(`malzemesi ${p.malzeme}`);
  if (p.agirlik_kg) teknik.push(`ağırlığı ${p.agirlik_kg} kg`);
  if (p.f_reflektif) teknik.push(`reflektif tipi ${p.f_reflektif}`);
  if (p.f_taban) teknik.push(`tabanı ${p.f_taban}`);
  if (teknik.length) {
    q.push({
      s: `${p.name} teknik özellikleri nelerdir?`,
      c: `${p.kod} kodlu ${p.name} ürününün ${teknik.join(", ")}dır. Ürün ${p.category} kategorisindedir.`,
    });
  }

  q.push({
    s: `${p.name} kargo ücreti ne kadar?`,
    c: buyukHacimli(o)
      ? `Bu ürün büyük hacimli olduğu için standart kargoya sığmaz, nakliyesi sipariş sonrası ayrıca planlanır. Sipariş verdikten sonra teslimat şekli sizinle netleştirilir.`
      : `1 adet ${p.name} ${desi} desi tutar, kargo ücreti ${tl(kargoUcreti(desi))}'dir. Birden fazla adet alındığında ürünler tek koliye istiflendiği için kargo bedeli adet başına orantılı artmaz. Kargoyu ödeme adımında peşin ödeyebilir veya karşı ödemeli gönderebilirsiniz.`,
  });

  q.push({
    s: `${p.name} için fatura kesiliyor mu?`,
    c: `Evet. Bireysel veya kurumsal fatura kesilir. Kurumsal fatura için ödeme adımında firma unvanı, vergi dairesi ve vergi numarası girilir. Fatura e-posta adresinize gönderilir.`,
  });

  q.push({
    s: `${p.name} kaç günde teslim edilir?`,
    c: `Stoktaki ürünler 1-2 iş günü içinde kargoya verilir, Yurtiçi Kargo ile Türkiye geneline 1-3 iş gününde teslim edilir. Sevkiyat Konya'dan yapılır.`,
  });

  return q;
}
