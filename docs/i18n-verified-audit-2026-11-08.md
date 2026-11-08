# Trafik Ürünleri — Çok dilli site için doğrulanmış kaynak denetimi
**Tarih:** 8 Kasım 2026 · **Çalışma dalı:** `chatgpt/i18n-support-2026-11-08`

Bu bir **değişiklik önerisi ve teknik envanterdir**, canlı sitede çeviri kurulduğu anlamına gelmez. Kaynaklar GitHub `main` ve Vercel dağıtım kayıtlarıdır.

## 1. Sürüm ve çalışma disiplini
- Kaynak: `pekcandanoglumustafa/cvsepeti-shop`.
- Vercel: `cvsepeti-shop`, Next.js 16.2.9 / React 19 / Node 24.
- Son gözlemlenen Claude üretim commit'i: `ecc01db57e27eb8d44af7f939bb48725c5e6d5b3`; ilgili Vercel dağıtımı **READY**.
- Claude bugün `f264fe71` ve `ecc01db5` commit'leriyle Hepsiburada görsellerini güncelledi. Bu iş, çeviriden ayrıdır.
- `gpt-kaynak` dalında Next.js uygulama klasörü yok; bu daldaki `Couldn't find any pages or app directory` önizleme hataları **üretim arızası değildir**.
- Bu dalda yazılan destek belgesi ve read-only dışa aktarma aracı **uygulama rotalarını, ödeme kodlarını, ürün verisini veya canlı siteyi değiştirmez**.

## 2. Kesin içerik envanteri
| İçerik | Miktar / konum | Not |
| --- | --- | --- |
| Katalog veri kaydı | 518, `data/products.json` | `TEST-1` ödeme testidir; çeviriden dışlanır |
| Gerçek ürün | **517** | Hepsinin `name` ve `description` alanı dolu; `id`/ürün kodu tekrarına rastlanmadı |
| Kategori | **35** | `category` katalog çapında anahtar |
| Kategori SEO/açıklaması | `data/kategori_icerik.ts` | Giriş ve detaylı bölüm metinleri; doğrudan `category` ile eşleşir |
| Blog makalesi | **22** Markdown dosyası | `content/blog/` |
| Ürün SSS'leri | `lib/sss.ts` | Kategoriye bağlı teknik cevaplar |
| UI bileşenleri | `components/` | Üst/alt menü, sepet, arama, filtre, kartlar vb. |
| SEO ve bağlantılar | `app/layout.tsx`, `app/sitemap.ts`, `lib/seo.ts`, `lib/site.ts` | Mevcut kanonik URL ve `tr_TR` korunmalı |
| Eski URL yönlendirmesi | `proxy.ts` | Yeni dil rotaları planlanınca uyumluluk testi gerekli |
| Ödeme ve kargo | `app/odeme/`, `app/api/iyzico/`, `lib/kargo.ts` | Çeviri sırasında iş mantığına müdahale edilmemeli |

## 3. Çeviriye henüz başlanmaması gereken noktalar
- GitHub `main` ve diğer görünür dallarda sekiz dilin kesin listesi, tamamlanmış çeviri dosyaları veya kullanılan i18n altyapısı bulunamadı.
- `app/layout.tsx` kök dilini `tr` olarak bildiriyor; arayüz ve `OpenGraph` metinleri Türkçe.
- URL yapısı, canonical, `hreflang`, sitemap, para birimi, kargo dili ve yasal sayfalarda uyumsuzluk oluşmaması için yeni i18n rotaları **Claude'un seçtiği yaklaşım öğrenilmeden** oluşturulmaz.
- Sadece metin çevirmek ile uluslararası satışa açılmak farklı işlerdir. Ödeme para birimi, ihracat/kargo ve mevzuat hakkında doğrulanmayan vaat eklenmez.
- Ürün üzerindeki gerçek levha baskıları (ör. `DUR`, `GİRİLMEZ`) teknik görselin parçasıdır; ürünü farklılaştıracak şekilde yeniden yazılamaz. Açıklama metni ayrıca çevrilebilir.

## 4. Token maliyetini azaltan hazır destek aracı
`scripts/i18n-product-batches.mjs` yalnızca dosya **okur**; ürün veya site koduna yazmaz.

```bash
node scripts/i18n-product-batches.mjs summary
node scripts/i18n-product-batches.mjs categories
node scripts/i18n-product-batches.mjs batch 1 25
node scripts/i18n-product-batches.mjs snapshot > /tmp/tr-product-source.json
# Ürün metinleri daha sonra değişirse:
node scripts/i18n-product-batches.mjs changed /tmp/tr-product-source.json
```

- Çevrilecek alanlar yalnızca ürün adı, ürün açıklaması ve kategori etiketi.
- `id`, `kod` ve `slug` yalnızca eşleştirme referansıdır; **değiştirilmez**.
- `snapshot` kaynak metnin SHA-256 özetini tutar. `changed` yalnızca yeni/değişmiş Türkçe metinleri yeniden çevrilmek üzere çıkarır; böylece tüm 517 ürünü her seferinde yeniden göndermek gerekmez.
- Mevcut `package.json`, Next.js yapılandırması, runtime, yönlendirmeler ve veriler değiştirilmedi.

## 5. Devam için tek zorunlu dış bilgi
Claude'un **“E-ticaret sitesi çevirisi”** sohbeti:
https://claude.ai/chat/e5636dda-3a8e-4ee4-9573-54fe3a4b38ee

Bu sohbetten kesin hedef diller, tamamlanan metinler, seçilen i18n dosya biçimi ve en son Claude görevi okunmalı. **Çalışma dosyalarının GitHub'a aktarılmadığı varsayımıyla** aynı çeviriyi yeniden yapma; tahmini dil listesiyle kod yazma.

## 6. Üretime geçiş için kontrol listesi
- [ ] Claude'un yerelleştirme yöntemine ve dil listesine birebir uyum
- [ ] Ürün kodu/ölçü/reflektif bant/ürün işaretleri korunmuş
- [ ] Tüm kullanıcı arayüzünde tek dil tutarlılığı; boş/eksik anahtarlar yok
- [ ] `html lang`, SEO, canonical/`hreflang`, JSON-LD, sitemap ve dahili bağlantılar uyumlu
- [ ] Eski URL yönlendirmeleri yeni locale yollarını 301/404'e göndermiyor
- [ ] KDV/fiyat/kargo/iyzico, sepete ekleme ve ödeme akışı değişmemiş
- [ ] Statik sayfalar, 35 kategori, 22 blog yazısı ve 517 ürün için örneklem kontrolü
- [ ] Build ve Vercel önizlemesi **READY**, gerçek sayfa testi tamam
- [ ] Üretim yayını için kullanıcı onayı
