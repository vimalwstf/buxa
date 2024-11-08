import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token?.accessToken,
  },
});

export const config = {
  matcher: ["/dashboard", "/write", "/research", "/alert"],
};
