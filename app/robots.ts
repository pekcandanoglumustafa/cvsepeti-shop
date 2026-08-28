import type { MetadataRoute } from "next";

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
    sitemap: "https://www.trafikurunleri.com/sitemap.xml",
    host: "https://www.trafikurunleri.com",
  };
}
