"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

const cities = [
  "Adana","Adıyaman","Afyonkarahisar","Ağrı","Amasya","Ankara","Antalya","Artvin",
  "Aydın","Balıkesir","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale",
  "Çankırı","Çorum","Denizli","Diyarbakır","Edirne","Elazığ","Erzincan","Erzurum",
  "Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Isparta","Mersin",
  "İstanbul","İzmir","Kars","Kastamonu","Kayseri","Kırklareli","Kırşehir","Kocaeli",
  "Konya","Kütahya","Malatya","Manisa","Kahramanmaraş","Mardin","Muğla","Muş",
  "Nevşehir","Niğde","Ordu","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas",
  "Tekirdağ","Tokat","Trabzon","Tunceli","Şanlıurfa","Uşak","Van","Yozgat","Zonguldak",
];

export default function CheckoutPage() {
  const { items, total } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [cardReady, setCardReady] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/iyzico/checkout-form")
      .then((r) => r.json())
      .then((d) => setCardReady(!!d.configured))
      .catch(() => setCardReady(false));
  }, []);

  const waText = encodeURIComponent(
    "Merhaba, sipariş vermek istiyorum:\n" +
      items.map((i) => `• ${i.qty}x ${i.name} — ${formatPrice(i.price * i.qty)}`).join("\n") +
      `\nToplam: ${formatPrice(total())}`
  );

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    identityNumber: "",
    address: "",
    city: "Konya",
    zip: "",
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && items.length === 0 && !showForm) {
      router.push("/sepet");
    }
  }, [mounted, items, showForm, router]);

  if (!mounted) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/iyzico/checkout-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            slug: i.slug,
            name: i.name,
            price: i.price,
            qty: i.qty,
          })),
          total: total(),
          buyer: form,
        }),
      });
      const data = await res.json();
      if (data.status !== "success") {
        setError(data.message || "Ödeme başlatılamadı, lütfen tekrar deneyin.");
        setLoading(false);
        return;
      }
      setShowForm(true);
      setTimeout(() => {
        const container = document.getElementById("iyzico-form-container");
        if (container) {
          container.innerHTML = data.checkoutFormContent;
          const script = container.querySelector("script");
          if (script) {
            const newScript = document.createElement("script");
            newScript.text = script.text;
            script.parentNode?.replaceChild(newScript, script);
          }
        }
      }, 50);
    } catch {
      setError("Bir hata oluştu, lütfen tekrar deneyin.");
    }
    setLoading(false);
  };

  if (showForm) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-6">
          Güvenli Ödeme
        </h1>
        <div className="border border-[var(--line)] bg-white p-4">
          <div id="iyzico-form-container" />
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl sm:text-4xl font-bold mb-8">
        Ödeme Bilgileri
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Ad</label>
              <input
                required name="name" value={form.name} onChange={handleChange}
                className="w-full border border-[var(--line)] px-3 py-2.5 focus:outline-none focus:border-[var(--ink)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Soyad</label>
              <input
                required name="surname" value={form.surname} onChange={handleChange}
                className="w-full border border-[var(--line)] px-3 py-2.5 focus:outline-none focus:border-[var(--ink)]"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">E-posta</label>
              <input
                required type="email" name="email" value={form.email} onChange={handleChange}
                className="w-full border border-[var(--line)] px-3 py-2.5 focus:outline-none focus:border-[var(--ink)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Telefon</label>
              <input
                required name="phone" value={form.phone} onChange={handleChange}
                placeholder="05XXXXXXXXX"
                className="w-full border border-[var(--line)] px-3 py-2.5 focus:outline-none focus:border-[var(--ink)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">TC Kimlik No</label>
            <input
              required name="identityNumber" value={form.identityNumber} onChange={handleChange}
              maxLength={11}
              className="w-full border border-[var(--line)] px-3 py-2.5 focus:outline-none focus:border-[var(--ink)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Adres</label>
            <textarea
              required name="address" value={form.address} onChange={handleChange}
              rows={3}
              className="w-full border border-[var(--line)] px-3 py-2.5 focus:outline-none focus:border-[var(--ink)] resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Şehir</label>
              <select
                name="city" value={form.city} onChange={handleChange}
                className="w-full border border-[var(--line)] px-3 py-2.5 focus:outline-none focus:border-[var(--ink)]"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Posta Kodu</label>
              <input
                required name="zip" value={form.zip} onChange={handleChange}
                className="w-full border border-[var(--line)] px-3 py-2.5 focus:outline-none focus:border-[var(--ink)]"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit" disabled={loading || cardReady === false}
            className="flex items-center justify-center gap-2 bg-[var(--ink)] text-[var(--paper)] py-4 font-display tag-stencil text-sm hover:bg-[var(--safety-orange)] transition-colors disabled:opacity-50"
          >
            <Lock size={16} />
            {loading ? "Yönlendiriliyor..." : "iyzico ile Güvenli Ödemeye Geç"}
            {!loading && <ArrowRight size={18} />}
          </button>
                    {cardReady === false && (
            <a
              href={`https://wa.me/905076584245?text=${waText}`}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "#fff", padding: "14px", borderRadius: 8, fontSize: 15, fontWeight: 800, textDecoration: "none", marginTop: 10 }}
            >
              💬 Siparişi WhatsApp&apos;tan Tamamla
            </a>
          )}
          {cardReady === false && (
            <p style={{ fontSize: 12.5, color: "var(--text-tertiary)", textAlign: "center", marginTop: 8 }}>
              Kartla ödeme çok yakında aktif olacak. Şimdilik siparişinizi WhatsApp üzerinden anında tamamlayabilirsiniz — sepetiniz mesaja otomatik eklenir.
            </p>
          )}
          <p className="text-xs text-[var(--ink-soft)] text-center">
            Kart bilgileriniz CV Sepeti sunucularında saklanmaz, doğrudan iyzico
            güvenli ödeme altyapısına iletilir.
          </p>
        </form>

        <div className="border border-[var(--line)] bg-white p-6 h-fit sticky top-24">
          <h2 className="font-display tag-stencil text-sm mb-4">Sipariş Özeti</h2>
          <div className="flex flex-col gap-2 mb-4 text-sm">
            {items.map((i) => (
              <div key={i.slug} className="flex justify-between">
                <span className="line-clamp-1 pr-2">{i.name} × {i.qty}</span>
                <span className="shrink-0">{formatPrice(i.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="hazard-stripe-thin mb-4" />
          <div className="flex justify-between font-display text-xl font-bold mb-2">
            <span>Toplam</span>
            <span className="text-[var(--safety-orange-dark)]">{formatPrice(total())}</span>
          </div>
          <Link href="/sepet" className="text-sm text-[var(--ink-soft)] hover:text-[var(--safety-orange)]">
            Sepete dön
          </Link>
        </div>
      </div>
    </main>
  );
}
