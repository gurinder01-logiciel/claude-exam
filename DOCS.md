# CCAR-F Exam Simulator — Documentation

Full reference for the Claude Certified Architect – Foundations practice app.
For a quick start, see [README.md](README.md).

---

## 1. What this is

A self-hosted mock exam that mirrors the real **CCAR-F** exam format, plus a
shared leaderboard so a team can track who has passed.

| Real exam | This app |
|---|---|
| 60 questions | 60 questions per paper |
| 120 minutes | 120 minutes (2 min/question, enforced on every level) |
| Pass mark 720/1000 | Pass mark 720/1000 |
| Scenario-based | Every question is scenario- or decision-based |
| 4 of 6 scenarios, randomised | Papers drawn fresh from the bank each sitting |
| Strike-through on options | Right-click (or ✕) to cross out an option |

**Not the same as the real exam:** the real exam does not order questions by
difficulty, and gives no feedback until the end. This app ramps difficulty and
offers an optional instant-feedback mode, because it's a study tool. Use
*Full Mock Exam* with instant feedback **off** for the closest simulation.

---

## 2. Question bank

**138 unique questions**, every one anchored to Claude (Claude Code, MCP, the
Agent SDK, the Messages/Batches API) — verified, no generic LLM-trivia.

Coverage by domain:

| Domain | Questions |
|---|---|
| Claude Code (config, hooks, skills, CLAUDE.md, rules) | 33 |
| MCP (scopes, transports, tools/resources/prompts, Inspector) | 20 |
| Agentic Architecture (loops, stop_reason, plan mode) | 15 |
| Multi-Agent (delegation, context isolation, error propagation) | 12 |
| CI/CD (headless `-p`, session isolation, review architecture) | 11 |
| Structured Output (schemas, nullable, enums, validation-retry) | 10 |
| Tool Design (descriptions, tool_choice, confirmation gates) | 9 |
| Context Management (compaction, lost-in-the-middle, state objects) | 9 |
| Claude API / Agent SDK (permission modes, Batches, statelessness) | 7 |
| Prompt Engineering (explicit criteria, few-shot) | 5 |
| Official scenario sets (Support Agent, Code Gen, Dev Productivity) | 7 |

Counts above describe the original bank. The current bank is **143 questions**,
every one tagged to a scenario; see `SCOPE.md` for the scope map and `AUDIT.md`
for the rewrite and verification history.

### Sources

- The **12 official sample questions** published in the CCAR-F Exam Guide,
  verbatim, inside `basic.json`
- The guide's **Test Objectives** table — coverage was audited against it and
  gaps were filled (parallel tool calls, goal-oriented vs procedural delegation,
  subagent spawn diagnosis, dynamic decomposition, orchestration patterns, test
  generation quality, specialised review passes, format normalisation, enums,
  sliding windows)
- Official Anthropic docs for settings precedence, hook exit codes, MCP scopes,
  and Agent SDK permission modes
- Real exam intel from a colleague who sat it (CI/CD is heavily weighted)

---

## 3. Levels

| # | Level | Bank | Paper | Difficulty mix (easy/med/hard) | Unlocked by |
|---|---|---|---|---|---|
| 1 | **Basic** | 60 | 60 | 31 / 18 / 11 | — (always open) |
| 2 | **Scenario Practice** | 78 | 60 | 9 / 51 / 18 | finishing Basic |
| 3 | **Full Mock Exam** | 138 (all banks) | 60 | 15 / 20 / 25 | finishing Scenario Practice |

### Progression

Levels unlock in order. Only **Basic** is available to a new user; finishing it
opens **Scenario Practice**, and finishing that opens **Full Mock Exam**. Without
this, everyone jumps straight to the mock and skips the foundations.

A level is unlocked by **completing** the one before it (submitting the exam) —
not by passing it. The gate exists to enforce order of study, not to punish a
low score.

Locked levels stay **visible but greyed out**, with a note saying what unlocks
them. Hiding them entirely would mean nobody knows the app has more to offer.

