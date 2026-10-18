"use client";
import { useMemo, useState } from "react";
import type { KartUrun } from "@/lib/products";
import { eslesir, urunMetni } from "@/lib/arama";
import ProductCard from "./ProductCard";
import { SlidersHorizontal, X } from "lucide-react";
const facets: { key: keyof KartUrun; label: string }[] = [
  { key: "category", label: "Kategoriler" },
  { key: "f_boy", label: "Ölçü" },
  { key: "f_malzeme", label: "Malzeme" },
  { key: "f_reflektif", label: "Reflektif" },
  { key: "f_taban", label: "Taban" },
  { key: "f_seri", label: "Seri" },
];
export default function ProductFilters({
  urunler,
  baslik,
}: {
  urunler: KartUrun[];
  baslik: string;
}) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("");
  const [limit, setLimit] = useState(24);
  const [open, setOpen] = useState(false);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const choices = useMemo(
    () =>
      facets.map((f) => ({
        ...f,
        values: [
          ...new Set(
            urunler.map((p) => String(p[f.key] || "")).filter(Boolean),
          ),
        ].sort((a, b) => a.localeCompare(b, "tr", { numeric: true })),
      })),
    [urunler],
  );
  const results = useMemo(() => {
    let r = urunler.filter(
      (p) =>
        (!q || eslesir(urunMetni(p), q)) &&
        Object.entries(selected).every(
          ([k, v]) => !v.length || v.includes(String(p[k as keyof KartUrun])),
        ) &&
        (!min || p.price_kdv >= Number(min)) &&
        (!max || p.price_kdv <= Number(max)),
    );
    if (sort === "asc") r = r.toSorted((a, b) => a.price_kdv - b.price_kdv);
    if (sort === "desc") r = r.toSorted((a, b) => b.price_kdv - a.price_kdv);
    if (sort === "name")
      r = r.toSorted((a, b) => a.name.localeCompare(b.name, "tr"));
    return r;
  }, [urunler, q, selected, min, max, sort]);
  const toggle = (key: string, value: string) => {
    setSelected((s) => ({
      ...s,
      [key]: (s[key] || []).includes(value)
        ? s[key].filter((v) => v !== value)
        : [...(s[key] || []), value],
    }));
    setLimit(24);
  };
  const reset = () => {
    setSelected({});
    setQ("");
    setMin("");
    setMax("");
    setLimit(24);
  };
  return (
    <div className="catalog-layout">
      <aside
        className={`catalog-sidebar${open ? " visible" : ""}`}
        aria-label="Ürün filtreleri"
      >
        <div className="filter-head">
          Filtreler{" "}
          <button className="filter-clear" onClick={reset}>
            Temizle
          </button>
          <button
            className="filter-mobile"
            onClick={() => setOpen(false)}
            aria-label="Filtreleri kapat"
          >
            <X className="icon" />
          </button>
        </div>
        <input
          className="catalog-search"
          aria-label="Katalogda ürün ara"
          placeholder="Ürün adı veya kodu"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setLimit(24);
          }}
        />
        {choices
          .filter((f) => f.values.length > 1)
          .map((f) => (
            <details className="filter-section" open key={f.key}>
              <summary>{f.label}</summary>
              <div className="filter-items">
                {f.values.map((v) => (
                  <label className="filter-option" key={v}>
                    <input
                      type="checkbox"
                      checked={(selected[f.key] || []).includes(v)}
                      onChange={() => toggle(f.key, v)}
                    />
                    <span>{v}</span>
                    {f.key === "category" && (
                      <small>
                        {urunler.filter((p) => p.category === v).length}
                      </small>
                    )}
                  </label>
                ))}
              </div>
            </details>
          ))}
        <div className="filter-section">
          <strong>Fiyat aralığı · KDV dahil</strong>
          <div className="price-filter">
            <input
              type="number"
              min="0"
              placeholder="En az ₺"
              aria-label="En düşük fiyat"
              value={min}
              onChange={(e) => {
                setMin(e.target.value);
                setLimit(24);
              }}
            />
            <input
              type="number"
              min="0"
              placeholder="En çok ₺"
              aria-label="En yüksek fiyat"
              value={max}
              onChange={(e) => {
                setMax(e.target.value);
                setLimit(24);
              }}
            />
          </div>
        </div>
      </aside>
      <section aria-label={baslik}>
        <div className="catalog-toolbar">
          <button className="filter-mobile" onClick={() => setOpen(true)}>
            <SlidersHorizontal className="icon" /> Filtrele
          </button>
          <strong aria-live="polite">{results.length} ürün</strong>
          <select
            className="sort-select"
            aria-label="Ürünleri sırala"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setLimit(24);
            }}
          >
            <option value="">Önerilen sıralama</option>
            <option value="asc">Fiyat: düşükten yükseğe</option>
            <option value="desc">Fiyat: yüksekten düşüğe</option>
            <option value="name">Ürün adı: A–Z</option>
          </select>
        </div>
        <div className="active-filters">
          {Object.entries(selected).flatMap(([k, vs]) =>
            vs.map((v) => (
              <button
                className="active-filter"
                key={k + v}
                onClick={() => toggle(k, v)}
              >
                {v} ×
              </button>
            )),
          )}
        </div>
        <div className="product-grid catalog-grid">
          {results.slice(0, limit).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {!results.length && (
          <div className="empty-state">
            <h2>Uygun ürün bulunamadı.</h2>
            <p>Filtreleri değiştirerek tekrar deneyin.</p>
            <button className="btn secondary" onClick={reset}>
              Filtreleri temizle
            </button>
          </div>
        )}
        <div className="load-more">
          {results.length > limit && (
            <button
              className="btn secondary"
              onClick={() => setLimit((n) => n + 24)}
            >
              Daha fazla ürün göster
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
