import MetinSayfasi from "@/components/MetinSayfasi";
import { FIRMA } from "@/lib/firma";
import { OG_DEFAULTS } from "@/lib/site";

export const metadata = {
  title: "Teslimat ve İade",
  description: `${FIRMA.marka} teslimat ve iade koşulları. ${FIRMA.kargo} ile gönderim, desi üzerinden kargo ücreti, ${FIRMA.caymaGun} gün cayma hakkı, hasarlı ürün ve iade süreci.`,
  alternates: { canonical: "/teslimat-ve-iade" },
  openGraph: { ...OG_DEFAULTS, url: "/teslimat-ve-iade", title: "Teslimat ve İade" },
};

export default function TeslimatIade() {
  return (
    <MetinSayfasi
      ustBaslik="Yasal"
      baslik="Teslimat ve İade"
      giris="Kargo, teslim süresi, hasarlı ürün ve iade sürecine dair bilmeniz gereken her şey."
      guncelleme="18 Ekim 2026"
    >
      <h2>Kargo ve teslim süresi</h2>
      <table>
        <tbody>
          <tr><td>Kargo firması</td><td>{FIRMA.kargo}</td></tr>
          <tr><td>Kargoya veriliş</td><td>Stoktaki ürünlerde 1-2 iş günü</td></tr>
          <tr><td>Teslim süresi</td><td>Kargoya verildikten sonra 1-3 iş günü</td></tr>
          <tr><td>Yasal azami süre</td><td>Sipariş onayından itibaren {FIRMA.teslimatGun} gün</td></tr>
          <tr><td>Kargo ücreti</td><td>Ürünün desisi üzerinden ödeme adımında hesaplanır</td></tr>
          <tr><td>Gönderim bölgesi</td><td>Türkiye geneli</td></tr>
        </tbody>
      </table>
      <p>
        Trafik konisi, bariyer ve kasis gibi hacimli ürünlerde kargo bedeli ağırlığa değil{" "}
        <strong>desiye</strong> göre hesaplanır. Toplu alımlarda palet ya da kamyon sevkiyatı daha
        uygun olabilir; bu durumda <a href="/iletisim">bizimle görüşün</a>, nakliyeyi ayrıca
        fiyatlandıralım.
      </p>

      <h2>Teslim alırken</h2>
      <ul>
        <li>Paketi kurye yanınızdayken kontrol edin.</li>
        <li>
          Ezik, yırtık veya ıslak paketi <strong>teslim almayın</strong>; kurye ile birlikte
          tutanak tutturun.
        </li>
        <li>
          Hasarlı teslim aldıysanız 48 saat içinde fotoğraflarla birlikte{" "}
          <a href={`mailto:${FIRMA.eposta}`}>{FIRMA.eposta}</a> adresine yazın; ürünü ücretsiz
          değiştiriyoruz.
        </li>
      </ul>

      <h2>Cayma hakkı ve iade</h2>
      <p>
        Tüketici sıfatıyla alışveriş yaptıysanız, ürünü teslim aldığınız günden itibaren{" "}
        <strong>{FIRMA.caymaGun} gün</strong> içinde gerekçe göstermeden iade edebilirsiniz.
      </p>

      <h3>İade nasıl yapılır</h3>
      <ol>
        <li>
          <a href={`mailto:${FIRMA.eposta}`}>{FIRMA.eposta}</a> adresine ya da{" "}
          <a href={FIRMA.whatsapp} rel="noopener">WhatsApp</a> üzerinden sipariş numaranızla
          birlikte iade talebinizi iletin.
        </li>
        <li>Size iade kargo kodunu ve gönderim adresini iletelim.</li>
        <li>Ürünü kutusu ve varsa aksesuarlarıyla, yeniden satılabilir durumda gönderin.</li>
        <li>Ürün elimize ulaştıktan sonra 14 gün içinde ödeme yaptığınız karta iade edilir.</li>
      </ol>

      <h3>İade edilemeyen ürünler</h3>
      <ul>
        <li>
          Üzerine özel yazı, logo veya baskı yapılarak sizin için kişiselleştirilmiş levha,
          bariyer ve tabelalar.
        </li>
        <li>Kullanılmış, montajı yapılmış ya da zemine yapıştırılmış ürünler.</li>
        <li>Kutusu ve etiketi zarar görmüş, yeniden satılamayacak durumdaki ürünler.</li>
      </ul>

      <h3>Kurumsal ve kamu alımları</h3>
      <p>
        Şirket veya kamu kurumu adına, ticari amaçla yapılan alımlarda 6502 sayılı Kanun'un cayma
        hakkı hükümleri uygulanmaz. Bu alımlarda iade ve değişim, sipariş öncesi mutabakata ve
        ürünün ayıplı olup olmamasına göre değerlendirilir — yine de ayıplı ya da şartnameye uygun
        olmayan bir ürün gönderdiysek değişimini yapıyoruz.
      </p>

      <h2>Ayıplı ürün</h2>
      <p>
        Üretim hatası tespit ettiğiniz ürünlerde, 6502 sayılı Kanun m.11 uyarınca ücretsiz onarım,
        ayıpsız misli ile değişim, bedel indirimi veya sözleşmeden dönme haklarına sahipsiniz.
        Talebinizi <a href="/iletisim">İletişim</a> sayfasındaki kanallardan iletebilirsiniz.
      </p>
    </MetinSayfasi>
  );
}
