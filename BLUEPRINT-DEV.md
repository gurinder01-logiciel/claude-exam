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

## Prep courses and chapters (study and drill by chapter)

Gurinder's instruction: prepare from the courses the guide points to, chapter by chapter. The guide's
"How to Prepare" section names no single course, so the courses are those on Anthropic's
[Developer – Foundations prep path](https://anthropic-partners.skilljar.com/path/claude-certified-developer-foundations)
(five modules) plus the prerequisite courses that path recommends. Read on 27 Nov 2026.

What could and could not be read: the course pages are public and show each course's description,
learning objectives and (for the prerequisite courses) lesson list. The lesson bodies of the five modules
sit behind the free Partner Academy sign-in, which was not used, so **chapters for the five modules are the
learning objectives, paraphrased here**, and no lesson text was read or copied. Prerequisite courses use their
public lesson titles. Questions were still written from the live docs (`questions/FACTS-DEV.md`); the course
tag says which chapter a question is closest to, not that the lesson teaches that exact fact.

Each question carries `course` and `chapter`. The home screen's "Study by course chapter" panel drills them.
The number after each chapter is how many of the 100 questions carry that tag.

### MSO Foundations - 57 min (7 questions)
<https://anthropic-partners.skilljar.com/path/claude-certified-developer-foundations/mso-foundations>

- Tokens, the context window and non-determinism (3)
- Model family, tiers and reasoning modes (4)
- Zero-, one- and multi-shot prompting (0)
- SDK vs REST, streaming and async access (0)

### Production-Grade Prompting, Agents & Tool Use - 209 min (33 questions)
<https://anthropic-partners.skilljar.com/path/claude-certified-developer-foundations/production-grade-prompting-agents-tool-use>

- Production-ready prompts and diagnosing underperformance (4)
- Extended thinking, budgets and thinking blocks (2)
- Tool schemas, the tool-use loop and parallel calls (6)
- Streamed responses and interrupted streams (5)
- Context engineering: window, compaction, clearing and subagent handoffs (4)
- Production agents: workflow vs agent, wiring and human checkpoints (9)
- Agent memory across sessions (2)
- Images, PDFs, the Files API and Message Batches (1)

### Claude Code, MCP & Integration - 142 min (10 questions)
<https://anthropic-partners.skilljar.com/path/claude-certified-developer-foundations/claude-code-mcp-integration>

- Explore-plan-code loop and permission modes (1)
- Reviewing AI-generated code and review gates (0)
- Durable project context: CLAUDE.md, rules, hooks and subagents (4)
- Skills, custom commands and plugins (3)
- MCP servers: tools, resources, prompts, transport and scope (2)
- Enterprise connections and authentication (0)

### Production Engineering, Evals & Security - 211 min (22 questions)
<https://anthropic-partners.skilljar.com/path/claude-certified-developer-foundations/production-engineering-evals-security>

- Eval suites, grading methods and calibrating an LLM judge (4)
- Test and tracing layers (3)
- Resilience: retriable vs terminal errors (4)
- Cost, latency and reliability budgets (2)
- Security: injection, untrusted input, scoped identity and secrets (9)

### Accelerators & IP Contribution - 155 min (1 questions)
<https://anthropic-partners.skilljar.com/path/claude-certified-developer-foundations/accelerators-ip-contribution>

- Packaging a build as a reusable accelerator (0)
- Contributing assets back (0)
- Platform choice and versioning what ships (1)
- Comparing platforms on latency, compliance and cost (0)
- Coordinating several deployments under a review (0)

### Building with the Claude API - recommended prerequisite (13 questions)
<https://anthropic-partners.skilljar.com/claude-with-the-anthropic-api>

- Structured data (4)
- Rules of prompt caching (3)
- Prompt caching in action (1)
- Citations (2)
- The full RAG flow (1)
- Code execution and the Files API (2)

### Introduction to Model Context Protocol - recommended prerequisite (2 questions)
<https://anthropic-partners.skilljar.com/introduction-to-model-context-protocol>

- Introducing MCP (1)
- Defining resources (1)

### Model Context Protocol: Advanced Topics - recommended prerequisite (1 questions)
<https://anthropic-partners.skilljar.com/model-context-protocol-advanced-topics>

- The StreamableHTTP transport (1)

### Claude Code in Action - recommended prerequisite (7 questions)
<https://anthropic-partners.skilljar.com/claude-code-in-action>

- Steering Long Sessions (3)
- Hooks (4)

### Introduction to Agent Skills - recommended prerequisite (2 questions)
<https://anthropic-partners.skilljar.com/introduction-to-agent-skills>

- What are skills? (1)
- Skills vs. other Claude Code features (1)

### Introduction to Subagents - recommended prerequisite (2 questions)
<https://anthropic-partners.skilljar.com/introduction-to-subagents>

- Using subagents effectively (2)

## Out of scope [Inferred]

- Exam administration (fees, retakes, Pearson logistics).
- Exact per-token prices and model release dates; items reason about relative cost and latency.
- Third-party frameworks by name (only the v1.0 guide names Strands, LangGraph and PydanticAI).
- Anything the Architect banks already test at the identical mechanism level (see the dedupe rule in `questions/FACTS-DEV.md`).
