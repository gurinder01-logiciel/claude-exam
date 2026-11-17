#!/usr/bin/env node
// PreToolUse hook: blocks edits to CCAF_Exam_Simulator.html.
// That file is an old self-contained snapshot with the bank inlined; it does not
// deploy, so edits there silently do nothing (CLAUDE.md § Architecture).
// Exit 2 = block the tool call; stderr is shown to Claude as the reason.
let s = '';
for await (const chunk of process.stdin) s += chunk;
let file = '';
try { file = JSON.parse(s || '{}').tool_input?.file_path || ''; } catch { process.exit(0); }
if (file.endsWith('CCAF_Exam_Simulator.html')) {
  console.error('Blocked: CCAF_Exam_Simulator.html is an old snapshot that does not deploy. Make the change in index.html (app) or questions/*.json (banks) instead.');
  process.exit(2);
}
