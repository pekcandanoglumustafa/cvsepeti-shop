import Link from "next/link";
import Image from "next/image";

/**
 * Ana sayfa banner'ı.
 *
 * Sitenin girişinde görsel bir karşılama yoktu: doğrudan başlık ve ürün
 * ızgarası geliyordu. Burada tek iş var — ne sattığımızı bir bakışta
 * anlatmak ve kataloğa götürmek. Fazladan rozet, fazladan cümle yok.
 */
export default function Banner({ urunSayisi }: { urunSayisi: number }) {
  return (
    <section style={{ borderBottom: "1px solid var(--hair)" }}>
      <div className="banner" style={{ maxWidth: 1520, margin: "0 auto", padding: "0 20px" }}>
        <div className="banner-yazi">
          <h1 className="display" style={{ fontSize: "clamp(32px,5vw,64px)", lineHeight: 1.02 }}>
            Trafik ve yol<br />güvenliği ekipmanları
          </h1>
          <p style={{ marginTop: 18, fontSize: 16.5, lineHeight: 1.65, color: "var(--muted)", maxWidth: 440 }}>
            {urunSayisi} ürün, ölçü ve teknik özellikleriyle listeli.
            Konya Teknokent{"'"}ten Türkiye geneline.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
            <Link href="/urunler" className="btn btn-solid" style={{ padding: "16px 26px" }}>
              Katalogu aç
            </Link>
            <Link href="/iletisim" className="btn btn-ghost" style={{ padding: "16px 26px" }}>
              Teklif iste
            </Link>
          </div>
        </div>

        <div className="banner-gorsel">
          {/* Turuncu koni — markanın vurgu rengiyle aynı ve sektörün en tanınır ürünü */}
          <Image src="/images/katalog/90-cm-sekizgen-koni-agirlik-tabanli-2-reflektifli-zt902808a6r2.webp"
                 alt="90 cm ağırlık tabanlı çift reflektifli trafik konisi" fill unoptimized priority
                 sizes="(max-width:900px) 100vw, 46vw"
                 style={{ objectFit: "contain" }} />
        </div>
      </div>

      <style>{`
        .banner{display:grid;grid-template-columns:1fr 0.86fr;gap:40px;align-items:center;
                min-height:min(62vh,520px);padding-top:28px;padding-bottom:28px}
        .banner-gorsel{position:relative;align-self:stretch;min-height:300px}
        @media(max-width:900px){
          .banner{grid-template-columns:1fr;gap:18px;min-height:0;padding-top:30px;padding-bottom:22px}
          .banner-gorsel{min-height:230px;order:-1}
        }
      `}</style>
    </section>
  );
}
