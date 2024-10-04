import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  tanggal: { type: Date, required: true },
  kategori: { type: String, required: true },
  gambar: { type: String, required: true },
  isinya: { type: String, required: true },
  url: { type: String },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ratings: {
    totalStars: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    userRatings: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        stars: { type: Number, required: true, min: 1, max: 5 },
      },
    ],
  },
});

const Article =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);

export default Article;
