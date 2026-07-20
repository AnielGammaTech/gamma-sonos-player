```markdown
# gamma-sonos-player Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches you how to contribute to the `gamma-sonos-player` TypeScript codebase. You'll learn the project's coding conventions, how to implement new features with previews and tests, and how to perform code cleanup with integrated testing. The repository is organized with a focus on modularity, testability, and clear commit practices.

## Coding Conventions

- **File Naming:**  
  Use kebab-case for all file names.  
  _Example:_  
  ```
  src/shared/audio-utils.ts
  src/cards/volume-control.ts
  ```

- **Import Style:**  
  Use relative imports for all modules.  
  _Example:_  
  ```typescript
  import { getVolume } from '../shared/audio-utils';
  ```

- **Export Style:**  
  Use named exports only.  
  _Example:_  
  ```typescript
  // In src/shared/audio-utils.ts
  export function getVolume() { ... }
  ```

- **Commit Messages:**  
  Follow [Conventional Commits](https://www.conventionalcommits.org/) with `feat` and `fix` prefixes.  
  _Example:_  
  ```
  feat: add volume control card
  fix: correct audio fade timing
  ```

## Workflows

### Feature Development with Preview and Tests
**Trigger:** When adding a new interactive UI feature with visual feedback and test coverage  
**Command:** `/new-feature-with-preview`

1. **Create or update a UI component** in `src/cards/`
   - _Example:_ `src/cards/track-info.ts`
2. **Add or update shared logic/helper** in `src/shared/`
   - _Example:_ `src/shared/format-time.ts`
3. **Write unit tests** for helpers in `src/shared/*.test.ts`
   - _Example:_ `src/shared/format-time.test.ts`
4. **Update or add a preview harness** in `tools/preview/`
   - Edit `tools/preview/index.html` to showcase the new/updated component
   - Add screenshots to `tools/preview/shots/` as needed
   - Update `.gitignore` if necessary
5. **Update dependencies/scripts** in `package.json` and `package-lock.json` if any changes are made
6. **Build the project** to update `dist/` and root `.js/.js.map` files
   - _Example:_  
     ```
     npm run build
     ```
7. **Commit changes** using a conventional commit message

#### Example Directory Changes:
```
src/cards/volume-slider.ts
src/shared/volume-utils.ts
src/shared/volume-utils.test.ts
tools/preview/index.html
tools/preview/shots/volume-slider.png
package.json
dist/gamma-sonos-player.js
```

---

### Code Cleanup and Test Integration
**Trigger:** When cleaning up unused code and improving test automation  
**Command:** `/cleanup-and-test`

1. **Remove or refactor unused code** in `src/shared/`
   - _Example:_ Delete `src/shared/old-helper.ts`
2. **Update `package.json`** to include or modify test scripts
   - _Example:_  
     ```json
     "scripts": {
       "test": "ts-node ./node_modules/.bin/jest"
     }
     ```
3. **Build the project** to update `dist/` and root `.js/.js.map` files
   - _Example:_  
     ```
     npm run build
     ```
4. **Commit changes** with a `fix:` or `chore:` prefix as appropriate

---

## Testing Patterns

- **Test Files:**  
  Place test files alongside helpers in `src/shared/`, using the pattern `*.test.ts`.  
  _Example:_  
  ```
  src/shared/format-time.test.ts
  ```

- **Test Framework:**  
  The framework is not explicitly specified, but tests are run via npm scripts (e.g., `npm test`).

- **Test Example:**  
  ```typescript
  // src/shared/format-time.test.ts
  import { formatTime } from './format-time';

  test('formats seconds as mm:ss', () => {
    expect(formatTime(90)).toBe('01:30');
  });
  ```

## Commands

| Command                   | Purpose                                                        |
|---------------------------|----------------------------------------------------------------|
| /new-feature-with-preview | Start a new feature with UI, helpers, tests, and preview setup |
| /cleanup-and-test         | Clean up code and ensure tests are integrated and passing      |
```
