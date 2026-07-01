import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/sepet", "/odeme", "/odeme-sonuc", "/api/"],
      },
    ],
    sitemap: "https://www.cvsepeti.org/sitemap.xml",
  };
}
