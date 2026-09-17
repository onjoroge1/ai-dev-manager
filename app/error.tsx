"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section className="panel errorPanel"><h2>Something went wrong.</h2><p>The workspace could not be rendered.</p><button onClick={() => reset()}>Try again</button></section>;
}
