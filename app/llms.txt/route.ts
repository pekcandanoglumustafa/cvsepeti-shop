import { readFileSync } from "node:fs";
import path from "node:path";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// content/llms.txt içindeki {SITE_URL} yer tutucusu domain sabitiyle doldurulur
export function GET() {
  const metin = readFileSync(path.join(process.cwd(), "content/llms.txt"), "utf8").replaceAll("{SITE_URL}", SITE_URL);
  return new Response(metin, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
