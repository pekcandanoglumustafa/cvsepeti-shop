/**
 * trafikurunleri.com — marka işareti
 *
 * Önceki işaret ince çizgili bir koni siluetiydi; küçük boyutta dağılıyordu
 * ve içindeki beyaz bantlar zeminle karışıyordu. Yeni işaret üç katı yatay
 * dilimden kurulu: koni gövdesi iki parça, altında taban. Dilimlerin arası
 * boşluk olduğu için reflektif bantlar her boyutta okunuyor ve işaret tek
 * renkle (currentColor) çalışıyor — turuncu, siyah ya da beyaz zeminde.
 */
export function LogoMark({ size = 33, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={(size * 29) / 33}
      height={size}
      viewBox="0 0 36 38"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M13 3h10l4 10H9zM7 17h22l4 10H3zM1 31h34v5H1z" fill={color} />
    </svg>
  );
}

export default function Logo({ color, compact = false }: { color?: string; compact?: boolean }) {
  return (
    <span className="brand" style={color ? { color } : undefined}>
      <LogoMark size={compact ? 27 : 33} color="var(--orange)" />
      <span>
        trafik<span className="brand-light">urunleri</span>
        <small>.com</small>
      </span>
    </span>
  );
}
