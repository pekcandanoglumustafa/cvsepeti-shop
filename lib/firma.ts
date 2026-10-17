/**
 * Firmanın yasal ve iletişim bilgileri — TEK KAYNAK.
 * İletişim, Mesafeli Satış Sözleşmesi, Teslimat/İade ve KVKK sayfaları buradan okur.
 *
 * ⚠️ BOŞ BIRAKILAN ALANLAR SAYFADA HİÇ GÖRÜNMEZ.
 * Mesafeli Sözleşmeler Yönetmeliği m.5 gereği satıcının unvanı, açık adresi ve
 * vergi/MERSIS bilgisi sözleşmede bulunmak zorunda — aşağıdaki boşlukları doldur.
 */
export const FIRMA = {
  /** Ticari unvan — faturada yazan tam unvan */
  unvan: "Mustafa Pekcandanoğlu",
  /** Müşterinin gördüğü marka */
  marka: "Trafik Ürünleri",

  // ---- DOLDURULACAK ----
  /** Açık adres: mahalle, cadde, no, ilçe/il — Teknokent bina ve oda no dahil */
  adres: "",
  /** Örn. "Selçuk" */
  vergiDairesi: "",
  /** Vergi kimlik no veya TCKN */
  vergiNo: "",
  /** Şahıs işletmesinde yoksa boş bırak */
  mersis: "",
  /** Şahıs işletmesinde yoksa boş bırak */
  ticaretSicilNo: "",
  // ----------------------

  telefon: "0507 658 42 45",
  telefonHref: "tel:+905076584245",
  whatsapp: "https://wa.me/905076584245",
  eposta: "mustafa@cvsepeti.org",
  sehir: "Konya",
  konum: "Konya Teknokent",

  kargo: "Yurtiçi Kargo",
  odeme: "iyzico",
  kdvOrani: 20,

  /** Cayma hakkı süresi (gün) — Mesafeli Sözleşmeler Yönetmeliği m.9 */
  caymaGun: 14,
  /** Teslimat taahhüdü (gün) — Yönetmelik m.16 azami 30 gün */
  teslimatGun: 30,
} as const;

/** Sözleşme metinlerinde "Satıcı" bloğu için doldurulmuş alanlar */
export const saticiBilgileri = (): [string, string][] =>
  ([
    ["Satıcı unvanı", FIRMA.unvan],
    ["Adres", FIRMA.adres],
    ["Telefon", FIRMA.telefon],
    ["E-posta", FIRMA.eposta],
    ["Vergi dairesi", FIRMA.vergiDairesi],
    ["Vergi / TC kimlik no", FIRMA.vergiNo],
    ["MERSIS no", FIRMA.mersis],
    ["Ticaret sicil no", FIRMA.ticaretSicilNo],
  ] as [string, string][]).filter(([, v]) => v);
