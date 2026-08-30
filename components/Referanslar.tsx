"use client";
import { useEffect, useRef, useState } from "react";

const KURUMLAR = [
  { ad: "Jandarma Genel Komutanlığı", kisa: "JGK" },
  { ad: "Hacettepe Üniversitesi", kisa: "HÜ" },
  { ad: "Yargıtay Başkanlığı", kisa: "YB" },
  { ad: "Sahil Güvenlik Komutanlığı", kisa: "SGK" },
  { ad: "Bursa Defterdarlığı", kisa: "BD" },
  { ad: "Mersin İl Sağlık Müdürlüğü", kisa: "MİSM" },
  { ad: "Arnavutköy Devlet Hastanesi", kisa: "ADH" },
];

/**
 * Referans bandı.
 * Kendi kendine akar; kullanıcı dokunup sürükleyince akış durur ve
 * bant elle kaydırılır. Bırakınca kaldığı yerden devam eder.
 */
export default function Referanslar() {
  const ref = useRef<HTMLDivElement>(null);
  const [surukle, setSurukle] = useState(false);
  const durum = useRef({ basX: 0, basScroll: 0, hiz: 0, sonX: 0, sonT: 0 });
  const [duraklat, setDuraklat] = useState(false);

  // otomatik akış — scrollLeft ile, sürüklemeyle aynı eksende
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0, sonT = performance.now();
    const adim = (t: number) => {
      const dt = t - sonT; sonT = t;
      if (!duraklat && !surukle && el) {
        el.scrollLeft += (dt / 1000) * 34;                  // 34 px/sn
        const yari = el.scrollWidth / 2;
        if (el.scrollLeft >= yari) el.scrollLeft -= yari;   // kesintisiz döngü
      }
      raf = requestAnimationFrame(adim);
    };
    raf = requestAnimationFrame(adim);
    return () => cancelAnimationFrame(raf);
  }, [duraklat, surukle]);

  const bas = (x: number) => {
    const el = ref.current; if (!el) return;
    setSurukle(true);
    durum.current = { basX: x, basScroll: el.scrollLeft, hiz: 0, sonX: x, sonT: performance.now() };
  };
  const hareket = (x: number) => {
    const el = ref.current; if (!el || !surukle) return;
    el.scrollLeft = durum.current.basScroll - (x - durum.current.basX);
    const t = performance.now(), dt = t - durum.current.sonT;
    if (dt > 0) durum.current.hiz = (durum.current.sonX - x) / dt;
    durum.current.sonX = x; durum.current.sonT = t;
  };
  const birak = () => {
    if (!surukle) return;
    setSurukle(false);
    // atalet: bırakınca biraz daha kaysın
    const el = ref.current; if (!el) return;
    let v = durum.current.hiz * 16;
    const sonum = () => {
      if (Math.abs(v) < 0.4 || !ref.current) return;
      ref.current.scrollLeft += v; v *= 0.93;
      const yari = ref.current.scrollWidth / 2;
      if (ref.current.scrollLeft >= yari) ref.current.scrollLeft -= yari;
      if (ref.current.scrollLeft < 0) ref.current.scrollLeft += yari;
      requestAnimationFrame(sonum);
    };
    requestAnimationFrame(sonum);
  };

  const Oge = ({ k }: { k: (typeof KURUMLAR)[number] }) => (
    <span className="rf-oge">
      <span className="rf-mono" aria-hidden="true">{k.kisa}</span>
      <span className="rf-ad">{k.ad}</span>
    </span>
  );

  return (
    <section className="rf" aria-label="Tedarik ettiğimiz kurumlar">
      <div className="rf-baslik">
        <span className="eyebrow" style={{ color: "var(--dim)" }}>Tedarik ettiğimiz kurumlar</span>
        <span className="rf-cizgi" aria-hidden="true" />
      </div>

      <div
        ref={ref}
        className={`rf-kayan${surukle ? " tutuluyor" : ""}`}
        onMouseEnter={() => setDuraklat(true)}
        onMouseLeave={() => { setDuraklat(false); birak(); }}
        onMouseDown={(e) => { e.preventDefault(); bas(e.clientX); }}
        onMouseMove={(e) => hareket(e.clientX)}
        onMouseUp={birak}
        onTouchStart={(e) => bas(e.touches[0].clientX)}
        onTouchMove={(e) => hareket(e.touches[0].clientX)}
        onTouchEnd={birak}
        role="group"
        aria-roledescription="kaydırılabilir liste"
      >
        <div className="rf-sira">
          {KURUMLAR.map((k) => <Oge key={k.ad} k={k} />)}
        </div>
        <div className="rf-sira" aria-hidden="true">
          {KURUMLAR.map((k) => <Oge key={k.ad + "2"} k={k} />)}
        </div>
      </div>

      <p className="rf-not">Kamu ihaleleri ve doğrudan temin kapsamında ürün tedarik edilmiştir.</p>

      <style>{`
        .rf{border-top:1px solid var(--hair);border-bottom:1px solid var(--hair);
            padding:26px 0 24px;margin-top:24px;background:#FCFCFC}
        .rf-baslik{max-width:1520px;margin:0 auto 20px;padding:0 20px;
                   display:flex;align-items:center;gap:16px}
        .rf-cizgi{flex:1;height:1px;background:var(--hair)}

        .rf-kayan{display:flex;overflow-x:auto;overflow-y:hidden;white-space:nowrap;
                  cursor:grab;scrollbar-width:none;-ms-overflow-style:none;
                  -webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;
                  -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);
                  mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
        .rf-kayan::-webkit-scrollbar{display:none}
        .rf-kayan.tutuluyor{cursor:grabbing}
        .rf-kayan.tutuluyor .rf-oge{opacity:.85}

        .rf-sira{display:flex;align-items:center;flex-shrink:0}
        .rf-oge{display:inline-flex;align-items:center;gap:12px;padding:0 34px;
                opacity:.62;transition:opacity .25s;user-select:none;-webkit-user-select:none}
        .rf-oge:hover{opacity:1}
        .rf-mono{display:grid;place-items:center;min-width:46px;height:46px;padding:0 9px;
                 border:1.5px solid var(--ink);font-size:12.5px;font-weight:900;
                 color:var(--ink);flex-shrink:0;pointer-events:none}
        .rf-ad{font-size:14px;font-weight:700;letter-spacing:-.01em;color:var(--ink);pointer-events:none}

        .rf-not{max-width:1520px;margin:18px auto 0;padding:0 20px;font-size:11.5px;color:var(--dim)}

        @media(max-width:640px){
          .rf-oge{padding:0 22px;gap:10px}
          .rf-mono{min-width:40px;height:40px;font-size:11px}
          .rf-ad{font-size:12.5px}
        }
      `}</style>
    </section>
  );
}
