"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  const imgs = images.length ? images : [""];
  return (
    <div>
      <div className="tile" style={{ border: "1px solid var(--hair)" }}>
        {imgs[i] ? (
          <Image src={imgs[i]} alt={name} fill unoptimized priority
                 style={{ objectFit: "contain", padding: "7%" }} />
        ) : (
          <div style={{ height: "100%", display: "grid", placeItems: "center", color: "var(--dim)" }}>görsel yok</div>
        )}
      </div>
      {imgs.length > 1 && (
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {imgs.map((im, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Görsel ${k + 1}`}
              style={{ width: 76, height: 76, background: "var(--tile)", position: "relative", cursor: "pointer",
                       padding: 0, border: k === i ? "2px solid var(--ink)" : "1px solid var(--hair)" }}>
              <Image src={im} alt="" fill unoptimized style={{ objectFit: "contain", padding: 7 }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
