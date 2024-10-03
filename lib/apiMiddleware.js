import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function apiMiddleware(req) {
  const token = req.cookies.get("87A6F3_secureAccessToken_45BC2D");

  const tokenValue = token?.value;

  if (!tokenValue) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  try {
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: ["/api/articles/create/*"],
};
