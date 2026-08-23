"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  const imgs = images.length ? images : [""];
  return (
    <div>
      <div style={{ position: "relative", aspectRatio: "1/1", background: "var(--tile)" }}>
        {imgs[i] ? (
          <Image src={imgs[i]} alt={name} fill unoptimized priority
                 style={{ objectFit: "contain", padding: "12%" }} />
        ) : (
          <div style={{ height: "100%", display: "grid", placeItems: "center", color: "var(--muted)" }}>görsel yok</div>
        )}
      </div>
      {imgs.length > 1 && (
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {imgs.map((im, k) => (
            <button key={k} onClick={() => setI(k)}
              style={{ width: 72, height: 72, background: "var(--tile)", position: "relative",
                       border: k === i ? "2px solid var(--ink)" : "2px solid transparent", cursor: "pointer", padding: 0 }}>
              <Image src={im} alt="" fill unoptimized style={{ objectFit: "contain", padding: 8 }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
