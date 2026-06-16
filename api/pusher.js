const fs = require('fs');
const path = require('path');

// Read from the committed file at /var/task/pusher.min.js — same pattern
// proven to work in api/debug.js
const bundle = fs.readFileSync(path.join(process.cwd(), 'pusher.min.js'));

module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.end(bundle);
};
