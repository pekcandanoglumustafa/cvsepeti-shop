/**
 * Kategori sayfası içerikleri.
 *
 * Neden var: denetimde 35 kategori sayfasının 26'sı 300 kelimenin altındaydı
 * (medyan 179, en azı 50 kelime). Bunlar "trafik konisi", "delinatör nedir",
 * "zemin işaretleme" gibi baş kelimeler için yarışan sayfalar ve neredeyse
 * boştular — Search Console'da bu sorgular binlerce gösterim alıp sıfır
 * tıklama getiriyordu.
 *
 * `giris` ürün ızgarasının üstünde, `bolumler` altında yayınlanır.
 * Anahtar, lib/products.ts'teki kategori adının birebir kendisidir.
 */

export type KategoriIcerik = {
  giris: string;
  bolumler: { baslik: string; metin: string }[];
};

export const KATEGORI_ICERIK: Record<string, KategoriIcerik> = {
  "Delinatör": {
    giris:
      "Delinatör, yol kenarını ve şerit ayrımını sürücüye gece gündüz gösteren esnek dikmedir. Araç çarptığında kırılmaz, yatar ve eski hâline döner — bu yüzden refüj, viraj ve şantiye girişlerinde kalıcı çözüm olarak kullanılır.",
    bolumler: [
      {
        baslik: "Delinatör nedir, nerede kullanılır?",
        metin:
          "Delinatör, yolun kenarını veya iki şeridin ayrımını işaretleyen, üzerinde reflektif bant bulunan esnek bir dikmedir. Gündüz görünürlüğü gövde rengiyle, gece görünürlüğü farların ışığını geri yansıtan reflektif bantla sağlanır. En sık refüj ve orta kaldırım üstünde, keskin virajların dış kenarında, otopark giriş-çıkışlarında, şantiye ve yol çalışması sınırlarında, fabrika sahalarında yaya-araç ayrımında kullanılır. Kalıcı bariyerden farkı, çarpmaya karşı kırılmak yerine esnemesidir: araç hasarı ve ürün hasarı ikisi de azalır.",
      },
      {
        baslik: "Hangi boy, nerede?",
        metin:
          "Katalogdaki delinatörler 30 cm ile 100 cm arasında değişiyor. 30-45 cm olanlar otopark içi yönlendirme, yaya yolu ayrımı ve hız düşük olan iç sahalarda tercih edilir. 70-75 cm, şehir içi refüj ve yol kenarı için en yaygın boydur; sürücünün göz hizasına yakın kalır. 100 cm ve üzeri, araç hızının yüksek olduğu çevre yolu, viraj ve şantiye girişlerinde kullanılır — uzaktan görünmesi gerekir.",
      },
      {
        baslik: "Malzeme farkı: PE, TPU, TPE",
        metin:
          "PE (polietilen) ekonomik seçenektir; düşük trafikli, çarpma ihtimali az olan yerler için yeterlidir. TPU (termoplastik poliüretan) çarpma sonrası eski formuna dönme konusunda en iyisidir ve soğukta kırılganlaşmaz — yoğun trafikli yollarda ve soğuk iklimde ömrü belirgin biçimde uzundur. TPE ikisinin arasında bir denge sunar. Sık çarpma bekliyorsanız TPU'nun ilk maliyeti yüksek olsa da yenileme maliyetini düşürür.",
      },
      {
        baslik: "Reflektif sayısı ve taban seçimi",
        metin:
          "Tek reflektifli modeller trafiğin tek yönden aktığı yerlerde yeterlidir. Çift reflektifli modeller refüj gibi iki taraftan da görülmesi gereken konumlarda kullanılır; dört reflektifli modeller kavşak ve ada başlarında her yönden görünürlük sağlar. Taban tarafında iki seçenek vardır: zemine dübelle sabitlenen tabanlar ve ağırlıklı/yapıştırmalı tabanlar. Asfalta delik açılamayan yerlerde yapıştırmalı taban tercih edilir; montaj gereçleri ürüne dahil olan modellerde ayrıca vida-dübel almanız gerekmez.",
      },
    ],
  },

  "Trafik Konisi": {
    giris:
      "Trafik konisi, geçici olarak alan kapatmanın, şerit daraltmanın ve tehlikeli bölgeyi işaretlemenin en hızlı yoludur. Doğru koniyi seçmek iki soruya bağlı: ne kadar uzaktan görünmesi gerekiyor ve rüzgâra ya da araç rüzgârına dayanacak mı.",
    bolumler: [
      {
        baslik: "Boy seçimi: 30 cm'den 90 cm'ye",
        metin:
          "Konide boy doğrudan görünme mesafesi demektir. 30-38 cm koniler kapalı otopark, depo içi ve yaya alanları için uygundur. 50 cm en yaygın genel amaçlı boydur: şehir içi yol çalışması, otopark yönlendirme, etkinlik alanı sınırı. 70-75 cm, araç hızının arttığı yerlerde ve gece çalışmalarında kullanılır. 90 cm koniler çevre yolu, otoyol çalışmaları ve ağır vasıta trafiği olan sahalar içindir; uzaktan fark edilmesi gereken her yerde bu boy tercih edilir.",
      },
      {
        baslik: "Ağırlıklı mı, ağırlıksız mı?",
        metin:
          "Ağırlıksız koni hafiftir, taşıması ve istiflemesi kolaydır; rüzgârın ve araç rüzgârının olmadığı iç mekânlarda sorun çıkarmaz. Açık yolda, özellikle hızlı araçların yanından geçtiği şeritlerde koni devrilir ve uyarı işlevini kaybeder. Ağırlıklı modellerde tabanda ek kütle bulunur; kuvvetli rüzgârda ve araç geçişlerinde yerinde kalır. Yol kenarında kullanacaksanız ağırlıklı modeli seçmek, koni toplamakla uğraşmaktan daha ucuza gelir.",
      },
      {
        baslik: "Reflektif bant ve gece görünürlüğü",
        metin:
          "Reflektifsiz koniler yalnızca gündüz ve aydınlatması iyi olan kapalı alanlar için uygundur. Tek reflektifli modeller standart gece görünürlüğü sağlar. Çift reflektifli modeller farın ışığını daha geniş açıdan geri döndürür; gece çalışması yapıyorsanız veya koniyi aydınlatması zayıf bir yola koyacaksanız çift reflektif gerçek bir fark yaratır.",
      },
      {
        baslik: "Malzeme ve dayanım",
        metin:
          "PVC koniler esnektir, çarpma sonrası formunu korur ve soğukta çatlamaya daha dirençlidir — yol çalışmalarının çoğunda tercih edilen malzemedir. PE koniler daha ekonomiktir ve darbenin az olduğu kullanımlar için yeterlidir. Çok sık üst üste istiflenip taşınan koniler için gövde kalınlığı ve taban genişliği, fiyattan daha belirleyicidir.",
      },
    ],
  },

  "Hız Kesici Kasis": {
    giris:
      "Hız kesici kasis, sürücüyü yavaşlamaya fiziksel olarak zorlayan tek ekipmandır — levha uyarır, kasis uygulatır. Doğru seçim, geçecek araç tipine ve istediğiniz hız sınırına göre yapılır.",
    bolumler: [
      {
        baslik: "Yükseklik, hız sınırını belirler",
        metin:
          "Kasis yüksekliği ile geçiş hızı doğrudan ilişkilidir: yükseklik arttıkça sürücü daha çok yavaşlamak zorunda kalır. 3-4 cm civarındaki alçak kasisler otopark içi ve yaya yoğun alanlarda, aracı yormadan hız düşürmek için kullanılır. 5 cm ve üzeri kasisler site girişi, okul önü, fabrika sahası gibi hızın gerçekten düşürülmesi gereken yerlerde tercih edilir. Ambulans, itfaiye ve ağır vasıta geçişi olan yollarda yüksek kasis araç altı hasarına yol açabilir; bu güzergâhlarda alçak profil daha doğrudur.",
      },
      {
        baslik: "Kauçuk ve PVC arasındaki fark",
        metin:
          "Kauçuk kasisler ağırdır, zemine iyi oturur ve ağır vasıta geçişine dayanır; ömrü uzundur, ilk maliyeti yüksektir. PVC kasisler hafiftir, montajı ve sökümü kolaydır, geçici kullanım ve hafif araç trafiği için uygundur. Kamyon ve tır geçen bir sahada PVC kasis kısa sürede deforme olur — araç kompozisyonunu bilerek seçin.",
      },
      {
        baslik: "Montaj ve sonlandırma",
        metin:
          "Kasisler modüler yapıdadır: orta gövdeler yan yana eklenir, iki uca sonlandırıcı (baş) parça takılır. Sonlandırıcı sadece görünüm için değildir — kasisin kenarını eğimli bitirerek araç lastiğinin takılmasını ve parçanın yerinden sökülmesini önler. Yol genişliğini ölçüp gövde sayısını hesaplarken iki baş parçayı da unutmayın. Montaj zemine dübel ve vida ile yapılır; asfaltta ve betonda farklı dübel tipi gerekir.",
      },
      {
        baslik: "Reflektif panel ve gece görünürlüğü",
        metin:
          "Kasisin üzerindeki sarı reflektif panel, gece sürücünün kasisi önceden görmesini sağlar. Reflektif yüzeyi zamanla aşınan kasisler gece fark edilmez ve ani frene sebep olur. Aydınlatması zayıf yollarda kasisten önce uyarı levhası da koymak, hem güvenlik hem de sorumluluk açısından doğru uygulamadır.",
      },
    ],
  },

  "Solar & Flaşör Lamba": {
    giris:
      "Flaşör lamba, yol çalışmasını ve tehlikeli noktayı gece uzaktan belli eder. Solar modeller gündüz şarj olup karanlıkta kendiliğinden yandığı için kablo çekilemeyen yerlerde tek pratik çözümdür.",
    bolumler: [
      {
        baslik: "Solar mı, pilli mi?",
        metin:
          "Solar lambalar üstündeki panelden gündüz şarj olur, hava karardığında ışık sensörüyle kendiliğinden yanar. Kablo çekilemeyen, elektrik bulunmayan yol kenarı ve şantiyelerde kullanılır; işletme maliyeti yoktur. Pilli modeller ilk alımda daha ucuzdur ve güneş almayan konumlarda çalışır, ancak pil değişimi düzenli bakım gerektirir. Uzun süre kalacak bir noktada solar, birkaç haftalık geçici çalışmada pilli model daha mantıklıdır.",
      },
      {
        baslik: "Nereye konur?",
        metin:
          "Flaşör lamba, tehlikenin başladığı noktadan önce, sürücünün tepki verebileceği mesafede konumlandırılır. Çalışma alanının köşelerine, şerit daralmasının başlangıcına, kapatılan şeridin girişine ve refüj başlarına konur. Koni veya delinatörün üstüne monte edilebilen modeller, ayrı ayak gerektirmediği için saha kurulumunu hızlandırır.",
      },
      {
        baslik: "Ledli yol bakım levhaları",
        metin:
          "Daha büyük boyutlu ledli yol bakım levhaları, tek bir lambadan çok daha uzaktan görünür ve ok, çapraz gibi yönlendirme desenleri gösterebilir. Çevre yolu ve otoyol çalışmalarında, aracın şerit değiştirmesi gereken yerlerde kullanılır. Alüminyum gövdeli modeller dış ortamda daha uzun ömürlüdür; polikarbon gövdeler daha hafif ve ekonomiktir.",
      },
    ],
  },

  "Şerit Ayırıcı": {
    giris:
      "Şerit ayırıcı, iki yönü veya iki şeridi fiziksel olarak ayırarak karşı şeride geçişi engeller. Boyalı çizginin caydırmadığı yerlerde, araca temas ederek uyaran çözümdür.",
    bolumler: [
      {
        baslik: "Nerede kullanılır?",
        metin:
          "Karşı yönden gelen trafiğin ayrılması gereken iki yönlü yollarda, viraj çıkışlarında, otopark içi akış yönünü zorunlu kılmak için, bisiklet yolu ile araç yolunun ayrımında ve otoyol çalışmalarında geçici refüj oluşturmak için kullanılır. Kalıcı beton refüjden farkı, sökülüp başka yere taşınabilmesi ve çarpma hâlinde aracı sert biçimde durdurmak yerine yönlendirmesidir.",
      },
      {
        baslik: "Delinatörlü modeller",
        metin:
          "Üzerine delinatör takılabilen şerit ayırıcılar, zemindeki fiziksel engele dikey görünürlük ekler. Gövde aracın tekerleğini uyarırken delinatör sürücünün göz hizasında şeridin nereye gittiğini gösterir. Gece ve sisli havada bu kombinasyon tek başına zemin ayırıcıdan belirgin biçimde etkilidir.",
      },
      {
        baslik: "Montaj ve ek parçalar",
        metin:
          "Şerit ayırıcılar uç uca eklenerek istenen uzunlukta hat oluşturur; hattın iki ucuna başlangıç ve bitiş parçası gelir. Zemine dübelle sabitlenir. Hat uzunluğunu hesaplarken modül boyunu ve uç parçaları birlikte sayın. Kauçuk gövdeli modeller ağır vasıta geçişine daha dayanıklıdır, PPC gövdeli modeller hafif ve ekonomiktir.",
      },
    ],
  },

  "Güvenlik Bariyeri": {
    giris:
      "Güvenlik bariyeri, bir alanı yayaya veya araca kapatmanın ve kalabalığı yönlendirmenin standart yoludur. Üzerine baskı alınabilen modeller aynı zamanda bilgilendirme ve reklam yüzeyi sağlar.",
    bolumler: [
      {
        baslik: "Nerede kullanılır?",
        metin:
          "Yol çalışması çevresinin kapatılmasında, etkinlik ve konser alanlarında kalabalık yönlendirmesinde, inşaat sahası sınırlarında, kaza ve bakım noktalarında geçici kordon oluşturmada kullanılır. Birbirine geçmeli modeller yan yana eklenerek istenen uzunlukta kesintisiz hat kurar.",
      },
      {
        baslik: "Üzerine baskı yaptırmak",
        metin:
          "Decotalı ve dijital baskılı modellerde bariyerin yüzeyi bilgi taşır: firma adı, uyarı metni, yönlendirme oku veya reklam. Tek yön ya da çift yön baskı seçilebilir — kalabalığın iki taraftan da gördüğü konumlarda çift yön tercih edilir. Kendi görselinizi ya da metninizi bastırmak istiyorsanız ölçü ve tasarımı önceden netleştirmek gerekir.",
      },
      {
        baslik: "Gövde ve ağırlık",
        metin:
          "Metal gövdeli bariyerler ağırdır, devrilmeye dirençlidir ve uzun ömürlüdür; kalabalık kontrolünde ve dış mekânda tercih edilir. Plastik gövdeli modeller hafiftir, tek kişiyle taşınır ve içine su veya kum doldurularak ağırlaştırılabilir — sık yer değiştiren kurulumlar için pratiktir. Rüzgârlı açık alanda hafif bariyer kullanacaksanız doldurulabilir modeli seçin.",
      },
    ],
  },

  "Duba & Kaldırım Sınırlama": {
    giris:
      "Duba, aracın girmemesi gereken yeri fiziksel olarak belli eder: kaldırım üstü, yaya alanı, otopark yeri, yangın yolu. Esnek modeller çarpmada kırılmaz, yatıp geri kalkar.",
    bolumler: [
      {
        baslik: "Nerede kullanılır?",
        metin:
          "Kaldırıma araç çıkışını engellemede, yaya bölgelerinin girişinde, tahsisli otopark yerlerinin korunmasında, yangın yolu ve acil çıkış önlerinin açık tutulmasında, bina girişlerinde köşe koruma amaçlı kullanılır. Sabit metal babalardan farkı, çarpma hâlinde hem aracın hem dubanın hasar görmemesidir.",
      },
      {
        baslik: "Sabit, esnek ve reklamlı modeller",
        metin:
          "Zemine dübelle sabitlenen modeller kalıcı kullanım içindir. Esnek (TPU) gövdeli modeller araç çarptığında yatar ve eski hâline döner; sık temas beklenen giriş-çıkışlarda ömrü uzundur. Levhalı reklam dubaları gövde üstünde bilgi veya reklam yüzeyi taşır; otopark yönlendirmesi ve mağaza önü bilgilendirmede kullanılır.",
      },
      {
        baslik: "Zincirle birlikte kullanım",
        metin:
          "Dubaların arasına plastik trafik zinciri geçirilerek kesintisiz bir sınır oluşturulur. Zincir, dubaların arasından araç veya yayanın geçmesini engeller ve sınırı uzaktan görünür kılar. Bu kullanım için zincir geçirme deliği olan duba modellerini ve uygun zincir kancasını birlikte seçmek gerekir.",
      },
    ],
  },

  "Zemin İşaretleme": {
    giris:
      "Zemin işaretleme elemanları, yaya ve araç akışını boya kullanmadan, sökülebilir ve yenilenebilir biçimde zemine işler. Görme engelli yüzeyler ise erişilebilirlik mevzuatının doğrudan gereğidir.",
    bolumler: [
      {
        baslik: "Görme engelli yüzeyler (hissedilebilir yüzey)",
        metin:
          "Görme engelli bireylerin baston ve ayak tabanıyla algıladığı kabartmalı yüzeylerdir. İki temel desen vardır: çizgili (kılavuz) yüzey yürüme yönünü gösterir, noktalı (uyarı) yüzey ise durulması gereken yeri — merdiven başı, kaldırım inişi, yaya geçidi girişi, asansör önü — bildirir. Kamu binaları, kaldırımlar, duraklar ve toplu taşıma alanlarında erişilebilirlik düzenlemeleri kapsamında aranır.",
      },
      {
        baslik: "Yapıştırmalı mı, dübelli mi?",
        metin:
          "Yapıştırmalı modeller zemine delik açılamayan yerlerde — mermer, granit, ıslak hacim, kiralık alan — kullanılır; montajı hızlıdır. Dübelli modeller yoğun yaya trafiğinde ve dış mekânda daha güvenli tutunur. Zemin düzgün ve temiz değilse yapıştırmalı modelin ömrü kısalır; montajdan önce yüzeyin kuru ve yağsız olması gerekir.",
      },
      {
        baslik: "Dayanıklılık",
        metin:
          "TPU gövdeli yüzeyler esnektir, üzerinden geçen ayak ve tekerlek yüküne karşı aşınmaya dayanır, dona ve güneşe karşı rengini uzun süre korur. Kabartma yüksekliğinin zamanla aşınması, yüzeyin işlevini kaybetmesi demektir; yoğun geçiş olan noktalarda periyodik kontrol gerekir.",
      },
    ],
  },

  "Uyarı Levhası": {
    giris:
      "Uyarı levhası, sürücüyü veya çalışanı önündeki durum hakkında önceden bilgilendirir. Doğru levhanın doğru mesafeye konması, levhanın kendisinden daha önemlidir.",
    bolumler: [
      {
        baslik: "Levha tipi ve anlamı",
        metin:
          "Üçgen levhalar tehlike bildirir — tehlikeli viraj, kasis, yol çalışması, daralan yol. Yuvarlak levhalar yasak ve zorunluluk taşır — azami hız, park yasağı, sollama yasağı, girilmez. Dikdörtgen ve kare levhalar bilgilendirme ve yönlendirme içindir — otopark, engelli park yeri, yön tabelası. Kullanacağınız levhayı seçerken mesajın hangi gruba girdiğini belirlemek, doğru forma ulaşmanın en hızlı yoludur.",
      },
      {
        baslik: "Reflektif ve okunurluk",
        metin:
          "Reflektifli levhalar farın ışığını geri yansıtarak gece okunur kalır; aydınlatması olmayan yollarda reflektifsiz levha karanlıkta görünmez. Levha ölçüsü de okunma mesafesini belirler: araç hızı arttıkça sürücünün okumak için daha az zamanı olur, dolayısıyla daha büyük levha gerekir. Şehir içi düşük hızda küçük ölçüler yeterliyken, çevre yolunda büyük ölçü zorunludur.",
      },
      {
        baslik: "Montaj seçenekleri",
        metin:
          "Levhalar direğe kelepçeyle, duvara dübelle veya dikme-panel sistemine takılarak monte edilir. Geçici çalışmalarda ayaklı ve katlanabilir modeller tercih edilir — kurulumu saniyeler sürer, iş bitince toplanır. Kalıcı montajda levhanın yerden yüksekliği ve yoldan uzaklığı, görünürlük kadar güvenlik açısından da önemlidir.",
      },
    ],
  },

  "Araç Stoperi": {
    giris:
      "Araç stoperi (park bariyeri), otopark yerinin sonunu fiziksel olarak belirler ve aracın fazla ilerleyip duvara, kaldırıma veya arkadaki araca çarpmasını önler.",
    bolumler: [
      {
        baslik: "Boy seçimi",
        metin:
          "Stoper boyu park yerinin genişliğine göre seçilir. 60 cm'lik kısa stoperler binek araç park yerinde tekerlek hizasına konur, iki adet yan yana da kullanılabilir. 110 cm ve 180-190 cm'lik uzun modeller park yerinin tamamını kaplar; sürücünün hizayı tutturması gerekmez, araç hangi açıyla girerse girsin durur. Kapalı otoparklarda ve ağır vasıta park alanlarında uzun model tercih edilir.",
      },
      {
        baslik: "Kauçuk, PVC ve montaj",
        metin:
          "Kauçuk stoperler ağırdır, yerinden oynamaz ve ağır araç teması ile deforme olmaz; kapalı otopark ve yoğun kullanımda uzun ömürlüdür. PVC modeller hafif ve ekonomiktir, hafif araç trafiğinde yeterlidir. Her iki tipte de zemine dübelle sabitleme şarttır — sabitlenmeyen stoper ilk temasta kayar ve işlevini kaybeder. Üzerindeki sarı-siyah reflektif şeritler, kapalı otoparkın loş ışığında stoperi görünür kılar.",
      },
    ],
  },

  "Yol Butonu": {
    giris:
      "Yol butonu (kedigözü), zemine sabitlenen küçük reflektörlerle şerit çizgisini gece belirgin hâle getirir. Boyanın görünmediği yağmurlu havada yolu okunur tutan elemandır.",
    bolumler: [
      {
        baslik: "Nerede kullanılır?",
        metin:
          "Şerit ayrım çizgilerinde, viraj kenarlarında, refüj başlarında, otopark içi akış hatlarında ve yaya geçidi sınırlarında kullanılır. Yağmurda zeminde biriken su boyalı çizgiyi görünmez hâle getirir; yol butonu yüzeyden yükseldiği için ıslak zeminde bile farın ışığını geri yansıtmayı sürdürür.",
      },
      {
        baslik: "Solar ve reflektif modeller",
        metin:
          "Reflektif (pasif) butonlar farın ışığını geri yansıtır, enerji gerektirmez, maliyeti düşüktür. Solar butonlar kendi ışığını yayar; gündüz şarj olur, gece yanar. Aydınlatması olmayan viraj ve kavşaklarda solar buton, pasif butondan belirgin biçimde daha uzaktan görülür. Alüminyum gövdeli modeller araç geçişine daha dayanıklıdır.",
      },
    ],
  },

  "Güvenlik Aynası": {
    giris:
      "Güvenlik aynası, sürücünün veya çalışanın doğrudan göremediği köşeyi gösterir. Kör noktanın olduğu her kavşakta, rampa çıkışında ve dar geçişte kaza riskini doğrudan düşürür.",
    bolumler: [
      {
        baslik: "Nerede kullanılır?",
        metin:
          "Kapalı otopark rampalarında ve dönüşlerinde, dar sokak kavşaklarında, fabrika içi forklift güzergâhlarında, depo koridorlarının kesiştiği noktalarda, bina çıkışlarının kaldırımla buluştuğu yerlerde kullanılır. Temel kural: iki hareket yolu birbirini görmeden kesişiyorsa ayna gerekir.",
      },
      {
        baslik: "Ölçü ve konum",
        metin:
          "Ayna çapı, izlenecek mesafeyle birlikte büyür. 40-60 cm aynalar kapalı alan ve kısa mesafe içindir; 80 cm ve üzeri açık alanda ve uzak görüş gerektiren kavşaklarda kullanılır. Ayna, sürücünün göz hizasına yakın ve bakış açısına dik olacak şekilde konumlandırılmalıdır — yanlış açıyla takılan ayna, olmayan aynadan daha tehlikelidir çünkü yanlış güven verir. Dış mekânda kullanılacak aynalarda hava koşullarına dayanıklı çerçeve ve buğulanmayan yüzey tercih edilmelidir.",
      },
    ],
  },

  "Kolon Köşe Koruyucu": {
    giris:
      "Kolon köşe koruyucu, kapalı otopark ve depolarda kolonun keskin köşesini kaplayarak hem aracı hem kolonu korur. Ucuz bir parçanın pahalı hasarı önlediği tipik örnektir.",
    bolumler: [
      {
        baslik: "Nerede kullanılır?",
        metin:
          "Kapalı otopark kolonlarında, depo ve fabrika içi raf ayaklarında, forklift güzergâhındaki duvar köşelerinde, yükleme rampası kenarlarında kullanılır. Manevra alanının dar olduğu her kolon, er ya da geç temas alır; koruyucu hem aracın boyasını hem betonun köşesini korur.",
      },
      {
        baslik: "Malzeme ve montaj",
        metin:
          "Kauçuk koruyucular darbeyi en iyi sönümler, ağır temasta bile parçalanmaz. PVC ve PPC modeller hafif temas için yeterlidir ve daha ekonomiktir. Montaj yapıştırma veya dübelle yapılır; forklift gibi ağır araç teması bekleniyorsa mutlaka dübelli montaj seçilmelidir. Üzerindeki sarı-siyah reflektif şeritler, loş otoparkta köşeyi uzaktan belli eder.",
      },
    ],
  },

  "Zincir": {
    giris:
      "Plastik trafik zinciri, dubalar arasına geçirilerek hızlı ve sökülebilir bir sınır oluşturur. Metal zincirin aksine paslanmaz, hafiftir ve araca temas ettiğinde hasar vermez.",
    bolumler: [
      {
        baslik: "Kalınlık ve kullanım",
        metin:
          "Zincir kalınlığı hem görünürlüğü hem dayanımı belirler. İnce zincirler yaya yönlendirmesi ve iç mekân sınırlaması için yeterlidir. 8 mm ve üzeri kalın zincirler dış mekânda, araç trafiğinin yanında ve rüzgâra maruz yerlerde kullanılır — hem sarkmaz hem uzaktan görünür. Sarı-siyah renkli zincirler uyarı amacını kendiliğinden taşır.",
      },
      {
        baslik: "Duba ve kanca ile birlikte",
        metin:
          "Zincir tek başına işe yaramaz: zincir geçirme deliği olan duba ve zinciri dubaya tutturan kanca ile birlikte planlanır. İhtiyacınız olan zincir uzunluğunu hesaplarken dubalar arası mesafeye zincirin doğal sarkmasını da eklemeniz gerekir; gergin takılan zincir ilk temasta kancasından kopar.",
      },
    ],
  },

  "Refüj Başı Dubası": {
    giris:
      "Refüj başı dubası, orta kaldırımın başladığı noktayı sürücüye uzaktan gösterir. Refüj başı, şehir içinde en sık çarpılan noktalardan biridir.",
    bolumler: [
      {
        baslik: "Neden ayrı bir ürün?",
        metin:
          "Refüjün başlangıcı, sürücünün yolu okurken en geç fark ettiği yerdir; özellikle gece ve yağmurda beton ada başı zeminle aynı renge bürünür. Refüj başı dubası bu noktayı dikey ve reflektif bir kütleyle işaretler. Esnek gövdeli modeller çarpmada yatar ve geri kalkar — hem aracın hem refüjün hasarını azaltır.",
      },
      {
        baslik: "Seçim ve montaj",
        metin:
          "Duba, refüjün genişliğine ve yaklaşım hızına göre seçilir; hız arttıkça daha büyük ve daha çok reflektifli model gerekir. Zemine dübelle sabitlenir. Üzerine delinatör veya solar lamba eklenebilen modeller, gece görünürlüğünü belirgin biçimde artırır.",
      },
    ],
  },

  "Dikme + Panel Sistemi": {
    giris:
      "Dikme ve panel sistemi, levhayı direk kurmadan ayağa kaldırmanın yoludur: ağırlıklı taban, dikme borusu ve üstüne takılan panel levhası bir araya gelir.",
    bolumler: [
      {
        baslik: "Sistem nasıl kurulur?",
        metin:
          "Üç parçadan oluşur: zemine oturan ağırlık tabanı, tabana geçen dikme ve dikmenin üstüne kelepçeyle tutturulan panel levhası. Zemine delik açmayı gerektirmez, bu yüzden geçici çalışmalarda, kiralık alanlarda ve sık yer değiştiren kurulumlarda tercih edilir. Taban ölçüsü büyüdükçe sistem rüzgâra karşı daha kararlı durur.",
      },
      {
        baslik: "Parçaları birlikte planlayın",
        metin:
          "Bir sistem sipariş ederken dört şeyi birlikte saymak gerekir: taban, dikme, panel levha ve dikme kelepçesi. Dikme çapı (Ø63 veya Ø110 gibi) ile kelepçe ve tabanın uyumlu olması şarttır — farklı çaplar birbirine geçmez. Rüzgârlı açık alanda kullanacaksanız ağır tabanı ve geniş çaplı dikmeyi seçin.",
      },
    ],
  },

  "Katlanabilir Levha": {
    giris:
      "Katlanabilir levha, saniyeler içinde kurulup toplanan geçici uyarı levhasıdır. Temizlik, bakım ve kısa süreli çalışmalarda ayrı ayak ya da montaj gerektirmez.",
    bolumler: [
      {
        baslik: "Nerede kullanılır?",
        metin:
          "Islak zemin uyarısı, kısa süreli bakım çalışmaları, koridor ve merdiven temizliği, asansör bakımı, ofis ve AVM içi geçici kapatmalarda kullanılır. Kendi ayağı üzerinde durur, açılıp kapanır, iş bitince katlanıp bir kenara kaldırılır.",
      },
      {
        baslik: "Seçim",
        metin:
          "İki yüzü de baskılı modeller her iki yönden gelen kişiye mesajı gösterir; tek yüz baskılı modeller koridor gibi tek yönlü geçişlerde yeterlidir. Dış mekânda kullanacaksanız rüzgârda devrilmeyecek ağırlıkta ve geniş tabanlı model seçin.",
      },
    ],
  },

  "Kablo Koruyucu": {
    giris:
      "Kablo koruyucu kasis, zeminden geçen kablo ve hortumu araç ile yaya geçişinden korur; aynı zamanda takılıp düşme riskini ortadan kaldırır.",
    bolumler: [
      {
        baslik: "Nerede kullanılır?",
        metin:
          "Etkinlik ve konser alanlarında ses-ışık kablolarının geçişinde, şantiyede jeneratör ve kaynak kablolarında, fabrika içi geçici hat çekimlerinde, fuar ve organizasyon alanlarında kullanılır. Kablonun üzerinden araç veya forklift geçecekse koruyucu zorunludur — ezilen kablo hem iş durdurur hem yangın riski taşır.",
      },
      {
        baslik: "Kanal sayısı ve ölçü",
        metin:
          "Koruyucular kanal sayısına göre seçilir: tek kanallı modeller tek bir kalın kablo veya hortum için, iki ve üç kanallı modeller birden fazla hattı ayrı ayrı geçirmek içindir. Kanal kesiti, geçirilecek en kalın kablonun çapından büyük olmalıdır. Köşe parçaları hattın dönüş yaptığı yerlerde kullanılır; düz gövdeyle birlikte planlanır. Üst kapak açılabilir olduğu için kablo döşemek ve sökmek kolaydır.",
      },
    ],
  },

  "Uyarı Dikmesi": {
    giris:
      "Uyarı dikmesi, kırmızı-beyaz gövdesiyle bir noktayı ya da hattı dikey olarak işaretleyen geçici dikmedir. Şantiye ve yol çalışmalarında alan sınırı çizmek için kullanılır.",
    bolumler: [
      {
        baslik: "Kullanım ve seçim",
        metin:
          "Çalışma alanının sınırını belirlemede, çukur ve açık kazı çevresinde, geçici yönlendirme hattı oluşturmada kullanılır. Ø63 çaplı modeller hafif ve taşınabilirdir; Ø110 çaplı modeller daha kararlı durur ve rüzgâra dirençlidir. Reflektifli modeller gece görünür, reflektifsiz modeller yalnızca gündüz çalışması için uygundur. Dikmeler arasına zincir veya şerit çekilerek kesintisiz sınır oluşturulur.",
      },
    ],
  },

  "Ağırlık Tabanı": {
    giris:
      "Ağırlık tabanı, dikme ve levha sistemlerinin rüzgârda devrilmesini önleyen taban kütlesidir. Zemine delik açılamayan her kurulumun temel parçasıdır.",
    bolumler: [
      {
        baslik: "Nasıl seçilir?",
        metin:
          "Taban ağırlığı, üstündeki levhanın yüzey alanıyla birlikte artmalıdır: geniş bir panel levha rüzgârda yelken görevi görür ve hafif tabanı devirir. Açık alanda ve yüksek levhalarda en ağır tabanı seçmek, devrilen levhayı toplamaktan ucuzdur. Taban çapının dikme çapıyla uyumlu olması şarttır; farklı çaplar birbirine geçmez.",
      },
    ],
  },

  "Panel Levhası": {
    giris:
      "Panel levhası, dikme sistemine takılan ve üzerinde uyarı, yasak veya bilgilendirme mesajı taşıyan levhadır.",
    bolumler: [
      {
        baslik: "Ölçü ve montaj",
        metin:
          "Panel ölçüsü okunma mesafesini belirler: araç hızı arttıkça daha büyük panel gerekir. Panel, dikmeye kelepçeyle tutturulur; dikme çapı ile kelepçenin uyumlu olması gerekir. Sipariş verirken panelin yanında dikme, taban ve kelepçeyi de listeye eklemeyi unutmayın — eksik parça sahada kurulumu durdurur.",
      },
    ],
  },

  "Dikme Kelepçesi": {
    giris:
      "Dikme kelepçesi, panel levhasını dikme borusuna sabitleyen bağlantı parçasıdır. Küçük bir parça, ama olmadan sistem kurulmaz.",
    bolumler: [
      {
        baslik: "Çap uyumu",
        metin:
          "Kelepçe, dikmenin çapına göre seçilir — Ø63 dikme için Ø63 kelepçe, Ø110 dikme için Ø110 kelepçe gerekir. Yanlış çap takılmaz veya gevşek kalır. Bir panel levhası genellikle iki kelepçe ile sabitlenir; sipariş adedini buna göre hesaplayın.",
      },
    ],
  },

  "Bağlantı Aparatı": {
    giris:
      "Bağlantı aparatı, delinatör ve benzeri elemanları birbirine veya zemine bağlayan ara parçadır.",
    bolumler: [
      {
        baslik: "Ne işe yarar?",
        metin:
          "Delinatörleri bir hat hâlinde birbirine bağlamak, zincir geçirmek veya elemanı tabana sabitlemek için kullanılır. Ürüne özel olduğu için, kullandığınız delinatör veya duba modeliyle uyumlu aparatı seçmeniz gerekir. Toplu alımlarda aparatı ana üründen ayrı saymak, sahada eksik kalmanın önüne geçer.",
      },
    ],
  },

  "Koni Kulpu": {
    giris:
      "Koni kulpu, trafik konisinin taşınmasını ve istiflenmesini kolaylaştıran, koninin tepesine geçen aparattır.",
    bolumler: [
      {
        baslik: "Ne işe yarar?",
        metin:
          "Çok sayıda koniyi tek tek taşımak yerine kulptan tutarak kaldırmak, saha kurulum ve toplama süresini kısaltır. Ayrıca koniler üst üste istiflendiğinde birbirine sıkışmasını önler. Koni boyuna ve ağız çapına uygun kulbu seçmek gerekir.",
      },
    ],
  },

  "Zincir Kancası": {
    giris:
      "Zincir kancası, plastik trafik zincirini dubaya veya dikmeye tutturan küçük bağlantı parçasıdır.",
    bolumler: [
      {
        baslik: "Seçim",
        metin:
          "Kanca, kullanacağınız zincirin kalınlığına uygun olmalıdır — ince kanca kalın zinciri almaz, gevşek kanca ilk temasta çıkar. Zincir siparişinde kanca adedini de hesaplayın: her duba bağlantısı için en az bir kanca gerekir.",
      },
    ],
  },

  "Flaşör Lamba": {
    giris:
      "Flaşör lamba, yanıp sönen ışığıyla tehlikeli noktayı gece belli eder. Yol çalışmasının ve geçici engelin standart uyarı elemanıdır.",
    bolumler: [
      {
        baslik: "Kullanım",
        metin:
          "Çalışma alanının köşelerine, kapatılan şeridin girişine, açık kazı ve çukur çevresine, geçici engelin üzerine konur. Koni veya dikme üstüne monte edilebilen modeller ayrı ayak gerektirmez. Yanıp sönen ışık, sabit ışığa göre çevre aydınlatması içinde daha kolay fark edilir.",
      },
    ],
  },

  "El Uyarı Levhası": {
    giris:
      "El uyarı levhası (el dur levhası), trafiği elle yönlendiren görevlinin kullandığı çift yönlü işaret levhasıdır.",
    bolumler: [
      {
        baslik: "Kullanım",
        metin:
          "Yol çalışmalarında tek şeritten karşılıklı geçişin yönetilmesinde, okul geçitlerinde, otopark giriş-çıkış yönlendirmesinde kullanılır. Bir yüzünde durdurma, diğer yüzünde geçiş işareti bulunur; görevli levhayı çevirerek yönü değiştirir. Reflektifli modeller gece ve alacakaranlıkta uzaktan görünür.",
      },
    ],
  },

  "Vida": {
    giris:
      "Trafik ekipmanlarının zemine sabitlenmesinde kullanılan montaj vidalarıdır.",
    bolumler: [
      {
        baslik: "Dübelle birlikte seçilir",
        metin:
          "Vida tek başına değil, zemin tipine uygun dübelle birlikte seçilir. Asfalt, beton ve parke taşı farklı dübel gerektirir. Vida boyu, sabitlenecek ürünün taban kalınlığı ile zemine girmesi gereken derinliğin toplamına göre belirlenir. Bazı ürünlerde montaj gereçleri kutuya dahildir — sipariş öncesi ürün sayfasındaki montaj bilgisini kontrol edin.",
      },
    ],
  },

  "Dübel": {
    giris:
      "Trafik ekipmanlarının zemine sabitlenmesinde vidayla birlikte kullanılan montaj dübelleridir.",
    bolumler: [
      {
        baslik: "Zemine göre seçim",
        metin:
          "Betonda ve asfaltta farklı tutunma davranışı olduğu için dübel tipi zemine göre seçilir. Yanlış dübel, ilk araç temasında ürünün yerinden sökülmesine yol açar. Kasis, stoper ve şerit ayırıcı gibi doğrudan araç teması alan ürünlerde dübel kalitesi, ürünün kendisi kadar belirleyicidir.",
      },
    ],
  },

  "Diğer Trafik Ekipmanı": {
    giris:
      "Diğer kategorilere girmeyen yardımcı ürünler, yedek parçalar ve özel kullanım ekipmanları bu başlık altında toplanır.",
    bolumler: [
      {
        baslik: "Aradığınızı bulamadıysanız",
        metin:
          "Katalogdaki ürünlerin tamamı ölçü, malzeme ve reflektif bilgisiyle listelidir; aradığınız ürünü koduyla aratmak en hızlı yoldur. Listede göremediğiniz bir ürün için bize ulaşın — tedarik edebiliyorsak fiyat veririz. Kamu kurumu alımlarında teknik şartnameyi gönderirseniz hangi ürünün tarif edildiğini eşleştirip teklif hazırlıyoruz.",
      },
    ],
  },
};

