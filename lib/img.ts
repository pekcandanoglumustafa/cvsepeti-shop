// Ürün görsellerini tek tip kare formata sokan yardımcı.
// Uzak (Trendyol/Zyro CDN) görselleri weserv.nl üzerinden geçirir:
// - trim: tekdüze kenar boşluklarını kırpar (ürün kadrajı doldurur)
// - w/h + fit=contain + beyaz fon: hepsi aynı kare formatta gelir
export function thumb(url: string, size = 600): string {
  if (!url) return url;
  if (url.startsWith("/")) return url; // yerel görseller zaten işlenmiş
  const clean = url.replace(/^https?:\/\//, "");
  return `https://images.weserv.nl/?url=${encodeURIComponent(clean)}&trim=10&w=${size}&h=${size}&fit=contain&cbg=white&bg=white`;
}
