const { Redis } = require('@upstash/redis');
const Pusher = require('pusher');
const { requireAuth } = require('../lib/auth');

const redis = Redis.fromEnv();
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

const KEY = 'board';

module.exports = async function handler(req, res) {
  if (!requireAuth(req, res)) return;
  try {
    if (req.method === 'GET') {
      const data = await redis.get(KEY);
      return res.status(200).json(data !== undefined ? data : null);
    }
    if (req.method === 'POST') {
      await redis.set(KEY, req.body);
      await pusher.trigger('curriculum-board', 'state-update', req.body);
      return res.status(200).json({ ok: true });
    }
    res.status(405).end();
  } catch (err) {
    console.error('[state]', err.message);
    res.status(500).json({ error: err.message });
  }
};
