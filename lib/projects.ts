import { asc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { projects } from "@/lib/db/schema";

export async function listProjects() {
  return getDb().select().from(projects).orderBy(asc(projects.name));
}
