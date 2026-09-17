import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env";
import * as schema from "./schema";

let database: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function getDb() {
  if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  if (!database) {
    const client = postgres(env.DATABASE_URL, { prepare: false, max: 1 });
    database = drizzle(client, { schema });
  }
  return database;
}