Progress is stored per person in `localStorage` under `ccaf_completed:<name>`
(name lowercased and whitespace-collapsed by `normName()`), so signing out and in
as someone else does not hand over their unlocks. `adoptLegacyProgress()` moves
the old shared `ccaf_completed` key onto whoever is signed in the first time the
app loads after this change, then deletes it. Progress is still per browser as
well — the same person on a different machine starts locked — and clearing site
data resets it. This is a study aid, not a security boundary.

It's configured in the level JSON, not in code:

```json
{ "key": "scenario", "requires": "basic", ... }
```

- **Full Mock Exam** pools every other level's questions and presents them as
  **4 scenarios drawn from the official 6**, weighted toward the agentic-heavy
  scenarios. 60 questions. This is the one to use for realistic practice.
- **Foundations** is an ungrouped warm-up across all five domains. Its bank is
  49, so every question appears every time.
- **Scenario Practice** draws 40 questions as **3 scenario blocks**, weighted
  toward Claude Code for CI/CD — the cluster candidates most often report.

### Scenario blocks

The real exam presents 4 scenarios out of 6, with each scenario framing a run of
consecutive questions. A level opts into this with `scenarioPick`, and biases
which scenarios get drawn with `scenarioWeights`. Questions from one scenario
always arrive as a single unbroken block — never interleaved — and the first
question of each block carries the full scenario context, with later questions
in the block showing a compact reminder.

If the drawn scenarios don't between them hold enough questions for the paper,
extra scenarios are pulled in rather than shipping a short paper.

### The difficulty ramp

Papers open easy and finish hard. The target shape is **15 easy → 20 medium →
25 hard**, scaled to the paper length. Tier quotas are allocated by largest
remainder so a paper is always exactly its requested length. Within a scenario
paper the ramp applies inside each block, and blocks are ordered by mean
difficulty so the paper as a whole still opens gently.

If a bank doesn't have enough in one tier, the shortfall is **backfilled from
the nearest tier with spares** rather than padding the paper or shrinking it.
That's why only Full Mock Exam hits the exact 15/20/25 — Scenario Practice has
only 9 easy and 18 hard questions in its bank, so it gives all of both and fills
the middle from medium.

Within each tier the order is shuffled, so the paper still varies between
sittings. Answer options are shuffled on every question, so the correct answer
never sits in a fixed slot.

---

## 4. Features

### Timer
120 minutes for a 60-question paper (2 min/question on every level). **Pause**
stops the clock entirely — for real breaks. Amber under 15 minutes, red and
blinking under 5.

### Strike-through
**Right-click** an option (or tap the ✕) to cross it out as "definitely not
this". Crossed options stay crossed and are labelled *"you crossed out"* in the
review, so you don't re-read options you already eliminated. This mirrors a
feature of the real exam.

### Instant feedback (on by default)
The toggle sits at the top of the start screen. Once an item is answered it is
marked ✓ or ✗, the correct option(s) are highlighted, and the explanation is shown
— on a wrong pick the correct answer is spelled out too.

In this mode **your first pick is final**. Without that lock, seeing "wrong" and
switching would make the score meaningless.

During an exam the right-hand panel (`#prep`) shows a numbered question grid:
click a number to jump to it. It also shows "Question N / M", so on wide screens
the count and progress bar above the card are hidden as duplicates.
With feedback on, cells turn green/red and a live pass percentage (correct ÷
answered, against the 72% pass mark) is shown. With feedback off, cells only mark
"answered", so real-exam mode gives nothing away. `renderExam()` calls
`syncPrep()` to keep it current.

Turn it off for real exam conditions.

**Start screen.** Compact cards so every exam fits on one screen: the Exam Path
as three cards in a row, the Mock Exam Bank as a tile grid, then the quiz
builder. How to prepare is a separate screen (📚 button by the title), and the
team leaderboard sits at the bottom of the page (`.board-dock`, hidden during an
exam on wide screens; still the 🏆 drawer at 1080px and below).

