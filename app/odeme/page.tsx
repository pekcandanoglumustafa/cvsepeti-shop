"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock, ArrowRight, Check, AlertCircle, Truck, Building2, User } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

const CITIES = ["Adana","Adıyaman","Afyonkarahisar","Ağrı","Aksaray","Amasya","Ankara","Antalya","Ardahan","Artvin","Aydın","Balıkesir","Bartın","Batman","Bayburt","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Düzce","Edirne","Elazığ","Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Iğdır","Isparta","İstanbul","İzmir","Kahramanmaraş","Karabük","Karaman","Kars","Kastamonu","Kayseri","Kilis","Kırıkkale","Kırklareli","Kırşehir","Kocaeli","Konya","Kütahya","Malatya","Manisa","Mardin","Mersin","Muğla","Muş","Nevşehir","Niğde","Ordu","Osmaniye","Rize","Sakarya","Samsun","Şanlıurfa","Siirt","Sinop","Şırnak","Sivas","Tekirdağ","Tokat","Trabzon","Tunceli","Uşak","Van","Yalova","Yozgat","Zonguldak"];

type FaturaTipi = "bireysel" | "kurumsal";
type KargoOdeme = "pesin" | "karsi";

export default function Odeme() {
  const { items, total, totalKdv, kdvTutar, kargoDesi, kargo } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [faturaTipi, setFaturaTipi] = useState<FaturaTipi>("bireysel");
  const [kargoOdeme, setKargoOdeme] = useState<KargoOdeme>("pesin");

  const [f, setF] = useState({
    name: "", surname: "", email: "", phone: "", identityNumber: "",
    address: "", city: "Konya", zip: "", note: "",
    firma: "", vergiDairesi: "", vergiNo: "",
  });

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (mounted && items.length === 0 && !showForm) router.push("/sepet");
  }, [mounted, items, showForm, router]);

  const desi = kargoDesi();
  const kargoTutar = kargo();
  const kargoOdenecek = kargoOdeme === "pesin" ? kargoTutar : 0;
  const toplam = totalKdv() + kargoOdenecek;

  const hatalar = useMemo(() => {
    const h: Record<string, string> = {};
    if (!f.name.trim()) h.name = "Ad gerekli";
    if (!f.surname.trim()) h.surname = "Soyad gerekli";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) h.email = "Geçerli e-posta girin";
    const tel = f.phone.replace(/\D/g, "");
    if (tel.length < 10) h.phone = "Telefon eksik";
    if (f.address.trim().length < 15) h.address = "Adresi tam yazın (en az 15 karakter)";
    if (faturaTipi === "bireysel") {
      if (!/^\d{11}$/.test(f.identityNumber)) h.identityNumber = "TC kimlik no 11 haneli olmalı";
    } else {
      if (!f.firma.trim()) h.firma = "Firma unvanı gerekli";
      if (!f.vergiDairesi.trim()) h.vergiDairesi = "Vergi dairesi gerekli";
      if (!/^\d{10,11}$/.test(f.vergiNo)) h.vergiNo = "Vergi no 10 haneli olmalı";
    }
    return h;
  }, [f, faturaTipi]);

  const gecerli = Object.keys(hatalar).length === 0;

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [e.target.name]: e.target.value }));
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setTouched((t) => ({ ...t, [e.target.name]: true }));

  async function gonder(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setTouched(Object.fromEntries(Object.keys(f).map((k) => [k, true])));
    if (!gecerli) {
      setError("Lütfen işaretli alanları düzeltin.");
      document.querySelector('[data-hata="1"]')?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/iyzico/checkout-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
          kargoOdeme,
          buyer: {
            name: f.name.trim(), surname: f.surname.trim(), email: f.email.trim(),
            phone: f.phone.replace(/\D/g, ""), address: f.address.trim(),
            city: f.city, zip: f.zip.trim(), note: f.note.trim(),
            faturaTipi,
            identityNumber: faturaTipi === "bireysel" ? f.identityNumber : f.vergiNo,
            firma: f.firma.trim(), vergiDairesi: f.vergiDairesi.trim(), vergiNo: f.vergiNo.trim(),
          },
        }),
      });
      const d = await res.json();
      if (d.status !== "success") { setError(d.message || "Ödeme başlatılamadı."); setLoading(false); return; }
      if (!d.checkoutFormContent) { setError("Ödeme formu alınamadı. Lütfen tekrar deneyin."); setLoading(false); return; }
      setShowForm(true);
      setTimeout(() => {
        const host = document.getElementById("iyzipay-checkout-form");
        if (!host) return;
        host.innerHTML = d.checkoutFormContent;
        host.querySelectorAll("script").forEach((o) => {
          const s = document.createElement("script");
          Array.from(o.attributes).forEach((a) => s.setAttribute(a.name, a.value));
          s.text = o.text; o.parentNode?.replaceChild(s, o);
        });
      }, 60);
    } catch {
      setError("Sunucuya ulaşılamadı. Bağlantınızı kontrol edip tekrar deneyin.");
    }
    setLoading(false);
  }

  if (!mounted) return <main style={{ minHeight: 500 }} />;

  if (showForm)
    return (
      <main style={{ maxWidth: 860, margin: "0 auto", padding: "32px 16px 80px" }}>
        <button type="button" onClick={() => { setShowForm(false); setLoading(false); }}
                className="eyebrow"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: 0 }}>
          ← Bilgileri düzenle
        </button>

        <h1 className="display" style={{ fontSize: "clamp(28px,5vw,42px)", margin: "14px 0 6px" }}>
          Güvenli ödeme
        </h1>
        <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 8 }}>
          {items.reduce((s, i) => s + i.qty, 0)} ürün · Ödenecek tutar{" "}
          <strong style={{ color: "var(--hi)" }}>{formatPrice(toplam)}</strong>
          {kargoOdeme === "karsi" && desi > 0 && " · Kargo kuryeye ödenecek"}
        </p>
        <div className="band-thin" style={{ marginBottom: 22 }} />

        <div style={{ border: "2px solid var(--ink)", padding: 16, minHeight: 420 }}>
          <div id="iyzipay-checkout-form" className="responsive" />
        </div>

        <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", marginTop: 16, lineHeight: 1.7 }}>
          <Lock size={12} style={{ display: "inline", verticalAlign: "-1px" }} /> Kart bilgileriniz
          CV Sepeti sunucularında saklanmaz, doğrudan iyzico altyapısında işlenir.
        </p>
      </main>
    );

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 20px 80px" }}>
      <Link href="/sepet" className="eyebrow" style={{ color: "var(--muted)", textDecoration: "none" }}>← Sepete dön</Link>
      <h1 className="display" style={{ fontSize: "clamp(32px,6vw,60px)", margin: "14px 0 32px" }}>Ödeme</h1>

      <form onSubmit={gonder} className="od-grid"
            style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 380px", gap: 44, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 36, minWidth: 0 }}>

          {/* 1 — FATURA TİPİ */}
          <Bolum no="1" baslik="Fatura tipi">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Secim aktif={faturaTipi === "bireysel"} onClick={() => setFaturaTipi("bireysel")}
                     ikon={<User size={18} />} baslik="Bireysel" alt="TC kimlik ile" />
              <Secim aktif={faturaTipi === "kurumsal"} onClick={() => setFaturaTipi("kurumsal")}
                     ikon={<Building2 size={18} />} baslik="Kurumsal" alt="Vergi no ile" />
            </div>
          </Bolum>

          {/* 2 — İLETİŞİM */}
          <Bolum no="2" baslik="İletişim bilgileri">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="ikili">
              <Alan ad="name" etiket="Ad" deger={f.name} set={set} blur={blur} hata={touched.name ? hatalar.name : ""} otomatik="given-name" />
              <Alan ad="surname" etiket="Soyad" deger={f.surname} set={set} blur={blur} hata={touched.surname ? hatalar.surname : ""} otomatik="family-name" />
              <Alan ad="email" etiket="E-posta" tip="email" deger={f.email} set={set} blur={blur} hata={touched.email ? hatalar.email : ""} otomatik="email" ipucu="Sipariş bilgisi buraya gönderilir" />
              <Alan ad="phone" etiket="Telefon" tip="tel" deger={f.phone} set={set} blur={blur} hata={touched.phone ? hatalar.phone : ""} yer="05XX XXX XX XX" otomatik="tel" />
            </div>
          </Bolum>

          {/* 3 — FATURA BİLGİSİ */}
          <Bolum no="3" baslik={faturaTipi === "bireysel" ? "Fatura bilgisi" : "Firma bilgileri"}>
            {faturaTipi === "bireysel" ? (
              <Alan ad="identityNumber" etiket="TC Kimlik No" deger={f.identityNumber} set={set} blur={blur}
                    hata={touched.identityNumber ? hatalar.identityNumber : ""} yer="11 haneli"
                    ipucu="Fatura düzenlemek için zorunlu. Güvenle saklanır, üçüncü kişilerle paylaşılmaz." />
            ) : (
              <div style={{ display: "grid", gap: 16 }}>
                <Alan ad="firma" etiket="Firma unvanı" deger={f.firma} set={set} blur={blur} hata={touched.firma ? hatalar.firma : ""} otomatik="organization" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="ikili">
                  <Alan ad="vergiDairesi" etiket="Vergi dairesi" deger={f.vergiDairesi} set={set} blur={blur} hata={touched.vergiDairesi ? hatalar.vergiDairesi : ""} />
                  <Alan ad="vergiNo" etiket="Vergi no" deger={f.vergiNo} set={set} blur={blur} hata={touched.vergiNo ? hatalar.vergiNo : ""} yer="10 haneli" />
                </div>
              </div>
            )}
          </Bolum>

          {/* 4 — TESLİMAT */}
          <Bolum no="4" baslik="Teslimat adresi">
            <div style={{ display: "grid", gap: 16 }}>
              <Alan ad="address" etiket="Açık adres" cokSatir deger={f.address} set={set} blur={blur}
                    hata={touched.address ? hatalar.address : ""} otomatik="street-address"
                    yer="Mahalle, cadde, sokak, bina ve daire no" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="ikili">
                <div>
                  <label className="label" style={{ display: "block", marginBottom: 7 }}>Şehir</label>
                  <select name="city" value={f.city} onChange={set} style={inp}>
                    {CITIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <Alan ad="zip" etiket="Posta kodu" deger={f.zip} set={set} blur={blur} yer="opsiyonel" otomatik="postal-code" />
              </div>
              <Alan ad="note" etiket="Sipariş notu" cokSatir deger={f.note} set={set} blur={blur} yer="opsiyonel — teslimat için özel not" />
            </div>
          </Bolum>

          {/* 5 — KARGO ÖDEME */}
          <Bolum no="5" baslik="Kargo ödemesi">
            <div style={{ display: "grid", gap: 12 }}>
              <Secim genis aktif={kargoOdeme === "pesin"} onClick={() => setKargoOdeme("pesin")}
                     ikon={<Truck size={18} />} baslik="Şimdi öde"
                     alt={desi > 0 ? `${desi} desi · ${formatPrice(kargoTutar)} — sipariş toplamına eklenir` : "Bu siparişte kargo ücreti yok"} />
              <Secim genis aktif={kargoOdeme === "karsi"} onClick={() => setKargoOdeme("karsi")}
                     ikon={<Truck size={18} />} baslik="Karşı ödemeli"
                     alt="Kargoyu teslim alırken kuryeye ödersiniz. Tutar Yurtiçi Kargo tarifesine göre belirlenir." />
            </div>
          </Bolum>

          {error && (
            <div role="alert" style={{ display: "flex", gap: 10, padding: 14, border: "2px solid #C4271A", background: "#FFF3F1" }}>
              <AlertCircle size={18} color="#C4271A" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 14, color: "#C4271A", fontWeight: 600 }}>{error}</p>
            </div>
          )}

          <button type="submit" className="btn btn-solid" disabled={loading}
                  style={{ width: "100%", padding: "20px 28px", fontSize: 15 }}>
            {loading ? "Hazırlanıyor…" : <><Lock size={17} /> iyzico ile güvenli ödemeye geç <ArrowRight size={17} /></>}
          </button>

          <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", lineHeight: 1.7 }}>
            Kart bilgileriniz CV Sepeti sunucularında saklanmaz, doğrudan iyzico altyapısında işlenir.
          </p>
        </div>

        {/* ÖZET */}
        <aside className="od-ozet" style={{ border: "2px solid var(--ink)", position: "sticky", top: 88 }}>
          <div style={{ padding: "20px 20px 0" }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Sipariş özeti</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxHeight: 280, overflowY: "auto" }}>
              {items.map((i) => (
                <div key={i.slug} style={{ display: "flex", gap: 12 }}>
                  <div style={{ width: 52, height: 52, background: "var(--tile)", position: "relative", flexShrink: 0 }}>
                    {i.image && <Image src={i.image} alt="" fill unoptimized style={{ objectFit: "contain", padding: 5 }} />}
                    <span style={{ position: "absolute", top: -7, right: -7, background: "var(--ink)", color: "#fff",
                                   width: 19, height: 19, borderRadius: 10, fontSize: 11, fontWeight: 800,
                                   display: "grid", placeItems: "center" }}>{i.qty}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.35 }} className="line-clamp-2">{i.name}</p>
                    <p style={{ fontSize: 12.5, fontWeight: 800, marginTop: 3 }}>
                      {formatPrice(i.price * i.qty)} <span style={{ fontSize: 10, color: "var(--muted)", fontWeight: 600 }}>+KDV</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "18px 20px 20px" }}>
            <Satir k="Ara toplam (KDV hariç)" v={formatPrice(total())} />
            <Satir k="KDV %20" v={formatPrice(kdvTutar())} />
            <Satir k={desi > 0 ? `Kargo · ${desi} desi` : "Kargo"}
                   v={kargoOdeme === "karsi" ? "Kuryeye ödenecek" : (desi > 0 ? formatPrice(kargoTutar) : "Ücretsiz")}
                   vurgu={kargoOdeme === "karsi"} />
            <div className="band-thin" style={{ margin: "13px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="label">Şimdi ödenecek</span>
              <span className="display" style={{ fontSize: 27, color: "var(--hi)" }}>{formatPrice(toplam)}</span>
            </div>
            {kargoOdeme === "karsi" && desi > 0 && (
              <p style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 9, lineHeight: 1.6 }}>
                Kargo bedeli teslimatta kuryeye ödenir, bu tutara dahil değildir.
              </p>
            )}
          </div>
        </aside>
      </form>

      <style>{`
        @media (max-width: 940px){
          .od-grid{grid-template-columns:1fr!important;gap:30px!important}
          .od-ozet{position:static!important;order:-1}
        }
        @media (max-width: 560px){ .ikili{grid-template-columns:1fr!important} }
      `}</style>
    </main>
  );
}

