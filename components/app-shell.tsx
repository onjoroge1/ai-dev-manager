import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/projects", label: "Projects" },
  { href: "/activity", label: "Activity" },
  { href: "/settings", label: "Settings" },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="appShell">
      <aside className="sidebar">
        <div>
          <div className="brandMark">DM</div>
          <div className="brandCopy">
            <strong>AI Dev Manager</strong>
            <span>Control plane</span>
          </div>
        </div>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="navItem">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebarFooter">Shared state for human + AI delivery</div>
      </aside>
      <div className="contentFrame">
        <header className="topbar">
          <div>
            <span className="eyebrow">DEVELOPMENT CONTROL PLANE</span>
            <strong>Workspace</strong>
          </div>
          <div className="healthPill"><span className="statusDot" /> System online</div>
        </header>
        <main className="pageContent">{children}</main>
      </div>
    </div>
  );
}
