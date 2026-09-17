import { env } from "@/lib/env";
import { listProjects } from "@/lib/projects";
import { ProjectRegistry } from "@/components/project-registry";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const databaseConfigured = Boolean(env.DATABASE_URL);
  let projects: Awaited<ReturnType<typeof listProjects>> = [];
  if (databaseConfigured) {
    try { projects = await listProjects(); } catch { projects = []; }
  }
  return <section className="stack"><div className="pageHeading"><div><span className="eyebrow">PROJECTS</span><h1>Registered projects</h1></div><p>Dev Manager owns project intent while GitHub and Vercel remain authoritative for repository and deployment facts.</p></div><ProjectRegistry projects={projects} databaseConfigured={databaseConfigured} /></section>;
}
