import { NextResponse, type NextRequest } from "next/server";
import { verifyDemoSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("demo-session")?.value;

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session || !verifyDemoSession(session)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
