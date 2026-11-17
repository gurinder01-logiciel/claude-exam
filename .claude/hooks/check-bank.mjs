#!/usr/bin/env node
// Validates question-bank JSON (questions/*.json).
//
// Two ways in:
//   - PostToolUse hook: reads the hook payload on stdin, validates the edited
//     file if it is a question bank, exits 2 with the problems on stderr so
//     Claude sees them and fixes the file. Any other file: exits 0 silently.
//   - CLI: node .claude/hooks/check-bank.mjs [file ...]   (no args = every bank)
//
// The rules mirror what index.html relies on (see CLAUDE.md § Adding questions):
// options 2-5, `correct` an index or index array into options *as written*,
// d in 1..3, scenario 0..6 (must exist in SCENARIOS), non-empty domain/explain.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.env.CLAUDE_PROJECT_DIR || path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const QDIR = path.join(ROOT, 'questions');

function isBank(file) {
  const abs = path.resolve(ROOT, file);
  return path.dirname(abs) === QDIR && abs.endsWith('.json');
}

function checkQuestion(q, i) {
  const errs = [];
  const at = `question ${i}${typeof q?.q === 'string' ? ` ("${q.q.replace(/<[^>]+>/g, '').slice(0, 50)}…")` : ''}`;
  const bad = msg => errs.push(`${at}: ${msg}`);
  if (!q || typeof q !== 'object') { bad('not an object'); return errs; }
  if (typeof q.q !== 'string' || !q.q.trim()) bad('`q` must be non-empty text');
  if (typeof q.domain !== 'string' || !q.domain.trim()) bad('`domain` must be non-empty text');
  if (![1, 2, 3].includes(q.d)) bad(`\`d\` must be 1, 2 or 3 (got ${JSON.stringify(q.d)})`);
  if (q.scenario !== undefined && !(Number.isInteger(q.scenario) && q.scenario >= 0 && q.scenario <= 6))
    bad(`\`scenario\` must be an integer 0-6 (got ${JSON.stringify(q.scenario)})`);
  if (typeof q.explain !== 'string' || !q.explain.trim()) bad('`explain` must be non-empty text');
  const opts = q.options;
  if (!Array.isArray(opts) || opts.length < 2 || opts.length > 5) { bad('`options` must be an array of 2-5 items'); return errs; }
  if (opts.some(o => typeof o !== 'string' || !o.trim())) bad('every option must be non-empty text');
  if (new Set(opts.map(o => String(o).trim().toLowerCase())).size !== opts.length) bad('two options have the same text');
  const idx = Array.isArray(q.correct) ? q.correct : [q.correct];
  if (!idx.length || idx.some(c => !Number.isInteger(c) || c < 0 || c >= opts.length))
    bad(`\`correct\` must index into options 0-${opts.length - 1} (got ${JSON.stringify(q.correct)})`);
  else if (new Set(idx).size !== idx.length) bad('`correct` lists the same index twice');
  else if (Array.isArray(q.correct) && idx.length >= opts.length) bad('a multiple-response item cannot mark every option correct');
  return errs;
}

function checkFile(file) {
  const abs = path.resolve(ROOT, file);
  const rel = path.relative(ROOT, abs);
  let data;
  try { data = JSON.parse(fs.readFileSync(abs, 'utf8')); }
  catch (e) { return [`${rel}: invalid JSON — ${e.message}`]; }

  if (path.basename(abs) === 'index.json') {
    if (!Array.isArray(data.levels) || !data.levels.length) return [`${rel}: \`levels\` must be a non-empty array`];
    return data.levels.filter(n => !fs.existsSync(path.join(QDIR, `${n}.json`)))
      .map(n => `${rel}: lists "${n}" but questions/${n}.json does not exist`);
  }
  const errs = [];
  if (typeof data.name !== 'string' || !data.name.trim()) errs.push('level `name` is missing');
  if (!Array.isArray(data.questions)) errs.push('`questions` must be an array');
  else if (!data.pool && !data.questions.length) errs.push('a non-pool level needs at least one question');
  else data.questions.forEach((q, i) => errs.push(...checkQuestion(q, i)));
  if (data.section !== undefined && !['path', 'bank'].includes(data.section)) errs.push('`section` must be "path" or "bank"');
  return errs.map(e => `${rel}: ${e}`);
}

async function readStdin() {
  if (process.stdin.isTTY) return '';
  let s = '';
  for await (const chunk of process.stdin) s += chunk;
  return s;
}

const args = process.argv.slice(2);
let payload = null;
if (!args.length) {
  try { payload = JSON.parse(await readStdin() || 'null'); } catch { payload = null; }
}
if (!payload?.tool_input) {
  // CLI mode
  const files = args.length ? args : fs.readdirSync(QDIR).filter(f => f.endsWith('.json')).map(f => path.join('questions', f));
  const errs = files.flatMap(checkFile);
  if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
  console.log(`OK — ${files.length} file(s) valid`);
} else {
  // Hook mode
  const file = payload.tool_input.file_path;
  if (!file || !isBank(file)) process.exit(0);
  const errs = checkFile(file);
  if (errs.length) {
    console.error(`Question bank check failed — fix before moving on:\n${errs.slice(0, 20).join('\n')}${errs.length > 20 ? `\n…and ${errs.length - 20} more` : ''}`);
    process.exit(2);
  }
}
