const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const cwd = process.cwd();
  const files = fs.readdirSync(cwd);
  let pusherSize = null;
  try { pusherSize = fs.statSync(path.join(cwd, 'pusher.min.js')).size; } catch (_) {}

  // Grab the last 200 chars of what api/index.js would actually serve
  let htmlTail = null;
  let replacements = {};
  try {
    const raw = fs.readFileSync(path.join(cwd, 'curriculum_board.html'), 'utf8');
    replacements = {
      hasLetUnits: raw.includes('let units='),
      hasFunctionRender: raw.includes('function render(){'),
      varWorked: raw.replace('let units=', 'var units=').includes('var units=ORIG'),
      accessorWorked: raw.replace('function render(){', 'window.__getState=function(){};function render(){').includes('window.__getState'),
    };
    const sync = fs.readFileSync(path.join(cwd, 'sync.js'), 'utf8');
    const patched = raw
      .replace('let units=', 'var units=')
      .replace('let nid=200,', 'var nid=200;let ')
      .replace('function render(){', 'window.__getState=function(){return{units:units,nid:nid};};window.__setState=function(u,n){units=u;nid=n;};function render(){')
      .replace('</body>', '<script>\n' + sync + '\n</script>\n</body>');
    htmlTail = patched.slice(-200);
  } catch (e) { htmlTail = 'ERROR: ' + e.message; }

  res.json({ cwd, files, pusherSize, replacements, htmlTail });
};
