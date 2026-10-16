import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * AI tarayıcıları AÇIK bırakılıyor — bunlar engellenirse ChatGPT, Claude,
 * Perplexity ve Google AI Overviews siteyi kaynak gösteremez.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/odeme", "/sepet", "/odeme-sonuc"] },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
