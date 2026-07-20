---
name: code-cleanup-and-test-integration
description: Workflow command scaffold for code-cleanup-and-test-integration in gamma-sonos-player.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /code-cleanup-and-test-integration

Use this workflow when working on **code-cleanup-and-test-integration** in `gamma-sonos-player`.

## Goal

Removes unused code or tokens, updates shared files, and ensures tests are run via npm scripts.

## Common Files

- `src/shared/*.ts`
- `package.json`
- `dist/gamma-sonos-player.js`
- `dist/gamma-sonos-player.js.map`
- `gamma-sonos-player.js`
- `gamma-sonos-player.js.map`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Remove or refactor unused code in src/shared/
- Update package.json to include or modify test scripts
- Build and update dist/ and root .js/.js.map files

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.