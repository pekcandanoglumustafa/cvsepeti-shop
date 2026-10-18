/**
 * Kart boyutunda görsel kopyaları üretir: public/images -> public/kart
 *
 * Neden: ürün kartları ekranda 141–232 piksel genişliğinde ama kaynak
 * görseller 1600 piksel. Tarayıcı 88 KB'lık dosyayı indirip 141 piksele
 * sıkıştırıyordu. Katalog sayfasında bu 94 görsel demek.
 *
 * Next'in kendi görsel optimizasyonu yerine önceden üretim tercih edildi:
 * Vercel Hobby planında dönüşüm kotası var, burada yok — ve statik dosya
 * optimizasyon sunucusundan daha hızlı gelir.
 *
 * Yeni görsel eklendiğinde: node scripts/kart-gorselleri.mjs
 */
import sharp from '/home/claude/cvsepeti-shop/node_modules/sharp/lib/index.js';
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const KOK = 'public/images';
const HEDEF = 'public/kart';
const GENISLIK = 420;   // kart en fazla ~232 px; 2x ekranlar için 420
const KALITE = 78;

async function* dosyalar(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* dosyalar(p);
    else if (/\.(webp|jpe?g|png)$/i.test(e.name)) yield p;
  }
}

let n = 0, kucultulen = 0, kaynak = 0, hedef = 0;
for await (const src of dosyalar(KOK)) {
  const rel = path.relative(KOK, src);
  const out = path.join(HEDEF, rel.replace(/\.(jpe?g|png|webp)$/i, '.webp'));
  await mkdir(path.dirname(out), { recursive: true });

  const meta = await sharp(src).metadata();
  const buyuk = (meta.width || 0) > GENISLIK;
  // Hepsi üretilir — kod tarafında "var mı yok mu" kontrolü gerekmesin diye.
  await sharp(src)
    .resize(buyuk ? GENISLIK : null, buyuk ? GENISLIK : null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: KALITE, effort: 6 })
    .toFile(out);

  kaynak += (await stat(src)).size;
  hedef  += (await stat(out)).size;
  n++; if (buyuk) kucultulen++;
}
console.log(`${n} görsel işlendi (${kucultulen} tanesi küçültüldü, gerisi yalnızca webp'ye çevrildi)`);
console.log(`kaynak ${(kaynak/1048576).toFixed(1)} MB  ->  kart ${(hedef/1048576).toFixed(1)} MB`);
console.log(`ortalama ${(kaynak/n/1024).toFixed(0)} KB -> ${(hedef/n/1024).toFixed(0)} KB`);
