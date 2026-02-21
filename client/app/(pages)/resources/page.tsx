'use client'

import { useState } from "react"
import Header from '@/(components)/header/page'
import Footer from "@/(components)/footer/page"

const resources = [
  { id: 1, title: "Field Operations Manual", category: "manuals", description: "Complete guide to field operations procedures and protocols", type: "PDF", size: "4.2 MB", date: "2023-10-15" },
  { id: 2, title: "Weapon Safety Protocols", category: "safety", description: "Standard operating procedures for weapon handling and safety", type: "PDF", size: "2.1 MB", date: "2023-09-22" },
  { id: 3, title: "Communication Encryption Guide", category: "comms", description: "Protocols for secure military communications", type: "DOC", size: "1.5 MB", date: "2023-11-05" },
  { id: 4, title: "First Aid in Combat Situations", category: "medical", description: "Emergency medical procedures for field operations", type: "PDF", size: "3.7 MB", date: "2023-08-17" },
  { id: 5, title: "Navigation & Topography", category: "training", description: "Advanced land navigation techniques and map reading", type: "PDF", size: "5.3 MB", date: "2023-07-29" },
  { id: 6, title: "Cyber Security Protocols", category: "comms", description: "Guidelines for maintaining operational security in digital communications", type: "PDF", size: "2.8 MB", date: "2023-10-30" },
  { id: 7, title: "Vehicle Maintenance Checklist", category: "logistics", description: "Routine maintenance procedures for military vehicles", type: "XLS", size: "0.8 MB", date: "2023-09-10" },
  { id: 8, title: "Rules of Engagement", category: "regulations", description: "Current rules of engagement for various operational theaters", type: "PDF", size: "1.9 MB", date: "2023-11-12" }
];

const categories = [
  { id: "all", name: "All" },
  { id: "manuals", name: "Field Manuals" },
  { id: "safety", name: "Safety" },
  { id: "comms", name: "Communications" },
  { id: "medical", name: "Medical" },
  { id: "training", name: "Training" },
  { id: "logistics", name: "Logistics" },
  { id: "regulations", name: "Regulations" }
];

