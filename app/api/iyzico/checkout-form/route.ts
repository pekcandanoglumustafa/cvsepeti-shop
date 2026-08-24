import { NextRequest, NextResponse } from "next/server";
import { iyzicoRequest, iyzicoConfigured } from "@/lib/iyzico";
import { toplamDesi, kargoUcreti } from "@/lib/kargo";
import { getProduct } from "@/lib/products";

type GelenSatir = { slug: string; qty: number };

export async function POST(req: NextRequest) {
  try {
    const { items, buyer, kargoOdeme } = (await req.json()) as {
      items: GelenSatir[];
      buyer: Record<string, string>;
      kargoOdeme?: "pesin" | "karsi";
    };

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ status: "error", message: "Sepet boş" }, { status: 400 });
    }
    if (!buyer?.name || !buyer?.surname || !buyer?.email || !buyer?.phone || !buyer?.address || !buyer?.city) {
      return NextResponse.json({ status: "error", message: "Eksik teslimat bilgisi" }, { status: 400 });
    }
    if (!iyzicoConfigured()) {
      return NextResponse.json({ status: "error", message: "Ödeme sistemi yapılandırılmamış" }, { status: 503 });
    }

    // ---- FİYATLAR SUNUCUDAN OKUNUR, istemciye güvenilmez ----
    const satirlar = [];
    for (const g of items) {
      const p = getProduct(g.slug);
      if (!p) {
        return NextResponse.json({ status: "error", message: `Ürün bulunamadı: ${g.slug}` }, { status: 400 });
      }
      const adet = Math.max(1, Math.min(999, Math.floor(Number(g.qty) || 1)));
      satirlar.push({ p, adet });
    }

    const basketItems = satirlar.map(({ p, adet }) => ({
      id: p.slug,
      name: p.name.slice(0, 120),
      category1: p.category.slice(0, 60),
      itemType: "PHYSICAL",
      price: (Math.round(p.price * adet * 100) / 100).toFixed(2),
    }));

    // ---- KARGO da sunucuda hesaplanır ----
    const desi = toplamDesi(satirlar.map(({ p, adet }) => ({ desi: p.desi ?? 1, adet, kategori: p.category })));
    const kargoTutar = kargoUcreti(desi);
    // Karşı ödemeli seçildiyse kargo bedeli sepete eklenmez, kuryeye ödenir.
    const kargo = kargoOdeme === "karsi" ? 0 : kargoTutar;
    if (kargo > 0) {
      basketItems.push({
        id: "kargo",
        name: `Kargo bedeli (${desi} desi)`,
        category1: "Kargo",
        itemType: "PHYSICAL",
        price: kargo.toFixed(2),
      });
    }

    const kurus = basketItems.reduce((s, b) => s + Math.round(parseFloat(b.price) * 100), 0);
    const priceStr = (kurus / 100).toFixed(2);

    const conversationId = `cv-${Date.now()}`;
    const origin = req.nextUrl.origin;
    const clientIp = (req.headers.get("x-forwarded-for") || "85.34.78.112").split(",")[0].trim();
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    const adSoyad = `${buyer.name} ${buyer.surname}`.slice(0, 100);
    const kurumsal = buyer.faturaTipi === "kurumsal";
    const faturaUnvan = (kurumsal && buyer.firma ? buyer.firma : adSoyad).slice(0, 100);
    const faturaAdres = kurumsal && buyer.vergiDairesi
      ? `${buyer.address} | V.D.: ${buyer.vergiDairesi} | V.No: ${buyer.vergiNo || ""}`.slice(0, 250)
      : buyer.address;

    const result = await iyzicoRequest<{
      status?: string;
      checkoutFormContent?: string;
      payWithIyzicoPageUrl?: string;
      token?: string;
      errorMessage?: string;
      errorCode?: string;
    }>("/payment/iyzipos/checkoutform/initialize/auth/ecom", {
      locale: "tr",
      conversationId,
      price: priceStr,
      paidPrice: priceStr,
      currency: "TRY",
      basketId: conversationId,
      paymentGroup: "PRODUCT",
      callbackUrl: `${origin}/api/iyzico/callback`,
      enabledInstallments: [2, 3, 6, 9],
      buyer: {
        id: `buyer-${Date.now()}`,
        name: buyer.name,
        surname: buyer.surname,
        gsmNumber: buyer.phone,
        email: buyer.email,
        identityNumber: buyer.identityNumber || "11111111111",
        lastLoginDate: now,
        registrationDate: now,
        registrationAddress: buyer.address,
        ip: clientIp,
        city: buyer.city,
        country: "Turkey",
        zipCode: buyer.zip || "42000",
      },
      shippingAddress: { contactName: adSoyad, city: buyer.city, country: "Turkey", address: buyer.address, zipCode: buyer.zip || "42000" },
      billingAddress:  { contactName: faturaUnvan, city: buyer.city, country: "Turkey", address: faturaAdres, zipCode: buyer.zip || "42000" },
      basketItems,
    });

    if (result?.status !== "success") {
      return NextResponse.json({
        status: "error",
        message: result?.errorMessage
          ? `${result.errorMessage}${result.errorCode ? ` (kod: ${result.errorCode})` : ""}`
          : "Ödeme başlatılamadı",
      }, { status: 400 });
    }

    return NextResponse.json({
      status: "success",
      // NOT: payWithIyzicoPageUrl "iyzico ile Öde" cüzdan ürününe aittir,
      // standart checkout form ile kullanılamaz. Gömülü form kullanılıyor.
      checkoutFormContent: result.checkoutFormContent,
      token: result.token,
      desi,
      kargo,
      kargoOdeme: kargoOdeme === "karsi" ? "karsi" : "pesin",
      toplam: priceStr,
    });
  } catch (e) {
    return NextResponse.json(
      { status: "error", message: `Sunucu hatası: ${e instanceof Error ? e.message : "bilinmeyen"}` },
      { status: 500 }
    );
  }
}
