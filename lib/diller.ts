/**
 * Site dilleri. Türkçe asıl dil: sayfalar Türkçe üretiliyor, diğer diller
 * tarayıcıda public/i18n/<dil>.json sözlüğüyle çevriliyor (components/Ceviri.tsx).
 * Adres yapısı: /en/urun/x → proxy önekini atıp /urun/x sayfasını gösteriyor.
 */
export const DILLER = [
  { kod: "tr", ad: "Türkçe", bayrak: "TR" },
  { kod: "en", ad: "English", bayrak: "EN" },
  { kod: "ar", ad: "العربية", bayrak: "AR" },
  { kod: "ru", ad: "Русский", bayrak: "RU" },
  { kod: "de", ad: "Deutsch", bayrak: "DE" },
  { kod: "fr", ad: "Français", bayrak: "FR" },
  { kod: "es", ad: "Español", bayrak: "ES" },
  { kod: "zh", ad: "中文", bayrak: "ZH" },
  { kod: "az", ad: "Azərbaycanca", bayrak: "AZ" },
] as const;

export type Dil = (typeof DILLER)[number]["kod"];
export const YABANCI = DILLER.map((d) => d.kod).filter((k) => k !== "tr");
export const ONEK_RE = new RegExp(`^/(${YABANCI.join("|")})(?=/|$)`);

/** <head> içinde, sayfa çizilmeden önce çalışan betik: dil, yön, bekleme sınıfı. */
export const DIL_BETIGI = `(function(){try{var m=location.pathname.match(${ONEK_RE.toString()});var c=(document.cookie.match(/(?:^|; )lang=([a-z]{2})/)||[])[1];var l=m?m[1]:(c||"tr");var ok=${JSON.stringify(
  DILLER.map((d) => d.kod),
)};if(ok.indexOf(l)<0)l="tr";var h=document.documentElement;h.lang=l;if(l==="ar")h.dir="rtl";if(l!=="tr"){h.classList.add("i18n-wait");setTimeout(function(){h.classList.remove("i18n-wait")},3000)}}catch(e){}})();`;
