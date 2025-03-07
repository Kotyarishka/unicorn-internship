import { z } from "zod";
import "dotenv/config";

export const env = z
  .object({
    PORT: z
      .string()
      .default("3000")
      .transform((s) => parseInt(s, 10))
      .pipe(z.number()),
    MONGO_URI: z.string(),

    APP_ORIGIN: z.string(),

    JWT_SECRET: z.string(),
    JWT_REFRESH_SECRET: z.string(),

    NODE_ENV: z.string().default("development"),
  })
  .parse(process.env);
