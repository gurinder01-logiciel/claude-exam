# Question bank audit — 2026-08-01

Two passes were run over all 138 questions in `questions/basic.json` (60) and
`questions/scenario.json` (78): a **distractor-quality rewrite** and a
**factual verification** against live Anthropic docs.

Read §3 before trusting any of this. The verification pass is useful but not a
guarantee.

## 1. Distractor-quality rewrite

The original bank leaked its answers through formatting, independently of
content. Measured before and after:

| Metric | Before | After |
| --- | --- | --- |
| Always-pick-B score | 81% | 25% |
| Pick-longest-option score | 96% | 46% |
| Correct-answer position spread (A/B/C/D) | 0 / 112 / 12 / 0 | 35 / 35 / 34 / 34 |
| Correct vs. distractor length ratio | 2.2–3.3x | 1.0–1.05x |
| Shortest option in bank | 8 chars | 75 chars |

The residual 46% on "pick the longest" is not an exploitable tell: the median
gap between the correct option and the runner-up is 3 characters and no gap
exceeds 20.

Every question now carries a designated **near-miss** distractor — right
mechanism, wrong detail — and its `explain` field names that near-miss and says
why it fails. Question stems, `domain`, and `d` were left untouched.

## 2. Factual verification

Eleven parallel agents checked each question against `code.claude.com/docs`,
`platform.claude.com/docs`, and `modelcontextprotocol.io`.

Raw verdicts: **116 confirmed, 5 flagged wrong, 17 unverifiable.**

All 5 "wrong" flags were then adjudicated by hand against primary docs. Four
were false alarms:

| Item | Agent claim | Adjudication |
| --- | --- | --- |
| basic #50 (PreToolUse exit codes) | Marked answer says stderr is discarded | **False alarm.** The agent misread which option was marked. Index 3 ("exit 1 is non-blocking, only exit 2 blocks and returns stderr") is marked and is correct. |
| scenario #33 (`.claude/rules/` scoping) | `paths:` frontmatter is broken; real key is `globs:` | **False alarm.** `paths:` is the documented key — see [prompt-caching](https://code.claude.com/docs/en/prompt-caching.md), which links "rules with `paths:` frontmatter". Agent cited a GitHub issue, not docs. |
| scenario #34 (`context: fork`) | Feature has open bugs, so question is unanswerable | **Not a docs defect.** Open bug reports are not the same as incorrect documented behaviour. Left as-is; see §3. |
| scenario #58 (CLAUDE.md after compaction) | SDK does not re-read CLAUDE.md after compacting | **False alarm.** [prompt-caching](https://code.claude.com/docs/en/prompt-caching.md) states compaction "reloads project context from disk" and that CLAUDE.md edits "load on the next `/clear`, `/compact`, or restart". |

One was a genuine, if minor, defect and has been **fixed**:

- **scenario #3** — the explanation asserted that temperature 0 "makes output
  reproducible". Anthropic's docs state results are not fully deterministic even
  at temperature 0. The explanation now says the near-miss fails on both counts.

Net result: **no question has a wrong answer key.** One explanation was corrected.

## 3. Known limitations — read this

- **17 questions are unverifiable from documentation.** They are design- and
  judgment-type items ("which approach best reduces false positives", "what
  should a subagent return on failure"). Their answers are defensible but rest
  on architectural opinion, not a citable source. If a candidate disputes one,
  there is no doc to point at. Consider cutting them from a graded sitting, or
  accepting that they are soft.
- **Some agents cited non-authoritative sources.** Several "confirmed" verdicts
  were backed by SEO content (`aiskillcerts.com`, `zuplo.com`, `morphllm.com`,
  `dev.to`) rather than primary docs. Those confirmations are weaker than the
  count in §2 implies.
- **Verification was not independently double-checked.** Each question was seen
  by one agent. Only the 5 disputed items were adjudicated by hand.
- **Version drift.** Claude Code ships weekly. Flag names, settings keys, and
  frontmatter keys are the first things to rot. Anything asserting an exact flag
  or key name should be re-checked before each sitting.
- **`context: fork` (scenario #34)** relies on a feature with multiple open bug
  reports. The documented behaviour is what the question tests, but a
  well-informed candidate might reasonably object.

## 4. Recommended next step

Connect Anthropic's hosted docs MCP server and re-run verification through it
rather than through web search — it gives exact-name lookups over
`docs.claude.com` and would settle flag- and key-name questions far more
reliably than search snippets:

```
claude mcp add --transport http anthropic-docs https://mcp.docs.claude.com/mcp
```

In the Claude desktop app: Settings → Connectors → Add custom connector, URL
`https://mcp.docs.claude.com/mcp`.

## 5. Reverting

Originals remain in git history. To discard both passes:

```bash
git checkout questions/
```
