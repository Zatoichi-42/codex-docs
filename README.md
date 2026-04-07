# Codex Guidance

A Vercel-ready Next.js site that mirrors the structure of the Claude guidance site as closely as possible while using only native Codex concepts.

## Local development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm start
```



## Scope

Included only when natively supported by Codex:

- AGENTS.md
- hooks
- rules
- config
- skills
- subagents
- approvals and sandboxing
- built-in slash commands

Skipped on purpose:

- custom slash commands presented as native
- non-native autoformat or file-write hook behavior
- ratchet/evolve loops as if they were first-class Codex features
