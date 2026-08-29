import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["iyzipay"],

  // görseller zaten WebP ve 1600px — Next optimizasyonuna gerek yok, unoptimized kullanılıyor
  images: {
    formats: ["image/webp"],
    deviceSizes: [360, 420, 640, 900, 1200, 1600],
    imageSizes: [64, 96, 128, 160, 220, 320],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    remotePatterns: [],
  },

  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // paket boyutunu küçült
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  async headers() {
    return [
      {
        // görseller: bir yıl önbellek, içerik değişirse dosya adı değişiyor
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/marka/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
