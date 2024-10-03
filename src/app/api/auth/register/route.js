import { connectToDatabase } from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
  return passwordRegex.test(password);
};

export async function POST(req) {
  await connectToDatabase();

  const { email, password, name, profession, image } = await req.json();

  const errors = [];

  if (!validateEmail(email)) {
    errors.push("Email tidak valid.");
  }
  if (!validatePassword(password)) {
    errors.push(
      "Password minimal 6 karakter, harus ada 1 huruf besar dan 1 simbol."
    );
  }
  if (!name) {
    errors.push("Nama tidak boleh kosong.");
  }
  if (!profession) {
    errors.push("Profesi tidak boleh kosong.");
  }
  if (!image) {
    errors.push("Gambar tidak boleh kosong.");
  }

  if (errors.length > 0) {
    return new Response(JSON.stringify({ message: errors }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: "Email sudah terdaftar." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const imageName = `${Date.now()}_${name.replace(/\s+/g, "_")}.jpg`;
  const imagePath = path.join(process.cwd(), "public", "images", imageName);

  const base64Data = image
    .replace(/^data:image\/jpeg;base64,/, "")
    .replace(/^data:image\/png;base64,/, "");

  try {
    await fs.promises.writeFile(imagePath, base64Data, "base64");

    const user = new User({
      email,
      password: hashedPassword,
      nama: name,
      profesi: profession,
      gambar: imageName,
    });

    await user.save();
    return new Response(
      JSON.stringify({ message: "Pengguna berhasil terdaftar." }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error saving user:", error);
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan saat mendaftar." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
