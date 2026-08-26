"use client";
import { useMemo, useState, useEffect } from "react";
import { Product, formatPrice } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X, Check, Search } from "lucide-react";

type Facet = { anahtar: keyof Product | string; etiket: string };
const FACETS: Facet[] = [
  { anahtar: "f_boy",       etiket: "Ölçü" },
  { anahtar: "f_malzeme",   etiket: "Malzeme" },
  { anahtar: "f_reflektif", etiket: "Reflektif" },
  { anahtar: "f_taban",     etiket: "Taban" },
  { anahtar: "f_seri",      etiket: "Seri" },
];

const SIRALAMA = [
  { k: "varsayilan", e: "Önerilen" },
  { k: "ucuz",       e: "Fiyat: düşükten yükseğe" },
  { k: "pahali",     e: "Fiyat: yüksekten düşüğe" },
  { k: "ad",         e: "İsme göre" },
];

export default function ProductFilters({ urunler, baslik }: { urunler: Product[]; baslik: string }) {
  const [secili, setSecili] = useState<Record<string, string[]>>({});
  const [q, setQ] = useState("");
  const [sira, setSira] = useState("varsayilan");
  const [acikPanel, setAcikPanel] = useState(false);
  const [acikFacet, setAcikFacet] = useState<Record<string, boolean>>({ f_boy: true });

  // mobil panel açıkken arka plan kaymasın
  useEffect(() => {
    document.body.style.overflow = acikPanel ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [acikPanel]);

  const degerler = useMemo(() => {
    const m: Record<string, { v: string; n: number }[]> = {};
    for (const f of FACETS) {
      const say = new Map<string, number>();
      for (const u of urunler) {
        const v = (u as any)[f.anahtar] as string;
        if (v) say.set(v, (say.get(v) ?? 0) + 1);
      }
      const liste = [...say.entries()].map(([v, n]) => ({ v, n }));
      liste.sort((a, b) => (f.anahtar === "f_boy" ? 0 : b.n - a.n));
      if (liste.length > 1) m[f.anahtar as string] = liste;
    }
    return m;
  }, [urunler]);

  const sonuc = useMemo(() => {
    const ara = q.trim().toLocaleLowerCase("tr");
    let r = urunler.filter((u) => {
      for (const [k, vs] of Object.entries(secili)) {
        if (!vs.length) continue;
        if (!vs.includes((u as any)[k])) return false;
      }
      if (ara) {
        const havuz = `${u.name} ${u.kod} ${u.category} ${u.boyut}`.toLocaleLowerCase("tr");
        if (!ara.split(/\s+/).every((p) => havuz.includes(p))) return false;
      }
      return true;
    });
    if (sira === "ucuz") r = [...r].sort((a, b) => a.price - b.price);
    if (sira === "pahali") r = [...r].sort((a, b) => b.price - a.price);
    if (sira === "ad") r = [...r].sort((a, b) => a.name.localeCompare(b.name, "tr"));
    return r;
  }, [urunler, secili, q, sira]);

  const toggle = (k: string, v: string) =>
    setSecili((p) => {
      const cur = p[k] ?? [];
      return { ...p, [k]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });

  const aktifSayi = Object.values(secili).reduce((s, v) => s + v.length, 0);
  const temizle = () => { setSecili({}); setQ(""); };

  const panel = (
    <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
      {FACETS.filter((f) => degerler[f.anahtar as string]).map((f) => {
        const k = f.anahtar as string;
        const acik = acikFacet[k] ?? false;
        const secim = secili[k] ?? [];
        return (
          <div key={k}>
            <button onClick={() => setAcikFacet((p) => ({ ...p, [k]: !acik }))}
              aria-expanded={acik}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                       background: "none", border: "none", padding: "0 0 10px", cursor: "pointer",
                       borderBottom: "1px solid var(--hair)" }}>
              <span className="label">{f.etiket}{secim.length > 0 && ` (${secim.length})`}</span>
              <span className="eyebrow" style={{ color: "var(--dim)" }}>{acik ? "−" : "+"}</span>
            </button>
            {acik && (
              <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 10 }}>
                {degerler[k].map(({ v, n }) => {
                  const on = secim.includes(v);
                  return (
                    <button key={v} onClick={() => toggle(k, v)} aria-pressed={on}
                      style={{ display: "flex", alignItems: "center", gap: 9, background: "none",
                               border: "none", padding: "7px 0", cursor: "pointer", textAlign: "left" }}>
                      <span style={{ width: 16, height: 16, flexShrink: 0, display: "grid", placeItems: "center",
                                     border: `2px solid ${on ? "var(--ink)" : "var(--hair)"}`,
                                     background: on ? "var(--ink)" : "transparent" }}>
                        {on && <Check size={11} color="#fff" strokeWidth={4} />}
                      </span>
                      <span style={{ fontSize: 13.5, flex: 1 }}>{v}</span>
                      <span className="eyebrow" style={{ color: "var(--dim)" }}>{n}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      {/* ---- ÜST ÇUBUK ---- */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 22 }}>
        <div style={{ position: "relative", flex: "1 1 260px", minWidth: 0 }}>
          <Search size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--dim)" }} />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Ürün adı veya kod ara — örn. ZT8030"
            aria-label="Ürün ara"
            style={{ width: "100%", padding: "13px 13px 13px 38px", border: "2px solid var(--hair)",
                     fontSize: 14, fontFamily: "inherit", outline: "none", background: "#fff" }} />
        </div>

        <select value={sira} onChange={(e) => setSira(e.target.value)} aria-label="Sıralama"
          style={{ padding: "13px 14px", border: "2px solid var(--hair)", fontSize: 13,
                   fontFamily: "inherit", background: "#fff", cursor: "pointer" }}>
          {SIRALAMA.map((s) => <option key={s.k} value={s.k}>{s.e}</option>)}
        </select>

        <button className="btn btn-ghost filtre-btn" onClick={() => setAcikPanel(true)}
          style={{ padding: "13px 20px", fontSize: 11 }}>
          <SlidersHorizontal size={15} /> Filtrele{aktifSayi > 0 && ` (${aktifSayi})`}
        </button>
      </div>

      {/* ---- AKTİF FİLTRE ROZETLERİ ---- */}
      {aktifSayi > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {Object.entries(secili).flatMap(([k, vs]) =>
            vs.map((v) => (
              <button key={k + v} onClick={() => toggle(k, v)}
                style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 11px",
                         border: "2px solid var(--ink)", background: "var(--ink)", color: "#fff",
                         fontSize: 11.5, fontWeight: 700, cursor: "pointer" }}>
                {v} <X size={12} strokeWidth={3} />
              </button>
            ))
          )}
          <button onClick={temizle} className="label"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--hi)", padding: "7px 4px" }}>
            Temizle
          </button>
        </div>
      )}

      <div className="liste-grid" style={{ display: "grid", gridTemplateColumns: "232px 1fr", gap: 40, alignItems: "start" }}>
        {/* masaüstü kenar çubuğu */}
        <aside className="yan-panel" style={{ position: "sticky", top: 96 }}>{panel}</aside>

        <div>
          <p className="eyebrow" style={{ color: "var(--dim)", marginBottom: 18 }}>
            {sonuc.length} ürün{aktifSayi > 0 || q ? ` · ${urunler.length} içinden` : ""}
          </p>

          {sonuc.length === 0 ? (
            <div style={{ padding: "60px 0", textAlign: "center" }}>
              <p className="display d4" style={{ marginBottom: 10 }}>Sonuç yok</p>
              <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 20 }}>
                Filtreleri gevşetin ya da farklı bir kod deneyin.
              </p>
              <button onClick={temizle} className="btn btn-ghost">Filtreleri temizle</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(205px,1fr))", gap: "40px 24px" }}>
              {sonuc.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {/* ---- MOBİL PANEL ---- */}
      {acikPanel && (
        <div role="dialog" aria-modal="true" aria-label="Filtreler"
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", zIndex: 100 }}
          onClick={() => setAcikPanel(false)}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "min(360px,88vw)",
                     background: "#fff", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                          padding: "18px 20px", borderBottom: "2px solid var(--ink)" }}>
              <span className="display d4">Filtrele</span>
              <button onClick={() => setAcikPanel(false)} aria-label="Kapat"
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "22px 20px" }}>{panel}</div>
            <div style={{ padding: 16, borderTop: "1px solid var(--hair)", display: "flex", gap: 10 }}>
              <button onClick={temizle} className="btn btn-ghost" style={{ flex: 1, padding: "16px 10px" }}>Temizle</button>
              <button onClick={() => setAcikPanel(false)} className="btn btn-solid" style={{ flex: 2, padding: "16px 10px" }}>
                {sonuc.length} ürünü gör
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .filtre-btn{display:none}
        @media (max-width: 900px){
          .liste-grid{grid-template-columns:1fr!important}
          .yan-panel{display:none}
          .filtre-btn{display:inline-flex}
        }
      `}</style>
    </div>
  );
}
