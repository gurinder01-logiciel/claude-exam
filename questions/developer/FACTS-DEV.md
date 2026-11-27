# FACTS-DEV: verified product facts behind the Developer and Developer Professional banks

Shared by `questions/developer/developer.json` (Developer, CCDVF) and `questions/developer/developer-pro.json`
(Developer Professional, CCDVP). Every question carries a `facts` array of ids from this file;
`facts: []` marks a pure judgment item that rests on the official guide's decision principles
(`BLUEPRINT-DEV.md`, `BLUEPRINT-DEV-PRO.md`) rather than on a product feature.

## How the facts were checked

Each quote was copied from the live page named in its `Source:` line (fetched as markdown on
27 Nov 2026) and is machine-checked: the quote must be a substring of that page after two
normalisations (markdown links flattened to their text, whitespace collapsed; `**` bold markers
and curly quotes are ignored). Re-run the check any time:

```
python3 .claude/skills/bank-audit/verify-facts.py questions/developer/FACTS-DEV.md
```

Result on 27 Nov 2026: every fact in both sections passes (0 failed). The pages are newer than
most model training data (Claude Fable 5.x, Opus 5.5, Sonnet 5.5, Haiku 5.5, Managed Agents, auto mode),
so where an older community bank disagrees with a page below, the page wins.

## Dedupe rule

Both banks were written after reading all 824 questions in `architect`, `architect-pro`, `basic`,
`core`, `scenario`, `foundations-es` and `mock1`-`mock6` (the whole stems, not a keyword search).

- The Architect banks already cover, so these were **not** re-tested: hook exit code 2 and
  PreToolUse blocking, `tool_choice` any/tool basics, strict tool use as a guarantee, hub-and-spoke
  subagent context, CLAUDE.md/rules/skills scoping, `.mcp.json` scopes and secrets, escalation triggers,
  `claude -p` CI flags, Batches API basics, validation-retry loops, confidence calibration.
- Developer (Foundations) tests the *mechanism a developer writes against*: stream events and usage,
  stop-reason handling, cache invalidation and TTL, error classes, Files API blocks, SDK limits and
  result subtypes, hook/permission precedence, structured-output caveats, tool-result rules, MCP
  transports and resources, Skills vs MCP.
- Developer Professional tests the *operator's decision*: fallbacks, backpressure, telemetry, incidents,
  judge calibration, runtime security, coding-agent fleets (see `BLUEPRINT-DEV-PRO.md`).
- Overlaps that remain on purpose: the Opus 5.5 request rules (forced tool choice, prefill, thinking,
  sampling parameters) appear in both banks from different angles (single migration step in Developer,
  fleet/operating consequence in Developer Professional).
- Doc-vs-bank note for the reviewer: the older banks teach `tool_choice` `any`/`tool` as the way to force a
  tool call. The Opus 5.5 migration guide says those types now return a 400 on that model (F-92 and F-93 in section A, cited for context rather than by a question).
  Those items remain correct for models that support forced tool use; they were not changed.

## Section A: Developer (ids F-nn)

### F-01 · Agent SDK max_turns counting
> Count each turn with tool calls, plus one for the final text-only response.
Source: https://platform.claude.com/docs/en/agent-sdk/agent-loop

### F-02 · Agent SDK limit subtypes
> When either limit is hit, the SDK returns a `ResultMessage` with a corresponding error subtype (`error_max_turns` or `error_max_budget_usd`).
Source: https://platform.claude.com/docs/en/agent-sdk/agent-loop

### F-04 · PreToolUse decision priority
> When multiple `PreToolUse` hooks return different decisions, `deny` takes priority over `defer`, which takes priority over `ask`, which takes priority over `allow`.
Source: https://platform.claude.com/docs/en/agent-sdk/hooks

### F-05 · Hook completion order
> Because completion order is non-deterministic, write each hook to act independently rather than relying on another hook having run first.
Source: https://platform.claude.com/docs/en/agent-sdk/hooks

### F-06 · allow hook does not skip deny rules
> A hook that returns `allow` doesn't skip the deny-rule and ask-rule steps, which are evaluated regardless of the hook result.
Source: https://platform.claude.com/docs/en/agent-sdk/permissions

### F-07 · PostToolUse cannot undo
> | `PostToolUse` | No | Shows stderr to Claude; the tool already ran |
Source: https://code.claude.com/docs/en/hooks

### F-08 · Hooks are deterministic control
> which gives you deterministic control: certain actions always happen rather than relying on the LLM to choose to run them.
Source: https://code.claude.com/docs/en/hooks-guide

### F-09 · Managed Agents harness
> Instead of building your own agent loop, tool execution, and runtime, you get a fully managed environment where Claude can read files, run commands, browse the web, and run code securely.
Source: https://platform.claude.com/docs/en/managed-agents/overview

### F-10 · Messages API vs Managed Agents best for
> | **Best for** | Custom agent loops and fine-grained control | Long-running tasks and asynchronous work |
Source: https://platform.claude.com/docs/en/managed-agents/overview

### F-11 · Cloud environment vs self-hosted sandbox
> Cloud environment: Anthropic runs the sandbox for you.
Source: https://platform.claude.com/docs/en/managed-agents/choosing-an-environment

### F-12 · Self-hosted sandbox
> Self-hosted sandbox: You run the sandbox on your own infrastructure.
Source: https://platform.claude.com/docs/en/managed-agents/choosing-an-environment

### F-13 · pause_turn
> A server-tool loop reached its iteration limit. | Send the assistant content back to continue.
Source: https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons

### F-14 · max_tokens stop
> The response reached your `max_tokens` limit. | Raise `max_tokens` or continue the response.
Source: https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons

### F-15 · refusal stop
> Claude declined to respond. | Read `stop_details` and retry on a fallback model.
Source: https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons

### F-16 · context window exceeded stop
> The response filled the model's context window. | Treat the response as truncated.
Source: https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons

### F-19 · Cumulative usage in message_delta
> The token counts shown in the `usage` field of the `message_delta` event are *cumulative*.
Source: https://platform.claude.com/docs/en/build-with-claude/streaming

### F-20 · Content block index
> Each content block has an `index` that corresponds to its index in the final Message `content` array.
Source: https://platform.claude.com/docs/en/build-with-claude/streaming

### F-21 · Mid-stream error event
> For example, during periods of high usage, you might receive an `overloaded_error`, which would normally correspond to an HTTP 529 in a non-streaming context:
Source: https://platform.claude.com/docs/en/build-with-claude/streaming

