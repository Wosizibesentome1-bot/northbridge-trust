const USER_KEY = 'northbridge-trust-prototype-v5';

function hasSavedAccount() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return false;
    const user = JSON.parse(raw);
    return !!(user && user.email && user.name);
  } catch {
    return false;
  }
}

function sendToAccountBalance() {
  if (!hasSavedAccount()) return;
  const hash = window.location.hash || '#/';
  if (hash === '#/' || hash === '' || hash === '#') {
    window.location.hash = '/dashboard';
  }
}

function boot() {
  sendToAccountBalance();
  window.addEventListener('hashchange', sendToAccountBalance);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
