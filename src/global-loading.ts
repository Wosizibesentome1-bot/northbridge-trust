let loading = false;
let replay = false;

const install = () => {
  if (document.getElementById('nb-react-loader-style')) return;
  const style = document.createElement('style');
  style.id = 'nb-react-loader-style';
  style.textContent = `
    #nb-react-loading{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 45%,#123f72 0,#071b36 45%,#020914 100%);color:#fff;font-family:Inter,system-ui,sans-serif;text-align:center;overflow:hidden}
    #nb-react-loading .loader-box{width:290px}.loader-logo{font-size:18px;font-weight:800;letter-spacing:.16em;color:#20bfff;margin-bottom:28px}
    #nb-react-loading .rings{position:relative;width:190px;height:190px;margin:auto}.ring{position:absolute;left:50%;top:50%;border:2px solid rgba(32,191,255,.68);border-radius:50%;transform:translate(-50%,-50%);animation:nbPulse 1s ease-in-out infinite}.r1{width:65px;height:65px}.r2{width:105px;height:105px;animation-delay:.15s}.r3{width:150px;height:150px;animation-delay:.3s}
    #nb-react-loading .spin{position:absolute;left:50%;top:50%;width:150px;height:150px;border:3px solid transparent;border-top-color:#20bfff;border-right-color:#168fff;border-radius:50%;transform:translate(-50%,-50%);animation:nbSpin .8s linear infinite}.core{position:absolute;left:50%;top:50%;width:28px;height:28px;border-radius:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#20bfff,#665cff);box-shadow:0 0 30px #20bfff}
    #nb-react-loading .title{font-size:20px;font-weight:800;margin-top:20px}.sub{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#9db3cc;margin-top:8px}.bar{height:3px;width:250px;margin:20px auto 0;background:linear-gradient(90deg,#20bfff,#fff);transform-origin:left;animation:nbBar 2s linear forwards}
    @keyframes nbSpin{to{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes nbPulse{0%,100%{opacity:.45;transform:translate(-50%,-50%) scale(.94)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.06)}}@keyframes nbBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}`;
  document.head.appendChild(style);
};

const show = () => {
  install();
  document.getElementById('nb-react-loading')?.remove();
  const overlay = document.createElement('div');
  overlay.id = 'nb-react-loading';
  overlay.innerHTML = '<div class="loader-box"><div class="loader-logo">NORTHBRIDGE TRUST</div><div class="rings"><div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div><div class="spin"></div><div class="core"></div></div><div class="title">Loading...</div><div class="sub">Secure banking platform</div><div class="bar"></div></div>';
  document.body.appendChild(overlay);
};

export function startGlobalLoading() {
  document.addEventListener('click', (event) => {
    if (replay || loading) return;
    const target = event.target as HTMLElement | null;
    const button = target?.closest('button,[role="button"]') as HTMLElement | null;
    if (!button || (button as HTMLButtonElement).disabled || button.closest('#nb-react-loading')) return;
    event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
    loading = true; show();
    window.setTimeout(() => {
      document.getElementById('nb-react-loading')?.remove(); loading = false; replay = true;
      button.click(); window.setTimeout(() => { replay = false; }, 50);
    }, 2000);
  }, true);
}
