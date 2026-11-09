"use client";
import { useEffect } from "react";
import { DILLER, ONEK_RE, type Dil } from "@/lib/diller";

/**
 * Sayfa çevirmeni. Sunucu sayfaları Türkçe çiziyor; dil Türkçe değilse
 * hidrasyondan sonra metin düğümleri ve öznitelikler sözlükten değiştiriliyor.
 * React bir metni yeniden yazarsa MutationObserver onu da yakalıyor.
 * Sözlükte olmayan metin Türkçe kalır ve window.__ceviriEksik listesine düşer.
 */

type Sozluk = Record<string, string>;
const ATTR = ["placeholder", "aria-label", "title", "alt"];

export function aktifDil(): Dil {
  if (typeof window === "undefined") return "tr";
  const m = location.pathname.match(ONEK_RE);
  const c = document.cookie.match(/(?:^|; )lang=([a-z]{2})/)?.[1];
  const l = (m?.[1] ?? c ?? "tr") as Dil;
  return DILLER.some((d) => d.kod === l) ? l : "tr";
}

export function dilDegistir(yeni: Dil) {
  document.cookie = `lang=${yeni}; path=/; max-age=31536000; samesite=lax`;
  const yol = location.pathname.replace(ONEK_RE, "") || "/";
  const hedef = yeni === "tr" ? yol : `/${yeni}${yol === "/" ? "" : yol}`;
  location.href = hedef + location.search;
}

const bosluk = (s: string) => s.replace(/\s+/g, " ").trim();
const SAYI = /\d+(?:[.,]\d+)*/g;
const HARF = /[A-Za-zÇĞİÖŞÜçğıöşü]/;

type Kalip = { re: RegExp; adlar: string[]; v: string };
const kalipOnbellek = new WeakMap<Sozluk, Kalip[]>();
function kaliplar(d: Sozluk): Kalip[] {
  let k = kalipOnbellek.get(d);
  if (k) return k;
  k = [];
  for (const [anahtar, v] of Object.entries(d)) {
    if (!anahtar.includes("{s")) continue;
    const adlar: string[] = [];
    const desen = anahtar
      .split(/(\{s?\d+\})/)
      .map((p) => {
        const m = p.match(/^\{(s?\d+)\}$/);
        if (!m) return p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        adlar.push(m[1]);
        return m[1].startsWith("s") ? "(.+?)" : "(\\d+(?:[.,]\\d+)*)";
      })
      .join("");
    k.push({ re: new RegExp(`^${desen}$`), adlar, v });
  }
  // uzun (daha özel) kalıp önce
  k.sort((a, b) => b.re.source.length - a.re.source.length);
  kalipOnbellek.set(d, k);
  return k;
}

function bul(k: string, d: Sozluk, derin = 0): string | undefined {
  const v = d[k];
  if (v !== undefined) return v;
  const sayilar = k.match(SAYI);
  if (sayilar) {
    let i = 0;
    const sablon = d[k.replace(SAYI, () => `{${i++}}`)];
    if (sablon !== undefined) return sablon.replace(/\{(\d+)\}/g, (_, j) => sayilar[+j] ?? "");
  }
  if (derin > 2) return undefined;
  for (const kp of kaliplar(d)) {
    const m = k.match(kp.re);
    if (!m) continue;
    const deger: Record<string, string> = {};
    let ok = true;
    kp.adlar.forEach((ad, i) => {
      const parca = m[i + 1];
      if (ad.startsWith("s")) {
        const c = HARF.test(parca) ? bul(parca, d, derin + 1) : parca;
        // çevrilemeyen parça yalnızca ürün kodu gibi büyük harf/rakamsa kabul
        if (c === undefined && !/^[A-Z0-9 .\-\/()]+$/.test(parca)) ok = false;
        deger[ad] = c ?? parca;
      } else deger[ad] = parca;
    });
    if (ok) return kp.v.replace(/\{(s?\d+)\}/g, (_, a) => deger[a] ?? "");
  }
  return undefined;
}

function cevir(s: string, d: Sozluk): string | null {
  const k = bosluk(s);
  if (!k || !HARF.test(k)) return null;
  const v = bul(k, d);
  if (v === undefined) {
    eksik.add(k);
    return null;
  }
  // baştaki/sondaki boşluğu koru
  const bas = s.match(/^\s*/)![0];
  const son = s.match(/\s*$/)![0];
  return bas + v + son;
}

