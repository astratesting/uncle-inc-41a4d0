import { NextResponse } from "next/server";
import { getSessionUser, getUsers } from "@/lib/auth";

export async function GET() {
  const admin = await getSessionUser();
  if (!admin || !admin.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const users = await getUsers();
  const allUsers = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    emailVerified: u.emailVerified,
    createdAt: u.createdAt,
  }));

  return NextResponse.json({
    users: allUsers,
    count: allUsers.length,
    verifiedCount: allUsers.filter((u) => u.emailVerified).length,
  });
}
