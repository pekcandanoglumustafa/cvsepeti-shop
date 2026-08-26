"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { categories, categorySlug } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCart((s) => s.count());
  useEffect(() => setMounted(true), []);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "var(--paper)" }}>
      <div style={{ borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 20px", height: 74,
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <Link href="/" className="display" style={{ fontSize: 25, textDecoration: "none", color: "var(--ink)", letterSpacing: "-0.045em" }}>
            CV Sepeti
          </Link>

          <nav className="hidden lg:flex" style={{ gap: 26 }}>
            {["Delinatör","Trafik Konisi","Hız Kesici Kasis","Güvenlik Bariyeri","Araç Stoperi"].map((c) => (
              <Link key={c} href={`/kategori/${categorySlug(c)}`} className="label"
                    style={{ color: "var(--muted)", textDecoration: "none" }}>{c}</Link>
            ))}
            <Link href="/urunler" className="label" style={{ color: "var(--ink)", textDecoration: "none" }}>
              Tüm Katalog
            </Link>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Link href="/sepet" aria-label="Sepet"
                  style={{ position: "relative", color: "var(--ink)", display: "flex" }}>
              <ShoppingBag size={20} strokeWidth={2.4} />
              {mounted && count > 0 && (
                <span style={{ position: "absolute", top: -7, right: -9, background: "var(--hi)", color: "#fff",
                               fontSize: 10, fontWeight: 800, minWidth: 17, height: 17, borderRadius: 9,
                               display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
                  {count}
                </span>
              )}
            </Link>
            <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menü"
                    style={{ background: "none", border: "none", color: "var(--ink)", cursor: "pointer", display: "flex" }}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
      <div className="band-thin" />

      {open && (
        <div style={{ background: "var(--paper)", borderBottom: "1px solid var(--line)",
                      maxHeight: "70vh", overflowY: "auto", padding: "8px 20px 24px" }}>
          {categories.map((c) => (
            <Link key={c} href={`/kategori/${categorySlug(c)}`} onClick={() => setOpen(false)}
                  className="label"
                  style={{ display: "block", padding: "14px 0", borderBottom: "1px solid var(--line)",
                           color: "var(--ink)", textDecoration: "none" }}>
              {c}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
