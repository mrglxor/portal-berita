import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const token = request.cookies.get("87A6F3_secureAccessToken_45BC2D");

  if (!token) {
    return NextResponse.redirect(`${request.nextUrl.origin}/auth`);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = { decoded };
    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.log("Error :", error);
    return NextResponse.redirect(`${request.nextUrl.origin}/auth`);
  }
}
