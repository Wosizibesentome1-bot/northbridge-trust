(function () {
  var busy = false;

  function loading() {
    var s = document.createElement('div');
    s.id = 'nb-button-reload-loading';
    s.innerHTML = '<div class="nb-br-card"><div class="nb-br-spin"></div><strong>Loading...</strong><small>Northbridge Trust</small></div>';
    var style = document.createElement('style');
    style.textContent = '#nb-button-reload-loading{position:fixed;inset:0;z-index:1000000;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#061a35,#0b2f63,#155eef);color:#fff;font-family:Inter,system-ui,sans-serif}.nb-br-card{text-align:center;padding:28px 30px;min-width:190px;border:1px solid rgba(255,255,255,.2);border-radius:24px;background:rgba(255,255,255,.1);backdrop-filter:blur(18px);box-shadow:0 25px 70px rgba(0,0,0,.25)}.nb-br-spin{width:34px;height:34px;margin:0 auto 16px;border:3px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:nbbrspin .7s linear infinite}.nb-br-card strong{display:block;font-size:16px}.nb-br-card small{display:block;margin-top:6px;font-size:11px;opacity:.7;letter-spacing:.08em;text-transform:uppercase}@keyframes nbbrspin{to{transform:rotate(360deg)}}';
    document.head.appendChild(style); document.body.appendChild(s);
  }

  document.addEventListener('click', function (event) {
    if (busy) return;
    var button = event.target && event.target.closest ? event.target.closest('button') : null;
    if (!button) return;
    busy = true;
    loading();

    var label = (button.textContent || '').trim().toLowerCase().replace(/\s+/g, ' ');
    var destination = null;
    if (label === 'create account' || label === 'get started' || label === 'get started →') destination = '#/register';
    else if (label === 'sign in') destination = '#/login';
    else if (label === 'dashboard') destination = '#/dashboard';
    else if (label === 'home') destination = '#/';
    else if (label.indexOf('explore business tools') === 0) destination = '#/register';

    if (button.type === 'submit') {
      window.setTimeout(function () { window.location.reload(); }, 700);
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    window.setTimeout(function () {
      if (destination) window.location.hash = destination;
      window.setTimeout(function () { window.location.reload(); }, 80);
    }, 500);
  }, true);
})();
