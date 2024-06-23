import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Get the token
  const token = request.cookies.get("next-auth.session-token");
  // const token = await getToken({ req: request });
  console.log("Token:", token); // Add debugging statement to log the token

  // Destructure the URL
  const url = request.nextUrl;
  const { pathname } = url;

  // Debugging URL and token
  console.log("URL Pathname:", pathname);
  console.log("Token Present:", Boolean(token));

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
