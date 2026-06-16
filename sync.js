(function () {
  const API = '/api/state';
  let lastVersion = null;
  let busy = false;

  function getState() {
    if (typeof window.__getState === 'function') return window.__getState();
    return { units: window.units, nid: window.nid };
  }
  function setState(units, nid) {
    if (typeof window.__setState === 'function') { window.__setState(units, nid); return; }
    window.units = units;
    window.nid = nid;
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = function () { reject(new Error('Failed to load ' + src)); };
      document.head.appendChild(s);
    });
  }

  async function save() {
    if (busy) return;
    const v = Date.now();
    const s = getState();
    console.log('[sync] save() — accessors:', typeof window.__getState, '— units:', Array.isArray(s.units) ? s.units.length + ' items' : 'UNDEFINED');
    try {
      await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ units: s.units, nid: s.nid, v }),
      });
      lastVersion = v;
    } catch (_) {}
  }

  function apply(data) {
    if (!data || !data.units) return;
    setState(data.units, data.nid != null ? data.nid : 200);
    lastVersion = data.v != null ? data.v : null;
    busy = true;
    window.render();
    busy = false;
  }

  var _render = window.render;
  window.render = function () {
    _render();
    if (!busy) save();
  };

  (async function init() {
    // Load persisted state on first open
    try {
      const r = await fetch(API);
      if (r.ok) {
        const d = await r.json();
        if (d && d.units) apply(d);
      }
    } catch (_) {}

    // Load Pusher client from our own endpoint, then subscribe
    try {
      await loadScript('/api/pusher');
      const cfg = await (await fetch('/api/config')).json();
      if (!cfg.key) { console.warn('[sync] Pusher credentials not configured'); return; }
      const pusher = new Pusher(cfg.key, { cluster: cfg.cluster });
      const ch = pusher.subscribe('curriculum-board');
      ch.bind('state-update', function (data) {
        if (data.v !== lastVersion) apply(data);
      });
      console.log('[sync] ready — typeof __getState:', typeof window.__getState);
    } catch (e) {
      console.error('[sync] Pusher setup failed:', e.message);
    }
  })();
})();
