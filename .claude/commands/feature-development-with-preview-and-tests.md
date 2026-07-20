---
name: feature-development-with-preview-and-tests
description: Workflow command scaffold for feature-development-with-preview-and-tests in gamma-sonos-player.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /feature-development-with-preview-and-tests

Use this workflow when working on **feature-development-with-preview-and-tests** in `gamma-sonos-player`.

## Goal

Implements a new feature with supporting helpers, updates UI components, adds unit tests, and provides a Playwright preview harness with screenshots.

## Common Files

- `src/cards/*.ts`
- `src/shared/*.ts`
- `src/shared/*.test.ts`
- `tools/preview/index.html`
- `tools/preview/.gitignore`
- `tools/preview/shots/*.png`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create or update UI component in src/cards/
- Add or update shared logic/helper in src/shared/
- Write unit tests for helper in src/shared/*.test.ts
- Update or add preview harness in tools/preview/ (index.html, .gitignore, shots/)
- Update package.json and package-lock.json if dependencies or scripts change

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.