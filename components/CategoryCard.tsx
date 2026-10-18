import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { categorySlug } from "@/lib/products";

export default function CategoryCard({
  kategori,
  adet,
  gorsel,
  baslik,
}: {
  kategori: string;
  adet: number;
  gorsel?: string;
  baslik?: string;
}) {
  return (
    <Link
      href={`/kategori/${categorySlug(kategori)}`}
      className="category-card"
      prefetch={false}
    >
      <div className="category-photo">
        {gorsel ? (
          <Image
            src={gorsel}
            alt={kategori}
            width={200}
            height={137}
            unoptimized
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : null}
      </div>
      <div className="category-info">
        <div>
          <strong>{baslik || kategori}</strong>
          <small>{adet} ürün</small>
        </div>
        <ArrowUpRight
          className="icon"
          size={15}
          strokeWidth={2.2}
          aria-hidden
        />
      </div>
    </Link>
  );
}
