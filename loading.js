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
        #nb-loading-screen{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#020b18 0%,#061a35 48%,#0b3470 100%);color:#fff;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;overflow:hidden}
        #nb-loading-screen:before{content:"";position:absolute;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,.24),transparent 68%);filter:blur(8px);animation:nb-pulse 1.4s ease-in-out infinite}
        #nb-loading-screen .nb-loading-card{position:relative;text-align:center;min-width:250px;padding:38px 42px;border:1px solid rgba(255,255,255,.14);border-radius:28px;background:rgba(4,20,43,.55);backdrop-filter:blur(18px);box-shadow:0 30px 90px rgba(0,0,0,.45)}
        #nb-loading-screen .nb-rings{position:relative;width:112px;height:112px;margin:0 auto 22px}
        #nb-loading-screen .nb-ring{position:absolute;inset:0;border:2px solid rgba(77,145,255,.34);border-radius:50%;animation:nb-spin 1.6s linear infinite}
        #nb-loading-screen .nb-ring:nth-child(2){inset:9px;border-color:rgba(96,165,250,.52);animation-duration:1.15s;animation-direction:reverse}
        #nb-loading-screen .nb-ring:nth-child(3){inset:19px;border-color:rgba(147,197,253,.72);animation-duration:.8s}
        #nb-loading-screen .nb-ring:nth-child(4){inset:30px;border-color:rgba(255,255,255,.78);animation-duration:.58s;animation-direction:reverse}
        #nb-loading-screen .nb-core{position:absolute;inset:43px;border-radius:50%;background:radial-gradient(circle,#fff 0%,#60a5fa 35%,#155eef 72%,transparent 73%);box-shadow:0 0 28px rgba(59,130,246,.9);animation:nb-core 1s ease-in-out infinite}
        #nb-loading-screen .nb-title{font-size:17px;font-weight:800;letter-spacing:.16em}
        #nb-loading-screen .nb-loading{margin-top:10px;font-size:13px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.88)}
        #nb-loading-screen .nb-subtitle{margin-top:7px;font-size:11px;color:rgba(255,255,255,.58);letter-spacing:.1em;text-transform:uppercase}
        #nb-loading-screen .nb-progress{width:190px;height:3px;margin:20px auto 0;border-radius:999px;background:rgba(255,255,255,.12);overflow:hidden}
        #nb-loading-screen .nb-progress:after{content:"";display:block;width:42%;height:100%;border-radius:999px;background:linear-gradient(90deg,transparent,#60a5fa,#fff,transparent);animation:nb-progress 1s ease-in-out infinite}
        @keyframes nb-spin{to{transform:rotate(360deg)}}
        @keyframes nb-core{50%{transform:scale(1.16);opacity:.82}}
        @keyframes nb-progress{from{transform:translateX(-250%)}to{transform:translateX(480%)}}
        @keyframes nb-pulse{50%{transform:scale(1.08);opacity:.72}}
      `;
      document.head.appendChild(style);
    }

    var screen = document.createElement('div');
    screen.id = 'nb-loading-screen';
    screen.setAttribute('aria-live', 'polite');
    screen.innerHTML = '<div class="nb-loading-card"><div class="nb-rings"><span class="nb-ring"></span><span class="nb-ring"></span><span class="nb-ring"></span><span class="nb-ring"></span><span class="nb-core"></span></div><div class="nb-title">NORTHBRIDGE TRUST</div><div class="nb-loading">Loading…</div><div class="nb-subtitle">Secure banking platform</div><div class="nb-progress"></div></div>';
    document.body.appendChild(screen);
  }

  function finish(button) {
    var screen = document.getElementById('nb-loading-screen');
    if (screen) screen.remove();
    busy = false;
    if (button && document.contains(button)) {
      button.setAttribute('data-nb-replay', '1');
      try { button.click(); } finally { button.removeAttribute('data-nb-replay'); }
    }
  }

  document.addEventListener('click', function (event) {
    var button = event.target && event.target.closest ? event.target.closest('button') : null;
    if (!button || button.disabled || button.getAttribute('data-nb-replay') === '1') return;
    if (busy) { event.preventDefault(); event.stopPropagation(); return; }

    busy = true;
    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    showLoading();

    window.setTimeout(function () { finish(button); }, 1000);
  }, true);
})();