### F-23 · Cache prefix order
> Prompt caching covers the full prefix: `tools`, `system`, and `messages` (in that order), up to and including the block designated with `cache_control`.
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### F-24 · Cache default lifetime
> By default, the cache has a 5-minute lifetime. The cache is refreshed for no additional cost each time the cached content is used.
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### F-25 · Cache invalidation hierarchy
> Changes at each level invalidate that level and all subsequent levels.
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### F-26 · Tool definition change
> Modifying tool definitions (names, descriptions, parameters) invalidates the entire cache
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### F-27 · Detecting no caching
> if both `cache_creation_input_tokens` and `cache_read_input_tokens` are 0, the prompt was not cached
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### F-28 · Short prompt silently not cached
> Any requests to cache fewer than this number of tokens are processed without caching, and no error is returned.
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### F-29 · Lookback window
> The lookback window is 20 blocks. The system checks at most 20 positions for each breakpoint, counting the breakpoint itself as the first.
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### F-32 · ITPM counts uncached input only
> The API's default ITPM rate limits count only uncached input tokens.
Source: https://platform.claude.com/docs/en/api/rate-limits

### F-33 · Batch window
> Batches expire if processing does not complete within 24 hours.
Source: https://platform.claude.com/docs/en/build-with-claude/batch-processing

### F-36 · Batch result retention
> Batch results are available for 29 days after creation.
Source: https://platform.claude.com/docs/en/build-with-claude/batch-processing

### F-38 · SDK default retries
> By default, the SDK retries a failed request up to two times (three attempts in all).
Source: https://platform.claude.com/docs/en/api/errors

### F-39 · x-should-retry
> If the response has an `x-should-retry` header (`true` or `false`), the SDK follows it.
Source: https://platform.claude.com/docs/en/api/errors

### F-40 · retry-after
> If the response has a `retry-after` header, the SDK waits as long as the header says.
Source: https://platform.claude.com/docs/en/api/errors

### F-42 · 401
> 401 - `authentication_error`: There's an issue with your API key (for example, it's malformed, revoked, or expired; see Key expiration).
Source: https://platform.claude.com/docs/en/api/errors

### F-43 · 403
> 403 - `permission_error`: Your API key does not have permission to use the specified resource.
Source: https://platform.claude.com/docs/en/api/errors

### F-44 · 529
> 529 - `overloaded_error`: The API is temporarily overloaded.
Source: https://platform.claude.com/docs/en/api/errors

### F-45 · 504 long requests
> For long-running Messages API requests, use the streaming Messages API.
Source: https://platform.claude.com/docs/en/api/errors

### F-46 · request-id
> Every API response includes a unique `request-id` header.
Source: https://platform.claude.com/docs/en/api/errors

### F-47 · tool_result ordering
> In the user message containing tool results, the `tool_result` blocks must come FIRST in the content array. Any text must come AFTER all tool results.
Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls

### F-48 · is_error and retry cap
> When a client tool fails or a call is invalid, send a `tool_result` block with `is_error` set to `true`. Claude might then call the tool again with a new `tool_use` block, so limit how many retries your loop allows.
Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls

### F-49 · Tool descriptions
> Provide extremely detailed descriptions. This is by far the most important factor in tool performance.
Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use

### F-51 · Server tool errors
> Unlike with client tools, you don't send `is_error` results for server tools.
Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls

### F-52 · Files API
> The Files API lets you upload and manage files to use with the Claude API without re-uploading content with each request.
Source: https://platform.claude.com/docs/en/build-with-claude/files

### F-53 · file_id blocks
> Refer to an uploaded file by its `file_id` in a `document`, `image` or `container_upload` block.
Source: https://platform.claude.com/docs/en/build-with-claude/files

### F-54 · ZDR and Managed Agents
> note: Not eligible for ZDR, except for self-hosted Managed Agents.
Source: https://platform.claude.com/docs/en/managed-agents/overview

### F-55 · Check ResultMessage subtype
> Check the `subtype` field to determine whether the task succeeded or hit a limit.
Source: https://platform.claude.com/docs/en/agent-sdk/agent-loop

### F-56 · canUseTool
> Use permission modes and rules to define what's allowed automatically, and the `canUseTool` callback to handle calls that still need approval.
Source: https://platform.claude.com/docs/en/agent-sdk/permissions

### F-57 · Memory tool is client-side
> The memory tool operates client-side: Claude requests file operations, and your application runs them.
Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool

### F-58 · Memory persists between sessions
> Claude can create, read, update, and delete files that persist between sessions, building up knowledge over time without keeping everything in the context window.
Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool

### F-59 · Session resume by ID
> Resume a specific past session (not the most recent) | Capture the session ID and pass it to `resume`.
Source: https://platform.claude.com/docs/en/agent-sdk/sessions

### F-60 · Session continue after restart
> Pick up where you left off after a process restart | `continue_conversation=True` (Python) / `continue: true` (TypeScript).
Source: https://platform.claude.com/docs/en/agent-sdk/sessions

### F-61 · Fork a session
> Try an alternative approach without losing the original | Fork the session.
Source: https://platform.claude.com/docs/en/agent-sdk/sessions

### F-62 · Subagent fork copies conversation
> A fork is a subagent that copies the conversation so far instead of starting fresh.
Source: https://platform.claude.com/docs/en/agent-sdk/subagents

### F-63 · Tool input streamed as partial JSON
> By default, the API buffers each key and value in `input` until it is complete.
Source: https://platform.claude.com/docs/en/build-with-claude/streaming

### F-64 · SDK reads CLAUDE.md by default
> When you omit `settingSources`, `query()` reads the same filesystem settings as the Claude Code CLI: user, project, and local settings, CLAUDE.md files, and `.claude/` skills, agents, and commands.
Source: https://code.claude.com/docs/en/agent-sdk/claude-code-features

### F-65 · Programmatic-only SDK config
> To run without these, pass `settingSources: []`, which limits the agent to what you configure programmatically.
Source: https://code.claude.com/docs/en/agent-sdk/claude-code-features

### F-66 · Model IDs are pinned versions
> Each Claude model ID identifies a pinned version of the model.
Source: https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions

### F-67 · Settings precedence
> Settings precedence, highest first: managed settings, command line, project local, shared project, user.
Source: https://code.claude.com/docs/en/settings

### F-68 · Plugin dependency versions
> Each dependency tracks the latest version its marketplace provides unless you declare a version constraint, a semantic-version range such as `^2.0` or `~2.1.0` that you've tested against.
Source: https://code.claude.com/docs/en/plugins/dependencies

