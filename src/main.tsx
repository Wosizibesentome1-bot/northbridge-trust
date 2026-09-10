import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './midnight.css';
import './persistent-account';
import './page-navigation.css';
import './page-navigation';
import './global-loading';
import './dashboard-card-fix.css';
import { startGlobalLoading } from './global-loading';

startGlobalLoading();
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
