import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Use createRoot instead of ReactDOM.render in React 18
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
