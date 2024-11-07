import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parse } from "cookie";

export function middleware(req: NextRequest) {
  const cookies = parse(req.headers.get("cookie") || "");
  const user = cookies.user ? JSON.parse(cookies.user) : null;

  // Check if user data exists in cookies; if not, redirect to homepage
  if (!user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow access if user data is present in cookies
  return NextResponse.next();
}

// Specify routes that require authentication
export const config = {
  matcher: ["/dashboard", "/write", "/research", "/alert"],
};
