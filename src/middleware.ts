import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
// import { parse } from "cookie";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const user = cookieStore.get("user");

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
