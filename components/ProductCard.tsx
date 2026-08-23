"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Product, formatPrice } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const [hover, setHover] = useState(false);
  const img = product.images[0];

  return (
    <Link href={`/urun/${product.slug}`}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column" }}>

      <div style={{ position: "relative", aspectRatio: "1/1", background: "var(--tile)", overflow: "hidden" }}>
        {img ? (
          <Image src={img} alt={product.name} fill unoptimized
                 sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
                 style={{ objectFit: "contain", padding: "14%",
                          transition: "transform .35s ease",
                          transform: hover ? "scale(1.06)" : "scale(1)" }} />
        ) : (
          <div style={{ height: "100%", display: "grid", placeItems: "center", color: "var(--muted)", fontSize: 12 }}>
            görsel yok
          </div>
        )}
        <span className="eyebrow" style={{ position: "absolute", top: 10, left: 10, color: "var(--muted)" }}>
          {product.kod}
        </span>
      </div>

      <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
        <p className="eyebrow" style={{ color: "var(--muted)" }}>{product.category}</p>
        <p style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.01em" }}
           className="line-clamp-2">{product.name}</p>
        <div style={{ marginTop: "auto", paddingTop: 6, display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 17, fontWeight: 900, color: "var(--hi)", letterSpacing: "-0.02em" }}>
            {formatPrice(product.price)}
          </span>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>{product.desi} desi</span>
        </div>
      </div>
    </Link>
  );
}
