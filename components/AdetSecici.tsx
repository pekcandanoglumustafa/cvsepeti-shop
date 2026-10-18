"use client";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";

/**
 * Adet seçimi — yazılabilir alan + artır/azalt.
 *
 * Önceden yalnızca + ve − düğmesi vardı: 50 adet isteyen müşteri 50 kez
 * tıklamak zorundaydı. Toplu alım bu sitenin asıl işi olduğu için
 * rakamı doğrudan yazabilmek gerekiyor.
 *
 * Yazarken serbest bırakılır (silip baştan yazmak mümkün olsun),
 * odak çıkınca 1..stok aralığına çekilir.
 */
export default function AdetSecici({
  deger, setDeger, stok = 9999, boyut = "normal", etiket = "Adet",
}: {
  deger: number;
  setDeger: (n: number) => void;
  stok?: number;
  boyut?: "normal" | "kucuk";
  etiket?: string;
}) {
  const [metin, setMetin] = useState(String(deger));
  useEffect(() => { setMetin(String(deger)); }, [deger]);

  const kucuk = boyut === "kucuk";
  const pad = kucuk ? "8px 9px" : "14px 14px";
  const ikon = kucuk ? 13 : 16;

  const sabitle = (ham: string) => {
    const n = parseInt(ham.replace(/\D/g, ""), 10);
    const s = Number.isFinite(n) ? Math.min(Math.max(n, 1), Math.max(1, stok)) : 1;
    setDeger(s); setMetin(String(s));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", border: `2px solid var(--ink)` }}>
      <button type="button" onClick={() => setDeger(Math.max(1, deger - 1))} aria-label="azalt"
        disabled={deger <= 1}
        style={{ padding: pad, background: "none", border: "none", display: "flex",
                 cursor: deger <= 1 ? "default" : "pointer", opacity: deger <= 1 ? 0.35 : 1 }}>
        <Minus size={ikon} strokeWidth={2.5} />
      </button>

      <input
        value={metin}
        onChange={(e) => setMetin(e.target.value.replace(/\D/g, "").slice(0, 5))}
        onBlur={(e) => sabitle(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
        inputMode="numeric"
        aria-label={etiket}
        style={{ width: kucuk ? 38 : 52, textAlign: "center", fontWeight: 800,
                 fontSize: kucuk ? 13 : 15, fontFamily: "inherit",
                 border: "none", outline: "none", background: "transparent",
                 padding: kucuk ? "7px 0" : "12px 0", color: "var(--ink)" }}
      />

      <button type="button" onClick={() => setDeger(Math.min(Math.max(1, stok), deger + 1))} aria-label="artır"
        disabled={deger >= stok}
        style={{ padding: pad, background: "none", border: "none", display: "flex",
                 cursor: deger >= stok ? "default" : "pointer", opacity: deger >= stok ? 0.35 : 1 }}>
        <Plus size={ikon} strokeWidth={2.5} />
      </button>
    </div>
  );
}
