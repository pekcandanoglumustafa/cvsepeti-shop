"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { categories, categorySlug } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const count = useCart((s) => s.count());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(9,9,11,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            width: 32, height: 32, borderRadius: 8,
            background: "var(--grad)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 700, color: "#fff",
          }}>C</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>CV Sepeti</span>
        </Link>

        {/* Nav desktop */}
        <nav style={{ display: "none", alignItems: "center", gap: 4 }} className="desktop-nav">
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "var(--text-secondary)", fontSize: 14, fontWeight: 500, padding: "8px 12px", borderRadius: 8, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              Kategoriler <ChevronDown size={14} />
            </button>
            {catOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 8px)", left: 0,
                background: "var(--surface)", border: "1px solid var(--border-solid)",
                borderRadius: 12, padding: "8px", minWidth: 220,
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}>
                {categories.map((c) => (
                  <Link key={c} href={`/kategori/${categorySlug(c)}`}
                    style={{ display: "block", padding: "8px 12px", color: "var(--text-secondary)", fontSize: 13, textDecoration: "none", borderRadius: 8, transition: "background 0.15s, color 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--surface-2)"; e.currentTarget.style.color = "var(--text)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                  >{c}</Link>
                ))}
              </div>
            )}
          </div>
          {[["Tüm Ürünler", "/urunler"], ["Hakkımızda", "#hakkimizda"]].map(([label, href]) => (
            <Link key={label} href={href}
              style={{ color: "var(--text-secondary)", fontSize: 14, fontWeight: 500, padding: "8px 12px", borderRadius: 8, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
            >{label}</Link>
          ))}
        </nav>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="https://wa.me/905076584245"
            style={{ display: "none", background: "var(--grad)", color: "#fff", padding: "8px 18px", borderRadius: 980, fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "opacity 0.2s" }}
            className="desktop-cta"
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >Teklif Al</a>

          <Link href="/sepet" style={{ position: "relative", color: "var(--text-secondary)", textDecoration: "none", display: "flex", alignItems: "center", padding: 8, borderRadius: 8, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <ShoppingBag size={20} />
            {mounted && count > 0 && (
              <span style={{ position: "absolute", top: 2, right: 2, background: "var(--orange)", color: "#fff", fontSize: 9, fontWeight: 700, width: 15, height: 15, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {count}
              </span>
            )}
          </Link>

          <button className="mobile-menu-btn" onClick={() => setOpen(!open)}
            style={{ background: "none", border: "1px solid var(--border-solid)", cursor: "pointer", color: "var(--text)", padding: "6px 8px", borderRadius: 8, display: "flex", alignItems: "center" }}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", padding: "20px 24px 32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: "60vh", overflowY: "auto" }}>
            <Link href="/urunler" onClick={() => setOpen(false)}
              style={{ color: "var(--text)", fontSize: 15, fontWeight: 600, textDecoration: "none", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              Tüm Ürünler
            </Link>
            {categories.map((c) => (
              <Link key={c} href={`/kategori/${categorySlug(c)}`} onClick={() => setOpen(false)}
                style={{ color: "var(--text-secondary)", fontSize: 14, textDecoration: "none", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                {c}
              </Link>
            ))}
          </div>
          <a href="https://wa.me/905076584245" style={{ display: "block", marginTop: 20, textAlign: "center", background: "var(--grad)", color: "#fff", padding: "14px", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
            WhatsApp'tan Teklif Al
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: inline-flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