/** Levha alt kategorileri aynı metni paylaşır — hepsi biçim/ölçü farkıdır. */
const LEVHA_ORTAK: KategoriIcerik = {
  giris:
    "Trafik levhaları, mesajı biçimiyle taşır: üçgen tehlike, yuvarlak yasak ve zorunluluk, dikdörtgen ve kare bilgilendirme bildirir. Doğru levhayı seçmenin ilk adımı, vermek istediğiniz mesajın hangi gruba girdiğini belirlemektir.",
  bolumler: [
    {
      baslik: "Ölçü ve okunma mesafesi",
      metin:
        "Levha ölçüsü, sürücünün levhayı ne kadar uzaktan okuyabileceğini belirler. Araç hızı arttıkça okumak için kalan süre kısalır, dolayısıyla daha büyük ölçü gerekir. Şehir içi düşük hızlı yollarda ve otopark içinde küçük ölçüler yeterliyken, çevre yolu ve hızlı güzergâhlarda büyük ölçü zorunludur. Yaya alanlarında ve bina içinde en küçük ölçüler kullanılır.",
    },
    {
      baslik: "Reflektif ve malzeme",
      metin:
        "Reflektifli levhalar farın ışığını geri yansıtarak gece okunur kalır. Aydınlatması olmayan bir yola reflektifsiz levha koymak, levhayı geceleri yok saymak demektir. PPC gövdeli levhalar hafif, dış ortama dayanıklı ve ekonomiktir; dış mekânda renk solmasına karşı dirençlidir.",
    },
    {
      baslik: "Montaj",
      metin:
        "Levhalar direğe kelepçeyle, duvara dübelle veya dikme-panel sistemine takılarak monte edilir. Geçici çalışmalarda zemine delik açmayan ağırlıklı taban + dikme sistemi tercih edilir. Montaj yüksekliği, levhanın yayanın veya aracın görüş alanına girmesini sağlayacak şekilde ayarlanmalıdır.",
    },
  ],
};

for (const ad of ["Dikdörtgen Levha", "Yuvarlak Levha", "Ekstra Yuvarlak Levha", "Üçgen Levha", "Kare Levha"]) {
  KATEGORI_ICERIK[ad] = LEVHA_ORTAK;
}
