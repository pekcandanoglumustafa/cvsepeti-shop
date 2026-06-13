"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";

function Result() {
  const params = useSearchParams();
  const status = params.get("status");
  const ref = params.get("ref");
  const clear = useCart((s) => s.clear);

  useEffect(() => {
    if (status === "success") clear();
  }, [status, clear]);

  if (status === "success") {
    return (
      <main className="max-w-xl mx-auto px-4 py-24 text-center">
        <CheckCircle2 className="mx-auto text-[var(--safety-orange)]" size={64} />
        <h1 className="font-display text-3xl font-bold mt-6">
          Siparişiniz Alındı
        </h1>
        <p className="text-[var(--ink-soft)] mt-3">
          Ödemeniz başarıyla tamamlandı. Sipariş referans numaranız:
        </p>
        <p className="font-display text-lg font-semibold mt-2">{ref}</p>
        <p className="text-[var(--ink-soft)] mt-4 text-sm">
          Siparişiniz hazırlanmaya başlandı, kargo bilgileriniz e-posta
          adresinize gönderilecektir.
        </p>
        <Link
          href="/urunler"
          className="inline-flex items-center gap-2 mt-8 bg-[var(--ink)] text-[var(--paper)] px-6 py-3.5 font-display tag-stencil text-sm hover:bg-[var(--safety-orange)] transition-colors"
        >
          Alışverişe Devam Et <ArrowRight size={18} />
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-24 text-center">
      <XCircle className="mx-auto text-red-500" size={64} />
      <h1 className="font-display text-3xl font-bold mt-6">
        Ödeme Tamamlanamadı
      </h1>
      <p className="text-[var(--ink-soft)] mt-3">
        Ödeme işlemi sırasında bir sorun oluştu. Lütfen tekrar deneyin veya
        farklı bir kart kullanın.
      </p>
      <Link
        href="/odeme"
        className="inline-flex items-center gap-2 mt-8 bg-[var(--ink)] text-[var(--paper)] px-6 py-3.5 font-display tag-stencil text-sm hover:bg-[var(--safety-orange)] transition-colors"
      >
        Tekrar Dene <ArrowRight size={18} />
      </Link>
    </main>
  );
}

export default function OdemeSonucPage() {
  return (
    <Suspense>
      <Result />
    </Suspense>
  );
}
