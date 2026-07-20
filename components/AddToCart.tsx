"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export default function AddToCart({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add({ slug: product.slug, name: product.name, price: product.price, image: product.images[0] || "", stock: product.stock }, qty);
    setAdded(true);
    window.dispatchEvent(new CustomEvent("cart:added", { detail: { name: product.name } }));
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Qty selector */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1.5px solid var(--border)", borderRadius: 7, overflow: "hidden", width: "fit-content" }}>
        <button onClick={() => setQty(Math.max(1, qty - 1))}
          style={{ background: "var(--surface-2)", border: "none", cursor: "pointer", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", transition: "background 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#eee"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--surface-2)"}
        ><Minus size={14} /></button>
        <span style={{ width: 40, textAlign: "center", fontWeight: 700, fontSize: 14, color: "var(--text)", borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)", height: 36, lineHeight: "36px" }}>{qty}</span>
        <button onClick={() => setQty(qty + 1)}
          style={{ background: "var(--surface-2)", border: "none", cursor: "pointer", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", transition: "background 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#eee"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--surface-2)"}
        ><Plus size={14} /></button>
      </div>

      {/* Add button */}
      <button onClick={handleAdd} disabled={product.stock <= 0} className="btn-primary"
        style={{ background: added ? "var(--green)" : "var(--orange)", justifyContent: "center", padding: "13px", fontSize: 14, borderRadius: 7, opacity: product.stock <= 0 ? 0.5 : 1 }}>
        {added ? <Check size={16} /> : <ShoppingCart size={16} />}
        {added ? "Sepete Eklendi!" : "Sepete Ekle"}
      </button>
    </div>
  );
}