const inp: React.CSSProperties = {
  width: "100%", background: "#fff", border: "2px solid var(--line)",
  padding: "14px 15px", fontSize: 15, color: "var(--ink)", outline: "none",
  fontFamily: "inherit", borderRadius: 0,
};

function Bolum({ no, baslik, children }: { no: string; baslik: string; children: React.ReactNode }) {
  return (
    <section>
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
        <span style={{ width: 26, height: 26, background: "var(--ink)", color: "#fff", fontSize: 12,
                       fontWeight: 900, display: "grid", placeItems: "center", flexShrink: 0 }}>{no}</span>
        <h2 className="display" style={{ fontSize: 19 }}>{baslik}</h2>
      </div>
      {children}
    </section>
  );
}

function Secim({ aktif, onClick, ikon, baslik, alt, genis }: {
  aktif: boolean; onClick: () => void; ikon: React.ReactNode; baslik: string; alt: string; genis?: boolean;
}) {
  return (
    <button type="button" onClick={onClick} aria-pressed={aktif}
      style={{ display: "flex", alignItems: "flex-start", gap: 12, textAlign: "left", cursor: "pointer",
               border: aktif ? "2px solid var(--ink)" : "2px solid var(--line)",
               background: aktif ? "var(--tile)" : "#fff", padding: genis ? "16px 18px" : "16px 14px",
               width: "100%", transition: "border-color .15s, background .15s" }}>
      <span style={{ marginTop: 1, color: aktif ? "var(--ink)" : "var(--muted)" }}>{ikon}</span>
      <span style={{ flex: 1 }}>
        <span style={{ display: "block", fontWeight: 800, fontSize: 14 }}>{baslik}</span>
        <span style={{ display: "block", fontSize: 12.5, color: "var(--muted)", marginTop: 3, lineHeight: 1.5 }}>{alt}</span>
      </span>
      {aktif && <Check size={17} strokeWidth={3} />}
    </button>
  );
}

