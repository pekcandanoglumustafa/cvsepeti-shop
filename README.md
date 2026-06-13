# CV Sepeti E-Ticaret Sitesi

Next.js 16 (App Router) + Tailwind ile geliştirilmiş, 237 ürünlü tam fonksiyonlu
e-ticaret sitesi. iyzico ödeme entegrasyonu hazır (Checkout Form yöntemi).

## Kurulum

```bash
npm install
npm run dev      # geliştirme: http://localhost:3000
npm run build    # production build
npm run start    # production sunucu
```

## Ürün Verisi

`data/products.json` dosyası, yüklediğiniz Trendyol export Excel'inden (237 ürün)
otomatik oluşturuldu. Her ürün için: isim, kategori, fiyat, açıklama, stok, görseller
(Trendyol CDN'den), renk/beden/ebat bilgileri içerir.

Ürün eklemek/güncellemek için bu JSON dosyasını düzenleyebilirsiniz, veya bana yeni
bir Excel verirseniz tekrar dönüştürebilirim.

## iyzico Kurulumu (ÖNEMLİ)

Ödeme şu an "sandbox" (test) anahtarlarıyla çalışıyor. Gerçek ödeme almak için:

1. iyzico merchant panelinden API Key ve Secret Key alın
   (https://merchant.iyzipay.com → Ayarlar → API Anahtarları)
2. Proje köküne `.env.local` dosyası oluşturup şunları ekleyin:

```
IYZICO_API_KEY=your-real-api-key
IYZICO_SECRET_KEY=your-real-secret-key
IYZICO_BASE_URL=https://api.iyzipay.com
```

3. Test modunda kalmak isterseniz `IYZICO_BASE_URL=https://sandbox-api.iyzipay.com`
   ve sandbox anahtarlarınızı kullanın.

Ödeme akışı:
- `/sepet` → `/odeme` (alıcı bilgileri formu)
- Form gönderildiğinde `/api/iyzico/checkout-form` iyzico Checkout Form'u başlatır
  ve embedded ödeme formu sayfada açılır.
- Ödeme tamamlandığında iyzico, `/api/iyzico/callback` adresine POST yapar, sonuç
  doğrulanır ve kullanıcı `/odeme-sonuc?status=success|failure` sayfasına yönlendirilir.

**Not:** Canlıya almadan önce callback URL'inin gerçek domaininizle
(https://www.cvsepeti.org) eşleştiğinden emin olun — iyzico panelinde de bu domaini
"izinli" listeye eklemeniz gerekebilir.

## Yapı

- `/` — Ana sayfa (hero, kategoriler, öne çıkan ürünler, ALDIS banner)
- `/urunler` — Tüm ürünler (237 ürün)
- `/kategori/[slug]` — Kategoriye göre filtrelenmiş ürünler
- `/urun/[slug]` — Ürün detay sayfası (galeri, sepete ekle, benzer ürünler)
- `/sepet` — Sepet (localStorage ile kalıcı, zustand)
- `/odeme` — Ödeme formu + iyzico entegrasyonu
- `/odeme-sonuc` — Sipariş sonucu
- `/hava-aldis` — ALDIS ürün tanıtım sayfası

## Tasarım

Trafik güvenliği / endüstriyel temaya uygun: asfalt antrasit (#1E2128), güvenlik
turuncusu (#E8590C), güvenlik sarısı (#FFD23F) ve kağıt rengi (#F4F2ED) paleti.
İmza öğesi: tehlike şeridi (hazard stripe) bölüm ayraçları.

## Sunucuya Yükleme

Bu proje Vercel, Hostinger (Node.js hosting) veya herhangi bir Node.js destekleyen
sunucuda çalışır. `npm run build` sonrası `npm run start` ile production'da
çalıştırılabilir, veya Vercel'e doğrudan deploy edilebilir.
