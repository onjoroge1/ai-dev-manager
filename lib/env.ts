import { z } from "zod";

const envSchema = z.object({
  APP_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().url().optional(),
});

export const env = envSchema.parse({ APP_ENV: process.env.APP_ENV, DATABASE_URL: process.env.DATABASE_URL });
