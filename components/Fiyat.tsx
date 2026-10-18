import { formatPrice } from "@/lib/products";

/**
 * Fiyat gösterimi — TEK fiyat, KDV dahil.
 *
 * Önceden iki satır vardı: büyük puntoyla KDV hariç tutar, altında küçük
 * puntoyla KDV dahil tutar. Müşterinin ödeyeceği rakam küçük ve soluktu,
 * iki rakam yan yana kafa karıştırıyordu.
 *
 * Fiyat Etiketi Yönetmeliği zaten tüm vergiler dahil fiyatın görünür
 * olmasını istiyor; dahil tutarı tek fiyat yapmak hem sade hem doğru.
 * Küçük "KDV dahil" ibaresi kalıyor — şartnameyle alım yapan kurumsal
 * müşteri hangi rakama baktığını bilmeli.
 */
export default function Fiyat({ dahil, boyut = "orta" }: {
  dahil: number; boyut?: "kucuk" | "orta" | "buyuk";
}) {
  const b = { kucuk: 19, orta: 25, buyuk: 52 }[boyut];
  return (
    <span style={{ display: "flex", alignItems: "baseline", gap: 7, flexWrap: "wrap" }}>
      <span className="display" style={{ fontSize: b, letterSpacing: "-0.035em" }}>
        {formatPrice(dahil)}
      </span>
      <span style={{ fontSize: Math.max(9.5, b * 0.34), fontWeight: 700,
                     letterSpacing: "0.03em", color: "var(--dim)" }}>
        KDV dahil
      </span>
    </span>
  );
}
