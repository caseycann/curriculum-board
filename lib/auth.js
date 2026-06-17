function checkAuth(req) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return true; // not configured yet — leave the site open rather than lock everyone out

  const header = req.headers.authorization || '';
  if (!header.startsWith('Basic ')) return false;

  const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
  const pass = decoded.slice(decoded.indexOf(':') + 1);
  return pass === password;
}

function requireAuth(req, res) {
  if (checkAuth(req)) return true;
  res.setHeader('WWW-Authenticate', 'Basic realm="Curriculum Board"');
  res.status(401).send('Authentication required');
  return false;
}

module.exports = { checkAuth, requireAuth };
