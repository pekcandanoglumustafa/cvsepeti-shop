import fs from "fs";
import path from "path";

export type Yazi = {
  slug: string;
  baslik: string;
  ozet: string;          // 50-90 kelime, AI motorlarının alıntılayacağı doğrudan cevap
  tarih: string;
  guncelleme?: string;
  kategori: string;
  etiketler: string[];
  okuma: number;         // dakika
  icerik: string;        // markdown
  sss?: { s: string; c: string }[];
  ilgiliUrunler?: string[];  // slug
};

const DIZIN = path.join(process.cwd(), "content/blog");

function ayristir(dosya: string): Yazi {
  const ham = fs.readFileSync(path.join(DIZIN, dosya), "utf8");
  const m = ham.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`Frontmatter yok: ${dosya}`);
  const meta: Record<string, any> = {};
  for (const satir of m[1].split("\n")) {
    const i = satir.indexOf(":");
    if (i < 0) continue;
    const k = satir.slice(0, i).trim();
    let v: any = satir.slice(i + 1).trim();
    if (v.startsWith("[") && v.endsWith("]")) {
      v = v.slice(1, -1).split(",").map((x: string) => x.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    } else v = v.replace(/^["']|["']$/g, "");
    meta[k] = v;
  }
  const icerik = m[2].trim();
  const kelime = icerik.split(/\s+/).length;
  return {
    slug: dosya.replace(/\.md$/, ""),
    baslik: meta.baslik, ozet: meta.ozet, tarih: meta.tarih,
    guncelleme: meta.guncelleme, kategori: meta.kategori || "Rehber",
    etiketler: meta.etiketler || [], okuma: Math.max(1, Math.round(kelime / 200)),
    icerik, ilgiliUrunler: meta.ilgiliUrunler || [],
    sss: icerikSSS(icerik),
  };
}

/** ## ile başlayan soru başlıklarını FAQ'ya çevirir */
function icerikSSS(md: string) {
  const out: { s: string; c: string }[] = [];
  const blok = md.split(/\n(?=## )/);
  for (const b of blok) {
    const bas = b.match(/^## (.+)$/m);
    if (!bas || !bas[1].trim().endsWith("?")) continue;
    const govde = b.replace(/^## .+$/m, "").trim().split("\n\n")[0];
    if (govde) out.push({ s: bas[1].trim(), c: govde.replace(/[*_`#]/g, "").slice(0, 500) });
  }
  return out;
}

export function tumYazilar(): Yazi[] {
  if (!fs.existsSync(DIZIN)) return [];
  return fs.readdirSync(DIZIN).filter((f) => f.endsWith(".md")).map(ayristir)
    .sort((a, b) => b.tarih.localeCompare(a.tarih));
}
export function yaziGetir(slug: string) {
  return tumYazilar().find((y) => y.slug === slug);
}
export function blogKategoriler() {
  return [...new Set(tumYazilar().map((y) => y.kategori))];
}
