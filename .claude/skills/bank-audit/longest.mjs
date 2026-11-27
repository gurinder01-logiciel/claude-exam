#!/usr/bin/env node
// Strict length-bias check for one or more banks. Read-only.
// Usage: node .claude/skills/bank-audit/longest.mjs questions/developer.json [...]
// An item is FLAGGED when its longest option (by characters, tags stripped) is a correct one,
// ties included. Goal for new banks: 0 flagged. Also prints where the correct option ranks by length.
import fs from 'node:fs';
const plain = s => String(s).replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ');
let bad = 0;
for (const f of process.argv.slice(2)) {
  const qs = JSON.parse(fs.readFileSync(f, 'utf8')).questions || [];
  const flagged = [], rank = {};
  let ratioSum = 0, n = 0;
  qs.forEach((q, i) => {
    const len = q.options.map(o => plain(o).length);
    const ok = new Set(Array.isArray(q.correct) ? q.correct : [q.correct]);
    const cMax = Math.max(...[...ok].map(j => len[j]));
    const wMax = Math.max(...len.filter((_, j) => !ok.has(j)));
    if (cMax >= wMax) flagged.push(i);
    const r = 1 + len.filter((l, j) => !ok.has(j) && l > cMax).length;      // 1 = longest
    rank[r] = (rank[r] || 0) + 1;
    const cAvg = [...ok].reduce((s, j) => s + len[j], 0) / ok.size;
    const wAvg = len.filter((_, j) => !ok.has(j)).reduce((s, l) => s + l, 0) / (len.length - ok.size);
    ratioSum += cAvg / wAvg; n++;
  });
  console.log(`${f}: ${qs.length} items, longest-is-correct (ties included): ${flagged.length}${flagged.length ? ' -> ' + flagged.join(',') : ''}`);
  console.log(`  rank of correct by length (1 = longest): ${JSON.stringify(rank)}; mean correct/distractor length ${(ratioSum / n).toFixed(2)}`);
  bad += flagged.length;
}
process.exit(bad ? 1 : 0);
