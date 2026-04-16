import { useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { pages } from './pages';

export function LegacyPage({ pageKey }) {
  const page = pages[pageKey];
  const handleFrameLoad = useCallback((event) => {
    const iframe = event.currentTarget;
    const frameDocument = event.currentTarget.contentDocument;
    const frameWindow = event.currentTarget.contentWindow;
    if (!frameDocument || !frameWindow) {
      return;
    }

    const syncFrameHeight = () => {
      const bodyHeight = frameDocument.body?.scrollHeight ?? 0;
      const docHeight = frameDocument.documentElement?.scrollHeight ?? 0;
      const nextHeight = Math.max(bodyHeight, docHeight, window.innerHeight);
      iframe.style.height = `${nextHeight}px`;
    };

    if (!frameDocument.getElementById('react-mobile-fix')) {
      const style = frameDocument.createElement('style');
      style.id = 'react-mobile-fix';
      style.textContent = `
        html, body {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden !important;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
        .content, .content * {
          overflow-wrap: anywhere;
        }
        @media (max-width: 900px) {
          .page-header { padding: 28px 16px 22px !important; }
          .layout { grid-template-columns: 1fr !important; }
          .sidebar {
            position: static !important;
            top: auto !important;
            height: auto !important;
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
            padding: 18px 14px !important;
          }
          .content { max-width: 100% !important; padding: 20px 14px !important; }
          .table-wrap { overflow-x: auto !important; -webkit-overflow-scrolling: touch; }
          pre, .formula-box { white-space: pre-wrap !important; word-break: break-word !important; }
          .card-grid, .grid2, .chapters { grid-template-columns: 1fr !important; }
        }
      `;
      frameDocument.head.appendChild(style);
    }

    syncFrameHeight();
    frameWindow.addEventListener('resize', syncFrameHeight);
    const observer = new MutationObserver(syncFrameHeight);
    observer.observe(frameDocument.body, { childList: true, subtree: true, attributes: true });
    setTimeout(syncFrameHeight, 150);
    setTimeout(syncFrameHeight, 500);
  }, []);

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">Oruntu Tanima - React</div>
        <nav className="route-nav">
          {Object.entries(pages).map(([key, item]) => {
            const to = key === 'ana-sayfa' ? '/' : `/${key}`;
            return (
              <Link key={key} to={to} className={key === pageKey ? 'active' : ''}>
                {item.title}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="viewer-wrap">
        <iframe
          key={page.file}
          title={page.title}
          src={`/legacy/${page.file}`}
          className="legacy-frame"
          onLoad={handleFrameLoad}
        />
      </main>
    </div>
  );
}
