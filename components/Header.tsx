"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X, Search, ChevronDown, Phone } from "lucide-react";
import { categories, categorySlug } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCart((s) => s.count());

  useEffect(() => { setMounted(true); }, []);

  return (
    <header style={{ background: "#fff", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      {/* Top bar */}
      <div style={{ background: "var(--orange)", color: "#fff", fontSize: 12, padding: "5px 0", textAlign: "center" }}>
        <span>📞 <a href="tel:05076584245" style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}>0 507 658 42 45</a> &nbsp;·&nbsp; Hızlı Kargo &nbsp;·&nbsp; iyzico ile Güvenli Ödeme &nbsp;·&nbsp; <a href="https://wa.me/905076584245" style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}>WhatsApp Sipariş</a></span>
      </div>

      {/* Main header */}
      <div className="container" style={{ height: 64, display: "flex", alignItems: "center", gap: 24 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 18 }}>C</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", lineHeight: 1.1 }}>CV Sepeti</div>
            <div style={{ fontSize: 10, color: "var(--text-tertiary)", lineHeight: 1 }}>Konya Teknokent</div>
          </div>
        </Link>

        {/* Search bar - desktop */}
        <div style={{ flex: 1, maxWidth: 480, display: "none", alignItems: "center", background: "var(--surface-2)", border: "1.5px solid var(--border)", borderRadius: 8, overflow: "hidden" }} className="search-bar">
          <Search size={16} style={{ marginLeft: 12, color: "var(--text-tertiary)", flexShrink: 0 }} />
          <input placeholder="Ürün ara..." style={{ flex: 1, padding: "9px 12px", background: "none", border: "none", outline: "none", fontSize: 14, color: "var(--text)" }} />
        </div>

        {/* Nav desktop */}
        <nav style={{ display: "none", alignItems: "center", gap: 2 }} className="desktop-nav">
          <div style={{ position: "relative" }}
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: "var(--text)", fontSize: 14, fontWeight: 500, padding: "8px 12px", borderRadius: 6, transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--surface-2)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              Kategoriler <ChevronDown size={14} />
            </button>
            {catOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: 8, minWidth: 240, boxShadow: "var(--shadow-lg)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                {categories.map((c) => (
                  <Link key={c} href={`/kategori/${categorySlug(c)}`}
                    style={{ display: "block", padding: "7px 10px", color: "var(--text-secondary)", fontSize: 13, textDecoration: "none", borderRadius: 6, transition: "background 0.1s, color 0.1s", lineHeight: 1.3 }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--orange-light)"; e.currentTarget.style.color = "var(--orange)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                  >{c}</Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/urunler" style={{ color: "var(--text)", fontSize: 14, fontWeight: 500, padding: "8px 12px", borderRadius: 6, textDecoration: "none", transition: "background 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-2)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >Tüm Ürünler</Link>
        </nav>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <a href="https://wa.me/905076584245" style={{ display: "none", background: "var(--orange)", color: "#fff", padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: "none" }} className="whatsapp-btn">
            WhatsApp Sipariş
          </a>

          <Link href="/sepet" style={{ position: "relative", color: "var(--text)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 6, border: "1.5px solid var(--border)", fontSize: 13, fontWeight: 600, transition: "border-color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--orange)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <ShoppingCart size={18} />
            <span className="cart-label">Sepet</span>
            {mounted && count > 0 && (
              <span style={{ background: "var(--orange)", color: "#fff", fontSize: 10, fontWeight: 700, minWidth: 18, height: 18, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
                {count}
              </span>
            )}
          </Link>

          <button className="mobile-menu-btn" onClick={() => setOpen(!open)}
            style={{ background: "none", border: "1.5px solid var(--border)", cursor: "pointer", color: "var(--text)", padding: "7px 8px", borderRadius: 6, display: "flex", alignItems: "center" }}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "#fff", borderTop: "1px solid var(--border)", padding: "12px 20px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Link href="/urunler" onClick={() => setOpen(false)}
              style={{ color: "var(--text)", fontSize: 15, fontWeight: 700, textDecoration: "none", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
              Tüm Ürünler
            </Link>
            <div style={{ padding: "8px 0 4px", fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid var(--border)", marginBottom: 4 }}>KATEGORİLER</div>
            {categories.map((c) => (
              <Link key={c} href={`/kategori/${categorySlug(c)}`} onClick={() => setOpen(false)}
                style={{ color: "var(--text-secondary)", fontSize: 14, textDecoration: "none", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                {c}
              </Link>
            ))}
          </div>
          <a href="https://wa.me/905076584245" style={{ display: "flex", justifyContent: "center", marginTop: 16, background: "var(--orange)", color: "#fff", padding: "13px", borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
            WhatsApp&apos;tan Sipariş Ver
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .whatsapp-btn { display: flex !important; }
          .search-bar { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 500px) {
          .cart-label { display: none; }
        }
      `}</style>
    </header>
  );
}
