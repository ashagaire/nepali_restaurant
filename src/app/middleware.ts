import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_PATHS = ["/admin"]; // paths to protect
const SESSION_COOKIE = "session_id";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Only protect certain paths
  if (!ADMIN_PATHS.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get session cookie
  const sessionId = req.cookies.get(SESSION_COOKIE)?.value;

  if (!sessionId) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    const userRole = session.user.role;

    // Role-based route access
    if (url.pathname.startsWith("/admin/users")) {
      if (userRole !== "SUPER_ADMIN") {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    } else if (url.pathname.startsWith("/admin/menu")) {
      if (!["ADMIN", "SUPER_ADMIN"].includes(userRole)) {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    } else if (url.pathname.startsWith("/admin/features")) {
      if (!["ADMIN", "SUPER_ADMIN"].includes(userRole)) {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware session check failed", err);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

// Apply only to admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
