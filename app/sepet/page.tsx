"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const { items, remove, setQty, total } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <main style={{ maxWidth: 600, margin: "0 auto", padding: "96px 24px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <ShoppingBag size={32} color="var(--text-tertiary)" />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 12, letterSpacing: "-0.02em" }}>Sepetiniz Boş</h1>
        <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 32 }}>
          Alışverişe başlamak için ürünlerimize göz atın.
        </p>
        <Link href="/urunler" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          Ürünleri Keşfet <ArrowRight size={16} />
        </Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 24px 96px" }}>
      <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text)", marginBottom: 40 }}>
        Sepetim
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }} className="cart-grid">
        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item) => (
            <div key={item.slug} style={{ display: "flex", gap: 16, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px", alignItems: "center" }}>
              <Link href={`/urun/${item.slug}`} style={{ position: "relative", width: 80, height: 80, flexShrink: 0, borderRadius: 10, overflow: "hidden", background: "var(--surface-2)", border: "1px solid var(--border)", display: "block" }}>
                {item.image && <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} unoptimized />}
              </Link>

              <div style={{ flex: 1, minWidth: 0 }}>
                <Link href={`/urun/${item.slug}`} style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", textDecoration: "none", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 4 }}>
                  {item.name}
                </Link>
                <p style={{ fontSize: 15, fontWeight: 700, color: "var(--orange)", marginBottom: 12 }}>{formatPrice(item.price)}</p>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: "4px 8px" }}>
                    <button onClick={() => setQty(item.slug, item.qty - 1)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "flex", padding: 2 }}><Minus size={14} /></button>
                    <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: "center", color: "var(--text)" }}>{item.qty}</span>
                    <button onClick={() => setQty(item.slug, item.qty + 1)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "flex", padding: 2 }}><Plus size={14} /></button>
                  </div>
                  <button onClick={() => remove(item.slug)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)", display: "flex", padding: 4, transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#ef4444")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-tertiary)")}
                  ><Trash2 size={16} /></button>
                </div>
              </div>

              <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)", marginLeft: 8, whiteSpace: "nowrap" }}>
                {formatPrice(item.price * item.qty)}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "28px", position: "sticky", top: 84 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.06em" }}>Sipariş Özeti</h2>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--text-secondary)", marginBottom: 10 }}>
            <span>Ürünler ({items.reduce((s, i) => s + i.qty, 0)} adet)</span>
            <span>{formatPrice(total())}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--text-tertiary)", marginBottom: 20 }}>
            <span>Kargo</span>
            <span>Ödeme adımında</span>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, marginBottom: 20, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>Toplam</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: "var(--orange)" }}>{formatPrice(total())}</span>
          </div>

          <Link href="/odeme" className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", borderRadius: 12, padding: "16px" }}>
            Ödemeye Geç <ArrowRight size={18} />
          </Link>
          <Link href="/urunler" style={{ display: "flex", justifyContent: "center", marginTop: 14, fontSize: 14, color: "var(--text-tertiary)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-tertiary)")}
          >
            Alışverişe devam et
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
