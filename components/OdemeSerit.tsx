import { Lock } from "lucide-react";

/**
 * Ödeme güven bandı — sabit, kaymaz.
 * iyzico kurumsal mavisi zemin üzerinde beyaz yazı.
 */
export default function OdemeSerit() {
  return (
    <div style={{ background: "#1E64FF", color: "#fff" }}>
      <div style={{ maxWidth: 1520, margin: "0 auto", padding: "9px 20px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 14, flexWrap: "wrap" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
          <Lock size={13} strokeWidth={2.8} />
          <span style={{ fontSize: 11.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em" }}>
            iyzico ile güvenli ödeme
          </span>
        </span>

        <span aria-hidden="true" style={{ width: 1, height: 13, background: "rgba(255,255,255,.4)" }} />

        {/* kart ağları — sade metin rozetleri */}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          {["VISA", "MASTERCARD", "TROY", "3D SECURE"].map((k) => (
            <span key={k} style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: ".08em",
                                   padding: "3px 7px", border: "1px solid rgba(255,255,255,.45)",
                                   borderRadius: 2, whiteSpace: "nowrap" }}>
              {k}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
