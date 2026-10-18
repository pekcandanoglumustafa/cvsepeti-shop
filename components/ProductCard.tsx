"use client";
import Link from "next/link";
import { kartGorseli } from "@/lib/gorsel";
import Image from "next/image";
import { useCompare } from "@/lib/compare";
import { useState } from "react";
import { Plus, Check, SlidersHorizontal } from "lucide-react";
import { KartUrun, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { urunDesi } from "@/lib/kargo";

/**
 * Ürün adı çoğu üründe "... – ZT8045" biçiminde kodla bitiyor. Kod kartta
 * ayrı satırda gösterildiği için addan ayrılıyor: ad kısalıyor, kod
 * taranabilir oluyor. Kurumsal müşteri ürünü koduyla tanıyor.
 */
function adiAyir(ad: string, kod?: string) {
  const k = (kod || "").trim();
  if (!k) return ad.trim();
  const kacir = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (
    ad.replace(new RegExp(`\\s*[–—-]\\s*${kacir}\\s*$`, "i"), "").trim() ||
    ad.trim()
  );
}

export default function ProductCard({
  product: p,
  oncelik = false,
}: {
  product: KartUrun;
  oncelik?: boolean;
}) {
  const compare = useCompare();
  const compared = compare.items.some((x) => x.id === p.id);
  const add = useCart((s) => s.add);
  const [ok, setOk] = useState(false);
  // kartGorseli: /kart/ altindaki 420px kopyalar ortalama 4 KB, kaynak
  // gorseller 27.6 KB. Kart ekranda 240px — oraya orijinali indirmek
  // katalog sayfasinin agirligini 7 katina cikariyor.
  const img = p.images[0] ? kartGorseli(p.images[0]) : "";
  const ad = adiAyir(p.name, p.kod);
  const yol = `/urun/${p.slug}`;

  // Ölçü, malzeme ve reflektif — şartnameyle karşılaştıranın ilk baktığı üç şey
  const ozellik = [p.boyut, p.malzeme || p.f_malzeme || null, p.reflektif || p.f_reflektif || null].filter(
    Boolean,
  ) as string[];

  const sepeteEkle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(
      {
        slug: p.slug,
        name: p.name,
        price: p.price,
        price_kdv: p.price_kdv,
        image: p.images[0] || "",
        stock: p.stock,
        kategori: p.category,
        desi: urunDesi(p),
        olcu3: p.olcu3,
        geo: p.geo,
        agirlik_kg: p.agirlik_kg,
        agirlikli: p.agirlikli,
        koli_olcu: p.koli_olcu,
        koli_adet: p.koli_adet,
      },
      1,
    );
    setOk(true);
    setTimeout(() => setOk(false), 1700);
  };

  return (
    <article className="product-card">
      <button
        className={`compare-toggle${compared ? " active" : ""}`}
        aria-pressed={compared}
        aria-label={`${ad} ürününü karşılaştır`}
        title="Karşılaştır (en fazla 3 ürün)"
        disabled={!compared && compare.items.length >= 3}
        onClick={() => compare.toggle(p)}
      >
        <SlidersHorizontal className="icon" />
      </button>
      {/* prefetch kapalı: Next, görüş alanına giren her bağlantının tüm verisini
          indiriyor — katalogda 60 kart 60 ayrı istek demek. */}
      <Link
        className="product-photo"
        href={yol}
        prefetch={false}
        aria-label={p.name}
      >
        {p.montaj_dahil ? (
          <span className="product-label">Montaj seti dahil</span>
        ) : p.f_seri === "Ekonomik" ? (
          <span className="product-label orange">Ekonomik seri</span>
        ) : null}
        {img ? (
          <Image
            src={img}
            alt={p.name}
            width={240}
            height={180}
            unoptimized
            loading={oncelik ? "eager" : "lazy"}
            priority={oncelik}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <span
            style={{
              display: "grid",
              placeItems: "center",
              height: "100%",
              color: "var(--dim)",
              fontSize: 11,
            }}
          >
            görsel yok
          </span>
        )}
      </Link>

      <div className="product-info">
        {p.kod && <span className="product-code">{p.kod}</span>}
        <Link href={yol} prefetch={false}>
          <h3>{ad}</h3>
        </Link>

        <div className="product-specs">
          {ozellik.slice(0, 3).map((o) => (
            <span key={o} className="spec-chip">
              {o}
            </span>
          ))}
        </div>

        <div className="product-bottom">
          <div className="price">
            {formatPrice(p.price_kdv)}
            <small>KDV dahil · {formatPrice(p.price)} + KDV</small>
          </div>
          <button
            className={`add-button${ok ? " eklendi" : ""}`}
            onClick={sepeteEkle}
            aria-label={`${p.name} sepete ekle`}
          >
            {ok ? (
              <>
                <Check size={13} strokeWidth={2.6} /> Eklendi
              </>
            ) : (
              <>
                <Plus size={13} strokeWidth={2.6} /> Sepete ekle
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
