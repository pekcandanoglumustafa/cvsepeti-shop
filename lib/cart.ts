"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  stock: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
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
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: "cvsepeti-cart" }
  )
);
