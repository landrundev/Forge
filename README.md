# FORGE — AI-Powered Training Platform

## Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
```

Opens at **http://localhost:3000**

## Deploy to Production

### Option A: Vercel (Easiest — free)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com), sign in with GitHub
3. Import the repo → Vercel auto-detects Vite → Deploy
4. Done. You get a URL like `forge-training.vercel.app`

### Option B: Netlify (Also free)
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com), connect repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

### Option C: Static build (any hosting)
```bash
npm run build
```
Upload the `dist/` folder to any static host (S3, GitHub Pages, etc.)

## AI Workout Generation

The app calls the Anthropic API directly from the browser for workout proposals.
This works out of the box inside Claude.ai artifacts. For standalone deployment,
you'll need to either:

1. **Proxy through a backend** — add a small server that forwards requests to
   `https://api.anthropic.com/v1/messages` with your API key
2. **Use a serverless function** — Vercel/Netlify functions work great for this

The app will function fully without AI — you can use the manual Workout Builder
to create workouts. AI generation just won't work until the API is connected.

## Data Storage

All client data is stored in **localStorage** in the browser. This means:
- Data persists across sessions on the same device/browser
- Clearing browser data will erase everything
- Data does not sync across devices

For multi-device use, you'd want to add a backend database (Supabase, Firebase, etc.)

## Tech Stack
- React 18 + Vite
- Zero external UI libraries — all custom components
- Inline styles (no CSS framework)
- ~1300 lines, single-file app
