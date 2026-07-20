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
      setError("Sunucuya ulaşılamadı, lütfen tekrar deneyin.");
    }
    setLoading(false);
  };

  if (showForm) {
    return (
      <main style={{ padding: "32px 0 60px" }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Güvenli Ödeme</h1>
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: 20, boxShadow: "var(--shadow-sm)" }}>
            <div id="iyzico-form-container" />
          </div>
        </div>
      </main>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#fff",
    border: "1.5px solid var(--border)",
    borderRadius: 8,
    padding: "12px 14px",
    fontSize: 15,
    color: "var(--text)",
    outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 700,
    color: "var(--text)",
    marginBottom: 6,
  };
  const fieldStyle: React.CSSProperties = { marginBottom: 16 };

  return (
    <main style={{ padding: "28px 0 60px" }}>
      <div className="container">
        <h1 style={{ fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 800, marginBottom: 22 }}>Ödeme Bilgileri</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, alignItems: "start" }} className="checkout-grid">
          {/* Form kartı */}
          <form onSubmit={handleSubmit} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "22px 20px", boxShadow: "var(--shadow-sm)", minWidth: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="form-2col">
              <div style={fieldStyle}>
                <label style={labelStyle}>Ad</label>
                <input required name="name" value={form.name} onChange={handleChange} style={inputStyle} autoComplete="given-name" />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Soyad</label>
                <input required name="surname" value={form.surname} onChange={handleChange} style={inputStyle} autoComplete="family-name" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="form-2col">
              <div style={fieldStyle}>
                <label style={labelStyle}>E-posta</label>
                <input required type="email" name="email" value={form.email} onChange={handleChange} style={inputStyle} autoComplete="email" inputMode="email" />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Telefon</label>
                <input required name="phone" value={form.phone} onChange={handleChange} placeholder="05XX XXX XX XX" style={inputStyle} autoComplete="tel" inputMode="tel" />
              </div>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>TC Kimlik No</label>
              <input required name="identityNumber" value={form.identityNumber} onChange={handleChange} maxLength={11} style={inputStyle} inputMode="numeric" />
              <p style={{ fontSize: 11.5, color: "var(--text-tertiary)", marginTop: 5 }}>Fatura düzenlemesi için gereklidir, güvenle saklanır.</p>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Teslimat Adresi</label>
              <textarea required name="address" value={form.address} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: "none", fontFamily: "inherit" }} autoComplete="street-address" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="form-2col">
              <div style={fieldStyle}>
                <label style={labelStyle}>Şehir</label>
                <select name="city" value={form.city} onChange={handleChange} style={{ ...inputStyle, appearance: "auto" }}>
                  {cities.map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Posta Kodu</label>
                <input required name="zip" value={form.zip} onChange={handleChange} style={inputStyle} inputMode="numeric" autoComplete="postal-code" />
              </div>
            </div>

            {error && (
              <p style={{ fontSize: 13.5, color: "#b91c1c", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 12px", marginBottom: 14 }}>
                {error}
              </p>
            )}

            {(
              <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", padding: "15px", fontSize: 15, gap: 8, opacity: loading ? 0.6 : 1 }}>
                <Lock size={16} />
                {loading ? "Yönlendiriliyor..." : "iyzico ile Güvenli Ödemeye Geç"}
                {!loading && <ArrowRight size={17} />}
              </button>
            )}


            <p style={{ fontSize: 12, color: "var(--text-tertiary)", textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
              🔒 Kart bilgileriniz CV Sepeti sunucularında saklanmaz, doğrudan iyzico güvencesiyle işlenir.
            </p>
          </form>

          {/* Sipariş özeti */}
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: 20, boxShadow: "var(--shadow-sm)", position: "sticky", top: 130 }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
              Sipariş Özeti ({items.reduce((s, i) => s + i.qty, 0)} ürün)
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
              {items.map((i) => (
                <div key={i.slug} style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 13 }}>
                  <span style={{ color: "var(--text-secondary)", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {i.qty}x {i.name}
                  </span>
                  <span style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{formatPrice(i.price * i.qty)}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "var(--text-secondary)", paddingTop: 12, borderTop: "1px solid var(--border)", marginBottom: 6 }}>
              <span>Kargo</span><span style={{ color: "var(--green)", fontWeight: 700 }}>Sipariş sonrası bildirilecek</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 800, marginTop: 8 }}>
              <span>Toplam</span><span style={{ color: "var(--orange)" }}>{formatPrice(total())}</span>
            </div>
            <Link href="/sepet" style={{ display: "flex", justifyContent: "center", marginTop: 14, fontSize: 13, color: "var(--text-tertiary)", textDecoration: "none" }}>
              ← Sepete Dön
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
          .checkout-grid > div:last-child { position: static !important; }
        }
        @media (max-width: 480px) {
          .form-2col { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
        .checkout-grid input:focus, .checkout-grid textarea:focus, .checkout-grid select:focus {
          border-color: var(--orange) !important;
        }
      `}</style>
    </main>
  );
}
