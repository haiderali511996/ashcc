# Al Sadiq Health Care Centre (ASHCC) — Website & Admin Panel

A full MERN stack website for **Al Sadiq Health Care Centre** (Lahore, Pakistan) with a public
website (Home, About, Team, Blog, Contact, Appointment booking) and a protected admin panel to
manage blog posts, team members, contact messages, appointments and site settings.

Brand colors: **Red `#C8102E`**, **Black `#111111`**, **White `#FFFFFF`** — matching the ASHCC logo.

## Tech Stack

- **Frontend:** React 19 + Vite + React Router + Tailwind CSS 4
- **Backend:** Node.js + Express + Mongoose (MongoDB)
- **Auth:** JWT (JSON Web Tokens), bcrypt password hashing
- **File uploads:** Multer (stored on server disk, served as static files)
- **Database:** MongoDB Atlas

## Project Structure

```
ashcc/
├── backend/            Express API server
│   ├── app.js           Express app (routes, middleware)
│   ├── server.js        Entry point — connects to MongoDB and starts the server
│   ├── config/db.js     MongoDB connection
│   ├── models/          Mongoose schemas (Admin, Blog, TeamMember, ContactMessage, Appointment, Settings)
│   ├── controllers/     Route handlers
│   ├── routes/          Express routers
│   ├── middleware/      auth (JWT), upload (multer), error handler
│   ├── seed/seedAdmin.js  Creates the first admin account
│   └── uploads/          Uploaded images (blogs/, team/)
└── frontend/            React application (public site + /admin panel)
    └── src/
        ├── pages/            Public pages
        ├── pages/admin/      Admin panel pages
        ├── components/       Shared UI components
        └── context/          Auth & Settings React context
```

## 1. Local Development

### Backend

```bash
cd backend
cp .env.example .env
# edit .env — set MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run seed     # creates your first admin login
npm run dev       # starts on http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev       # starts on http://localhost:5173, proxies /api to :5000
```

Visit `http://localhost:5173` for the public site and `http://localhost:5173/admin/login`
for the admin panel (log in with the email/password from `ADMIN_EMAIL` / `ADMIN_PASSWORD`).

## 2. MongoDB Atlas Setup

1. In Atlas → **Network Access**, add the IP address of wherever you run the backend
   (your cPanel server's IP, or `0.0.0.0/0` to allow from anywhere if your host has no fixed IP —
   only do this if you also use a strong `JWT_SECRET` and a strong admin password).
2. In Atlas → **Database Access**, confirm the database user has read/write permissions.
3. Your connection string (already set up for this project):
   ```
   mongodb+srv://<username>:<password>@cluster0.gyurptj.mongodb.net/ashcc?retryWrites=true&w=majority
   ```
   Note the `/ashcc` database name added before the `?` — this keeps your data in its own
   database on the shared cluster.

## 3. Deploying to cPanel

Most cPanel hosts provide **"Setup Node.js App"** (built on Passenger). This app is a single
Node/Express server that both serves the API **and** the built React frontend, so you only need
to configure **one** Node.js application in cPanel.

### Step 1 — Upload the code

Upload the whole project (or `git clone` it if your host gives you SSH/Git access) to a folder
**outside** `public_html`, e.g. `/home/<cpanel-user>/ashcc`.

### Step 2 — Build the frontend

