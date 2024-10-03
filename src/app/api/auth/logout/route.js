import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("87A6F3_secureAccessToken_45BC2D", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  const response = NextResponse.json({
    message: "Logout berhasil!",
  });

  response.headers.set("Set-Cookie", cookie);

  return response;
}
