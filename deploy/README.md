# deploy/frontend-standalone

A pre-built, self-contained Next.js production bundle (`output: 'standalone'`), committed here
because this project's cPanel hosting account has a process-count (LVE) limit too low for
`next build` to run on the server itself — it fails with `spawn ... EAGAIN` while trying to fork
worker processes, regardless of `cpus` config or webpack vs Turbopack.

**This folder is a build artifact, not source.** It was produced by running, from `frontend/`:

```bash
NEXT_PUBLIC_API_URL=https://api.alsadiqhealthcare.online \
NEXT_PUBLIC_SITE_URL=https://alsadiqhealthcare.online \
npm run build

cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
```

...then copying `.next/standalone/` here. `NEXT_PUBLIC_*` variables are baked in at build time,
so if either URL changes, this folder must be rebuilt (on any machine without the process-limit
constraint — a laptop, CI, or this environment) and re-committed.

**On the server**, point the frontend cPanel Node.js App's Application root at this folder
directly (see the main README's deployment section) and just run `node server.js` — no
`npm install` or `next build` needed there at all.
