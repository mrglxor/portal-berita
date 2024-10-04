import { connectToDatabase } from "../../../../../lib/mongodb";
import Article from "../../../../../models/Article";

export async function POST(request) {
  const { articleId, stars } = await request.json();

  if (typeof articleId !== "string" || stars < 1 || stars > 5) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid input" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    await connectToDatabase();

    const article = await Article.findById(articleId);
    if (!article) {
      return new Response(
        JSON.stringify({ success: false, message: "Article not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    article.ratings.totalStars += stars;
    article.ratings.totalRatings += 1;

    await article.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Rating added successfully",
        averageRating: getAverageRating(article),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding rating:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

const getAverageRating = (article) => {
  if (article.ratings.totalRatings === 0) return 0;
  return (article.ratings.totalStars / article.ratings.totalRatings).toFixed(1);
};
