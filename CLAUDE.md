# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A self-hosted mock of the CCAR-F (Claude Certified Architect – Foundations) exam:
60 questions / 120 minutes / pass mark 720-of-1000, plus a shared team
leaderboard. No framework, no bundler, no npm dependencies, no build step.
`package.json` exists only to declare `"type": "module"` and the Node runtime for
Vercel.

`README.md` covers deploy + setup; `DOCS.md` is the full reference (§7 = question
schema, §9 = troubleshooting). Keep both in sync when behaviour changes.

## Commands

```bash
vercel dev                     # full app incl. /api/scores (reads .env.local)
python3 -m http.server 3000    # questions only; leaderboard shows "offline"
vercel --prod                  # promote to production
```

There is no build, lint, or test suite — verification is manual in the browser.
The question banks are `fetch`ed, so **opening `index.html` from `file://` will
not work**; it renders an explicit error screen in that case.

The leaderboard needs `KV_REST_API_URL` and `KV_REST_API_TOKEN` (Upstash Redis
REST). Vercel's Upstash integration injects them; locally put them in
`.env.local` — `cp .env.example .env.local` and fill in the two values.
(`.gitignore` ignores `.env*` but negates `!.env.example`, so keep that
exception if you touch it.)

## Architecture

Three moving parts:

- **`index.html`** — the entire app: markup, CSS custom properties, and all logic
  in one inline `<script>`. This is the file to edit.
- **`questions/`** — data only. `index.json` is a manifest (`{"levels": [...]}`)
  naming which `questions/<folder>/<name>.json` files to load, in order (one folder per track:
  `developer/`, `architect/`, `claude-code/`, `mock/`).
- **`api/scores.js`** — single Vercel serverless function, `GET`/`POST
  /api/scores`, backed by a Redis list (`ccaf:scores`, capped at 500 entries) via
  raw `fetch` to Upstash's REST API. No SDK.

`CCAF_Exam_Simulator.html` is an older self-contained snapshot with the question
bank inlined (`const LEVELS = {...}`). It is not what deploys — don't edit it
when fixing the app, and don't assume changes there take effect.

### Level and paper generation

`loadLevels()` reads the manifest, fetches each level file, and normalises it
into the `LEVELS` map keyed by `lv.key`. A level file is metadata plus its own
`questions` array; two flags drive composition:

- `count` below the bank size ⇒ a fresh random subset each sitting.
- `pool: true` ⇒ ignore this file's own questions and draw from every *non-pool*
  level's bank. That's how Full Mock Exam works — `mock.json` has an empty
  `questions` array by design.
- `requires: "<key>"` gates the level behind completing another one.

- `scenarioPick: N` (+ optional `scenarioWeights: {"<id>": weight}`) ⇒
  `buildScenarioPaper()` draws N scenarios (weighted), splits `count` across them,
  and emits each as a consecutive block, blocks ordered by mean difficulty.
  Questions are grouped by their numeric `scenario` field; items without one are
  excluded from scenario papers. Scenario names/blurbs live in the `SCENARIOS`
  map in `index.html`, not in the JSON.

`buildRampedPaper()` orders every paper as a difficulty ramp using
`RAMP = [{d:1,n:15},{d:2,n:20},{d:3,n:25}]`, scaled to the paper length, then
backfills any tier shortfall from the nearest tier. So a bank whose `d` tags are
inflated silently distorts every paper drawn from it — tag `d` honestly.

Options are shuffled at runtime by `prepQuestions()`, which remaps `correct` to
the shuffled indices. Authors write `correct` as the index into `options` as
written — or an array of indices for a multiple-response item. Internally
`correct` is *always* a sorted index array and `q.multi` records which form the
author used; answers are `null` or an index array. `isAnswered()` requires
exactly `correct.length` picks and `isRight()` gives no partial credit — use
those helpers rather than comparing answers directly.

### Client state

One mutable `state` object (`screen`, `questions`, `answers`, `struck`, `flagged`,
`timeLeft`, `instantFeedback`) plus a `user` object; each `render*()` function
rewrites `#app` wholesale and re-attaches listeners. There is no diffing — after
mutating `state`, call the matching render.

The leaderboard (`#board`, in `.board-dock` below the page), the right panel
(`#prep`) and the left column (`.left-col` → `#explainSide`) are siblings of
`#app`, so `render*()` never touches them. They're kept in step by
`syncUserMenu()` — which also calls `syncPrep()` — invoked at the end of every
render. `syncPrep()` stamps `body[data-screen]`, which CSS uses to show the left
column only during an exam and widen the start screen. `#prep` is empty outside
an exam; during `exam`/`paused` it shows `renderPalette()`, the numbered question
grid. How to prepare (`resources.json`, loaded by `loadResources()`, hidden
silently on failure) is its own screen, `renderPrepPage()`, opened from the
button on the start screen.
Adding chrome outside `#app` means wiring it in there too. See DOCS.md
§ Page layout.

`instantFeedback` defaults to `true`: once a question is answered it locks and
shows the verdict, correct option and `explain`.

Timing is always 2 min/question (`SECONDS_PER_QUESTION`), derived per level from
`count`, so it holds on shorter levels too. Scoring in `renderResults()` is
`round(correct / total * 1000)`; the same pass also builds the domain breakdown,
marks the level complete, and posts the attempt.

`localStorage` holds the active name (`ccaf_name`), the last name used on this
browser (`ccaf_last_name`, which survives sign-out so the uniqueness check can
exempt it), and completed levels per person under `ccaf_completed:<name>` — so
level unlocks are per person *and* per browser: signing in as someone else starts
locked, the same person on another machine also starts locked, and clearing
storage relocks everyone. Leaderboard failures degrade to a local-only board
rather than surfacing an error.

The endpoint is unauthenticated by design (team practice tool); it validates name
length and a 0–1000 score range, nothing more.

## Claude Code setup (`.claude/`)

- **Hooks** (`.claude/settings.json`): after any Edit/Write to a bank under `questions/` (any depth),
  `.claude/hooks/check-bank.mjs` validates the bank and blocks (exit 2) on bad
  `correct` indices, `d`, `scenario`, empty `explain` or duplicate options. Edits to
  `CCAF_Exam_Simulator.html` are blocked outright. Run the validator by hand with
  `node .claude/hooks/check-bank.mjs [file …]`.
- **Skills**: `/add-question` (scope → write → validate → independent review) and
  `/bank-audit` (length bias, answer positions, d mix, duplicates vs `AUDIT.md`).
- **Subagent**: `question-reviewer` — read-only PASS / FIX / CUT review of questions
  against `BLUEPRINT.md` and `SCOPE.md`.

## Adding questions or a level

Edit the bank files under `questions/` only — no code change is needed (unless you add a new
scenario id, which needs a `SCENARIOS` entry). Per-question fields: `domain`
(free text, drives the results breakdown), `d` (1/2/3), `q` (prefix
`SCENARIO — <name>.` to render a context banner — legacy; prefer `scenario`),
`scenario` (`1`–`6` official Foundations scenario, `11`–`16` Professional practice scenario, `0` for a standalone concept check), `options`, `correct` (index or index array),
`explain`.

Scope authority for what belongs in the bank is `BLUEPRINT.md` (official exam
guide task statements); `SCOPE.md` records per-question scope verdicts and
`AUDIT.md` the last bank audit. Check a new question against them. Explanations should say why the tempting distractor fails, not just
why the answer is right.

A new level = create `questions/<track>/<name>.json` in the level shape (see DOCS.md §7)
and append `"<track>/<name>"` to `levels` in `questions/index.json`.
