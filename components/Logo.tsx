/**
 * TRAFİK ÜRÜNLERİ — marka işareti
 * İşaret: retroreflektif şerit motifinden türetilmiş üç eğik blok.
 * Yol çizgisi + uyarı bandı + hız hissi. Ürünlerin kendi dilinden geliyor.
 */
export function LogoMark({ size = 28, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="1" y="20.5" width="30" height="4" fill={color} />
      <path d="M6 4 L14 4 L8 17 L0 17 Z" fill={color} />
      <path d="M17 4 L25 4 L19 17 L11 17 Z" fill={color} />
      <path d="M28 4 L32 4 L32 17 L22 17 Z" fill={color} />
    </svg>
  );
}

export default function Logo({ color = "var(--ink)", compact = false }: { color?: string; compact?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 9, color }}>
      <LogoMark size={compact ? 22 : 26} color={color} />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 0.9 }}>
        <span className="display" style={{ fontSize: compact ? 15 : 18, letterSpacing: "-0.045em" }}>
          TRAFİK
        </span>
        <span style={{ fontSize: compact ? 8.5 : 10, fontWeight: 800, letterSpacing: "0.24em",
                       textTransform: "uppercase", marginTop: 2 }}>
          Ürünleri
        </span>
      </span>
    </span>
  );
}
