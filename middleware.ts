import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secure-secret-change-in-production";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Stripe webhook to pass through without CSP restrictions
  if (pathname.startsWith("/api/stripe-webhook")) {
    const response = NextResponse.next();
    response.headers.delete("Content-Security-Policy");
    return response;
  }

  // Allow Stripe checkout APIs to pass through without CSP restrictions
  if (pathname.startsWith("/api/create-checkout-session")) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    // Skip login page
    if (pathname === "/admin" || pathname.startsWith("/admin/login")) {
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

  // Apply security headers to all other requests
  const response = NextResponse.next();

  // Modern security headers for Next.js 15
  const securityHeaders = {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff", 
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy": [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://checkout.stripe.com https://*.stripe.com",
      "connect-src 'self' https://vrsaehlthpojsdgwaxtk.supabase.co https://api.stripe.com https://checkout.stripe.com https://*.stripe.com wss://*.supabase.co",
      "frame-src 'self' https://www.google.com https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com https://*.stripe.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "form-action 'self' https://*.stripe.com",
    ].join("; ")
  };

  // Set all headers at once
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/stripe-webhook",
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
