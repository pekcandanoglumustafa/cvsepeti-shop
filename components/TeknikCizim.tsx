import type { Product } from "@/lib/products";

/**
 * Ürün ölçülerini gösteren teknik çizim.
 * Geometri sınıfına göre uygun siluet çizilir, ölçü okları eklenir.
 */
export default function TeknikCizim({ p }: { p: Product }) {
  const o = p.olcu3 || [];
  if (o.length < 3) return null;
  const [boy, en, derin] = o;

  const W = 300, H = 210, M = 42;
  const cizimH = H - M - 22;
  const olcek = cizimH / boy;
  const h = boy * olcek;
  const w = Math.min(en * olcek, 150);
  const cx = 118;
  const alt = H - 26;
  const ust = alt - h;

  let siluet: React.ReactNode;
  if (p.geo === "KONIK") {
    siluet = (
      <>
        <path d={`M ${cx - 6} ${ust} L ${cx + 6} ${ust} L ${cx + w / 2 - 6} ${alt - 9} L ${cx - w / 2 + 6} ${alt - 9} Z`}
              fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x={cx - w / 2} y={alt - 9} width={w} height="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <line x1={cx - w / 2 + 12} y1={ust + h * 0.34} x2={cx + w / 2 - 12} y2={ust + h * 0.34}
              stroke="currentColor" strokeWidth="4" opacity=".28" />
        <line x1={cx - w / 2 + 7} y1={ust + h * 0.62} x2={cx + w / 2 - 7} y2={ust + h * 0.62}
              stroke="currentColor" strokeWidth="4" opacity=".28" />
      </>
    );
  } else if (p.geo === "BORU") {
    const gw = Math.max(9, w * 0.42);
    siluet = (
      <>
        <rect x={cx - gw / 2} y={ust} width={gw} height={h - 7} rx="2.5"
              fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx={cx} cy={alt - 3} rx={w / 2} ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <line x1={cx - gw / 2} y1={ust + h * 0.2} x2={cx + gw / 2} y2={ust + h * 0.2}
              stroke="currentColor" strokeWidth="4" opacity=".28" />
        <line x1={cx - gw / 2} y1={ust + h * 0.42} x2={cx + gw / 2} y2={ust + h * 0.42}
              stroke="currentColor" strokeWidth="4" opacity=".28" />
      </>
    );
  } else {
    const yh = Math.max(14, derin * olcek);
    siluet = (
      <rect x={cx - w / 2} y={alt - yh} width={w} height={yh} rx="2"
            fill="none" stroke="currentColor" strokeWidth="1.6" />
    );
  }

  const O = ({ x1, y1, x2, y2 }: Record<string, number>) => (
    <g stroke="currentColor" strokeWidth="0.9" opacity=".55">
      <line x1={x1} y1={y1} x2={x2} y2={y2} markerStart="url(#ok)" markerEnd="url(#ok)" />
    </g>
  );

  return (
    <div style={{ border: "1px solid var(--hair)", padding: "14px 16px" }}>
      <p className="eyebrow" style={{ color: "var(--dim)", marginBottom: 8 }}>Teknik çizim</p>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 340, color: "var(--ink)" }}
           role="img" aria-label={`${p.name} ölçü şeması`}>
        <defs>
          <marker id="ok" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
            <path d="M0,1 L5,3.5 L0,6" fill="none" stroke="currentColor" strokeWidth="0.9" />
          </marker>
        </defs>

        {siluet}

        {/* yükseklik oku */}
        <O x1={cx + w / 2 + 22} y1={ust} x2={cx + w / 2 + 22} y2={alt} />
        <text x={cx + w / 2 + 29} y={(ust + alt) / 2 + 3} fontSize="10.5" fontWeight="700" fill="currentColor">
          {boy.toFixed(0)} cm
        </text>

        {/* genişlik oku */}
        <O x1={cx - w / 2} y1={alt + 13} x2={cx + w / 2} y2={alt + 13} />
        <text x={cx} y={alt + 26} fontSize="10.5" fontWeight="700" textAnchor="middle" fill="currentColor">
          {en.toFixed(0)} cm
        </text>
      </svg>

      <p style={{ fontSize: 11, color: "var(--dim)", marginTop: 6, lineHeight: 1.5 }}>
        Ölçüler yaklaşıktır, üretim toleransı ±%3.
        {p.agirlik_kg ? ` Ağırlık ${p.agirlik_kg} kg.` : ""}
      </p>
    </div>
  );
}
