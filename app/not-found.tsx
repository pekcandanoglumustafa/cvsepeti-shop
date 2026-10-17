import Link from "next/link";
import { FIRMA } from "@/lib/firma";

export const metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main style={{ maxWidth: 620, margin: "0 auto", padding: "90px 24px 120px", textAlign: "center" }}>
      <p className="eyebrow" style={{ color: "var(--hi)" }}>404</p>
      <h1 className="display d2" style={{ marginTop: 16 }}>Sayfa bulunamadı</h1>
      <p style={{ marginTop: 18, fontSize: 15.5, lineHeight: 1.75, color: "var(--muted)" }}>
        Aradığınız sayfa taşınmış ya da kaldırılmış olabilir. Ürünü koduyla aratırsanız
        (örneğin ZT8030) büyük ihtimalle katalogda bulursunuz.
      </p>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 34 }}>
        <Link href="/urunler" className="btn btn-solid" style={{ padding: "15px 26px" }}>
          Tüm ürünler
        </Link>
        <Link href="/ara" className="btn btn-ghost" style={{ padding: "15px 26px" }}>
          Ürün ara
        </Link>
        <a href={FIRMA.whatsapp} rel="noopener" className="btn btn-ghost" style={{ padding: "15px 26px" }}>
          WhatsApp'tan sor
        </a>
      </div>

      <div className="rule" style={{ margin: "48px 0 24px" }} />
      <p className="label" style={{ color: "var(--dim)" }}>
        Aradığınızı bulamadıysanız <a href={FIRMA.telefonHref} style={{ color: "var(--ink)" }}>{FIRMA.telefon}</a>{" "}
        numarasından ulaşın — ürünü biz bulalım.
      </p>
    </main>
  );
}
