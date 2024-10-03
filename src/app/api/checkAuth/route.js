import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const token = request.cookies.get("87A6F3_secureAccessToken_45BC2D")?.value;

  if (!token) {
    return NextResponse.json({ message: "Token tidak ada" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = { decoded };
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Token tidak valid" }, { status: 403 });
  }
}
