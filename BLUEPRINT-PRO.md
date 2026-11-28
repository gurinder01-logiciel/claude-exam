# CCAR-P official blueprint (reference)

Two guide versions are tracked: **v1.1, effective 7 Dec 2026** (next section) and
**v1.0, valid until 6 Dec 2026** (everything after it). The app offers both lengths.

Scope authority for `questions/architect-pro.json` (level **Architect Professional**).
Every fact below is tagged with where it came from:

- **[Guide]** — *Claude Certified Architect – Professional Exam Guide*, Version 1.0,
  effective July 2026, exam code CCAR-P. Public PDF linked as "Exam guide" from the
  [partner certifications page](https://anthropic-partners.skilljar.com/page/partner-certifications)
  (read 23 Nov 2026).
- **[Path]** — public landing page of the
  [Professional prep course path](https://anthropic-partners.skilljar.com/path/claude-certified-architect-professional):
  course description, learning objectives and the five lesson titles. The lessons
  themselves sit behind the Partner Academy login and were **not** read.
- **[FAQ]** — [certification FAQ](https://anthropic-partners.skilljar.com/page/faq-certifications).
- **[ES]** — community study guide `profesional/guia.md` in
  [juanmartincoma-collab/claude-certified-architect-es](https://github.com/juanmartincoma-collab/claude-certified-architect-es)
  (CC-BY-4.0, unofficial). Used as a cross-check of scope only; none of its
  questions were copied.
- **[Inferred]** — our own decision, not stated by any source.

The registration page for the exam
(`/claude-certified-architect-professional-certification`) holds nothing beyond a
register button and a link to the certifications page.

## From 7 Dec 2026 (guide v1.1)

Source: *Claude Certified Architect – Professional Exam Guide*, Version 1.1, effective
December 7, 2026 (read 28 Nov 2026), §4 and §5.

**Exam facts:** 70 items, of which 60 are scored and 10 are unscored (unscored items are
not identified). Scenario-based multiple choice; each item states how many to select.
120 minutes, scaled pass 720 on 100-1,000, $175. In the app: `LENGTH_CHOICES.architectPro`
offers 60, 63 (until 6 Dec) and 70 (from 7 Dec, default).

| # | Domain | v1.1 weight | v1.0 (until 6 Dec) |
| --- | --- | --- | --- |
| 1 | Solution Design and Architecture | 18% | 17% |
| 2 | Claude Models, Prompting, and Context Engineering | 13% | 13% |
| 3 | Integration | 21% | 19% |
| 4 | Evaluation, Testing, and Optimization | 17% | 16% |
| 5 | Governance, Safety, and Risk Management | 16% | 14% |
| 6 | Stakeholder Communication and Lifecycle Management | 7% | 14% |
| 7 | Developer Productivity and Operational Enablement | 8% | 7% |

The v1.1 outline names skills rather than numbered task statements. New or changed ones
(quoted from the guide):

- **Task Delegation Between Claude and Humans (D1):** "Determining which components of a described business process should be delegated to Claude, retained by humans, or handled collaboratively, and justifying each assignment against reversibility, stakes, and accountability."
- **Deployment Surface and Agent Runtime Selection (D1):** "Selecting a deployment surface (Anthropic API, Amazon Bedrock, Google Vertex AI, Microsoft Foundry) and an agent runtime (Messages API loop, self-hosted Agent SDK or headless Claude Code, Claude Managed Agents) under data residency, compliance, model-availability, and operational-ownership constraints..."
- **Architectural Pattern Selection (D1, changed):** adds Skills-based patterns to workflow, agentic and augmented-LLM, and "the delegation boundary the selected pattern establishes".
- **Reasoning Effort and Context Lifecycle (D2, new):** "context editing, memory tool, compaction" for long-running agents; **Prompting Technique Selection** now includes "prompted reasoning versus native thinking".
- **Production Reliability Controls (D3):** "rate-limit handling, retry and backoff, idempotency for side-effecting tools, or fallback routing ... without introducing duplicate effects."
- **Retrieval Architecture Selection (D3, changed):** pre-built RAG vs agentic search vs full-corpus context, plus "contextual-retrieval and fallback configuration".
- **LLM-as-Judge Design and Bias (D4):** correct "the responsible bias (position, verbosity, self-preference, judge drift)".
- **Experimental Design for Configuration Comparison (D4):** "number of trials per case needed to separate the configuration effect from run-to-run variance."
- **Model Version Migration (D4):** "pin, re-tune prompts, re-baseline evaluations, or defer" from a deprecation timeline and regression results.
- **Prompt Injection Surface and Controls (D5):** retrieved documents, tool results, MCP server responses, "third-party Skills".
- **Architectural Controls for Compliance Obligations (D5):** residency and deployment surface, retention and zero-data-retention, PII redaction, audit logging, tenant isolation.
- **Bias Source Identification and Mitigation (D5):** data bias vs prompt-framing vs evaluation-design bias.
- **Packaging and Distributing Claude Code Workflows (D7)** and **Agent SDK and Claude Code Configuration (D7):** plugins, marketplace, managed settings; permission modes default, acceptEdits, plan, auto, dontAsk, bypassPermissions.
- **Accountability for AI-Generated Code (D7):** "the control that preserves human ownership of AI-generated code."
- D6 shrinks to three skills: unsupportable commitments in requirements and SLAs, architecture decision records, operational handoff completeness.

## v1.0 (valid until 6 Dec 2026)

## Exam facts

| | | Source |
| --- | --- | --- |
| Items | **63** | [Guide] §5 |
| Format | Multiple-choice and multiple-response; each item states how many to select | [Guide] §5 |
| Time | 120 minutes | [Guide] §5, [FAQ] |
| Pass | Scaled 720 on 100–1,000; criterion-referenced (standard-setting study) | [Guide] §5, §9 |
| Reporting | Pass/fail + scaled score, plus percent-correct by domain (not used for pass/fail) | [Guide] §5, §9 |
| Fee | $175 USD | [Guide] §5, [FAQ] |
| Validity | 12 months; free non-proctored renewal assessment if renewed on time | [Guide] §5, §14 |
| Delivery | Proctored, Pearson VUE (online or test centre) | [Guide] §5, §10 |
| Retakes | 14 / 30 / 90 days after 1st / 2nd / 3rd fail; max 4 attempts per rolling 12 months | [Guide] §11 |
| Prerequisite | None; Foundations does not convert to Professional | [Guide] §4, [FAQ] |
| Audience | Mid- to senior-level: solution architects, AI/ML engineers, tech leads; 3+ yrs systems architecture, 6+ months Claude/LLMs in production recommended | [Guide] §3–4 |
| Named scenarios | **None published.** Unlike CCAR-F (4 of 6 scenarios), the Professional guide lists no scenario bank; its sample items are short standalone cases | [Guide] §8 |

Our practice level draws **60** of 100 per sitting (not 63) so it keeps the app's
2-minutes-per-question timing on a round 120 minutes **[Inferred]**.

## Domain weights [Guide] §6

| # | Domain | Weight | Items in our 100 |
| --- | --- | --- | --- |
| 1 | Solution Design & Architecture | 17% | 17 |
| 2 | Claude Models, Prompting & Context Engineering | 13% | 13 |
| 3 | Integration | 19% | 19 |
| 4 | Evaluation, Testing & Optimization | 16% | 16 |
| 5 | Governance, Safety & Risk Management | 14% | 14 |
| 6 | Stakeholder Communication & Lifecycle Management | 14% | 14 |
| 7 | Developer Productivity & Operational Enablement | 7% | 7 |

## Task statements [Guide] §6 "Detailed objectives by domain"

Numbering is ours **[Inferred]**; the wording is the guide's.

### Domain 1 — Solution Design & Architecture (17%)
- 1.1 Translate business problems into Claude-based AI solutions
- 1.2 Design end-to-end architectures (input → processing → output → feedback loops)
- 1.3 Select appropriate architectural patterns (workflow, agentic, augmented LLM)
- 1.4 Design multi-agent systems and orchestration strategies
- 1.5 Apply decomposition techniques for complex problem solving
- 1.6 Align solutions to business value pillars (efficiency, transformation, productivity, cost, performance SLAs)

### Domain 2 — Claude Models, Prompting & Context Engineering (13%)
- 2.1 Select appropriate Claude models based on trade-offs
- 2.2 Design system prompts, templates, and guardrails
- 2.3 Apply prompt engineering techniques (zero-shot, few-shot, chain-of-thought)
- 2.4 Optimize context windows and manage token usage
- 2.5 Implement prompt reuse strategies (caching, modular prompts, Skills)

### Domain 3 — Integration (19%)
- 3.1 Evaluate tool/agent configuration for capability bloat
- 3.2 Analyze authentication and authorization requirements to identify security gaps
- 3.3 Evaluate accuracy-latency trade-offs and justify configuration decisions
- 3.4 Analyze observability challenges and select monitoring strategies at scale
- 3.5 Design a RAG pipeline with appropriate chunking and indexing strategies
- 3.6 Apply retrieval strategies matched to data shape and query pattern
- 3.7 Evaluate connection protocols and select the appropriate integration mechanism (MCP, API/CLI, agent-to-agent)
- 3.8 Evaluate progressive discovery vs. monolithic context strategy

### Domain 4 — Evaluation, Testing & Optimization (16%)
- 4.1 Define evaluation metrics (accuracy, latency, cost, safety, security)
- 4.2 Design evaluation datasets and test frameworks using mixed methodologies
- 4.3 Conduct A/B testing and iterative improvements
- 4.4 Diagnose system issues (prompt failure, hallucinations, model mismatch)
- 4.5 Optimize token usage, latency, and cost-performance trade-offs
- 4.6 Monitor system performance using logging and observability tools

### Domain 5 — Governance, Safety & Risk Management (14%)
- 5.1 Implement guardrails and safety controls
- 5.2 Identify risks, limitations, and failure modes of LLM systems
- 5.3 Apply human-in-the-loop validation strategies
- 5.4 Ensure compliance with regulations (e.g., GDPR, HIPAA, FedRAMP)
- 5.5 Address ethical AI considerations (bias, fairness, transparency)

### Domain 6 — Stakeholder Communication & Lifecycle Management (14%)
- 6.1 Conduct structured discovery and requirement gathering
- 6.2 Communicate architectural decisions and trade-offs
- 6.3 Manage stakeholder feedback loops and expectation alignment (including SLAs)
- 6.4 Document architectures and provide implementation guidance
- 6.5 Support lifecycle phases (discovery, design, handoff, monitoring, iteration)

### Domain 7 — Developer Productivity & Operational Enablement (7%)
- 7.1 Configure Claude tools and environments for teams (e.g., Claude Code)
- 7.2 Improve developer workflows using AI-assisted tooling
- 7.3 Support debugging and operational issue resolution

## Course learning objectives [Path]

The prep path ("design, integrate, and govern production-grade Claude systems end
to end, and defend those design decisions to the stakeholders who fund and approve
them") has five lessons: *Claude Platform & Solution Design* (238 min),
*Enterprise Integration & Production* (158), *Responsible AI, Safety & Risk for
Architects* (114), *Stakeholder Engagement, Lifecycle & GTM* (178), *Team
Enablement & Operational Productivity* (45). Its stated objectives, which sharpen
the task statements above:

- Scope an ambiguous business problem: reference architecture, model, context strategy, entry point; accurate and cost-conscious.
- PoC → production: map cost, latency and reliability to a budget; integration patterns an enterprise will accept.
- Full safety stack: input screening, output screening, tool-call authorization, placed so the system **fails closed**.
- Evaluations as acceptance criteria and the gate before any model or architecture change.
- Route decisions to the right reviewer by **confidence, reversibility and cost**; map each compliance obligation to a **named control, owner and evidence artifact**.
- Structured discovery with non-technical stakeholders; trade-offs they can act on; a handoff that survives your absence.
- Team adoption: shared configuration, rollout, developer workflows, operational issue resolution.

## Decision principles the sample items test [Guide] §8, cross-checked with [ES]

From the guide's three sample answers: least privilege means **removing** an
unneeded capability rather than logging or confirming it; put static content first
and cache it to cut cost and latency together; after a data refresh with model and
latency unchanged, look at **retrieval/indexing** first. [ES] adds (unofficial, and
consistent with the guide): least complex pattern that solves; security in the
system layer not the prompt; preserve needed context rather than truncate; localise
a fault by the layer that changed; calibrate human review to risk; chunk by
structure, not fixed size.

## Practice scenarios [Inferred]

The guide publishes no scenario bank, so these six are **our own**, written to
cover the industries the guide names (financial services, healthcare, retail,
technology, government) and the course objectives. They live in `SCENARIOS` in
`index.html` as ids 11–16 so they never collide with the Foundations ids 1–6.

| id | Scenario | Main domains |
| --- | --- | --- |
| 11 | Clinical Documentation Assistant (hospital network, HIPAA) | 1, 2, 3, 5 |
| 12 | Enterprise Knowledge Assistant (global firm, RAG, GDPR) | 3, 4 |
| 13 | Insurance Claims Automation (payout thresholds, explainability) | 1, 4, 5 |
| 14 | Public-Sector Benefits Assistant (federal agency, FedRAMP, fairness) | 3, 5, 6 |
| 15 | E-commerce Support at Scale (cost per contact, latency SLA, A/B) | 2, 4 |
| 16 | Claude Code Enterprise Rollout (600 engineers, shared config) | 6, 7 |

About 10% of items are standalone (`scenario: 0`), like the guide's sample items.

## Out of scope [Inferred]

- Exam administration (fees, retakes, Pearson logistics) — facts above are for orientation only.
- Exact per-token prices, model release dates or context-window sizes that change between model generations; items reason about relative cost/latency instead.
- Legal advice beyond mapping a regulation to the obligation and control it implies.
- Anything the Foundations bank already tests at the mechanism level (stop_reason loops, hook exit codes) unless a Professional trade-off sits on top.