**Moving between questions.** Besides Prev/Next under the card, round ‹ › arrows
sit on either side of the question card, pinned at mid-screen (sticky inside a
full-height rail), so a long explanation never pushes navigation out of reach;
on the last question the right arrow becomes ✓ Submit. ←/→ on the keyboard do the
same, except while typing or when a pause/confirm overlay is open. Every move
scrolls back to the top. The side arrows hide below 760px wide.

**Where the explanation shows.** Wider than 1080px, the verdict, correct answer
and explanation appear in the left column under the leaderboard (`#explainSide`,
inside `.left-col`, which is the sticky element and scrolls if both are tall), so
the question card stays short. At 1080px and below, where the leaderboard becomes
a drawer, the same panel renders inline under the options. `renderExam()` writes
both copies and CSS shows one; `syncPrep()` clears the side copy off the exam screen.

### Results
- Score out of 1000, with pass/fail against 720
- Correct / wrong / skipped counts and time used
- Domain-by-domain breakdown with colour-coded bars
- Full question review with explanations, filterable: All / Wrong only /
  Skipped / Flagged

### Flag
Mark a question to revisit. Flagged questions get their own review filter.

### Scenario banners
Questions from the official guide's named scenarios render a context banner
(*"Scenario · Claude Code for Continuous Integration"*), matching how the real
exam frames them.

---

## 5. Leaderboard

Each person enters a name once (remembered in their browser). Finished exams post
to `/api/scores`, and the sidebar shows the **latest score per person**, ranked
by that score, with the level they took and an attempt count once they have more
than one. Your own row is highlighted.

Every attempt is retained in Redis, so **My history** — in the account menu at
the top-right — opens a read-only view for the signed-in name: attempts, best
score, latest score, passes, and one row per sitting newest-first. It reuses the
board payload, so there's no extra endpoint.

The account menu is an initials avatar fixed to the top-right corner. It holds
**My history** and **Sign out**, and `syncUserMenu()` shows it only on the
`start`, `results`, and `profile` screens — never during `exam` or `paused`,
where swapping `#app` would tear down the question screen while the timer kept
running. Sign out drops `ccaf_name` but leaves each person's
`ccaf_completed:<name>` intact, so your own unlocks survive signing back in
without leaking to the next person who uses the browser.

Because the name is the only identity the app has, the name gate enforces
uniqueness: `nameIsTaken()` normalises case and collapsed whitespace, then
rejects any name already present in the board payload. It fetches the board
before deciding, so a cold start can't wave a duplicate through; offline (board
unreachable) it has nothing to compare against and lets the name pass. The
change-name flow exempts your own current name. This is a client-side guard
only — `POST /api/scores` still accepts duplicates. Trade-off: clearing
localStorage or switching browsers locks a person out of re-using their name.

The sidebar sits on the **left** on desktop; below 1080px it becomes a drawer
opened by the 🏆 button.

### Page layout

On wide screens the shell is three columns: leaderboard on the left (`.sidebar`,
placed there by `order: -1`), the main column in the middle, and the **How to
prepare** panel on the right (`.prep`, sticky). Both side columns live outside
`#app`, so they are not rewritten by the `render*()` functions — `syncPrep()`
fills the prep panel and is called from `syncUserMenu()`, which already runs on
every screen transition. The panel shows on the start screen only; during an
exam it would compete with the question.

Below 1340px there is no room for three columns, so `.prep` wraps to its own
full-width row beneath the main column. Those overrides are declared *after* the
base `.prep` rule rather than up with the other media queries — a media query
adds no specificity, so an earlier one would lose to the later base rule.

### Storage

`api/scores.js` is a Vercel serverless function backed by Redis over Upstash's
REST API — **no npm packages**. It keeps the most recent 500 entries
(`MAX_ENTRIES`).

| Method | Behaviour |
|---|---|
| `GET /api/scores` | `{ scores: [...] }` |
| `POST /api/scores` | body `{ name, score, passed, level, total }` → `{ ok: true }` |

Validation: name ≥ 2 chars (trimmed, capped at 40), score a finite number
0–1000. Anything else returns 400.

### Graceful degradation

