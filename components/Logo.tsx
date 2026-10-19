/**
 * trafikurunleri.com — marka işareti
 * İşaret: trafik konisi. Sektörün en tanınır simgesi, tek bakışta anlaşılır.
 * İki reflektif bant negatif alan olarak boşaltılmıştır.
 */
export function LogoMark({ size = 28, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {/* koni gövdesi — bantlar negatif boşluk */}
      <path
        d="M14.6 3.2h2.8c.5 0 .9.3 1.05.8l5.7 21.4H8.85L14.55 4c.15-.5.55-.8 1.05-.8Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      />
      <rect x="11.4" y="12.2" width="9.2" height="2.9" fill="#fff" />
      <rect x="9.7" y="18.6" width="12.6" height="2.9" fill="#fff" />
      {/* taban */}
      <rect x="4.6" y="25.8" width="22.8" height="3.4" rx="0.6" fill={color} />
    </svg>
  );
}

export default function Logo({ color = "var(--ink)", compact = false }: { color?: string; compact?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color }}>
      <LogoMark size={compact ? 24 : 30} color={color} />
      <span className="display"
            style={{ fontSize: compact ? 15 : 19, letterSpacing: "-0.045em", textTransform: "none" }}>
        trafikurunleri<span style={{ color: "var(--hi)" }}>.com</span>
      </span>
    </span>
  );
}
