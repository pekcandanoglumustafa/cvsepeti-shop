# Çeviri devri — 2026-11-08

## Mimari
- Türkçe asıl dil; sayfalar Türkçe çiziliyor. Diller: en, ar, ru, de, fr, es, zh, az (`lib/diller.ts`).
- Adres: `/en/urun/x` → `proxy.ts` öneki atıp `/urun/x` sayfasını gösterir, `lang` çerezini yazar.
- `components/Ceviri.tsx` tarayıcıda metin düğümlerini `public/i18n/<dil>.json` + `<dil>-urun.json` sözlüğünden değiştirir; blog gövdesini `public/i18n/blog/<dil>/<slug>.html` ile değiştirir. Eksik metinler `window.__ceviriEksik` içinde.
- Sözlük anahtarı Türkçe metin; sayılar `{0}`, `{1}`… ve iç içe çevrilen parçalar `{s0}`, `{s1}`… şablonudur. Çeviri **anahtardaki tüm yer tutucuları içermeli**.

## Dosyalar
- `i18n/kaynak/` — Türkçe kaynak: `arayuz.json` (1.746 şablon; değer = örnek dolu metin), `urun.json` (322), `blog/*.md` (22).
- `i18n/ceviri/<dil>/` — çeviriler: `arayuz*.json` (birleştirilir), `urun.json`, `blog/*.md`.
- `scripts/i18n-derle.mts` — `node --experimental-strip-types scripts/i18n-derle.mts` ile `public/i18n/` üretir. Yer tutucusu eksik girdiyi atlar (sayfada Türkçe kalır).
- `i18n/onar.py` — sayıları yer tutucuya geri koyan otomatik onarım (bir kez çalıştırıldı).

## Durum
| Dil | Arayüz | Ürün | Blog |
|---|---|---|---|
| en, es | tamam | tamam | 22/22 |
| ru | 191 düzeltilecek | tamam | 22/22 |
| az | 61 düzeltilecek | tamam | 22/22 |
| de | 462 düzeltilecek | tamam | 22/22 |
| zh | 483 düzeltilecek | tamam | 22/22 |
| fr | 699 düzeltilecek | tamam | 22/22 |
| ar | 721 düzeltilecek | tamam | 22/22 |

## Devralınacak iş (Codex)
`i18n/devir/<dil>.json`: her anahtar Türkçe şablon; `ornek_tr` dolu örnek, `mevcut` yer tutucusuz hatalı çeviri. Her girdi için `yeni` alanına **anahtarı** çevir, anahtardaki tüm `{n}`/`{sN}` aynen bulunsun. Sonra bu `yeni` değerlerini `i18n/ceviri/<dil>/arayuz_zz_duzeltme.json` olarak `{anahtar: yeni}` biçiminde yaz (alfabetik sırayla en son birleşir, eskiyi ezer), derleyiciyi çalıştır, "atlanan 0" olmalı.

## Bilinen notlar
- Terim tutarlılığı kontrol edilmeli: zh'de koni 交通锥/路锥, delinatör 轮廓标/弹力警示柱 karışık; de "Leitpfosten" ile eşitlendi.
- Kaynak blog `yol-butonu-kedi-gozu.md` aralık için hem 6–12 m hem 9–12 m diyor (Mustafa'dan teyit bekleniyor).
- HTML etiketiyle bölünen cümle parçaları (iyzico ödeme, Yurtiçi Kargo) ru/fr/de'de canlı sayfada gözle kontrol edilmeli.
