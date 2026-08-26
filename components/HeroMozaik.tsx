import Link from "next/link";
import Image from "next/image";
import { categorySlug } from "@/lib/products";
import hero from "@/data/hero.json";

type Karo = { kat: string; img: string; ad: string; adet: number };

export default function HeroMozaik() {
  const karolar = hero as Karo[];
  return (
    <div className="mozaik">
      {karolar.map((k, i) => (
        <Link key={k.kat} href={`/kategori/${categorySlug(k.kat)}`} className="mz" aria-label={`${k.kat} — ${k.adet} ürün`}>
          <Image src={k.img} alt={k.kat} fill unoptimized
                 priority={i < 4} sizes="(max-width:640px) 33vw, (max-width:1100px) 22vw, 15vw"
                 style={{ objectFit: "contain", padding: "13%" }} />
          <span className="mz-ad">{k.kat}</span>
          <span className="mz-n">{k.adet}</span>
        </Link>
      ))}
      <style>{`
        .mozaik{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
        .mz{position:relative;aspect-ratio:1/1;background:var(--tile);
            border:1px solid var(--hair);display:block;overflow:hidden;
            text-decoration:none;color:inherit;transition:border-color .18s}
        .mz img{transition:transform .45s cubic-bezier(.2,.7,.2,1)}
        .mz:hover{border-color:var(--ink)}
        .mz:hover img{transform:scale(1.09)}
        .mz-ad{position:absolute;left:7px;right:7px;bottom:6px;font-size:8.5px;font-weight:800;
               text-transform:uppercase;letter-spacing:.05em;line-height:1.15;color:var(--muted);
               overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
        .mz:hover .mz-ad{color:var(--hi)}
        .mz-n{position:absolute;right:6px;top:5px;font-size:8.5px;font-weight:800;color:var(--dim)}
        @media(max-width:1100px){.mozaik{grid-template-columns:repeat(4,1fr)}}
        @media(max-width:640px){.mozaik{grid-template-columns:repeat(3,1fr);gap:5px}
          .mz-ad{font-size:8px}}
      `}</style>
    </div>
  );
}
