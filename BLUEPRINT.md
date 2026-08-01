# CCAR-F official blueprint (reference)

Source: [Claude Certified Architect – Foundations Exam Guide](https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification),
Version 1.0, effective July 2026. Course page: Anthropic Partner Academy.

Use this as the scope authority when writing or cutting questions. If a question
does not map to a task statement below, it does not belong in the bank.

## Exam facts

| | |
| --- | --- |
| Items | 60 |
| Format | Multiple-choice **and multiple-response**; each item states how many to select |
| Structure | **4 scenarios drawn from a bank of 6** |
| Time | 120 minutes |
| Pass | 720 scaled, 100–1000 |
| Reporting | Pass/fail + percent-correct by domain |

Tested technologies: Claude Code, Claude Agent SDK, Claude API, MCP.

## Domain weights

| Domain | Weight |
| --- | --- |
| 1 Agentic Architecture & Orchestration | 27% |
| 2 Tool Design & MCP Integration | 18% |
| 3 Claude Code Configuration & Workflows | 20% |
| 4 Prompt Engineering & Structured Output | 20% |
| 5 Context Management & Reliability | 15% |

## The 6 scenarios

1. **Customer Support Resolution Agent** — Agent SDK, MCP tools (`get_customer`,
   `lookup_order`, `process_refund`, `escalate_to_human`), 80%+ first-contact
   resolution. Domains 1, 2, 5.
2. **Code Generation with Claude Code** — slash commands, CLAUDE.md, plan mode
   vs direct execution. Domains 3, 5.
3. **Multi-Agent Research System** — coordinator + search/analysis/synthesis/report
   subagents, cited reports. Domains 1, 2, 5.
4. **Developer Productivity with Claude** — codebase exploration, built-in tools
   (Read, Write, Bash, Grep, Glob), MCP servers. Domains 2, 3, 1.
5. **Claude Code for Continuous Integration** — automated review, test generation,
   PR feedback, minimizing false positives. Domains 3, 4.
6. **Structured Data Extraction** — unstructured docs, JSON schema validation,
   edge cases, downstream integration. Domains 4, 5.

## The 30 task statements

### Domain 1 — Agentic Architecture & Orchestration (27%)

- **1.1** Design and implement agentic loops for autonomous task execution —
  `stop_reason` `tool_use` vs `end_turn`, appending tool results to history,
  model-driven vs pre-configured decision trees. Anti-patterns: parsing natural
  language for termination, arbitrary iteration caps, checking assistant text.
- **1.2** Orchestrate multi-agent systems with coordinator-subagent patterns —
  hub-and-spoke, isolated subagent context, dynamic subagent selection, scope
  partitioning, iterative refinement loops.
- **1.3** Configure subagent invocation, context passing, and spawning — Task tool,
  `allowedTools` must include `Task`, explicit context in prompt, `AgentDefinition`,
  parallel Task calls in one response, fork-based sessions.
- **1.4** Implement multi-step workflows with enforcement and handoff patterns —
  programmatic gates vs prompt guidance, blocking `process_refund` until verified,
  structured handoff summaries.
- **1.5** Apply Agent SDK hooks for tool call interception and data normalization —
  `PostToolUse` normalization, blocking policy violations (refunds over $500),
  hooks for deterministic guarantees.
- **1.6** Design task decomposition strategies — fixed sequential (prompt chaining)
  vs dynamic adaptive, per-file plus cross-file passes.
- **1.7** Manage session state, resumption, and forking — `--resume <session-name>`,
  `fork_session`, informing agent of changed files, fresh session with summary vs
  resuming stale results.

### Domain 2 — Tool Design & MCP Integration (18%)

- **2.1** Design effective tool interfaces — descriptions as the selection mechanism,
  input formats/examples/edge cases, overlapping-description misrouting, splitting
  generic tools, keyword-sensitive system prompts.
- **2.2** Implement structured error responses for MCP tools — `isError`, transient
  vs validation vs business vs permission, `errorCategory`, `isRetryable`,
  local recovery in subagents, access failure vs valid empty result.
- **2.3** Distribute tools across agents and configure tool choice — too many tools
  degrades selection, scoped access, `tool_choice` `auto` / `any` / forced.
- **2.4** Integrate MCP servers — project `.mcp.json` vs user `~/.claude.json`,
  `${ENV_VAR}` expansion, all servers discovered at connection time, MCP resources
  as content catalogs, community servers over custom.
- **2.5** Select and apply built-in tools — Grep for content, Glob for paths,
  Read/Write vs Edit, Read+Write fallback when Edit anchor is non-unique,
  incremental codebase understanding.

