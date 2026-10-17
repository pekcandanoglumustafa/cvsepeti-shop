import MetinSayfasi from "@/components/MetinSayfasi";
import { FIRMA } from "@/lib/firma";
import { allProducts, categories } from "@/lib/products";
import { OG_DEFAULTS, SITE_URL, abs, breadcrumbLd } from "@/lib/site";

export const metadata = {
  title: "Hakkımızda",
  description: `${FIRMA.marka} — ${FIRMA.konum} merkezli trafik güvenliği ve yol işaretleme ekipmanları tedarikçisi. ${allProducts.length} ürün, kamu kurumlarına ve özel sektöre satış.`,
  alternates: { canonical: "/hakkimizda" },
  openGraph: { ...OG_DEFAULTS, url: "/hakkimizda", title: `Hakkımızda | ${FIRMA.marka}` },
};

const sema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/hakkimizda#sayfa`,
      url: abs("/hakkimizda"),
      name: "Hakkımızda",
      about: { "@id": `${SITE_URL}/#kurulus` },
    },
    breadcrumbLd([["Ana sayfa", "/"], ["Hakkımızda", "/hakkimizda"]]),
  ],
};

export default function Hakkimizda() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sema) }} />
      <MetinSayfasi
        ustBaslik="Hakkımızda"
        baslik="Yol güvenliğinde tedarikçiniz"
        giris={`${FIRMA.konum} merkezli olarak trafik güvenliği, yol işaretleme ve iş güvenliği ekipmanları tedarik ediyoruz. Katalogda ${allProducts.length} ürün, ${categories.length} kategori var.`}
      >
        <h2>Ne yapıyoruz</h2>
        <p>
          Trafik konisi, delinatör, hız kesici kasis, uyarı levhası, güvenlik bariyeri, yol butonu,
          zemin işaretleme ve kolon köşe koruyucu başta olmak üzere yol ve saha güvenliği
          ekipmanlarının tedarikini yapıyoruz. Ürünlerin ölçü, malzeme, reflektif ve taban
          bilgilerini katalogda açık yazıyoruz — şartnameyle karşılaştırması kolay olsun diye.
        </p>

        <h2>Kimlere satıyoruz</h2>
        <p>
          Müşterilerimizin önemli bir kısmı kamu kurumları. Doğrudan temin ve ihale süreçlerinde
          teknik şartnameye uygun ürünü eşleştirip teklif hazırlıyoruz. Bugüne kadar Jandarma Genel
          Komutanlığı, Yargıtay Başkanlığı, Hacettepe Üniversitesi, Sahil Güvenlik Komutanlığı,
          Bursa Defterdarlığı, Mersin İl Sağlık Müdürlüğü ve Arnavutköy Devlet Hastanesi gibi
          kurumlara teslimat yaptık.
        </p>
        <p>
          Özel sektörde ise fabrika, otopark, şantiye ve lojistik tesisleri için saha güvenliği
          ekipmanı sağlıyoruz.
        </p>

        <h2>Nasıl çalışıyoruz</h2>
        <ul>
          <li>Sipariş {FIRMA.kargo} ile gönderilir, kargo ücreti desi üzerinden hesaplanır.</li>
          <li>Ödeme {FIRMA.odeme} altyapısı üzerinden kredi/banka kartı ya da havale ile alınır.</li>
          <li>Kurumsal alımlarda fatura ve gerekli evrak sipariş öncesi hazırlanır.</li>
          <li>Ölçü ya da uygunluk sorusu olan ürünlerde WhatsApp'tan teknik destek veriyoruz.</li>
        </ul>

        <h2>İletişim</h2>
        <p>
          Telefon <a href={FIRMA.telefonHref}>{FIRMA.telefon}</a>, e-posta{" "}
          <a href={`mailto:${FIRMA.eposta}`}>{FIRMA.eposta}</a>. Ayrıntı için{" "}
          <a href="/iletisim">İletişim</a> sayfasına bakın.
        </p>
      </MetinSayfasi>
    </>
  );
}
