import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./lib/supabase/server";

export async function middleware(req: NextRequest) {
  // response
  const res = NextResponse.next({ headers: req.headers });

  // pathname
  const pathname = req.nextUrl.pathname;

  // create server client
  const supabase = await createClient();

  // session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const protectedRoutes = ["/my-account"];
  const authRoutes = ["/login", "/register", "forgot-password"];

  // if route is protected route and user not logged in
  if (protectedRoutes.find((i) => pathname.startsWith(i)) && !session) {
    const loginURL = new URL("/login", req.url);
    return NextResponse.redirect(loginURL);
  }

  // if route is auth route and user logged in
  if (authRoutes.find((i) => pathname.startsWith(i)) && session) {
    const accountURL = new URL("/my-account", req.url);
    return NextResponse.redirect(accountURL);
  }

  return res;
}

export const config = {
  matcher: ["/my-account/:path*", "/login", "/register"],
};
