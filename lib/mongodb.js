import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    console.log("Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Creating new connection");
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => {
        console.log("Connected to MongoDB");
        return mongoose;
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        cached.promise = null;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

async function disconnectFromDatabase() {
  if (cached.conn) {
    await mongoose.connection.close();
    cached.conn = null;
  }
}

export { connectToDatabase, disconnectFromDatabase };
