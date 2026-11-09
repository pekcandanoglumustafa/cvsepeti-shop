# E-ticaret tasarım istişaresi

Codex ve Claude arasında Mustafa'nın talebiyle yapılan değerlendirme.
İncelenen temel: `988ff32` main ve `14e85a2` birleşik çeviri sürümü.
Hepsiburada yönetim paneli bu toplantıda doğrudan incelenmedi; kanal
karşılaştırmalarındaki paket ve kampanya önerileri uygulanmış değişiklik değildir.

## Yayından önce kararlaştırılan düzeltmeler

- Fiyatlara dahil olan kargo, ürün/sepet/ödeme/kurumsal sayfalarda aynı şekilde anlatılacak.
- Kargo dahilken ödeme sayfasında karşı ödemeli kargo seçeneği gösterilmeyecek.
- Yeni kargo metinleri sekiz dile eklenecek; anahtarların derlenmesi kadar ekrandaki sonuç da kontrol edilecek.
- Ödeme ve iade cümleleri parça parça çevrilerek anlam kaybetmeyecek şekilde birleştirilecek.
- Çince ürün terminolojisi tutarlı hale getirilecek.
- Son ürün fiyatları ve görselleri korunacak; bu sürüm yeni indirim veya fiyat politikası getirmeyecek.

Önizlemede Codex'in doğruladıkları: İngilizce ana sayfa ve ürün sayfası
açılıyor, ürün sepete ekleniyor, ödeme ekranına geçiliyor. Arapça seçimi
`lang=ar` ve `dir=rtl` ile açılıyor. Ödeme ekranında eski kargo seçeneği ve
bazı Türkçe kalan sepet metinleri görüldü; düzeltme kapsamına alındı.
Gerçek ödeme yapılmadı.

## Sonraki tasarım çalışması

| Öncelik | Konu | Öneri | Kabul ölçütü |
|---|---|---|---|
| 1 | Fiyat ve güven | Vergi ve kargo durumunu ürün, sepet ve ödemede tutarlı göster | Kullanıcının ödeyeceği toplam değişmeden izlenebiliyor |
| 2 | Kategori ve arama | 35 kategoriyi anlaşılır üst gruplarla sun; ürün kodu aramasını öne çıkar | Kodla aranan ürün kolay bulunuyor; mevcut kategoriler kaybolmuyor |
| 2 | Mobil filtreler | Seçili filtreleri görünür ve tek tek kaldırılabilir yap | Filtre seçme, sonuç görme ve temizleme telefonda kolay |
| 3 | Mobil sepet | Ürün/adet/toplam ve ödeme düğmesini önceliklendir | Adet değişimi ve silme toplamı doğru güncelliyor |
| 3 | Toplu teklif | Ürün kodu ve adedi önceden dolu teklif akışı tasarla | Kullanıcı seçtiği ürünleri yeniden yazmadan teklif isteyebiliyor |
| 4 | Ürün detayı | Mevcut ölçü, malzeme ve koli bilgisini satın alma alanına yaklaştır | Teknik bilgiler katalog verisiyle aynı |

Kademeli indirim, paket fiyatı veya sertifika iddiası tasarım kararıyla
üretilmeyecek. İndirimler onaylı ticari kurala; sertifika ve teknik föyler
ürüne ait doğrulanmış belgelere dayanmalı. Teknik resimlerden tahmini
sertifika ya da uygunluk sonucu çıkarılmamalı.

## Hepsiburada ile tutarlılık

- Ürün kodu, tek ürün/paket ayrımı ve paket adedi iki kanalda açık olmalı.
- Liste fiyatı ve kampanya fiyatı ayrı değerlendirilmeli; geçici kampanya
  otomatik olarak kalıcı site fiyatı kuralına dönüştürülmemeli.
- Kargo maliyeti gerçek paket ölçüsü/ağırlığı ile hesaplanmalı; düşük desi
  bildirimi önerilmiyor.
- Ürün adı değişikliği çeviri sözlükleriyle birlikte yapılmalı; mevcut
  çeviri mimarisi Türkçe adları anahtar olarak kullanıyor.
- Hepsiburada'da bulunan fakat site kapsamı dışında kalan ürünler otomatik
  olarak siteye taşınmamalı.

## Doğrulama sınırı

Derleme ve adres kontrolleri dilbilgisi incelemesinin yerine geçmez.
Kartla ödeme sağlayıcısında gerçek işlem bu çalışmanın kontrol adımı değildir.
Blogdaki yol butonu aralıkları için mevcut Türkçe kaynakta 6–12 ve 9–12 m
çelişkisi bulunuyor; teknik doğrulama olmadan yeni bir değer seçilmedi.

## 9 Kasım devam kontrolü

`9e6d630` üretim sürümü, Claude'un `914b521` kargo/sepet düzeltmelerini
zaten içeriyordu. Canlı İngilizce sepette toplam, KDV, ücretsiz kargo ve
ödeme bağlantılarının çevrildiği doğrulandı.

Katalog daha sonra 627 ürüne çıktığı için eklenen 95 paket ve 15 kasis
setinin adları sözlük dışında kalmıştı. Codex bunların ad, açıklama ve seri
kalıplarını sekiz dile ekledi. Gerçek çeviri eşleştirme fonksiyonuyla 627
ürün adının ve 110 yeni açıklamanın tamamı çözümlendi; üretim derlemesi
706 sayfayla tamamlandı. Ürün fiyatı, adedi veya ticari kural değiştirilmedi.
