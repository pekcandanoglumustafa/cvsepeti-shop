import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, LayoutGrid, Check } from "lucide-react";
import { formatPrice } from "@/lib/products";

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
  urunSayisi,
  kategoriSayisi,
  urun,
}: {
  urunSayisi: number;
  kategoriSayisi: number;
  urun?: {
    slug: string;
    name: string;
    price_kdv: number;
    images: string[];
    boyut?: string;
  };
}) {
  const olcu = urun?.boyut?.match(/\d+\s*cm/i)?.[0]?.toUpperCase();
  // Ürün adı kodla bitiyor ("... – 702808A6R2ECO"); kart dar olduğu için
  // kodu atıyoruz, zaten ürün sayfasında yazıyor.
  const ad = (urun?.name || "")
    .replace(/\s*[–—-]\s*[A-Z0-9][A-Z0-9 .\-]*$/i, "")
    .trim();

  return (
    <div className="wrap hero-wrap">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Trafik ve otopark güvenliği</p>
          <h1>
            Güvenli alanlar.
            <br />
            <em>Doğru ekipman.</em>
          </h1>
          <p className="hero-description">
            Otoparktan şantiyeye, ihtiyacınıza uygun güvenlik ürünlerini kolayca
            bulun.
          </p>
          <div className="hero-actions">
            <Link href="/urunler" className="btn">
              Ürünleri keşfet{" "}
              <ArrowUpRight
                className="icon"
                size={18}
                strokeWidth={2.2}
                aria-hidden
              />
            </Link>
            <Link href="/iletisim" className="text-link">
              Toplu teklif oluştur
              <ArrowRight
                className="icon"
                size={16}
                strokeWidth={2.2}
                aria-hidden
              />
            </Link>
          </div>
          <div className="hero-meta">
            <span>
              <LayoutGrid
                className="icon"
                size={15}
                strokeWidth={2}
                aria-hidden
              />
              {urunSayisi} ürün · {kategoriSayisi} kategori
            </span>
            <span>
              <Check className="icon" size={15} strokeWidth={2} aria-hidden />
              Bireysel ve kurumsal alışveriş
            </span>
          </div>
        </div>

        <div className="hero-art">
          <span className="hero-label" aria-hidden>
            SAHADA GÜVENLE.
          </span>
          <span className="hero-dot-grid" aria-hidden />
          {olcu && (
            <span className="hero-measure" aria-hidden>
              <span>{olcu}</span>
            </span>
          )}

          {urun?.images[0] && (
            <Image
              src={urun.images[0]}
              alt={urun.name}
              width={430}
              height={430}
              unoptimized
              priority
              className="hero-product"
              sizes="(max-width:600px) 90vw, 42vw"
            />
          )}

          {urun && (
            <Link
              href={`/urun/${urun.slug}`}
              className="hero-feature"
              prefetch={false}
            >
              <span>
                <small>ÜRÜNÜ YAKINDAN TANIYIN</small>
                <strong>
                  {urun.name.includes("702808A6R2ECO")
                    ? "70 cm ağırlıklı trafik konisi"
                    : ad || urun.name}
                </strong>
              </span>
              <div>
                <span className="feature-price">
                  {formatPrice(urun.price_kdv)}
                </span>
                <small>KDV dahil</small>
              </div>
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
