/* The splash is decorative; never wait for a network request to dismiss it. */
(() => {
  const root = document.documentElement;
  if (location.hash || window.SiteMotion.matches) return;
  root.classList.add('intro-pending');
  // A missing enhancement script must not hide the working page indefinitely.
  window.FumandoMariIntroFallback = setTimeout(() => {
    root.classList.remove('intro-pending');
    document.dispatchEvent(new Event('FumandoMari:intro-ready'));
  }, 4000);
})();