const typeColors: Record<string, string> = {
  PDF: 'var(--red-alert)',
  DOC: 'var(--cyan)',
  XLS: 'var(--green-ok)',
};

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = resources.filter(r => {
    const s = searchTerm.toLowerCase();
    const matchSearch = r.title.toLowerCase().includes(s) || r.description.toLowerCase().includes(s);
    const matchCat = activeCategory === "all" || r.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&family=Exo+2:wght@300;400;600;800&display=swap');

        :root {
          --cyan: #00e5ff; --cyan-dim: #00b8cc;
          --cyan-glow: rgba(0,229,255,0.10); --cyan-border: rgba(0,229,255,0.22);
          --bg-deep: #020c10; --bg-panel: #040f14; --bg-card: #061318;
          --text-primary: #e0f7fa; --text-muted: #546e7a;
          --red-alert: #ff1744; --amber: #ffab00; --green-ok: #00e676;
        }

        .rs-root {
          background: var(--bg-deep); min-height: 100vh;
          font-family: 'Exo 2', sans-serif; color: var(--text-primary);
          position: relative; overflow-x: hidden;
        }

        .rs-grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px; pointer-events: none; z-index: 0;
        }

        .rs-scanlines {
          position: fixed; inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px);
          pointer-events: none; z-index: 1;
        }

        .rs-content { position: relative; z-index: 2; }

        /* HERO */
        .rs-hero {
          padding: 60px 24px 48px; text-align: center;
          border-bottom: 1px solid var(--cyan-border); position: relative;
        }

        .rs-hero::before {
          content: '';
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 400px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
        }

        .rs-corner { position: absolute; width: 14px; height: 14px; }
        .rs-corner.tl { top: 18px; left: 18px; border-top: 1px solid var(--cyan); border-left: 1px solid var(--cyan); }
        .rs-corner.tr { top: 18px; right: 18px; border-top: 1px solid var(--cyan); border-right: 1px solid var(--cyan); }
        .rs-corner.bl { bottom: 18px; left: 18px; border-bottom: 1px solid var(--cyan); border-left: 1px solid var(--cyan); }
        .rs-corner.br { bottom: 18px; right: 18px; border-bottom: 1px solid var(--cyan); border-right: 1px solid var(--cyan); }

        .rs-eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.4em; color: var(--cyan);
          text-transform: uppercase; margin-bottom: 12px; opacity: 0.75;
        }

        .rs-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(36px, 6vw, 60px); font-weight: 700;
          letter-spacing: 0.15em; line-height: 1; color: transparent;
          background: linear-gradient(135deg, #ffffff 0%, var(--cyan) 60%, #80deea 100%);
          -webkit-background-clip: text; background-clip: text; margin-bottom: 6px;
        }

        .rs-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; color: var(--text-muted); letter-spacing: 0.2em;
        }

        /* SECTION */
        .rs-section { max-width: 1200px; margin: 0 auto; padding: 48px 24px 0; }
        .rs-pb { padding-bottom: 80px; }

        /* CONTROLS */
        .rs-controls {
          background: var(--bg-card); border: 1px solid var(--cyan-border);
          padding: 18px 24px; margin-bottom: 24px;
          display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
        }

        .rs-search-wrap { flex: 1; min-width: 200px; position: relative; }

        .rs-search-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          color: var(--text-muted); pointer-events: none;
        }

        .rs-search {
          width: 100%; background: var(--bg-panel);
          border: 1px solid var(--cyan-border); color: var(--text-primary);
          font-family: 'Share Tech Mono', monospace; font-size: 11px; letter-spacing: 0.1em;
          padding: 9px 12px 9px 36px; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .rs-search::placeholder { color: var(--text-muted); }
        .rs-search:focus { border-color: var(--cyan); box-shadow: 0 0 16px rgba(0,229,255,0.1); }

        .rs-cat-tabs { display: flex; gap: 2px; flex-wrap: wrap; }

        .rs-cat-btn {
          background: transparent; border: 1px solid rgba(0,229,255,0.1);
          color: var(--text-muted); font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 7px 12px; cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }

        .rs-cat-btn:hover { border-color: var(--cyan-border); color: var(--cyan); background: var(--cyan-glow); }
        .rs-cat-btn.active { border-color: var(--cyan); color: var(--cyan); background: var(--cyan-glow); }

        .rs-count {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.15em; color: var(--text-muted);
          margin-bottom: 14px; white-space: nowrap;
        }

        .rs-count span { color: var(--cyan); }

        /* GRID */
        .rs-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;
          background: var(--cyan-border); border: 1px solid var(--cyan-border);
        }

        @media (max-width: 1024px) { .rs-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .rs-grid { grid-template-columns: 1fr; } }

        /* RESOURCE CARD */
        .rs-card {
          background: var(--bg-card); padding: 0;
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
          transition: background 0.2s;
        }

        .rs-card:hover { background: #071820; }

        .rs-card-body { padding: 24px 24px 16px; flex: 1; }

        .rs-card-top {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 14px;
        }

        .rs-cat-tag {
          font-family: 'Share Tech Mono', monospace; font-size: 8px;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--cyan); border: 1px solid var(--cyan-border);
          background: var(--cyan-glow); padding: 3px 8px;
        }

        .rs-type-badge {
          font-family: 'Share Tech Mono', monospace; font-size: 9px;
          letter-spacing: 0.15em; font-weight: 700;
          padding: 3px 8px; border: 1px solid;
        }

        .rs-card-title {
          font-family: 'Rajdhani', sans-serif; font-size: 18px;
          font-weight: 700; letter-spacing: 0.05em;
          color: var(--text-primary); margin-bottom: 8px;
        }

        .rs-card-desc {
          font-size: 13px; color: var(--text-muted); line-height: 1.5; font-weight: 300;
        }

        .rs-card-meta {
          display: flex; justify-content: space-between;
          padding: 10px 24px;
          border-top: 1px solid rgba(0,229,255,0.06);
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.1em; color: #37474f;
        }

        .rs-card-footer {
          padding: 0 24px 20px;
        }

        .rs-dl-btn {
          width: 100%; background: transparent;
          border: 1px solid var(--cyan-border); color: var(--cyan);
          font-family: 'Share Tech Mono', monospace; font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 10px; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }

        .rs-dl-btn:hover { background: var(--cyan-glow); box-shadow: 0 0 16px rgba(0,229,255,0.12); }

        /* EMPTY */
        .rs-empty {
          padding: 64px 24px; text-align: center;
          background: var(--bg-card); border: 1px dashed rgba(0,229,255,0.12);
        }

        .rs-empty-title {
          font-family: 'Rajdhani', sans-serif; font-size: 18px;
          font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          color: #37474f; margin-top: 14px; margin-bottom: 6px;
        }

        .rs-empty-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.12em; color: #263238;
        }

        /* ADDITIONAL SECTION */
        .rs-add-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
          background: var(--cyan-border); border: 1px solid var(--cyan-border);
        }

        @media (max-width: 640px) { .rs-add-grid { grid-template-columns: 1fr; } }

        .rs-add-panel { background: var(--bg-card); padding: 28px 28px; }

        .rs-add-title {
          font-family: 'Rajdhani', sans-serif; font-size: 16px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-primary);
          margin-bottom: 18px; display: flex; align-items: center; gap: 8px;
        }

        .rs-add-title::before {
          content: ''; display: block; width: 2px; height: 16px;
          background: var(--cyan); box-shadow: 0 0 6px var(--cyan);
        }

        .rs-add-list { display: flex; flex-direction: column; gap: 8px; }

        .rs-add-item {
          font-family: 'Share Tech Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; color: var(--text-muted);
          display: flex; align-items: center; gap: 8px;
          padding: 8px 10px; border: 1px solid transparent;
          transition: all 0.2s; cursor: pointer; text-decoration: none;
        }

        .rs-add-item::before { content: '◈'; font-size: 7px; color: var(--cyan); opacity: 0.4; }
        .rs-add-item:hover { color: var(--cyan); border-color: var(--cyan-border); background: var(--cyan-glow); }

        .rs-sec-title {
          font-family: 'Rajdhani', sans-serif; font-size: 20px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-primary);
          display: flex; align-items: center; gap: 10px; margin-bottom: 16px; padding-top: 48px;
        }

        .rs-sec-title::before {
          content: ''; display: block; width: 3px; height: 20px;
          background: var(--cyan); box-shadow: 0 0 8px var(--cyan);
        }

        .rs-divider {
          border: none; height: 1px; margin: 0 24px;
          background: linear-gradient(90deg, transparent, var(--cyan-border), transparent);
        }
      `}</style>

      <div className="rs-root">
        <div className="rs-grid-bg" /><div className="rs-scanlines" />

        <div className="rs-content">
          <Header />

          <div className="rs-hero">
            <div className="rs-corner tl" /><div className="rs-corner tr" />
            <div className="rs-corner bl" /><div className="rs-corner br" />
            <div className="rs-eyebrow">◈ CLASSIFIED DOCUMENT ARCHIVE · SECURE ACCESS</div>
            <div className="rs-title">RESOURCES</div>
            <div className="rs-sub">MILITARY DOCUMENTATION PORTAL · {resources.length} FILES INDEXED</div>
          </div>

          <div className="rs-section">
            {/* Controls */}
            <div className="rs-controls">
              <div className="rs-search-wrap">
                <div className="rs-search-icon">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="SEARCH DOCUMENTS..."
                  className="rs-search"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="rs-cat-tabs">
                {categories.map(c => (
                  <button
                    key={c.id}
                    className={`rs-cat-btn${activeCategory === c.id ? ' active' : ''}`}
                    onClick={() => setActiveCategory(c.id)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rs-count">SHOWING <span>{filtered.length}</span> OF <span>{resources.length}</span> DOCUMENTS</div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="rs-empty">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75} style={{ color: 'rgba(0,229,255,0.12)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="rs-empty-title">No Documents Found</div>
                <div className="rs-empty-sub">Adjust search parameters or clear category filter</div>
              </div>
            ) : (
              <div className="rs-grid">
                {filtered.map(r => {
                  const typeColor = typeColors[r.type] || 'var(--text-muted)';
                  return (
                    <div key={r.id} className="rs-card">
                      <div className="rs-card-body">
                        <div className="rs-card-top">
                          <div className="rs-cat-tag">{r.category.toUpperCase()}</div>
                          <div className="rs-type-badge" style={{ color: typeColor, borderColor: `${typeColor}40`, background: `${typeColor}0d` }}>
                            {r.type}
                          </div>
                        </div>
                        <div className="rs-card-title">{r.title}</div>
                        <div className="rs-card-desc">{r.description}</div>
                      </div>
                      <div className="rs-card-meta">
                        <span>{r.size}</span>
                        <span>{new Date(r.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase()}</span>
                      </div>
                      <div className="rs-card-footer">
                        <button className="rs-dl-btn">
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          DOWNLOAD
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <hr className="rs-divider" style={{ marginTop: 48 }} />

          <div className="rs-section rs-pb">
            <div className="rs-sec-title">Additional Resources</div>
            <div className="rs-add-grid">
              <div className="rs-add-panel">
                <div className="rs-add-title">Frequently Asked Questions</div>
                <div className="rs-add-list">
                  <a className="rs-add-item">How to request additional resources</a>
                  <a className="rs-add-item">Accessing classified materials</a>
                  <a className="rs-add-item">Reporting outdated documentation</a>
                </div>
              </div>
              <div className="rs-add-panel">
                <div className="rs-add-title" style={{ color: 'var(--red-alert)' } as React.CSSProperties}>
                  <span style={{ background: 'var(--red-alert)', boxShadow: '0 0 6px var(--red-alert)' }} />
                  Emergency Protocols
                </div>
                <div className="rs-add-list">
                  <a className="rs-add-item">Emergency contact directory</a>
                  <a className="rs-add-item">Crisis response procedures</a>
                  <a className="rs-add-item">Evacuation protocols</a>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}