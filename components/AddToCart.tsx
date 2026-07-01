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
      <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12, padding: "10px 16px", width: "fit-content" }}>
        <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "flex", alignItems: "center", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          <Minus size={16} />
        </button>
        <span style={{ fontSize: 16, fontWeight: 600, minWidth: 24, textAlign: "center", color: "var(--text)" }}>{qty}</span>
        <button onClick={() => setQty(qty + 1)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "flex", alignItems: "center", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        disabled={product.stock <= 0}
        style={{
          background: added ? "rgba(34,197,94,0.15)" : "var(--grad)",
          color: added ? "#22c55e" : "#fff",
          border: added ? "1px solid rgba(34,197,94,0.3)" : "1px solid transparent",
          borderRadius: 12,
          padding: "16px",
          fontSize: 16,
          fontWeight: 700,
          cursor: product.stock <= 0 ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all 0.25s",
          opacity: product.stock <= 0 ? 0.4 : 1,
        }}
      >
        {added ? <Check size={20} /> : <ShoppingBag size={20} />}
        {added ? "Sepete eklendi ✓" : "Sepete Ekle"}
      </button>
    </div>
  );
}
