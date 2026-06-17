const { requireAuth } = require('../lib/auth');

module.exports = function handler(req, res) {
  if (!requireAuth(req, res)) return;
  res.json({
    key: process.env.PUSHER_KEY || null,
    cluster: process.env.PUSHER_CLUSTER || null,
  });
};
