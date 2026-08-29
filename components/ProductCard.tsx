"use client";
import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice } from "@/lib/products";

export default function ProductCard({ product: p }: { product: Product }) {
  const img = p.images[0];
  return (
    <Link href={`/urun/${p.slug}`} className="card"
          style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column" }}>
      <div className="tile">
        {img ? (
          <Image src={img} alt={p.name} fill unoptimized
                 sizes="(max-width:620px) 33vw,(max-width:900px) 22vw,(max-width:1300px) 16vw,13vw"
                 style={{ objectFit: "contain", padding: "3%" }} />
        ) : (
          <div style={{ height: "100%", display: "grid", placeItems: "center", color: "var(--dim)", fontSize: 10 }}>—</div>
        )}
      </div>

      <div style={{ paddingTop: 6, display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        <p className="name" style={{ fontSize: 11.5, fontWeight: 600, lineHeight: 1.25,
                                     display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                                     overflow: "hidden", minHeight: "2.5em" }}>
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
