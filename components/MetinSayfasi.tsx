import type { ReactNode } from "react";

/** Sözleşme / bilgilendirme sayfaları için ortak düzen. */
export default function MetinSayfasi({
  ustBaslik, baslik, giris, guncelleme, children,
}: {
  ustBaslik: string; baslik: string; giris?: string; guncelleme?: string; children: ReactNode;
}) {
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px 96px" }}>
      <p className="eyebrow" style={{ color: "var(--hi)" }}>{ustBaslik}</p>
      <h1 className="display d2" style={{ marginTop: 16 }}>{baslik}</h1>
      {giris && (
        <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.75, color: "var(--muted)" }}>{giris}</p>
      )}
      <div className="rule" style={{ margin: "34px 0 30px" }} />
      <div className="metin">{children}</div>
      {guncelleme && (
        <p className="eyebrow" style={{ color: "var(--dim)", marginTop: 48 }}>
          Son güncelleme: {guncelleme}
        </p>
      )}
      <style>{`
        .metin h2{font-size:20px;font-weight:800;margin:38px 0 12px;letter-spacing:-.01em}
        .metin h2:first-child{margin-top:0}
        .metin h3{font-size:15.5px;font-weight:700;margin:26px 0 8px}
        .metin p{font-size:15px;line-height:1.8;color:var(--muted);margin:0 0 14px}
        .metin ul,.metin ol{margin:0 0 16px;padding-left:22px}
        .metin li{font-size:15px;line-height:1.8;color:var(--muted);margin-bottom:7px}
        .metin a{color:var(--ink);text-decoration:underline;text-underline-offset:3px}
        .metin strong{color:var(--ink);font-weight:700}
        .metin table{width:100%;border-collapse:collapse;margin:0 0 20px;font-size:14.5px}
        .metin td{padding:11px 0;border-bottom:1px solid var(--hair);vertical-align:top;line-height:1.65}
        .metin td:first-child{width:190px;color:var(--dim);padding-right:18px}
      `}</style>
    </main>
  );
}
