import { NextResponse, type NextRequest } from "next/server";
import { readJSON, appendJSONL } from "./lib/store";

interface StoredSession {
  token: string;
  userId: string;
  expiresAt: string;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Analytics: log page views for non-API, non-static routes
  if (
    !pathname.startsWith("/api/") &&
    !pathname.startsWith("/_next/") &&
    !pathname.includes(".")
  ) {
    appendJSONL("events.jsonl", {
      event: "pageview",
      distinctId: request.headers.get("x-forwarded-for") || "anonymous",
      properties: {
        path: pathname,
        userAgent: request.headers.get("user-agent") || "",
      },
      timestamp: new Date().toISOString(),
    }).catch(() => {});
  }

  // Protect dashboard and admin routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    const token = request.cookies.get("uncle_session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const sessions = await readJSON<StoredSession>("sessions.json");
    const session = sessions.find(
      (s) => s.token === token && new Date(s.expiresAt) > new Date()
    );

    if (!session) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("uncle_session");
      return response;
    }

    // Admin route requires admin user
    if (pathname.startsWith("/admin")) {
      const { readJSON: readUsers } = await import("./lib/store");
      const users = await readUsers<{
        id: string;
        isAdmin?: boolean;
      }>("users.json");
      const user = users.find((u) => u.id === session.userId);
      if (!user?.isAdmin) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/|_next/|favicon.ico|.*\\..*).*)"],
};
