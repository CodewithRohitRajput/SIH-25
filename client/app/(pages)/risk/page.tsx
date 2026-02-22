'use client'

import { useState, useEffect } from "react"
import Header from '@/(components)/header/page'
import Footer from "@/(components)/footer/page"

const BACKEND_URL = "http://localhost:5002"

export default function Risked() {
  const [riskApps, setRiskApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const getRiskApps = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BACKEND_URL}/risk/get`, {
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) setRiskApps(data.data || []);
    } catch (err) {
      console.error("Error fetching risk applications:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { getRiskApps(); }, []);

  const filteredRiskApps = riskApps.filter((risk: any) => {
    const s = searchTerm.toLowerCase();
    return (
      risk.appName?.toLowerCase().includes(s) ||
      risk.websiteName?.toLowerCase().includes(s) ||
      risk.title?.toLowerCase().includes(s) ||
      risk.description?.toLowerCase().includes(s)
    );
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&family=Exo+2:wght@300;400;600;800&display=swap');

        :root {
          --cyan: #00e5ff;
          --cyan-dim: #00b8cc;
          --cyan-glow: rgba(0,229,255,0.10);
          --cyan-border: rgba(0,229,255,0.22);
          --bg-deep: #020c10;
          --bg-panel: #040f14;
          --bg-card: #061318;
          --text-primary: #e0f7fa;
          --text-muted: #546e7a;
          --red-alert: #ff1744;
          --red-glow: rgba(255,23,68,0.12);
          --red-border: rgba(255,23,68,0.28);
          --amber: #ffab00;
          --green-ok: #00e676;
        }

        .rsk-root {
          background: var(--bg-deep);
          min-height: 100vh;
          font-family: 'Exo 2', sans-serif;
          color: var(--text-primary);
          position: relative;
          overflow-x: hidden;
        }

        .rsk-grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none; z-index: 0;
        }

        .rsk-scanlines {
          position: fixed; inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px
          );
          pointer-events: none; z-index: 1;
        }

        .rsk-content { position: relative; z-index: 2; }

        /* ---- HERO ---- */
        .rsk-hero {
          padding: 64px 24px 52px;
          text-align: center;
          border-bottom: 1px solid var(--red-border);
          position: relative;
        }

        .rsk-hero::before {
          content: '';
          position: absolute;
          bottom: 0; left: 50%; transform: translateX(-50%);
          width: 500px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--red-alert), transparent);
        }

        .rsk-corner { position: absolute; width: 14px; height: 14px; }
        .rsk-corner.tl { top: 18px; left: 18px; border-top: 1px solid var(--red-alert); border-left: 1px solid var(--red-alert); }
        .rsk-corner.tr { top: 18px; right: 18px; border-top: 1px solid var(--red-alert); border-right: 1px solid var(--red-alert); }
        .rsk-corner.bl { bottom: 18px; left: 18px; border-bottom: 1px solid var(--red-alert); border-left: 1px solid var(--red-alert); }
        .rsk-corner.br { bottom: 18px; right: 18px; border-bottom: 1px solid var(--red-alert); border-right: 1px solid var(--red-alert); }

        .rsk-eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.4em;
          color: var(--red-alert); text-transform: uppercase;
          margin-bottom: 14px; opacity: 0.75;
        }

        .rsk-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(38px, 7vw, 68px);
          font-weight: 700; letter-spacing: 0.15em; line-height: 1;
          color: transparent;
          background: linear-gradient(135deg, #ffffff 0%, #ff6b6b 50%, var(--red-alert) 100%);
          -webkit-background-clip: text; background-clip: text;
        }

        .rsk-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; color: var(--text-muted);
          letter-spacing: 0.2em; margin-top: 8px; margin-bottom: 24px;
        }

        .rsk-pills {
          display: flex; align-items: center; justify-content: center;
          gap: 14px; flex-wrap: wrap;
        }

        .rsk-pill {
          display: flex; align-items: center; gap: 7px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.12em;
          color: var(--text-muted); padding: 5px 14px;
          border: 1px solid var(--red-border); background: var(--red-glow);
        }

        .rsk-pill-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--red-alert); box-shadow: 0 0 6px var(--red-alert);
          animation: rsk-pulse 2s infinite;
        }

        @keyframes rsk-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        /* ---- SECTION ---- */
        .rsk-section {
          max-width: 1200px; margin: 0 auto; padding: 48px 24px 0;
        }

        /* ---- STATS ---- */
        .rsk-stats {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 2px; background: var(--red-border);
          border: 1px solid var(--red-border);
        }

        @media (max-width: 640px) { .rsk-stats { grid-template-columns: 1fr; } }

        .rsk-stat {
          background: var(--bg-panel); padding: 24px 20px; text-align: center;
          position: relative; transition: background 0.2s;
        }
        .rsk-stat:hover { background: #0a1a1f; }
        .rsk-stat::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
        }
        .rsk-stat.s-red::before { background: var(--red-alert); box-shadow: 0 0 10px var(--red-alert); }
        .rsk-stat.s-amber::before { background: var(--amber); box-shadow: 0 0 10px var(--amber); }
        .rsk-stat.s-green::before { background: var(--green-ok); box-shadow: 0 0 10px var(--green-ok); }

        .rsk-stat-num {
          font-family: 'Rajdhani', sans-serif; font-size: 40px;
          font-weight: 700; line-height: 1; margin-bottom: 6px;
        }
        .rsk-stat.s-red .rsk-stat-num { color: var(--red-alert); text-shadow: 0 0 20px rgba(255,23,68,0.4); }
        .rsk-stat.s-amber .rsk-stat-num { color: var(--amber); text-shadow: 0 0 20px rgba(255,171,0,0.4); }
        .rsk-stat.s-green .rsk-stat-num { color: var(--green-ok); text-shadow: 0 0 20px rgba(0,230,118,0.4); }

        .rsk-stat-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--text-muted);
        }

        /* ---- CONTROLS ---- */
        .rsk-controls {
          background: var(--bg-card); border: 1px solid var(--cyan-border);
          padding: 20px 24px; margin-bottom: 24px;
          display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
        }

        .rsk-search-wrap {
          flex: 1; min-width: 220px; position: relative;
        }

        .rsk-search-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          color: var(--text-muted); pointer-events: none;
        }

        .rsk-search {
          width: 100%; background: var(--bg-panel);
          border: 1px solid var(--cyan-border); color: var(--text-primary);
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; letter-spacing: 0.1em;
          padding: 9px 12px 9px 36px;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }

        .rsk-search::placeholder { color: var(--text-muted); }
        .rsk-search:focus {
          border-color: var(--cyan);
          box-shadow: 0 0 16px rgba(0,229,255,0.1);
        }

        .rsk-count {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.15em;
          color: var(--text-muted); white-space: nowrap;
        }

        .rsk-count span { color: var(--red-alert); }

        .rsk-refresh {
          background: transparent; border: 1px solid var(--cyan-border);
          color: var(--cyan); font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
          padding: 9px 18px; cursor: pointer; display: flex; align-items: center; gap: 8px;
          transition: all 0.2s; white-space: nowrap;
        }

        .rsk-refresh:hover {
          background: var(--cyan-glow); box-shadow: 0 0 14px rgba(0,229,255,0.15);
        }

        /* ---- TABLE ---- */
        .rsk-table-wrap {
          background: var(--bg-card); border: 1px solid rgba(255,23,68,0.12);
          overflow: hidden;
        }

        .rsk-table {
          width: 100%; border-collapse: collapse;
        }

        .rsk-thead { background: var(--bg-panel); }

        .rsk-th {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--text-muted); padding: 14px 20px; text-align: left;
          border-bottom: 1px solid rgba(255,23,68,0.15);
          white-space: nowrap;
        }

        .rsk-th:first-child { border-left: 3px solid var(--red-alert); }

        .rsk-tr {
          border-bottom: 1px solid rgba(0,229,255,0.05);
          transition: background 0.15s;
          cursor: pointer;
        }

        .rsk-tr:hover { background: rgba(255,23,68,0.04); }
        .rsk-tr.active { background: rgba(255,23,68,0.07); }

        .rsk-td { padding: 14px 20px; vertical-align: middle; }
        .rsk-td:first-child { border-left: 3px solid transparent; }
        .rsk-tr:hover .rsk-td:first-child,
        .rsk-tr.active .rsk-td:first-child { border-left-color: var(--red-alert); }

        .rsk-app-cell { display: flex; align-items: center; gap: 12px; }

        .rsk-app-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          border: 1px solid var(--red-border); background: var(--red-glow);
          display: flex; align-items: center; justify-content: center;
          color: var(--red-alert);
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }

        .rsk-app-name {
          font-family: 'Rajdhani', sans-serif; font-size: 15px;
          font-weight: 700; letter-spacing: 0.05em; color: var(--text-primary);
        }

        .rsk-badge-risk {
          font-family: 'Share Tech Mono', monospace; font-size: 8px;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--red-alert); border: 1px solid var(--red-border);
          background: var(--red-glow); padding: 2px 8px; display: inline-block;
          margin-top: 3px;
        }

        .rsk-website {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; letter-spacing: 0.05em; color: var(--cyan-dim);
        }

        .rsk-item-title {
          font-family: 'Rajdhani', sans-serif; font-size: 14px;
          font-weight: 600; color: var(--text-primary); letter-spacing: 0.03em;
        }

        .rsk-desc {
          font-size: 12px; color: var(--text-muted);
          max-width: 280px; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }

        .rsk-date {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.1em; color: #37474f;
          white-space: nowrap;
        }

        /* Expanded row */
        .rsk-expanded-row { background: rgba(255,23,68,0.03); }

        .rsk-expanded-td {
          padding: 0 20px 16px 71px;
          border-bottom: 1px solid rgba(255,23,68,0.1);
          border-left: 3px solid var(--red-alert);
        }

        .rsk-expanded-desc {
          font-size: 13px; color: #607d8b; line-height: 1.6;
          font-family: 'Exo 2', sans-serif; font-weight: 300;
        }

        /* ---- LOADER / EMPTY ---- */
        .rsk-loader {
          padding: 64px 24px; text-align: center;
          background: var(--bg-card); border: 1px solid rgba(255,23,68,0.1);
        }

        .rsk-loader-ring {
          display: inline-block; width: 40px; height: 40px;
          border: 2px solid rgba(255,23,68,0.1); border-top-color: var(--red-alert);
          border-radius: 50%; animation: rsk-spin 0.8s linear infinite; margin-bottom: 16px;
        }

        @keyframes rsk-spin { to { transform: rotate(360deg); } }

        .rsk-loader-text {
          font-family: 'Share Tech Mono', monospace; font-size: 11px;
          letter-spacing: 0.2em; color: var(--text-muted); text-transform: uppercase;
        }

        .rsk-empty {
          padding: 64px 24px; text-align: center;
          background: var(--bg-card); border: 1px dashed rgba(255,23,68,0.15);
        }

        .rsk-empty-icon { color: rgba(255,23,68,0.15); margin-bottom: 16px; }

        .rsk-empty-title {
          font-family: 'Rajdhani', sans-serif; font-size: 18px;
          font-weight: 600; letter-spacing: 0.1em;
          color: #37474f; margin-bottom: 8px; text-transform: uppercase;
        }

        .rsk-empty-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; letter-spacing: 0.1em; color: #263238;
        }

        /* ---- SECTION TITLE ---- */
        .rsk-sec-title {
          font-family: 'Rajdhani', sans-serif; font-size: 20px;
          font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--text-primary); display: flex; align-items: center; gap: 10px;
          margin-bottom: 20px; padding-top: 48px;
        }

        .rsk-sec-title::before {
          content: ''; display: block; width: 3px; height: 20px;
          background: var(--red-alert); box-shadow: 0 0 8px var(--red-alert);
        }

        .rsk-divider {
          border: none; height: 1px;
          background: linear-gradient(90deg, transparent, var(--red-border), transparent);
          margin: 0 24px;
        }

        .rsk-pb { padding-bottom: 64px; }

        @media (max-width: 900px) {
          .rsk-th:nth-child(4), .rsk-td:nth-child(4) { display: none; }
        }
        @media (max-width: 640px) {
          .rsk-th:nth-child(3), .rsk-td:nth-child(3) { display: none; }
        }
      `}</style>

      <div className="rsk-root">
        <div className="rsk-grid-bg" />
        <div className="rsk-scanlines" />

        <div className="rsk-content">
          <Header />

          {/* Hero */}
          <div className="rsk-hero">
            <div className="rsk-corner tl" /><div className="rsk-corner tr" />
            <div className="rsk-corner bl" /><div className="rsk-corner br" />
            <div className="rsk-eyebrow">⚠ THREAT INTELLIGENCE DATABASE · RESTRICTED</div>
            <h1 className="rsk-title">RISK INTEL</h1>
            <div className="rsk-sub">FLAGGED APPLICATIONS & THREAT REGISTRY</div>
            <div className="rsk-pills">
              <div className="rsk-pill"><div className="rsk-pill-dot" />LIVE DATABASE</div>
              <div className="rsk-pill"><div className="rsk-pill-dot" />AUTO-SCANNING: ON</div>
              <div className="rsk-pill"><div className="rsk-pill-dot" />{riskApps.length} THREATS INDEXED</div>
            </div>
          </div>

          {/* Stats */}
          <div className="rsk-section">
            <div className="rsk-stats">
              <div className="rsk-stat s-red">
                <div className="rsk-stat-num">{riskApps.length}</div>
                <div className="rsk-stat-label">Total Threats</div>
              </div>
              <div className="rsk-stat s-amber">
                <div className="rsk-stat-num">{new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()}</div>
                <div className="rsk-stat-label">Last Updated</div>
              </div>
              <div className="rsk-stat s-green">
                <div className="rsk-stat-num">ON</div>
                <div className="rsk-stat-label">Monitor Status</div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="rsk-section rsk-pb">
            <div className="rsk-sec-title">Threat Registry</div>

            {/* Controls */}
            <div className="rsk-controls">
              <div className="rsk-search-wrap">
                <div className="rsk-search-icon">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="SEARCH THREAT DATABASE..."
                  className="rsk-search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="rsk-count">
                <span>{filteredRiskApps.length}</span> THREAT{filteredRiskApps.length !== 1 ? 'S' : ''} FOUND
              </div>
              <button className="rsk-refresh" onClick={getRiskApps}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                REFRESH
              </button>
            </div>

            {/* Table */}
            {isLoading ? (
              <div className="rsk-loader">
                <div className="rsk-loader-ring" />
                <div className="rsk-loader-text">Scanning threat database...</div>
              </div>
            ) : filteredRiskApps.length === 0 ? (
              <div className="rsk-empty">
                <div className="rsk-empty-icon">
                  <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="rsk-empty-title">
                  {searchTerm ? "No Matching Threats" : "No Threats Indexed"}
                </div>
                <div className="rsk-empty-sub">
                  {searchTerm ? "Adjust search parameters and retry" : "Threat entries will appear here once reported"}
                </div>
              </div>
            ) : (
              <div className="rsk-table-wrap">
                <div style={{ overflowX: 'auto' }}>
                  <table className="rsk-table">
                    <thead className="rsk-thead">
                      <tr>
                        <th className="rsk-th">Application</th>
                        <th className="rsk-th">Website</th>
                        <th className="rsk-th">Title</th>
                        <th className="rsk-th">Description</th>
                        <th className="rsk-th">Date Logged</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRiskApps.map((risk: any, idx: number) => {
                        const id = risk._id || String(idx);
                        const isOpen = expanded === id;
                        return (
                          <>
                            <tr
                              key={id}
                              className={`rsk-tr${isOpen ? ' active' : ''}`}
                              onClick={() => setExpanded(isOpen ? null : id)}
                            >
                              <td className="rsk-td">
                                <div className="rsk-app-cell">
                                  <div className="rsk-app-icon">
                                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <div className="rsk-app-name">{risk.appName}</div>
                                    <div className="rsk-badge-risk">HIGH RISK</div>
                                  </div>
                                </div>
                              </td>
                              <td className="rsk-td">
                                <div className="rsk-website">⬡ {risk.websiteName}</div>
                              </td>
                              <td className="rsk-td">
                                <div className="rsk-item-title">{risk.title}</div>
                              </td>
                              <td className="rsk-td">
                                <div className="rsk-desc">{risk.description}</div>
                              </td>
                              <td className="rsk-td">
                                <div className="rsk-date">
                                  {new Date(risk.createdAt || Date.now())
                                    .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
                                    .toUpperCase()}
                                </div>
                              </td>
                            </tr>
                            {isOpen && (
                              <tr key={`${id}-exp`} className="rsk-expanded-row">
                                <td colSpan={5} className="rsk-expanded-td">
                                  <div className="rsk-expanded-desc">{risk.description}</div>
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <Footer />
        </div>
      </div>
    </>
  )
}