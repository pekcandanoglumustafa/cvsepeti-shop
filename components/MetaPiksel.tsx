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
import { akisKimligi } from "@/lib/site";

export const META_PIKSEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "29277488965215797";

type Fbq = (...a: unknown[]) => void;
function fbq(...a: unknown[]) {
  if (typeof window === "undefined") return;
  const f = (window as unknown as { fbq?: Fbq }).fbq;
  if (f) f(...a);
}

type Gtag = (...a: unknown[]) => void;
/** Google Analytics 4 e-ticaret olayı (gtag yüklü değilse sessizce geçer) */
export function gaOlay(ad: string, veri: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  if (g) g("event", ad, veri);
}
const gaUrun = (i: Pick<CartItem, "kod" | "slug" | "name" | "price_kdv" | "kategori"> & { qty?: number }) => ({
  item_id: akisKimligi(i.kod || i.slug), item_name: i.name, item_category: i.kategori, price: i.price_kdv, quantity: i.qty || 1,
});
const tutar = (items: CartItem[]) => Math.round(items.reduce((t, i) => t + i.price_kdv * i.qty, 0) * 100) / 100;

const id = (i: Pick<CartItem, "kod" | "slug">) => akisKimligi(i.kod || i.slug);

export function metaSatin(items: CartItem[], ref?: string | null) {
  if (!items.length) return;
  gaOlay("purchase", { transaction_id: ref || `T${Date.now()}`, currency: "TRY", value: tutar(items), shipping: 0, items: items.map(gaUrun) });
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
  gaOlay("begin_checkout", { currency: "TRY", value: tutar(items), items: items.map(gaUrun) });
  fbq("track", "InitiateCheckout", {
    content_ids: items.map(id),
    content_type: "product",
    num_items: items.reduce((t, i) => t + i.qty, 0),
    value: Math.round(items.reduce((t, i) => t + i.price_kdv * i.qty, 0) * 100) / 100,
    currency: "TRY",
  });
}

/** Ürün sayfasında görüntülenme olayı */
export function MetaUrunGoruntule({ kod, ad, fiyat, kategori }: { kod: string; ad: string; fiyat: number; kategori?: string }) {
  useEffect(() => {
    gaOlay("view_item", { currency: "TRY", value: fiyat, items: [{ item_id: akisKimligi(kod), item_name: ad, item_category: kategori, price: fiyat, quantity: 1 }] });
    const t = setTimeout(
      () => fbq("track", "ViewContent", { content_ids: [akisKimligi(kod)], content_name: ad, content_type: "product", value: fiyat, currency: "TRY" }),
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

  // Site içi arama
  useEffect(() => {
    if (yol?.replace(/^\/[a-z]{2}(?=\/)/, "") !== "/ara") return;
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) { gaOlay("search", { search_term: q }); fbq("track", "Search", { search_string: q }); }
  }, [yol]);

  // Sepetten çıkarma
  useEffect(() => {
    const cik = (e: Event) => {
      const d = (e as CustomEvent).detail || {};
      gaOlay("remove_from_cart", { currency: "TRY", value: (d.fiyat || 0) * (d.qty || 1), items: [{ item_id: akisKimligi(d.kod || d.slug || ""), item_name: d.name, price: d.fiyat, quantity: d.qty || 1 }] });
    };
    window.addEventListener("cart:removed", cik);
    return () => window.removeEventListener("cart:removed", cik);
  }, []);

  useEffect(() => {
    const dinle = (e: Event) => {
      const d = (e as CustomEvent).detail || {};
      if (!d.kod) return;
      d.kod = akisKimligi(d.kod);
      gaOlay("add_to_cart", { currency: "TRY", value: Math.round((d.fiyat || 0) * (d.qty || 1) * 100) / 100, items: [{ item_id: d.kod, item_name: d.name, price: d.fiyat, quantity: d.qty || 1 }] });
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
    <>
    {/* Microsoft Clarity: oturum kayıtları ve ısı haritası (hassas alanlar varsayılan olarak maskeli) */}
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","zbhnboafod");`}
    </Script>
    <Script id="meta-piksel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIKSEL_ID}');fbq('track','PageView');`}
    </Script>
    </>
  );
}