### F-69 · Spend-cap 429
> A tier spend-cap 429 has no `retry-after` header and keeps failing until access resumes
Source: https://platform.claude.com/docs/en/api/errors

### F-70 · File block types
> | PDF | `application/pdf` | `document` | Text analysis, document processing |
Source: https://platform.claude.com/docs/en/build-with-claude/files

### F-71 · Image file block type
> | Images | `image/jpeg`, `image/png`, `image/gif`, `image/webp` | `image` | Image analysis, visual tasks |
Source: https://platform.claude.com/docs/en/build-with-claude/files

### F-72 · Context accumulates each turn
> As the conversation advances through turns, each user message and assistant response accumulates within the context window, and previous turns are preserved completely.
Source: https://platform.claude.com/docs/en/build-with-claude/context-windows

### F-74 · Nested CLAUDE.md loads on demand
> Instead of loading them at launch, Claude Code loads each one once Claude reads, writes, or edits another file in that subdirectory.
Source: https://code.claude.com/docs/en/memory

### F-75 · Root CLAUDE.md survives compaction
> Project-root CLAUDE.md survives compaction: after `/compact`, Claude re-reads it from disk and re-injects it into the session.
Source: https://code.claude.com/docs/en/memory

### F-76 · Why instructions vanish after compaction
> If an instruction disappeared after compaction, it was given only in conversation, lives in a nested CLAUDE.md that hasn't reloaded yet, or is a path-scoped rule that hasn't matched a file since.
Source: https://code.claude.com/docs/en/memory

### F-77 · Agent teams
> Teammates work independently, each in its own context window, and communicate directly with each other.
Source: https://code.claude.com/docs/en/agent-teams

### F-78 · Agent teams cost
> Agent teams add coordination overhead and use significantly more tokens than a single session.
Source: https://code.claude.com/docs/en/agent-teams

### F-79 · When not to use agent teams
> For sequential tasks, same-file edits, or work with many dependencies, a single session or subagents are more effective.
Source: https://code.claude.com/docs/en/agent-teams

### F-80 · Worktrees lack gitignored files
> A worktree is a fresh checkout, which means gitignored files like `.env` aren't there and dependencies aren't installed.
Source: https://code.claude.com/docs/en/best-practices

### F-81 · .worktreeinclude
> list the gitignored files you need in a `.worktreeinclude` at the repo root (same syntax as `.gitignore`) and Claude Code copies them into every worktree it creates
Source: https://code.claude.com/docs/en/best-practices

### F-82 · disable-model-invocation
> Stop Claude from invoking a command on its own: add `disable-model-invocation: true` to the command file's frontmatter
Source: https://code.claude.com/docs/en/skills

### F-83 · Plugin definition
> A Claude Code plugin is a directory of skills, agents, hooks, MCP servers, or other components that Claude Code installs and loads as one unit.
Source: https://code.claude.com/docs/en/plugins

### F-84 · Subagent description budget
> When the combined descriptions of your subagents, except the built-in ones, exceed 15,000 tokens, Claude Code shows a warning at startup with the total token count.
Source: https://code.claude.com/docs/en/sub-agents

### F-85 · Trim descriptions
> Trim the `description` fields of your subagents, and move detail into each subagent's system prompt, which only loads when that subagent runs.
Source: https://code.claude.com/docs/en/sub-agents

### F-86 · Commands merged into skills
> Custom commands have been merged into skills. Your existing `.claude/commands/` files keep working.
Source: https://code.claude.com/docs/en/skills

### F-87 · Lower effort before prompt steering
> If you want Claude to think less often, lower the effort level before reaching for prompt-based steering.
Source: https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking

### F-88 · Effort is soft guidance
> The primary control over this determination is the effort parameter, which acts as soft guidance for how often and how deeply Claude uses thinking
Source: https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking

### F-89 · Opus 5.5 thinking cannot be disabled
> `thinking: {"type": "disabled"}` and `thinking: {"type": "enabled", "budget_tokens": N}` both return a 400 error
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### F-90 · Opus 5.5 lower effort to save tokens
> where you disabled thinking to save tokens, use a lower one.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### F-91 · Opus 5.5 sampling parameters
> Omit `temperature`, `top_p`, and `top_k`. Prompting is the recommended way to guide model behavior on Claude Opus 5.5. If you were using `temperature = 0` for determinism, note that it never guaranteed identical outputs on prior models.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### F-92 · Opus 5.5 forced tool use
> `tool_choice` types `any` and `tool` return a 400 error
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### F-93 · Opus 5.5 forced tool use alternative
> Use `auto` with strict tool use or structured outputs, and say in the prompt when the tool applies.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### F-94 · Opus 5.5 prefill
> Don't end `messages` with a prefilled assistant turn: it is rejected.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### F-95 · Opus 5.5 rejections are 400s
> Where an item says a setting is rejected, the API returns a 400 error.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### F-96 · More context is not better
> A larger context window allows the model to handle more complex and lengthy prompts, but more context isn't automatically better.
Source: https://platform.claude.com/docs/en/build-with-claude/context-windows

### F-97 · Context rot
> As token count grows, accuracy and recall degrade, a phenomenon known as *context rot*.
Source: https://platform.claude.com/docs/en/build-with-claude/context-windows

### F-98 · Start with a faster, cheaper model
> For many applications, starting with a faster, more cost-effective model such as Claude Haiku 5.5 can be the optimal approach:
Source: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model

### F-99 · Effort trades within one model
> Several Claude models support an effort parameter that trades intelligence for latency and cost within a single model.
Source: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model

### F-100 · Speed setting invalidates caches
> Switching between `speed: "fast"` and standard speed invalidates system and message caches
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### F-101 · Rolling breakpoint
> In a growing conversation the final block works as long as each turn adds fewer than 20 blocks: earlier content never changes, so the next request's lookback finds the prior write.
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### F-102 · Breakpoint placement
> Place `cache_control` on the last block whose prefix is identical across the requests you want to share a cache.
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### F-103 · One-hour cache
> If 5 minutes is too short, you can use a 1-hour cache duration at additional cost
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### F-104 · One-hour write price
> Cache write tokens with a 1-hour TTL are 2 times the base input tokens price.
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### F-106 · ITPM counts uncached input
> This means when you have cached content, `input_tokens` is typically much smaller than your total input.
Source: https://platform.claude.com/docs/en/api/rate-limits

