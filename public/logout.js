(() => {
  const USER_KEY = 'northbridge-trust-prototype-v5';

  function installLogout() {
    const dashboard = document.querySelector('.dashboard-screen');
    if (!dashboard) return;

    const header = dashboard.querySelector('.dashboard-header-right');
    if (!header || header.querySelector('.external-logout-button')) return;

    const button = document.createElement('button');
    button.className = 'external-logout-button';
    button.type = 'button';
    button.textContent = 'Logout';
    button.setAttribute('aria-label', 'Log out of Northbridge Trust');
    button.addEventListener('click', () => {
      try { localStorage.removeItem(USER_KEY); } catch (_) {}
      window.location.hash = '/login';
    });

    header.appendChild(button);
  }

  const style = document.createElement('style');
  style.textContent = `
    .external-logout-button {
      appearance: none;
      border: 1px solid rgba(255,255,255,.22);
      background: #fff;
      color: #14213d;
      border-radius: 14px;
      padding: 11px 18px;
      min-height: 44px;
      font: 700 14px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      cursor: pointer;
      box-shadow: 0 8px 22px rgba(15,23,42,.12);
      transition: transform .18s ease, box-shadow .18s ease;
    }
    .external-logout-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 26px rgba(15,23,42,.18);
    }
    .external-logout-button:active { transform: translateY(0); }
    @media (max-width: 480px) {
      .external-logout-button { padding: 10px 14px; min-height: 42px; }
    }
  `;
  document.head.appendChild(style);

  const observer = new MutationObserver(installLogout);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  installLogout();
})();
