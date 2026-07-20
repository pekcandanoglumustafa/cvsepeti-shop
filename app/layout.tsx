import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CartToast from "@/components/CartToast";

const BASE = "https://www.cvsepeti.org";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "CV Sepeti | Trafik Güvenliği, Yalıtım ve İş Güvenliği Ürünleri",
    template: "%s | CV Sepeti",
  },
  description:
    "Trafik konisi, delinatör, uyarı levhası, su yalıtım membranı ve iş güvenliği ekipmanları. 246+ ürün, CE & TSE belgeli, hızlı kargo. Konya Teknokent firması.",
  keywords: [
    "trafik konisi", "delinatör", "trafik levhası", "uyarı levhası",
    "su yalıtım membranı", "trafik dubası", "kasis", "yol butonu",
    "iş güvenliği ekipmanları", "güvenlik aynası", "araç stoperi",
    "trafik güvenliği ürünleri", "trafik malzemeleri", "konya",
  ],
  authors: [{ name: "CV Sepeti" }],
  creator: "CV Sepeti",
  publisher: "CV Sepeti",
  alternates: { canonical: BASE },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: BASE,
    siteName: "CV Sepeti",
    title: "CV Sepeti | Trafik Güvenliği ve Yalıtım Ürünleri",
    description: "Trafik konisi, delinatör, uyarı levhası, membran ve iş güvenliği ekipmanları. CE & TSE belgeli, hızlı kargo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Sepeti | Trafik Güvenliği ve Yalıtım Ürünleri",
    description: "246+ trafik güvenliği ve yalıtım ürünü. Hızlı kargo, kurumsal fatura.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console doğrulama kodu buraya gelecek
    // google: "VERIFICATION_CODE",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "OnlineStore",
      "@id": `${BASE}/#organization`,
      name: "CV Sepeti",
      url: BASE,
      telephone: "+905076584245",
      email: "info@cvsepeti.org",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Akademi Mah. Gürbulut Sk. Teknokent No:67",
        addressLocality: "Selçuklu",
        addressRegion: "Konya",
        postalCode: "42130",
        addressCountry: "TR",
      },
      sameAs: ["https://www.instagram.com/cvsepetii"],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "CV Sepeti",
      publisher: { "@id": `${BASE}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE}/ara?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "tr-TR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
        <FloatingContact />
        <CartToast />
      </body>
    </html>
  );
}
