"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

/**
 * Ana sayfadaki arama.
 *
 * Sitede hiç arama kutusu yoktu: katalogdaki filtre 35 kategorinin altında,
 * masaüstünde ~2.600 piksel aşağıda kalıyordu. Ürün kodunu bilen kurumsal
 * müşteri (Search Console'da "zt777" tek başına 1.114 gösterim almış)
 * aradığını bulamadan ayrılıyordu.
 *
 * Boş gönderimde kataloğa düşer, dolu gönderimde /ara sayfasına gider.
 */
export default function AnaArama() {
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const s = q.trim();
        router.push(s ? `/ara?q=${encodeURIComponent(s)}` : "/urunler");
      }}
      style={{ display: "flex", gap: 10, flexWrap: "wrap", maxWidth: 680 }}
    >
      <div style={{ position: "relative", flex: "1 1 320px", minWidth: 0 }}>
        <Search size={17} aria-hidden
                style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--dim)" }} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Ürün adı veya kod ile ara"
          placeholder="Ürün adı veya kod — örn. ZT8075, kasis, delinatör"
          style={{ width: "100%", padding: "18px 16px 18px 44px", fontSize: 15,
                   border: "2px solid var(--ink)", outline: "none",
                   fontFamily: "inherit", background: "#fff", color: "var(--ink)" }}
        />
      </div>
      <button type="submit" className="btn btn-solid" style={{ padding: "18px 28px", fontSize: 13 }}>
        Ara <ArrowRight size={16} />
      </button>
    </form>
  );
}
