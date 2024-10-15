import { connectToDatabase } from "../../../../lib/mongodb";
import Article from "../../../../models/Article";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const limit = parseInt(searchParams.get("limit"));

  try {
    await connectToDatabase();

    // Build the query object
    const query = {};

    // Add category to the query if provided
    if (category) {
      query.kategori = category;
    }

    // Add status to the query if provided
    if (status) {
      query.status = status;
    }

    // Find articles with optional limit
    const articles = await Article.find(query)
      .sort({ tanggal: -1 })
      .limit(limit || 0); // Use the limit if provided, else fetch all

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
