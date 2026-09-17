const stats = [
  ["Projects", "0"],
  ["Open tasks", "0"],
  ["Active agents", "0"],
  ["Needs attention", "0"],
];

export default function HomePage() {
  return (
    <section className="stack">
      <div className="pageHeading">
        <div><span className="eyebrow">OVERVIEW</span><h1>Engineering command center</h1></div>
        <p>Dev Manager will reconcile project intent with GitHub, deployments, CI, and production evidence.</p>
      </div>
      <div className="statGrid">{stats.map(([label, value]) => <article className="statCard" key={label}><span>{label}</span><strong>{value}</strong></article>)}</div>
      <article className="panel emptyState"><span className="eyebrow">GET STARTED</span><h2>Register the first project in PR #3.</h2><p>The application shell is ready. Persistence and project registration are the next stacked changes.</p></article>
    </section>
  );
}
