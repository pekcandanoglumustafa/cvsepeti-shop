import type { Product } from "./products";
import { urunDesi, kargoUcreti, buyukHacimli } from "./kargo";

const tl = (n: number) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);

/**
 * Ürün bazlı sık sorulan sorular.
 * Cevaplar kısa, doğrudan ve alıntılanabilir — AI motorları böyle içeriği tercih ediyor.
 */
/** Kategoriye göre "bu ürün ne işe yarar" açıklaması */
const NEDIR: Record<string, string> = {
  "Dikme Kelepçesi":
    "Dikme kelepçesi, delinatör veya uyarı dikmesinin gövdesine geçirilen plastik bir halkadır. Üzerindeki kulaklara zincir, şerit veya levha takılır. Böylece tek tek duran dikmeler birbirine bağlanarak kesintisiz bir sınır oluşturur. Kelepçe dikmenin çapına göre seçilir — Ø63 mm dikmeye Ø63 kelepçe, Ø110 mm dikmeye Ø110 kelepçe takılır.",
  "Bağlantı Aparatı":
    "Bağlantı aparatı, trafik ekipmanlarını birbirine veya aksesuara bağlayan ara parçadır. Koniye levha takmak, dikmeye flaşör monte etmek veya iki bariyeri birleştirmek için kullanılır. Alet gerektirmeden geçmeli olarak takılır.",
  "Koni Kulpu":
    "Koni kulpu, koninin tepesine geçirilen plastik bir aparattır. İki işlevi vardır: koniyi tek elle taşımayı kolaylaştırır ve üzerindeki halkalara zincir takılarak koniler birbirine bağlanır. Renkli seçenekleri uygulama alanlarını ayırt etmek için kullanılır.",
  "Ağırlık Tabanı":
    "Ağırlık tabanı, geri dönüşümlü kauçuktan üretilen ve koninin tabanına geçirilen halkadır. Konin ağırlık merkezini alçaltarak rüzgârda ve ağır vasıta geçişinde devrilmesini önler. Mevcut konilere sonradan takılabilir, ihtiyaç değiştiğinde başka koniye aktarılabilir.",
  "Zincir Kancası":
    "Zincir kancası, plastik trafik zincirini dikmeye, kelepçeye veya koni kulpuna bağlayan S veya karabina biçimli parçadır. Zincirin gerektiğinde hızlıca sökülüp takılmasını sağlar.",
  "Vida":
    "Trifon vida, delinatör, kasis ve stoper montajında kullanılan altı köşe başlı ağaç vidasıdır. Plastik dübelle birlikte kullanılır. Standart ölçü Ø10×110 mm'dir; lokma anahtar veya somun sıkma ucuyla sıkılır.",
  "Dübel":
    "Plastik dübel, asfalt veya betona açılan deliğe çakılan ve vidanın tutunmasını sağlayan parçadır. Standart ölçü Ø16×90 mm'dir. Delik Ø16 mm matkap ucuyla açılır — daha küçük uçta dübel girmez, daha büyük uçta boşluk yapar.",
  "Kablo Koruyucu":
    "Kablo koruyucu, zemin üzerinden geçen kablo ve hortumları araç ve yaya trafiğinden koruyan kauçuk kanaldır. Kapağı açılarak kablo yerleştirilir. Etkinlik alanlarında, şantiyelerde ve fuar sahalarında kullanılır.",
  "Güvenlik Aynası":
    "Güvenlik aynası, görüş açısının kısıtlı olduğu noktalarda kör alanı görünür kılan dışbükey aynadır. Otopark rampa çıkışları, keskin dönüşler, depo koridorları ve kavşaklarda kullanılır. 60 cm ayna 10-15 metre, 80 cm ayna 15-20 metre mesafeye kadar etkilidir.",
  "Zincir":
    "Plastik trafik zinciri, dikme veya koniler arasına gerilerek görsel sınır oluşturur. Metal zincirin aksine hafiftir, paslanmaz ve çarpma anında zarar vermez. Ø6 mm ince, Ø8 mm kalın tiptir; 25 metrelik paketlerde satılır.",
  "Panel Levhası":
    "Panel levhası, dikmeler arasına takılan yatay uyarı yüzeyidir. Baskısız modeller sonradan yazı ve logo uygulamak için, baskılı modeller hazır yönlendirme mesajlarıyla gelir. Dikme kelepçesi veya bağlantı aparatıyla monte edilir.",
  "Refüj Başı Dubası":
    "Refüj başı dubası, kavşak ve dönüş adalarının başlangıcını belirten geniş tabanlı elemandır. Sürücünün adayı erken fark etmesini sağlar. Üzerine yön levhası monte edilebilir.",
};

