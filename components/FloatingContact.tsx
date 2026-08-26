"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

/** Masaüstünde sağ altta kalıcı "katalogda ara" kısayolu.
 *  Mobilde gizli — orada yapışkan sepet çubuğu var. */
export default function FloatingContact() {
  const [gor, setGor] = useState(false);
  useEffect(() => {
    const f = () => setGor(window.scrollY > 700);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <Link href="/urunler" className="float-ara" aria-label="Katalogda ara"
      style={{ position: "fixed", right: 22, bottom: 22, zIndex: 55,
               display: gor ? "flex" : "none", alignItems: "center", gap: 9,
               background: "var(--ink)", color: "#fff", padding: "14px 20px",
               textDecoration: "none", fontSize: 12, fontWeight: 800,
               textTransform: "uppercase", letterSpacing: "0.09em" }}>
      <Search size={15} /> Katalogda ara
      <style>{`@media(max-width:820px){.float-ara{display:none!important}}`}</style>
    </Link>
  );
}
