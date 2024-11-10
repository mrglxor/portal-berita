import { connectToDatabase } from "../../../../lib/mongodb";
import Article from "../../../../models/Article";

export async function GET() {
  await connectToDatabase();
  try {
    const articles = await Article.find({ status: "published" }).sort({
      tanggal: -1,
    });

    const banners = articles.slice(0, 4);
    const cards = articles.slice(4, 13);

    return new Response(
      JSON.stringify({
        success: true,
        data: { banners, cards },
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
