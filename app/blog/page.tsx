import Link from "next/link";
import { tumYazilar, blogKategoriler } from "@/lib/blog";

export const metadata = {
  title: "Rehberler ve Teknik Yazılar",
  description: "Trafik konisi, delinatör, hız kesici kasis ve yol güvenliği ekipmanları hakkında teknik rehberler, seçim kılavuzları ve kamu ihalesi bilgileri.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  const yazilar = tumYazilar();
  const kategoriler = blogKategoriler();

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 60px" }}>
      <p className="eyebrow" style={{ color: "var(--hi)" }}>Bilgi merkezi</p>
      <h1 className="display d2" style={{ marginTop: 16 }}>Rehberler</h1>
      <p className="lede" style={{ marginTop: 16, maxWidth: 620 }}>
        Ürün seçimi, teknik standartlar, montaj ve kamu ihalesi süreçleri hakkında
        sahada işe yarayan bilgiler.
      </p>

      <div className="rule" style={{ margin: "34px 0 0" }} />

      {yazilar.map((y) => (
        <Link key={y.slug} href={`/blog/${y.slug}`}
              style={{ display: "block", padding: "28px 0", borderBottom: "1px solid var(--hair)",
                       textDecoration: "none", color: "inherit" }} className="card">
          <div style={{ display: "flex", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
            <span className="eyebrow" style={{ color: "var(--hi)" }}>{y.kategori}</span>
            <span className="eyebrow" style={{ color: "var(--dim)" }}>{y.okuma} dk okuma</span>
          </div>
          <h2 className="name display d4" style={{ maxWidth: 760, lineHeight: 1.05 }}>{y.baslik}</h2>
          <p style={{ marginTop: 12, fontSize: 14.5, color: "var(--muted)", lineHeight: 1.65, maxWidth: 760 }}>
            {y.ozet}
          </p>
        </Link>
      ))}

      {kategoriler.length > 1 && (
        <div style={{ marginTop: 40, display: "flex", gap: 9, flexWrap: "wrap" }}>
          {kategoriler.map((k) => (
            <span key={k} className="label" style={{ padding: "9px 14px", border: "1px solid var(--hair)" }}>{k}</span>
          ))}
        </div>
      )}
    </main>
  );
}
