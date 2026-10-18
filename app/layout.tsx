import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CartDrawer from "@/components/CartDrawer";
import { allProducts, categories } from "@/lib/products";

import { SITE_URL as BASE, SITE_NAME } from "@/lib/site";

const MARKA = SITE_NAME;

/**
 * Vercel'de NEXT_PUBLIC_GA_ID tanımlı değilse eskiden "G-XXXX" ile script yükleniyordu:
 * geçersiz bir ölçüm kimliği, yani hiç veri toplamayan ama yine de yüklenen bir istek.
 * Kimlik gerçekten tanımlı değilse script'i hiç basmıyoruz.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GA_GECERLI = !!GA_ID && /^G-[A-Z0-9]{6,}$/.test(GA_ID);

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    // Google ~60 karakterde kesiyor; eski başlık 86 karakterdi ve sonu görünmüyordu
    default: `${MARKA} — Trafik Konisi, Delinatör, Levha, Bariyer`,
    template: `%s | ${MARKA}`,
  },
  description:
    `Trafik konisi, delinatör, hız kesici kasis, uyarı levhası, güvenlik bariyeri ve yol işaretleme ürünleri. ${allProducts.length} ürün ölçü ve teknik özellikleriyle listeli. Konya'dan Türkiye geneline Yurtiçi Kargo ile gönderim.`,
  keywords: [
    "trafik konisi", "delinatör", "trafik ürünleri", "yol güvenliği ekipmanları",
    "hız kesici kasis", "uyarı levhası", "güvenlik bariyeri", "araç stoperi",
    "şerit ayırıcı", "yol butonu", "refüj dubası", "trafik levhası", "kolon köşe koruyucu",
  ],
  authors: [{ name: MARKA }],
  creator: MARKA,
  publisher: MARKA,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: BASE,
    siteName: MARKA,
    title: `${MARKA} — Yol ve Trafik Güvenliği Ekipmanları`,
    description: `${allProducts.length} ürün, ${categories.length} kategori. Trafik konisi, delinatör, kasis, levha ve bariyer. Ölçü ve teknik özellikleriyle listeli.`,
    images: [{ url: "/marka/og.png", width: 1200, height: 630, alt: MARKA }],
  },
  twitter: { card: "summary_large_image", title: MARKA, description: "Yol ve trafik güvenliği ekipmanları" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  category: "shopping",
};

/** Organization + WebSite + LocalBusiness — Google AI Overviews bunları okuyor */
const kurumSema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE}/#kurulus`,
      name: MARKA,
      alternateName: "Trafik Ürünleri",
      legalName: "Pekcandanoğlu",
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/marka/logo.svg` },
      description: "Trafik güvenliği, yol işaretleme ve iş güvenliği ekipmanları tedarikçisi. Kamu kurumlarına ve özel sektöre satış.",
      address: { "@type": "PostalAddress", addressLocality: "Konya", addressCountry: "TR" },
      contactPoint: {
        "@type": "ContactPoint", telephone: "+90-507-658-42-45",
        contactType: "sales", areaServed: "TR", availableLanguage: ["Turkish"],
      },
      knowsAbout: [
        "trafik konisi", "delinatör", "yol işaretleme", "hız kesici kasis",
        "trafik uyarı levhası", "güvenlik bariyeri", "iş güvenliği ekipmanları",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#site`,
      url: BASE, name: MARKA, inLanguage: "tr-TR",
      publisher: { "@id": `${BASE}/#kurulus` },
      potentialAction: {
        "@type": "SearchAction",
        // /urunler bu parametreyi hiç okumuyordu: ?q=ZT8075 aramayı uygulamadan
        // tüm kataloğu açıyordu. Arama sayfası /ara ve gerçekten q parametresiyle çalışıyor.
        target: { "@type": "EntryPoint", urlTemplate: `${BASE}/ara?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "OnlineStore",
      "@id": `${BASE}/#magaza`,
      name: MARKA, url: BASE,
      parentOrganization: { "@id": `${BASE}/#kurulus` },
      currenciesAccepted: "TRY",
      paymentAccepted: "Kredi Kartı, Banka Kartı, Havale/EFT",
      areaServed: { "@type": "Country", name: "Türkiye" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        {/* Gövde metninin ve ilk başlığın fontu önden yükleniyor: yoksa yazı
            önce sistem fontuyla çizilip sonra Barlow'a atlıyor ve göz alıyor.
            Yalnızca her sayfada kesin kullanılan üç dosya — gerisi gerektiğinde. */}
        <link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope-latin-ext.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(kurumSema) }} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <FloatingContact />
        <CartDrawer />
      </body>
      {GA_GECERLI && <GoogleAnalytics gaId={GA_ID!} />}
    </html>
  );
}
