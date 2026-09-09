(function () {
  var busy = false;

  function showLoading() {
    var existing = document.getElementById('nb-loading-screen');
    if (existing) existing.remove();

    var style = document.getElementById('nb-loading-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'nb-loading-style';
      style.textContent = `
        #nb-loading-screen{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#061a35 0%,#0b2f63 55%,#155eef 100%);color:#fff;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;opacity:1;transition:opacity .18s ease}
        #nb-loading-screen .nb-loading-card{text-align:center;min-width:190px;padding:28px 30px;border:1px solid rgba(255,255,255,.18);border-radius:24px;background:rgba(255,255,255,.09);backdrop-filter:blur(18px);box-shadow:0 25px 70px rgba(0,0,0,.25)}
        #nb-loading-screen .nb-spinner{width:34px;height:34px;margin:0 auto 16px;border:3px solid rgba(255,255,255,.28);border-top-color:#fff;border-radius:50%;animation:nb-spin .7s linear infinite}
        #nb-loading-screen .nb-title{font-size:16px;font-weight:700;letter-spacing:.02em}
        #nb-loading-screen .nb-subtitle{margin-top:6px;font-size:11px;color:rgba(255,255,255,.7);letter-spacing:.08em;text-transform:uppercase}
        @keyframes nb-spin{to{transform:rotate(360deg)}}
      `;
      document.head.appendChild(style);
    }

    var screen = document.createElement('div');
    screen.id = 'nb-loading-screen';
    screen.innerHTML = '<div class="nb-loading-card"><div class="nb-spinner"></div><div class="nb-title">Loading...</div><div class="nb-subtitle">Northbridge Trust</div></div>';
    document.body.appendChild(screen);
  }

  document.addEventListener('click', function (event) {
    if (busy) return;
    var button = event.target && event.target.closest ? event.target.closest('button') : null;
    if (!button) return;

    var label = (button.textContent || '').trim().toLowerCase().replace(/\s+/g, ' ');
    var isCreate = label === 'create account';
    var isGetStarted = label === 'get started' || label === 'get started →';
    var isSignIn = label === 'sign in';
    var isDashboard = label === 'dashboard';
    var isHome = label === 'home';
    var isBusiness = label.indexOf('explore business tools') === 0;

    if (!isCreate && !isGetStarted && !isSignIn && !isDashboard && !isHome && !isBusiness) return;

    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    busy = true;
    showLoading();

    var destination = null;
    if (isCreate || isGetStarted) destination = '#/register';
    else if (isSignIn) destination = '#/login';
    else if (isDashboard) destination = '#/dashboard';
    else if (isHome) destination = '#/';
    else if (isBusiness) destination = '#/register';

    window.setTimeout(function () {
      if (destination) window.location.hash = destination;
      window.setTimeout(function () {
        var screen = document.getElementById('nb-loading-screen');
        if (screen) screen.remove();
        busy = false;
      }, 120);
    }, 500);
  }, true);
})();
