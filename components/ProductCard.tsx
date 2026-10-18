"use client";
import Link from "next/link";
import Image from "next/image";
import { KartUrun, formatPrice } from "@/lib/products";
import { kartGorseli } from "@/lib/gorsel";

/**
 * Ürün adı çoğu üründe "... – ZT8045" biçiminde kodla bitiyor.
 * Kod kartta ayrı satırda gösterildiği için addan ayrılıyor: hem isim
 * kısalıyor hem kod taranabilir oluyor. Kurumsal müşteri ürünü koduyla
 * tanıyor (Search Console'da "zt777" tek başına 1.114 gösterim almış).
 */
function adiAyir(ad: string, kod?: string) {
  const k = (kod || "").trim();
  if (!k) return ad.trim();
  const kacir = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return ad.replace(new RegExp(`\\s*[–—-]\\s*${kacir}\\s*$`, "i"), "").trim() || ad.trim();
}

// KartUrun, Product'ın alt kümesi — tam Product nesnesi de buraya geçer.
export default function ProductCard({ product: p, oncelik = false }: { product: KartUrun; oncelik?: boolean }) {
  const img = p.images[0] ? kartGorseli(p.images[0]) : "";
  const ad = adiAyir(p.name, p.kod);

  return (
    // prefetch kapalı: Next, görüş alanına giren her bağlantının tüm verisini
    // indiriyor. Katalogda 60 kart = 60 ayrı istek, 1.2 MB. Kullanıcı bunların
    // bir ikisine tıklıyor. Ana menüde ve sepet akışında prefetch açık kalıyor.
    <Link href={`/urun/${p.slug}`} className="card" prefetch={false}
          style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column" }}>
      {/* İnce çerçeve görseli bir birim hâline getiriyor — önceden kart sınırı
          yoktu ve hangi fiyatın hangi ürüne ait olduğu her seferinde yeniden
          çözülüyordu. */}
      <div className="tile" style={{ border: "1px solid var(--hair)" }}>
        {img ? (
          <Image src={img} alt={p.name} fill unoptimized
                 loading={oncelik ? "eager" : "lazy"} priority={oncelik}
                 sizes="(max-width:620px) 48vw,(max-width:860px) 32vw,(max-width:1300px) 25vw,20vw"
                 style={{ objectFit: "contain", padding: "7%" }} />
        ) : (
          <div style={{ height: "100%", display: "grid", placeItems: "center",
                        color: "var(--dim)", fontSize: 11.5 }}>
            görsel yok
          </div>
        )}
      </div>

      <div style={{ paddingTop: 11, display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
        <p className="name" style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.35,
                                     letterSpacing: "-0.004em" }}>
          {ad}
        </p>

        {p.kod && (
          <p style={{ fontSize: 12, color: "var(--dim)", fontVariantNumeric: "tabular-nums" }}>
            {p.kod}
          </p>
        )}

        {/* Fiyat başlık fontuyla yazılıyordu (900 ağırlık, büyük harf, 0.84
            satır yüksekliği). Fiyatın bağırmasına gerek yok. */}
        <p style={{ marginTop: "auto", paddingTop: 7, fontSize: 17, fontWeight: 700,
                    letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
          {formatPrice(p.price_kdv)}
        </p>
      </div>
    </Link>
  );
}
