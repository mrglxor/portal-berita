import { connectToDatabase } from "../../../../lib/mongodb";
import Article from "../../../../models/Article";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  await connectToDatabase();

  try {
    const articles = await Article.find({
      judul: { $regex: query, $options: "i" },
    }).limit(10);

    return new Response(JSON.stringify({ results: articles }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching articles" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}