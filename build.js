const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'curriculum_board.html'), 'utf8');
const sync = fs.readFileSync(path.join(__dirname, 'sync.js'), 'utf8');

const patched = html.replace('</body>', '<script>\n' + sync + '\n</script>\n</body>');

fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'public/index.html'), patched);

console.log('Built public/index.html');
