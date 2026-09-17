# AI Dev Manager architecture

## Purpose

AI Dev Manager is the durable control plane between human intent, AI coding agents, GitHub, deployment platforms, CI, and production verification.

## Source-of-truth contract

- **Dev Manager DB owns intent:** projects, milestones, tasks, dependencies, acceptance criteria, assignments, and agent activity.
- **GitHub owns repository facts:** commits, branches, pull requests, reviews, merge state, and CI evidence.
- **Vercel owns deployment facts:** deployment state, deployed commit, environment, and runtime status.
- **Production checks own verification facts:** a task cannot become DONE merely because an agent reports completion.

## Completion lifecycle

`PLANNED → IN_PROGRESS → CODE_COMPLETE → PR_OPEN → MERGED → DEPLOYED → PROD_VERIFIED → DONE`

Later PRs will enforce these transitions from external evidence.

## Initial runtime

The web UI, API routes, and MCP endpoint will live in this Next.js application on Vercel. Postgres will provide persistent workflow state. Long-running work will be introduced only when required and kept outside request-bound execution.

## Security principles

- least-privilege integration tokens
- server-only credentials
- explicit write scopes
- immutable/append-only journal events where practical
- approval gates for destructive or production-sensitive operations
- no agent-supplied claim may substitute for external verification
