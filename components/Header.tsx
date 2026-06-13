"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X, Phone } from "lucide-react";
import { categories, categorySlug } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function Header() {
  const [open, setOpen] = useState(false);
  const count = useCart((s) => s.count());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 bg-[var(--paper)]">
      <div className="bg-[var(--ink)] text-[var(--paper)] text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-2">
          <span className="tag-stencil tracking-wider">
            Fiyatlarımıza kargo dahil değildir
          </span>
          <a
            href="tel:05076584245"
            className="flex items-center gap-1.5 hover:text-[var(--safety-orange)] transition-colors"
          >
            <Phone size={14} />
            <span>0 507 658 42 45</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
          CV<span className="text-[var(--safety-orange)]">SEPETİ</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 font-display tag-stencil text-sm">
          <Link href="/" className="hover:text-[var(--safety-orange)] transition-colors">
            Ana Sayfa
          </Link>
          <Link href="/urunler" className="hover:text-[var(--safety-orange)] transition-colors">
            Tüm Ürünler
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/sepet"
            className="relative flex items-center gap-2 bg-[var(--ink)] text-[var(--paper)] px-3 sm:px-4 py-2 rounded-sm font-display tag-stencil text-sm hover:bg-[var(--safety-orange)] transition-colors"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Sepet</span>
            {mounted && count > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--safety-orange)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </Link>
          <button
            className="lg:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menü"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--line)] bg-[var(--paper)] px-4 py-4">
          <div className="flex flex-col gap-3 font-display tag-stencil text-sm">
            <Link href="/" onClick={() => setOpen(false)}>
              Ana Sayfa
            </Link>
            <Link href="/urunler" onClick={() => setOpen(false)}>
              Tüm Ürünler
            </Link>
            <div className="hazard-stripe-thin my-2" />
            <p className="text-xs text-[var(--ink-soft)] normal-case font-body tracking-normal mb-1">
              Kategoriler
            </p>
            {categories.map((c) => (
              <Link
                key={c}
                href={`/kategori/${categorySlug(c)}`}
                onClick={() => setOpen(false)}
                className="text-[var(--ink-soft)] hover:text-[var(--safety-orange)]"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="hazard-stripe-thin" />

      <div className="hidden lg:block bg-white border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-6 overflow-x-auto text-xs">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/kategori/${categorySlug(c)}`}
              className="tag-stencil whitespace-nowrap text-[var(--ink-soft)] hover:text-[var(--safety-orange)] transition-colors"
            >
              {c}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
