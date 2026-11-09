// Çeviri derleyici: i18n/ceviri/<dil>/ → public/i18n/. Çalıştır: node --experimental-strip-types scripts/i18n-derle.mts
// Şablon yer tutucusu ({0}, {s0}) eksik olan girdiler atlanır — sayfada Türkçe kalır, yanlış sayı göstermez.
import fs from "fs";
import path from "path";
import { mdToHtml } from "../lib/md.ts";
const OUT = "i18n/ceviri", PUB = "public/i18n";
const DILLER = ["en", "ar", "ru", "de", "fr", "es", "zh", "az"];
const ph = (s: string) => new Set(s.match(/\{s?\d+\}/g) ?? []);
const saglam = (d: Record<string, string>) => {
  let at = 0;
  const o: Record<string, string> = {};
  for (const [k, v] of Object.entries(d)) {
    const p = ph(v);
    if ([...ph(k)].every((x) => p.has(x))) o[k] = v; else at++;
  }
  return [o, at] as const;
};
fs.mkdirSync(PUB, { recursive: true });
for (const d of DILLER) {
  const dir = path.join(OUT, d);
  const oku = (f: string) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  const parca = fs.readdirSync(dir).filter((f) => /^arayuz.*\.json$/.test(f)).sort();
  const [ui, at] = saglam(Object.assign({}, ...parca.map(oku), { "{s0} – {s1}": "{s0} – {s1}" }));
  fs.writeFileSync(path.join(PUB, `${d}.json`), JSON.stringify(ui));
  fs.writeFileSync(path.join(PUB, `${d}-urun.json`), JSON.stringify(oku("urun.json")));
  const bd = path.join(dir, "blog");
  fs.mkdirSync(path.join(PUB, "blog", d), { recursive: true });
  for (const f of fs.readdirSync(bd)) {
    const md = fs.readFileSync(path.join(bd, f), "utf8").replace(/^---[\s\S]*?\n---\s*\n/, "");
    fs.writeFileSync(path.join(PUB, "blog", d, f.replace(/\.md$/, ".html")), mdToHtml(md));
  }
  console.log(d, "arayüz", Object.keys(ui).length, "atlanan", at, "blog", fs.readdirSync(bd).length);
}
