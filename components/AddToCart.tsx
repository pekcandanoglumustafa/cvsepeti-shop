"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export default function AddToCart({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add({ slug: product.slug, name: product.name, price: product.price, image: product.images[0] || "", stock: product.stock }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Qty */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--off-white)", borderRadius: 12, padding: "10px 16px", width: "fit-content" }}>
        <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", display: "flex", alignItems: "center" }}>
          <Minus size={16} />
        </button>
        <span style={{ fontSize: 17, fontWeight: 500, minWidth: 24, textAlign: "center" }}>{qty}</span>
        <button onClick={() => setQty(qty + 1)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", display: "flex", alignItems: "center" }}>
          <Plus size={16} />
        </button>
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        disabled={product.stock <= 0}
        style={{
          background: added ? "#1a7800" : "var(--blue)",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "16px",
          fontSize: 17,
          fontWeight: 500,
          cursor: product.stock <= 0 ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "background .2s",
          opacity: product.stock <= 0 ? 0.5 : 1,
        }}
      >
        {added ? <Check size={20} /> : <ShoppingBag size={20} />}
        {added ? "Sepete eklendi" : "Sepete ekle"}
      </button>
    </div>
  );
}
