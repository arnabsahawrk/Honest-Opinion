import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const secret = process.env.NEXT_AUTH_SECRET;
  // Get the token
  const token = await getToken({ req: request, secret });

  console.log("Token:", token);

  // Destructure the URL
  const url = request.nextUrl;
  const { pathname } = url;

  // If the user is signed in, prevent access to sign-in, sign-up, verify, or home pages
  if (
    token &&
    (pathname.startsWith("/sign-in") ||
      pathname.startsWith("/sign-up") ||
      pathname.startsWith("/verify") ||
      pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user is not signed in, redirect them to the sign-in page when accessing the dashboard
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
};
