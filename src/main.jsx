// Import ReactDOM's createRoot API for rendering the app
import { createRoot } from 'react-dom/client';

// Import global CSS
import './index.css';

// Import the main App component
import App from './App.jsx';

// Optional: Vercel's performance monitoring tool
import { SpeedInsights } from '@vercel/speed-insights/react';

// Render the App into the root DOM element
createRoot(document.getElementById('root')).render(
  <>
    <App /> {/* Main application */}
    <SpeedInsights /> {/* Vercel analytics */}
  </>
);
