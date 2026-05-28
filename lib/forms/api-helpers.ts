import { NextResponse } from "next/server";

/** Django returns success even for bots / invalid data — do not leak validation to clients. */
export function fakeSuccess() {
  return NextResponse.json({ ok: true });
}

export function successWithRedirect(redirect = "/success") {
  return NextResponse.json({ ok: true, redirect });
}

export function getPageUrl(request: Request): string {
  return request.headers.get("referer") ?? "";
}

export async function verifyRecaptcha(token: string | null): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body,
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}
