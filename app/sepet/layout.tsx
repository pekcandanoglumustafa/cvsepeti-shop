/**
 * Sayfanın kendisi istemci bileşeni olduğu için metadata buradan veriliyor.
 *
 * noindex gerekli: robots.txt'teki engel tek başına bir adresin arama
 * sonuçlarında görünmesini kesin olarak önlemiyor — Google sayfayı taramasa
 * da başka yerden bulduğu adresi içeriksiz biçimde listeleyebiliyor.
 * Kesin çözüm sayfanın kendi noindex etiketi.
 */
export const metadata = {
  title: "Sepetim",
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
