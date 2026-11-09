"use client";
/**
 * Meta (Facebook/Instagram/WhatsApp) Pikseli — veri seti "Trafik Ürünleri Piksel".
 * content_ids, Meta kataloğundaki ürün kimliğiyle (urun-akisi.xml g:id = ürün kodu) aynıdır;
 * böylece dinamik reklamlar ve katalog eşleşmesi çalışır.
 */
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { CartItem } from "@/lib/cart";

export const META_PIKSEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "29277488965215797";

type Fbq = (...a: unknown[]) => void;
function fbq(...a: unknown[]) {
  if (typeof window === "undefined") return;
  const f = (window as unknown as { fbq?: Fbq }).fbq;
  if (f) f(...a);
}

const id = (i: Pick<CartItem, "kod" | "slug">) => i.kod || i.slug;

export function metaSatin(items: CartItem[]) {
  if (!items.length) return;
  fbq("track", "Purchase", {
    content_ids: items.map(id),
    contents: items.map((i) => ({ id: id(i), quantity: i.qty, item_price: i.price_kdv })),
    content_type: "product",
    num_items: items.reduce((t, i) => t + i.qty, 0),
    value: Math.round(items.reduce((t, i) => t + i.price_kdv * i.qty, 0) * 100) / 100,
    currency: "TRY",
  });
}

export function metaOdemeBasla(items: CartItem[]) {
  if (!items.length) return;
  fbq("track", "InitiateCheckout", {
    content_ids: items.map(id),
    content_type: "product",
    num_items: items.reduce((t, i) => t + i.qty, 0),
    value: Math.round(items.reduce((t, i) => t + i.price_kdv * i.qty, 0) * 100) / 100,
    currency: "TRY",
  });
}

/** Ürün sayfasında görüntülenme olayı */
export function MetaUrunGoruntule({ kod, ad, fiyat }: { kod: string; ad: string; fiyat: number }) {
  useEffect(() => {
    const t = setTimeout(
      () => fbq("track", "ViewContent", { content_ids: [kod], content_name: ad, content_type: "product", value: fiyat, currency: "TRY" }),
      300,
    );
    return () => clearTimeout(t);
  }, [kod, ad, fiyat]);
  return null;
}

export default function MetaPiksel() {
  const yol = usePathname();
  const ilk = useRef(true);

  // Sayfa geçişlerinde PageView (ilk yükleme init betiğinde gönderilir)
  useEffect(() => {
    if (ilk.current) { ilk.current = false; return; }
    fbq("track", "PageView");
  }, [yol]);

  useEffect(() => {
    const dinle = (e: Event) => {
      const d = (e as CustomEvent).detail || {};
      if (!d.kod) return;
      fbq("track", "AddToCart", {
        content_ids: [d.kod],
        content_name: d.name,
        content_type: "product",
        contents: [{ id: d.kod, quantity: d.qty || 1 }],
        value: Math.round((d.fiyat || 0) * (d.qty || 1) * 100) / 100,
        currency: "TRY",
      });
    };
    window.addEventListener("cart:added", dinle);
    return () => window.removeEventListener("cart:added", dinle);
  }, []);

  return (
    <Script id="meta-piksel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIKSEL_ID}');fbq('track','PageView');`}
    </Script>
  );
}
