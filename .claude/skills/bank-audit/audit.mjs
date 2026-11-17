#!/usr/bin/env node
// Recomputes the AUDIT.md metrics across every question bank and prints a
// markdown report. Read-only. Usage: node .claude/skills/bank-audit/audit.mjs
//
// Note on positions: index.html shuffles options at runtime (prepQuestions), so
// the authored answer position cannot leak in the app. It is still reported,
// because the banks are also read as raw files (e.g. the old snapshot, reviews).
// Length bias DOES survive shuffling, so "pick the longest" is the key metric.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.env.CLAUDE_PROJECT_DIR || path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../..');
const QDIR = path.join(ROOT, 'questions');
const levels = JSON.parse(fs.readFileSync(path.join(QDIR, 'index.json'), 'utf8')).levels;
const plain = s => String(s).replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ');
const words = s => new Set(plain(s).toLowerCase().match(/[a-z0-9_]+/g) || []);
const median = a => { const b = [...a].sort((x, y) => x - y); return b.length ? b[Math.floor(b.length / 2)] : 0; };
const pct = (n, d) => d ? `${Math.round(n / d * 100)}%` : '—';

const all = [];
const rows = [];
for (const name of levels) {
  const lv = JSON.parse(fs.readFileSync(path.join(QDIR, `${name}.json`), 'utf8'));
  if (lv.pool) continue;
  const qs = lv.questions || [];
  const d = { 1: 0, 2: 0, 3: 0 }, pos = [0, 0, 0, 0, 0];
  let single = 0, longest = 0, multi = 0; const ratios = [], gaps = [];
  qs.forEach((q, i) => {
    all.push({ file: name, i, q });
    d[q.d] = (d[q.d] || 0) + 1;
    if (Array.isArray(q.correct)) { multi++; return; }
    single++; pos[q.correct]++;
    const len = q.options.map(o => plain(o).length);
    const c = len[q.correct], others = len.filter((_, j) => j !== q.correct);
    if (c >= Math.max(...others)) longest++;
    ratios.push(c / (others.reduce((a, b) => a + b, 0) / others.length));
    gaps.push(Math.abs(c - Math.max(...others)));
  });
  rows.push({ name, n: qs.length, multi, d, pos, single, longest, ratio: median(ratios), gap: median(gaps), shortest: Math.min(...qs.flatMap(q => q.options.map(o => plain(o).length))) });
}

// Duplicates: identical normalised stems, and near-duplicates by word overlap.
const dups = [];
const sets = all.map(x => words(x.q.q));
for (let a = 0; a < all.length; a++) for (let b = a + 1; b < all.length; b++) {
  const A = sets[a], B = sets[b];
  let inter = 0; for (const w of A) if (B.has(w)) inter++;
  const j = inter / (A.size + B.size - inter || 1);
  if (j >= 0.7) dups.push({ j, a: all[a], b: all[b] });
}
dups.sort((x, y) => y.j - x.j);

const total = rows.reduce((s, r) => s + r.n, 0);
const out = [];
out.push(`# Bank audit — ${new Date().toLocaleDateString('en-CA')}`, '', `**${total} questions** across ${rows.length} banks.`, '');
out.push('| Bank | Qs | Multi | d1/d2/d3 | Pick-longest | Len ratio (median) | Len gap (median chars) | Shortest option | Authored position A/B/C/D/E |');
out.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- |');
for (const r of rows) out.push(`| ${r.name} | ${r.n} | ${r.multi} | ${r.d[1]}/${r.d[2]}/${r.d[3]} | ${pct(r.longest, r.single)} | ${r.ratio.toFixed(2)}x | ${r.gap} | ${r.shortest} | ${r.pos.join('/')} |`);
const L = rows.reduce((s, r) => s + r.longest, 0), S = rows.reduce((s, r) => s + r.single, 0);
out.push('', `**Pick-longest across all single-answer items: ${pct(L, S)}** (AUDIT.md target: near 25% for 4 options; it recorded 45% with a 0-char median gap as non-exploitable).`, '');
out.push(`## Possible duplicates (${dups.length}, word overlap ≥ 70%)`, '');
if (!dups.length) out.push('None.');
for (const x of dups.slice(0, 40)) out.push(`- ${Math.round(x.j * 100)}% — \`${x.a.file}#${x.a.i}\` "${plain(x.a.q.q).slice(0, 70)}…" ↔ \`${x.b.file}#${x.b.i}\` "${plain(x.b.q.q).slice(0, 70)}…"`);
if (dups.length > 40) out.push(`- …and ${dups.length - 40} more`);
console.log(out.join('\n'));