### Domain 3 — Claude Code Configuration & Workflows (20%)

- **3.1** Configure CLAUDE.md hierarchy and modular organization — user vs project vs
  directory level, user-level not shared via VCS, `@import`, `.claude/rules/`,
  `/memory` to verify what loaded.
- **3.2** Create custom slash commands and skills — `.claude/commands/` project vs
  user scope, `.claude/skills/` SKILL.md frontmatter `context: fork`,
  `allowed-tools`, `argument-hint`; skills vs CLAUDE.md.
- **3.3** Apply path-specific rules — `.claude/rules/` YAML frontmatter `paths:`
  glob patterns, load only on matching edits, preferred over subdirectory
  CLAUDE.md for cross-cutting file types.
- **3.4** Plan mode vs direct execution — plan mode for large/architectural/multi-file,
  direct for well-scoped, Explore subagent for verbose discovery.
- **3.5** Iterative refinement — concrete input/output examples, test-driven
  iteration, interview pattern, batching interacting fixes vs sequential.
- **3.6** Integrate Claude Code into CI/CD — `-p`/`--print`, `--output-format json`,
  `--json-schema`, CLAUDE.md for CI context, independent review instance beats
  self-review.

### Domain 4 — Prompt Engineering & Structured Output (20%)

- **4.1** Explicit criteria to reduce false positives — categorical criteria over
  "be conservative", severity criteria with code examples, trust impact.
- **4.2** Few-shot prompting — 2–4 targeted examples, ambiguous-case handling,
  generalization, hallucination reduction in extraction.
- **4.3** Structured output via tool use and JSON schemas — schemas eliminate syntax
  but not semantic errors, `tool_choice` variants, nullable fields to prevent
  fabrication, enum + "other"/"unclear" patterns.
- **4.4** Validation, retry, and feedback loops — retry with error feedback, limits
  of retry when info is absent, `detected_pattern`, semantic vs syntax errors,
  `calculated_total` vs `stated_total`.
- **4.5** Batch processing — Message Batches API 50% savings, up to 24h window, no
  latency SLA, no multi-turn tool calling in a single request, `custom_id`,
  submission frequency math, resubmitting only failures.
- **4.6** Multi-instance and multi-pass review — self-review limits, independent
  instances, per-file plus cross-file passes, confidence self-reporting.

### Domain 5 — Context Management & Reliability (15%)

- **5.1** Preserve critical information across long interactions — progressive
  summarization risks, "lost in the middle", tool-result bloat, persistent
  "case facts" block, trimming verbose outputs, key findings first.
- **5.2** Escalation and ambiguity resolution — valid triggers (explicit request,
  policy gap, no progress), sentiment and self-reported confidence are unreliable,
  multiple matches require clarification not heuristics.
- **5.3** Error propagation across multi-agent systems — structured error context,
  access failure vs empty result, generic statuses hide context, silent
  suppression and whole-workflow termination are both anti-patterns.
- **5.4** Context in large codebase exploration — context degradation, scratchpad
  files, subagent delegation, state manifests for crash recovery, `/compact`.
- **5.5** Human review workflows and confidence calibration — aggregate accuracy
  masks per-type failure, stratified random sampling, field-level calibrated
  confidence, validate by document type before automating.
- **5.6** Provenance and uncertainty in multi-source synthesis — attribution lost in
  summarization, claim-source mappings preserved through synthesis, annotating
  conflicting statistics rather than picking one.

## Published test objectives (the real scope authority)

Transcribed from score-report screenshots shared by two colleagues who sat the
exam. These are **more granular and broader** than the task statements above, and
they override any inference drawn from the task statements alone.

### Agentic architecture

- Configure agentic loops to emit multiple tool calls within a single response
  turn, enabling parallel execution of independent subtasks.
- Apply session resumption techniques — targeted re-analysis of changed files and
  context injection — to restore agent state without repeating prior work.
- Construct subagent prompts that include all findings, structured data, and
  source metadata needed without returning to the coordinator.
- Evaluate subagent delegation strategies — goal-oriented versus procedural.
- Configure subagent invocations with tool restrictions, context scoping, and
  role-constraining system prompts.
- Diagnose misconfigured subagent spawning: missing tool permissions, incorrect
  `AgentDefinition` parameters, absent coordinator-to-subagent wiring.
- Decompose complex tasks into dynamically generated subtasks that adapt.
- Select the appropriate agentic review architecture — plan mode, direct
  execution, or multi-phase workflow — by scope, risk, and approval needs.
- Design state persistence for multi-agent pipelines enabling resumption after
  interruption.
- Evaluate orchestration patterns — coordinator-worker, parallel, sequential.

