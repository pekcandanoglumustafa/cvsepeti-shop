"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatTL, TABAN_UCRET, TABAN_DESI } from "@/lib/kargo";

export default function Sepet() {
  const { items, remove, setQty, total, totalKdv, kdvTutar, kargoDesi, kargo, genelToplam } = useCart();
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  if (!m) return <main style={{ minHeight: 400 }} />;

  if (!items.length)
    return (
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "80px 20px", textAlign: "center" }}>
        <h1 className="display" style={{ fontSize: 42 }}>Sepet boş</h1>
        <p style={{ color: "var(--muted)", margin: "14px 0 28px" }}>Katalogdan ürün ekleyin.</p>
        <Link href="/urunler" className="btn btn-solid">Katalogu aç</Link>
      </main>
    );

  const desi = kargoDesi();

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <h1 className="display" style={{ fontSize: "clamp(32px,6vw,64px)", marginBottom: 28 }}>Sepet</h1>

      <div className="sepet-grid" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 40, alignItems: "start" }}>
        <div style={{ borderTop: "2px solid var(--ink)" }}>
          {items.map((i) => (
            <div key={i.slug} style={{ display: "flex", gap: 16, padding: "18px 0", borderBottom: "1px solid var(--line)" }}>
              <div style={{ width: 88, height: 88, background: "var(--tile)", position: "relative", flexShrink: 0 }}>
                {i.image && <Image src={i.image} alt={i.name} fill unoptimized style={{ objectFit: "contain", padding: 8 }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Link href={`/urun/${i.slug}`} style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", textDecoration: "none" }}
                      className="line-clamp-2">{i.name}</Link>
                <p className="eyebrow" style={{ color: "var(--dim)", marginTop: 5 }}>{i.kategori}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--line)" }}>
                    <button onClick={() => setQty(i.slug, Math.max(1, i.qty - 1))} aria-label="azalt"
                            style={{ padding: 9, background: "none", border: "none", cursor: "pointer", display: "flex" }}><Minus size={14} /></button>
                    <span style={{ minWidth: 28, textAlign: "center", fontWeight: 800, fontSize: 14 }}>{i.qty}</span>
                    <button onClick={() => setQty(i.slug, i.qty + 1)} aria-label="artır"
                            style={{ padding: 9, background: "none", border: "none", cursor: "pointer", display: "flex" }}><Plus size={14} /></button>
                  </div>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 900 }}>{formatTL(i.price * i.qty)} <span style={{ fontSize: 10, color: "var(--muted)" }}>+KDV</span></span>
                    <span style={{ fontSize: 11, color: "var(--dim)" }}>KDV dahil {formatTL((i.price_kdv ?? i.price * 1.2) * i.qty)}</span>
                  </span>
                  <button onClick={() => remove(i.slug)} aria-label="kaldır"
                          style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "var(--muted)", display: "flex" }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside style={{ border: "2px solid var(--ink)", padding: 22, position: "sticky", top: 90 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Özet</p>
          <Row k="Ara toplam (KDV hariç)" v={formatTL(total())} />
          <Row k="KDV %20" v={formatTL(kdvTutar())} />
          <Row k={desi > 0 ? `Kargo · ${desi} desi` : "Kargo"} v={desi > 0 ? formatTL(kargo()) : "Ücretsiz"} />
          <div className="band-thin" style={{ margin: "14px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span className="label">Toplam</span>
            <span className="display" style={{ fontSize: 26, color: "var(--hi)" }}>{formatTL(genelToplam())}</span>
          </div>

          <Link href="/odeme" className="btn btn-solid" style={{ width: "100%", marginTop: 20 }}>Ödemeye geç</Link>

          <div style={{ marginTop: 18, padding: 14, background: "var(--tile)" }}>
            <p className="eyebrow" style={{ marginBottom: 8 }}>Kargo nasıl hesaplanır</p>
            <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.65 }}>
              Yurtiçi Kargo · İlk {TABAN_DESI} desi {TABAN_UCRET} ₺, sonrası kademeli.
              Aynı üründen birden fazla alındığında ürünler iç içe/istifli gönderildiği için
              ek adetler tam desi eklemez.
            </p>
          </div>
        </aside>
      </div>

      <style>{`@media(max-width:900px){.sepet-grid{grid-template-columns:1fr!important}}`}</style>
    </main>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: 14 }}>
      <span style={{ color: "var(--muted)" }}>{k}</span>
      <span style={{ fontWeight: 700 }}>{v}</span>
    </div>
  );
}