On your local machine (or in cPanel's Terminal if available):

```bash
cd frontend
npm install
npm run build
```

This creates `frontend/dist/` — the backend serves these static files directly, so **you do not
need a separate static hosting app** for the frontend.

> If cPanel's Terminal doesn't have enough memory/Node tooling to run the build, build it on
> your own machine and upload the resulting `frontend/dist` folder to the server.

### Step 3 — Create the Node.js App in cPanel

1. cPanel → **Setup Node.js App** → **Create Application**.
2. **Node.js version:** 18 or newer.
3. **Application mode:** Production.
4. **Application root:** `ashcc/backend` (the folder containing `server.js`).
5. **Application URL:** `alsadiqhealthcare.online`.
6. **Application startup file:** `server.js`.
7. Click **Create**.

### Step 4 — Set environment variables

In the same Node.js App screen, add these environment variables (cPanel provides fields for
this — do **not** commit a `.env` file with real secrets to git):

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://<username>:<password>@cluster0.gyurptj.mongodb.net/ashcc?retryWrites=true&w=majority` |
| `JWT_SECRET` | a long random string (generate with `openssl rand -hex 32`) |
| `JWT_EXPIRES_IN` | `7d` |
| `CLIENT_URL` | `https://alsadiqhealthcare.online` |
| `PORT` | leave as provided by cPanel, or `5000` |

### Step 5 — Install dependencies & seed the admin account

In the cPanel Node.js App screen, click **"Run NPM Install"** (this runs inside the app's
virtual environment). Then open the app's **Terminal** button (or SSH in) and run:

```bash
cd ~/ashcc/backend
source /home/<cpanel-user>/nodevenv/ashcc/backend/18/bin/activate   # path shown by cPanel
npm run seed
```

This creates your first admin login using `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` —
add those three as temporary environment variables before running the seed, or edit
`backend/seed/seedAdmin.js` directly for a one-off run, then remove them.

### Step 6 — Start the app

Click **Restart** in the Node.js App screen. Your site should now be live at your domain, with:

- Public website at `https://alsadiqhealthcare.online/`
- Admin panel at `https://alsadiqhealthcare.online/admin/login`
- API at `https://alsadiqhealthcare.online/api/...`

### Step 7 — Uploaded images & file permissions

Make sure `backend/uploads/`, `backend/uploads/blogs/` and `backend/uploads/team/` are
writable by the Node.js app (cPanel's Node app runs as your cPanel user, so standard
`755`/`775` permissions on these folders are enough — no extra config typically needed).

### Updating the site later

```bash
git pull
cd frontend && npm install && npm run build
cd ../backend && npm install
# then click "Restart" in cPanel's Node.js App screen
```

## 4. Admin Panel Features

- **Dashboard** — quick stats (posts, team, messages, appointments)
- **Blog Posts** — create/edit/delete, draft vs published, cover image upload, tags, categories
- **Team** — add/edit/remove doctors & staff, photos, social links, show/hide on site
- **Messages** — view & manage contact form submissions
- **Appointments** — view requests, update status (pending/confirmed/completed/cancelled)
- **Site Settings** — edit About text, mission/vision, address, phone, WhatsApp, email, opening
  hours, Google Maps embed URL, and social media links — all shown live on the public site
- **Change Password** — update your own admin password

## 5. Notes on the logo & favicon

This build includes an SVG recreation of the ASHCC brand mark (red crescent, black book,
heartbeat pulse) at `frontend/src/assets/logo-mark.svg`, `frontend/public/favicon.svg`, and
inline in `frontend/src/components/Logo.jsx`. To use your **exact** logo file:

1. Replace `frontend/public/favicon.svg` (or add `favicon.png` and update the `<link>` in
   `frontend/index.html`) with your real favicon.
2. Replace the inline SVG in `frontend/src/components/Logo.jsx` with an `<img>` tag pointing to
   your uploaded logo file (place it in `frontend/public/logo.png`, then use `src="/logo.png"`).

## 6. Security Checklist Before Going Live

- [ ] Change `JWT_SECRET` to a strong random value in production
- [ ] Change the seeded admin password immediately after first login (Settings → Change Password)
- [ ] Restrict MongoDB Atlas Network Access to your server's IP instead of `0.0.0.0/0` if possible
- [ ] Set `CLIENT_URL` to your real domain only (already enforced via CORS in `backend/app.js`)
- [ ] Never commit `.env` files — `.gitignore` already excludes them
