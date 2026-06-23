import { NextResponse } from "next/server";
import { getSessionUser, clearSessionCookie } from "@/lib/auth";
import { trackServerEvent } from "@/lib/analytics-server";

export async function POST() {
  const user = await getSessionUser();
  if (user) {
    await trackServerEvent("user_logout", user.email);
  }

  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