export function urunSSS(p: Product): { s: string; c: string }[] {
  const o = { olcu3: p.olcu3 || [25, 20, 12], geo: (p.geo || "HACIMLI") as any, agirlik_kg: p.agirlik_kg || 0 };
  const desi = urunDesi(o);
  const q: { s: string; c: string }[] = [];

  const nedir = NEDIR[p.category];
  if (nedir) {
    q.push({ s: `${p.category} ne işe yarar?`, c: nedir });
  }

  q.push({
    s: `${p.name} fiyatı ne kadar?`,
    c: `${p.name} ürününün fiyatı ${tl(p.price)} + KDV'dir. KDV dahil satış fiyatı ${tl(p.price_kdv)}. Fiyata kargo dahil değildir. Ürün kodu ${p.kod}.`,
  });

  const teknik: string[] = [];
  if (p.boyut) teknik.push(`ölçüsü ${p.boyut}`);
  if (p.malzeme) teknik.push(`malzemesi ${p.malzeme}`);
  if (p.agirlik_kg) teknik.push(`ağırlığı ${p.agirlik_kg} kg`);
  if (p.f_reflektif) teknik.push(`reflektif tipi ${p.f_reflektif}`);
  if (p.f_taban) teknik.push(`tabanı ${p.f_taban}`);
  if (teknik.length) {
    q.push({
      s: `${p.name} teknik özellikleri nelerdir?`,
      c: `${p.kod} kodlu ${p.name} ürününün ${teknik.join(", ")}dır. Ürün ${p.category} kategorisindedir.`,
    });
  }

  q.push({
    s: `${p.name} kargo ücreti ne kadar?`,
    c: buyukHacimli(o)
      ? `Bu ürün büyük hacimli olduğu için standart kargoya sığmaz, nakliyesi sipariş sonrası ayrıca planlanır. Sipariş verdikten sonra teslimat şekli sizinle netleştirilir.`
      : `1 adet ${p.name} ${desi} desi tutar, kargo ücreti ${tl(kargoUcreti(desi))}'dir. Birden fazla adet alındığında ürünler tek koliye istiflendiği için kargo bedeli adet başına orantılı artmaz. Kargoyu ödeme adımında peşin ödeyebilir veya karşı ödemeli gönderebilirsiniz.`,
  });

  const ka = (p as any).koli_adet;
  if (ka) {
    q.push({
      s: `${p.name} kaç adetlik koli halinde gelir?`,
      c: `Üretici kolisinde ${ka} adet bulunur${(p as any).koli_olcu ? `, koli ölçüsü ${(p as any).koli_olcu.join(" × ")} cm'dir` : ""}. ${ka} adet ve katlarında sipariş verildiğinde ürünler orijinal kolisinde gönderilir; kargo maliyeti adet başına düşer.`,
    });
  }

  q.push({
    s: `${p.name} için fatura kesiliyor mu?`,
    c: `Evet. Bireysel veya kurumsal fatura kesilir. Kurumsal fatura için ödeme adımında firma unvanı, vergi dairesi ve vergi numarası girilir. Fatura e-posta adresinize gönderilir.`,
  });

  q.push({
    s: `${p.name} kaç günde teslim edilir?`,
    c: `Stoktaki ürünler 1-2 iş günü içinde kargoya verilir, Yurtiçi Kargo ile Türkiye geneline 1-3 iş gününde teslim edilir. Sevkiyat Konya'dan yapılır.`,
  });

  return q;
}
