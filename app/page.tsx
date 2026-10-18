import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Truck,
  FileText,
  Phone,
} from "lucide-react";
import { allProducts, categories, kartUrunler } from "@/lib/products";
import CategoryCard from "@/components/CategoryCard";
import Banner from "@/components/Banner";
import FeaturedProducts from "@/components/FeaturedProducts";
import KullanimAlanlari from "@/components/KullanimAlanlari";
import { tumYazilar } from "@/lib/blog";
import { FIRMA } from "@/lib/firma";
export const metadata = { alternates: { canonical: "/" } };
const groups = [
  ["Trafik Konisi", "Trafik konileri", "702808A6R2ECO"],
  ["Delinatör", "Delinatörler", "ZT8075"],
  ["Hız Kesici Kasis", "Hız kesici kasisler", "ZT40400"],
  ["Araç Stoperi", "Araç stoperleri", "ZTM18012B"],
  ["Güvenlik Bariyeri", "Güvenlik bariyerleri", "ZT80150R"],
  ["Uyarı Levhası", "Uyarı levhaları", "108 A F"],
];
const featured = ["702808A6R2ECO", "ZT8045", "ZT40400", "ZTM01"];
export default function Home() {
  const hero = allProducts.find((p) => p.kod === "702808A6R2ECO");
  const selection = featured.flatMap((code) =>
    allProducts.filter((p) => p.kod === code),
  );
  const tabs = ["Trafik Konisi", "Delinatör", "Hız Kesici Kasis"].map((c) => ({
    name: c,
    products: kartUrunler(
      allProducts.filter((p) => p.category === c).slice(0, 4),
    ),
  }));
  return (
    <main id="main">
      <Banner
        urunSayisi={allProducts.length}
        kategoriSayisi={categories.length}
        urun={hero}
      />
      <div className="wrap">
        <div className="service-row">
          {[
            {
              Icon: ShieldCheck,
              title: "Güvenli alışveriş",
              sub: "iyzico altyapısı, 3D Secure",
            },
            {
              Icon: Truck,
              title: "Türkiye geneline gönderim",
              sub: `${FIRMA.kargo} ile 1-2 iş günü`,
            },
            {
              Icon: FileText,
              title: "Kurumsal fatura",
              sub: "Bireysel ve kurumsal alışveriş",
            },
            { Icon: Phone, title: "Ürün seçiminde destek", sub: FIRMA.telefon },
          ].map(({ Icon, title, sub }) => (
            <div key={title}>
              <Icon className="icon" />
              <span>
                <strong>{title}</strong>
                <small>{sub}</small>
              </span>
            </div>
          ))}
        </div>
        <section className="section">
          <div className="section-heading">
            <div>
              <h2>İhtiyacınız olan, tam burada.</h2>
              <p>En çok aranan ürün gruplarını keşfedin.</p>
            </div>
            <Link href="/urunler" className="text-link">
              Tüm kategoriler <ArrowRight className="icon" />
            </Link>
          </div>
          <div className="category-grid">
            {groups.map(([c, title, code]) => (
              <CategoryCard
                key={c}
                kategori={c}
                baslik={title}
                adet={allProducts.filter((p) => p.category === c).length}
                gorsel={allProducts.find((p) => p.kod === code)?.images[0]}
              />
            ))}
          </div>
          <p className="category-bottom">
            Aradığınız ürün farklı mı?{" "}
            <Link href="/urunler">
              {categories.length} kategorinin tamamına göz atın.
            </Link>
          </p>
        </section>
        <section className="section bestsellers">
          <div className="section-heading">
            <div>
              <h2>Sahanın vazgeçilmezleri.</h2>
              <p>Günlük ihtiyaçlardan büyük projelere, seçilmiş ürünler.</p>
            </div>
            <Link href="/urunler" className="text-link">
              Tümünü gör <ArrowRight className="icon" />
            </Link>
          </div>
          <FeaturedProducts selected={kartUrunler(selection)} groups={tabs} />
        </section>
      </div>
      <section className="section use-section">
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
      <div className="wrap">
        <section className="business-banner">
          <div>
            <p className="eyebrow">KURUMSAL &amp; TOPLU ALIM</p>
            <h2>
              Büyük projeler için
              <br />
              <em>birlikte planlayalım.</em>
            </h2>
            <p>
              Belediye, şantiye ve filo alımlarında ürünlerinizi ve adetlerinizi
              seçin. İhtiyaç listenizle toplu alım teklifinizi isteyin.
            </p>
          </div>
          <div className="business-side">
            <Link className="btn" href="/iletisim">
              Toplu teklif oluştur <ArrowUpRight className="icon" />
            </Link>
            <ul>
              <li>Şartnamenize uygun ürünleri birlikte belirleyelim</li>
              <li>Ürün kodu ve teknik özellikleri birlikte görün</li>
              <li>İhtiyaç listenizle bize ulaşın</li>
            </ul>
          </div>
        </section>
        <section className="section">
          <div className="section-heading">
            <div>
              <h2>Doğru ürünü seçmek kolay.</h2>
              <p>Satın almadan önce ihtiyacınıza uygun özellikleri keşfedin.</p>
            </div>
            <Link href="/blog" className="text-link">
              Tüm rehberler <ArrowRight className="icon" />
            </Link>
          </div>
          <div className="guide-grid">
            {tumYazilar()
              .slice(0, 3)
              .map((y, i) => (
                <Link
                  key={y.slug}
                  href={`/blog/${y.slug}`}
                  className="guide-card"
                >
                  <span className="guide-number">0{i + 1}</span>
                  <div>
                    <h3>{y.baslik}</h3>
                    <p>{y.ozet}</p>
                    <span className="text-link">
                      Rehberi incele <ArrowUpRight className="icon" />
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
