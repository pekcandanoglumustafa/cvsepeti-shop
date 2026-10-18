export const useCases: Record<
  string,
  { title: string; short: string; description: string; categories: string[] }
> = {
  otopark: {
    title: "Otopark düzenliyorum",
    short: "Otopark",
    description: "Park alanı, araç yönlendirme ve kolon koruması için ürünler.",
    categories: [
      "Araç Stoperi",
      "Kolon Köşe Koruyucu",
      "Güvenlik Aynası",
      "Hız Kesici Kasis",
      "Duba & Kaldırım Sınırlama",
      "Uyarı Levhası",
      "Delinatör",
    ],
  },
  santiye: {
    title: "Şantiye güvenliği",
    short: "Şantiye",
    description: "Çalışma alanını ayırmak ve görünür kılmak için ürünler.",
    categories: [
      "Trafik Konisi",
      "Güvenlik Bariyeri",
      "Solar & Flaşör Lamba",
      "Flaşör Lamba",
      "Uyarı Levhası",
      "Dikdörtgen Levha",
      "El Uyarı Levhası",
      "Kablo Koruyucu",
    ],
  },
  site: {
    title: "Site ve apartman",
    short: "Site & apartman",
    description: "Giriş, park alanı ve ortak kullanım alanları için çözümler.",
    categories: [
      "Araç Stoperi",
      "Kolon Köşe Koruyucu",
      "Hız Kesici Kasis",
      "Güvenlik Aynası",
      "Zemin İşaretleme",
      "Duba & Kaldırım Sınırlama",
      "Zincir",
    ],
  },
  belediye: {
    title: "Belediye ve kamu alımı",
    short: "Belediye & kamu",
    description:
      "Yol düzenleme, erişilebilirlik ve alan güvenliği için ürünler.",
    categories: [
      "Delinatör",
      "Şerit Ayırıcı",
      "Yol Butonu",
      "Zemin İşaretleme",
      "Refüj Başı Dubası",
      "Güvenlik Bariyeri",
      "Trafik Konisi",
      "Dikdörtgen Levha",
      "Yuvarlak Levha",
      "Üçgen Levha",
    ],
  },
};