### Tool design and MCP

- Select the appropriate built-in tool — Grep, Glob, Read, or Bash.
- Configure tool distribution by assigning each subagent only its role's tools.
- **Distinguish between MCP resources and tools**, and expose server content as
  resources to reduce exploratory tool calls.
- Integrate MCP servers by selecting the correct server scope, configuring auth
  via environment variable expansion, and verifying tool discovery.
- Write MCP tool descriptions that distinguish purpose, input formats, use-case
  boundaries, and relationships to semantically similar tools.
- Configure `tool_choice` to guarantee tool invocation, and sequence multi-tool
  workflows so prerequisite data is obtained first.

### Claude Code configuration and workflows

- **Configure Claude Code CLI invocations for CI/CD using non-interactive flags,
  permission modes, and cost and turn limits that prevent runaway executions.**
- Structure iterative refinement with concrete input-output examples, targeted
  feedback, and batched issue descriptions.
- Design review configurations that load correct project standards, restrict
  unnecessary tool access, and produce structured output.
- Apply `context: fork` to Skill and slash command configurations needing an
  isolated subagent context.
- Improve test generation with existing test files as context, fixture
  conventions, and criteria separating behavioral tests from trivial assertions.
- **Select the correct configuration mechanism — CLAUDE.md, `.claude/rules/` with
  glob patterns, Skills, hooks, or settings permissions — based on guidance type
  and when it should apply.**
- Apply systematic codebase exploration with Grep, Glob, and Read while managing
  context window constraints.

### Prompt engineering and structured output

- Design prompt criteria with explicit inclusion and exclusion boundaries.
- Design specialized review passes separating concerns — security, business
  logic, API design — with dedicated few-shot examples.
- **Select the most reliable structured output method — tool use with JSON schema,
  prompt-based formatting, or prefilled responses — by required strictness.**
- Design extraction schemas with optional fields, nullable values, and enums that
  represent missing information without fabricating values.
- Implement tool use with JSON schemas and configure `tool_choice`.
- **Resolve structured output truncation by splitting large review tasks into
  smaller scoped API calls and merging, rather than raising `max_tokens`.**
- Apply extraction accuracy patterns — schemas, format normalization
  instructions, few-shot examples.
- Reduce false positives by supplying project conventions, accepted patterns, and
  exclusion criteria as persistent context on every review.
- Select the appropriate API processing mode — synchronous Messages API or
  asynchronous Message Batches API.

### Context management and reliability

- Apply context management strategies — subagent isolation, scratchpad files,
  targeted file reading — across sessions exceeding context limits.
- Apply context window optimization — summarization, sliding windows, structured
  state objects, selective retention.
- **Design human review routing by confidence scores, document characteristics,
  and field-level ambiguity rather than random sampling.**
- Design subagent output schemas rendering structured data, prose summaries, and
  citation metadata for downstream synthesis.
- Design synthesis behavior preserving source-level uncertainty, distinguishing
  well-established findings from contested claims.

## Field reports from candidates who passed

Two colleagues sat the exam and reported back. Treat this as the strongest
available evidence about what actually gets asked.

- **`--bare` was asked.** One candidate lost a question to it. Claude Code CLI
  flags beyond `-p` are fair game — do not treat the task-statement list as an
  exhaustive flag inventory.
- **Roughly one-third of one sitting was CI/CD.** Questions clustered into about
  three topic areas of ~20 items each, weighted toward Claude Code for CI,
  MCP servers, and Developer Productivity.
- Difficulty reported as medium, entirely scenario-based; ~90 of 120 minutes used.
- The real exam lets candidates **strike through** options they've ruled out.
  This app already implements that.
- Advice from both: the exam rewards knowing *when and why* to use a feature over
  memorising definitions.

## Genuinely out of scope

Narrowed after the objectives above. A question is out of scope only if it
depends on:

- MCP **wire-protocol** mechanics — `ListTools`/`CallTool` message pairs,
  transport negotiation, SSE deprecation, MCP Inspector, language-SDK client
  internals, `resources/templates/list` call names. Note the *conceptual*
  resources-vs-tools distinction and templated-vs-direct resources ARE in scope;
  only the on-the-wire method names are not.
- Claude Code surface with no plausible link to any objective — agent teams,
  agent view, artifacts, `/rewind`, plugin marketplaces, routines, statusline,
  worktrees, voice dictation.
- Agent SDK operational plumbing — session storage backends, OpenTelemetry
  exporters, `excludeDynamicSections`, `cleanupPeriodDays`, prompt-caching
  internals. Cost and turn limits are IN scope via the CI/CD objective.
