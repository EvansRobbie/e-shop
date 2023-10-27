import { withAuth } from "next-auth/middleware";
import { getCurrentUser } from "./actions/getCurrentUser";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req, res) {
    //authorize roles
    // const currentUser = await getCurrentUser();
    const url = req.nextUrl.pathname;
    console.log(url);
    const userRole = req?.nextauth?.token?.role;
    if (url.startsWith("/admin") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return false;
      },
    },
  }
);
export const config = {
  matcher: ["/profile", "/orders", "/checkout", "/admin/:path*"],
};
