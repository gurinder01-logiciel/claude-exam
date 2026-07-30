# CCAR-F Exam Simulator — team edition

A full mock of the **Claude Certified Architect – Foundations (CCAR-F)** exam:
60 scenario questions, 120 minutes, pausable timer, and a shared team leaderboard.

- **138-question bank**, all Claude-anchored (Claude Code, MCP, Agent SDK, CI/CD)
- Papers follow a **difficulty ramp** — 15 easy, then 20 medium, then 25 hard
- Every sitting produces a **different paper**
- Right-click an option to cross it out as "definitely not this" — it stays crossed in review
- **Instant feedback** (optional toggle, off by default): marks each pick right or
  wrong immediately *without* revealing the correct option. Your first pick is
  final in this mode, so the score stays meaningful
- Results give a **score out of 1000**, domain breakdown, and per-question explanations

---

## Deploy to Vercel

### 1. Push to a Git repo

```bash
cd ccaf-app
git init
git add .
git commit -m "CCAR-F exam simulator"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

### 2. Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
2. Framework preset: **Other**. Leave build command and output directory empty.
3. Click **Deploy**.

It will deploy and work immediately — but the leaderboard will be
*offline (this browser only)* until you finish step 3.

### 3. Add Redis for the shared leaderboard

The leaderboard needs storage shared across everyone's browsers.

1. In your Vercel project → **Storage** → **Create Database** → pick the
   **Upstash for Redis** integration (free tier is plenty).
2. Connect it to this project. Vercel injects these env vars automatically:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
3. **Redeploy** (Deployments → ⋯ → Redeploy) so the function picks them up.

That's it. The sidebar will now say *"Best score per person"* without the
"offline" note, and everyone's scores will be visible to the whole team.

> Setting the vars manually instead? Any Redis with an Upstash-compatible REST
> endpoint works — just set the same two variable names.

### 4. Share with the team

Send them the deployment URL. Each person types their name once (remembered in
their browser), picks a level, and their best score appears on the leaderboard.

---

## How the leaderboard works

- Every finished exam is posted to `/api/scores`.
- The sidebar shows the **best score per person**, ranked, with the level they took.
- Your own row is highlighted.
- If the API is unreachable, the app falls back to a local-only board and keeps
  working — it never blocks the exam.

## Levels

| Level | Bank | Paper | Time |
|---|---|---|---|
| Full Mock Exam | 138 | 60 | 120 min |
| Basic | 60 | 60 | 120 min |
| Scenario Practice | 78 | 60 | 120 min |

Basic includes the 12 official sample questions published in the CCAR-F Exam Guide.

---

## Run it locally

The question banks are fetched over HTTP, so **opening `index.html` straight from
disk will not work** — it has to be served.

### Option A — full app, including the leaderboard (recommended)

```bash
npm i -g vercel        # once
cd ccaf-app
cp .env.example .env.local   # then paste your real Upstash values into it
vercel dev
```

`vercel dev` serves the static files *and* runs `api/scores.js`, reading
`.env.local` automatically. Open the URL it prints (usually
`http://localhost:3000`).

To get the two values: Vercel project → **Storage** → your Upstash database →
**.env.local** tab (or the Upstash console → REST API). They look like:

```
KV_REST_API_URL=https://xxxx.upstash.io
KV_REST_API_TOKEN=AX...
```

`.env.local` is gitignored — don't commit it.

### Option B — questions only, no leaderboard

```bash
cd ccaf-app
python3 -m http.server 3000
```

The exam works fully; the sidebar shows *"offline (this browser only)"* because
there's no `/api/scores` in a plain static server. Fine when you're only editing
questions.

---

## Adding or editing questions

Each level is its own JSON file, so you never have to touch `index.html`:

```
questions/
  index.json      load order — add your new level's name here
  mock.json       pool: true, draws from every other bank
  basic.json      60 questions
  scenario.json   78 questions
```

A level file looks like:

```json
{
  "key": "scenario",
  "name": "Scenario Practice",
  "desc": "Production scenarios and exam-trap drills…",
  "ready": true,
  "count": 60,
  "blueprint": [{ "label": "Claude Code Config & Workflows", "pct": 17 }],
  "questions": [
    {
      "domain": "CI/CD",
      "d": 3,
      "q": "A CI job runs claude -p …",
      "options": ["…", "…", "…", "…"],
      "correct": 1,
      "explain": "Why this answer is right and the others aren't."
    }
  ]
}
```

Field notes:

- **`d`** — difficulty: `1` easy, `2` medium, `3` hard. Papers are built as a ramp
  (15 easy → 20 medium → 25 hard). If a tier is short, the shortfall is backfilled
  from the nearest tier with spares, so tag honestly rather than inflating.
- **`correct`** — index into `options` **as written**. Options are shuffled at
  runtime, so there's no need to vary the position by hand.
- **`count`** — paper length. If it's below the bank size, each sitting draws a
  fresh subset. Omit it to use the whole bank.
- **`pool: true`** — draw from every *other* level's bank instead of this file's
  own `questions` (that's how Full Mock Exam works).
- Prefix `q` with `SCENARIO — <name>.` to render a scenario context banner.

### Adding a whole new level

1. Create `questions/my-level.json` using the shape above.
2. Add `"my-level"` to the `levels` array in `questions/index.json`.

That's it — no code changes.

---

## Files

```
index.html         the app shell and all logic (no build step)
questions/*.json   question banks, one file per level
api/scores.js      serverless leaderboard endpoint
package.json       declares the Node runtime
.env.example       template for local Redis credentials
```
