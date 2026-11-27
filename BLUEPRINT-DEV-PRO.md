# CCDVP official blueprint (reference)

Scope authority for `questions/developer-pro.json` (level **Developer Professional**, the *Claude
Certified Developer – Professional* exam). Every fact below is tagged with where it came from:

- **[Guide]** — *Claude Certified Developer – Professional Exam Guide*, **Version 1.0, effective
  November 2026**, exam code **CCDVP**. Public PDF linked as "Exam guide" from the
  [partner certifications page](https://anthropic-partners.skilljar.com/page/partner-certifications):
  <https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794947325/Claude_Certified_Developer-Professional_Exam_Guide.pdf>
  (read 27 Nov 2026).
- **[Path]** — [Developer Professional prep path](https://anthropic-partners.skilljar.com/path/claude-certified-developer-professional)
  landing page (description only; lessons sit behind the Partner Academy login and were not read).
- **[FAQ]** — [certification FAQ](https://anthropic-partners.skilljar.com/page/faq-certifications).
- **[Inferred]** — our own decision, not stated by any source.

## Exam facts

| | | Source |
| --- | --- | --- |
| Items | **70**, of which **60 scored** and 10 unscored (not identified) | [Guide] §4 |
| Format | Scenario-based multiple-choice and multiple-response; each item states how many to select | [Guide] §4 |
| Time | 120 minutes | [Guide] §4 |
| Pass | Scaled 720 on 100–1,000; criterion-referenced (standard-setting study) | [Guide] §4, §8 |
| Reporting | Pass/fail + scaled score, plus percent-correct by domain (not used for pass/fail) | [Guide] §4, §8 |
| Fee | $175 USD | [Guide] §4, [FAQ] |
| Validity | 12 months; free non-proctored renewal assessment if renewed on time | [Guide] §4, §13 |
| Delivery | Proctored, Pearson (online or test centre) | [Guide] §4, §9 |
| Prerequisite | None; Developer – Foundations is recommended and its scope is **assumed knowledge** | [Guide] §4, §6 |
| Audience | Senior/staff software engineers, platform and site-reliability engineers, solutions engineers who own live Claude systems; at least one tool-using agent built and deployed in production | [Guide] §3 |
| Named scenarios | **None published.** Sample items are short standalone cases | [Guide] §7 |

Our practice level draws **60** of 100 per sitting, matching the 60 *scored* items and the app's
2-minutes-per-question timing **[Inferred]**; a length switch offers the real **70** items at 120 minutes.

## Domain weights [Guide] §5

| # | Domain | Weight | Items in our 100 |
| --- | --- | --- | --- |
| 1 | Advanced Agent Architecture and Orchestration | 17% | 17 |
| 2 | Production Integration, Reliability, and Knowledge Grounding | 20% | 20 |
| 3 | Observability and Production Monitoring | 12% | 12 |
| 4 | Advanced Debugging and Incident Response | 10% | 10 |
| 5 | Evaluation Engineering and Quality Assurance | 12% | 12 |
| 6 | Cost and Latency Optimization at Scale | 8% | 8 |
| 7 | Runtime Guardrails and Production Security | 11% | 11 |
| 8 | Agent Fleet Operations for Software Delivery | 10% | 10 |

## Task statements [Guide] §5 "Detailed objectives by domain"

Numbering is ours **[Inferred]**; names and wording are the guide's.

### Domain 1 — Advanced Agent Architecture and Orchestration (17%)
- 1.1 Multi-Agent Orchestration — supervisor/worker hierarchies, parallel subagent dispatch, delegation and context-isolation boundaries, inter-agent communication, human-in-the-loop and approval flows; inter-agent failures
- 1.2 Durable Execution and State Management — session persistence, checkpointing, resumability and memory architecture for long-running agents that survive interruption, restart and model version change
- 1.3 Architecture Selection at Scale — from cost, reliability and quality data decide whether to evolve a running system between workflow and agentic patterns; choose harness, framework and reusable-pattern standards
- 1.4 Context and Memory Architecture — context compaction and editing, persistent memory, cache-safe instruction changes mid-conversation, tool-use techniques that keep large tool catalogs out of context

### Domain 2 — Production Integration, Reliability, and Knowledge Grounding (20%)
- 2.1 Reliability Engineering for Claude Services — retry and backoff, circuit breakers, graceful degradation, cross-model/region/platform fallbacks that distinguish rate limits from safety refusals from context-window stops, respecting per-platform feature parity
- 2.2 Scale and Throughput Management — rate-limit strategy, queueing and backpressure, batch pipeline design, multi-tenant quota and isolation, capacity planning; which constraint binds (rate limits, token throughput, batch economics)
- 2.3 Production MCP and Change Management — remote MCP deployment and authentication, tool and schema versioning, migration testing against breaking behaviour changes, platform configuration parity and gateway/routing, prompt versioning, progressive rollout with rollback
- 2.4 Retrieval and Knowledge Grounding at Scale — agentic search vs RAG, chunking and embedding, hybrid search, reranking, source citation, uncertainty declaration, confidence signals, diagnosing retrieval failures by stage

### Domain 3 — Observability and Production Monitoring (12%)
- 3.1 Telemetry and Instrumentation — distributed traces for agent loops and tool calls, token and cost metrics, cache-performance diagnostics, grounding and reasoning traceability, structured log events, content-capture configuration under privacy constraints such as zero-data-retention
- 3.2 Production Monitoring and Alerting — SLIs and SLOs, alerting and dashboards (token and cost telemetry), detecting quality drift, behavioural regressions, anomalous usage, drift after model updates
- 3.3 Trace Analysis at Scale — sampling strategies, aggregation, failure-cohort analysis to surface systemic issues invisible in single traces

### Domain 4 — Advanced Debugging and Incident Response (10%)
- 4.1 Complex Failure Diagnosis — isolate the origin among model output, agent harness, tools and data in multi-turn, multi-agent and non-deterministic failures, including model refusals and retrieval-grounding failures
- 4.2 Incident Response and Learning Loops — triage, mitigation, rollback, communication; turn the incident into regression evaluations, monitoring coverage and postmortem findings

### Domain 5 — Evaluation Engineering and Quality Assurance (12%)
- 5.1 Evaluation System Design — golden sets, regression suites, behavioural checks, CI/CD evaluation gates, retrieval precision and groundedness metrics, release criteria; suite validity against contamination, saturation and coverage gaps
- 5.2 LLM-as-Judge Engineering — calibration against human labels, rubric design, bias and position effects, inter-rater reliability, judge drift across model versions
- 5.3 Online Quality Measurement — live-traffic sampling, A/B testing, feedback loops, metrics matched to task type (extraction, generation, agentic, retrieval-grounded)

### Domain 6 — Cost and Latency Optimization at Scale (8%)
- 6.1 Cost Architecture at Scale — cost modelling and forecasting, model routing and cascades, caching strategy and diagnostics, batch-versus-realtime economics, per-tenant budget enforcement
- 6.2 Latency Engineering — time-to-first-token vs total latency; streaming, parallel tool execution, cache checkpointing, effort-level tuning

### Domain 7 — Runtime Guardrails and Production Security (11%)
- 7.1 Runtime Guardrail Systems — layered guardrails vs a risk profile: input/output filtering, PII redactors, hook-based policy enforcement, destructive-action prevention, sandboxing, approval gates, refusal handling and safety fallbacks, deterministic enforcement for irreversible actions, false-positive/false-negative tuning
- 7.2 Threat Defense and Adversarial Testing for Agentic Systems — prompt injection, tool and memory poisoning, exfiltration paths, unsafe autonomy, the combination of private data, untrusted input and external communication; defence in depth, red-team design, secure MCP configuration, OWASP Top 10 for LLM Applications, NIST AI RMF and its Generative AI Profile
- 7.3 Identity, Secrets, and Audit at Scale — agent identity, workload identity federation replacing static API keys, secrets management, least-privilege tool permissioning, audit logging of security-relevant agent actions

### Domain 8 — Agent Fleet Operations for Software Delivery (10%)
- 8.1 Parallel Agent Orchestration for Engineering Work — parallel agents on isolated worktrees, task decomposition, merge and conflict strategy, fleet-level failure modes from telemetry
- 8.2 Verification and AI Code Review Operations — verification where generation outpaces review; AI code review in shadow mode, calibration against human review before merge gating; human oversight design
- 8.3 Unattended and Event-Driven Agent Operations — agents running toward goals, on schedules, or as event-driven responders (CI/CD incident first response) with checkpointing, notification and escalation
- 8.4 Organization-Wide Coding Agent Configuration — managed settings and policies, MCP allowlists, telemetry, gateway routing, governance with a quality and safety bar for sharing prompts, Skills and MCP servers

## Official sample items [Guide] §7

Three, from Domains 2, 5 and 7, each a short case with a four-option answer:
- **Domain 2:** a single retry path mixes rate-limit errors, responses stopped at the maximum output length and declined requests; the right change *branches on the stop condition* instead of retrying everything.
- **Domain 5:** an LLM-as-judge that picks "the first response" far more often than humans and agrees with them only slightly above half the time; the right first action *randomises order, re-measures against human labels and withholds gating authority* until agreement is acceptable.
- **Domain 7:** an agent that reads tickets, queries a CRM and sends email, where a hidden instruction exfiltrates another customer's record; the right control is *deterministic enforcement outside the model* (recipient allowlisting or approval on the email tool, least-privilege data scoping), since prompt warnings are not an enforceable boundary and logging only detects.

## Decision principles the sample items test [Guide] §7

Classify the failure before applying a remedy; control a measurement instrument (judge, gate) before
trusting it; enforce policy outside the model for irreversible or exfiltrating actions; detection is
not prevention.

## Prep courses and chapters (study and drill by chapter)

Gurinder's instruction: prepare from the courses the guide points to, chapter by chapter. The Developer –
Professional guide names no single course; Anthropic's
[Developer – Professional prep path](https://anthropic-partners.skilljar.com/path/claude-certified-developer-professional)
has **one free course per exam domain** (eight courses), a "Prepare by Course / Exam domain" table, and for each domain a
list of study items grouped under a question ("How do you ...?"). Read on 27 Nov 2026.

What could and could not be read: each course page publicly lists its curriculum (lesson titles and minutes); the lesson
bodies need the free Partner Academy sign-in, which was not used, so no lesson text was read or copied. A **chapter** here is
one of the path page's own study headings for that domain (each groups lessons, docs, articles and cookbook items). Where
the guide tests a skill that no listed lesson or doc covers, the chapter is called "No listed lesson: ... (study the docs)".
The tag says which chapter a question is closest to; the facts behind each answer are in `questions/FACTS-DEV.md`.

Each question carries `course` (the domain's course) and `chapter`. The home screen's "Study by course chapter" panel
drills them. The number after each chapter is how many of the 100 questions carry that tag.

### Production Integration, Reliability, and Knowledge Grounding - 13 min (20 questions)
<https://anthropic-partners.skilljar.com/path/claude-certified-developer-professional/production-integration-reliability-and-knowledge-grounding>

Lessons listed on the course page: Web search: Answers from the sites you trust; CI/CD integration and deployment.

- Why can you get a 429 when you're under your limit? (10)
- How do you recover from an interrupted stream? (1)
- How do you stream a tool call? (0)
- How do you improve retrieval in a RAG system? (2)
- How do you get Claude to cite your own content? (2)
- No listed lesson: MCP connector, migrations and prompt versioning (study the docs) (5)

### Advanced Agent Architecture and Orchestration - 109 min (17 questions)
<https://anthropic-partners.skilljar.com/path/claude-certified-developer-professional/advanced-agent-architecture-and-orchestration>

Lessons listed on the course page: What are subagents?; Designing effective subagents; Using subagents effectively; What is tool use?; What are managed agents?; Building your first managed agent; Context management; How context affects Claude's performance and cost; Sharing skills; Validating skills for plugins; Skills as institutional knowledge; Plugins.

- How does a lead agent delegate to other agents? (3)
- How does an agent keep working across context windows? (9)
- What are Managed Agents, and how do you build one? (3)
- How do you share a skill across a team? (0)
- When should you use a subagent? (0)
- How does Claude use tools, MCP and web search? (2)
- How do you get Claude to pick the right tool? (0)
- How do you check a skill before you share it? (0)

### Observability and Production Monitoring - 29 min (12 questions)
<https://anthropic-partners.skilljar.com/path/claude-certified-developer-professional/observability-and-production-monitoring>

Lessons listed on the course page: Visibility: what you can measure; Closing the loop on metrics; Managing spend.

- How do you trace requests and agent runs? (7)
- How do you monitor Claude Code usage? (0)
- What records can a Claude Enterprise admin keep? (0)
- How do you use production metrics to decide what to work on next? (5)

### Advanced Debugging and Incident Response - 40 min (10 questions)
<https://anthropic-partners.skilljar.com/path/claude-certified-developer-professional/advanced-debugging-and-incident-response>

Lessons listed on the course page: Triage on-call alerts and diagnose incidents; Triage escalations automatically and alert a person only for a P1; Draft the incident postmortem; Support incident postmortem.

- How do you find the root cause of a quality problem? (5)
- How do you use Claude to triage alerts? (2)
- How do you write an incident postmortem? (2)
- How do you troubleshoot a tool call? (1)

### Evaluation Engineering and Quality Assurance - 14 min (12 questions)
<https://anthropic-partners.skilljar.com/path/claude-certified-developer-professional/evaluation-engineering-and-quality-assurance>

Lessons listed on the course page: Continuous evals in CI; Creating tools that Claude picks.

- How do you catch drift in production? (3)
- How do you run evals in CI? (1)
- How do you evaluate an agent whose results vary between runs? (1)
- How do you evaluate an agent's tools? (0)
- No listed lesson: judge calibration and online metrics (study the docs) (7)

### Cost and Latency Optimization at Scale - 58 min (8 questions)
<https://anthropic-partners.skilljar.com/path/claude-certified-developer-professional/cost-and-latency-optimization-at-scale>

Lessons listed on the course page: Choosing the right model; Choosing the right effort level in Claude Code; What is thinking?; Cut the cost of tool-heavy workflows; Parallel tool calling: Cut the latency; Streaming tool calls: No more frozen spinners.

- How do you cut costs in a tool-heavy app? (0)
- How do you reduce latency with parallel tool calls? (1)
- How do you raise the cache hit rate? (2)
- When should you use batch processing? (1)
- How do you cap and track spend? (1)
- How do you choose a model and effort level? (2)
- How does context affect performance and cost? (0)
- No listed lesson: time to first token vs total latency (study the docs) (1)

### Runtime Guardrails and Production Security - 79 min (11 questions)
<https://anthropic-partners.skilljar.com/path/claude-certified-developer-professional/runtime-guardrails-and-production-security>

Lessons listed on the course page: Hooks (Claude Code 101); Hooks; Hooks as approval gates; Permission modes; Trust it: Verifying unsupervised runs; MCP; Connectors; Claude Tag admin guide; How is a multiplayer agent different from traditional AI tools?.

- How do you isolate an agent in production? (2)
- How do you protect an agent from prompt injection? (3)
- How do you require a person's approval before an action? (2)
- How do you control connectors, skills and plugins across an organization? (1)
- What changes when an agent has its own identity and access? (3)

### Agent Fleet Operations for Software Delivery - 52 min (10 questions)
<https://anthropic-partners.skilljar.com/path/claude-certified-developer-professional/agent-fleet-operations-for-software-delivery>

Lessons listed on the course page: Parallel sessions and subagents; Give Claude a feedback loop; AI in the PR review loop; GitHub Actions and Code Review; Scheduled tasks and headless; Steering long sessions; Governing customizations; Put recurring work on a schedule.

- How do you run several coding agents at once? (3)
- How do you use agents in code review and deployment? (3)
- How do you verify an unsupervised run? (1)
- Where should you run long or scheduled tasks? (1)
- How does a team share plugins and skills? (0)
- How do you steer a long Claude Code session? (0)
- No listed lesson: managed settings, MCP allowlists and gateway routing (study the docs) (2)

## Out of scope [Inferred]

- Exam administration (fees, retakes, Pearson logistics).
- Exact per-token prices, model release dates and context-window sizes that change between generations; items reason about relative cost and latency.
- Anything the Developer – Foundations bank already tests at the mechanism level, unless a production-operations trade-off sits on top.
- Anything the Architect Professional bank already tests (solution design, stakeholder and compliance mapping); this track is the *operator's* view.
