"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { urunDesi } from "@/lib/kargo";
import type { Product } from "@/lib/products";
import type { Ui } from "@/lib/i18n-data";
import { kartGorseli } from "@/lib/gorsel";
import Image from "next/image";

export function LocalizedBuy({ product, locale, text }: { product:Product; locale:string; text:Ui }) {
  const add = useCart(s=>s.add);
  const [qty,setQty]=useState(1);
  const [added,setAdded]=useState(false);
  return <div className="intl-buy">
    <label>{text.quantity} <input type="number" min={1} max={Math.max(1,product.stock)} value={qty}
        onChange={e=>setQty(Math.min(Math.max(1,Number(e.target.value)||1),Math.max(1,product.stock)))}/></label>
    <button disabled={!product.stock} className="intl-button" onClick={()=>{
      add({slug:product.slug,name:product.name,price:product.price,price_kdv:product.price_kdv,
        image:product.images[0]||"",stock:product.stock,desi:urunDesi(product),
        kategori:product.category,olcu3:product.olcu3,geo:product.geo,
        agirlik_kg:product.agirlik_kg,agirlikli:product.agirlikli,koli_olcu:product.koli_olcu,koli_adet:product.koli_adet},qty);
      setAdded(true);
    }}>{added?text.added:text.add_to_cart}</button>
    {added&&<Link href={"/"+locale+"/sepet"} className="intl-underlined">{text.view_cart}</Link>}
  </div>
}

export function LocalizedCart({locale,text}:{locale:string;text:Ui}¶»§q«^