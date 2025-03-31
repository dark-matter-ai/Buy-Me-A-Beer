import { NextResponse } from "next/server";

export function middleware(request) {
  const authPages = ["/login", "/signup"];
  const isAuthPage = authPages.includes(request.nextUrl.pathname);

  const token = request.cookies.get("authToken");

  if (isAuthPage && token) {
    // Instead of redirecting to /profile, let the client-side handle the redirect
    // since we need to fetch the userid from Firebase/Firestore
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/profile/:path*"],
};
