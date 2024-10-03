import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  gambar: { type: String },
  profesi: { type: String },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  password: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
