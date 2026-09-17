"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Project = { id: string; name: string; slug: string; description: string | null; githubRepo: string | null; vercelProjectId: string | null; active: boolean };

export function ProjectRegistry({ projects, databaseConfigured }: { projects: Project[]; databaseConfigured: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setError(null);
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch("/api/projects", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) { setError(result.error ?? "Unable to register project"); setSaving(false); return; }
    event.currentTarget.reset(); setOpen(false); setSaving(false); router.refresh();
  }

  return <div className="stack">
    <div className="registryToolbar">
      <div><strong>{projects.length} project{projects.length === 1 ? "" : "s"}</strong><span> registered in this workspace</span></div>
      <button className="primaryButton" disabled={!databaseConfigured} onClick={() => setOpen((value) => !value)}>{open ? "Cancel" : "Register project"}</button>
    </div>
    {!databaseConfigured && <article className="panel warningPanel"><strong>Database not configured</strong><p>Add <code>DATABASE_URL</code> to Vercel, run the migration, and redeploy before registering projects.</p></article>}
    {open && <form className="panel projectForm" onSubmit={submit}>
      <div className="formGrid"><label>Name<input name="name" required placeholder="Stock Machine" /></label><label>Slug<input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="stock-machine" /></label></div>
      <label>Description<textarea name="description" rows={3} placeholder="Research and trading control plane" /></label>
      <div className="formGrid"><label>GitHub repository<input name="githubRepo" placeholder="onjoroge1/stock-machine" /></label><label>Vercel project ID<input name="vercelProjectId" placeholder="prj_..." /></label></div>
      {error && <p className="formError">{error}</p>}
      <div className="formActions"><button className="primaryButton" disabled={saving}>{saving ? "Registering…" : "Register project"}</button></div>
    </form>}
    {projects.length === 0 && databaseConfigured ? <article className="panel emptyState"><h2>No projects registered yet.</h2><p>Register Stock Machine first, then map its GitHub repository and Vercel project.</p></article> : <div className="projectGrid">{projects.map((project) => <article className="projectCard" key={project.id}><div className="projectCardTop"><span className="badge">Active</span><span className="projectSlug">{project.slug}</span></div><h2>{project.name}</h2><p>{project.description || "No description yet."}</p><dl><div><dt>GitHub</dt><dd>{project.githubRepo || "Not mapped"}</dd></div><div><dt>Vercel</dt><dd>{project.vercelProjectId || "Not mapped"}</dd></div></dl></article>)}</div>}
  </div>;
}
