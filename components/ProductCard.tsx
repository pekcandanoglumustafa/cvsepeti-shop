"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/lib/products";

function formatPrice(n: number) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
}

export default function ProductCard({ product }: { product: Product }) {
  const img = product.images[0];
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/urun/${product.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{
        background: hovered ? "var(--surface-2)" : "var(--surface)",
        border: "1px solid",
        borderColor: hovered ? "rgba(249,115,22,0.3)" : "var(--border)",
        borderRadius: 16,
        overflow: "hidden",
        aspectRatio: "1 / 1",
        position: "relative",
        marginBottom: 12,
        transition: "border-color 0.25s, background 0.25s",
      }}>
        {img ? (
          <Image
            src={img}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: "cover", transition: "transform 0.4s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }}
            unoptimized
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-tertiary)", fontSize: 13 }}>
            Görsel yok
          </div>
        )}
        {product.stock <= 0 && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(9,9,11,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 500, border: "1px solid var(--border-solid)", padding: "4px 10px", borderRadius: 6 }}>Stokta Yok</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 11, color: "var(--orange)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
          {product.category}
        </p>
        <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 6 }}>
          {product.name}
        </p>
        <p style={{ fontSize: 15, color: "var(--text)", fontWeight: 700 }}>
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
