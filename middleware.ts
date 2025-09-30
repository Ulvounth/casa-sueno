import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

// Use jose instead of jsonwebtoken for Edge Runtime compatibility
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secure-secret-change-in-production"
);

// Create the intl middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always", // Always show locale in URL
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Stripe webhook to pass through without CSP restrictions and intl routing
  if (pathname.startsWith("/api/stripe-webhook")) {
    const response = NextResponse.next();
    response.headers.delete("Content-Security-Policy");
    return response;
  }

  // Allow Stripe checkout APIs to pass through without CSP restrictions and intl routing
  if (pathname.startsWith("/api/create-checkout-session")) {
    return NextResponse.next();
  }

  // Skip internationalization for API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Protect admin routes (before intl routing)
  if (pathname.startsWith("/admin") || pathname.match(/^\/(en|nl)\/admin/)) {
    // Skip login page
    if (
      pathname === "/admin" ||
      pathname.startsWith("/admin/login") ||
      pathname.match(/^\/(en|nl)\/admin$/) ||
      pathname.match(/^\/(en|nl)\/admin\/login/)
    ) {
      return NextResponse.next();
    }

    const token = request.cookies.get("admin-token")?.value;

    if (!token) {
      // Redirect to correct locale admin page
      const locale = pathname.match(/^\/(en|nl)/)
        ? pathname.split("/")[1]
        : defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (!payload.admin) {
        const locale = pathname.match(/^\/(en|nl)/)
          ? pathname.split("/")[1]
          : defaultLocale;
        return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
      }
    } catch {
      const locale = pathname.match(/^\/(en|nl)/)
        ? pathname.split("/")[1]
        : defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
    }
  }

  // Apply internationalization
  const intlResponse = intlMiddleware(request);

  // If intl middleware wants to redirect, let it
  if (intlResponse && intlResponse.status !== 200) {
    return intlResponse;
  }

  // Apply security headers to the response
  const response = intlResponse || NextResponse.next();

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
    ].join("; "),
  };

  // Set all headers at once
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

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
     * - logo, images, videos, carousel (public static assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo|images|videos|carousel).*)",
  ],
};
