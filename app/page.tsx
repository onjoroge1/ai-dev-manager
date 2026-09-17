export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <span className="eyebrow">AI DEV MANAGER</span>
        <h1>One control plane for human + AI software delivery.</h1>
        <p>
          Track project intent here, reconcile external facts from GitHub and Vercel, and give
          ChatGPT and Claude a shared source of development state.
        </p>
        <div className="statusRow">
          <span className="statusDot" aria-hidden="true" />
          <span>Phase 0 bootstrap online</span>
        </div>
      </section>
    </main>
  );
}
