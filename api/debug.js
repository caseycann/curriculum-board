const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const cwd = process.cwd();
  const files = fs.readdirSync(cwd);
  let pusherSize = null;
  try { pusherSize = fs.statSync(path.join(cwd, 'pusher.min.js')).size; } catch (_) {}

  // Grab the last 200 chars of what api/index.js would actually serve
  let htmlTail = null;
  try {
    const raw = fs.readFileSync(path.join(cwd, 'curriculum_board.html'), 'utf8');
    const pusher = fs.readFileSync(path.join(cwd, 'pusher.min.js'), 'utf8');
    const sync = fs.readFileSync(path.join(cwd, 'sync.js'), 'utf8');
    const patched = raw.replace('</body>',
      '<script>\n' + pusher + '\n</script>\n<script>\n' + sync + '\n</script>\n</body>');
    htmlTail = patched.slice(-200);
  } catch (e) { htmlTail = 'ERROR: ' + e.message; }

  res.json({ cwd, files, pusherSize, htmlTail });
};
