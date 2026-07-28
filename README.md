# CCAR-F Exam Simulator — team edition

A full mock of the **Claude Certified Architect – Foundations (CCAR-F)** exam:
60 scenario questions, 120 minutes, pausable timer, and a shared team leaderboard.

- **138-question bank**, all Claude-anchored (Claude Code, MCP, Agent SDK, CI/CD)
- Papers follow a **difficulty ramp** — 15 easy, then 20 medium, then 25 hard
- Every sitting produces a **different paper**
- Right-click an option to cross it out as "definitely not this" — it stays crossed in review
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

## Files

```
index.html      the whole app (no build step)
api/scores.js   serverless leaderboard endpoint
package.json    declares the Node runtime
```

## Adding questions

Question banks live in the `LEVELS` object near the top of the `<script>` in
`index.html`. Each entry looks like:

```js
{ domain: "CI/CD", d: 3, q: "...", options: ["...","...","...","..."], correct: 1, explain: "..." }
```

- `d` is difficulty: `1` easy, `2` medium, `3` hard. Papers are built as a ramp
  (15 easy → 20 medium → 25 hard), so tag accurately. If a bank is short in one
  tier the shortfall is backfilled from the nearest tier that has spares — only
  the Full Mock Exam's 138-question bank is currently deep enough to hit the
  exact 15/20/25 shape.
- `correct` is the index into `options` **as written**; options are shuffled at
  runtime, so no need to vary the position by hand.
- Prefix `q` with `SCENARIO — <name>.` to render a scenario context banner.