const eksik = new Set<string>();
const yazdik = new WeakMap<Node, string>();

function dugum(n: Node, d: Sozluk) {
  if (n.nodeType === 3) {
    const p = n.parentElement;
    if (!p || p.closest("script,style,[translate=no]")) return;
    const t = n.nodeValue ?? "";
    if (yazdik.get(n) === t) return;
    const v = cevir(t, d);
    if (v !== null && v !== t) {
      yazdik.set(n, v);
      n.nodeValue = v;
    }
    return;
  }
  if (n.nodeType !== 1) return;
  const el = n as Element;
  if (el.matches("script,style,[translate=no]")) return;
  oznitelik(el, d);
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let c: Node | null = w.nextNode();
  while (c) {
    if (c.nodeType === 1) {
      if ((c as Element).matches("script,style,[translate=no]")) {
        c = w.nextSibling() ?? atla(w);
        continue;
      }
      oznitelik(c as Element, d);
    } else dugum(c, d);
    c = w.nextNode();
  }
}
function atla(w: TreeWalker): Node | null {
  while (w.parentNode()) {
    const s = w.nextSibling();
    if (s) return s;
  }
  return null;
}

function oznitelik(el: Element, d: Sozluk) {
  for (const a of ATTR) {
    const t = el.getAttribute(a);
    if (!t) continue;
    const k = `@${a}:${t}`;
    if (yazdik.get(el) === k) continue;
    const v = cevir(t, d);
    if (v !== null && v !== t) {
      el.setAttribute(a, v);
      yazdik.set(el, `@${a}:${v}`);
    }
  }
}

async function blogGovdesi(dil: Dil) {
  const m = location.pathname.replace(ONEK_RE, "").match(/^\/blog\/([^/]+)/);
  const govde = document.querySelector("[data-blog-govde]");
  if (!m || !govde) return;
  try {
    const r = await fetch(`/i18n/blog/${dil}/${m[1]}.html`);
    if (r.ok) govde.innerHTML = await r.text();
  } catch {}
}

export default function Ceviri() {
  useEffect(() => {
    const dil = aktifDil();
    const html = document.documentElement;
    if (dil === "tr") {
      html.classList.remove("i18n-wait");
      return;
    }
    let gozlem: MutationObserver | null = null;
    let iptal = false;
    (async () => {
      let d: Sozluk = {};
      try {
        const [a, b] = await Promise.all(
          [`/i18n/${dil}.json`, `/i18n/${dil}-urun.json`].map((u) =>
            fetch(u).then((r) => (r.ok ? r.json() : {})).catch(() => ({})),
          ),
        );
        d = { ...b, ...a };
      } catch {}
      if (iptal) return;
      await blogGovdesi(dil);
      const baslik = () => {
        const v = cevir(document.title.replace(/ \| .*$/, ""), d);
        const marka = document.title.match(/ \| .*$/)?.[0] ?? "";
        if (v) document.title = v + marka;
        const md = document.querySelector('meta[name="description"]');
        const mv = md && cevir(md.getAttribute("content") ?? "", d);
        if (md && mv) md.setAttribute("content", mv);
      };
      dugum(document.body, d);
      baslik();
      html.classList.remove("i18n-wait");
      (window as unknown as { __ceviriEksik: Set<string> }).__ceviriEksik = eksik;
      let son = location.pathname;
      gozlem = new MutationObserver((ms) => {
        for (const m of ms) {
          if (m.type === "characterData") dugum(m.target, d);
          else if (m.type === "attributes") oznitelik(m.target as Element, d);
          else m.addedNodes.forEach((n) => dugum(n, d));
        }
        if (location.pathname !== son) {
          son = location.pathname;
          blogGovdesi(dil);
        }
        baslik();
      });
      gozlem.observe(document.body, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ATTR,
      });
      new MutationObserver(baslik).observe(document.head, { childList: true, subtree: true, characterData: true });
    })();
    return () => {
      iptal = true;
      gozlem?.disconnect();
    };
  }, []);
  return null;
}

export function DilSecici() {
  return (
    <select
      translate="no"
      className="dil-secici"
      aria-label="Language"
      defaultValue="tr"
      ref={(el) => {
        if (el) el.value = aktifDil();
      }}
      onChange={(e) => dilDegistir(e.target.value as Dil)}
    >
      {DILLER.map((d) => (
        <option key={d.kod} value={d.kod}>
          {d.bayrak} · {d.ad}
        </option>
      ))}
    </select>
  );
}
