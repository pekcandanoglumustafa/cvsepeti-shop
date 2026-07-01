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

// Duplicate array so the marquee loops seamlessly
const items = [...categories, ...categories];

export default function CategoryMarquee() {
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 48, background: "linear-gradient(to right, var(--bg), transparent)", zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 48, background: "linear-gradient(to left, var(--bg), transparent)", zIndex: 1, pointerEvents: "none" }} />

      <div style={{ display: "flex", gap: 10, width: "max-content", animation: "catmarquee 28s linear infinite" }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {items.map((c, i) => (
          <Link key={i} href={`/kategori/${categorySlug(c)}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "#fff", border: "1.5px solid var(--border)",
              borderRadius: 20, padding: "7px 16px",
              fontSize: 13, fontWeight: 500, color: "var(--text-secondary)",
              textDecoration: "none", whiteSpace: "nowrap",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--orange)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          >
            {categoryEmoji[c] || "📦"} {c}
          </Link>
        ))}
      </div>

      <style>{`
        @keyframes catmarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
