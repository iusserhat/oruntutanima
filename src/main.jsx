import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './app.css';
import { LegacyPage } from './pages/LegacyPage';
import { pages } from './pages/pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LegacyPage pageKey="ana-sayfa" />} />
        {Object.keys(pages).map((key) => (
          <Route key={key} path={`/${key}`} element={<LegacyPage pageKey={key} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
