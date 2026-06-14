"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const imgs = images.length > 0 ? images : [""];
  const isZyro = imgs[active]?.includes("zyrosite.com");
  const bgClass = isZyro ? "bg-[#1a1a1a]" : "bg-[#f5f5f5]";

  return (
    <div>
      <div className={`relative aspect-square ${bgClass} border border-[var(--line)] overflow-hidden`}>
        {imgs[active] ? (
          <Image
            src={imgs[active]}
            alt={name}
            fill
            className="object-contain p-6"
            unoptimized
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--ink-soft)]">
            Görsel yok
          </div>
        )}
      </div>
      {imgs.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {imgs.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 border-2 transition-colors ${
                i === active ? "border-[var(--safety-orange)]" : "border-[var(--line)]"
              } bg-[#f5f5f5]`}
            >
              <Image src={img} alt={`${name} ${i + 1}`} fill className="object-contain p-1" unoptimized />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
