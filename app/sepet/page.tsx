"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const { items, remove, setQty, total } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <main style={{ padding: "60px 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <ShoppingCart size={32} color="var(--text-tertiary)" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Sepetiniz Boş</h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24 }}>Alışverişe başlamak için ürünlerimizi inceleyin.</p>
          <Link href="/urunler" className="btn-primary">Ürünlere Git →</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: "24px 0 48px" }}>
      <div className="container">
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24, color: "var(--text)" }}>Sepetim ({items.reduce((s,i)=>s+i.qty,0)} ürün)</h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, alignItems: "start" }} className="cart-grid">
          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map(item => (
              <div key={item.slug} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: 16, display: "flex", gap: 14, alignItems: "center", boxShadow: "var(--shadow-sm)" }}>
                <Link href={`/urun/${item.slug}`} style={{ position: "relative", width: 72, height: 72, flexShrink: 0, borderRadius: 7, overflow: "hidden", background: "var(--surface-2)", border: "1px solid var(--border)", display: "block" }}>
                  {item.image && <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} unoptimized />}
                </Link>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link href={`/urun/${item.slug}`} style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", textDecoration: "none", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 3 }}>
                    {item.name}
                  </Link>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "var(--orange)", marginBottom: 10 }}>{formatPrice(item.price)}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ display: "flex", border: "1px solid var(--border)", borderRadius: 6, overflow: "hidden" }}>
                      <button onClick={() => setQty(item.slug, item.qty - 1)} style={{ background: "var(--surface-2)", border: "none", cursor: "pointer", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}><Minus size={12} /></button>
                      <span style={{ width: 36, height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>{item.qty}</span>
                      <button onClick={() => setQty(item.slug, item.qty + 1)} style={{ background: "var(--surface-2)", border: "none", cursor: "pointer", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}><Plus size={12} /></button>
                    </div>
                    <button onClick={() => remove(item.slug)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)", display: "flex", padding: 4, transition: "color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#e53e3e"}
                      onMouseLeave={e => e.currentTarget.style.color = "var(--text-tertiary)"}
                    ><Trash2 size={15} /></button>
                  </div>
                </div>
                <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text)", marginLeft: 8, whiteSpace: "nowrap" }}>
                  {formatPrice(item.price * item.qty)}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: 20, position: "sticky", top: 80, boxShadow: "var(--shadow-sm)" }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>Sipariş Özeti</h2>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
              <span>Ara Toplam</span><span>{formatPrice(total())}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
              <span>Kargo</span><span style={{ color: "var(--green)", fontWeight: 600 }}>Hesaplanacak</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 800, color: "var(--text)", paddingTop: 12, borderTop: "1px solid var(--border)", marginBottom: 16 }}>
              <span>Toplam</span><span style={{ color: "var(--orange)" }}>{formatPrice(total())}</span>
            </div>
            <Link href="/odeme" className="btn-primary" style={{ display: "flex", justifyContent: "center", padding: "13px", borderRadius: 7, fontSize: 14, gap: 6 }}>
              Ödemeye Geç <ArrowRight size={16} />
            </Link>
            <Link href="/urunler" style={{ display: "flex", justifyContent: "center", marginTop: 10, fontSize: 13, color: "var(--text-tertiary)", textDecoration: "none" }}>
              Alışverişe Devam Et
            </Link>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .cart-grid { grid-template-columns: 1fr !important; } }`}</style>
    </main>
  );
}
