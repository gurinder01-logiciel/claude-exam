# CCDVF official blueprint (reference)

Scope authority for `questions/developer.json` (level **Developer**, the *Claude Certified
Developer – Foundations* exam). Every fact below is tagged with where it came from:

- **[Guide]** — *Claude Certified Developer – Foundations Exam Guide*, **Version 1.1,
  effective December 7, 2026**, exam code **CCDVF**. Public PDF linked as "Exam guide" on the
  [partner certifications page](https://anthropic-partners.skilljar.com/page/partner-certifications):
  <https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794946771/Claude_Certified_Developer_-_Foundations_Exam_Guide_Updated_Dec_7.pdf>
  (read 27 Nov 2026).
- **[Guide v1.0]** — the same guide's earlier edition, *Version 1.0, effective July 2026*, exam code
  CCDV-F, 53 items, different domain weights and skill names. Still linked from the page
  <https://everpath-course-content.s3-accelerate.amazonaws.com/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1783542875/Claude+Certified+Developer+–+Foundations+Exam+Guide.pdf>.
  We follow v1.1 because it is the newest published blueprint; the v1.0 weights are recorded
  at the end for comparison.
- **[FAQ]** — [certification FAQ](https://anthropic-partners.skilljar.com/page/faq-certifications).
- **[Inferred]** — our own decision, not stated by any source.

## Exam facts

| | | Source |
| --- | --- | --- |
| Items | **70**, of which **60 scored** and 10 unscored (unscored items are not identified) | [Guide] §4 |
| Format | Scenario-based multiple-choice; each item states how many responses to select | [Guide] §4 |
| Time | 120 minutes | [Guide] §4 |
| Pass | Scaled 720 on 100–1,000; criterion-referenced (standard-setting study) | [Guide] §4, §8 |
| Reporting | Pass/fail + scaled score, plus percent-correct by domain (not used for pass/fail) | [Guide] §4, §8 |
| Fee | $125 USD | [Guide] §4, [FAQ] |
| Validity | 12 months; free non-proctored renewal assessment if renewed on time | [Guide] §4, §13 |
| Delivery | Proctored, Pearson (online or test centre) | [Guide] §4, §9 |
| Prerequisite | None | [Guide] §4 |
| Named scenarios | **None published.** Sample items are short standalone cases | [Guide] §7 |

Our practice level draws **60** of 100 per sitting, matching the 60 *scored* items and keeping the
app's 2-minutes-per-question timing on a round 120 minutes **[Inferred]**. A length switch also
offers the real **70**-item sitting at 120 minutes, as the Architect Professional level does.

## Domain weights [Guide] §5

| # | Domain | Weight | Items in our 100 |
| --- | --- | --- | --- |
| 1 | Agents and Workflows | 17% | 17 |
| 2 | Applications and Integration | 20% | 20 |
| 3 | Claude Code | 8% | 8 |
| 4 | Eval, Testing, and Debugging | 10% | 10 |
| 5 | Model Selection and Optimization | 12% | 12 |
| 6 | Prompt and Context Engineering | 15% | 15 |
| 7 | Security and Safety | 8% | 8 |
| 8 | Tools and MCP | 10% | 10 |

## Task statements [Guide] §5 "Detailed objectives by domain"

Numbering is ours **[Inferred]**; names and wording are the guide's.

### Domain 1 — Agents and Workflows (17%)
- 1.1 Architecture and Runtime Selection — workflow vs agentic architecture against business requirements, error tolerance and audit constraints; orchestrator and subagent decomposition; self-hosted harness vs managed, sandboxed agent runtime
- 1.2 Agent SDK Construction and Hooks — building and correcting Agent SDK agent definitions, custom agent loops and harnesses, and hook configurations so required actions execute deterministically rather than at the model's discretion
- 1.3 Agent Pattern Diagnosis — from a trace or description of a misbehaving agent, find the missing or misapplied pattern (tool-use loop termination, subagent isolation, memory, context-window management) and select the corrective pattern

### Domain 2 — Applications and Integration (20%)
- 2.1 Messages API Mechanics — message structure, tool use, streaming, vision, thinking, prompt caching, structured output, stop reasons; realtime vs batch
- 2.2 Application Boundary and Surface Behavior — how Claude interprets instructions on different surfaces, what content crosses the application boundary, whether schema and session decisions meet the requirements
- 2.3 Configuration and SDLC Integration — CLAUDE.md files, settings.json, model version pinning, prompt versioning, plugin dependencies, CI integration; how a configuration change affects each environment
- 2.4 Integration Resilience — find the defect in failing integration code from its error output: streaming events and terminal-event semantics, retry/fallback logic that does not distinguish Anthropic's error classes (rate limits, overloaded, invalid request, timeout), multi-format ingestion through the Files API

### Domain 3 — Claude Code (8%)
- 3.1 Claude Code Operation — CLI, desktop, IDE, web and mobile surfaces; session management; CLAUDE.md hierarchy and precedence; settings.json; permission modes; headless and streaming modes; built-in commands
- 3.2 Claude Code Customization and Extension — choose Skill, plugin, Rules file, hook, subagent or slash command for a repeatable workflow; author and package it

### Domain 4 — Eval, Testing, and Debugging (10%)
- 4.1 Evaluation Design — an evaluation that measures a stated quality goal: LLM-as-judge harnesses calibrated against human-labelled data, golden sets, regression tests, behavioural checks, defensible metrics
- 4.2 Failure-Mode Diagnosis — from a trace or reproduction identify hallucination, refusal, under-acting, context loss, format drift or inconsistent output; integration layer vs model output; recovery that fixes the cause

### Domain 5 — Model Selection and Optimization (12%)
- 5.1 Generation Mechanics and Model Options — tokens, context windows, sampling and non-determinism, adaptive thinking, effort levels
- 5.2 Model Tier Selection and Release Planning — quality, latency and cost across tiers against binding constraints; planning for behaviour change across releases with regression evaluations
- 5.3 Cost Diagnosis and Optimization — find the dominant cost driver; prompt caching (single, layered and rolling breakpoints, checkpoint placement), batch processing, token budgets; quantify the impact

### Domain 6 — Prompt and Context Engineering (15%)
- 6.1 Context Management for Long-Running Sessions — context bloat or drift: compaction, tool-output pruning, subagent isolation, when to start a fresh session
- 6.2 Prompt Revision — close a gap exposed by regression evaluations with instruction clarity, system-vs-user placement, zero-/single-/multi-shot examples, output constraints, input sanitization
- 6.3 Structured Output and Defensive Parsing — strict schema validation, response validation, defensive parsing of free-text fallbacks
- 6.4 Grounding and Source Citation — ground answers in supplied documents, cite them, return "not found"; full document set in context vs retrieving passages (corpus size, cost, freshness)

### Domain 7 — Security and Safety (8%)
- 7.1 Prompt Injection and Jailbreak Defense — layered mitigations for an agent that processes untrusted content, preventing leakage and unintended actions without breaking the agent
- 7.2 Deterministic Guardrails and Least Privilege — guardrail layering, least privilege and hooks so destructive actions cannot run even under adversarial instruction
- 7.3 API Key and Credential Handling — server-side proxying rather than client embedding, workspace-scoped vs admin keys, environment separation, rotation, access monitoring

### Domain 8 — Tools and MCP (10%)
- 8.1 Tool Design and Response Shaping — function schema, description that drives correct invocation, minimal actionable results, error handling, execution side, approval pattern, tool-set assembly
- 8.2 MCP Server Development and Integration — resources, tools and prompts; transport (stdio or HTTP) and authentication
- 8.3 Capability Mechanism Selection — built-in tools, custom tools, Skills and MCP servers: where the capability lives, who maintains it, how Claude discovers and invokes it

## Official sample items [Guide] §7

Three short cases, each with a four-option answer (v1.0 had three different ones):
- **Domain 2, streaming:** long answers end mid-sentence because the handler treats the first
  `content_block_stop` as the end and never reads the stop reason; the fix is to treat `message_stop`
  as terminal and read the stop reason from `message_delta`.
- **Domain 5, caching:** a single breakpoint after the user's question makes every prefix unique so
  nothing is reused; the fix is layered breakpoints by change cadence (static prompt and tools, then
  the per-customer document).
- **Domain 8, tool design:** the model passes a customer name where `order_id` is expected; the fix is
  in the tool description (format, example, ask when missing) plus a structured error naming the
  expected format, not a system-prompt instruction, forced `tool_choice` or an extra tool.

Sample questions are not copied into the bank.

## v1.0 weights, for comparison [Guide v1.0] §6

Agents and Workflows 14.7% · Applications and Integration 33.1% · Claude Code 3.1% · Eval, Testing,
and Debugging 2.6% · Model Selection and Optimization 16.8% · Prompt and Context Engineering 11.0% ·
Security and Safety 8.1% · Tools and MCPs 10.6%. v1.1 shifts weight toward evaluation/debugging,
Claude Code and prompt/context engineering.

## Decision principles the sample items test [Guide] §7

Read the terminal event and stop reason, not the first block end; cache the stable prefix and
layer breakpoints by how often content changes; fix tool misuse where the model reads it (the
description and schema) and return errors the model can act on.

## Out of scope [Inferred]

- Exam administration (fees, retakes, Pearson logistics).
- Exact per-token prices and model release dates; items reason about relative cost and latency.
- Third-party frameworks by name (only the v1.0 guide names Strands, LangGraph and PydanticAI).
- Anything the Architect banks already test at the identical mechanism level (see the dedupe rule in `questions/FACTS-DEV.md`).
