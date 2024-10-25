import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    if (pathname === "/")
      return NextResponse.redirect(new URL("/home", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token?.accessToken,
    },
  },
);

export const config = { matcher: ["/", "/dashboard(.*)"] };
