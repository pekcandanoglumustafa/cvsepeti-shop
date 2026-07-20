import { NextRequest, NextResponse } from "next/server";
import { iyzicoConfigured, iyzicoRequest } from "@/lib/iyzico";

type CartItem = { slug: string; name: string; price: number; qty: number };
type CheckoutBody = {
  items: CartItem[];
  buyer: {
    name: string; surname: string; email: string; phone: string;
    address: string; city: string; zip: string; identityNumber: string;
  };
};

export async function GET() {
  return NextResponse.json({ configured: iyzicoConfigured() });
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();
    const { items, buyer } = body;

    if (!items?.length || !buyer?.email) {
      return NextResponse.json(
        { status: "error", message: "Geçersiz sipariş bilgisi" },
        { status: 400 }
      );
    }
    if (!iyzicoConfigured()) {
      return NextResponse.json(
        { status: "error", message: "Ödeme sistemi yapılandırılmamış" },
        { status: 503 }
      );
    }

    const conversationId = `cv-${Date.now()}`;
    const origin = req.nextUrl.origin;

    const basketItems = items.map((item) => ({
      id: item.slug,
      name: item.name.slice(0, 120),
      category1: "CV Sepeti Ürünleri",
      itemType: "PHYSICAL",
      price: (Math.round(item.price * item.qty * 100) / 100).toFixed(2),
    }));

    const basketTotal = basketItems.reduce(
      (s, b) => s + Math.round(parseFloat(b.price) * 100), 0
    );
    const priceStr = (basketTotal / 100).toFixed(2);

    const clientIp = (req.headers.get("x-forwarded-for") || "85.34.78.112")
      .split(",")[0].trim();

    const now = new Date().toISOString().slice(0, 19).replace("T", " ");

    const result = await iyzicoRequest<{
      status?: string;
      checkoutFormContent?: string;
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
        zipCode: buyer.zip,
      },
      shippingAddress: {
        contactName: `${buyer.name} ${buyer.surname}`,
        city: buyer.city,
        country: "Turkey",
        address: buyer.address,
        zipCode: buyer.zip,
      },
      billingAddress: {
        contactName: `${buyer.name} ${buyer.surname}`,
        city: buyer.city,
        country: "Turkey",
        address: buyer.address,
        zipCode: buyer.zip,
      },
      basketItems,
    });

    if (result?.status !== "success") {
      return NextResponse.json(
        {
          status: "error",
          message: result?.errorMessage
            ? `${result.errorMessage}${result.errorCode ? ` (kod: ${result.errorCode})` : ""}`
            : "Ödeme başlatılamadı",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: "success",
      checkoutFormContent: result.checkoutFormContent,
      token: result.token,
    });
  } catch (e) {
    return NextResponse.json(
      { status: "error", message: `Sunucu hatası: ${e instanceof Error ? e.message : "bilinmeyen"}` },
      { status: 500 }
    );
  }
}
