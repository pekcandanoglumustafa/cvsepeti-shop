import { formatPrice } from "@/lib/products";

/**
 * Fiyat gösterimi — KDV hariç tutar büyük, KDV dahil tutar altında küçük.
 * Fiyat Etiketi Yönetmeliği tüm vergiler dahil fiyatın görünür olmasını
 * zorunlu kılıyor; KDV Kanunu 57 de hariçse miktarının belirtilmesini istiyor.
 */
export default function Fiyat({ haric, dahil, boyut = "orta" }: {
  haric: number; dahil: number; boyut?: "kucuk" | "orta" | "buyuk";
}) {
  const b = { kucuk: 19, orta: 24, buyuk: 52 }[boyut];
  const k = { kucuk: 10, orta: 11.5, buyuk: 13.5 }[boyut];
  return (
    <span style={{ display: "block" }}>
      <span style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
        <span className="display" style={{ fontSize: b, letterSpacing: "-0.035em" }}>
          {formatPrice(haric)}
        </span>
        <span style={{ fontSize: Math.max(10, b * 0.42), fontWeight: 800, textTransform: "uppercase",
                       letterSpacing: "0.06em", color: "var(--muted)" }}>
          + KDV
        </span>
      </span>
      <span style={{ display: "block", fontSize: k, color: "var(--dim)", marginTop: 3 }}>
        KDV dahil {formatPrice(dahil)}
      </span>
    </span>
  );
}
