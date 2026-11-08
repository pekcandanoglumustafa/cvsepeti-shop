import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allProducts, categories, categorySlug, type Product } from "@/lib/products";
import { kartGorseli } from "@/lib/gorsel";
import { SITE_URL } from "@/lib/site";
import { mdToHtml } from "@/lib/md";
import { Locale, LOCALES, localesData, type Ui } from "@/lib/i18n-data";
import { LocalizedBuy, LocalizedCart } from "@/components/i18n/LocalizedCommerce";
import "./international.css";

export const dynamic = "force-dynamic";
type PageArgs={params:Promise<{locale:string;segments?:string[]}>;searchParams:Promise<{q?:string;page?:string;sort?:string}>};
const niceNames:Record<string,string>={en:"English",de:"Deutsch",fr:"Français",es:"Español",ru:"Русский",ar:"العربية",zh:"中文",az:"Azərbaycanca"};
const pathFor=(locale:string,segments:string[])=>"/"+locale+(segments.length?"/"+segments.join("/"):"");
const translatedName=(p:Product,dict:ReturnType<typeof localesData>)=>dict.products[p.id]?.name || p.name;
const priceFmt=(n:number,locale:string)=>new Intl.NumberFormat(locale==="zh"?"zh-CN":locale==="az"?"az-AZ":locale==="ar"?"ar-EG":locale,{style:"currency",currency:"TRY",maximumFractionDigits:2}).format(n);
const sanitizePage=(value?:string)=>Math.max(1,Math.min(999,parseInt(value||"1",10)||1));

