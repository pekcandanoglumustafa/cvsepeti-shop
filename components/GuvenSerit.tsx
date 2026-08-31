import { ShieldCheck, Truck, FileText, RotateCcw, Package, Building2, Wrench } from "lucide-react";

const OGE = [
  { i: ShieldCheck, t: "iyzico ile ödeme güvencesi" },
  { i: Truck,       t: "Aynı gün kargo" },
  { i: FileText,    t: "Bireysel ve kurumsal fatura" },
  { i: RotateCcw,   t: "14 gün cayma hakkı" },
  { i: Package,     t: "Üreticiden doğrudan satış" },
  { i: Wrench,      t: "Vida ve dübel dahil" },
  { i: Building2,   t: "Konya Teknokent" },
];

function Sira({ ikinci = false }: { ikinci?: boolean }) {
  return (
    <div className="ks-sira" aria-hidden={ikinci}>
      {OGE.map(({ i: Icon, t }) => (
        <span key={t} className="ks-oge">
          <Icon size={14} strokeWidth={2.6} />
          {t}
        </span>
      ))}
    </div>
  );
}

/** Kayan güven şeridi — turuncu, tek satır, sonsuz döngü */
export default function GuvenSerit() {
  return (
    <div className="ks" role="region" aria-label="Alışveriş güvencesi">
      <Sira />
      <Sira ikinci />
      <style>{`
        .ks{background:var(--hi);color:#fff;overflow:hidden;display:flex;
            white-space:nowrap;position:relative;
            -webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);
            mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
        .ks-sira{display:flex;align-items:center;flex-shrink:0;
                 animation:ks-kay 34s linear infinite}
        .ks-oge{display:inline-flex;align-items:center;gap:7px;
                padding:11px 26px;font-size:11.5px;font-weight:800;
                text-transform:uppercase;letter-spacing:.11em}
        .ks-oge::after{content:"";width:4px;height:4px;border-radius:50%;
                       background:rgba(255,255,255,.55);margin-left:26px}
        @keyframes ks-kay{from{transform:translateX(0)}to{transform:translateX(-100%)}}
        .ks:hover .ks-sira{animation-play-state:paused}
        @media(prefers-reduced-motion:reduce){
          .ks-sira{animation:none}
          .ks{justify-content:center;flex-wrap:wrap;white-space:normal}
          .ks-sira:last-child{display:none}
        }
        @media(max-width:640px){.ks-oge{font-size:10.5px;padding:10px 18px}
          .ks-oge::after{margin-left:18px}}
      `}</style>
    </div>
  );
}
