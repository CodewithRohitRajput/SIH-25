"use client";

import { useState, useEffect } from "react";
import Header from "@/(components)/header/page";
import Footer from "@/(components)/footer/page";
import Link from "next/link";

const BACKEND_URL = "http://localhost:5002";

type Report = {
  _id?: string;
  title?: string;
  description?: string;
  category?: string;
  location?: string;
  status?: "pending" | "approved" | "rejected";
  createdBy?: string;
  createdAt?: string;
};

export default function AllReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  useEffect(() => {
    const getReports = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BACKEND_URL}/report/get`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setReports(data.reports || []);
      } finally {
        setIsLoading(false);
      }
    };
    getReports();
  }, []);

  const filtered = reports.filter((r) => {
    const s = searchTerm.toLowerCase();
    const matchSearch =
      r.title?.toLowerCase().includes(s) ||
      r.description?.toLowerCase().includes(s) ||
      r.category?.toLowerCase().includes(s) ||
      r.location?.toLowerCase().includes(s);
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    all: reports.length,
    pending: reports.filter(r => r.status === "pending").length,
    approved: reports.filter(r => r.status === "approved").length,
    rejected: reports.filter(r => r.status === "rejected").length,
  };

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
          --amber: #ffab00;
          --green-ok: #00e676;
        }

        .ar-root {
          background: var(--bg-deep);
          min-height: 100vh;
          font-family: 'Exo 2', sans-serif;
          color: var(--text-primary);
          position: relative;
          overflow-x: hidden;
        }

        .ar-grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none; z-index: 0;
        }

        .ar-scanlines {
          position: fixed; inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px
          );
          pointer-events: none; z-index: 1;
        }

        .ar-content { position: relative; z-index: 2; }

        /* ---- HERO ---- */
        .ar-hero {
          padding: 64px 24px 52px;
          text-align: center;
          border-bottom: 1px solid var(--cyan-border);
          position: relative;
        }

        .ar-hero::before {
          content: '';
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 500px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
        }

        .ar-corner { position: absolute; width: 14px; height: 14px; }
        .ar-corner.tl { top: 18px; left: 18px; border-top: 1px solid var(--cyan); border-left: 1px solid var(--cyan); }
        .ar-corner.tr { top: 18px; right: 18px; border-top: 1px solid var(--cyan); border-right: 1px solid var(--cyan); }
        .ar-corner.bl { bottom: 18px; left: 18px; border-bottom: 1px solid var(--cyan); border-left: 1px solid var(--cyan); }
        .ar-corner.br { bottom: 18px; right: 18px; border-bottom: 1px solid var(--cyan); border-right: 1px solid var(--cyan); }

        .ar-eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.4em;
          color: var(--cyan); text-transform: uppercase;
          margin-bottom: 14px; opacity: 0.75;
        }

        .ar-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(38px, 7vw, 68px);
          font-weight: 700; letter-spacing: 0.15em; line-height: 1;
          color: transparent;
          background: linear-gradient(135deg, #ffffff 0%, var(--cyan) 60%, #80deea 100%);
          -webkit-background-clip: text; background-clip: text;
        }

        .ar-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; color: var(--text-muted);
          letter-spacing: 0.2em; margin-top: 8px; margin-bottom: 24px;
        }

        .ar-pills {
          display: flex; align-items: center; justify-content: center;
          gap: 14px; flex-wrap: wrap;
        }

        .ar-pill {
          display: flex; align-items: center; gap: 7px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.12em;
          color: var(--text-muted); padding: 5px 14px;
          border: 1px solid var(--cyan-border); background: var(--cyan-glow);
        }

        .ar-pill-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--green-ok); box-shadow: 0 0 6px var(--green-ok);
          animation: ar-pulse 2s infinite;
        }

        @keyframes ar-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        /* ---- SECTION ---- */
        .ar-section {
          max-width: 1200px; margin: 0 auto; padding: 48px 24px 64px;
        }

        /* ---- CONTROLS ---- */
        .ar-controls {
          background: var(--bg-card); border: 1px solid var(--cyan-border);
          padding: 18px 24px; margin-bottom: 24px;
          display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
        }

        .ar-search-wrap { flex: 1; min-width: 200px; position: relative; }

        .ar-search-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          color: var(--text-muted); pointer-events: none;
        }

        .ar-search {
          width: 100%; background: var(--bg-panel);
          border: 1px solid var(--cyan-border); color: var(--text-primary);
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; letter-spacing: 0.1em;
          padding: 9px 12px 9px 36px; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .ar-search::placeholder { color: var(--text-muted); }
        .ar-search:focus { border-color: var(--cyan); box-shadow: 0 0 16px rgba(0,229,255,0.1); }

        /* Filter tabs */
        .ar-filters { display: flex; gap: 2px; }

        .ar-filter-btn {
          background: transparent; border: 1px solid rgba(0,229,255,0.12);
          color: var(--text-muted); font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
          padding: 7px 14px; cursor: pointer; transition: all 0.2s;
          white-space: nowrap; display: flex; align-items: center; gap: 6px;
        }

        .ar-filter-btn:hover { border-color: var(--cyan-border); color: var(--cyan); background: var(--cyan-glow); }

        .ar-filter-btn.active-all { border-color: var(--cyan); color: var(--cyan); background: var(--cyan-glow); }
        .ar-filter-btn.active-pending { border-color: rgba(255,171,0,0.4); color: var(--amber); background: rgba(255,171,0,0.08); }
        .ar-filter-btn.active-approved { border-color: rgba(0,230,118,0.4); color: var(--green-ok); background: rgba(0,230,118,0.08); }
        .ar-filter-btn.active-rejected { border-color: rgba(255,23,68,0.4); color: var(--red-alert); background: rgba(255,23,68,0.08); }

        .ar-filter-count {
          font-size: 10px; padding: 1px 5px;
          border-radius: 1px; background: rgba(0,229,255,0.1);
        }

        /* ---- CARDS GRID ---- */
        .ar-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        @media (max-width: 1024px) { .ar-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .ar-grid { grid-template-columns: 1fr; } }

        /* ---- REPORT CARD ---- */
        .ar-card {
          background: var(--bg-card);
          border: 1px solid rgba(0,229,255,0.08);
          position: relative; overflow: hidden;
          display: flex; flex-direction: column;
          transition: border-color 0.25s, transform 0.25s;
        }

        .ar-card:hover { border-color: rgba(0,229,255,0.25); transform: translateY(-2px); }

        .ar-card-accent {
          height: 2px; flex-shrink: 0;
        }
        .ar-card-accent.pending { background: var(--amber); box-shadow: 0 0 8px var(--amber); }
        .ar-card-accent.approved { background: var(--green-ok); box-shadow: 0 0 8px var(--green-ok); }
        .ar-card-accent.rejected { background: var(--red-alert); box-shadow: 0 0 8px var(--red-alert); }

        /* left border */
        .ar-card::before {
          content: ''; position: absolute;
          top: 2px; left: 0; bottom: 0; width: 3px;
        }
        .ar-card.s-pending::before { background: var(--amber); }
        .ar-card.s-approved::before { background: var(--green-ok); }
        .ar-card.s-rejected::before { background: var(--red-alert); }

        .ar-card-body { padding: 20px 20px 16px 24px; flex: 1; display: flex; flex-direction: column; }

        .ar-card-top {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 10px; gap: 10px;
        }

        .ar-card-title {
          font-family: 'Rajdhani', sans-serif; font-size: 17px;
          font-weight: 700; letter-spacing: 0.05em; color: var(--text-primary);
          flex: 1; overflow: hidden; text-overflow: ellipsis;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        }

        .ar-badge {
          font-family: 'Share Tech Mono', monospace; font-size: 9px;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 4px 10px; border: 1px solid; flex-shrink: 0;
          display: flex; align-items: center; gap: 5px;
        }

        .ar-badge.pending { color: var(--amber); border-color: rgba(255,171,0,0.35); background: rgba(255,171,0,0.07); }
        .ar-badge.approved { color: var(--green-ok); border-color: rgba(0,230,118,0.35); background: rgba(0,230,118,0.07); }
        .ar-badge.rejected { color: var(--red-alert); border-color: rgba(255,23,68,0.35); background: rgba(255,23,68,0.07); }

        .ar-badge-dot {
          width: 4px; height: 4px; border-radius: 50%;
        }
        .ar-badge.pending .ar-badge-dot { background: var(--amber); box-shadow: 0 0 4px var(--amber); }
        .ar-badge.approved .ar-badge-dot { background: var(--green-ok); box-shadow: 0 0 4px var(--green-ok); }
        .ar-badge.rejected .ar-badge-dot { background: var(--red-alert); box-shadow: 0 0 4px var(--red-alert); }

        .ar-card-desc {
          font-size: 13px; color: #546e7a; line-height: 1.55;
          flex: 1; margin-bottom: 14px; font-weight: 300;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ar-card-meta {
          display: flex; gap: 16px; flex-wrap: wrap;
        }

        .ar-meta-item {
          display: flex; align-items: center; gap: 5px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.08em; color: #37474f;
        }

        .ar-meta-item svg { color: var(--cyan-dim); flex-shrink: 0; }

        .ar-card-footer {
          padding: 10px 20px 10px 24px;
          border-top: 1px solid rgba(0,229,255,0.06);
          display: flex; justify-content: space-between; align-items: center;
        }

        .ar-card-by {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.08em; color: #2e4650;
          display: flex; align-items: center; gap: 5px;
        }

        .ar-view-link {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--cyan); text-decoration: none;
          border: 1px solid var(--cyan-border); padding: 5px 12px;
          transition: all 0.2s; display: flex; align-items: center; gap: 6px;
        }

        .ar-view-link:hover { background: var(--cyan-glow); box-shadow: 0 0 12px rgba(0,229,255,0.12); }

        /* ---- LOADER / EMPTY ---- */
        .ar-loader {
          padding: 80px 24px; text-align: center;
          background: var(--bg-card); border: 1px solid rgba(0,229,255,0.08);
          grid-column: 1/-1;
        }

        .ar-loader-ring {
          display: inline-block; width: 40px; height: 40px;
          border: 2px solid rgba(0,229,255,0.1); border-top-color: var(--cyan);
          border-radius: 50%; animation: ar-spin 0.8s linear infinite; margin-bottom: 16px;
        }

        @keyframes ar-spin { to { transform: rotate(360deg); } }

        .ar-loader-text {
          font-family: 'Share Tech Mono', monospace; font-size: 11px;
          letter-spacing: 0.2em; color: var(--text-muted); text-transform: uppercase;
        }

        .ar-empty {
          grid-column: 1/-1;
          border: 1px dashed rgba(0,229,255,0.12);
          padding: 80px 24px; text-align: center;
          background: var(--bg-card);
        }

        .ar-empty-icon { color: rgba(0,229,255,0.12); margin-bottom: 16px; }

        .ar-empty-title {
          font-family: 'Rajdhani', sans-serif; font-size: 18px;
          font-weight: 600; letter-spacing: 0.12em;
          color: #263238; margin-bottom: 8px; text-transform: uppercase;
        }

        .ar-empty-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.15em; color: #1c2f35; margin-bottom: 24px;
        }

        .ar-empty-cta {
          display: inline-block; text-decoration: none;
          font-family: 'Share Tech Mono', monospace; font-size: 11px;
          letter-spacing: 0.2em; color: var(--cyan);
          border: 1px solid var(--cyan-border); padding: 10px 24px;
          transition: all 0.2s; text-transform: uppercase;
        }

        .ar-empty-cta:hover { background: var(--cyan-glow); box-shadow: 0 0 20px rgba(0,229,255,0.1); }

        /* results count bar */
        .ar-results-bar {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.15em; color: var(--text-muted);
          margin-bottom: 14px;
          display: flex; align-items: center; gap: 8px;
        }

        .ar-results-bar span { color: var(--cyan); }
      `}</style>

      <div className="ar-root">
        <div className="ar-grid-bg" />
        <div className="ar-scanlines" />

        <div className="ar-content">
          <Header />

          {/* Hero */}
          <div className="ar-hero">
            <div className="ar-corner tl" /><div className="ar-corner tr" />
            <div className="ar-corner bl" /><div className="ar-corner br" />
            <div className="ar-eyebrow">◈ FIELD REPORTS ARCHIVE · SECURE ACCESS</div>
            <h1 className="ar-title">ALL REPORTS</h1>
            <div className="ar-sub">OPERATIONAL INTELLIGENCE — FIELD SUBMISSIONS DATABASE</div>
            <div className="ar-pills">
              <div className="ar-pill"><div className="ar-pill-dot" />LIVE FEED</div>
              <div className="ar-pill"><div className="ar-pill-dot" />{counts.all} REPORTS TOTAL</div>
              <div className="ar-pill"><div className="ar-pill-dot" />{counts.pending} AWAITING REVIEW</div>
            </div>
          </div>

          {/* Main */}
          <div className="ar-section">
            {/* Controls */}
            <div className="ar-controls">
              <div className="ar-search-wrap">
                <div className="ar-search-icon">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="SEARCH REPORTS..."
                  className="ar-search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="ar-filters">
                {(["all", "pending", "approved", "rejected"] as const).map((s) => (
                  <button
                    key={s}
                    className={`ar-filter-btn${statusFilter === s ? ` active-${s}` : ''}`}
                    onClick={() => setStatusFilter(s)}
                  >
                    {s.toUpperCase()}
                    <span className="ar-filter-count">{counts[s]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="ar-results-bar">
              SHOWING <span>{filtered.length}</span> OF <span>{reports.length}</span> REPORTS
            </div>

            {/* Grid */}
            <div className="ar-grid">
              {isLoading ? (
                <div className="ar-loader">
                  <div className="ar-loader-ring" />
                  <div className="ar-loader-text">Retrieving field reports...</div>
                </div>
              ) : filtered.length === 0 ? (
                <div className="ar-empty">
                  <div className="ar-empty-icon">
                    <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ar-empty-title">
                    {searchTerm || statusFilter !== "all" ? "No Matching Reports" : "No Reports On File"}
                  </div>
                  <div className="ar-empty-sub">
                    {searchTerm || statusFilter !== "all"
                      ? "Adjust search parameters or clear filters"
                      : "Operational reports will appear here once submitted"}
                  </div>
                  {!searchTerm && statusFilter === "all" && (
                    <a href="/report" className="ar-empty-cta">Submit First Report →</a>
                  )}
                </div>
              ) : (
                filtered.map((report, idx) => {
                  const status = report.status || "pending";
                  return (
                    <div key={report._id || idx} className={`ar-card s-${status}`}>
                      <div className={`ar-card-accent ${status}`} />
                      <div className="ar-card-body">
                        <div className="ar-card-top">
                          <div className="ar-card-title">{report.title}</div>
                          <div className={`ar-badge ${status}`}>
                            <div className="ar-badge-dot" />
                            {status.toUpperCase()}
                          </div>
                        </div>
                        <div className="ar-card-desc">{report.description}</div>
                        <div className="ar-card-meta">
                          {report.category && (
                            <div className="ar-meta-item">
                              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                              {report.category.toUpperCase()}
                            </div>
                          )}
                          {report.location && (
                            <div className="ar-meta-item">
                              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              ⬡ {report.location.toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="ar-card-footer">
                        <div className="ar-card-by">
                          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {report.createdBy || "N/A"}
                        </div>
                        <Link href={`/allreports/${report._id}`} className="ar-view-link">
                          VIEW
                          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}