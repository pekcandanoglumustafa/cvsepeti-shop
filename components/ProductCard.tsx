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
      {/* Image container */}
      <div
        style={{
          background: "var(--off-white)",
          borderRadius: 18,
          overflow: "hidden",
          aspectRatio: "1 / 1",
          position: "relative",
          marginBottom: 12,
        }}
      >
        {img ? (
          <Image
            src={img}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: "contain", padding: 20, transition: "transform 0.4s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }}
            unoptimized
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-tertiary)", fontSize: 13 }}>
            Görsel yok
          </div>
        )}
        {product.stock <= 0 && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>Stokta Yok</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>
          {product.category}
        </p>
        <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 4 }}>
          {product.name}
        </p>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", fontWeight: 500 }}>
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
