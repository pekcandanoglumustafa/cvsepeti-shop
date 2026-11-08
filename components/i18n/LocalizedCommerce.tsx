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

export function LocalizedCart({locale,text}:{locale:string;text:Ui}) {
  const {items,remove,setQty,totalKdv,kargo,genelToplam,kargoOdeme,setKargoOdeme}=useCart();
  const [ready,setReady]=useState(false);
  useEffect(()=>setReady(true),[]);
  if(!ready)return <div style={{minHeight:250}}/>;
  if(!items.length)return <div className="intl-empty"><h2>{text.cart_empty}</h2><Link className="intl-button" href={"/"+locale+"/urunler"}>{text.back_to_catalog}</Link></div>;
  return <div className="intl-cart">
    <div className="intl-cart-items">{items.map(p=><div key={p.slug} className="intl-cart-row">
      <Image src={kartGorseli(p.image)} alt={p.name} unoptimized width={90} height={90} style={{objectFit:"contain"}}/>
      <div><Link href={"/"+locale+"/urun/"+p.slug}>{p.name}</Link><small>{p.slug}</small>
        <div><label>{text.quantity} <input type="number" min={1} max={Math.max(1,p.stock)} value={p.qty}
          onChange={e=>setQty(p.slug,Math.max(1,Math.min(Number(e.target.value)||1,p.stock||999)))}/></label>
        <button className="intl-text-button" onClick={()=>remove(p.slug)}>{text.remove}</button></div>
      </div><strong>{new Intl.NumberFormat(locale==="ar"?"ar-EG":locale==="zh"?"zh-CN":locale==="az"?"az-AZ":locale,{style:"currency",currency:"TRY"}).format(p.price_kdv*p.qty)}</strong>
    </div>)}</div>
    <aside className="intl-cart-summary">
      <div><span>{text.subtotal}</span><strong>{totalKdv().toLocaleString("tr-TR")} ₺</strong></div>
      <div><span>{text.shipping_fee}</span><strong>{kargo().toLocaleString("tr-TR")} ₺</strong></div>
      <div className="intl-total"><span>{text.total}</span><strong>{genelToplam().toLocaleString("tr-TR")} ₺</strong></div>
      <p>{text.warning_checkout}</p>
      <Link className="intl-button" href="/odeme">{text.checkout}</Link>
      <Link className="intl-underlined" href={"/"+locale+"/urunler"}>{text.continue_shopping}</Link>
    </aside>
  </div>;
}

