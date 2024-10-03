import { connectToDatabase } from "../../../../../../lib/mongodb";
import Article from "../../../../../../models/Article";

export async function GET(request, { params }) {
  const { authorId } = params;

  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const limit = parseInt(url.searchParams.get("limit")) || 6;
  const page = parseInt(url.searchParams.get("page")) || 1;

  const filter = { authorId };

  if (status === "draft" || status === "published") {
    filter.status = status;
  }

  try {
    await connectToDatabase();

    let articles;
    let totalArticles;

    if (status === "draft" || status === "published") {
      articles = await Article.find(filter).sort({ tanggal: -1 });
      totalArticles = articles.length;
    } else {
      totalArticles = await Article.countDocuments(filter);
      articles = await Article.find(filter)
        .sort({ tanggal: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }

    const count = {
      drafted: await Article.countDocuments({ authorId, status: "draft" }),
      published: await Article.countDocuments({
        authorId,
        status: "published",
      }),
    };

    return new Response(
      JSON.stringify({
        success: true,
        data: articles,
        count,
        total: totalArticles,
        totalPages: Math.ceil(totalArticles / limit),
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
