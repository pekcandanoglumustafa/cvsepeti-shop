"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { categories, categorySlug } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function Header() {
  const [open, setOpen] = useState(false);
  const count = useCart((s) => s.count());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "saturate(180%) blur(20px)", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-[980px] mx-auto px-5 h-12 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" style={{ color: "var(--text)", fontSize: 21, fontWeight: 600, letterSpacing: "-0.01em", textDecoration: "none" }}>
          CV Sepeti
        </Link>

        {/* Nav - desktop */}
        <nav className="hidden lg:flex items-center gap-6">
          {categories.slice(0, 6).map((c) => (
            <Link
              key={c}
              href={`/kategori/${categorySlug(c)}`}
              style={{ color: "var(--text-secondary)", fontSize: 12, textDecoration: "none", whiteSpace: "nowrap", transition: "color .2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {c}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link href="/urunler" style={{ color: "var(--text-secondary)", fontSize: 12, textDecoration: "none", transition: "color .2s" }}>
            Tüm Ürünler
          </Link>
          <Link href="/sepet" style={{ position: "relative", color: "var(--text)", textDecoration: "none", display: "flex", alignItems: "center" }}>
            <ShoppingBag size={18} />
            {mounted && count > 0 && (
              <span style={{ position: "absolute", top: -6, right: -6, background: "var(--orange)", color: "#fff", fontSize: 10, fontWeight: 700, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {count}
              </span>
            )}
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)" }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "var(--white)", borderTop: "1px solid var(--border)", padding: "16px 20px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {categories.map((c) => (
              <Link
                key={c}
                href={`/kategori/${categorySlug(c)}`}
                onClick={() => setOpen(false)}
                style={{ color: "var(--text)", fontSize: 15, textDecoration: "none", borderBottom: "1px solid var(--border)", paddingBottom: 16 }}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
