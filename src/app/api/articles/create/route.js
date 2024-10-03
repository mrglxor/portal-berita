import { NextResponse } from "next/server";
import Article from "../../../../../models/Article";
import { connectToDatabase } from "../../../../../lib/mongodb";
import { apiMiddleware } from "../../../../../lib/apiMiddleware";

export async function POST(req) {
  const response = apiMiddleware(req);
  if (response) return response;

  const { judul, kategori, gambar, isinya } = await req.json();

  if (!judul || judul.length < 20) {
    return NextResponse.json(
      { error: "Judul harus minimal 20 karakter" },
      { status: 400 }
    );
  }

  if (!kategori) {
    return NextResponse.json(
      { error: "Kategori wajib diisi" },
      { status: 400 }
    );
  }

  if (!gambar || !/^https?:\/\//.test(gambar)) {
    return NextResponse.json(
      { error: "URL gambar harus valid dan diawali dengan https://" },
      { status: 400 }
    );
  }

  if (!isinya || isinya.length < 150 || isinya.length > 1500) {
    return NextResponse.json(
      { error: "Isi berita harus antara 150 hingga 1500 karakter" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const article = new Article({
      judul,
      tanggal: new Date(),
      kategori,
      gambar,
      isinya,
      authorId: req.user.userId,
    });

    await article.save();

    return NextResponse.json({ message: "OK", status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Gagal membuat berita" },
      { status: 500 }
    );
  }
}
