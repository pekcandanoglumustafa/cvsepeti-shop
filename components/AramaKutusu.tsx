"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

/**
 * Arama kutusu.
 *
 * /ara sayfasının kendi arama alanı yoktu: oraya düşen kişi yeni bir arama
 * yapamıyordu. Katalogdaki filtre de 35 kategorinin altında kalıyordu.
 * Kutu burada ölçülü tutuluyor — ana sayfada yer kaplamasın diye.
 */
export default function AramaKutusu({ baslangic = "", otomatikOdak = false }: {
  baslangic?: string; otomatikOdak?: boolean;
}) {
  const router = useRouter();
  const [q, setQ] = useState(baslangic);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const s = q.trim();
        router.push(s ? `/ara?q=${encodeURIComponent(s)}` : "/urunler");
      }}
      style={{ position: "relative", maxWidth: 440 }}
    >
      <Search size={16} aria-hidden
              style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--dim)" }} />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus={otomatikOdak}
        aria-label="Ürün adı veya kod ile ara"
        placeholder="Ürün adı veya kod ara"
        style={{ width: "100%", padding: "13px 14px 13px 40px", fontSize: 14.5,
                 border: "2px solid var(--line)", outline: "none",
                 fontFamily: "inherit", background: "#fff", color: "var(--ink)" }}
      />
    </form>
  );
}
