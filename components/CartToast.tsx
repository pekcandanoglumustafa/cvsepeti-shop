"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";

export default function CartToast() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { name?: string };
      setName(detail?.name || "Ürün");
      setVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 4500);
    };
    window.addEventListener("cart:added", handler);
    return () => { window.removeEventListener("cart:added", handler); clearTimeout(timer); };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", left: "50%", bottom: 20, transform: "translateX(-50%)",
      zIndex: 60, background: "#1c1c1c", color: "#fff",
      borderRadius: 12, padding: "12px 14px 12px 18px",
      display: "flex", alignItems: "center", gap: 14,
      boxShadow: "0 10px 34px rgba(0,0,0,0.35)",
      maxWidth: "calc(100vw - 32px)", width: 440,
    }}>
      <span style={{ fontSize: 13.5, lineHeight: 1.4, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
        ✓ <strong>{name}</strong> sepete eklendi
      </span>
      <Link href="/sepet" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--orange)", color: "#fff", padding: "9px 16px", borderRadius: 8, fontSize: 13, fontWeight: 800, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
        <ShoppingCart size={15} /> Sepete Git
      </Link>
      <button onClick={() => setVisible(false)} aria-label="Kapat"
        style={{ background: "none", border: "none", color: "#888", cursor: "pointer", display: "flex", padding: 2, flexShrink: 0 }}>
        <X size={16} />
      </button>
    </div>
  );
}