### F-107 · Effort controls tokens spent
> The effort parameter lets you control how many tokens Claude spends when responding to requests.
Source: https://platform.claude.com/docs/en/build-with-claude/effort

### F-108 · Fresh session per task
> Every request sends the whole conversation, so a session that's collected three unrelated tasks re-reads all three on every turn of the fourth.
Source: https://code.claude.com/docs/en/best-practices

### F-109 · Fresh session after a spec
> Once `SPEC.md` exists, start a fresh session to build from it, so the build begins with a clean context and a written definition of done.
Source: https://code.claude.com/docs/en/best-practices

### F-110 · Server-side compaction
> Compaction replaces the older turns of a conversation with a summary that Claude writes on the server, so you need no summarization code of your own.
Source: https://platform.claude.com/docs/en/build-with-claude/compaction

### F-111 · Tool result clearing
> Tool result clearing: Best for agentic workflows with heavy tool use where old tool results are no longer needed
Source: https://platform.claude.com/docs/en/build-with-claude/context-editing

### F-112 · Context editing threshold
> The `clear_tool_uses_20250919` strategy clears tool results when conversation context grows beyond your configured threshold.
Source: https://platform.claude.com/docs/en/build-with-claude/context-editing

### F-113 · Say what to do
> Tell Claude what to do instead of what not to do
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

### F-114 · Examples
> Include 3–5 examples for best results.
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

### F-115 · Example tags
> Wrap examples in `<example>` tags (multiple examples in `<examples>` tags) so Claude can distinguish them from instructions.
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

### F-116 · Long data first
> Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples.
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

### F-117 · Query at the end
> Queries at the end can improve response quality by up to 30 percent in tests, especially with complex, multidocument inputs.
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

### F-118 · Quote first
> For long document tasks, ask Claude to quote relevant parts of the documents first before carrying out its task.
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

### F-120 · Structured outputs and constrained decoding
> Structured outputs guarantee schema-compliant responses through constrained decoding:
Source: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

### F-121 · Structured outputs on max_tokens
> The output might be incomplete and not match your schema.
Source: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

### F-122 · Structured outputs retry on max_tokens
> Retry with a higher `max_tokens` value to get the complete structured output.
Source: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

### F-123 · Structured outputs and refusals
> The output might not match your schema because the refusal message takes precedence over schema constraints.
Source: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

### F-124 · Enum casing
> Structured outputs don't guarantee the capitalization of string `enum` and `const` values: Claude might return a value that differs from your schema only in capitalization, typically in the first letter of a word following a space.
Source: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

### F-125 · SDK schema transformation
> Remove unsupported constraints (for example, `minimum`, `maximum`, `minLength`, `maxLength`)
Source: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

### F-126 · SDK validates against original schema
> Validate responses against your original schema and all its constraints, if the helper validates responses
Source: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

### F-127 · Citations
> Citations return the exact passages that support each claim, so you can verify answers and surface sources to your users.
Source: https://platform.claude.com/docs/en/build-with-claude/citations

### F-128 · Search result blocks
> Search result content blocks let Claude cite your own content the same way it cites web search results: each citation carries the source and title you provided.
Source: https://platform.claude.com/docs/en/build-with-claude/search-results

### F-129 · Web fetch exfiltration risk
> Enabling the web fetch tool in environments where Claude processes untrusted input alongside sensitive data poses data exfiltration risks.
Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool

### F-130 · Web fetch allowed domains
> Using the `allowed_domains` parameter to restrict to known safe domains
Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool

### F-131 · Prompt injection definition
> Prompt injection is a technique where an attacker attempts to override or manipulate an AI assistant's instructions by inserting malicious text.
Source: https://code.claude.com/docs/en/security

### F-132 · Sandboxed Bash
> Sandboxed Bash tool: Sandbox Bash commands with filesystem and network isolation.
Source: https://code.claude.com/docs/en/security

### F-133 · Sandbox boundaries
> You set which files and network domains those commands can reach, and the limits apply to Bash, PowerShell, and Monitor commands and the processes they start.
Source: https://code.claude.com/docs/en/sandboxing

### F-134 · Admin API keys
> An Admin API key authenticates calls to the APIs that manage and report on your organization, such as the Admin API and the Compliance API.
Source: https://platform.claude.com/docs/en/manage-claude/admin-api-keys

### F-135 · Workspace-scoped keys
> API keys can be scoped to a single workspace.
Source: https://platform.claude.com/docs/en/manage-claude/workspaces

### F-136 · Workspaces separate environments
> Use workspaces to separate different projects, environments, or teams while maintaining centralized billing and administration.
Source: https://platform.claude.com/docs/en/manage-claude/workspaces

### F-137 · input_examples
> Prioritize descriptions, but consider using `input_examples` for complex tools.
Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use

### F-138 · Parallel calls and ordering
> Tools with side effects, shared state, or ordering requirements might be better run sequentially.
Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use

### F-139 · Skipped parallel calls still need a result
> If you choose not to run a particular call (for example, because you ran the batch sequentially and an earlier call failed), still return a `tool_result` for it with `is_error: true` and a brief explanation.
Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use

### F-140 · HTTP for remote MCP servers
> HTTP servers are the recommended option for connecting to remote MCP servers.
Source: https://code.claude.com/docs/en/mcp

### F-141 · MCP resources via @ mentions
> MCP servers can expose resources that you can reference using @ mentions, similar to how you reference files.
Source: https://code.claude.com/docs/en/mcp

### F-142 · MCP list_changed
> An MCP server can change the tools, prompts, or resources it offers while connected and send a `list_changed` notification.
Source: https://code.claude.com/docs/en/mcp

### F-143 · SDK MCP transports
> MCP servers can run as local processes, connect over HTTP, or execute directly within your SDK application.
Source: https://code.claude.com/docs/en/agent-sdk/mcp

### F-144 · In-process custom tools
> Define custom tools with the Claude Agent SDK's in-process MCP server so Claude can call your functions, hit your APIs, and perform domain-specific operations.
Source: https://code.claude.com/docs/en/agent-sdk/custom-tools

### F-145 · Skills only cost name and description until used
> until a Skill is triggered, only its name and description occupy context.
Source: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview

### F-146 · Skills definition
> Skills are reusable, filesystem-based resources that give Claude domain-specific expertise: workflows, context, and best practices that turn a general-purpose agent into a specialist.
Source: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview

