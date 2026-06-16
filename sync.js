(function () {
  const API = '/api/state';
  let lastVersion = null;
  let busy = false;

  // units and nid are let-declared in the enclosing <script> scope.
  // This IIFE can read and write them directly via closure.

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
    try {
      await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ units: units, nid: nid, v }),
      });
      lastVersion = v;
    } catch (_) {}
  }

  function apply(data) {
    if (!data || !data.units) return;
    units = data.units;
    nid = data.nid != null ? data.nid : 200;
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
    try {
      const r = await fetch(API);
      if (r.ok) {
        const d = await r.json();
        if (d && d.units) apply(d);
      }
    } catch (_) {}

    try {
      await loadScript('/api/pusher');
      const cfg = await (await fetch('/api/config')).json();
      if (!cfg.key) { console.warn('[sync] Pusher credentials not configured'); return; }
      const pusher = new Pusher(cfg.key, { cluster: cfg.cluster });
      const ch = pusher.subscribe('curriculum-board');
      ch.bind('state-update', function (data) {
        if (data.v !== lastVersion) apply(data);
      });
      console.log('[sync] ready, units in scope:', Array.isArray(units));
    } catch (e) {
      console.error('[sync] setup failed:', e.message);
    }
  })();
})();
