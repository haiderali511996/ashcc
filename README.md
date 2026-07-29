# Al Sadiq Health Care Centre (ASHCC) — Website & Admin Panel

A full MERN + Next.js stack website for **Al Sadiq Health Care Centre** (Lahore, Pakistan) with a
server-rendered public website (Home, About, Team, Blog, Contact, Appointment booking) and a
protected admin panel to manage blog posts, team members, contact messages, appointments and
site settings.

Brand colors: **Red `#C8102E`**, **Black `#111111`**, **White `#FFFFFF`** — matching the ASHCC logo.

## Tech Stack

- **Frontend:** Next.js 16 (App Router, server-side rendering) + Tailwind CSS 4
- **Backend:** Node.js + Express + Mongoose — a standalone JSON API
- **Auth:** JWT (JSON Web Tokens), bcrypt password hashing
- **File uploads:** Multer (stored on server disk, served as static files from the API)
- **Database:** MongoDB Atlas

## Architecture: Two Separate Apps

The frontend and backend are **decoupled** and deploy as two independent Node.js applications:

```
┌─────────────────────────────┐        ┌──────────────────────────────┐
│  frontend/  (Next.js, SSR)  │  HTTP  │  backend/  (Express API)      │
│  alsadiqhealthcare.online   │ ─────► │  api.alsadiqhealthcare.online │
└─────────────────────────────┘        └──────────────────────────────┘
```

This is required for real server-side rendering (the SEO benefit of Next.js) — a Next.js server
needs to run as its own Node process, separate from the API it calls. The frontend talks to the
backend over HTTP using `NEXT_PUBLIC_API_URL`.

> If you'd rather run a single app (simpler cPanel setup, no SSR), see "Alternative: static
> export" near the bottom — but the two-app setup below is what this codebase is configured for.

## Project Structure

```
ashcc/
├── backend/             Express API server (standalone)
│   ├── app.js            Express app (routes, middleware) — pure JSON API, no frontend serving
│   ├── server.js          Entry point — connects to MongoDB and starts the server
│   ├── config/db.js       MongoDB connection
│   ├── models/            Mongoose schemas (Admin, Blog, TeamMember, ContactMessage, Appointment, Settings)
│   ├── controllers/       Route handlers
│   ├── routes/            Express routers
│   ├── middleware/        auth (JWT), upload (multer), error handler
│   ├── seed/seedAdmin.js       Creates the first admin account
│   ├── seed/seedDemoContent.js Adds 6 dummy team members + 5 real SEO blog posts
│   └── uploads/            Uploaded images (blogs/, team/)
└── frontend/             Next.js application (public site + /admin panel)
    ├── server.js          Custom Node server — the cPanel "Application startup file"
    ├── src/app/            Routes (App Router): pages, layouts, generateMetadata
    ├── src/app/admin/      Admin panel routes (client-rendered, JWT-protected)
    ├── src/components/     Shared UI components
    ├── src/context/        Auth & Settings React context (hydrated from server-fetched data)
    └── src/lib/            api.js (client axios) / serverApi.js (server fetch helper)
```

## 1. Local Development

### Backend

```bash
cd backend
cp .env.example .env
# edit .env — set MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, CLIENT_URL
npm install
npm run seed          # creates your first admin login
npm run seed:demo     # optional: adds dummy team members + 5 SEO blog posts
npm run dev             # starts on http://localhost:5000
```

### Frontend

```bash
cd frontend
cp .env.example .env.local
# edit .env.local — set NEXT_PUBLIC_API_URL=http://localhost:5000
npm install
npm run dev             # starts on http://localhost:3000
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin/login`
for the admin panel (log in with the email/password from `ADMIN_EMAIL` / `ADMIN_PASSWORD`).

## 2. MongoDB Atlas Setup

