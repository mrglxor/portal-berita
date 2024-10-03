import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req) {
  const cookie = cookies().get("87A6F3_secureAccessToken_45BC2D")?.value;

  if (!cookie) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/berita/:path*"],
};
