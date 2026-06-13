import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CV Sepeti | Trafik Güvenliği, Yalıtım ve İş Güvenliği Ürünleri",
  description:
    "Trafik malzemeleri, su yalıtım membranları, uyarı levhaları ve iş güvenliği ekipmanları. Hızlı kargo, güvenli ödeme.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
