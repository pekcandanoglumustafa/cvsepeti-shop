import MetinSayfasi from "@/components/MetinSayfasi";
import { FIRMA, saticiBilgileri } from "@/lib/firma";
import { OG_DEFAULTS } from "@/lib/site";

export const metadata = {
  title: "Mesafeli Satış Sözleşmesi",
  description: `${FIRMA.marka} mesafeli satış sözleşmesi. Taraflar, sipariş, teslimat, ödeme, cayma hakkı ve uyuşmazlık çözümü hükümleri.`,
  alternates: { canonical: "/mesafeli-satis-sozlesmesi" },
  openGraph: { ...OG_DEFAULTS, url: "/mesafeli-satis-sozlesmesi", title: "Mesafeli Satış Sözleşmesi" },
  robots: { index: true, follow: true },
};

export default function MesafeliSatis() {
  const satici = saticiBilgileri();
  return (
    <MetinSayfasi
      ustBaslik="Yasal"
      baslik="Mesafeli Satış Sözleşmesi"
      giris="Bu sözleşme, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca, internet sitesi üzerinden verilen siparişlerde taraflar arasında kurulur."
      guncelleme="18 Ekim 2026"
    >
      <h2>1. Taraflar</h2>
      <h3>Satıcı</h3>
      <table>
        <tbody>
          {satici.map(([k, v]) => (
            <tr key={k}><td>{k}</td><td>{v}</td></tr>
          ))}
        </tbody>
      </table>

      <h3>Alıcı</h3>
      <p>
        Sipariş sırasında beyan edilen ad, adres, telefon ve e-posta bilgilerinin sahibi gerçek
        veya tüzel kişidir. Sipariş onayı ile bu bilgilerin doğru olduğu beyan edilmiş sayılır.
      </p>

      <h2>2. Sözleşmenin konusu</h2>
      <p>
        Sözleşmenin konusu, Alıcı'nın Satıcı'ya ait internet sitesi üzerinden elektronik ortamda
        siparişini verdiği, nitelikleri ve satış fiyatı sipariş sayfasında ve sipariş onay
        e-postasında belirtilen ürünün satışı ve teslimidir.
      </p>

      <h2>3. Ürün bilgileri ve fiyat</h2>
      <ul>
        <li>
          Ürünün temel nitelikleri (ölçü, malzeme, reflektif, taban, ağırlık, kargo desisi) ilgili
          ürün sayfasında yer alır ve bu sözleşmenin ayrılmaz parçasıdır.
        </li>
        <li>
          Sitede gösterilen fiyatlar aksi belirtilmedikçe <strong>KDV hariçtir</strong>; KDV oranı
          %{FIRMA.kdvOrani} olarak ödeme adımında ayrıca gösterilir.
        </li>
        <li>
          Kargo ücreti ürünün desisi üzerinden ödeme adımında hesaplanır ve toplam tutara eklenir.
        </li>
        <li>
          Fiyatlar güncelleme tarihine kadar geçerlidir. Açık yazım ve sistem hatası hâlinde Satıcı
          siparişi iptal ederek tahsil edilen bedeli iade etme hakkını saklı tutar.
        </li>
      </ul>

      <h2>4. Ödeme</h2>
      <p>
        Ödeme, {FIRMA.odeme} altyapısı üzerinden kredi kartı/banka kartı ile ya da havale/EFT
        yoluyla yapılır. Kart bilgileri Satıcı tarafından görülmez ve saklanmaz; ödeme işlemi
        bütünüyle ödeme kuruluşunun güvenli altyapısında gerçekleşir.
      </p>

      <h2>5. Teslimat</h2>
      <ul>
        <li>Gönderim {FIRMA.kargo} ile Alıcı'nın bildirdiği adrese yapılır.</li>
        <li>
          Teslimat süresi, siparişin onaylanmasından itibaren yasal azami{" "}
          {FIRMA.teslimatGun} gündür. Stokta bulunan ürünler 1-2 iş gününde kargoya verilir.
        </li>
        <li>
          Ürün, Alıcı'dan başka bir kişiye teslim edilecekse teslim alacak kişinin teslimatı kabul
          etmemesinden Satıcı sorumlu tutulamaz.
        </li>
        <li>
          Alıcı, teslim sırasında paketi kontrol etmekle yükümlüdür. Hasarlı paket teslim
          alınmamalı ve kargo firmasına tutanak tutturulmalıdır.
        </li>
        <li>
          Sipariş konusu ürünün tedarik edilemediği anlaşılırsa Satıcı Alıcı'yı bilgilendirir ve
          ödenen bedel 14 gün içinde iade edilir.
        </li>
      </ul>

      <h2>6. Cayma hakkı</h2>
      <p>
        <strong>Tüketici</strong> sıfatıyla alışveriş yapan Alıcı, ürünü teslim aldığı tarihten
        itibaren <strong>{FIRMA.caymaGun} gün</strong> içinde hiçbir gerekçe göstermeksizin ve
        cezai şart ödemeksizin sözleşmeden cayabilir. Cayma bildirimi{" "}
        <a href={`mailto:${FIRMA.eposta}`}>{FIRMA.eposta}</a> adresine ya da{" "}
        <a href={FIRMA.telefonHref}>{FIRMA.telefon}</a> numarasına yapılır.
      </p>
      <p>
        Cayma hakkının kullanılması hâlinde ürün, kutusu ve varsa aksesuarlarıyla birlikte,
        yeniden satılabilir durumda iade edilir. İade bedeli, ürün Satıcı'ya ulaştıktan sonra 14
        gün içinde aynı ödeme aracına iade edilir.
      </p>
      <p>
        Mesafeli Sözleşmeler Yönetmeliği m.15 uyarınca, Alıcı'nın isteği doğrultusunda
        kişiselleştirilerek üretilen ürünlerde (örneğin üzerine özel yazı/baskı yapılan levha ve
        bariyerler) cayma hakkı kullanılamaz.
      </p>
      <p>
        Ticari veya mesleki amaçla, şirket ya da kamu kurumu adına yapılan alımlarda Alıcı
        6502 sayılı Kanun anlamında tüketici sayılmadığından cayma hakkına ilişkin bu hükümler
        uygulanmaz; bu alımlarda iade koşulları Türk Ticaret Kanunu ve taraflar arasındaki
        mutabakata tabidir.
      </p>

      <h2>7. Uyuşmazlıkların çözümü</h2>
      <p>
        Tüketici sıfatındaki Alıcı, uyuşmazlık hâlinde ilgili yıl için belirlenen parasal
        sınırlara göre ürünü satın aldığı veya ikametgâhının bulunduğu yerdeki Tüketici Hakem
        Heyetine ya da Tüketici Mahkemesine başvurabilir. Güncel parasal sınırlar T.C. Ticaret
        Bakanlığı tarafından her yıl ilan edilir.
      </p>

      <h2>8. Yürürlük</h2>
      <p>
        Alıcı, sipariş adımında bu sözleşmeyi okuduğunu ve kabul ettiğini onayladığında sözleşme
        yürürlüğe girer. Sözleşmenin bir örneği sipariş onay e-postası ile Alıcı'ya iletilir.
      </p>
    </MetinSayfasi>
  );
}
