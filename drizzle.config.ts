import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load .env.local for local CLI operations (e.g., npx drizzle-kit generate)
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
