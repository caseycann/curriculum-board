const fs = require('fs');
const path = require('path');

const rawHtml = fs.readFileSync(path.join(process.cwd(), 'curriculum_board.html'), 'utf8');
const sync = fs.readFileSync(path.join(process.cwd(), 'sync.js'), 'utf8');
const pusherJs = fs.readFileSync(path.join(process.cwd(), 'pusher.min.js'), 'utf8');

// Promote units and nid to true globals (var instead of let) so sync.js
// can read/write them via window.units and window.nid without accessor hacks.
// The source file on disk is untouched.
const patched = rawHtml
  .replace('let units=ORIG.map(u=>({...u}));', 'var units=ORIG.map(u=>({...u}));')
  .replace('let nid=200,', 'var nid=200;let ')
  .replace(
    '</body>',
    '<script>try{\n' + pusherJs + '\n}catch(e){console.error("[pusher-bundle] threw:",e.message)}\nconsole.error("[probe] Pusher defined:", typeof Pusher);</script>\n' +
    '<script>\n' + sync + '\n</script>\n</body>'
  );

module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.send(patched);
};
