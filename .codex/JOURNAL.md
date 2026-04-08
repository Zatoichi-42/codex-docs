2026-04-07: Investigating Vercel npm install failure.
Observed package-lock.json resolved tarballs pointed at an internal OpenAI registry host.
Regenerated lockfile from package.json against https://registry.npmjs.org and validated clean npm install in a temp directory.
