import { Link, Navigate } from 'react-router-dom';
import { pages } from './pages';

export function LegacyPage({ pageKey }) {
  const page = pages[pageKey];

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
        />
      </main>
    </div>
  );
}
