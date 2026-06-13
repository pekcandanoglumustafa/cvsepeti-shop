import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const img = product.images[0];
  return (
    <Link
      href={`/urun/${product.slug}`}
      className="group flex flex-col bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--gold)] transition-colors rounded-lg overflow-hidden"
    >
      <div className="relative aspect-square bg-white overflow-hidden">
        {img ? (
          <Image
            src={img}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover scale-110 group-hover:scale-[1.18] transition-transform duration-300"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--ink-soft)] text-sm">
            Görsel yok
          </div>
        )}
        <span className="absolute top-2 left-2 bg-[var(--ink)] text-[var(--gold)] text-[10px] tag-stencil px-2 py-1 rounded">
          {product.category}
        </span>
        {product.stock <= 0 && (
          <span className="absolute inset-0 bg-black/60 flex items-center justify-center text-white tag-stencil text-sm">
            Stokta Yok
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <h3 className="text-sm font-medium leading-snug line-clamp-2 min-h-[2.5rem] text-[var(--text)]">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="font-display text-lg font-semibold text-[var(--gold)]">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}
