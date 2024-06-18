import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  //if the user successfully sign-in then prevent the user to go in these paths
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname.startsWith("/"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  //if the user don't have any token then I send the in sign-in path
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sing-up", "/", "/dashboard/:path*", "/verify/:path*"],
};
