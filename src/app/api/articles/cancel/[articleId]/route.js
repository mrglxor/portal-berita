import { connectToDatabase } from "../../../../../../lib/mongodb";
import Article from "../../../../../../models/Article";

export async function POST(req, { params }) {
  const { articleId } = params;

  try {
    await connectToDatabase();

    // Find the article by ID
    const article = await Article.findById(articleId);

    if (!article) {
      return new Response(
        JSON.stringify({ success: false, message: "Article not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update the article status to "draft"
    article.status = "draft";
    await article.save();

    return new Response(JSON.stringify({ success: true, data: article }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
