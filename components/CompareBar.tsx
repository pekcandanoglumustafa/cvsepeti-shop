"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { useCompare } from "@/lib/compare";
import { formatPrice } from "@/lib/products";
export default function CompareBar() {
  const { items, clear } = useCompare();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!items.length) dialog.current?.close();
  }, [items.length]);
  return (
    <>
      <div className="compare-bar" hidden={!items.length}>
        <div>
          <strong>{items.length} ürün seçildi</strong>
          <br />
          <span>En fazla 3 ürünü karşılaştırın</span>
        </div>
        <button
          className="btn small dark"
          disabled={items.length < 2}
          onClick={() => dialog.current?.showModal()}
        >
          Karşılaştır <ArrowRight className="icon" />
        </button>
        <button
          className="icon-button"
          onClick={clear}
          aria-label="Karşılaştırma seçimini temizle"
        >
          <X className="icon" />
        </button>
      </div>
      <dialog
        ref={dialog}
        className="compare-dialog"
        aria-labelledby="compare-title"
      >
        <div className="compare-header">
          <h2 id="compare-title">Ürünleri karşılaştırın.</h2>
          <button
            className="icon-button"
            onClick={() => dialog.current?.close()}
            aria-label="Karşılaştırmayı kapat"
          >
            <X className="icon" />
          </button>
        </div>
        <div className="compare-scroll">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Ürün</th>
                {items.map((p) => (
                  <td key={p.id}>
                    <img src={p.images[0]} alt={p.name} />
                    <h3>{p.name}</h3>
                    <Link
                      className="text-link"
                      href={`/urun/${p.slug}`}
                      onClick={() => dialog.current?.close()}
                    >
                      Ürünü incele ↗
                    </Link>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Ürün kodu", "kod"],
                ["Ölçü", "boyut"],
                ["Malzeme", "f_malzeme"],
                ["Reflektif", "f_reflektif"],
                ["Taban", "f_taban"],
              ].map(([title, key]) => (
                <tr key={key}>
                  <th>{title}</th>
                  {items.map((p) => (
                    <td key={p.id}>
                      {String(p[key as keyof typeof p] || "—")}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th>Fiyat · KDV dahil</th>
                {items.map((p) => (
                  <td key={p.id}>{formatPrice(p.price_kdv)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </dialog>
    </>
  );
}
