/* The owner's requested animation mode is consistent across desktop and mobile. */
(() => {
  const listeners = new Set();
  let reduced = false;
  try { reduced = localStorage.getItem('fumandomari-motion') === 'reduced'; } catch {}
  const update = () => { document.documentElement.dataset.motion = reduced ? 'reduced' : 'full'; };
  window.SiteMotion = {
    get matches() { return reduced; },
    addEventListener(type, fn) { if (type === 'change') listeners.add(fn); },
    removeEventListener(type, fn) { if (type === 'change') listeners.delete(fn); },
    setReduced(value) {
      reduced = Boolean(value); update();
      try { localStorage.setItem('fumandomari-motion', reduced ? 'reduced' : 'full'); } catch {}
      listeners.forEach(fn => fn({matches:reduced}));
    }
  };
  update();
})();
