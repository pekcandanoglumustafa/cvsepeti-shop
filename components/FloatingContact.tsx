"use client";
import { useEffect, useState } from "react";
import { Phone, MessageCircle, X, Plus } from "lucide-react";

const TEL = "05076584245";
const WA = "905076584245";

export default function FloatingContact() {
  const [acik, setAcik] = useState(false);
  const [gor, setGor] = useState(false);

  useEffect(() => {
    const f = () => setGor(window.scrollY > 300);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <div className="fc" aria-hidden={!gor}
         style={{ position: "fixed", right: 16, bottom: 16, zIndex: 55,
                  display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 9,
                  opacity: gor ? 1 : 0, pointerEvents: gor ? "auto" : "none",
                  transition: "opacity .25s" }}>

      {acik && (
        <>
          <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Merhaba, ürünleriniz hakkında bilgi almak istiyorum.")}`}
             target="_blank" rel="noopener noreferrer" className="fc-b"
             style={{ background: "#25D366", color: "#fff" }}>
            <MessageCircle size={17} strokeWidth={2.4} /> WhatsApp
          </a>
          <a href={`tel:${TEL}`} className="fc-b" style={{ background: "var(--ink)", color: "#fff" }}>
            <Phone size={16} strokeWidth={2.4} /> 0 507 658 42 45
          </a>
        </>
      )}

      <button onClick={() => setAcik(!acik)} aria-expanded={acik}
              aria-label={acik ? "İletişimi kapat" : "İletişim seçenekleri"}
              style={{ width: 50, height: 50, borderRadius: "50%", border: "none", cursor: "pointer",
                       background: acik ? "var(--ink)" : "var(--hi)", color: "#fff",
                       display: "grid", placeItems: "center",
                       boxShadow: "0 6px 22px rgba(0,0,0,.22)",
                       transition: "background .18s, transform .18s",
                       transform: acik ? "rotate(45deg)" : "none" }}>
        {acik ? <Plus size={22} strokeWidth={2.6} /> : <MessageCircle size={21} strokeWidth={2.4} />}
      </button>

      <style>{`
        .fc-b{display:inline-flex;align-items:center;gap:8px;padding:11px 16px;
              font-size:12.5px;font-weight:800;text-decoration:none;white-space:nowrap;
              box-shadow:0 4px 16px rgba(0,0,0,.18);
              animation:fc-in .2s cubic-bezier(.2,.8,.2,1)}
        @keyframes fc-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @media(max-width:820px){.fc{bottom:78px}}
      `}</style>
    </div>
  );
}
