import { NextRequest, NextResponse } from "next/server";
import { iyzicoRequest } from "@/lib/iyzico";

export async function POST(req: NextRequest) {
  const origin = req.nextUrl.origin;
  try {
    const formData = await req.formData();
    const token = formData.get("token") as string;

    if (!token) {
      return NextResponse.redirect(`${origin}/odeme-sonuc?status=failure`, 303);
    }

    const result = await iyzicoRequest<{
      status?: string;
      paymentStatus?: string;
      conversationId?: string;
    }>("/payment/iyzipos/checkoutform/auth/ecom/detail", {
      locale: "tr",
      token,
    });

    if (result?.status === "success" && result?.paymentStatus === "SUCCESS") {
      return NextResponse.redirect(
        `${origin}/odeme-sonuc?status=success&ref=${result.conversationId || ""}`,
        303
      );
    }
    return NextResponse.redirect(`${origin}/odeme-sonuc?status=failure`, 303);
  } catch {
    return NextResponse.redirect(`${origin}/odeme-sonuc?status=failure`, 303);
  }
}