### F-147 · MCP definition
> The Model Context Protocol (MCP) is an open standard for connecting AI agents to external tools and data sources.
Source: https://code.claude.com/docs/en/agent-sdk/mcp


## Section B: Developer Professional (ids P-nn)

### P-01 · Spend-cap 429 has no retry-after
> A tier spend-cap 429 has no `retry-after` header and keeps failing until access resumes; see Reaching your spend cap for how to recognize it.
Source: https://platform.claude.com/docs/en/api/errors

### P-02 · Telling spend cap from rate limit
> To tell the spend cap from a rate limit in code, check the error code.
Source: https://platform.claude.com/docs/en/api/errors

### P-03 · Ramp limits
> After a sharp increase in usage, requests can return a 429 error even while you’re under your ITPM and OTPM rate limits.
Source: https://platform.claude.com/docs/en/api/rate-limits

### P-04 · Ramp limit definition
> Your ramp limit is your organization’s highest per-minute usage of the model in the recent past, plus a step. Each minute you can go up to a step above that peak, so the limit rises as your successful usage grows. It stops rising at your rate limit. After a period of lower usage, the ramp limit comes back down.
Source: https://platform.claude.com/docs/en/api/rate-limits

### P-05 · Cached tokens and ITPM
> The API’s default ITPM rate limits count only uncached input tokens.
Source: https://platform.claude.com/docs/en/api/rate-limits

### P-06 · OTPM counts generated tokens only
> OTPM rate limits are evaluated in real time as output tokens are produced, counting only the actual tokens generated. The `max_tokens` parameter does not factor into OTPM rate limit calculations, so there is no rate limit downside to setting a higher `max_tokens` value.
Source: https://platform.claude.com/docs/en/api/rate-limits

### P-07 · Workspace limits
> The API enforces service-configured limits at the organization level, but you can also set user-configurable limits for your organization’s workspaces.
Source: https://platform.claude.com/docs/en/api/rate-limits

### P-08 · Workspace cap
> Creating a workspace at the limit returns a `400` error with the message `Workspace limit reached`.
Source: https://platform.claude.com/docs/en/manage-claude/workspaces

### P-09 · SDK default retries
> By default, the SDK retries a failed request up to two times (three attempts in all).
Source: https://platform.claude.com/docs/en/api/errors

### P-10 · Mid-stream errors
> When receiving a streaming response over server-sent events (SSE), an error can occur after the API returns a 200 response.
Source: https://platform.claude.com/docs/en/api/errors

### P-11 · SDK does not retry stream errors
> The SDK doesn’t retry an error in a stream.
Source: https://platform.claude.com/docs/en/api/errors

### P-12 · Request ID
> Every API response includes a unique `request-id` header.
Source: https://platform.claude.com/docs/en/api/errors

### P-13 · Refusal is a normal response
> When that happens, you receive a normal response, not an error, with `stop_reason: "refusal"`.
Source: https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback

### P-14 · Server-side fallback scope
> Only a safety classifier decline triggers the fallback. A rate limit, overload, or server error on the requested model is returned to you as-is.
Source: https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback

### P-15 · Partial output on refusal
> A refusal can arrive before any output, or mid-stream after partial output. In either case, treat any partial output as incomplete and discard it.
Source: https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback

### P-16 · reasoning_extraction refusals
> A `reasoning_extraction` refusal usually comes from a prompt that asks the model to put its thinking or reasoning in the output, either verbatim or in a fixed format.
Source: https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback

### P-17 · Haiku 5.5 fallback parity
> Claude Haiku 5.5 has neither server-side fallback nor fallback credit, so use the SDK middleware or a manual retry.
Source: https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback

### P-18 · Truncated tool use
> If Claude’s response is cut off because it hit the `max_tokens` limit, and the truncated response contains an incomplete tool use block, you’ll need to retry the request with a higher `max_tokens` value to get the full tool use.
Source: https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons

### P-19 · Cache diagnostics
> Pass the `id` of your previous response, and the API compares the two requests.
Source: https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics

### P-20 · Cache is per model
> The `model` differs from the previous request (for example, a router, A/B test, or fallback selected a different model). The cache is per-model.
Source: https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics

### P-21 · tools_changed
> The `tools` array differs: tools were added, removed, or reordered between turns, or tool `input_schema` JSON was serialized non-deterministically.
Source: https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics

### P-22 · Batch and 1-hour cache
> Because batches can take longer than 5 minutes to process, consider using the 1-hour cache duration with prompt caching for better cache hit rates when processing batches with shared context.
Source: https://platform.claude.com/docs/en/build-with-claude/batch-processing

### P-23 · No pre-warming inside a batch
> `max_tokens: 0` (cache pre-warming) is not supported inside a batch, because an ephemeral cache entry written during batch processing would likely expire before the follow-up request runs.
Source: https://platform.claude.com/docs/en/build-with-claude/batch-processing

### P-24 · Cache isolation by workspace
> On the Claude API, Claude Platform on AWS, and Microsoft Foundry, caches are also isolated between workspaces.
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### P-25 · Batch discount
> The Message Batches API offers a 50 percent discount on all usage compared to standard API prices.
Source: https://platform.claude.com/docs/en/build-with-claude/batch-processing

### P-26 · Batch expiry
> Batches expire if processing does not complete within 24 hours.
Source: https://platform.claude.com/docs/en/build-with-claude/batch-processing

### P-27 · Expired request result
> Batch reached its 24-hour expiration before this request could be sent to the model.
Source: https://platform.claude.com/docs/en/build-with-claude/batch-processing

### P-28 · Mid-conversation system messages
> You append a `{"role": "system"}` message at the point in the conversation where the new instruction becomes relevant, instead of editing the top-level `system` field.
Source: https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages

### P-29 · Editing tools invalidates the whole cache
> The `tools` array sits even earlier in the hashed request prefix than the top-level `system` field, so editing it invalidates the prompt cache for the entire conversation.
Source: https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages

### P-30 · Declare tools up front, deferred
> A tool you know about at the first request belongs in `tools`, with `defer_loading: true` and a later `tool_addition` reference if you don’t want to offer it to the model yet.
Source: https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages

### P-31 · Tool result clearing use case
> Best for agentic workflows with heavy tool use where old tool results are no longer needed
Source: https://platform.claude.com/docs/en/build-with-claude/context-editing

### P-32 · Tool result clearing and cache
> Invalidates cached prompt prefixes when content is cleared.
Source: https://platform.claude.com/docs/en/build-with-claude/context-editing