export async function generateMetadata({params}:PageArgs):Promise<Metadata>{
 const {locale,segments=[]}=await params;
 if(!LOCALES.includes(locale as Locale)) return {robots:{index:false}};
 const t=localesData(locale as Locale);
 const [head,key]=segments;
 let title=t.ui.shop_title;
 let description=t.ui.shop_intro;
 if(head==="urun"&&key) {
   const p=allProducts.find(p=>p.slug===key);
   if(p){title=translatedName(p,t);description=t.products[p.id]?.description||p.description;}
 }
 else if(head==="kategori"&&key){
   const c=categories.find(c=>categorySlug(c)===key);
   if(c) title=t.categories[c]||c;
 } else if(head==="blog"&&key) {
   title=t.blogs[key]?.title||t.ui.blog;
   description=t.blogs[key]?.summary||description;
 }else if(head==="blog") title=t.ui.blog;
 else if(head==="urunler") title=t.ui.catalog;
 else if(head==="sepet") title=t.ui.cart;
 const suffix=segments.join("/");
 const languages:Object=Object.fromEntries([...LOCALES.map(l=>[l,SITE_URL+pathFor(l,segments)]),["tr",SITE_URL+"/"+suffix]]);
 return {
  title: title+" | Trafik Ürünleri",
  description:description.slice(0,160),
  alternates:{canonical:SITE_URL+pathFor(locale,segments),languages:languages as Record<string,string>},
  openGraph:{title,description:description.slice(0,160),url:SITE_URL+pathFor(locale,segments),locale:locale==="zh"?"zh_CN":locale==="az"?"az_AZ":locale==="ar"?"ar_AR":locale},
  robots:head==="sepet"||head==="odeme"?{index:false,follow:false}:{index:true,follow:true},
 };
}
function ProductCard({product:p,locale,dict}:{product:Product;locale:Locale;dict:ReturnType<typeof localesData>}){
 const name=translatedName(p,dict);
 return <article className="intl-product-card">
  <Link href={pathFor(locale,["urun",p.slug])} className="intl-product-img">
   {p.images[0]?<Image alt={name} src={kartGorseli(p.images[0])} fill unoptimized sizes="(max-width:600px) 45vw, (max-width:1000px) 30vw, 210px" style={{objectFit:"contain",padding:13}}/>:null}
  </Link>
  <div className="intl-card-details">
   <small>{p.kod} · {dict.categories[p.category]||p.category}</small>
   <Link className="intl-product-title" href={pathFor(locale,["urun",p.slug])}>{name}</Link>
   <strong>{priceFmt(p.price_kdv,locale)}</strong>
   <span>{dict.ui.tax_included}</span>
  </div>
 </article>;
}
function ProductGrid({items,locale,dict}:{items:Product[];locale:Locale;dict:ReturnType<typeof localesData>}){
 return <div className="intl-product-grid">{items.map(p=><ProductCard key={p.id} product={p} locale={locale} dict={dict}/>)}</div>;
}
function InternationalHeader({locale,segments,dict}:{locale:Locale;segments:string[];dict:ReturnType<typeof localesData>}){
 const u=dict.ui;
 return <header className="intl-header">
  <div className="intl-header-top"><div className="intl-wrap intl-top-line"><span>{u.shipping}</span><span>{u.online_payment}</span></div></div>
  <div className="intl-wrap intl-header-center">
    <Link href={"/"+locale} className="intl-brand">TRAFİK<span>ÜRÜNLERİ</span><small>.COM</small></Link>
    <form action={"/"+locale+"/urunler"} className="intl-search"><input name="q" aria-label={u.search} placeholder={u.search}/><button type="submit">{u.search_button}</button></form>
    <Link className="intl-cart-link" href={"/"+locale+"/sepet"}>🛒 {u.cart}</Link>
    <nav className="intl-langmenu" aria-label={u.locale}><details><summary>{niceNames[locale]}</summary><div>
     <Link href={"/"+segments.join("/")}>{/* preserve Turkish route */}Türkçe</Link>
     {LOCALES.map(l=><Link key={l} href={pathFor(l,segments)} lang={l}>{niceNames[l]}</Link>)}
    </div></details></nav>
  </div>
  <nav className="intl-header-nav"><div className="intl-wrap intl-nav-inner">
   <Link href={"/"+locale}>{u.home}</Link><Link href={"/"+locale+"/urunler"}>{u.catalog}</Link>
   <Link href={"/"+locale+"/blog"}>{u.blog}</Link><Link href={"/"+locale+"/iletisim"}>{u.contact}</Link>
  </div></nav>
 </header>;
}
function FooterIntl({locale,dict}:{locale:Locale;dict:ReturnType<typeof localesData>}){
 return <footer className="intl-footer"><div className="intl-wrap intl-footer-flex">
   <div><strong>Trafik Ürünleri</strong><p>{dict.ui.shop_intro}</p><p>Konya, Türkiye</p></div>
   <nav><Link href={"/"+locale+"/urunler"}>{dict.ui.catalog}</Link><Link href={"/"+locale+"/blog"}>{dict.ui.blog}</Link><Link href={"/"+locale+"/iletisim"}>{dict.ui.contact}</Link></nav>
   <div>© 2026 trafikurunleri.com<br/>{dict.ui.payment_protected}</div>
 </div></footer>;
}
function ShowProduct({p,locale,dict}:{p:Product;locale:Locale;dict:ReturnType<typeof localesData>}){
 const name=translatedName(p,dict),desc=dict.products[p.id]?.description||p.description;
 return <div className="intl-detail">
  <div className="intl-detail-image">{p.images[0]?<Image src={p.images[0]} alt={name} fill unoptimized sizes="(max-width:900px) 95vw, 480px" style={{objectFit:"contain",padding:20}}/>:null}</div>
  <div className="intl-detail-data"><small>{p.kod} · {dict.categories[p.category]||p.category}</small><h1>{name}</h1>
   <p className="intl-big-price">{priceFmt(p.price_kdv,locale)}</p><p className="intl-light">{dict.ui.tax_included}</p>
   <p>{p.stock>0?dict.ui.in_stock:dict.ui.out_of_stock}</p>
   <LocalizedBuy product={p} locale={locale} text={dict.ui}/>
   <p className="intl-light">{dict.ui.shipping_at_checkout}</p>
   <h2>{dict.ui.description}</h2>
   <div className="intl-description">{desc.split(/\n+/).filter(Boolean).map((s,i)=><p key={i}>{s}</p>)}</div>
   <h2>{dict.ui.technical}</h2>
   <dl className="intl-tech">
    {([[dict.ui.product_code,p.kod],[dict.ui.size,p.boyut],[dict.ui.material,p.malzeme],[dict.ui.reflective,p.reflektif]] as [string,string][]).filter(x=>x[1]).map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
   </dl>
  </div>
 </div>;
}
export default async function International({params,searchParams}:PageArgs){
 const {locale,segments=[]}=await params, query=await searchParams;
 if(!LOCALES.includes(locale as Locale))notFound();
 const l=locale as Locale,dict=localesData(l),t=dict.ui;
 const [head,key]=segments;
 let main:React.ReactNode;
 if(!head) {
    main=<>
    <section className="intl-hero"><div className="intl-wrap">
     <span>{t.business}</span><h1>{t.shop_title}</h1><p>{t.shop_intro}</p>
     <Link className="intl-button" href={"/"+l+"/urunler"}>{t.browse_products} ↗</Link>
    </div></section>
    <section className="intl-wrap intl-section"><h2>{t.browse_categories}</h2><div className="intl-category-grid">
     {categories.map(c=><Link key={c} href={pathFor(l,["kategori",categorySlug(c)])}>
      {dict.categories[c]||c} <span>{allProducts.filter(p=>p.category===c).length} {t.products}</span>
     </Link>)}</div></section>
    <section className="intl-wrap intl-section"><h2>{t.browse_products}</h2><ProductGrid items={allProducts.slice(0,12)} locale={l} dict={dict}/></section>
   </>;
 }else if(head==="urunler" || head==="kategori"){
   const c=head==="kategori"?categories.find(cat=>categorySlug(cat)===key):undefined;
   if(head==="kategori"&&!c)notFound();
   let arr=c?allProducts.filter(p=>p.category===c):allProducts;
   if(query.q?.trim()){const q=query.q.toLocaleLowerCase("tr");arr=arr.filter(p=>[p.kod,p.name,p.category,dict.products[p.id]?.name].some(s=>s?.toLocaleLowerCase("tr").includes(q)));}
   if(query.sort==="price-asc")arr=[...arr].sort((a,b)=>a.price_kdv-b.price_kdv);
   if(query.sort==="price-desc")arr=[...arr].sort((a,b)=>b.price_kdv-a.price_kdv);
   const page=sanitizePage(query.page),perPage=24,totalPages=Math.max(1,Math.ceil(arr.length/perPage));
   const pg=Math.min(page,totalPages),pageItems=arr.slice((pg-1)*perPage,pg*perPage);
   const base=pathFor(l,segments);
   const href=(p:number)=>base+"?"+new URLSearchParams({...query,page:String(p)}).toString();
   main=<div className="intl-wrap intl-section">
      <h1>{c?(dict.categories[c]||c):t.catalog}</h1><p>{arr.length} {t.products}</p>
      <form className="intl-list-controls" action={base}><input name="q" defaultValue={query.q||""} placeholder={t.search} aria-label={t.search}/>
       <select name="sort" defaultValue={query.sort||""} aria-label={t.sort}><option value="">{t.sort_name}</option><option value="price-asc">{t.sort_price_asc}</option><option value="price-desc">{t.sort_price_desc}</option></select>
       <button className="intl-button">{t.search_button}</button></form>
      {arr.length?<ProductGrid items={pageItems} locale={l} dict={dict}/>:<p>{t.no_results}</p>}
      <div className="intl-pager">{pg>1?<Link href={href(pg-1)}>{t.previous}</Link>:null}<span>{t.page} {pg} / {totalPages}</span>{pg<totalPages?<Link href={href(pg+1)}>{t.next}</Link>:null}</div>
   </div>;
 }else if(head==="urun" && key && segments.length===2) {
   const product=allProducts.find(p=>p.slug===key);if(!product)notFound();
   main=<div className="intl-wrap intl-section"><p><Link href={"/"+l+"/urunler"}>{t.catalog}</Link> / {dict.categories[product.category]||product.category}</p><ShowProduct p={product} locale={l} dict={dict}/>
      <h2>{t.related}</h2><ProductGrid items={allProducts.filter(p=>p.category===product.category&&p.id!==product.id).slice(0,4)} locale={l} dict={dict}/></div>;
 }else if(head==="blog"){
   if(!key){main=<div className="intl-wrap intl-section"><h1>{t.blog}</h1><div className="intl-guides">{Object.entries(dict.blogs).map(([slug,b])=><Link key={slug} href={pathFor(l,["blog",slug])}><small>{b.published}</small><h2>{b.title}</h2><p>{b.summary}</p><span>{t.read_guide} ↗</span></Link>)}</div></div>;}
   else {const b=dict.blogs[key];if(!b)notFound(); main=<article className="intl-wrap intl-article"><Link href={"/"+l+"/blog"}>{t.blog}</Link><h1>{b.title}</h1><p>{b.summary}</p><time>{b.published}</time><div className="intl-article-body" dangerouslySetInnerHTML={{__html:mdToHtml(b.body)}}/></article>;}
 }else if(head==="sepet" && segments.length===1){
   main=<div className="intl-wrap intl-section"><h1>{t.cart}</h1><LocalizedCart locale={l} text={t}/></div>;
 }else if(head==="iletisim"&&segments.length===1){
   main=<div className="intl-wrap intl-section"><h1>{t.contact}</h1><p>{t.support}</p><p><a href="tel:+905076584245">+90 507 658 42 45</a></p><p>Konya, Türkiye</p></div>;
 }else if(head==="hakkimizda"&&segments.length===1){
   main=<div className="intl-wrap intl-section"><h1>{t.about}</h1><p>{t.shop_intro}</p><p>{t.read_only}</p></div>;
 }else if(head==="odeme"&&segments.length===1){
   main=<div className="intl-wrap intl-section"><h1>{t.checkout}</h1><p>{t.warning_checkout}</p><Link className="intl-button" href="/odeme">{t.checkout}</Link></div>;
 }else notFound();
 return <div className="intl-shell" lang={l} dir={locale==="ar"?"rtl":"ltr"}>
  <script dangerouslySetInnerHTML={{__html:"document.documentElement.lang='"+l+"';document.documentElement.dir='"+(locale==="ar"?"rtl":"ltr")+"';"}}/>
  <InternationalHeader locale={l} segments={segments} dict={dict}/>
  <main>{main}</main><FooterIntl locale={l} dict={dict}/>
 </div>;
}

