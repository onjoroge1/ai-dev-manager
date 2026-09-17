import { z } from "zod";

const envSchema = z.object({
  APP_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const env = envSchema.parse({
  APP_ENV: process.env.APP_ENV,
});