If the API is unreachable — no Redis env vars, offline, or served from a plain
static server — the leaderboard falls back to a local-only board and the sidebar
says *"offline (this browser only)"*. **The exam is never blocked by leaderboard
failure.** That's deliberate.

### No authentication

Anyone can submit any name and score. Fine for internal team practice; **not
suitable as a source of truth for manager reporting or compliance**. If you need
that, the leaderboard needs real auth.

---

## 6. Architecture

```
index.html         app shell, all logic, no build step (~1030 lines)
questions/
  index.json       load order — the manifest
  mock.json        pool config (no questions of its own)
  basic.json       49 questions (Foundations)
  scenario.json    94 questions (Scenario Practice)
  core.json        40 questions (Core Concepts Drill)      ┐ "Mock Exam Bank"
  mock1-6.json     60/58/56/54/51/55 (Mock Exam 1-6)       ┘ section
                   Imported from the CCA Foundations Prep artifact; mock items
                   are MIT-licensed, see each file's `source`/`licence`. d: core
                   1, mocks 1-3 → 2, mocks 4-6 (labelled hard by the source) → 3.
                   Multi-select and disputed source items were dropped, hence <60.
api/scores.js      serverless leaderboard endpoint
package.json       declares the Node runtime for Vercel
.env.example       template for local Redis credentials
.gitignore         excludes .env.local, .vercel, node_modules, .DS_Store
```

No framework, no bundler, no dependencies. `index.html` fetches the question
banks at boot, so **the app must be served over HTTP** — opening `index.html`
straight from disk shows a clear error screen explaining how to serve it.

### Key constants (`index.html`)

```js
const SECONDS_PER_QUESTION = 120;  // real exam pace
const FULL_EXAM_COUNT = 60;        // real exam length
const PASS_SCORE = 720;            // out of 1000
const RAMP = [{d:1,n:15},{d:2,n:20},{d:3,n:25}];
const SCENARIOS = { 1: …, 6: … };  // the six official exam scenarios
```

---

## 7. Question schema

```json
{
  "domain": "CI/CD",
  "d": 3,
  "scenario": 5,
  "q": "A CI job runs claude -p …",
  "options": ["…", "…", "…", "…"],
  "correct": 1,
  "explain": "Why this is right and why the tempting distractor isn't."
}
```

| Field | Notes |
|---|---|
| `domain` | Free text; drives the results breakdown and the tag shown on each question |
| `d` | Difficulty: `1` easy, `2` medium, `3` hard. Drives the ramp — **tag honestly**, inflating it just makes your practice scores misleading |
| `scenario` | Which of the six official exam scenarios this belongs to, `1`–`6`. Use `0` for a standalone concept check with no narrative. Drives scenario grouping and the context banner |
| `q` | Question text. The legacy `SCENARIO — <name>.` prefix still renders a banner, but prefer the `scenario` field |
| `options` | Four options recommended. Order as written; shuffled at runtime |
| `correct` | Index into `options` **as written**. No need to vary the position by hand. An array of indices (e.g. `[0, 2]`) makes it a **multiple-response** item: the candidate is told to "Select N", it counts as answered only once N options are chosen, and it scores only if every pick is correct — no partial credit, as on the real exam |
| `explain` | Shown in the review. Explain why distractors fail, not just why the answer is right — that's where the exam's difficulty lives |

### Level file schema

```json
{
  "key": "scenario",
  "name": "Scenario Practice",
  "desc": "Shown on the level card",
  "ready": true,
  "count": 40,
  "pool": false,
  "scenarioPick": 3,
  "scenarioWeights": { "5": 4, "4": 2, "2": 2, "1": 1, "3": 1, "6": 1 },
  "blueprint": [{ "label": "Claude Code Config & Workflows", "pct": 17 }],
  "questions": [ … ]
}
```

- `count` — paper length. Below the bank size ⇒ a fresh subset each sitting.
  Omit to use the whole bank.
- `pool: true` — draw from every *other* level's bank instead of this file's own
  questions. That's how Full Mock Exam works.
- `scenarioPick` — draw this many scenarios and group the paper into blocks.
  Omit for a flat, ungrouped paper.
