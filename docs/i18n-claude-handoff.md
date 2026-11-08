# Çok dilli mağaza — devralma ve koruma notu (2026-11-08)

Bu belge, Claude tarafından sürdürülen Trafik Ürünleri projesine yardımcı olmak amacıyla hazırlanmıştır. **Mevcut uygulamanın yerelleştirme mimarisini, tasarımını veya üretim akışını değiştirme talimatı değildir.**

## Doğrulanan mevcut durum
- Kaynak: `pekcandanoglumustafa/cvsepeti-shop`, üretim dalı: `main`.
- Yığın: Next.js 16.2.9 (App Router), React 19.2.4, TypeScript, Tailwind CSS 4.
- Vercel projesi: `cvsepeti-shop`; bağlı alan adı: `www.trafikurunleri.com`.
- 2026-11-08 itibarıyla katalog JSON'unda **518 kayıt** bulunuyor. Bunlardan `TEST-1` satış kataloğundan filtreleniyor: **517 gerçek ürün**, **35 kategori**.
- Son incelenen `main` commit'i: `524e5b7694e3e385d7c8cf2aadc5d42336e1b683`.
- İnceleme sırasında `main` kökünde `messages`, `locales`, `translations` ya da `i18n` klasörü görülmedi; `app/layout.tsx` hâlâ `<html lang="tr">` üretiyor.
- `CLAUDE.md`, `AGENTS.md`'ye yönlendiriyor. `AGENTS.md` Next.js sürümüne özgü dokümantasyona dikkat edilmesini istiyor.
- `gpt-kaynak` dalı ürün görsellerinin geçici kaynaklarını barındırıyor; çeviri geliştirmesi için kullanılmamalı.
- GitHub geçmişindeki son değişiklikler ağırlıklı olarak ürün görselleri, tasarım, ödeme, ürün verisi ve SEO üzerinde.
- Hedef sekiz dilin kesin listesi ve Claude'un yerel/henüz push edilmemiş dosyaları bu incelemeyle **belirlenemedi**.

## Claude'un çalışmasını bozmadan devam etme kuralları
1. Claude'un devam eden görevini/yerel dosyalarını öğrenmeden yeni i18n kütüphanesi, yeniden yönlendirme sistemi veya yerelleştirme dizin yapısı dayatma.
2. `main` ve `gpt-kaynak` dallarını doğrudan değiştirme; küçük kapsamlı özellik dalı ve incelenebilir pull request kullan.
3. Ürün kimliği, SKU/`kod`, ürün slug'ı, fiyat, KDV, stok, ölçüler, teknik özellikler, görsel yolları ve tedarikçi bilgilerini çeviriler sırasında değiştirme.
4. Türkçe kanonik sayfaları ve eski URL'ler için `proxy.ts` yönlendirmelerini koru; yeni dil rotalarının mevcut ürün/kategori rotalarıyla çatışıp çatışmadığını ayrıca test et.
5. iyzico checkout/callback, yerel vergi ve KVKK metinleri ile kargo hesaplarını çeviri işleminden ayrı tut. Yasal metinlerin diğer dillere çevrilmesi hukuki kontrol gerektirir.
6. `hreflang`, canonical, sitemap, `lang`, OpenGraph locale, JSON-LD, URL rota yapısı ve dil seçicisini yalnızca seçilmiş yerelleştirme mimarisi kesinleştikten sonra birlikte ele al.
7. Uydurma ürün teknik bilgisi üretme; üreticiye ait kodları, reflektif bant sayısını ve boyutları koru. Pazaryeri açıklamalarını/site arayüzünü karıştırma.
8. Önce kod incelemesi, ardından çeviri tutarlılığı kontrolü, TypeScript/lint/build kontrolleri ve gerçek tarayıcı önizleme testi yap. Üretime ancak ayrıca onaylanmış sürüm çıkar.
9. Claude'un sonraki commit'lerini `main` üzerinde izle; çakışma halinde Claude'un çalışan değişikliğini tercih et ve kendi dalını yeniden temellendir.
10. Eklenti erişimi veya durum bilgisi yetersizse bunu açıkça belirt; başarı veya test sonucu uydurma.

## Çeviri terminolojisi için başlangıç
Aşağıdaki kavramlar bağlama duyarlıdır. Bunlar hedef dil kararlaştırılmadan nihai çeviri değildir.
- Trafik konisi — road/traffic cone (genel); bağlamı kontrol et.
- Delinatör — traffic delineator / delineator post; ürün tipine göre ayır.
- Hız kesici kasis — speed bump / speed hump; gerçek geometriye göre ayır.
- Güvenlik bariyeri — safety barrier / crowd-control barrier; ürün fonksiyonuna göre ayır.
- Araç stoperi — parking wheel stop.
- Uyarı levhası — warning sign.
- Yol butonu — road stud / pavement marker; malzemesine göre ayır.
- Flaşör lamba — flashing warning light.
- Reflektif — retroreflective; ürün özelliklerinde 'reflective' ile teknik ayrımı kontrol et.
- TPU, TPE, PVC, SKU, marka/model/ürün kodları — çevrilmeden korunur.

## Devam etmek için bekleyen tek kritik bilgi
Claude'un üzerinde çalıştığı **kesin sekiz dil listesi** ve varsa tamamlanmış ama henüz GitHub'a gönderilmemiş çeviri dosyaları / son Claude görevi. Bu bilgi gelmeden kullanıcı arayüzüne dil desteği uygulanmaz.

## Denetim için inceleme noktaları
- Türkçe sitenin mevcut rotaları, sepet ve ödeme işlemi değişmedi mi?
- Ürün/kategori çevirilerinde terminoloji ve teknik bilgiler doğru mu?
- Yerelleştirilmiş sayfalarda dil öznitelikleri, arama motoru işaretlemeleri ve iç bağlantılar tutarlı mı?
- Eksik çeviriler görünür yerde yanlış dil karışmasına yol açıyor mu?
- Yalnızca gözden geçirilen değişiklikler önizlemeden üretime taşındı mı?
