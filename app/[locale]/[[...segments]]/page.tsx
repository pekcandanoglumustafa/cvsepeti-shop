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
���q�^