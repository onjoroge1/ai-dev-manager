import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { listProjects } from "@/lib/projects";

const projectInput = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  githubRepo: z.string().trim().regex(/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/).optional().or(z.literal("")),
  vercelProjectId: z.string().trim().max(150).optional().or(z.literal("")),
});

export async function GET() {
  try { return NextResponse.json({ projects: await listProjects() }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to list projects" }, { status: 503 }); }
}

export async function POST(request: Request) {
  const parsed = projectInput.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid project data", issues: parsed.error.flatten() }, { status: 400 });
  try {
    const [project] = await getDb().insert(projects).values({
      name: parsed.data.name,
      slug: parsed.data.slug,
      description: parsed.data.description || null,
      githubRepo: parsed.data.githubRepo || null,
      vercelProjectId: parsed.data.vercelProjectId || null,
    }).returning();
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create project" }, { status: 500 });
  }
}
