"use client";
import { useState } from "react";
import { Minus, Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export default function AddToCart({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [q, setQ] = useState(1);
  const [ok, setOk] = useState(false);

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", border: "2px solid var(--ink)" }}>
        <button onClick={() => setQ(Math.max(1, q - 1))} aria-label="azalt"
          style={{ padding: "14px 14px", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
          <Minus size={16} strokeWidth={2.5} />
        </button>
        <span style={{ minWidth: 34, textAlign: "center", fontWeight: 800 }}>{q}</span>
        <button onClick={() => setQ(q + 1)} aria-label="artır"
          style={{ padding: "14px 14px", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>
      <button className="btn btn-solid" style={{ flex: 1, minWidth: 190,
               background: ok ? "#128A4A" : undefined, borderColor: ok ? "#128A4A" : undefined }}
        disabled={product.stock <= 0}
        onClick={() => {
          add({ slug: product.slug, name: product.name, price: product.price,
                image: product.images[0] || "", stock: product.stock,
                desi: product.desi, kategori: product.category,
                olcu3: product.olcu3, geo: product.geo, agirlik_kg: product.agirlik_kg }, q);
          setOk(true); setTimeout(() => setOk(false), 1800);
        }}>
        {ok ? <><Check size={17} /> Eklendi</> : "Sepete ekle"}
      </button>
    </div>
  );
}
