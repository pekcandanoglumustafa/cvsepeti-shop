"use client";
import Link from "next/link";
import Image from "next/image";
import { KartUrun, formatPrice } from "@/lib/products";
import { kartGorseli } from "@/lib/gorsel";

// KartUrun, Product'ın alt kümesi — tam Product nesnesi de buraya geçer.
export default function ProductCard({ product: p, oncelik = false }: { product: KartUrun; oncelik?: boolean }) {
  const img = p.images[0] ? kartGorseli(p.images[0]) : "";
  return (
    // prefetch kapalı: Next, görüş alanına giren her bağlantının tüm verisini
    // indiriyor. Katalogda 60 kart = 60 ayrı istek, 1.2 MB. Kullanıcı bunların
    // bir ikisine tıklıyor. Ana menüde ve sepet akışında prefetch açık kalıyor.
    <Link href={`/urun/${p.slug}`} className="card" prefetch={false}
          style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column" }}>
      <div className="tile">
        {img ? (
          <Image src={img} alt={p.name} fill unoptimized
                 loading={oncelik ? "eager" : "lazy"} priority={oncelik}
                 sizes="(max-width:620px) 33vw,(max-width:900px) 22vw,(max-width:1300px) 16vw,13vw"
                 style={{ objectFit: "contain", padding: "3%" }} />
        ) : (
          <div style={{ height: "100%", display: "grid", placeItems: "center", color: "var(--dim)", fontSize: 10 }}>—</div>
        )}
      </div>

      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        <p className="name" style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.28,
                                     display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                                     overflow: "hidden", minHeight: "2.56em" }}>
          {p.name}
        </p>

        <div style={{ marginTop: "auto", paddingTop: 4 }}>
          <span style={{ display: "flex", alignItems: "baseline", gap: 4, flexWrap: "wrap" }}>
            <span className="display" style={{ fontSize: 16.5, letterSpacing: "-0.04em" }}>
              {formatPrice(p.price)}
            </span>
            <span style={{ fontSize: 8.5, fontWeight: 800, color: "var(--muted)", letterSpacing: ".04em" }}>
              +KDV
            </span>
          </span>
          <span style={{ display: "block", fontSize: 9, color: "var(--dim)", marginTop: 1,
                         whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {formatPrice(p.price_kdv)} dahil
          </span>
        </div>
      </div>
    </Link>
  );
}
