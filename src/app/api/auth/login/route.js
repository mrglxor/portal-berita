import { serialize } from "cookie";
import { connectToDatabase } from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
  return passwordRegex.test(password);
};

export async function POST(req) {
  const { email, password } = await req.json();

  const errors = [];

  if (!email) {
    errors.push("Email tidak boleh kosong.");
  } else if (!validateEmail(email)) {
    errors.push("Email tidak valid.");
  }

  if (!password) {
    errors.push("Password tidak boleh kosong.");
  } else if (!validatePassword(password)) {
    errors.push(
      "Password minimal 6 karakter, harus ada 1 huruf besar dan 1 simbol."
    );
  }

  if (errors.length > 0) {
    return new Response(JSON.stringify({ message: errors.join(" ") }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return new Response(
        JSON.stringify({ message: "Email atau Password Salah!" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const token = jwt.sign(
      {
        userId: user._id,
        nama: user.nama,
        email: user.email,
        profesi: user.profesi,
        gambar: user.gambar,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const cookie = serialize("87A6F3_secureAccessToken_45BC2D", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
      path: "/",
    });

    const response = NextResponse.json({
      message: "Login berhasil!",
    });
    response.headers.set("Set-Cookie", cookie);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
