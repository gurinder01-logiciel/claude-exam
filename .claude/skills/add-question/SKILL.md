---
name: add-question
description: Write, add or fix a CCAR-F exam question in questions/*.json — maps it to a BLUEPRINT.md task statement, checks SCOPE.md, writes it in the bank format with an honest difficulty tag, a near-miss distractor and an explanation that says why the distractor fails, then validates and gets an independent review. Use for "add a question about …", "write questions for task 3.3", or "fix question mock2#14".
argument-hint: "<topic or task statement, e.g. 3.3 path-specific rules> [target bank]"
---

# Add or fix a question

The bank is data only — no code change is needed (CLAUDE.md § Adding questions).
Work through every step; skipping the scope or review step is how out-of-scope
and two-right-answer items got into the bank before (see SCOPE.md, AUDIT.md).

## 1. Scope
- Find the task statement in `BLUEPRINT.md` (§ The 30 task statements) and the
  matching published objective. Quote its number (e.g. 3.3) in your report.
- Check `BLUEPRINT.md` § Genuinely out of scope and the cut list in `SCOPE.md`.
  If the topic is there, stop and tell the user instead of writing it.
- Grep the banks for the same concept so you don't add a near-duplicate:
  `grep -il "<key term>" questions/*.json`.

## 2. Pick the bank
- `basic.json` — standalone concept checks, usually `scenario: 0`.
- `scenario.json` — framed in one of the 6 official scenarios (ids 1–6, names
  in the `SCENARIOS` map in index.html).
- `core.json`, `mock1-6.json` — the Mock Exam Bank; only on request.

## 3. Write it
```json
{
  "domain": "Claude Code Config & Workflows",
  "d": 2,
  "scenario": 2,
  "q": "Stem ending in a clear question?",
  "options": ["…", "…", "…", "…"],
  "correct": 1,
  "explain": "Why the answer is right. '<near-miss>' is the near-miss: why it fails."
}
```
- `correct` is the index into `options` **as written** (the app shuffles). For a
  multiple-response item use an index array and say "(Select 2)" in the stem.
- `d` honestly: 1 = recall of one fact, 2 = apply a rule to a situation,
  3 = choose between two plausible mechanisms with a deciding detail. Inflated
  tags distort every paper (RAMP in index.html).
- **Options must not leak the answer.** Keep all four within ~15% of each
  other's length, same grammatical shape, no "always/never" only on wrong ones.
  The correct option must not be the longest by habit — `bank-audit` measures this.
- Include one **near-miss**: right mechanism, wrong detail.
- `explain` names the near-miss and why it fails, not only why the answer is right.

## 4. Validate
```bash
node .claude/hooks/check-bank.mjs questions/<bank>.json
```
(The PostToolUse hook also runs this after every edit to a bank and blocks on
errors.) Fix anything it reports.

## 5. Independent review
Dispatch the `question-reviewer` subagent with the file and the new question's
index. It has not seen your reasoning, which is the point. Apply its FIX items;
if it says CUT, tell the user rather than overriding it.

## 6. Report
Bank and index, task statement number, `d` and why, and the reviewer's verdict.
Do not edit `CCAF_Exam_Simulator.html` — it does not deploy (a hook blocks it).
