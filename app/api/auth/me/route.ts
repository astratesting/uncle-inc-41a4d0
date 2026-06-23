import { NextResponse } from "next/server";
import { getSessionUser, getUsers } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const users = await getUsers();
  const verifiedCount = users.filter((u) => u.emailVerified).length;

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      isAdmin: user.isAdmin || false,
    },
    stats: {
      totalSignups: verifiedCount,
    },
  });
}
