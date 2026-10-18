/**
 * Küçük görsel kopyalarının yolu.
 *
 * public/images altındaki kaynak görseller 1600 piksel ve ortalama 50 KB.
 * Kartlar, sepet satırları ve galeri küçük resimleri ekranda 52–232 piksel
 * arasında; oraya 1600 piksellik dosya indirmek boşa bant genişliği.
 * public/kart altındaki kopyalar ortalama 4 KB.
 *
 * Kopyalar scripts/kart-gorselleri.mjs ile üretilir ve HER kaynak görselin
 * karşılığı vardır — bu yüzden "dosya var mı" kontrolü gerekmez.
 * Yeni görsel eklendiğinde script yeniden çalıştırılmalı.
 */
export const kartGorseli = (yol: string | undefined | null): string =>
  (yol || "").replace(/^\/images\//, "/kart/").replace(/\.(jpe?g|png)$/i, ".webp");