1. In Atlas → **Network Access**, add the IP address of wherever you run the backend
   (your cPanel server's IP — run `curl ifconfig.me` there to find it), or `0.0.0.0/0` if your
   host has no fixed IP.
2. In Atlas → **Database Access**, confirm the database user has read/write permissions.
3. Connection string format:
   ```
   mongodb+srv://<username>:<password>@<cluster-host>/ashcc?retryWrites=true&w=majority
   ```
   Note the `/ashcc` database name — this keeps your data in its own database on the cluster.

**Multiple Atlas projects?** Atlas database users are scoped **per project**, not per
organization — a user with the same name in two different projects has two independent
passwords. Before troubleshooting a "bad auth" error, always confirm via that specific cluster's
own **Connect → Drivers** page that the hostname you're using actually belongs to the project
you're editing.

## 3. Deploying to cPanel

Most cPanel hosts provide **"Setup Node.js App"** (built on Passenger). You'll create **two**
separate Node.js apps — one for the API, one for the Next.js frontend.

### Step 1 — Upload the code

```bash
cd ~
git clone -b claude/ashcc-mern-admin-panel-x3gh7r https://github.com/haiderali511996/ashcc.git ashcc-src
```

(Clone into a working folder — you'll point each Node.js App's "Application root" at
`ashcc-src/backend` and `ashcc-src/frontend` respectively.)

### Step 2 — Create a subdomain for the API

In cPanel → **Domains**, add a subdomain, e.g. `api.alsadiqhealthcare.online`, pointed at any
placeholder document root (the Node.js App setup below overrides how it's actually served).

### Step 3 — Create the backend Node.js App

cPanel → **Setup Node.js App** → **Create Application**:

- **Node.js version:** 18 or newer
- **Application mode:** Production
- **Application root:** `ashcc-src/backend`
- **Application URL:** `api.alsadiqhealthcare.online`
- **Application startup file:** `server.js`
- **Environment variables:**

  | Variable | Value |
  |---|---|
  | `NODE_ENV` | `production` |
  | `MONGODB_URI` | `mongodb+srv://<user>:<pass>@<cluster-host>/ashcc?retryWrites=true&w=majority` |
  | `JWT_SECRET` | a long random string (generate with `openssl rand -hex 32`) |
  | `JWT_EXPIRES_IN` | `7d` |
  | `CLIENT_URL` | `https://alsadiqhealthcare.online` |

- Click **Create**, then **Run NPM Install**, then seed your admin account (see Step 6).

### Step 4 — Create the frontend Node.js App

cPanel → **Setup Node.js App** → **Create Application**:

- **Node.js version:** 18 or newer
- **Application mode:** Production
- **Application root:** `ashcc-src/frontend`
- **Application URL:** `alsadiqhealthcare.online`
- **Application startup file:** `server.js`
- **Environment variables:**

  | Variable | Value |
  |---|---|
  | `NODE_ENV` | `production` |
  | `NEXT_PUBLIC_API_URL` | `https://api.alsadiqhealthcare.online` |
  | `NEXT_PUBLIC_SITE_URL` | `https://alsadiqhealthcare.online` |
  | `PORT` | leave as provided by cPanel |

- Click **Create**.

### Step 5 — Install & build (both apps)

> **Known quirk on some cPanel/CloudLinux hosts:** the `npm`/`node` commands inside an activated
> Node.js App's virtual environment are wrapper scripts that **force `NODE_ENV=production`** on
> every command — including `npm install`, which then silently skips `devDependencies` (this is
> where the frontend's `vite`/`next` build tooling lives). If `npm run build` fails with
> `command not found` for a dev tool despite `npm install` reporting success, this is why.
>
> **The fix:** call the real, unwrapped binaries directly, bypassing the wrapper. Find them via
> `echo $CL_NODEHOME` (shown once you've entered a Node.js App's virtual environment) — it'll be
> something like `/opt/alt/alt-nodejs20/root`. Then:
> ```bash
> "$CL_NODEHOME/usr/bin/npm" install --include=dev
> "$CL_NODEHOME/usr/bin/npm" run build
> ```
> If your host doesn't have this wrapper (many don't), the normal `npm install && npm run build`
> works fine — try that first.

**Backend:**
```bash
cd ~/ashcc-src/backend
npm install     # (or the $CL_NODEHOME workaround above if it skips devDependencies)
```

**Frontend:**
```bash
cd ~/ashcc-src/frontend
npm install --include=dev    # devDependencies are required for the build step
npm run build                 # produces the .next/ production build
```

### Step 6 — Seed the admin account

> Custom environment variables set in the cPanel UI are only applied to the **running app**
> (after Restart) — they are **not** automatically present in an interactive SSH/Terminal
> session, even inside the activated virtual environment. For one-off commands like seeding,
> export the same values manually first:

```bash
cd ~/ashcc-src/backend
export MONGODB_URI="mongodb+srv://<user>:<pass>@<cluster-host>/ashcc?retryWrites=true&w=majority"
export JWT_SECRET="the-same-secret-you-put-in-cpanel"
export ADMIN_NAME="Admin"
export ADMIN_EMAIL="admin@alsadiqhealthcare.online"
export ADMIN_PASSWORD="pick-a-strong-password"
npm run seed

# optional — adds dummy team members and 5 real ~1000-word SEO blog posts:
npm run seed:demo
```

### Step 7 — Restart both apps

In cPanel's Node.js App screen, click **Restart** for both the backend and frontend apps. Your
site should now be live:

- Public website: `https://alsadiqhealthcare.online/`
- Admin panel: `https://alsadiqhealthcare.online/admin/login`
- API (should not normally be visited directly): `https://api.alsadiqhealthcare.online/`

### Step 8 — Uploaded images & file permissions

`backend/uploads/`, `backend/uploads/blogs/` and `backend/uploads/team/` need to be writable by
the Node.js app (cPanel's Node app runs as your cPanel user, so standard `755`/`775` permissions
are enough — no extra config typically needed). Because the frontend now runs on a different
origin than the API, uploaded images are referenced with the full API URL
(handled automatically by `frontend/src/lib/config.js`'s `mediaUrl()` helper) rather than a
relative path.

### Updating the site later

```bash
cd ~/ashcc-src && git pull

cd backend && npm install
# Restart the backend app in cPanel

cd ../frontend && npm install --include=dev && npm run build
# Restart the frontend app in cPanel
```

## 4. Admin Panel Features

- **Dashboard** — quick stats (posts, team, messages, appointments)
- **Blog Posts** — create/edit/delete, draft vs published, cover image upload, tags, categories,
  and **SEO fields** (meta title / meta description shown in Google search results & social
  shares — falls back to the post title/excerpt if left blank)
- **Team** — add/edit/remove doctors & staff, photos, social links, show/hide on site
- **Messages** — view & manage contact form submissions
- **Appointments** — view requests, update status (pending/confirmed/completed/cancelled)
- **Site Settings** — edit About text, mission/vision, address, phone, WhatsApp, email, opening
  hours, Google Maps embed URL, and social media links — all shown live on the public site
- **Change Password** — update your own admin password

## 5. SEO Notes

- Every public page has real `<title>`/meta description tags — blog posts use their own
  `metaTitle`/`metaDescription` fields (editable in the admin), falling back to the post title
  and excerpt.
- The root layout sets a title template (`%s | Al Sadiq Health Care Centre`) — don't repeat the
  site name inside a page's own title/metaTitle, or it'll be appended twice.
- `/admin/*` routes are marked `noindex, nofollow` so they never show up in search results.
- Pages are server-rendered (not a client-only SPA), so search engines see fully-formed HTML —
  the actual SEO benefit of the Next.js migration.

## 6. Notes on the logo & favicon

The real ASHCC logo and favicon (provided by the client) are wired in at:
`frontend/public/logo-icon.png` (the crescent mark, used in the navbar/footer/admin sidebar),
`frontend/public/logo-full.jpeg` (full lockup, used on the admin login screen), and
`frontend/public/favicon.png`. Replace those files directly to update branding — no code changes
needed.

## 7. Security Checklist Before Going Live

- [ ] Change `JWT_SECRET` to a strong random value in production (different from any value used
      during development/testing)
- [ ] Change the seeded admin password immediately after first login (Settings → Change Password)
- [ ] Restrict MongoDB Atlas Network Access to your server's IP instead of `0.0.0.0/0` if possible
- [ ] Set `CLIENT_URL` (backend) to your real frontend domain only (already enforced via CORS)
- [ ] Never commit `.env`/`.env.local` files — `.gitignore` already excludes them

## Alternative: static export (single app, no SSR)

If you'd rather avoid running two Node.js apps, Next.js can be built as a static export
(`output: 'export'` in `next.config.mjs`) and served as plain files by the Express backend,
exactly like the previous Vite setup. You lose true server-side rendering (blog pages are
pre-rendered at build time, so brand-new posts need a rebuild to appear) and `next/image`
optimization, but gain a simpler, single-app deployment. This isn't how the current codebase is
configured — ask if you'd like it converted.
