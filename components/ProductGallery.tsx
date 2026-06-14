"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const imgs = images.length > 0 ? images : [""];

  return (
    <div>
      {/* Main image */}
      <div style={{ background: "var(--off-white)", borderRadius: 18, overflow: "hidden", aspectRatio: "1/1", position: "relative", marginBottom: 12 }}>
        {imgs[active] ? (
          <Image
            src={imgs[active]}
            alt={name}
            fill
            style={{ objectFit: "contain", padding: 40 }}
            unoptimized
            priority
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-tertiary)" }}>
            Görsel yok
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {imgs.length > 1 && (
        <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
          {imgs.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                background: "var(--off-white)",
                borderRadius: 10,
                border: i === active ? "2px solid var(--text)" : "2px solid transparent",
                width: 64, height: 64,
                flexShrink: 0,
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <Image src={img} alt={`${name} ${i + 1}`} fill style={{ objectFit: "contain", padding: 6 }} unoptimized />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
