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

  async function apply(data) {
    if (!data || !data.units) return;
    window.__setState(data.units, data.nid != null ? data.nid : 200);
    lastVersion = data.v != null ? data.v : null;
    busy = true;
    window.render();
    busy = false;
  }

  async function poll() {
    if (busy) return;
    try {
      const r = await fetch(API);
      if (!r.ok) return;
      const d = await r.json();
      if (d && d.v && d.v !== lastVersion) await apply(d);
    } catch (_) {}
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
        if (d && d.units) await apply(d);
      }
    } catch (_) {}
    setInterval(poll, 4000);
  })();
})();