### P-33 · clear_at_least
> Use the `clear_at_least` parameter to ensure a minimum number of tokens is cleared each time.
Source: https://platform.claude.com/docs/en/build-with-claude/context-editing

### P-34 · Programmatic tool calling
> This reduces latency for multi-tool workflows and decreases token consumption by allowing Claude to filter or process data before it reaches the model’s context window.
Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling

### P-35 · Model IDs are fixed
> Anthropic does not update the weights or configuration of an existing model ID.
Source: https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions

### P-36 · Forced tool choice rejected on Opus 5.5
> Forcing a tool call with `{"type": "any"}` or `{"type": "tool", "name": "..."}` is rejected.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### P-37 · Responses start with thinking blocks
> Code that reads the reply by position, such as `content[0].text` or a stream handler that treats the first `content_block_start` event as text, breaks on these responses.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### P-38 · Effort default changed
> Set `effort` explicitly: the default is `medium`, where Claude Opus 5’s is `high`.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### P-39 · Re-baseline after migration
> Re-baseline cost and latency at your chosen effort level.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### P-40 · Routing off the model drops thinking blocks
> If a router or fallback can move a conversation off Claude Opus 5.5, expect the new model to run without Claude Opus 5.5’s thinking blocks.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### P-41 · Sampling parameters omitted
> Omit `temperature`, `top_p`, and `top_k`. Use prompting to guide the model’s behavior.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### P-42 · Thinking billed as output
> Thinking tokens are billed as output tokens, so these workloads can produce more output tokens per request.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### P-43 · Cyber Verification Program
> If your product does legitimate security work, apply to the Cyber Verification Program for access to lower restrictions on cyber content.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### P-44 · Citations vs structured outputs
> Citations cannot be used together with structured outputs.
Source: https://platform.claude.com/docs/en/build-with-claude/citations

### P-45 · Search result blocks
> Search result content blocks let Claude cite your own content the same way it cites web search results: each citation carries the source and title you provided.
Source: https://platform.claude.com/docs/en/build-with-claude/search-results

### P-46 · MCP connector reachability
> The server must be publicly exposed through HTTP (supports both Streamable HTTP and SSE transports).
Source: https://platform.claude.com/docs/en/agents-and-tools/mcp-connector

### P-47 · Unknown tool names in configs
> If a tool name in `configs` doesn’t exist on the MCP server, a backend warning is logged but no error is returned (MCP servers might have dynamic tool availability).
Source: https://platform.claude.com/docs/en/agents-and-tools/mcp-connector

### P-48 · Managed Agents version pinning
> This lets you control exactly which version runs and stage rollouts of new versions independently.
Source: https://platform.claude.com/docs/en/managed-agents/sessions

### P-49 · String agent ID means latest version
> ID as a string creates the session with the latest agent version.
Source: https://platform.claude.com/docs/en/managed-agents/sessions

### P-50 · OTel default content mode
> Metadata only (`metadata_only` in the SDK): The default. Spans include identifiers, timing, status, token counts, and text that you choose, such as the names and descriptions of your agents and tools and the names of your MCP servers.
Source: https://platform.claude.com/docs/en/manage-claude/opentelemetry

### P-51 · Full content under ZDR
> For Messages API requests, the API holds the exported content only in memory until it delivers it to the destination.
Source: https://platform.claude.com/docs/en/manage-claude/opentelemetry

### P-52 · Data-handling restrictions force metadata
> If your organization has a HIPAA, FERPA, or K-12 data-handling restriction with Anthropic, destinations export only metadata regardless of their content mode. SDK spans aren’t affected.
Source: https://platform.claude.com/docs/en/manage-claude/opentelemetry

### P-53 · traceparent sampled flag
> If the sampled flag in the header is off, the API doesn’t emit the request’s span or the spans under it.
Source: https://platform.claude.com/docs/en/manage-claude/opentelemetry/api

### P-54 · At-least-once span delivery
> A destination can receive the same span more than once. To remove duplicates, use the trace ID and span ID.
Source: https://platform.claude.com/docs/en/manage-claude/opentelemetry/api

### P-55 · Best-effort span delivery
> A span can be lost before delivery. The API can’t send a lost span again.
Source: https://platform.claude.com/docs/en/manage-claude/opentelemetry/api

### P-56 · Usage and Cost API latency
> Usage and cost data typically appears within 5 minutes of API request completion, though delays might occasionally be longer.
Source: https://platform.claude.com/docs/en/manage-claude/usage-cost-api

### P-57 · Agent SDK parallel tool messages share an ID
> When Claude uses multiple tools in one turn, all messages in that turn share the same ID, so deduplicate by ID to avoid double-counting.
Source: https://code.claude.com/docs/en/agent-sdk/cost-tracking

### P-58 · Resumed calls report whole session spend
> Read the latest result for the session total; summing results double-counts the restored spend.
Source: https://code.claude.com/docs/en/agent-sdk/cost-tracking

### P-59 · Input token accounting
> total_input_tokens = cache_read_input_tokens + cache_creation_input_tokens + input_tokens
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### P-60 · Session store for multi-host resume
> A `SessionStore` adapter lets you mirror those transcripts to your own backend, such as an object store, a key-value store, or a database, so a session created on one host can be resumed on another host running from a matching working directory.
Source: https://code.claude.com/docs/en/agent-sdk/session-storage

### P-61 · projectKey encodes the working directory
> Because `projectKey` encodes the working directory, resume or continue from the store from a working directory matching the original run's.
Source: https://code.claude.com/docs/en/agent-sdk/session-storage

### P-62 · Local agent state is lost on restart
> None of them survive a container restart, a scale-down, or a move to a different node.
Source: https://code.claude.com/docs/en/agent-sdk/hosting

### P-63 · Managed Agents when you need not host the loop
> If you don't need to run the agent loop itself on your own infrastructure, consider Managed Agents instead.
Source: https://code.claude.com/docs/en/agent-sdk/hosting

### P-64 · File checkpointing and Bash
> `rewindFiles()` doesn't undo what `sed -i` or another Bash command did to a file, unless a tool such as Write or Edit had modified that file in the main conversation.
Source: https://code.claude.com/docs/en/agent-sdk/file-checkpointing

### P-65 · Deferring a long approval
> If a user might take longer to respond than your process can reasonably stay running, register a `PreToolUse` hook that returns the `defer` decision instead of waiting in the callback, so the process can exit and resume later from the persisted session.
Source: https://code.claude.com/docs/en/agent-sdk/user-input

