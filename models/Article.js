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
});

const Article =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);

export default Article;
