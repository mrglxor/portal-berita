import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function authMiddleware() {
  const cookieStore = cookies();
  const token = cookieStore.get("87A6F3_secureAccessToken_45BC2D")?.value;

  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
