import crypto from "crypto";

const API_KEY = process.env.IYZICO_API_KEY || "";
const SECRET_KEY = process.env.IYZICO_SECRET_KEY || "";
const BASE_URL = process.env.IYZICO_BASE_URL || "https://api.iyzipay.com";

export function iyzicoConfigured() {
  return !!API_KEY && !!SECRET_KEY;
}

/**
 * iyzico REST API çağrısı — IYZWSv2 imzalı, SDK'sız.
 * signature = HMAC-SHA256(secretKey, randomKey + uriPath + body)
 */
export async function iyzicoRequest<T = Record<string, unknown>>(
  uriPath: string,
  payload: Record<string, unknown>
): Promise<T> {
  const body = JSON.stringify(payload);
  const randomKey = Date.now().toString() + Math.random().toString(36).slice(2, 10);

  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(randomKey + uriPath + body)
    .digest("hex");

  const authString = `apiKey:${API_KEY}&randomKey:${randomKey}&signature:${signature}`;
  const authorization = "IYZWSv2 " + Buffer.from(authString).toString("base64");

  const res = await fetch(BASE_URL + uriPath, {
    method: "POST",
    headers: {
      Authorization: authorization,
      "x-iyzi-rnd": randomKey,
      "Content-Type": "application/json",
    },
    body,
    cache: "no-store",
  });

  return (await res.json()) as T;
}
