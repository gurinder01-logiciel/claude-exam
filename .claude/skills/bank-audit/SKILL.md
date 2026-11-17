---
name: bank-audit
description: Re-run the question-bank quality audit (length bias, answer positions, difficulty mix, duplicates across banks) and compare it with AUDIT.md. Use when asked to audit the bank, check distractor quality, or refresh AUDIT.md.
disable-model-invocation: true
context: fork
allowed-tools: Bash(node .claude/skills/bank-audit/audit.mjs), Read, Grep
---

# Bank audit

Measures whether the banks leak their answers through formatting, and finds
duplicate questions across files. Read-only unless the user asks for AUDIT.md
to be updated.

## Steps

1. Run the script and keep its markdown output:
   ```bash
   node .claude/skills/bank-audit/audit.mjs
   ```
2. Read `AUDIT.md` for the previous figures and the targets it set.
3. Report, per bank and overall:
   - **Pick-longest** — share of single-answer items where the correct option is
     the longest. Options are shuffled at runtime, so this is the bias that
     survives in the app. Near 25% (4 options) is clean; AUDIT.md accepted 45%
     only because the median length gap was ~0 chars. Flag any bank above 50%
     with a median gap above 15 chars as exploitable.
   - **Length ratio** — correct ÷ mean distractor length. AUDIT.md's target is
     1.0–1.04x.
   - **d mix** — compare against the RAMP in index.html (15/20/25 per 60). A
     bank tagged all one tier flattens every paper drawn from it.
   - **Duplicates** — pairs ≥ 70% word overlap. Say which copy to keep (the one
     with the better explanation) — never delete without asking.
4. End with the 3–5 worst offenders by name (`bank#index`) and a concrete fix
   for each, e.g. "lengthen distractors B and D to match the correct option".

## Updating AUDIT.md

Only when the user asks. Replace the "Current state" count and the metrics
table; keep the history sections. Never edit `CCAF_Exam_Simulator.html`.
