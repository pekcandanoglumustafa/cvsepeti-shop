"use client";

import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { categories, categorySlug } from "@/lib/products";
import { useCart } from "@/lib/cart";

const categoryEmoji: Record<string, string> = {
  "Trafik Konisi & Duba": "🚧",
  "Trafik Uyarı Levhaları": "🚦",
  "Yalıtım Malzemesi": "🏗️",
  "Yol İşaretleme & Kasis": "🛑",
  "Dikme & Panel Sistemleri": "⚠️",
  "Delinatör": "🔶",
  "İş Güvenliği Ekipmanları": "🦺",
  "Güvenlik Bariyeri & Aynası": "🪞",
  "Araç Stoperi": "🚗",
  "Elektrikçi Eldiveni": "⚡",
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCart((s) => s.count());

  useEffect(() => { setMounted(true); }, []);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
      {/* ── Üst bar ── */}
      <div style={{ background: "var(--dark)", color: "#ddd", fontSize: 12 }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 34, gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, minWidth: 0 }}>
            <a href="tel:05076584245" style={{ display: "flex", alignItems: "center", gap: 5, color: "#fff", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>
              <Phone size={12} /> 0 507 658 42 45
            </a>
            <a href="mailto:info@cvsepeti.org" style={{ display: "none", alignItems: "center", gap: 5, color: "#ddd", textDecoration: "none", whiteSpace: "nowrap" }} className="topbar-mail">
              <Mail size={12} /> info@cvsepeti.org
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ display: "none", whiteSpace: "nowrap" }} className="topbar-ship">🚚 Türkiye&apos;nin Her Yerine Hızlı Kargo</span>
            <a href="https://wa.me/905076584245" style={{ background: "var(--orange)", color: "#fff", padding: "4px 12px", borderRadius: 4, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap", fontSize: 11, letterSpacing: "0.04em" }}>
              KURUMSAL TEKLİF AL
            </a>
          </div>
        </div>
      </div>

      {/* ── Ana header ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 20, height: 72 }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 20 }}>C</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", lineHeight: 1.1 }}>CV SEPETİ</div>
              <div style={{ fontSize: 10, color: "var(--text-tertiary)", lineHeight: 1, letterSpacing: "0.06em" }}>TRAFİK & İŞ GÜVENLİĞİ</div>
            </div>
          </Link>

          <div style={{ flex: 1, display: "none" }} className="header-search">
            <SearchBar />
          </div>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            <Link href="/sepet" style={{ position: "relative", color: "var(--text)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 6, border: "1.5px solid var(--border)", fontSize: 13, fontWeight: 700, transition: "border-color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--orange)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <ShoppingCart size={19} />
              <span className="cart-label">Sepetim</span>
              {mounted && count > 0 && (
                <span style={{ position: "absolute", top: -7, right: -7, background: "var(--orange)", color: "#fff", fontSize: 10, fontWeight: 800, minWidth: 19, height: 19, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px", border: "2px solid #fff" }}>
                  {count}
                </span>
              )}
            </Link>
            <button className="mobile-menu-btn" onClick={() => setOpen(!open)}
              style={{ background: "none", border: "1.5px solid var(--border)", cursor: "pointer", color: "var(--text)", padding: "8px 9px", borderRadius: 6, display: "flex", alignItems: "center" }}>
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Kategori nav barı (turuncu) ── */}
      <div style={{ background: "var(--orange)", display: "none" }} className="nav-bar">
        <div className="container" style={{ display: "flex", alignItems: "stretch", height: 44 }}>
          {/* Tüm Kategoriler mega dropdown */}
          <div style={{ position: "relative" }}
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button style={{ height: "100%", display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.15)", border: "none", cursor: "pointer", color: "#fff", fontSize: 14, fontWeight: 700, padding: "0 20px" }}>
              <Menu size={16} /> TÜM KATEGORİLER <ChevronDown size={14} />
            </button>
            {megaOpen && (
              <div style={{ position: "absolute", top: "100%", left: 0, background: "#fff", border: "1px solid var(--border)", borderTop: "none", minWidth: 620, boxShadow: "var(--shadow-lg)", display: "grid", gridTemplateColumns: "1fr 1fr", padding: 10, gap: 2, borderRadius: "0 0 10px 10px" }}>
                {categories.map((c) => (
                  <Link key={c} href={`/kategori/${categorySlug(c)}`}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", color: "var(--text)", fontSize: 14, fontWeight: 500, textDecoration: "none", borderRadius: 7, transition: "background 0.1s, color 0.1s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--orange-light)"; e.currentTarget.style.color = "var(--orange)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text)"; }}
                  >
                    <span style={{ fontSize: 20 }}>{categoryEmoji[c] || "📦"}</span> {c}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Hızlı linkler */}
          {[
            ["Tüm Ürünler", "/urunler"],
            ["Trafik Konisi", `/kategori/${categorySlug("Trafik Konisi & Duba")}`],
            ["Uyarı Levhaları", `/kategori/${categorySlug("Trafik Uyarı Levhaları")}`],
            ["Delinatör", `/kategori/${categorySlug("Delinatör")}`],
            ["Yalıtım", `/kategori/${categorySlug("Yalıtım Malzemesi")}`],
            ["İş Güvenliği", `/kategori/${categorySlug("İş Güvenliği Ekipmanları")}`],
          ].map(([label, href]) => (
            <Link key={label} href={href}
              style={{ display: "flex", alignItems: "center", color: "#fff", fontSize: 13.5, fontWeight: 600, padding: "0 16px", textDecoration: "none", transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.12)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >{label}</Link>
          ))}
        </div>
      </div>

      {/* ── Mobil menü ── */}
      {open && (
        <div style={{ background: "#fff", borderTop: "1px solid var(--border)", padding: "12px 20px 24px", maxHeight: "70vh", overflowY: "auto" }}>
          <div style={{ marginBottom: 12 }}><SearchBar /></div>
          <Link href="/urunler" onClick={() => setOpen(false)}
            style={{ color: "var(--text)", fontSize: 15, fontWeight: 700, textDecoration: "none", padding: "12px 0", borderBottom: "1px solid var(--border)", display: "block" }}>
            Tüm Ürünler
          </Link>
          {categories.map((c) => (
            <Link key={c} href={`/kategori/${categorySlug(c)}`} onClick={() => setOpen(false)}
              style={{ color: "var(--text-secondary)", fontSize: 14, textDecoration: "none", padding: "10px 0", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
              <span>{categoryEmoji[c] || "📦"}</span> {c}
            </Link>
          ))}
          <a href="https://wa.me/905076584245" style={{ display: "flex", justifyContent: "center", marginTop: 16, background: "var(--orange)", color: "#fff", padding: "13px", borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
            WhatsApp&apos;tan Teklif Al
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .header-search { display: flex !important; }
          .nav-bar { display: block !important; }
          .mobile-menu-btn { display: none !important; }
          .topbar-mail { display: flex !important; }
          .topbar-ship { display: inline !important; }
        }
        @media (max-width: 500px) {
          .cart-label { display: none; }
        }
      `}</style>
    </header>
  );
}
