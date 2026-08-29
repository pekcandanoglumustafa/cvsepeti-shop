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
                 sizes="(max-width:520px) 50vw,(max-width:900px) 25vw,(max-width:1300px) 20vw,16vw"
                 style={{ objectFit: "contain", padding: "4%" }} />
        ) : (
          <div style={{ height: "100%", display: "grid", placeItems: "center", color: "var(--dim)", fontSize: 10 }}>—</div>
        )}
      </div>

      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
        <p className="name" style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.28,
                                     display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                                     overflow: "hidden", minHeight: "2.56em" }}>
          {p.name}
        </p>

        <div style={{ marginTop: "auto", paddingTop: 4 }}>
          <span style={{ display: "flex", alignItems: "baseline", gap: 4, flexWrap: "wrap" }}>
            <span className="display" style={{ fontSize: 19, letterSpacing: "-0.04em" }}>
              {formatPrice(p.price)}
            </span>
            <span style={{ fontSize: 9.5, fontWeight: 800, color: "var(--muted)", letterSpacing: ".04em" }}>
              +KDV
            </span>
          </span>
          <span style={{ display: "block", fontSize: 10, color: "var(--dim)", marginTop: 1 }}>
            {formatPrice(p.price_kdv)} · {p.kod}
          </span>
        </div>
      </div>
    </Link>
  );
}
