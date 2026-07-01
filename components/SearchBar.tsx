"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    if (trimmed) {
      router.push(`/ara?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ flex: 1, maxWidth: 480, display: "flex", alignItems: "center", background: "var(--surface-2)", border: "1.5px solid var(--border)", borderRadius: 8, overflow: "hidden", transition: "border-color 0.15s" }}
      onFocus={e => e.currentTarget.style.borderColor = "var(--orange)"}
      onBlur={e => e.currentTarget.style.borderColor = "var(--border)"}
    >
      <Search size={15} style={{ marginLeft: 12, color: "var(--text-tertiary)", flexShrink: 0 }} />
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Ürün ara... (örn: trafik konisi, membran)"
        style={{ flex: 1, padding: "9px 10px", background: "none", border: "none", outline: "none", fontSize: 13, color: "var(--text)" }}
      />
      {q && (
        <button type="submit"
          style={{ background: "var(--orange)", color: "#fff", border: "none", padding: "0 14px", height: "100%", cursor: "pointer", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
          Ara
        </button>
      )}
    </form>
  );
}
