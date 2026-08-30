const KURUMLAR = [
  { ad: "Jandarma Genel Komutanlığı", kisa: "JGK" },
  { ad: "Hacettepe Üniversitesi", kisa: "HÜ" },
  { ad: "Yargıtay Başkanlığı", kisa: "YB" },
  { ad: "Sahil Güvenlik Komutanlığı", kisa: "SGK" },
  { ad: "Bursa Defterdarlığı", kisa: "BD" },
  { ad: "Mersin İl Sağlık Müdürlüğü", kisa: "MİSM" },
  { ad: "Arnavutköy Devlet Hastanesi", kisa: "ADH" },
];

function Sira({ gizli = false }: { gizli?: boolean }) {
  return (
    <div className="rf-sira" aria-hidden={gizli}>
      {KURUMLAR.map((k) => (
        <span key={k.ad} className="rf-oge">
          <span className="rf-mono" aria-hidden="true">{k.kisa}</span>
          <span className="rf-ad">{k.ad}</span>
        </span>
      ))}
    </div>
  );
}

/**
 * Referans bandı — tedarik edilen kamu kurumları.
 * Sessiz, gri tonlu, yavaş akan. Gösteriş değil güven amaçlı.
 */
export default function Referanslar() {
  return (
    <section className="rf" aria-label="Tedarik ettiğimiz kurumlar">
      <div className="rf-baslik">
        <span className="eyebrow" style={{ color: "var(--dim)" }}>Tedarik ettiğimiz kurumlar</span>
        <span className="rf-cizgi" aria-hidden="true" />
      </div>

      <div className="rf-kayan">
        <Sira />
        <Sira gizli />
      </div>

      <p className="rf-not">
        Kamu ihaleleri ve doğrudan temin kapsamında ürün tedarik edilmiştir.
      </p>

      <style>{`
        .rf{border-top:1px solid var(--hair);border-bottom:1px solid var(--hair);
            padding:34px 0 30px;margin-top:56px;background:#FCFCFC}
        .rf-baslik{max-width:1520px;margin:0 auto 22px;padding:0 20px;
                   display:flex;align-items:center;gap:16px}
        .rf-cizgi{flex:1;height:1px;background:var(--hair)}
        .rf-kayan{overflow:hidden;display:flex;white-space:nowrap;
                  -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);
                  mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
        .rf-sira{display:flex;align-items:center;flex-shrink:0;
                 animation:rf-kay 46s linear infinite}
        .rf-oge{display:inline-flex;align-items:center;gap:12px;padding:0 34px;
                opacity:.62;transition:opacity .25s;filter:grayscale(1)}
        .rf-kayan:hover .rf-oge{opacity:.5}
        .rf-oge:hover{opacity:1!important}
        .rf-mono{display:grid;place-items:center;min-width:46px;height:46px;padding:0 9px;
                 border:1.5px solid var(--ink);font-size:12.5px;font-weight:900;
                 letter-spacing:.02em;color:var(--ink);flex-shrink:0}
        .rf-ad{font-size:14px;font-weight:700;letter-spacing:-.01em;color:var(--ink)}
        @keyframes rf-kay{from{transform:translateX(0)}to{transform:translateX(-100%)}}
        .rf-kayan:hover .rf-sira{animation-play-state:paused}
        .rf-not{max-width:1520px;margin:20px auto 0;padding:0 20px;
                font-size:11.5px;color:var(--dim)}
        @media(prefers-reduced-motion:reduce){
          .rf-sira{animation:none}
          .rf-kayan{flex-wrap:wrap;white-space:normal;justify-content:center;mask-image:none;-webkit-mask-image:none}
          .rf-sira:last-child{display:none}
          .rf-oge{padding:8px 18px}
        }
        @media(max-width:640px){
          .rf-oge{padding:0 22px;gap:10px}
          .rf-mono{min-width:40px;height:40px;font-size:11px}
          .rf-ad{font-size:12.5px}
        }
      `}</style>
    </section>
  );
}
