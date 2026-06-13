import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error - iyzipay has no types
import Iyzipay from "iyzipay";

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY || "sandbox-api-key",
  secretKey: process.env.IYZICO_SECRET_KEY || "sandbox-secret-key",
  uri:
    process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com",
});

type CartItem = {
  slug: string;
  name: string;
  price: number;
  qty: number;
};

type CheckoutBody = {
  items: CartItem[];
  total: number;
  buyer: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    identityNumber: string;
  };
};

export async function POST(req: NextRequest) {
  const body: CheckoutBody = await req.json();
  const { items, total, buyer } = body;

  if (!items?.length || !buyer?.email) {
    return NextResponse.json(
      { status: "error", message: "Geçersiz sipariş bilgisi" },
      { status: 400 }
    );
  }

  const conversationId = `cv-${Date.now()}`;
  const origin = req.nextUrl.origin;

  const basketItems = items.map((item) => ({
    id: item.slug,
    name: item.name,
    category1: "CV Sepeti Ürünleri",
    itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
    price: (item.price * item.qty).toFixed(2),
  }));

  const request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId,
    price: total.toFixed(2),
    basketId: conversationId,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: `${origin}/api/iyzico/callback`,
    enabledInstallments: [2, 3, 6, 9],
    buyer: {
      id: `buyer-${Date.now()}`,
      name: buyer.name,
      surname: buyer.surname,
      gsmNumber: buyer.phone,
      email: buyer.email,
      identityNumber: buyer.identityNumber || "11111111111",
      lastLoginDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      registrationDate: new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      registrationAddress: buyer.address,
      ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
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
  };

  return new Promise<NextResponse>((resolve) => {
    iyzipay.checkoutFormInitialize.create(
      request,
      (err: unknown, result: { status?: string; checkoutFormContent?: string; errorMessage?: string; token?: string }) => {
        if (err) {
          resolve(
            NextResponse.json(
              { status: "error", message: String(err) },
              { status: 500 }
            )
          );
          return;
        }
        if (result?.status !== "success") {
          resolve(
            NextResponse.json(
              { status: "error", message: result?.errorMessage || "Ödeme başlatılamadı" },
              { status: 400 }
            )
          );
          return;
        }
        resolve(
          NextResponse.json({
            status: "success",
            checkoutFormContent: result.checkoutFormContent,
            token: result.token,
          })
        );
      }
    );
  });
}
