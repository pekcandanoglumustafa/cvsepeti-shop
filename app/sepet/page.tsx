"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const { items, remove, setQty, total } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-3">Sepetiniz Boş</h1>
        <p className="text-[var(--ink-soft)] mb-8">
          Alışverişe başlamak için ürünlerimize göz atın.
        </p>
        <Link
          href="/urunler"
          className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--paper)] px-6 py-3.5 font-display tag-stencil text-sm hover:bg-[var(--safety-orange)] transition-colors"
        >
          Ürünleri Keşfet <ArrowRight size={18} />
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl sm:text-4xl font-bold mb-8">
        Sepetim
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.slug}
              className="flex gap-4 border border-[var(--line)] bg-white p-4"
            >
              <Link
                href={`/urun/${item.slug}`}
                className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-white border border-[var(--line)] overflow-hidden"
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-1"
                    unoptimized
                  />
                )}
              </Link>
              <div className="flex-1 flex flex-col">
                <Link
                  href={`/urun/${item.slug}`}
                  className="font-medium text-sm sm:text-base hover:text-[var(--safety-orange)] line-clamp-2"
                >
                  {item.name}
                </Link>
                <span className="font-display font-semibold text-[var(--safety-orange-dark)] mt-1">
                  {formatPrice(item.price)}
                </span>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border border-[var(--ink)]">
                    <button
                      onClick={() => setQty(item.slug, item.qty - 1)}
                      className="p-2 hover:bg-[var(--paper-deep)]"
                      aria-label="Azalt"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center font-display font-semibold text-sm">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => setQty(item.slug, item.qty + 1)}
                      className="p-2 hover:bg-[var(--paper-deep)]"
                      aria-label="Arttır"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(item.slug)}
                    className="text-[var(--ink-soft)] hover:text-[var(--safety-orange)] p-2"
                    aria-label="Kaldır"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end justify-center font-display font-bold text-lg">
                {formatPrice(item.price * item.qty)}
              </div>
            </div>
          ))}
        </div>

        <div className="border border-[var(--line)] bg-white p-6 h-fit sticky top-24">
          <h2 className="font-display tag-stencil text-sm mb-4">
            Sipariş Özeti
          </h2>
          <div className="flex justify-between text-sm mb-2">
            <span>Ürünler ({items.reduce((s, i) => s + i.qty, 0)})</span>
            <span>{formatPrice(total())}</span>
          </div>
          <div className="flex justify-between text-sm mb-4 text-[var(--ink-soft)]">
            <span>Kargo</span>
            <span>Ödeme adımında hesaplanır</span>
          </div>
          <div className="hazard-stripe-thin mb-4" />
          <div className="flex justify-between font-display text-xl font-bold mb-6">
            <span>Toplam</span>
            <span className="text-[var(--safety-orange-dark)]">
              {formatPrice(total())}
            </span>
          </div>
          <Link
            href="/odeme"
            className="flex items-center justify-center gap-2 w-full bg-[var(--ink)] text-[var(--paper)] py-4 font-display tag-stencil text-sm hover:bg-[var(--safety-orange)] transition-colors"
          >
            Ödemeye Geç <ArrowRight size={18} />
          </Link>
          <Link
            href="/urunler"
            className="flex items-center justify-center mt-3 text-sm text-[var(--ink-soft)] hover:text-[var(--safety-orange)]"
          >
            Alışverişe devam et
          </Link>
        </div>
      </div>
    </main>
  );
}
