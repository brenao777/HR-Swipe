import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../global.css';

createRoot(document.getElementById('root')!).render(<App />);
