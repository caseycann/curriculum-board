const fs = require('fs');

// require.resolve lets Vercel's bundler detect and include this file
const bundle = fs.readFileSync(require.resolve('pusher-js/dist/web/pusher.min.js'));

module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
  res.end(bundle);
};
