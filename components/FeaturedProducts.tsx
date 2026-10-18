"use client";
import { useState } from "react";
import type { KartUrun } from "@/lib/products";
import ProductCard from "./ProductCard";
export default function FeaturedProducts({
  selected,
  groups,
}: {
  selected: KartUrun[];
  groups: { name: string; products: KartUrun[] }[];
}) {
  const [tab, setTab] = useState(-1);
  return (
    <>
      <div
        className="section-tabs"
        role="group"
        aria-label="Öne çıkan ürün kategorileri"
      >
        {[
          "Sizin için seçtiklerimiz",
          "Trafik konileri",
          "Delinatörler",
          "Hız kesiciler",
        ].map((name, i) => (
          <button
            key={name}
            className={`pill${tab === i - 1 ? " active" : ""}`}
            aria-pressed={tab === i - 1}
            onClick={() => setTab(i - 1)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {(tab === -1 ? selected : groups[tab].products).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
