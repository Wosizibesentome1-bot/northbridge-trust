import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './midnight.css';
import './otp-registration.css';
import './otp-registration';
import './persistent-account';
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);