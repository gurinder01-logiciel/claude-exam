# CCAR-F Exam Simulator — team edition

A self-hosted mock of the **Claude Certified Architect – Foundations (CCAR-F)**
exam: 60 scenario questions in 120 minutes, with a shared team leaderboard.

- **138-question bank**, every question anchored to Claude — Claude Code, MCP,
  the Agent SDK, the Messages and Batches APIs
- Papers follow a **difficulty ramp** (15 easy → 20 medium → 25 hard) and are
  drawn fresh each sitting, so there's nothing to memorise
- **120-minute pausable timer** at the real exam's pace of 2 min/question
- **Right-click to cross out** an option as "definitely not this" — it stays
  crossed through the review
- **Instant feedback** (optional): marks each pick right or wrong *without*
  revealing the correct answer
- **Score out of 1000** with a domain breakdown and per-question explanations
- **Team leaderboard** ranking each person's latest score, plus a **My profile**
  view with their full attempt history
- **Scenario blocks like the real exam** — the Full Mock draws 4 of the 6
  official scenarios, each framing a run of consecutive questions under a shared
  context banner
- **Levels unlock in order** — Foundations first, then Scenario Practice, then
  the Full Mock Exam, so nobody skips the fundamentals

Full reference: **[DOCS.md](DOCS.md)**

---

## Deploy to Vercel

### 1. Check the folder structure

This matters — a flattened folder is the most common cause of a broken deploy:

```
.
├── index.html
├── questions/
│   ├── index.json
│   ├── mock.json
│   ├── basic.json
│   └── scenario.json
├── api/
│   └── scores.js
├── package.json
├── .gitignore
├── README.md
└── DOCS.md
```

`api/scores.js` must be inside `api/`, and the four JSON files inside
`questions/`. Verify:

```bash
ls questions api
```

### 2. Push to GitHub

```bash
git init                       # skip if already a repo
git add -A
git commit -m "CCAR-F exam simulator"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

### 3. Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
2. **Framework preset: Other.** Leave build command and output directory empty —
   there's no build step.
3. Click **Deploy**.

The app is live at this point, but the leaderboard will say
*"offline (this browser only)"* until step 4.

> Prefer the CLI? `npm i -g vercel && vercel` from the project folder does the
> same thing, and `vercel --prod` promotes it to production.

### 4. Add Redis for the shared leaderboard

The leaderboard needs storage shared across everyone's browsers.

1. In your Vercel project → **Storage** → **Create Database**
2. Choose the **Upstash for Redis** integration (free tier is plenty)
3. Connect it to this project. Vercel injects these automatically:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
4. **Redeploy** — Deployments → ⋯ → Redeploy. Env vars are only picked up by a
   new deployment.

Check it worked: the sidebar heading should read *"Best score per person · pass
mark 720"* with **no** "offline" note. Or hit `https://<your-app>/api/scores` —
it should return `{"scores":[]}` rather than an error.

### 5. Share with the team

Send the deployment URL. Each person types their name once (remembered in their
browser), picks a level, and their latest score appears on the leaderboard.

Names must be unique: the name gate rejects a name already on the leaderboard
(compared ignoring case and extra spaces). The account menu at the top-right
holds **My history** and **Sign out**; signing out and back in with the same name
works on the same browser, because the last name used is remembered and exempted
from the check. Clearing browser storage or moving to another laptop does lose
that exemption — there, the name is taken and a new one is needed.

**Note:** the leaderboard has no authentication — anyone can submit any name and
score, and the uniqueness check is client-side only, so `POST /api/scores` will
still accept a duplicate name. That's fine for team practice, but don't treat it
as a source of truth for reporting.

---

## Run it locally

The question banks are fetched over HTTP, so **opening `index.html` from disk
won't work**.

```bash
npm i -g vercel
cp .env.example .env.local     # paste your real Upstash values
vercel dev
```

`vercel dev` serves the static files *and* runs `api/scores.js`, reading
`.env.local` automatically.

Only editing questions? `python3 -m http.server 3000` is enough — the exam works,
the leaderboard just shows "offline".

---

## Adding questions

Each level is its own JSON file, so you never touch `index.html`:

```json
{
  "domain": "CI/CD",
  "d": 3,
  "q": "A CI job runs claude -p …",
  "options": ["…", "…", "…", "…"],
  "correct": 1,
  "explain": "Why this is right and why the tempting distractor isn't."
}
```

- `d` is difficulty: `1` easy, `2` medium, `3` hard — it drives the ramp, so tag
  honestly
- `correct` is the index into `options` as written; options are shuffled at runtime

To add a whole level: create `questions/my-level.json` and add `"my-level"` to
the `levels` array in `questions/index.json`. See [DOCS.md](DOCS.md) §7 for the
full schema.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| "Couldn't load questions" | Serve over HTTP; check `questions/` sits beside `index.html` |
| 404 on `questions/index.json` | Files were flattened — `mkdir -p questions && mv basic.json index.json mock.json scenario.json questions/` |
| `/api/scores` 404s on Vercel | `mkdir -p api && mv scores.js api/scores.js`, commit, redeploy |
| Leaderboard "offline" on Vercel | Attach the Upstash integration, then **redeploy** |
| Can't change an answer | Instant feedback is on — first pick is final by design |

More in [DOCS.md](DOCS.md) §9.
