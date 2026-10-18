import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Truck, FileText, Phone, Check } from "lucide-react";
import { allProducts, categories, categorySlug, kartUrunler } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Banner from "@/components/Banner";
import KullanimAlanlari from "@/components/KullanimAlanlari";
import Referanslar from "@/components/Referanslar";
import { tumYazilar } from "@/lib/blog";
import { FIRMA } from "@/lib/firma";
import kapaklar from "@/data/kategori_kapak.json";
import coksatan from "@/data/coksatan.json";

export const metadata = { alternates: { canonical: "/" } };

const KAPAK = kapaklar as Record<string, { img: string; w: number; adet: number }>;

const GUVEN = [
  { i: ShieldCheck, b: "Güvenli alışveriş", a: "iyzico altyapısı, 3D Secure" },
  { i: Truck, b: "Türkiye geneline gönderim", a: `${FIRMA.kargo} ile 1-2 iş günü` },
  { i: FileText, b: "Kurumsal fatura", a: "Bireysel ve kurumsal alışveriş" },
  { i: Phone, b: "Ürün seçiminde destek", a: FIRMA.telefon },
];

export default function Home() {
  const sayilar = categories
    .map((c) => ({ c, n: allProducts.filter((p) => p.category === c).length }))
    .sort((a, b) => b.n - a.n);

  const csSlug = (coksatan as { slug: string }[]).map((c) => c.slug);
  const cokSatanlar = csSlug
    .map((sl) => allProducts.find((x) => x.slug === sl))
    .filter(Boolean)
    .slice(0, 8) as NonNullable<ReturnType<typeof allProducts.find>>[];

  // Kahraman alanındaki ürün: çok satanların ilki, ölçüsü bilinen bir ürün
  const heroUrun = cokSatanlar.find((p) => p.boyut && p.images[0]) ?? cokSatanlar[0];

  return (
    <main>
      <Banner urunSayisi={allProducts.length} kategoriSayisi={categories.length}
              urun={heroUrun && {
                slug: heroUrun.slug, name: heroUrun.name,
                price_kdv: heroUrun.price_kdv, images: heroUrun.images, boyut: heroUrun.boyut,
              }} />

      <div className="wrap">
        <div className="trust-row">
          {GUVEN.map(({ i: Icon, b, a }) => (
            <div key={b} className="trust-item">
              <Icon className="icon" size={19} strokeWidth={1.9} aria-hidden />
              <span><strong>{b}</strong><small>{a}</small></span>
            </div>
          ))}
        </div>
      </div>

      {/* KATEGORİLER */}
      <section className="section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <h2>İhtiyacınız olan, tam burada.</h2>
              <p>En çok aranan ürün gruplarını keşfedin.</p>
            </div>
            <Link href="/urunler" className="text-link" prefetch={false}>
              Tüm kategoriler <ArrowUpRight className="icon" size={16} strokeWidth={2.2} aria-hidden />
            </Link>
          </div>
          <div className="category-grid">
            {sayilar.slice(0, 6).map(({ c, n }) => (
              <CategoryCard key={c} kategori={c} adet={n} gorsel={KAPAK[c]?.img} />
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 11.5, color: "var(--muted)" }}>
            Aradığınız ürün farklı mı?{" "}
            <Link href="/urunler" prefetch={false}
                  style={{ color: "var(--ink)", fontWeight: 700, textDecoration: "underline",
                           textUnderlineOffset: 3 }}>
              {categories.length} kategorinin tamamına göz atın.
            </Link>
          </p>
        </div>
      </section>

      {/* ÇOK SATANLAR */}
      {cokSatanlar.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-heading">
              <div>
                <h2>Sahanın vazgeçilmezleri.</h2>
                <p>Günlük ihtiyaçlardan büyük projelere, en çok tercih edilen ürünler.</p>
              </div>
              <Link href="/urunler" className="text-link" prefetch={false}>
                Tümünü gör <ArrowUpRight className="icon" size={16} strokeWidth={2.2} aria-hidden />
              </Link>
            </div>
            <div className="product-grid">
              {kartUrunler(cokSatanlar).map((p, i) => (
                <ProductCard key={p.id} product={p} oncelik={i < 4} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* KULLANIM ALANLARI */}
      <section className="section" style={{ background: "var(--wash)" }}>
        <div className="wrap">
          <div className="section-heading">
            <div>
              <h2>Nerede kullanacaksınız?</h2>
              <p>Ürün adını bilmiyorsanız, ihtiyacınızdan başlayın.</p>
            </div>
          </div>
          <KullanimAlanlari />
        </div>
      </section>

      {/* TOPLU ALIM */}
      <div className="wrap">
        <section className="business-banner">
          <div style={{ position: "relative", zIndex: 2 }}>
            <p className="kas">Kurumsal &amp; toplu alım</p>
            <h2>Büyük projeler için<br /><em>birlikte planlayalım.</em></h2>
            <p>
              Teknik şartnameye göre ürün eşleştirip birim fiyat teklif cetvelini hazırlıyoruz.
              Şartnameyi gönderin, aynı gün dönelim.
            </p>
          </div>
          <div className="business-side">
            <Link href="/iletisim" className="btn">
              Toplu teklif oluştur <ArrowUpRight className="icon" size={18} strokeWidth={2.2} aria-hidden />
            </Link>
            <div className="business-list">
              {["Şartnamedeki her kalem için ürün eşleştirmesi",
                "Ürün kodu ve teknik özellikleriyle birlikte teklif",
                "Jandarma, Yargıtay ve Hacettepe dahil kamu teslimatı"].map((t) => (
                <span key={t}>
                  <Check className="icon" size={14} strokeWidth={2.6} aria-hidden />{t}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* REFERANSLAR */}
      <section className="section">
        <div className="wrap">
          <div className="section-heading">
            <div><h2>Teslim ettiğimiz kurumlar</h2></div>
          </div>
        </div>
        <Referanslar />
      </section>

      {/* REHBERLER */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-heading">
            <div>
              <h2>Doğru ürünü seçmek kolay.</h2>
              <p>Satın almadan önce ihtiyacınıza uygun özellikleri keşfedin.</p>
            </div>
            <Link href="/blog" className="text-link" prefetch={false}>
              Tüm rehberler <ArrowUpRight className="icon" size={16} strokeWidth={2.2} aria-hidden />
            </Link>
          </div>
          <div className="guide-grid">
            {tumYazilar().slice(0, 3).map((y, i) => (
              <Link key={y.slug} href={`/blog/${y.slug}`} className="guide-card" prefetch={false}>
                <span className="no">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <h3>{y.baslik}</h3>
                  <p>{y.ozet}</p>
                  <span className="text-link">
                    Rehberi incele
                    <ArrowUpRight className="icon" size={14} strokeWidth={2.2} aria-hidden />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
