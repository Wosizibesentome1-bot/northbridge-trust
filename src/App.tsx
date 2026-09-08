import { useEffect, useState } from 'react';

const KEY = 'northbridge-trust-prototype-v4';
const currencies = ['USD','CAD','GBP','EUR','NGN','GHS','ZAR','AED','ILS','JPY','TRY','SEK'];

type User = { name: string; email: string; currency: string };

function getUser(): User | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function go(path: string) {
  window.location.hash = path;
}

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [user, setUser] = useState<User | null>(getUser());

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const saveUser = (next: User) => {
    localStorage.setItem(KEY, JSON.stringify(next));
    setUser(next);
    go('/dashboard');
  };

  if (route === '#/dashboard') return <Dashboard user={user} />;
  if (route === '#/auth') return <Auth />;
  if (route === '#/register') return <Register onComplete={saveUser} />;
  if (route === '#/login') return <Login onComplete={() => go('/dashboard')} />;
  return <Landing />;
}

function Header() {
  return (
    <header className="public-header">
      <button className="brand" onClick={() => go('/')} aria-label="Northbridge Trust home">
        <strong>NORTHBRIDGE TRUST</strong><small>FINANCIAL</small>
      </button>
    </header>
  );
}

function Landing() {
  return (
    <div className="site page-screen landing-screen">
      <Header />
      <main className="landing-main">
        <section className="hero landing-hero">
          <div className="hero-copy">
            <span className="eyebrow">MODERN FINANCIAL MANAGEMENT</span>
            <h1>Financial tools designed around the way you manage money.</h1>
            <p>Explore a clean digital workspace for account information, activity and everyday financial-management tools.</p>
            <div className="landing-actions">
              <button onClick={() => go('/auth')}>Get started</button>
              <button className="text-button" onClick={() => go('/auth')}>Discover Northbridge <span>→</span></button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-top"><span>NORTHBRIDGE TRUST</span><span className="status-pill">ACCOUNT</span></div>
              <span className="hero-card-label">Financial workspace</span>
              <strong>Simple. Clear. Organized.</strong>
              <div className="hero-card-line"><span>Account activity</span><b>Explore →</b></div>
              <div className="hero-bars"><i/><i/><i/><i/><i/><i/></div>
            </div>
          </div>
        </section>

        <section className="finance-gallery" aria-label="Northbridge Trust financial services">
          <article className="finance-gallery-card finance-gallery-feature">
            <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=85" alt="Financial documents and planning" />
            <div><span>PERSONAL FINANCE</span><strong>Organize everyday financial planning and account information.</strong></div>
          </article>
          <article className="finance-gallery-card">
            <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=85" alt="Digital payment and banking workspace" />
            <div><span>BANK TRANSFERS</span><strong>Clear digital transfer and payment workflows.</strong></div>
          </article>
          <article className="finance-gallery-card">
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85" alt="Cash and card payment workspace" />
            <div><span>ACCOUNT SERVICES</span><strong>Keep account and payment information organized.</strong></div>
          </article>
          <article className="finance-gallery-card">
            <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=85" alt="Loan paperwork and financial documents" />
            <div><span>LOAN SERVICES</span><strong>Explore personal and business lending information.</strong></div>
          </article>
          <article className="finance-gallery-card finance-gallery-gold">
            <img src="https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1000&q=85" alt="Gold bars representing gold-backed finance" />
            <div><span>GOLD-BACKED FINANCE</span><strong>Learn about finance options involving eligible gold assets.</strong></div>
          </article>
        </section>

        <section className="landing-preview">
          <article><b>01</b><h2>Account overview</h2><p>Review account information in one organized place.</p></article>
          <article><b>02</b><h2>Financial activity</h2><p>Follow a clear visual record of activity and workflows.</p></article>
          <article><b>03</b><h2>Responsive design</h2><p>Use the experience comfortably on phones, tablets and desktops.</p></article>
        </section>
        <div className="prototype-notice">Northbridge Trust prototype — no real funds, payment rails or banking credentials are connected.</div>
      </main>
    </div>
  );
}

