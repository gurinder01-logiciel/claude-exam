# Question bank audit

Last run: 2026-08-01. Scope authority: `BLUEPRINT.md`.

The bank went through four passes: a distractor-quality rewrite, a factual
verification against live docs, a scope map against the official objectives, and
a rebuild that cut, repaired, and added questions.

**Current state: 143 questions** — `basic.json` 49, `scenario.json` 94.

## 1. Distractor quality

The original bank leaked its answers through formatting alone.

| Metric | Before | Now |
| --- | --- | --- |
| Always-pick-B score | 81% | **25%** |
| Pick-longest-option score | 96% | **45%** |
| Correct-answer position spread | 0 / 112 / 12 / 0 | **37 / 36 / 35 / 35** |
| Correct vs. distractor length ratio | 2.2–3.3x | **1.0–1.04x** |
| Shortest option in bank | 8 chars | **75 chars** |

The residual 45% on "pick the longest" is not exploitable: the median length gap
between the correct option and the runner-up is **0 characters**, max 20. Every
question carries a designated near-miss distractor — right mechanism, wrong
detail — and each `explain` names that near-miss and says why it fails.

## 2. Factual verification

Eleven agents checked all questions against `code.claude.com/docs`,
`platform.claude.com/docs`, and `modelcontextprotocol.io`. Raw result: 116
confirmed, 5 flagged wrong, 17 unverifiable.

All 5 "wrong" flags were adjudicated by hand. **Four were false alarms:**

| Item | Agent claim | Adjudication |
| --- | --- | --- |
| PreToolUse exit codes | Marked answer says stderr is discarded | Agent misread which option was marked; the marked answer was correct |
| `.claude/rules/` `paths:` | Key is broken, real key is `globs:` | `paths:` is documented, and the official exam guide names it under task 3.3 |
| `context: fork` | Feature has open bugs | Open bugs are not documentation errors; the guide names it under task 3.2 |
| CLAUDE.md after compaction | SDK does not re-read it | Docs state compaction "reloads project context from disk" |

One genuine defect, **fixed**: an explanation claimed temperature 0 "makes output
reproducible". Anthropic's docs state results are not fully deterministic even at
0. The explanation now rejects that near-miss on both grounds.

`tool_choice` semantics were re-verified directly: `auto`, `any`, `tool`, `none`.

## 3. Scope correction

The first scope pass inferred scope from the exam guide's 30 task statements and
rejected 33 questions. Score-report screenshots and field reports from two
colleagues who passed showed that inference was too narrow — **`--bare` was
actually asked on a real sitting**, and the published objectives explicitly name
permission modes, cost and turn limits, settings permissions, MCP resources vs
tools, prefilled responses, and session resumption.

**30 of the 47 rejections were overturned.** Nothing had been deleted at that
point, so no good questions were lost.

## 4. The rebuild

- **Cut 13** — MCP wire-protocol items (`ListTools`/`CallTool`, transports, SSE,
  Inspector, Python SDK internals, `get_prompt`) plus `/goal`, routines, plugin
  marketplaces, and the TypeScript SDK Workflow tool. Eleven came from
  `basic.json`, which had been written as a concept quiz rather than a scenario
  bank.
- **Repaired 14 borderline** — each tested a real topic but hinged on a mechanic
  no objective states (hook exit-2 semantics, `agentId` handles, `auto` ignored
  from project settings). Nine were re-aimed at the named objective while keeping
  the scenario; five were replaced outright.
- **Added 18** weighted to the clusters the field reports describe: 6 CI/CD,
  5 Tool Design & MCP, 3 session state and resumption, 3 human review and
  confidence calibration, 1 structured-output truncation. This closed the two
  task statements that had zero coverage (1.7 and 5.5).
- **Replaced 1 duplicate** — two near-identical `tool_choice` items; one became a
  question on tool descriptions preventing misrouting, a named objective that had
  no coverage.

A 60-question mock draws comfortably: 34 items at d1, 74 at d2, 35 at d3 against
a 15/20/25 ramp.

## 5. Known limitations

- **Multiple-response items are not supported.** The real exam includes items
  asking for more than one answer and stating how many. This app is
  single-answer only. Candidates will not see that format here.
- **Scenario grouping is not implemented.** The real exam presents 4 scenarios
  drawn from 6, with questions sharing a context banner. This app draws a flat
  random paper, so it will not reproduce the reported clustering (one sitting was
  roughly one-third CI/CD).
- **Judgment questions cannot be sourced.** A number of items test architectural
  judgment ("which approach best reduces false positives"). Their answers are
  defensible and match the published objectives, but no single doc page proves
  them.
- **Version drift.** Claude Code ships weekly. Flag names, settings keys, and
  frontmatter keys rot first. Re-check anything asserting an exact name before
  each sitting.
- **Single-reviewer verification.** Each question was checked by one agent; only
  disputed items got a second pass.

## 6. Recommended next step

Connect Anthropic's hosted docs MCP server and re-run verification through it
instead of web search — exact-name lookups over `docs.claude.com` would settle
flag and key questions far more reliably than search snippets:

```
claude mcp add --transport http anthropic-docs https://mcp.docs.claude.com/mcp
```

Desktop app: Settings → Connectors → Add custom connector, URL
`https://mcp.docs.claude.com/mcp`.

## 7. Reverting

Originals are in git history:

```bash
git checkout questions/
```
