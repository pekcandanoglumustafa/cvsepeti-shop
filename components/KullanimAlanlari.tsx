import Link from "next/link";
import { categorySlug } from "@/lib/products";

/**
 * Kullanım alanına göre yönlendirme.
 *
 * Ziyaretçi genelde "trafik konisi" diye değil, "otoparkımı düzenleyeceğim"
 * diye geliyor. Kategori listesi bu soruyu karşılamıyordu; ana sayfa yüzlerce
 * ürün gösterip hangisinin kendi işine yaradığını söylemiyordu.
 *
 * Her kart gerçek kategorilere bağlanıyor — ayrı bir etiketleme sistemi yok,
 * uydurma filtre yok.
 */
const ALANLAR: { baslik: string; alt: string; kategoriler: string[] }[] = [
  {
    baslik: "Otopark",
    alt: "Park yeri sınırı, kolon koruma, manevra güvenliği",
    kategoriler: ["Araç Stoperi", "Duba & Kaldırım Sınırlama", "Kolon Köşe Koruyucu", "Güvenlik Aynası"],
  },
  {
    baslik: "Şantiye ve yol çalışması",
    alt: "Alan kapatma, şerit daraltma, gece uyarısı",
    kategoriler: ["Trafik Konisi", "Güvenlik Bariyeri", "Uyarı Levhası", "Solar & Flaşör Lamba"],
  },
  {
    baslik: "Fabrika ve depo",
    alt: "Yaya-forklift ayrımı, köşe koruma, hız kontrolü",
    kategoriler: ["Zemin İşaretleme", "Kolon Köşe Koruyucu", "Hız Kesici Kasis", "Güvenlik Aynası"],
  },
  {
    baslik: "Belediye ve kamu",
    alt: "Refüj, yol kenarı, kavşak ve okul önü",
    kategoriler: ["Delinatör", "Hız Kesici Kasis", "Uyarı Levhası", "Yol Butonu"],
  },
];

export default function KullanimAlanlari() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(248px,1fr))", gap: 18 }}>
      {ALANLAR.map((a) => (
        <div key={a.baslik}
             style={{ border: "2px solid var(--ink)", padding: "22px 20px 18px",
                      display: "flex", flexDirection: "column" }}>
          <h3 className="display" style={{ fontSize: 19, lineHeight: 1.15 }}>{a.baslik}</h3>
          <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.55, marginTop: 8, marginBottom: 16 }}>
            {a.alt}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: "auto" }}>
            {a.kategoriler.map((k) => (
              <Link key={k} href={`/kategori/${categorySlug(k)}`} prefetch={false}
                    style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)",
                             textDecoration: "none", display: "flex", justifyContent: "space-between", gap: 8 }}>
                <span>{k}</span>
                <span aria-hidden style={{ color: "var(--hi)" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