- `scenarioWeights` — bias which scenarios get drawn, keyed by scenario id as a
  string. Higher is likelier; unlisted scenarios default to 1.
- `blueprint` — the scenario-mix bar on the level card. Percentages should total
  100.
- `ready: false` — shows the level as "Soon" and disables it.
- `section` — `"path"` (default: the gated Exam Path) or `"bank"` (Mock Exam
  Bank: always unlocked, compact cards without the blueprint bar).
- `inPool: false` — keep this bank out of pool levels, so Full Mock Exam stays
  built from the Exam Path banks only. Every bank level sets it.

### Custom quiz builder
Sits at the top of the Mock Exam Bank section. Pick one or more official domains
(or all), exam weighting (27/18/20/20/15) or an equal split, and 10/20/30/60
questions. It draws from every non-pool level in both sections. The older banks
use loose domain labels; `DOMAIN_OF` in `index.html` maps the clear ones (e.g.
`MCP` → Tool Design, `CI/CD` → Claude Code), while `Claude API`, `Support Agent`,
`Code Gen` and `Dev Productivity` are left out of custom quizzes. Picked questions
are relabelled with the official domain name for the results breakdown. Custom
quizzes neither unlock levels nor post to the leaderboard.

### Adding a level

1. Create `questions/my-level.json` using the shape above.
2. Add `"my-level"` to the `levels` array in `questions/index.json`.

No code changes.

---

## 8. Local development

The question banks are fetched, so the app has to be served.

### Full app, with the leaderboard

```bash
npm i -g vercel                # once
cp .env.example .env.local     # then paste your real Upstash values
vercel dev
```

`vercel dev` serves the static files *and* runs `api/scores.js`, reading
`.env.local` automatically. Open the URL it prints (usually
`http://localhost:3000`).

### Questions only

```bash
python3 -m http.server 3000
```

Exam works fully; leaderboard shows *"offline"* because a static server has no
`/api/scores`. Fine when you're only editing questions.

---

## 9. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| "Couldn't load questions" screen | Opened `index.html` from disk, or `questions/` isn't beside `index.html` | Serve over HTTP; check the folder structure in §6 |
| 404 on `questions/index.json` | Files got flattened into the project root instead of a `questions/` subfolder | `mkdir -p questions && mv basic.json index.json mock.json scenario.json questions/` |
| Leaderboard says "offline" on Vercel | Redis env vars missing, or added without redeploying | Attach the Upstash integration, then **redeploy** |
| Leaderboard offline locally | Using a plain static server, or `.env.local` missing | Use `vercel dev` with `.env.local` |
| `/api/scores` returns 404 on Vercel | `scores.js` is at the repo root instead of `api/` | `mkdir -p api && mv scores.js api/scores.js` |
| Can't change an answer | Instant feedback is on — first pick is final by design | Turn the toggle off for free-form answering |
| Paper isn't 15/20/25 | That bank doesn't have enough easy or hard questions; shortfall is backfilled | Expected. Use Full Mock Exam for the exact shape |

---

## 10. Deliberate design decisions

Worth knowing before you change things:

- **Difficulty tags are not inflated.** Scenario Practice could show "25 hard" by
  re-tagging medium questions, but then the difficulty labels would mean nothing
  and your practice scores would flatter you.
- **Instant feedback locks the first pick.** Otherwise you could switch after
  seeing "wrong" and the score would be fiction.
- **Instant feedback defaults to on.** Most sittings are study sessions, where
  seeing the answer and explanation straight away is the point. Turn it off for
  a realistic run.
- **Leaderboard failure never blocks the exam.** A study tool that refuses to run
  because a database is down is worse than one with a stale leaderboard.
- **Native `confirm()` is not used.** It's blocked in sandboxed iframes and
  silently returns false, which made buttons appear dead. The app uses its own
  dialog.
- **Every question mentions Claude explicitly.** Generic LLM-architecture
  questions were rewritten, not deleted — the concepts are examinable, but the
  framing should match what you'll actually see.
