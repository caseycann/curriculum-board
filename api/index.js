const fs = require('fs');
const path = require('path');
const { requireAuth } = require('../lib/auth');

module.exports = function handler(req, res) {
  if (!requireAuth(req, res)) return;
  const rawHtml = fs.readFileSync(path.join(process.cwd(), 'curriculum_board.html'), 'utf8');
  const sync = fs.readFileSync(path.join(process.cwd(), 'sync.js'), 'utf8');

  // Inject sync.js at the end of the main <script> block (before its closing
  // </script> tag) so the IIFE can directly read/write the let-scoped units
  // and nid variables via closure — no window tricks or var promotion needed.
  // String.replace() targets the first </script>, which is the only one in the
  // original HTML (the head uses <style>, not <script>).
  const patched = rawHtml.replace('</script>', sync + '\n</script>');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Surrogate-Control', 'no-store');
  res.send(patched);
};