### P-66 · Reconnecting to a Managed Agents stream
> List the full event history to seed a set of seen event IDs.
Source: https://platform.claude.com/docs/en/managed-agents/events-and-streaming

### P-67 · Subagents share one sandbox
> All agents share the same sandbox, filesystem, and vault credentials, but each agent runs in its own session thread, a context-isolated event stream with its own conversation history.
Source: https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration

### P-68 · Permission policy defaults
> Each toolset kind has its own default: the agent toolset defaults to `always_allow`, and MCP toolsets default to `always_ask`.
Source: https://platform.claude.com/docs/en/managed-agents/permission-policies

### P-69 · Why MCP toolsets default to ask
> This ensures that new tools added to an MCP server do not run in your application without approval.
Source: https://platform.claude.com/docs/en/managed-agents/permission-policies

### P-70 · auto policy can run a call
> When the server determines that the call is safe, the tool runs as it would under `always_allow`.
Source: https://platform.claude.com/docs/en/managed-agents/permission-policies

### P-71 · Where intent is read from
> The server does not read intent from a tool result, a fetched webpage, an MCP server’s response, or a message between session threads.
Source: https://platform.claude.com/docs/en/managed-agents/permission-policies

### P-72 · evaluated_permission on events
> Under any permission policy, each `agent.tool_use` and `agent.mcp_tool_use` event carries `evaluated_permission`, the outcome of the call’s permission check: `"allow"`, `"ask"`, or `"deny"`.
Source: https://platform.claude.com/docs/en/managed-agents/permission-policies

### P-73 · Budget reached is idle, not terminated
> it is not terminated, and its history and sandbox are preserved like any other idle session’s.
Source: https://platform.claude.com/docs/en/managed-agents/budgets

### P-74 · Resuming at budget
> An accepted update automatically resumes the work that the budget paused; no further client action is needed.
Source: https://platform.claude.com/docs/en/managed-agents/budgets

### P-75 · Budgets use list cost
> List cost is not your contracted price: if your organization has negotiated discounts, the session reaches its cap when the list-price total does, and your billed spend might be lower than the cap.
Source: https://platform.claude.com/docs/en/managed-agents/budgets

### P-76 · Memory poisoning risk
> If the agent processes untrusted input (user-supplied prompts, fetched web content, or third-party tool output), a successful prompt injection could write malicious content into the store.
Source: https://platform.claude.com/docs/en/managed-agents/memory

### P-77 · Read-only memory stores
> Use `read_only` for reference material, shared lookups, and any store the agent does not need to modify.
Source: https://platform.claude.com/docs/en/managed-agents/memory

### P-78 · Memory versions
> Every change to a memory creates an immutable memory version, giving you an audit trail and point-in-time recovery for everything the agent writes.
Source: https://platform.claude.com/docs/en/managed-agents/memory

### P-79 · Workload identity federation
> Workload Identity Federation (WIF) lets your workloads authenticate to the Claude API with short-lived OpenID Connect (OIDC) tokens instead of long-lived `sk-ant-...` API keys.
Source: https://platform.claude.com/docs/en/manage-claude/workload-identity-federation

### P-80 · Federation rule subject matching
> A `subject_prefix` is an exact match, such as `system:serviceaccount:prod:worker`, or a prefix match with a trailing `*`.
Source: https://platform.claude.com/docs/en/manage-claude/workload-identity-federation

### P-81 · Minted tokens follow workspace attribution
> The minted token then follows that workspace’s rate limits and usage attribution, the same as an API key.
Source: https://platform.claude.com/docs/en/manage-claude/workload-identity-federation

### P-82 · Credential-injecting proxy
> For example, rather than giving an agent direct access to an API key, you could run a proxy outside the agent's environment that injects the key into requests.
Source: https://code.claude.com/docs/en/agent-sdk/secure-deployment

### P-83 · Credentials for allowed domains
> If the agent has permissive credentials for an allowed domain, ensure it cannot use that domain to trigger other network requests or to exfiltrate data.
Source: https://code.claude.com/docs/en/agent-sdk/secure-deployment

### P-84 · Sandbox default reads
> Most of the machine, including credential files such as `~/.ssh` and `~/.aws/credentials`
Source: https://code.claude.com/docs/en/sandboxing

### P-85 · Sandbox environment variables
> Inherited from Claude Code, including any secrets in its environment
Source: https://code.claude.com/docs/en/sandboxing

### P-86 · Built-in tools are outside the sandbox
> tools such as Read, Edit, Write, WebFetch, and WebSearch follow permission rules instead.
Source: https://code.claude.com/docs/en/sandboxing

### P-87 · Hooks fail open by default
> On most events, when a hook fails or times out, Claude Code still carries out the action.
Source: https://code.claude.com/docs/en/hooks

### P-88 · onFailure block
> To block the action instead, set `"onFailure": "block"` on a `command`, `http`, or `mcp_tool` hook.
Source: https://code.claude.com/docs/en/hooks

### P-89 · Managed MCP soft allowlist
> Enforce an allowlist that users can broaden in their own settings
Source: https://code.claude.com/docs/en/managed-mcp

### P-90 · Managed MCP approved catalog
> Publish a list of approved servers; users add the ones they want, anything else is blocked
Source: https://code.claude.com/docs/en/managed-mcp

### P-91 · Gateway-only routing
> To make a gateway reached through `ANTHROPIC_BASE_URL` the only destination a managed machine may use, set `allowedProviders` to `["customEndpoint"]` in the same managed settings file and put the gateway's `ANTHROPIC_BASE_URL` in that file's `env` block.
Source: https://code.claude.com/docs/en/llm-gateway

### P-92 · Server-managed settings for cloud sessions
> Endpoint-managed settings don't reach cloud sessions in Anthropic-hosted environments, so organizations whose developers run cloud sessions should configure server-managed settings as well.
Source: https://code.claude.com/docs/en/server-managed-settings

### P-94 · prompt.id correlation
> To trace all activity triggered by a single prompt, filter your events by a specific `prompt.id` value.
Source: https://code.claude.com/docs/en/monitoring-usage

### P-95 · Non-interactive worktrees are not cleaned up
> Non-interactive runs with `-p` have no exit prompt, so Claude doesn't clean up their worktrees, and Claude Code leaves the lock it took on each one at creation in place until a later session's stale-lock sweep releases it.
Source: https://code.claude.com/docs/en/worktrees

### P-96 · Agent teams file overwrites
> Two teammates editing the same file leads to overwrites.
Source: https://code.claude.com/docs/en/agent-teams

