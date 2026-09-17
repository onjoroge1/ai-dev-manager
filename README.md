# AI Dev Manager

A model-independent development control plane for managing projects, tasks, repository state, deployments, verification evidence, and AI agent activity.

## Phase 0

This repository starts with a Vercel-ready Next.js application, a health endpoint, CI, environment validation, and the architecture contract that later PRs will build on.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

## Planned phases

- PR #1: application shell and core navigation
- PR #2: Postgres persistence and migrations
- PR #3: project registry
- PR #4+: GitHub/Vercel reconciliation, MCP, verification, and orchestration
