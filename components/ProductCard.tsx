"use client";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import Fiyat from "@/components/Fiyat";

export default function ProductCard({ product }: { product: Product }) {
  const img = product.images[0];
  return (
    <Link href={`/urun/${product.slug}`} className="card"
          style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column" }}>
      <div className="tile">
        {img ? (
          <Image src={img} alt={product.name} fill unoptimized
                 sizes="(max-width:640px) 50vw,(max-width:1100px) 33vw,25vw"
                 style={{ objectFit: "contain", padding: "6%" }} />
        ) : (
          <div style={{ height: "100%", display: "grid", placeItems: "center", color: "var(--dim)", fontSize: 11 }}>
            görsel yok
          </div>
        )}
      </div>

      <div style={{ borderTop: "1px solid var(--hair)", paddingTop: 11, display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <span className="eyebrow" style={{ color: "var(--dim)" }}>{product.kod}</span>
          <span className="eyebrow" style={{ color: "var(--dim)" }}>{product.desi} desi</span>
        </div>
        <p className="name line-clamp-2" style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.34 }}>
          {product.name}
        </p>
        <span style={{ marginTop: "auto", paddingTop: 4 }}>
          <Fiyat haric={product.price} dahil={product.price_kdv} boyut="kucuk" />
        </span>
      </div>
    </Link>
  );
}