function Auth() {
  return (
    <div className="page-screen auth-screen">
      <Header />
      <main className="auth-main">
        <div className="auth-card">
          <button className="back-link" onClick={() => go('/')}>← Back to home</button>
          <span className="eyebrow">WELCOME</span>
          <h1>Access your workspace</h1>
          <p>Choose how you want to continue.</p>
          <div className="auth-buttons">
            <button onClick={() => go('/register')}>Create an account</button>
            <button className="secondary-button" onClick={() => go('/login')}>Log in</button>
          </div>
          <div className="prototype-notice">Prototype only. Do not enter real banking passwords or financial credentials.</div>
        </div>
      </main>
    </div>
  );
}

function Register({ onComplete }: { onComplete: (u: User) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currency, setCurrency] = useState('USD');

  return (
    <div className="page-screen form-screen">
      <Header />
      <main className="form-main">
        <form className="form-card" onSubmit={(e) => { e.preventDefault(); onComplete({ name: name || 'Northbridge User', email: email || 'user@example.com', currency }); }}>
          <button type="button" className="back-link" onClick={() => go('/auth')}>← Back</button>
          <span className="eyebrow">CREATE ACCOUNT</span>
          <h1>Create your account</h1>
          <p>Set up a prototype workspace to explore the interface.</p>
          <label>Full name<input required value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" /></label>
          <label>Email address<input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" /></label>
          <label>Account currency<select value={currency} onChange={e => setCurrency(e.target.value)}>{currencies.map(c => <option key={c}>{c}</option>)}</select></label>
          <button type="submit">Create account</button>
          <div className="prototype-notice">Prototype account only — no real account or funds are created.</div>
        </form>
      </main>
    </div>
  );
}

function Login({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="page-screen form-screen">
      <Header />
      <main className="form-main">
        <form className="form-card" onSubmit={(e) => { e.preventDefault(); onComplete(); }}>
          <button type="button" className="back-link" onClick={() => go('/auth')}>← Back</button>
          <span className="eyebrow">LOG IN</span>
          <h1>Welcome back</h1>
          <p>Enter the prototype account details below.</p>
          <label>Email address<input required type="email" placeholder="Enter your email address" /></label>
          <label>Prototype password<input required type="password" placeholder="Enter password" /></label>
          <button type="submit">Log in</button>
          <div className="prototype-notice">Prototype only. No real authentication service is connected.</div>
        </form>
      </main>
    </div>
  );
}

function Dashboard({ user }: { user: User | null }) {
  const displayName = user?.name || 'Northbridge User';
  const currency = user?.currency || 'USD';
  const formatter = new Intl.NumberFormat(undefined, { style: 'currency', currency });

  return (
    <div className="dashboard-screen">
      <header className="dashboard-header">
        <button className="brand" onClick={() => go('/dashboard')}><strong>NORTHBRIDGE TRUST</strong><small>FINANCIAL</small></button>
        <button className="exit-button" onClick={() => go('/')}>Exit</button>
      </header>
      <main className="dashboard-main">
        <section className="welcome-row"><div><span className="eyebrow">ACCOUNT WORKSPACE</span><h1>Welcome, {displayName}</h1></div><span className="currency-pill">{currency}</span></section>
        <section className="balance-card"><span>Available balance</span><strong>{formatter.format(0)}</strong><small>Prototype account balance</small></section>
        <section className="dashboard-actions">
          {['Send','Receive','Deposit','More'].map(action => <button key={action} onClick={() => alert(`${action} is a prototype interface action.`)}>{action}</button>)}
        </section>
        <section className="activity-card"><div className="section-head"><h2>Recent activity</h2><span>View all</span></div><div className="empty-state">No recent activity</div></section>
        <div className="prototype-notice">Northbridge Trust prototype — balances and transactions shown here are not connected to real money or banking systems.</div>
      </main>
      <nav className="bottom-nav"><button className="active">Home</button><button onClick={() => alert('Transfer is a prototype interface action.')}>Transfer</button><button onClick={() => alert('Activity is a prototype interface action.')}>Activity</button><button onClick={() => alert('Profile is a prototype interface action.')}>Profile</button></nav>
    </div>
  );
}
