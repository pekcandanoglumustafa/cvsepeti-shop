"use client";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  ShoppingBag,
  Search,
  Phone,
  LayoutGrid,
  ArrowUpRight,
} from "lucide-react";
import { categorySlug } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { FIRMA } from "@/lib/firma";

/** Üst menüde duran kategoriler — en çok satılan gruplar. */
const MENU = ["Trafik Konisi", "Delinatör"];

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState("");
  const count = useCart((s) => s.count());
  useEffect(() => setMounted(true), []);

  const ara = (e: React.FormEvent) => {
    e.preventDefault();
    const s = q.trim();
    router.push(s ? `/ara?q=${encodeURIComponent(s)}` : "/urunler");
    setOpen(false);
  };

  return (
    <>
      {/* Üst bant — doğrulanabilir üç bilgi. "Üreticiden doğrudan satış" ve
          "aynı gün kargo" ifadeleri kullanılmıyor: ürünler tedarikçiden
          alınıyor ve sitenin geri kalanı 1-2 iş günü diyor. */}
      <div className="topline">
        <div className="wrap">
          <span>Bireysel ve kurumsal fatura</span>
          <span>1-2 iş günü kargoda</span>
          <span>iyzico ile güvenli ödeme</span>
        </div>
      </div>

      <header className="site-header">
        <div className="wrap header-main">
          <Link href="/" aria-label="Trafik Ürünleri ana sayfa">
            <Logo />
          </Link>

          <form className="search" role="search" onSubmit={ara}>
            <Search
              size={17}
              strokeWidth={2.2}
              style={{ color: "#7C8586", flexShrink: 0 }}
              aria-hidden
            />
            <label className="sr-only" htmlFor="header-arama">
              Ürün, kategori veya ürün kodu ara
            </label>
            <input
              id="header-arama"
              name="q"
              autoComplete="off"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ürün, kategori veya ürün kodu ara…"
            />
            <button type="submit" aria-label="Ara">
              <ArrowUpRight size={17} strokeWidth={2.2} />
            </button>
          </form>

          <a className="header-phone" href={FIRMA.telefonHref}>
            <Phone size={20} strokeWidth={2} aria-hidden />
            <span className="yazi">
              <small>Ürün seçerken yardımcı olalım</small>
              <strong>{FIRMA.telefon}</strong>
            </span>
          </a>

          <button
            className="cart-trigger"
            aria-label={`Sepetim, ${mounted ? count : 0} ürün`}
            onClick={() => window.dispatchEvent(new CustomEvent("cart:open"))}
          >
            <ShoppingBag size={20} strokeWidth={2.1} aria-hidden />
            <span className="cart-label">Sepetim</span>
            <b>{mounted ? count : 0}</b>
          </button>

          <button
            className="menu-toggle icon-button"
            onClick={() => setOpen(!open)}
            aria-label="Menü"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div className={`nav-shell${open ? " mobile-open" : ""}`}>
          <nav
            onClick={() => setOpen(false)}
            className="wrap main-nav"
            aria-label="Ana menü"
          >
            <Link href="/urunler" className="all-products">
              <LayoutGrid size={16} strokeWidth={2.2} aria-hidden /> Tüm ürünler
            </Link>
            {MENU.map((c) => (
              <Link key={c} href={`/kategori/${categorySlug(c)}`}>
                {c}
              </Link>
            ))}
            <Link href="/urunler?use=otopark">Otopark ürünleri</Link>
            <Link href="/blog">Ürün seçim rehberi</Link>
            <Link href="/iletisim" className="nav-business">
              Kurumsal &amp; toplu alım{" "}
              <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
