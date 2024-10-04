import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../../lib/mongodb";
import Article from "../../../../../../models/Article";

export async function POST(req, { params }) {
  const { id } = params;
  const { userId, stars } = await req.json();

  await connectToDatabase();

  if (!userId || typeof stars !== "number" || stars < 1 || stars > 5) {
    return NextResponse.json(
      { success: false, message: "Invalid data" },
      { status: 400 }
    );
  }

  try {
    const article = await Article.findById(id);

    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article not found" },
        { status: 404 }
      );
    }

    if (!article.ratings) {
      article.ratings = {
        totalStars: 0,
        totalRatings: 0,
        userRatings: [],
      };
    }

    if (!Array.isArray(article.ratings.userRatings)) {
      article.ratings.userRatings = [];
    }

    const existingRatingIndex = article.ratings.userRatings.findIndex(
      (rating) => rating.userId.toString() === userId
    );

    if (existingRatingIndex !== -1) {
      const oldStars = article.ratings.userRatings[existingRatingIndex].stars;
      article.ratings.userRatings[existingRatingIndex].stars = stars;
      article.ratings.totalStars += stars - oldStars;
    } else {
      article.ratings.userRatings.push({ userId, stars });
      article.ratings.totalStars += stars;
      article.ratings.totalRatings += 1;
    }

    await article.save();

    return NextResponse.json({ success: true, data: article }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
