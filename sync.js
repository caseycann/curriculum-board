(function () {
  const API = '/api/state';
  let lastVersion = null;
  let busy = false;

  async function save() {
    if (busy) return;
    const v = Date.now();
    const s = window.__getState();
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
    window.__setState(data.units, data.nid != null ? data.nid : 200);
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

    // Fetch public Pusher credentials at runtime, then subscribe
    try {
      const cfg = await (await fetch('/api/config')).json();
      if (!cfg.key) {
        console.warn('[sync] Pusher credentials not set — real-time sync disabled');
        return;
      }
      const pusher = new Pusher(cfg.key, { cluster: cfg.cluster });
      const channel = pusher.subscribe('curriculum-board');
      channel.bind('state-update', function (data) {
        if (data.v !== lastVersion) apply(data);
      });
    } catch (e) {
      console.error('[sync] Pusher failed:', e);
    }
  })();
})();
