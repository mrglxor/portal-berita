import cron from "node-cron";
import saveAllCategoriesToDB from "./newsAPI.js";

export const initializeCron = () => {
  cron.schedule(
    "00 00 * * *",
    async () => {
      console.log("Fetching news and saving to DB...");
      await saveAllCategoriesToDB();
      console.log("News update completed.");
    },
    {
      scheduled: true,
      timezone: "Asia/Jakarta",
    }
  );

  console.log("Cron Initialized");
};
