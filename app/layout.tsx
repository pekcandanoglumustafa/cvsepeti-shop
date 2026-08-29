import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CartToast from "@/components/CartToast";
import { allProducts, categories } from "@/lib/products";

const BASE = "https://www.trafikurunleri.com";
const MARKA = "trafikurunleri.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: `${MARKA} — Trafik Konisi, Delinatör, Uyarı Levhası ve Yol Güvenliği Ekipmanları`,
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
  alternates: { canonical: "/" },
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
        target: { "@type": "EntryPoint", urlTemplate: `${BASE}/urunler?q={search_term_string}` },
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
        <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(kurumSema) }} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <FloatingContact />
        <CartToast />
      </body>
    </html>
  );
}
