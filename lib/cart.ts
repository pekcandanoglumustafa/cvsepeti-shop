"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toplamDesi, kargoUcreti } from "./kargo";

export type CartItem = {
  slug: string;
  name: string;
  price: number;        // KDV hariç
  price_kdv: number;    // KDV dahil
  image: string;
  qty: number;
  stock: number;
  desi: number;
  kategori: string;
  olcu3: number[];
  geo: string;
  agirlik_kg: number;
  agirlikli?: boolean;
};

export type KargoOdeme = "pesin" | "karsi";

type CartState = {
  items: CartItem[];
  kargoOdeme: KargoOdeme;
  setKargoOdeme: (v: KargoOdeme) => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  total: () => number;        // KDV hariç ara toplam
  totalKdv: () => number;     // KDV dahil ara toplam
  kdvTutar: () => number;
  count: () => number;
  kargoDesi: () => number;
  kargo: () => number;
  genelToplam: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      kargoOdeme: "pesin" as KargoOdeme,
      setKargoOdeme: (v) => set({ kargoOdeme: v }),
      add: (item, qty = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.slug === item.slug);
        if (existing) {
          set({
            items: items.map((i) =>
              i.slug === item.slug
                ? { ...i, qty: Math.min(i.qty + qty, i.stock || 999) }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, qty }] });
        }
        // sepet çekmecesini aç
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("cart:added", { detail: { name: item.name } }));
        }
      },
      remove: (slug) =>
        set({ items: get().items.filter((i) => i.slug !== slug) }),
      setQty: (slug, qty) =>
        set({
          items: get()
            .items.map((i) =>
              i.slug === slug
                ? { ...i, qty: Math.max(1, Math.min(qty, i.stock || 999)) }
                : i
            ),
        }),
      clear: () => set({ items: [] }),
      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      totalKdv: () =>
        get().items.reduce((sum, i) => sum + (i.price_kdv ?? i.price * 1.2) * i.qty, 0),
      kdvTutar: () => get().totalKdv() - get().total(),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      kargoDesi: () =>
        toplamDesi(
          get().items.map((i) => ({
            olcu3: i.olcu3 || [25, 20, 12],
            geo: (i.geo || "HACIMLI") as any,
            agirlik_kg: i.agirlik_kg || 0,
            agirlikli: i.agirlikli,
            adet: i.qty,
          }))
        ),
      kargo: () => kargoUcreti(get().kargoDesi()),
      genelToplam: () =>
        get().totalKdv() + (get().kargoOdeme === "karsi" ? 0 : get().kargo()),
    }),
    { name: "cvsepeti-cart" }
  )
);