function Alan({ ad, etiket, deger, set, blur, hata, tip = "text", yer, ipucu, cokSatir, otomatik }: {
  ad: string; etiket: string; deger: string;
  set: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  blur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  hata?: string; tip?: string; yer?: string; ipucu?: string; cokSatir?: boolean; otomatik?: string;
}) {
  const stil = { ...inp, borderColor: hata ? "#C4271A" : "var(--line)" };
  return (
    <div data-hata={hata ? "1" : undefined}>
      <label htmlFor={ad} className="label" style={{ display: "block", marginBottom: 7 }}>{etiket}</label>
      {cokSatir ? (
        <textarea id={ad} name={ad} value={deger} onChange={set} onBlur={blur} rows={3}
                  placeholder={yer} autoComplete={otomatik} style={{ ...stil, resize: "vertical" }}
                  aria-invalid={!!hata} aria-describedby={hata ? `${ad}-hata` : undefined} />
      ) : (
        <input id={ad} name={ad} type={tip} value={deger} onChange={set} onBlur={blur}
               placeholder={yer} autoComplete={otomatik} style={stil}
               aria-invalid={!!hata} aria-describedby={hata ? `${ad}-hata` : undefined} />
      )}
      {hata ? (
        <p id={`${ad}-hata`} style={{ fontSize: 12, color: "#C4271A", marginTop: 6, fontWeight: 600 }}>{hata}</p>
      ) : ipucu ? (
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>{ipucu}</p>
      ) : null}
    </div>
  );
}

function Satir({ k, v, vurgu }: { k: string; v: string; vurgu?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "7px 0", fontSize: 14 }}>
      <span style={{ color: "var(--muted)" }}>{k}</span>
      <span style={{ fontWeight: 700, color: vurgu ? "var(--hi)" : "var(--ink)", textAlign: "right" }}>{v}</span>
    </div>
  );
}
