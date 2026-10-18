import MetinSayfasi from "@/components/MetinSayfasi";
import { FIRMA, saticiBilgileri } from "@/lib/firma";
import { OG_DEFAULTS } from "@/lib/site";

export const metadata = {
  title: "Gizlilik ve KVKK",
  description: `${FIRMA.marka} gizlilik politikası ve 6698 sayılı KVKK kapsamında aydınlatma metni. İşlenen veriler, işleme amaçları, saklama süreleri, çerezler ve ilgili kişi hakları.`,
  alternates: { canonical: "/gizlilik-ve-kvkk" },
  openGraph: { ...OG_DEFAULTS, url: "/gizlilik-ve-kvkk", title: "Gizlilik Politikası ve KVKK" },
};

export default function Gizlilik() {
  const satici = saticiBilgileri().filter(([k]) => k !== "Ticaret sicil no");
  return (
    <MetinSayfasi
      ustBaslik="Yasal"
      baslik="Gizlilik Politikası ve KVKK Aydınlatma Metni"
      giris="6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca, kişisel verilerinizin hangi amaçla işlendiği, kimlerle paylaşıldığı ve bu konudaki haklarınız aşağıda açıklanmıştır."
      guncelleme="18 Ekim 2026"
    >
      <h2>1. Veri sorumlusu</h2>
      <table>
        <tbody>
          {satici.map(([k, v]) => (
            <tr key={k}><td>{k === "Satıcı unvanı" ? "Veri sorumlusu" : k}</td><td>{v}</td></tr>
          ))}
        </tbody>
      </table>

      <h2>2. İşlenen kişisel veriler</h2>
      <ul>
        <li><strong>Kimlik ve iletişim:</strong> ad soyad, firma unvanı, telefon, e-posta, teslimat ve fatura adresi.</li>
        <li><strong>Sipariş verileri:</strong> sipariş içeriği, tutar, sipariş tarihi, kargo takip numarası.</li>
        <li><strong>Fatura bilgileri:</strong> vergi dairesi ve vergi/TC kimlik numarası (kurumsal fatura talebinde).</li>
        <li><strong>İşlem güvenliği:</strong> IP adresi, tarayıcı ve cihaz bilgisi, site içi gezinme kayıtları.</li>
      </ul>
      <p>
        <strong>Kart bilgileriniz tarafımızca görülmez, işlenmez ve saklanmaz.</strong> Ödeme
        işlemi bütünüyle {FIRMA.odeme} altyapısı üzerinde gerçekleşir.
      </p>

      <h2>3. İşleme amaçları</h2>
      <ul>
        <li>Siparişin alınması, hazırlanması, kargolanması ve teslimi</li>
        <li>Fatura düzenlenmesi ve mali mevzuattan doğan yükümlülüklerin yerine getirilmesi</li>
        <li>İade, değişim ve müşteri destek taleplerinin karşılanması</li>
        <li>Site güvenliğinin sağlanması ve hile/dolandırıcılık tespiti</li>
        <li>Talep edilmesi hâlinde teklif hazırlanması ve kurumsal yazışmaların yürütülmesi</li>
      </ul>

      <h2>4. Hukuki sebep</h2>
      <p>
        Verileriniz KVKK m.5/2 uyarınca <strong>sözleşmenin kurulması ve ifası</strong> (c bendi),{" "}
        <strong>hukuki yükümlülüğün yerine getirilmesi</strong> (ç bendi) ve{" "}
        <strong>meşru menfaat</strong> (f bendi) hukuki sebeplerine dayanılarak, bu sebeplerin
        bulunmadığı hâllerde ise açık rızanıza dayanılarak işlenir.
      </p>

      <h2>5. Aktarım</h2>
      <p>Verileriniz yalnızca hizmetin gereği olarak ve gerekli olduğu ölçüde aktarılır:</p>
      <ul>
        <li><strong>Kargo firması</strong> ({FIRMA.kargo}) — teslimatın yapılabilmesi için ad, adres ve telefon</li>
        <li><strong>Ödeme kuruluşu</strong> ({FIRMA.odeme}) — ödemenin alınabilmesi için işlem bilgileri</li>
        <li><strong>Mali müşavir ve e-fatura entegratörü</strong> — fatura düzenlenebilmesi için fatura bilgileri</li>
        <li><strong>Yetkili kamu kurum ve kuruluşları</strong> — mevzuattan doğan talep hâlinde</li>
      </ul>
      <p>Kişisel verileriniz pazarlama amacıyla üçüncü taraflara satılmaz veya kiralanmaz.</p>

      <h2>6. Saklama süresi</h2>
      <p>
        Sipariş ve fatura kayıtları, Vergi Usul Kanunu ve Türk Ticaret Kanunu uyarınca{" "}
        <strong>10 yıl</strong> boyunca saklanır. Bu süre dolduğunda veriler silinir, yok edilir
        veya anonim hâle getirilir. Sipariş vermeden yapılan yazışmalar, ilgili talebin
        sonuçlanmasından itibaren makul süre içinde silinir.
      </p>

      <h2>7. Çerezler</h2>
      <p>
        Sitede çalışması için zorunlu çerezler (sepet içeriğinin korunması, oturum güvenliği) ve
        ziyaret istatistiği için Google Analytics çerezleri kullanılır. Analitik çerezler
        kimliğinizi belirlemek için kullanılmaz. Tarayıcınızın ayarlarından çerezleri
        engelleyebilirsiniz; bu durumda sepet gibi bazı işlevler çalışmayabilir.
      </p>

      <h2>8. Haklarınız</h2>
      <p>KVKK m.11 uyarınca veri sorumlusuna başvurarak şu haklara sahipsiniz:</p>
      <ul>
        <li>Kişisel verinizin işlenip işlenmediğini öğrenme ve işlenmişse buna ilişkin bilgi talep etme</li>
        <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
        <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
        <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
        <li>Kanundaki şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
        <li>Düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
        <li>Münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonuç çıkmasına itiraz etme</li>
        <li>Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
      </ul>
      <p>
        Başvurularınızı <a href={`mailto:${FIRMA.eposta}`}>{FIRMA.eposta}</a> adresine
        iletebilirsiniz. Talebiniz en geç 30 gün içinde sonuçlandırılır.
      </p>
    </MetinSayfasi>
  );
}
