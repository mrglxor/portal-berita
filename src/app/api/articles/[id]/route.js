import { connectToDatabase } from "../../../../../lib/mongodb";
import Article from "../../../../../models/Article";
import User from "../../../../../models/User";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectToDatabase();

    const article = await Article.findById(id);
    if (!article) {
      return new Response(
        JSON.stringify({ success: false, message: "Article not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const author = await User.findById(article.authorId);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          article,
          author,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const { judul, kategori, gambar, isinya } = await request.json();

    if (!judul || !kategori || !gambar || !isinya) {
      return new Response(
        JSON.stringify({ message: "Semua field harus diisi!" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await connectToDatabase();

    const article = await Article.findById(id);

    if (!article) {
      return new Response(
        JSON.stringify({ message: "Artikel tidak ditemukan!" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (article.status === "published") {
      return new Response(
        JSON.stringify({
          message: "Artikel yang sudah dipublish tidak bisa diubah!",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { judul, kategori, gambar, isinya },
      { new: true }
    );

    if (!updatedArticle) {
      return new Response(
        JSON.stringify({ message: "Artikel tidak ditemukan!" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(updatedArticle), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating article:", error);
    return new Response(JSON.stringify({ message: "Terjadi kesalahan!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectToDatabase();

    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return new Response(
        JSON.stringify({ message: "Artikel tidak ditemukan!" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Artikel berhasil dihapus!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting article:", error);
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan saat menghapus artikel!" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
