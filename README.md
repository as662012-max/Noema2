# Noema — Natural Intelligence

A calm, journal-like alternative to the "AI chatbot" — built with Next.js (App Router),
Tailwind CSS, and the Anthropic API.

## Setup

```bash
npm install
cp .env.example .env.local
# put your real key in .env.local
npm run dev
```

Open http://localhost:3000.

## What's real vs. what's a stub

- **Think** (`/think`) and **Decide** (`/decide`) call real API routes
  (`app/api/think/route.ts`, `app/api/decide/route.ts`) which use `@anthropic-ai/sdk`
  server-side. You need `ANTHROPIC_API_KEY` set for these to respond.
- **Reflect** and **Memory** persist to `localStorage` via `lib/storage.ts`. Swap
  `getItem` / `setItem` in that one file for real database calls (with auth) later —
  no page code needs to change.
- **Grow** is currently static seed data (`lib/data.ts`) — in a real build this would
  be derived server-side from a person's accumulated Think/Reflect/Decide history.

## Structure

```
app/
  page.tsx              Home
  think/page.tsx         Open conversation (real API)
  reflect/page.tsx        Daily journal (persisted)
  decide/page.tsx          Guided decision flow (real API)
  grow/page.tsx             Growth insights
  memory/page.tsx            Transparent memory + promises (persisted)
  profile/page.tsx            Settings, dark mode
  api/think/route.ts     Think API route
  api/decide/route.ts     Decide API route
components/             Shared TopBar, NavBar, QuickCard, ThemeProvider
lib/
  data.ts               Seed data, prompts, shared types
  storage.ts             localStorage helpers (swap for real DB here)
  anthropic.ts             Server-side Anthropic client
```

## Design tokens

All color and type decisions live as CSS variables in `app/globals.css`, mapped into
Tailwind via `tailwind.config.js` (`bg-card`, `text-ink`, `border-line`, etc. are
available, though most components currently use inline `style` for the custom colors
since they aren't part of Tailwind's default palette). Fraunces is the display
typeface; Public Sans is body text.

## Extending this

- **Auth**: add whatever provider you like, then swap `lib/storage.ts` to read/write
  per-user rows in a real database instead of `localStorage`.
- **Promises follow-up**: the brief calls for Noema to resurface a promise later
  ("has that fear become quieter or louder?"). That needs a scheduled job (e.g. a
  cron route hit daily) that picks a promise older than N days and seeds the next
  Think conversation with it — not wired up here since it needs a persistence layer
  and a way to reach the person outside of an open browser tab.
- **Grow**: once Reflect/Decide/Think entries are persisted server-side, this page
  should ask Claude to summarize trends from that history instead of using the seed
  data in `lib/data.ts`.
