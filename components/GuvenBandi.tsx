import { ShieldCheck, Truck, FileText, RotateCcw, Phone, MapPin } from "lucide-react";

/**
 * Güven bandı — ödeme kararını destekleyen somut bilgiler.
 * Belirsiz vaat değil, doğrulanabilir gerçekler kullanılır.
 */
const OGELER = [
  { i: ShieldCheck, b: "iyzico güvencesi", a: "Kart bilgileriniz bize ulaşmaz, doğrudan iyzico altyapısında işlenir. 3D Secure destekli." },
  { i: Truck,       b: "Yurtiçi Kargo",    a: "Stoktaki ürünler 1-2 iş gününde kargoda. Türkiye geneline gönderim." },
  { i: FileText,    b: "Bireysel ve kurumsal fatura", a: "Vergi dairesi ve vergi numarası ile e-fatura kesilir." },
  { i: RotateCcw,   b: "14 gün cayma hakkı", a: "Mesafeli Satış Sözleşmesi kapsamında koşulsuz iade hakkınız vardır." },
  { i: MapPin,      b: "Konya Teknokent",   a: "Fiziki adresi ve vergi kaydı olan bir işletmeden alışveriş yapıyorsunuz." },
  { i: Phone,       b: "0 507 658 42 45",   a: "Sipariş öncesi ve sonrası teknik destek." },
];

export default function GuvenBandi() {
  return (
    <section style={{ borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)", marginTop: 56 }}>
      <div style={{ maxWidth: 1520, margin: "0 auto", padding: "34px 20px",
                    display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "26px 30px" }}>
        {OGELER.map(({ i: Icon, b, a }) => (
          <div key={b} style={{ display: "flex", gap: 11 }}>
            <Icon size={19} strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="label" style={{ marginBottom: 5 }}>{b}</p>
              <p style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.55 }}>{a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
