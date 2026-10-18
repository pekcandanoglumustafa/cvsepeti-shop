import { create } from "zustand";
import type { KartUrun } from "./products";
export const useCompare = create<{
  items: KartUrun[];
  toggle: (p: KartUrun) => void;
  clear: () => void;
}>((set) => ({
  items: [],
  toggle: (p) =>
    set((s) => ({
      items: s.items.some((x) => x.id === p.id)
        ? s.items.filter((x) => x.id !== p.id)
        : s.items.length < 3
          ? [...s.items, p]
          : s.items,
    })),
  clear: () => set({ items: [] }),
}));
