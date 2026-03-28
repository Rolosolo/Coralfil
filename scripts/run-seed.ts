
import { seedDatabase } from "./src/lib/scripts/migrate-data";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

seedDatabase()
  .then(() => {
    console.log("Seed successful");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
