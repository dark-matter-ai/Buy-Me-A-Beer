// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const authPages = ["/login", "/signup"];
  const isAuthPage = authPages.includes(request.nextUrl.pathname);

  const token = request.cookies.get("authToken");

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/profile", "/profile/:path*"],
};
