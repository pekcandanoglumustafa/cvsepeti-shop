import Link from "next/link";
import { ArrowUpRight, SquareParking, TriangleAlert, Building2, Landmark } from "lucide-react";
import { categorySlug } from "@/lib/products";

/**
 * Kullanım alanına göre giriş.
 *
 * Ziyaretçi genelde "trafik konisi" diye değil, "otoparkımı düzenleyeceğim"
 * diye geliyor. Her kart gerçek bir kategoriye bağlanıyor — ayrı bir
 * etiketleme sistemi ya da uydurma filtre yok.
 */
const ALANLAR = [
  { i: SquareParking, b: "Otopark düzenliyorum",
    a: "Park alanı, araç yönlendirme ve kolon koruması için ürünler.",
    kat: "Araç Stoperi" },
  { i: TriangleAlert, b: "Şantiye güvenliği",
    a: "Çalışma alanını ayırmak ve görünür kılmak için ürünler.",
    kat: "Trafik Konisi" },
  { i: Building2, b: "Site ve apartman",
    a: "Giriş, park alanı ve ortak kullanım alanları için çözümler.",
    kat: "Hız Kesici Kasis" },
  { i: Landmark, b: "Belediye ve kamu alımı",
    a: "Yol düzenleme, erişilebilirlik ve alan güvenliği için ürünler.",
    kat: "Delinatör" },
];

export default function KullanimAlanlari() {
  return (
    <div className="use-grid">
      {ALANLAR.map(({ i: Icon, b, a, kat }) => (
        <Link key={b} href={`/kategori/${categorySlug(kat)}`} className="use-card" prefetch={false}>
          <Icon className="icon" size={26} strokeWidth={1.7} aria-hidden />
          <h3>{b}</h3>
          <p>{a}</p>
          <span className="text-link">
            Ürünleri keşfet
            <ArrowUpRight className="icon" size={15} strokeWidth={2.2} aria-hidden />
          </span>
        </Link>
      ))}
    </div>
  );
}
