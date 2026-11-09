import MetinSayfasi from "@/components/MetinSayfasi";
import { FIRMA } from "@/lib/firma";
import { KARGO_DAHIL } from "@/lib/kargo";
import { OG_DEFAULTS, SITE_URL, abs, breadcrumbLd } from "@/lib/site";

export const metadata = {
  title: "İletişim",
  description: `${FIRMA.marka} iletişim bilgileri. Telefon ${FIRMA.telefon}, e-posta ${FIRMA.eposta}. ${FIRMA.konum}, ${FIRMA.sehir}. Teklif, stok ve teknik sorular için ulaşın.`,
  alternates: { canonical: "/iletisim" },
  openGraph: { ...OG_DEFAULTS, url: "/iletisim", title: `İletişim | ${FIRMA.marka}` },
};

const sema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/iletisim#sayfa`,
      url: abs("/iletisim"),
      name: "İletişim",
      about: { "@id": `${SITE_URL}/#kurulus` },
    },
    breadcrumbLd([["Ana sayfa", "/"], ["İletişim", "/iletisim"]]),
  ],
};

export default function Iletisim() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sema) }} />
      <MetinSayfasi
        gorsel="/images/sahne/iletisim.webp"
        ustBaslik="İletişim"
        baslik="Bize ulaşın"
        giris="Teklif, stok durumu, toplu alım ve teknik sorular için doğrudan arayabilir ya da yazabilirsiniz. Kamu kurumları için birim fiyat teklif cetveli hazırlıyoruz."
      >
        <h2>Doğrudan iletişim</h2>
        <table>
          <tbody>
            <tr>
              <td>Telefon</td>
              <td><a href={FIRMA.telefonHref}>{FIRMA.telefon}</a></td>
            </tr>
            <tr>
              <td>WhatsApp</td>
              <td><a href={FIRMA.whatsapp} rel="noopener">{FIRMA.telefon}</a> — teknik soru ve ölçü için en hızlısı</td>
            </tr>
            <tr>
              <td>E-posta</td>
              <td><a href={`mailto:${FIRMA.eposta}`}>{FIRMA.eposta}</a></td>
            </tr>
            {FIRMA.adres ? (
              <tr><td>Adres</td><td>{FIRMA.adres} — Selçuk Üniversitesi Alaeddin Keykubat Kampüsü güneyi · <a href={FIRMA.haritaUrl} rel="noopener" target="_blank">Haritada aç / yol tarifi</a></td></tr>
            ) : (
              <tr><td>Konum</td><td>{FIRMA.konum}, {FIRMA.sehir}</td></tr>
            )}
          </tbody>
        </table>

        <h2>Konum</h2>
        <iframe
          title="Konya Teknokent konumu"
          src={`https://maps.google.com/maps?q=${FIRMA.lat},${FIRMA.lng}&z=16&output=embed`}
          width="100%"
          height="360"
          style={{ border: 0, borderRadius: 12 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <h2>Kamu kurumu alımları</h2>
        <p>
          Doğrudan temin ve ihale süreçlerinde teknik şartnameye göre ürün eşleştirmesi yapıp
          birim fiyat teklif cetvelini hazırlıyoruz. Şartnameyi e-posta ile gönderirseniz aynı gün
          dönüş yapıyoruz.
        </p>
        <p>
          Teslim edilen kurumlar arasında Jandarma Genel Komutanlığı, Yargıtay Başkanlığı,
          Hacettepe Üniversitesi, Sahil Güvenlik Komutanlığı ve çeşitli il sağlık müdürlükleri
          bulunuyor.
        </p>

        <h2>Sipariş ve kargo soruları</h2>
        <p>
          {KARGO_DAHIL
            ? `Kargo ücreti fiyatlara dahildir; gönderim ${FIRMA.kargo} ile yapılır.`
            : `Kargo ücreti ürünün desisi üzerinden ödeme adımında hesaplanır; gönderim ${FIRMA.kargo} ile yapılır.`}{" "}
          Teslimat, iade ve cayma hakkı ayrıntıları:{" "}
          <a href="/teslimat-ve-iade">Teslimat ve İade</a>
        </p>
      </MetinSayfasi>
    </>
  );
}
