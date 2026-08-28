/** Basit markdown → HTML. Bağımlılık yok, ihtiyacımız olan alt küme. */
export function mdToHtml(md: string): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const satirIci = (s: string) =>
    esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>")
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

  const out: string[] = [];
  const bloklar = md.split(/\n{2,}/);
  for (const b of bloklar) {
    const t = b.trim();
    if (!t) continue;
    if (/^### /.test(t)) { out.push(`<h3>${satirIci(t.slice(4))}</h3>`); continue; }
    if (/^## /.test(t))  { out.push(`<h2>${satirIci(t.slice(3))}</h2>`); continue; }
    if (/^# /.test(t))   { out.push(`<h2>${satirIci(t.slice(2))}</h2>`); continue; }
    if (/^\|/.test(t)) {
      const sat = t.split("\n").filter((x) => x.trim());
      const huc = (s: string) => s.split("|").slice(1, -1).map((c) => c.trim());
      const bas = huc(sat[0]);
      const govde = sat.slice(2).map(huc);
      out.push(`<table><thead><tr>${bas.map((c) => `<th>${satirIci(c)}</th>`).join("")}</tr></thead><tbody>${
        govde.map((r) => `<tr>${r.map((c) => `<td>${satirIci(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`);
      continue;
    }
    if (/^[-*] /.test(t)) {
      out.push(`<ul>${t.split("\n").map((l) => `<li>${satirIci(l.replace(/^[-*] /, ""))}</li>`).join("")}</ul>`);
      continue;
    }
    if (/^\d+\. /.test(t)) {
      out.push(`<ol>${t.split("\n").map((l) => `<li>${satirIci(l.replace(/^\d+\. /, ""))}</li>`).join("")}</ol>`);
      continue;
    }
    if (/^> /.test(t)) { out.push(`<blockquote>${satirIci(t.replace(/^> /gm, ""))}</blockquote>`); continue; }
    out.push(`<p>${satirIci(t).replace(/\n/g, "<br/>")}</p>`);
  }
  return out.join("\n");
}
