import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./types/supabase"; // optional type

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Hvis ikke innlogget → redirect til login
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Sjekk profil
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("user_id", session.user.id)
    .single();

  // Hvis ikke admin → redirect til forsiden
  if (!profile?.is_admin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin"], // kun beskytte /admin
};
