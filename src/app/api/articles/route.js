import { connectToDatabase } from "../../../../lib/mongodb";
import Article from "../../../../models/Article";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (!category) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Category is required",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    await connectToDatabase();

    const articles = await Article.find({
      kategori: category,
      status: "published",
    }).sort({
      tanggal: -1,
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: { articles },
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