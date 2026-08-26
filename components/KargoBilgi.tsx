"use client";
import { Truck, Wallet, Package } from "lucide-react";
import { TABAN_UCRET, TABAN_DESI, kargoUcreti, urunDesi, formatTL, buyukHacimli } from "@/lib/kargo";
import type { Product } from "@/lib/products";

/** Ürün sayfasında kargo maliyetini ve ödeme seçeneklerini önceden gösterir */
export default function KargoBilgi({ product }: { product: Product }) {
  const o = { olcu3: product.olcu3 || [25, 20, 12], geo: (product.geo || "HACIMLI") as any, agirlik_kg: product.agirlik_kg || 0 };
  const desi = urunDesi(o);
  const ucret = kargoUcreti(desi);
  const buyuk = buyukHacimli(o);

  return (
    <div style={{ border: "1px solid var(--hair)", padding: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
        <Truck size={16} />
        <span className="label">Kargo</span>
      </div>

      {buyuk ? (
        <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.65 }}>
          Bu ürün büyük hacimli. Standart kargoya sığmadığı için nakliye ayrıca planlanır —
          sepete ekleyip siparişi tamamlayın, teslimat şeklini sizinle netleştirelim.
        </p>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, padding: "5px 0" }}>
            <span style={{ color: "var(--muted)" }}>1 adet için</span>
            <span style={{ fontWeight: 700 }}>{desi} desi · {formatTL(ucret)}</span>
          </div>
          <p style={{ fontSize: 12, color: "var(--dim)", marginTop: 6, lineHeight: 1.6 }}>
            Adet arttıkça ürünler tek koliye istiflendiği için desi orantılı artmaz.
            Kesin tutar sepette görünür.
          </p>
        </>
      )}

      <div className="hair" style={{ margin: "14px 0" }} />

      <p className="eyebrow" style={{ color: "var(--dim)", marginBottom: 10 }}>Kargoyu nasıl ödersiniz</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        <div style={{ display: "flex", gap: 9 }}>
          <Wallet size={15} style={{ flexShrink: 0, marginTop: 2, color: "var(--muted)" }} />
          <p style={{ fontSize: 12.5, lineHeight: 1.55 }}>
            <strong>Şimdi öde</strong> — kargo bedeli sipariş toplamına eklenir, kartla ödersiniz.
          </p>
        </div>
        <div style={{ display: "flex", gap: 9 }}>
          <Package size={15} style={{ flexShrink: 0, marginTop: 2, color: "var(--muted)" }} />
          <p style={{ fontSize: 12.5, lineHeight: 1.55 }}>
            <strong>Karşı ödemeli</strong> — kargoyu teslim alırken kuryeye ödersiniz.
          </p>
        </div>
      </div>
      <p style={{ fontSize: 11.5, color: "var(--dim)", marginTop: 11 }}>
        Seçimi ödeme adımında yaparsınız.
      </p>
    </div>
  );
}
