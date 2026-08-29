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
        <Link key={k.kat} href={`/kategori/${categorySlug(k.kat)}`} className="mz"
              aria-label={`${k.kat} — ${k.adet} ürün`}>
          <span className="mz-ph">
            <Image src={k.img} alt={k.kat} fill unoptimized
                   loading={i < 8 ? "eager" : "lazy"} sizes="(max-width:640px) 25vw, 12vw"
                   style={{ objectFit: "contain", padding: "11%" }} />
            <span className="mz-n">{k.adet}</span>
          </span>
          <span className="mz-ad">{k.kat}</span>
        </Link>
      ))}
      <style>{`
        .mozaik{display:grid;grid-template-columns:repeat(8,1fr);gap:6px}
        .mz{display:flex;flex-direction:column;text-decoration:none;color:inherit;
            border:1px solid var(--hair);transition:border-color .18s;overflow:hidden}
        .mz:hover{border-color:var(--ink)}
        .mz-ph{position:relative;display:block;aspect-ratio:1/1;background:var(--tile)}
        .mz-ph img{transition:transform .4s cubic-bezier(.2,.7,.2,1)}
        .mz:hover .mz-ph img{transform:scale(1.09)}
        .mz-n{position:absolute;right:5px;top:4px;font-size:8.5px;font-weight:800;color:var(--dim)}
        .mz-ad{display:block;padding:5px 6px 7px;font-size:8.5px;font-weight:800;
               text-transform:uppercase;letter-spacing:.04em;line-height:1.2;
               color:var(--muted);border-top:1px solid var(--hair);
               min-height:2.9em;background:#fff}
        .mz:hover .mz-ad{color:var(--hi)}
        @media(max-width:1300px){.mozaik{grid-template-columns:repeat(7,1fr)}}
        @media(max-width:1100px){.mozaik{grid-template-columns:repeat(6,1fr)}}
        @media(max-width:820px){.mozaik{grid-template-columns:repeat(5,1fr)}}
        @media(max-width:640px){.mozaik{grid-template-columns:repeat(4,1fr);gap:5px}
          .mz-ad{font-size:8px;min-height:3.1em}}
        @media(max-width:400px){.mozaik{grid-template-columns:repeat(3,1fr)}}
      `}</style>
    </div>
  );
}
