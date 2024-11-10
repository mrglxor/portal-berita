import fetch from "node-fetch";
import { connectToDatabase } from "./mongodb.js";
import Article from "../models/Article.js";

const categories = [
  "entertainment",
  "health",
  "politics",
  "automotive",
  "business",
  "sport",
  "foods",
];

const NEWSAPI_API_KEY = process.env.NEWSAPI_API_KEY;
const authorId = process.env.NEWSAPI_AUTHORID;
const NEWSAPI_LANGUAGE = process.env.NEWSAPI_LANGUAGE;

export default async function saveAllCategoriesToDB() {
  await connectToDatabase();

  try {
    const allArticles = [];

    for (const category of categories) {
      const url = `https://newsapi.org/v2/everything?q=${category}&language=${NEWSAPI_LANGUAGE}&apiKey=${NEWSAPI_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      const categoryArticles = data.articles
        .filter(
          (article) =>
            article.title &&
            article.publishedAt &&
            article.urlToImage &&
            article.content &&
            article.url
        )
        .slice(0, 4)
        .map((article) => ({
          judul: article.title,
          tanggal: new Date(article.publishedAt),
          kategori: category,
          gambar: article.urlToImage,
          isinya: article.content,
          status: "published",
          authorId: authorId,
          url: article.url,
        }));

      allArticles.push(...categoryArticles);
    }

    const uniqueArticles = [];
    for (const article of allArticles) {
      const isDuplicate = await Article.exists({
        judul: article.title,
        gambar: article.urlToImage,
        url: article.url,
      });

      if (!isDuplicate) {
        uniqueArticles.push(article);
      }
    }

    await Article.deleteMany({ authorId });

    await Article.insertMany(uniqueArticles);

    console.log("All categories news successfully saved to DB");
  } catch (error) {
    console.error("Error saving news to DB:", error);
  }
}
