import Link from "next/link";
import { kartGorseli } from "@/lib/gorsel";
import Image from "next/image";
import { categorySlug } from "@/lib/products";

export default function CategoryCard({ kategori, adet, gorsel }: {
  kategori: string; adet: number; gorsel?: string;
}) {
  return (
    <Link href={`/kategori/${categorySlug(kategori)}`} className="cat" prefetch={false}>
      <div className="ph">
        {gorsel ? (
          <Image src={kartGorseli(gorsel)} alt={kategori} fill unoptimized
                 sizes="(max-width:640px) 50vw,(max-width:1100px) 33vw,25vw"
                 style={{ objectFit: "contain", padding: "9%" }} />
        ) : (
          <div style={{ height: "100%", display: "grid", placeItems: "center", color: "var(--dim)", fontSize: 11 }}>—</div>
        )}
      </div>
      <div className="bar">
        <span className="t display d4" style={{ lineHeight: 1 }}>{kategori}</span>
        <span className="eyebrow" style={{ color: "var(--dim)", whiteSpace: "nowrap" }}>{adet}</span>
      </div>
    </Link>
  );
}
