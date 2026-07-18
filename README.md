# Mahanidhi G K — Portfolio

Production-ready personal portfolio website with a React + Vite frontend and Node.js + Express backend.

- **Design**: Faithfully rebuilt from a Stitch design — "Technical Noir" dark theme with glassmorphism, WebGL animated background, custom cursor, and Sora/Inter/JetBrains Mono typography.
- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion
- **Backend**: Express 4, Nodemailer, rate-limiting, honeypot spam protection

---

## Project Structure

```
/
├── client/               React + Vite frontend
│   ├── src/
│   │   ├── components/   Navbar, Hero, About, Experience, Projects,
│   │   │                 SkillsAchievements, Contact, Footer, AnimatedBackground
│   │   ├── data/
│   │   │   └── content.js  ← Single source of truth for all content
│   │   ├── hooks/        useCustomCursor, useScrollReveal, useScrollProgress
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html        SEO meta, OG tags, font preloads
│   └── vite.config.js
├── server/               Express REST API
│   ├── src/
│   │   ├── controllers/contactController.js
│   │   ├── middleware/validation.js
│   │   ├── routes/contact.js
│   │   └── index.js
│   └── .env.example
├── .gitignore
└── README.md
```

---

## Quick Start

### 1. Install Dependencies

```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

### 2. Configure Environment Variables

```bash
cd server
copy .env.example .env   # Windows
# -or-
cp .env.example .env     # Mac/Linux
```

Edit `server/.env` and fill in your SMTP credentials:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_16_char_app_password   # Gmail → Security → App passwords
CONTACT_DEST=mahanidhi.gk@gmail.com
PORT=5000
CLIENT_URL=http://localhost:5173
```

> **Tip — Gmail App Passwords**: Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords), generate a password for "Mail", and paste it as `SMTP_PASS`.

> **No credentials? No problem.** If `.env` is missing or `SMTP_USER` starts with `your_`, the server automatically falls back to **mock mode** — it logs the email to the console instead of sending it.

### 3. Run Development Servers

Open **two** terminals:

**Terminal 1 — Frontend**
```bash
cd client
npm run dev
# → http://localhost:5173
```

**Terminal 2 — Backend**
```bash
cd server
npm run dev
# → http://localhost:5000
```

The Vite dev-server proxies `/api/*` to `http://localhost:5000` automatically.

### 4. Build for Production

```bash
cd client
npm run build
# Output: client/dist/
```

Serve `client/dist/` from any static host (Vercel, Netlify, GitHub Pages).
Deploy `server/` to any Node.js host (Railway, Render, fly.io, etc.) with environment variables set.

---

## API Reference

### `GET /api/health`
Returns `{ status: "OK", timestamp: "..." }` — use to verify the server is running.

### `POST /api/contact`

**Request body (JSON):**
| Field       | Type   | Required | Notes                    |
|-------------|--------|----------|--------------------------|
| `name`      | string | ✓        | 2–100 chars              |
| `email`     | string | ✓        | Valid email, max 200     |
| `message`   | string | ✓        | 10–4000 chars            |
| `honeypot`  | string | —        | Must be empty (spam trap)|

**Responses:**
- `200` — `{ success: true, message: "Message sent successfully." }`
- `422` — `{ success: false, message: "<validation error>" }`
- `429` — Rate limit exceeded (10 requests per 15 min per IP)
- `500` — Server/SMTP error

---

## Updating Content

All portfolio content lives in **`client/src/data/content.js`**. Edit that single file to update:

- Personal info, tagline, bio, social links
- Education details
- Work experience entries
- Project cards & sub-projects
- Skills categories
- Achievements

---

## Deployment Notes

| Part       | Recommended Hosts                    |
|------------|--------------------------------------|
| Frontend   | Vercel, Netlify, GitHub Pages        |
| Backend    | Railway, Render, Fly.io, AWS Lambda  |

Update `CLIENT_URL` in the server `.env` to your production frontend URL before deploying.

---

## License

MIT — feel free to use as a template with attribution.
