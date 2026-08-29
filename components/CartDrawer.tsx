"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, Trash2, Check, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatTL, TABAN_UCRET, TABAN_DESI } from "@/lib/kargo";

/** Sepete ekleyince sağdan açılan çekmece — standart e-ticaret davranışı */
export default function CartDrawer() {
  const { items, remove, setQty, total, totalKdv, kdvTutar, kargoDesi, kargo, genelToplam } = useCart();
  const [acik, setAcik] = useState(false);
  const [sonEklenen, setSonEklenen] = useState("");
  const [m, setM] = useState(false);

  useEffect(() => setM(true), []);

  useEffect(() => {
    const ekle = (e: Event) => {
      const d = (e as CustomEvent).detail as { name?: string };
      setSonEklenen(d?.name || "");
      setAcik(true);
    };
    const ac = () => setAcik(true);
    window.addEventListener("cart:added", ekle);
    window.addEventListener("cart:open", ac);
    return () => { window.removeEventListener("cart:added", ekle); window.removeEventListener("cart:open", ac); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = acik ? "hidden" : "";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setAcik(false); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [acik]);

  if (!m) return null;

  const desi = kargoDesi();
  const adet = items.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      {/* perde */}
      <div onClick={() => setAcik(false)} aria-hidden={!acik}

        style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(0,0,0,.42)",
                 opacity: acik ? 1 : 0, pointerEvents: acik ? "auto" : "none",
                 transition: "opacity .25s ease" }} />

      <aside role="dialog" aria-modal="true" aria-label="Sepet" aria-hidden={!acik}
        style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 91,
                 width: "min(420px, 92vw)", background: "#fff",
                 display: "flex", flexDirection: "column",
                 transform: acik ? "translateX(0)" : "translateX(102%)",
                 transition: "transform .3s cubic-bezier(.2,.8,.2,1)",
                 boxShadow: "-8px 0 40px rgba(0,0,0,.14)" }}>

        {/* başlık */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "16px 18px", borderBottom: "2px solid var(--ink)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <ShoppingBag size={17} strokeWidth={2.5} />
            <span className="display" style={{ fontSize: 17 }}>Sepet</span>
            {adet > 0 && <span className="eyebrow" style={{ color: "var(--dim)" }}>{adet} ürün</span>}
          </span>
          <button onClick={() => setAcik(false)} aria-label="Kapat"
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 4 }}>
            <X size={20} />
          </button>
        </div>

        {sonEklenen && items.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
                        background: "#F0F9F2", borderBottom: "1px solid var(--hair)" }}>
            <Check size={15} color="#0B7A3B" strokeWidth={3} />
            <span style={{ fontSize: 12.5, color: "#0B7A3B", fontWeight: 700 }}>Sepete eklendi</span>
          </div>
        )}

        {/* içerik */}
        {items.length === 0 ? (
          <div style={{ flex: 1, display: "grid", placeItems: "center", padding: 30, textAlign: "center" }}>
            <div>
              <p className="display" style={{ fontSize: 20, marginBottom: 8 }}>Sepet boş</p>
              <p style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 20 }}>
                Katalogdan ürün ekleyin.
              </p>
              <Link href="/urunler" onClick={() => setAcik(false)} className="btn btn-solid">
                Ürünlere göz at
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: "auto", padding: "6px 18px" }}>
            {items.map((i) => (
              <div key={i.slug} style={{ display: "flex", gap: 12, padding: "14px 0",
                                         borderBottom: "1px solid var(--hair)" }}>
                <Link href={`/urun/${i.slug}`} onClick={() => setAcik(false)}
                      style={{ width: 66, height: 66, background: "var(--tile)", position: "relative",
                               flexShrink: 0, border: "1px solid var(--hair)" }}>
                  {i.image && <Image src={i.image} alt="" fill unoptimized style={{ objectFit: "contain", padding: 5 }} />}
                </Link>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link href={`/urun/${i.slug}`} onClick={() => setAcik(false)}
                        style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", textDecoration: "none",
                                 display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                                 overflow: "hidden", lineHeight: 1.3 }}>
                    {i.name}
                  </Link>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--hair)" }}>
                      <button onClick={() => setQty(i.slug, Math.max(1, i.qty - 1))} aria-label="azalt"
                              style={{ padding: "6px 8px", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                        <Minus size={12} />
                      </button>
                      <span style={{ minWidth: 22, textAlign: "center", fontSize: 12.5, fontWeight: 800 }}>{i.qty}</span>
                      <button onClick={() => setQty(i.slug, i.qty + 1)} aria-label="artır"
                              style={{ padding: "6px 8px", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                        <Plus size={12} />
                      </button>
                    </div>

                    <span style={{ fontSize: 13.5, fontWeight: 900, letterSpacing: "-.02em" }}>
                      {formatTL(i.price * i.qty)}
                      <span style={{ fontSize: 9, fontWeight: 700, color: "var(--muted)", marginLeft: 3 }}>+KDV</span>
                    </span>

                    <button onClick={() => remove(i.slug)} aria-label="kaldır"
                            style={{ marginLeft: "auto", background: "none", border: "none",
                                     cursor: "pointer", color: "var(--dim)", display: "flex" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* alt özet */}
        {items.length > 0 && (
          <div style={{ borderTop: "2px solid var(--ink)", padding: "14px 18px 18px", background: "#fff" }}>
            <Satir k="Ara toplam (KDV hariç)" v={formatTL(total())} />
            <Satir k="KDV %20" v={formatTL(kdvTutar())} />
            <Satir k={desi > 0 ? `Kargo · ${desi} desi` : "Kargo"} v={desi > 0 ? formatTL(kargo()) : "Ücretsiz"} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
                          paddingTop: 10, marginTop: 8, borderTop: "1px solid var(--hair)" }}>
              <span className="label">Toplam</span>
              <span className="display" style={{ fontSize: 24 }}>{formatTL(genelToplam())}</span>
            </div>

            <Link href="/odeme" onClick={() => setAcik(false)} className="btn btn-solid"
                  style={{ width: "100%", marginTop: 14, padding: "18px 20px" }}>
              Ödemeye geç <ArrowRight size={16} />
            </Link>
            <Link href="/sepet" onClick={() => setAcik(false)} className="btn btn-ghost"
                  style={{ width: "100%", marginTop: 8, padding: "14px 20px" }}>
              Sepeti düzenle
            </Link>

            <p style={{ fontSize: 11, color: "var(--dim)", marginTop: 12, lineHeight: 1.6, textAlign: "center" }}>
              İlk {TABAN_DESI} desi {TABAN_UCRET} ₺ · Adet arttıkça ürünler tek koliye istiflenir
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

function Satir({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
      <span style={{ color: "var(--muted)" }}>{k}</span>
      <span style={{ fontWeight: 700 }}>{v}</span>
    </div>
  );
}
