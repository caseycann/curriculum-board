const { Redis } = require('@upstash/redis');

const redis = Redis.fromEnv();

const KEY = 'board';

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const data = await redis.get(KEY);
      return res.status(200).json(data !== undefined ? data : null);
    }
    if (req.method === 'POST') {
      await redis.set(KEY, req.body);
      return res.status(200).json({ ok: true });
    }
    res.status(405).end();
  } catch (err) {
    console.error('[state]', err.message);
    res.status(500).json({ error: err.message });
  }
};
