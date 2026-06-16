const fs = require('fs');
const path = require('path');

const rawHtml = fs.readFileSync(path.join(process.cwd(), 'curriculum_board.html'), 'utf8');
const sync = fs.readFileSync(path.join(process.cwd(), 'sync.js'), 'utf8');

// Inject accessor closures right before the final render() call so they share
// the same <script> scope as the let-declared units/nid variables.
// Also try var promotion as belt-and-suspenders.
const patched = rawHtml
  .replace('let units=', 'var units=')
  .replace('let nid=200,', 'var nid=200;let ')
  .replace(
    'function render(){',
    'window.__getState=function(){return{units:units,nid:nid};};' +
    'window.__setState=function(u,n){units=u;nid=n;};' +
    'function render(){'
  )
  .replace('</body>', '<script>\n' + sync + '\n</script>\n</body>');

module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Surrogate-Control', 'no-store');
  res.send(patched);
};
