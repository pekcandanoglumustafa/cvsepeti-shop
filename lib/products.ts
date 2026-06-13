import products from "@/data/products.json";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  images: string[];
  desi: number;
  color: string;
  size: string;
  dims: string;
};

export const allProducts = products as Product[];

export const categories = Array.from(
  new Set(allProducts.map((p) => p.category))
).sort();

export const categorySlug = (cat: string) =>
  cat
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/&/g, "ve")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const categoryBySlug = (slug: string) =>
  categories.find((c) => categorySlug(c) === slug);

export const getProduct = (slug: string) =>
  allProducts.find((p) => p.slug === slug);

export const productsByCategory = (cat: string) =>
  allProducts.filter((p) => p.category === cat);

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  }).format(price);

// Strip leading product-name repetition from Trendyol-style descriptions
export const cleanDescription = (name: string, desc: string) => {
  if (!desc) return "";
  let d = desc.trim();
  if (d.toLowerCase().startsWith(name.toLowerCase())) {
    d = d.slice(name.length).trim();
  }
  return d.replace(/^[-–—:\s]+/, "");
};
