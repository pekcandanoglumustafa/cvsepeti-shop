"use client";
import { useEffect, useState } from "react";
import { Product } from "@/lib/products";
import Fiyat from "@/components/Fiyat";
import { useCart } from "@/lib/cart";
import { Check } from "lucide-react";

/** Mobilde sayfa kaydırılınca alta yapışan satın alma çubuğu */
export default function StickyBuyBar({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [gor, setGor] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const f = () => setGor(window.scrollY > 420);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <div className="sticky-buy" aria-hidden={!gor}
      style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 60,
               background: "#fff", borderTop: "2px solid var(--ink)",
               padding: "10px 16px calc(10px + env(safe-area-inset-bottom))",
               display: "flex", alignItems: "center", gap: 12,
               transform: gor ? "translateY(0)" : "translateY(110%)",
               transition: "transform .28s cubic-bezier(.2,.7,.2,1)" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p className="eyebrow" style={{ color: "var(--dim)" }}>{product.kod}</p>
        <Fiyat haric={product.price} dahil={product.price_kdv} boyut="kucuk" />
      </div>
      <button className="btn btn-solid" style={{ padding: "15px 22px", background: ok ? "#0B7A3B" : undefined, borderColor: ok ? "#0B7A3B" : undefined }}
        disabled={product.stock <= 0}
        onClick={() => {
          add({ slug: product.slug, name: product.name, price: product.price, price_kdv: product.price_kdv,
                image: product.images[0] || "", stock: product.stock,
                desi: product.desi, kategori: product.category,
                olcu3: product.olcu3, geo: product.geo, agirlik_kg: product.agirlik_kg, agirlikli: (product as any).agirlikli,
                koli_olcu: (product as any).koli_olcu, koli_adet: (product as any).koli_adet }, 1);
          setOk(true); setTimeout(() => setOk(false), 1800);
        }}>
        {ok ? <><Check size={15} /> Eklendi</> : "Sepete ekle"}
      </button>
      <style>{`.sticky-buy{display:none}@media(max-width:820px){.sticky-buy{display:flex}}`}</style>
    </div>
  );
}
