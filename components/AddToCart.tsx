"use client";
import { useState } from "react";
import { Check, Package } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { urunDesi } from "@/lib/kargo";
import AdetSecici from "@/components/AdetSecici";

export default function AddToCart({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [q, setQ] = useState(1);
  const [ok, setOk] = useState(false);

  const koli = (product as any).koli_adet as number | undefined;
  const stok = Math.max(1, product.stock);

  const sepeteEkle = (adet: number) => {
    add({ slug: product.slug, name: product.name, price: product.price, price_kdv: product.price_kdv,
          image: product.images[0] || "", stock: product.stock,
          desi: urunDesi(product), kategori: product.category,
          olcu3: product.olcu3, geo: product.geo, agirlik_kg: product.agirlik_kg,
          agirlikli: (product as any).agirlikli,
          koli_olcu: (product as any).koli_olcu, koli_adet: koli }, adet);
    setOk(true); setTimeout(() => setOk(false), 1800);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <AdetSecici deger={q} setDeger={setQ} stok={stok} />
        <button className="btn btn-solid" style={{ flex: 1, minWidth: 190,
                 background: ok ? "#128A4A" : undefined, borderColor: ok ? "#128A4A" : undefined }}
          disabled={product.stock <= 0}
          onClick={() => sepeteEkle(q)}>
          {ok ? <><Check size={17} /> Eklendi</> : "Sepete ekle"}
        </button>
      </div>

      {/* Toplu alımda en sık istenen miktar bir koli — tek tıkla eklensin */}
      {koli && koli > 1 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <span className="eyebrow" style={{ color: "var(--dim)" }}>Hızlı ekle</span>
          {[1, 2, 5].map((n) => (
            <button key={n} type="button" onClick={() => sepeteEkle(koli * n)}
              className="btn btn-ghost"
              style={{ padding: "9px 13px", fontSize: 11, display: "inline-flex", gap: 6 }}>
              <Package size={13} /> {n} koli · {koli * n} adet
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
