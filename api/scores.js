// Team leaderboard store for the CCAR-F exam simulator.
//
// Backed by Redis over Upstash's REST API — no npm packages needed.
// Add Vercel's "Upstash Redis" integration (or set the two env vars by hand)
// and these are injected automatically:
//   KV_REST_API_URL
//   KV_REST_API_TOKEN
//
// GET  /api/scores  -> { scores: [...] }
// POST /api/scores  -> { ok: true }   body: { name, score, passed, level, total }

const KEY = 'ccaf:scores';
const MAX_ENTRIES = 500;

const URL_BASE = process.env.KV_REST_API_URL;
const TOKEN = process.env.KV_REST_API_TOKEN;

async function redis(command) {
  if (!URL_BASE || !TOKEN) {
    throw new Error('Redis env vars missing (KV_REST_API_URL / KV_REST_API_TOKEN)');
  }
  const res = await fetch(URL_BASE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(command)
  });
  if (!res.ok) {
    throw new Error(`Redis error ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  return data.result;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  try {
    if (req.method === 'GET') {
      const raw = (await redis(['LRANGE', KEY, '0', String(MAX_ENTRIES - 1)])) || [];
      const scores = raw
        .map(item => {
          try { return JSON.parse(item); } catch { return null; }
        })
        .filter(Boolean);
      return res.status(200).json({ scores });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

      const name = String(body.name || '').trim().slice(0, 40);
      const score = Number(body.score);
      const total = Number(body.total);

      if (name.length < 2) {
        return res.status(400).json({ error: 'name must be at least 2 characters' });
      }
      if (!Number.isFinite(score) || score < 0 || score > 1000) {
        return res.status(400).json({ error: 'score must be between 0 and 1000' });
      }

      const entry = {
        name,
        score: Math.round(score),
        passed: Boolean(body.passed),
        level: String(body.level || '').slice(0, 60),
        total: Number.isFinite(total) ? total : null,
        at: Date.now()
      };

      await redis(['LPUSH', KEY, JSON.stringify(entry)]);
      await redis(['LTRIM', KEY, '0', String(MAX_ENTRIES - 1)]);

      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    // The frontend falls back to a local-only board when this fails, so a clear
    // message here is enough — usually it means the env vars aren't set yet.
    return res.status(500).json({ error: err.message });
  }
}
