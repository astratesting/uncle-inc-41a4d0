import { NextResponse } from "next/server";
import { getSessionUser, getUsers } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const users = await getUsers();
  const verified = users.filter((u) => u.emailVerified).length;
  const total = users.length;

  return NextResponse.json({ total, verified });
}
