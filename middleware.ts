import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secure-secret-change-in-production";

export function middleware(request: NextRequest) {
  // Beskytt admin ruter
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip login siden
    if (
      request.nextUrl.pathname === "/admin" ||
      request.nextUrl.pathname.startsWith("/admin/login")
    ) {
      return NextResponse.next();
    }

    const token = request.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { admin: boolean };
      if (!decoded.admin) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // Security headers for alle sider
  const response = NextResponse.next();

  // Prevent clickjacking
  response.headers.set("X-Frame-Options", "DENY");

  // Prevent MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // XSS Protection
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Referrer Policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Content Security Policy
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://vrsaehlthpojsdgwaxtk.supabase.co; frame-src 'self' https://www.google.com;"
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
