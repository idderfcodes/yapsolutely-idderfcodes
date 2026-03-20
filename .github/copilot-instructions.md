# Yapsolutely Workspace Instructions

This repository is being developed in **GitHub Codespaces**.

## Source of truth

Use `plan/masterplan.md` as the **canonical source of truth** for this project during implementation.

Before making meaningful architecture, scope, or sequencing decisions:

1. Read `plan/masterplan.md`
2. Follow the frozen MVP decisions and critical path
3. Continue from the earliest incomplete critical-path objective unless the plan is explicitly updated

If implementation details conflict with casual chat context, prefer `plan/masterplan.md` unless the plan has been intentionally revised.

## Project intent

Build `Yapsolutely`, a Retell-inspired AI voice agent platform with:

- a web dashboard
- a separate real-time voice runtime
- inbound AI phone conversations
- configurable agents
- phone number assignment
- call logs and transcripts
- a path toward Yapsolutely-specific improvements like a flow builder and AI-generated prompt creation

## Execution philosophy

**Reuse infrastructure. Own the product.**

Use proven open-source foundations where they accelerate execution, but treat the product layer as custom work. We own:

- product architecture
- dashboard UX
- agent workflow
- number-to-agent mapping
- call logging and transcript experience
- prompt generation workflow
- Yapsolutely visual identity and design system

## MVP rules

For MVP, optimize for:

- real working phone-call flow
- transcript/log proof
- stable end-to-end demo quality

Do not let nice-to-have work block the critical demo path.

Unless explicitly reprioritized, keep these later than the core demo path:

- browser test UI
- drag-and-drop flow builder
- major visual redesign
- advanced analytics
- outbound calling
- deep CRM / knowledge base work

## Implementation guidance

When resuming work:

1. Check `plan/masterplan.md`
2. Identify the current milestone and earliest incomplete objective
3. Continue implementation from there
4. If a meaningful architectural or scope change is made, update `plan/masterplan.md`

When reporting progress, always make it clear:

- which objective is being worked on
- what changed
- what remains blocked, if anything
- what the next immediate task is

## Ongoing workflow with the user

The expected working pattern in this repository is:

1. The user says `continue`
2. Keep implementing the highest-value remaining work that does **not** require unavailable credentials or external blockers
3. Do **not** stop to ask for credentials early if meaningful non-secret work still exists
4. When the user asks for a status report, explain:
	- where the project stands now
	- what changed since the last checkpoint
	- whether the repo is ready for credential insertion yet
	- what exact credentials are needed next, if any
5. Only pivot into credential insertion and live validation when the remaining meaningful work is primarily blocked on real provider/deployment secrets

For this project specifically, treat the current preferred workflow as:

- continue shipping non-secret implementation slices autonomously
- periodically provide status/progress reports when asked
- explicitly say when the project is ready for real credentials
- once the codebase is sufficiently prepared, use the provided credentials to do final environment wiring, live validation, deployment, and demo hardening

When deciding whether the repo is "ready for credentials", use this rule:

> If the next highest-value tasks are mostly live Twilio / Deepgram / Anthropic / deployment validation tasks, then the repo is ready for credential insertion.

Until then, keep building.

## UI guidance

It is acceptable to use `shadcn/ui` as a temporary implementation scaffold.

Do **not** assume the starter aesthetic is final.

The final product should evolve into a custom Yapsolutely identity with its own:

- fonts
- colors
- spacing
- components
- dashboard look and feel

## Environment note

This project is being built inside GitHub Codespaces, so prefer repo-local, reproducible configuration and documentation over machine-specific assumptions.
