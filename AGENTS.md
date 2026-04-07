# Repository Guidelines

## Project Structure & Module Organization
This repository is a small Next.js App Router site for Codex guidance docs.

- `app/`: top-level routes, layout, and global styles (`app/page.tsx`, `app/layout.tsx`, `app/globals.css`)
- `components/`: UI components such as `components/DocsApp.tsx`
- `lib/`: content models and static documentation data (`lib/content.ts`)
- `public/`: static assets served as-is, including `public/downloads/codex-universal-bootstrap.zip`
- Root config: `package.json`, `tsconfig.json`, `next.config.ts`

Keep documentation content in `lib/content.ts` and keep rendering logic in `components/`.

## Build, Test, and Development Commands
- `npm install`: install dependencies
- `npm run dev`: start the local dev server at `http://localhost:3000`
- `npm run build`: create the production build
- `npm start`: serve the production build locally
- `npm run lint`: run the configured Next.js lint task

Before opening a PR, run at least `npm run build` and `npm run lint`.

## Coding Style & Naming Conventions
Use TypeScript with strict typing and React function components.

- Indentation: 2 spaces; keep imports grouped and sorted logically
- Components: PascalCase file and export names (`DocsApp.tsx`)
- Utilities/content modules: lowercase or camelCase filenames (`content.ts`)
- Prefer the `@/*` path alias for internal imports
- Keep JSX concise; extract repeated UI into small components when needed

## Testing Guidelines
There is currently no dedicated test runner configured in this checkout. For now:

- Treat `npm run build` and `npm run lint` as required validation
- For content changes, verify affected hash routes manually (example: `/#tutorials/global-setup`)
- If you add nontrivial logic, add a matching test setup and use `*.test.ts` or `*.test.tsx`

## Commit & Pull Request Guidelines
Git history is not available in this workspace snapshot, so follow a simple, consistent format:

- Commit messages: imperative, scoped, and short (example: `docs: refine tutorial section nav`)
- PRs should include: summary, changed files/areas, validation performed, and screenshots for UI changes
- Link related issues when applicable and call out any follow-up work explicitly

## Content & Asset Notes
Preserve the hash-addressable docs structure when adding sections. Do not rename existing section IDs without updating inbound links and navigation references.
