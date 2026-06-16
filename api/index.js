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
const patched = withAccessors.replace('</body>', '<script>\n' + sync + '\n</script>\n</body>');

module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.send(patched);
};
