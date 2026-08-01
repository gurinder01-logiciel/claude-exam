# Scope map against the official CCAR-F objectives

Corrected pass. The first pass used scope inferred from the exam guide's 30 task
statements and rejected 33 questions. Score-report screenshots and field reports
from two colleagues who passed showed that list was too narrow — notably `--bare`
was actually asked. **30 of the 47 rejections were overturned.**

| Verdict | basic | scenario | total |
| --- | --- | --- | --- |
| IN_SCOPE | 40 | 71 | 111 |
| BORDERLINE | 9 | 5 | 14 |
| OUT_OF_SCOPE | 11 | 2 | 13 |

Nothing has been deleted. This is the decision list.

## Out of scope — recommend cutting (13)

| Question | Reason |
| --- | --- |
| `basic#9` When should you choose SSE/HTTP transport over stdio for an MCP server? | MCP wire-protocol bullet: transport negotiation, SSE deprecation. |
| `basic#12` You can describe exactly what 'done' looks like (all tests pass, zero type errors) better … | Claude Code surface with no plausible link to any objective; /goal is unnamed anywhere. |
| `basic#16` You want a dependency audit to run every morning at 9am with no machine of yours staying o… | Claude Code surface bullet: routines explicitly excluded. |
| `basic#19` A community plugin gives you a skill you want. What should you do before enabling it? | Claude Code surface bullet: plugin marketplaces explicitly excluded. |
| `basic#23` What does it mean that MCP is 'transport agnostic'? | MCP wire-protocol bullet: transport negotiation. |
| `basic#24` In the MCP tool-calling flow, what are the two core message-type pairs exchanged? | MCP wire-protocol bullet: ListTools/CallTool message pairs. |
| `basic#25` Using the Python MCP SDK's decorator approach, how does the SDK know a tool's arguments an… | MCP wire-protocol bullet: language-SDK internals. |
| `basic#26` What is the MCP Inspector primarily used for? | MCP wire-protocol bullet: MCP Inspector explicitly excluded. |
| `basic#27` On the client side, what two core functions does your MCP client class typically implement… | MCP wire-protocol bullet: language-SDK client internals. |
| `basic#30` Your MCP client reads a resource with MIME type 'application/json'. What should it do with… | MCP wire-protocol bullet: language-SDK client internals. |
| `basic#32` Your MCP client calls get_prompt on your server with arguments like {"doc_id": "plan.md"} … | MCP wire-protocol bullet: on-the-wire method names (get_prompt). |
| `scen#46` A job needs hundreds of coordinated agents rather than a handful of delegations per turn. … | Out of scope: Claude Code/SDK surface with no plausible link to any objective (Workflow tool) |
| `scen#57` Connection errors appear on a remote MCP server configured with --transport sse. What's th… | Out of scope: MCP wire-protocol mechanics, transport negotiation, SSE deprecation |

All 13 are MCP wire-protocol or unlinked product surface. Eleven of them sit in
`basic.json`, which was written as a concept quiz rather than a scenario bank.

## Borderline — in-scope topic, unnamed detail (14)

Each tests something real; the answer just turns on a mechanic no objective states.
Keep them for practice, or rewrite the stem toward the named concept.

| Question | Overreach |
| --- | --- |
| `basic#2` Why is the Messages API described as 'stateless'? | Hinges on the term 'stateless'; no objective implies API statelessness beyond appending tool results to history. |
| `basic#15` You ask Claude in auto mode to refactor authentication and it writes broken authentication… | Permission modes are in scope, but the answer hinges on safety-classifier semantics no objective implies. |
| `basic#17` Your team wants Claude to review every PR with inline comments, nothing to build or host, … | CI review is in scope, but hinges on the managed GitHub app product surface, not CLI invocation. |
| `basic#21` Two skills share a name: one at enterprise (managed settings) level, one at project level.… | Settings permissions are in scope, but enterprise managed-settings precedence over skills is not implied. |
| `basic#31` Why define a custom prompt (like a /format command) instead of letting users type free-for… | Rationale mirrors slash-command templating, but the MCP prompts primitive appears in no objective. |
| `basic#33` MCP has three primitives: tools, resources, prompts. Which part of the stack controls each… | Resources-vs-tools is in scope, but the three-primitive control model including prompts is not implied. |
| `basic#34` You're deciding how to implement a feature: users click a button to trigger a 'summarize d… | Hinges on selecting the prompts primitive; objectives cover only resources versus tools. |
| `basic#48` Your user settings allow Bash(curl *), the project settings.json denies it, and IT has dep… | Settings permissions are in scope, but managed-policy layer precedence is a detail no objective implies. |
| `basic#50` A teammate writes a PreToolUse hook to block edits to production config. It detects the vi… | Hooks in scope, but exit-code 1 vs 2 blocking protocol is a mechanic no objective implies |
| `scen#44` A subagent was partway through a long analysis when the orchestrator's context was compact… | Resumption in scope, but hinges on separate transcript storage and agentId internals |
| `scen#45` Why is plan mode implemented using a separate read-only Plan subagent rather than letting … | Plan mode in scope, but Plan-subagent nesting and ExitPlanMode gating internals unimplied |
| `scen#47` A team sets defaultMode: 'auto' in .claude/settings.json so everyone gets auto mode on clo… | Permission modes in scope, but hinges on auto mode being ignored from project settings only |
| `scen#48` You want a hard definition-of-done gate: Claude must not end its turn until the test suite… | Hooks in scope, but Stop-hook exit 2 / decision block protocol not implied by any objective |
| `scen#58` After automatic compaction in a long Agent SDK session, an agent starts violating project … | Compaction in scope, but asserts SDK re-reads CLAUDE.md post-compaction, unimplied mechanic |

## Domain balance

Of the 101 in-scope questions carrying a task-statement tag:

| Domain | In bank | Official | Gap |
| --- | --- | --- | --- |
| 1 Agentic Architecture | 29 (29%) | 27% | +2 |
| 2 Tool Design & MCP | 15 (15%) | 18% | -3 |
| 3 Claude Code Config | 20 (20%) | 20% | -0 |
| 4 Prompt Eng & Structured Output | 25 (25%) | 20% | +5 |
| 5 Context Mgmt & Reliability | 12 (12%) | 15% | -3 |

## What the field reports add

- **`--bare` was asked on a real sitting.** Do not treat the task statements as an
  exhaustive flag list. CLI flags beyond `-p` are fair game.
- **One sitting was ~1/3 CI/CD**, clustered into roughly three topic areas of ~20
  items. Weighting toward Claude Code for CI, MCP servers, and Developer
  Productivity is realistic.
- Both candidates stress *when and why* over definitions — favour scenario stems.
- The real exam offers strike-through on ruled-out options. This app already has it.

## Known divergences from the real exam

- **Multiple-response items.** The real exam includes items asking for more than one
  answer and states how many. This app supports single-answer only.
- **Scenario structure.** The real exam presents 4 scenarios drawn from 6, with
  questions grouped under a shared context. This app draws a flat random paper.

