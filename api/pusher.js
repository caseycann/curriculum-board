const fs = require('fs');
const path = require('path');
const { requireAuth } = require('../lib/auth');

// Read from the committed file at /var/task/pusher.min.js
const bundle = fs.readFileSync(path.join(process.cwd(), 'pusher.min.js'));

module.exports = function handler(req, res) {
  if (!requireAuth(req, res)) return;
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.end(bundle);
};
