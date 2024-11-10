import { NextResponse } from "next/server";
import saveAllCategoriesToDB from "../../../../lib/newsAPI";

export async function GET(req) {
  const authHeader = req.headers.get("Authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("Fetching news and saving to DB...");
  await saveAllCategoriesToDB();
  console.log("News update completed.");

  return NextResponse.json({ ok: true });
}
