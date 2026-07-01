"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

function formatPrice(n: number) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
}

export default function ProductCard({ product }: { product: Product }) {
  const img = product.images[0];
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    add({ slug: product.slug, name: product.name, price: product.price, image: img || "", stock: product.stock }, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <Link
      href={`/urun/${product.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", background: "#fff", borderRadius: 10, border: "1px solid var(--border)", overflow: "hidden", boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s, transform 0.15s", transform: hovered ? "translateY(-2px)" : "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "1 / 1", background: "#f9f9f9", overflow: "hidden" }}>
        {img ? (
          <Image
            src={img}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
            style={{ objectFit: "cover", transition: "transform 0.3s", transform: hovered ? "scale(1.05)" : "scale(1)" }}
            unoptimized
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-tertiary)", fontSize: 12 }}>Görsel yok</div>
        )}

        {/* Out of stock overlay */}
        {product.stock <= 0 && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ background: "#555", color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 4 }}>Stokta Yok</span>
          </div>
        )}

        {/* Add to cart button on hover */}
        {product.stock > 0 && (
          <button
            onClick={handleAdd}
            style={{
              position: "absolute", bottom: 8, left: 8, right: 8,
              background: added ? "#1a8f3c" : "var(--orange)",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "9px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.2s, transform 0.2s, background 0.2s",
              pointerEvents: hovered ? "auto" : "none",
            }}
          >
            <ShoppingCart size={14} />
            {added ? "Eklendi ✓" : "Sepete Ekle"}
          </button>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "10px 12px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <p style={{ fontSize: 11, color: "var(--orange)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          {product.category}
        </p>
        <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", flex: 1 }}>
          {product.name}
        </p>
        <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginTop: 4 }}>
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
