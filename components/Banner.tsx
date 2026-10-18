import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Boxes, FileText } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { kartGorseli } from "@/lib/gorsel";

/**
 * Kahraman alanı.
 *
 * Sağdaki ürün teknik çizim diliyle sunuluyor: arkasında daire, altında
 * zemin çizgisi, sağında ölçü oku. Bu, kataloğun kendi dünyasının görsel
 * dili — ölçü, şartnameyle karşılaştıran alıcının ilk baktığı şey.
 * Alt köşedeki kart ürünü adı ve fiyatıyla adlandırıyor, yani görsel
 * dekor olmaktan çıkıp satılabilir bir şeye bağlanıyor.
 */
export default function Banner({
  urunSayisi, kategoriSayisi, urun,
}: {
  urunSayisi: number;
  kategoriSayisi: number;
  urun?: { slug: string; name: string; price_kdv: number; images: string[]; boyut?: string };
}) {
  const olcu = urun?.boyut?.match(/\d+\s*cm/i)?.[0]?.toUpperCase();
  // Ürün adı kodla bitiyor ("... – 702808A6R2ECO"); kart dar olduğu için
  // kodu atıyoruz, zaten ürün sayfasında yazıyor.
  const ad = (urun?.name || "").replace(/\s*[–—-]\s*[A-Z0-9][A-Z0-9 .\-]*$/i, "").trim();

  return (
    <div className="wrap hero-wrap">
      <section className="hero">
        <div className="hero-copy">
          <p className="kas">Trafik ve otopark güvenliği</p>
          <h1>
            Güvenli alanlar.<br />
            <em>Doğru ekipman.</em>
          </h1>
          <p className="hero-description">
            Otoparktan şantiyeye, ihtiyacınıza uygun güvenlik ürünlerini ölçü ve
            teknik özellikleriyle karşılaştırarak seçin.
          </p>
          <div className="hero-actions">
            <Link href="/urunler" className="btn">
              Ürünleri keşfet <ArrowUpRight className="icon" size={18} strokeWidth={2.2} aria-hidden />
            </Link>
            <Link href="/iletisim" className="text-link">
              Toplu teklif oluştur
              <ArrowUpRight className="icon" size={16} strokeWidth={2.2} aria-hidden />
            </Link>
          </div>
          <div className="hero-meta">
            <span>
              <Boxes className="icon" size={15} strokeWidth={2} aria-hidden />
              {urunSayisi} ürün · {kategoriSayisi} kategori
            </span>
            <span>
              <FileText className="icon" size={15} strokeWidth={2} aria-hidden />
              Bireysel ve kurumsal fatura
            </span>
          </div>
        </div>

        <div className="hero-art">
          <span className="hero-label" aria-hidden>SAHADA GÜVENLİK</span>
          <span className="hero-dot-grid" aria-hidden />
          {olcu && <span className="hero-measure" aria-hidden><span>{olcu}</span></span>}

          {urun?.images[0] && (
            <Image src={kartGorseli(urun.images[0])} alt={urun.name}
                   width={430} height={430} unoptimized priority
                   className="hero-product" sizes="(max-width:980px) 90vw, 42vw" />
          )}

          {urun && (
            <Link href={`/urun/${urun.slug}`} className="hero-feature" prefetch={false}>
              <span>
                <small>ÜRÜNÜ YAKINDAN TANIYIN</small>
                <strong>{ad || urun.name}</strong>
              </span>
              <span className="feature-price">{formatPrice(urun.price_kdv)}</span>
              <span className="round-arrow" aria-hidden>
                <ArrowUpRight className="icon" size={15} strokeWidth={2.4} />
              </span>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