### P-97 · Code Review does not gate by itself
> By itself, a review doesn't approve or block the pull request.
Source: https://code.claude.com/docs/en/code-review

### P-98 · Code Review instruction source
> `REVIEW.md` from the base or default branch and never from the pull request's own changes.
Source: https://code.claude.com/docs/en/code-review

### P-99 · Approvals observe mode
> In observe mode, the check shows what your policy would decide.
Source: https://code.claude.com/docs/en/approvals

### P-100 · Session-scoped loops
> Tasks only fire while Claude Code is running and idle.
Source: https://code.claude.com/docs/en/scheduled-tasks

### P-101 · Cloud scheduled tasks
> Scheduled tasks execute on Anthropic-managed cloud infrastructure, or on your organization's self-hosted environment when routed there, so they keep working when your laptop is closed.
Source: https://code.claude.com/docs/en/routines

### P-102 · /goal evaluator reads only the transcript
> It doesn't run commands or read files independently, so write the condition as something Claude's own output can demonstrate.
Source: https://code.claude.com/docs/en/goal

### P-103 · Fast mode improves OTPS, not TTFT
> Speed benefits are focused on output tokens per second (OTPS), not time to first token (TTFT)
Source: https://platform.claude.com/docs/en/build-with-claude/fast-mode

### P-104 · Speed switch invalidates caches
> Switching between `speed: "fast"` and standard speed invalidates system and message caches
Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

### P-105 · Effort covers all tokens
> The effort parameter affects all tokens in the response, including:
Source: https://platform.claude.com/docs/en/build-with-claude/effort

### P-106 · Eval volume
> More questions with slightly lower signal automated grading is better than fewer questions with high-quality human hand-graded evals.
Source: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

### P-107 · Task-specific evals
> Design evals that mirror your real-world task distribution.
Source: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

### P-108 · Client-side MCP helpers
> If you manage your own MCP client connection (for example, with local stdio servers, MCP prompts, or MCP resources), the SDK provides helper functions that convert between MCP types and Claude API types.
Source: https://platform.claude.com/docs/en/agents-and-tools/mcp-connector

### P-109 · Prefill rejected on Opus 5.5
> Don’t end `messages` with a prefilled assistant turn: it is rejected.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### P-110 · OTEL_LOG_USER_PROMPTS is a Claude Code setting
> Enable logging of user prompt content (default: disabled)
Source: https://code.claude.com/docs/en/monitoring-usage

### P-111 · Refusal category
> Its `stop_details.category` names the policy area (see What a refusal looks like).
Source: https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback

### P-112 · Events rejected at the budget cap
> Any event that would start new work, such as `user.message`, is rejected with a 400 error naming this list.
Source: https://platform.claude.com/docs/en/managed-agents/budgets

### P-113 · Budget enforced between requests
> The cap is enforced between model requests, not mid-request.
Source: https://platform.claude.com/docs/en/managed-agents/budgets

### P-114 · Reported list cost rounding
> a reported figure can read up to half a cent either side of the exact amount enforcement uses.
Source: https://platform.claude.com/docs/en/managed-agents/budgets

### P-115 · Running time is part of list cost
> Session running time, at $0.08 USD per hour
Source: https://platform.claude.com/docs/en/managed-agents/budgets

### P-116 · Fast mode pricing
> Fast mode delivers up to 2.5x higher output tokens per second at premium pricing.
Source: https://platform.claude.com/docs/en/build-with-claude/fast-mode

### P-117 · Fast mode is the same model
> Fast mode runs the same model with a faster inference configuration.
Source: https://platform.claude.com/docs/en/build-with-claude/fast-mode

### P-118 · Thinking cannot be disabled on Opus 5.5
> on Claude Opus 5.5 they run with thinking, and thinking can’t be disabled.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### P-120 · All WIF matchers must pass
> All configured matchers must pass for Anthropic to accept the JWT.
Source: https://platform.claude.com/docs/en/manage-claude/workload-identity-federation

### P-121 · Managed Agents sessions persist
> Sessions are stateful resources; transcripts persist until you delete them.
Source: https://platform.claude.com/docs/en/managed-agents/overview

### P-122 · More teammates, more conflicts
> more teammates means more communication, task coordination, and potential for conflicts
Source: https://code.claude.com/docs/en/agent-teams

### P-123 · Code Review check does not fail
> The check run doesn't conclude as a failure.
Source: https://code.claude.com/docs/en/code-review

### P-124 · No catch-up for loops
> No catch-up for missed fires.
Source: https://code.claude.com/docs/en/scheduled-tasks

### P-125 · Resume restores unexpired loops
> When you resume with `--resume` or `--continue`, Claude Code restores tasks that haven't expired, except those listed under Limitations.
Source: https://code.claude.com/docs/en/scheduled-tasks

### P-126 · MCP allowlist lock
> Without `allowManagedMcpServersOnly`, allowlists from every settings scope merge, including a user's own `~/.claude/settings.json`, so a user can broaden what your allowlist permits.
Source: https://code.claude.com/docs/en/managed-mcp

### P-127 · Unsandboxed retries
> The retried command runs unsandboxed.
Source: https://code.claude.com/docs/en/sandboxing

### P-128 · Opus 4.8 ran without thinking by default
> On Claude Opus 4.8 and earlier Opus models, requests without a `thinking` field run without thinking.
Source: https://platform.claude.com/docs/en/models/opus-5-5/migration-guide

### P-129 · User messages carry intent
> What you post in `user.message` events counts as your intent, and it can lead the server to allow a call it would otherwise deny.
Source: https://platform.claude.com/docs/en/managed-agents/permission-policies

### P-130 · Default transcript location
> By default, the SDK writes session transcripts to JSONL files under `~/.claude/projects/` on the local filesystem.
Source: https://code.claude.com/docs/en/agent-sdk/session-storage

### P-131 · Which statuses the SDK retries
> Otherwise, the SDK retries connection errors, timeouts, and the statuses 408, 409, 429, and 500 and above.
Source: https://platform.claude.com/docs/en/api/errors

### P-132 · Citations point into documents
> citations are guaranteed to contain valid pointers to the provided documents.
Source: https://platform.claude.com/docs/en/build-with-claude/citations

### P-133 · Compaction summarises older turns
> Compaction replaces the older turns of a conversation with a summary that Claude writes on the server, so you need no summarization code of your own.
Source: https://platform.claude.com/docs/en/build-with-claude/compaction
