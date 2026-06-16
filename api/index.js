const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(process.cwd(), 'curriculum_board.html'), 'utf8');
const sync = fs.readFileSync(path.join(process.cwd(), 'sync.js'), 'utf8');

// Inject accessor closures into the same <script> scope as the let-declared
// units/nid variables so our separate sync script can read and write them.
const withAccessors = html.replace(
  'function render(){',
  'window.__getState=function(){return{units:units,nid:nid};};' +
  'window.__setState=function(u,n){units=u;nid=n;};' +
  'function render(){'
);
// Inject Pusher public credentials and CDN client before the sync script
const pusherConfig = `<script>window.__PUSHER_KEY__='${process.env.PUSHER_KEY}';window.__PUSHER_CLUSTER__='${process.env.PUSHER_CLUSTER}';</script>`;
const pusherCDN = '<script src="https://js.pusher.com/8.4/pusher.min.js"></script>';
const patched = withAccessors.replace(
  '</body>',
  pusherConfig + '\n' + pusherCDN + '\n<script>\n' + sync + '\n</script>\n</body>'
);

module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.send(patched);
};
