import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error - iyzipay has no types
import Iyzipay from "iyzipay";

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY || "sandbox-api-key",
  secretKey: process.env.IYZICO_SECRET_KEY || "sandbox-secret-key",
  uri: process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com",
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const token = formData.get("token") as string;
  const origin = req.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(`${origin}/odeme-sonuc?status=failure`);
  }

  return new Promise<NextResponse>((resolve) => {
    iyzipay.checkoutForm.retrieve(
      { locale: Iyzipay.LOCALE.TR, token },
      (err: unknown, result: { status?: string; paymentStatus?: string; conversationId?: string }) => {
        if (err || result?.status !== "success" || result?.paymentStatus !== "SUCCESS") {
          resolve(
            NextResponse.redirect(`${origin}/odeme-sonuc?status=failure`)
          );
          return;
        }
        resolve(
          NextResponse.redirect(
            `${origin}/odeme-sonuc?status=success&ref=${result.conversationId}`
          )
        );
      }
    );
  });
}
