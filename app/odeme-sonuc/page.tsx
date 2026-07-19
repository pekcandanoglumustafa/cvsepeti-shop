"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { useCart } from "@/lib/cart";

function Result() {
  const params = useSearchParams();
  const status = params.get("status");
  const ref = params.get("ref");
  const clear = useCart((s) => s.clear);

  useEffect(() => {
    if (status === "success") clear();
  }, [status, clear]);

  const ok = status === "success";

  return (
    <main style={{ padding: "70px 0" }}>
      <div className="container" style={{ maxWidth: 520, textAlign: "center" }}>
        {ok ? (
          <CheckCircle2 size={64} color="var(--green)" style={{ margin: "0 auto" }} />
        ) : (
          <XCircle size={64} color="#dc2626" style={{ margin: "0 auto" }} />
        )}
        <h1 style={{ fontSize: 26, fontWeight: 800, marginTop: 20, marginBottom: 10 }}>
          {ok ? "Siparişiniz Alındı 🎉" : "Ödeme Tamamlanamadı"}
        </h1>
        {ok ? (
          <>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Ödemeniz başarıyla tamamlandı.
              {ref && (
                <>
                  {" "}Sipariş referans numaranız:{" "}
                  <strong style={{ color: "var(--text)" }}>{ref}</strong>
                </>
              )}
            </p>
            <p style={{ fontSize: 13.5, color: "var(--text-secondary)", marginTop: 10, lineHeight: 1.6 }}>
              Siparişiniz hazırlanmaya başlandı, kargo bilgileriniz e-posta adresinize gönderilecektir.
            </p>
          </>
        ) : (
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Ödeme işlemi sırasında bir sorun oluştu. Kartınızdan ücret çekilmediyse tekrar deneyebilir veya WhatsApp üzerinden bizimle iletişime geçebilirsiniz.
          </p>
        )}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
          {ok ? (
            <Link href="/urunler" className="btn-primary">Alışverişe Devam Et →</Link>
          ) : (
            <>
              <Link href="/odeme" className="btn-primary">Tekrar Dene</Link>
              <a href="https://wa.me/905076584245" className="btn-outline">WhatsApp Destek</a>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function OdemeSonucPage() {
  return (
    <Suspense fallback={null}>
      <Result />
    </Suspense>
  );
}
