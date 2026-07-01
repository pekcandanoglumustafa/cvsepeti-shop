"use client";

import Link from "next/link";
import { categories, categorySlug } from "@/lib/products";

const categoryEmoji: Record<string, string> = {
  "Trafik Konisi & Duba": "🚧",
  "Trafik Uyarı Levhaları": "🚦",
  "Yalıtım Malzemesi": "🏗️",
  "Yol İşaretleme & Kasis": "🛑",
  "Dikme & Panel Sistemleri": "⚠️",
  "Delinatör": "🔶",
  "İş Güvenliği Ekipmanları": "🦺",
  "Güvenlik Bariyeri & Aynası": "🪞",
  "Araç Stoperi": "🚗",
  "Elektrikçi Eldiveni": "⚡",
};

const items = [...categories, ...categories, ...categories];

export default function CategoryMarquee() {
  return (
    <div style={{ overflow: "hidden", position: "relative", padding: "2px 0" }}>
      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to right, var(--bg), transparent)", zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to left, var(--bg), transparent)", zIndex: 1, pointerEvents: "none" }} />

      <div className="cat-marquee-track">
        {items.map((c, i) => (
          <Link
            key={i}
            href={`/kategori/${categorySlug(c)}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "#fff",
              border: "1.5px solid var(--border)",
              borderRadius: 20,
              padding: "8px 18px",
              fontSize: 13, fontWeight: 500,
              color: "var(--text-secondary)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--orange)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          >
            <span style={{ fontSize: 16 }}>{categoryEmoji[c] || "📦"}</span>
            {c}
          </Link>
        ))}
      </div>
    </div>
  );
}
