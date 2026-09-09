(function () {
  var busy = false;
  var replaying = false;

  function showLoading() {
    var existing = document.getElementById('nb-loading-screen');
    if (existing) existing.remove();
    var style = document.getElementById('nb-loading-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'nb-loading-style';
      style.textContent = `
        #nb-loading-screen{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at center,#123f72 0%,#071b36 42%,#030d1c 100%);color:#fff;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;overflow:hidden}
        #nb-loading-screen .nb-loader{text-align:center;min-width:220px}
        #nb-loading-screen .nb-logo{font-size:18px;font-weight:800;letter-spacing:.18em;margin-bottom:34px;background:linear-gradient(90deg,#20bfff,#5968ff);-webkit-background-clip:text;background-clip:text;color:transparent}
        #nb-loading-screen .nb-rings{position:relative;width:220px;height:220px;margin:0 auto 30px}
        #nb-loading-screen .nb-ring{position:absolute;left:50%;top:50%;border:2px solid rgba(24,170,255,.55);border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 18px rgba(24,170,255,.18)}
        #nb-loading-screen .r1{width:78px;height:78px;animation:nbpulse 1.5s ease-in-out infinite}
        #nb-loading-screen .r2{width:126px;height:126px;animation:nbpulse 1.5s ease-in-out .18s infinite}
        #nb-loading-screen .r3{width:174px;height:174px;animation:nbpulse 1.5s ease-in-out .36s infinite}
        #nb-loading-screen .orbit{position:absolute;left:50%;top:50%;width:174px;height:174px;border:3px solid transparent;border-top-color:#20bfff;border-right-color:#168fff;border-radius:50%;transform:translate(-50%,-50%);animation:nbspin 1s linear infinite}
        #nb-loading-screen .core{position:absolute;left:50%;top:50%;width:30px;height:30px;border-radius:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#27c7ff,#645cff);box-shadow:0 0 28px rgba(39,199,255,.85)}
        #nb-loading-screen .nb-title{font-size:20px;font-weight:750;letter-spacing:.02em}
        #nb-loading-screen .nb-subtitle{margin-top:9px;font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:rgba(255,255,255,.58)}
        #nb-loading-screen .nb-line{width:250px;height:3px;margin:24px auto 0;background:linear-gradient(90deg,#20bfff,#fff);border-radius:99px;transform-origin:left;animation:nbline 1s ease-out forwards}
        @keyframes nbspin{to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes nbpulse{0%,100%{opacity:.45;transform:translate(-50%,-50%) scale(.94)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.04)}}
        @keyframes nbline{from{transform:scaleX(0);opacity:.3}to{transform:scaleX(1);opacity:1}}
      `;
      document.head.appendChild(style);
    }
    var screen = document.createElement('div');
    screen.id = 'nb-loading-screen';
    screen.innerHTML = '<div class="nb-loader"><div class="nb-logo">NORTHBRIDGE TRUST</div><div class="nb-rings"><div class="nb-ring r1"></div><div class="nb-ring r2"></div><div class="nb-ring r3"></div><div class="orbit"></div><div class="core"></div></div><div class="nb-title">Loading...</div><div class="nb-subtitle">Secure banking platform</div><div class="nb-line"></div></div>';
    document.body.appendChild(screen);
  }

  document.addEventListener('click', function (event) {
    if (replaying) { replaying = false; return; }
    if (busy) { event.preventDefault(); event.stopPropagation(); return; }
    var button = event.target && event.target.closest ? event.target.closest('button') : null;
    if (!button || button.disabled) return;

    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    busy = true;
    showLoading();

    window.setTimeout(function () {
      var screen = document.getElementById('nb-loading-screen');
      if (screen) screen.remove();
      replaying = true;
      busy = false;
      button.click();
      window.setTimeout(function () { replaying = false; }, 100);
    }, 1000);
  }, true);
})();
