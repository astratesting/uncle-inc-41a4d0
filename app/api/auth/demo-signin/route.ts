import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createDemoSession } from "@/lib/auth";

// Demo sign-in: sets a signed cookie and redirects to dashboard
export async function GET() {
  const session = createDemoSession();
  const jar = await cookies();
  jar.set("demo-session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  redirect("/dashboard");
}
