"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Product } from "@/lib/products";

export default function AddToCart({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);
  const router = useRouter();

  const outOfStock = product.stock <= 0;

  const handleAdd = () => {
    add(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0] || "",
        stock: product.stock,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-[var(--line)] rounded-md">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="p-3 hover:bg-[var(--surface-2)] transition-colors"
            aria-label="Azalt"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center font-display font-semibold">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
            className="p-3 hover:bg-[var(--surface-2)] transition-colors"
            aria-label="Arttır"
          >
            <Plus size={16} />
          </button>
        </div>
        <span className="text-sm text-[var(--ink-soft)]">
          {product.stock > 0
            ? `${product.stock} adet stokta`
            : "Stokta yok"}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleAdd}
          disabled={outOfStock}
          className="flex-1 flex items-center justify-center gap-2 bg-[var(--gold)] text-[var(--ink)] py-4 font-display tag-stencil text-sm rounded-md hover:bg-[var(--gold-dark)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          {added ? "Sepete Eklendi" : "Sepete Ekle"}
        </button>
        <button
          type="button"
          onClick={() => {
            handleAdd();
            router.push("/sepet");
          }}
          disabled={outOfStock}
          className="flex-1 flex items-center justify-center gap-2 border-2 border-[var(--gold)] text-[var(--gold)] py-4 font-display tag-stencil text-sm rounded-md hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Hemen Al
        </button>
      </div>
    </div>
  );
}
