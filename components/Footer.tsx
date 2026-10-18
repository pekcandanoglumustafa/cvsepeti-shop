import Link from "next/link";
import Logo from "@/components/Logo";
import { MapPin } from "lucide-react";
import { categories, categorySlug, allProducts } from "@/lib/products";
import { FIRMA } from "@/lib/firma";

const KATALOG = [
  "Trafik Konisi",
  "Delinatör",
  "Hız Kesici Kasis",
  "Araç Stoperi",
  "Güvenlik Bariyeri",
  "Uyarı Levhası",
];

export default function Footer() {
  const kat = KATALOG.filter((c) => categories.includes(c));

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link
              className="footer-logo"
              href="/"
              aria-label="Trafik Ürünleri ana sayfa"
            >
              <Logo />
            </Link>
            <p className="footer-description">
              Trafik güvenliği, yol işaretleme ve iş güvenliği ekipmanları. Kamu
              kurumlarına ve özel sektöre satış.
            </p>
            <p className="footer-location">
              <MapPin
                className="icon"
                size={13}
                strokeWidth={2.2}
                aria-hidden
              />
              {FIRMA.konum}
            </p>
          </div>

          <div>
            <h3>Ürünleri keşfedin</h3>
            {kat.map((c) => (
              <Link
                key={c}
                href={`/kategori/${categorySlug(c)}`}
                prefetch={false}
              >
                {c}
              </Link>
            ))}
            <Link href="/urunler" prefetch={false}>
              Tüm ürünler ({allProducts.length})
            </Link>
          </div>

          <div>
            <h3>Size yardımcı olalım</h3>
            <Link href="/blog" prefetch={false}>
              Ürün seçim rehberi
            </Link>
            <Link href="/iletisim" prefetch={false}>
              Kurumsal &amp; toplu alım
            </Link>
            <Link href="/teslimat-ve-iade" prefetch={false}>
              Kargo ve teslimat
            </Link>
            <Link href="/sepet" prefetch={false}>
              Sepetim
            </Link>
            <a href={FIRMA.telefonHref}>{FIRMA.telefon}</a>
            <a href={FIRMA.whatsapp} rel="noopener">
              WhatsApp (teknik soru)
            </a>
          </div>

          <div>
            <h3>Kargo</h3>
            <p>
              Yurtiçi Kargo ile gönderim.
              <br />
              Kargo ücreti desi üzerinden ödeme adımında hesaplanır.
            </p>
            <a href={FIRMA.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp (teknik soru) ↗
            </a>
          </div>
        </div>

        <div className="footer-legal">
          <Link href="/hakkimizda" prefetch={false}>
            Hakkımızda
          </Link>
          <Link href="/iletisim" prefetch={false}>
            İletişim
          </Link>
          <Link href="/teslimat-ve-iade" prefetch={false}>
            Teslimat ve İade
          </Link>
          <Link href="/mesafeli-satis-sozlesmesi" prefetch={false}>
            Mesafeli Satış Sözleşmesi
          </Link>
          <Link href="/gizlilik-ve-kvkk" prefetch={false}>
            Gizlilik ve KVKK
          </Link>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} trafikurunleri.com · {FIRMA.unvan}
          </span>
          {/* Fiyatlar KDV dahile çevrildi; bu satır bir dönem "KDV hariçtir"
              diyerek kataloğu yalanlıyordu. */}
          <span>Fiyatlar KDV dahildir. Kargo ödeme adımında hesaplanır.</span>
          <div className="footer-pay">
            <b>iyzico</b>
            <span>VISA</span>
            <span>mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
