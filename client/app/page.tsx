'use client'

import { useState, useEffect } from "react"
import Header from '../(components)/header/page'
import Footer from "@/(components)/footer/page";

export default function Home() {
  const [reports, setReports] = useState([]);
  const [riskApps, setRiskApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [riskLoading, setRiskLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  const backendUrl = "http://localhost:5002";

  const getReports = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${backendUrl}/report/get`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setReports(data.reports || []);
        const total = data.reports.length;
        const pending = data.reports.filter((r: any) => r.status === "pending").length;
        const rejected = data.reports.filter((r: any) => r.status === "rejected").length;
        setStats(prevStats => ({ ...prevStats, total, pending, rejected }));
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskApps = async () => {
    try {
      setRiskLoading(true);
      const res = await fetch(`${backendUrl}/risk/get`, {
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();
      setRiskApps(data.data || []);
      const approved = data.data.length;
      setStats(prevStats => ({ ...prevStats, approved }));
    } catch (err) {
      console.error("Error fetching risk applications:", err);
    } finally {
      setRiskLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    getReports();
    getRiskApps();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&family=Exo+2:wght@300;400;600;800&display=swap');

        :root {
          --cyan: #00e5ff;
          --cyan-dim: #00b8cc;
          --cyan-glow: rgba(0,229,255,0.15);
          --cyan-border: rgba(0,229,255,0.3);
          --bg-deep: #020c10;
          --bg-panel: #040f14;
          --bg-card: #061318;
          --text-primary: #e0f7fa;
          --text-muted: #546e7a;
          --red-alert: #ff1744;
          --amber: #ffab00;
          --green-ok: #00e676;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--bg-deep);
          color: var(--text-primary);
          font-family: 'Exo 2', sans-serif;
        }

        .vajra-bg {
          background: var(--bg-deep);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Animated grid background */
        .grid-overlay {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        /* Scanline effect */
        .scanlines {
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.08) 2px,
            rgba(0,0,0,0.08) 4px
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Radial glow top */
        .top-glow {
          position: fixed;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(0,229,255,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .content-wrap {
          position: relative;
          z-index: 2;
        }

        /* ---- HERO ---- */
        .hero {
          padding: 80px 24px 60px;
          text-align: center;
          position: relative;
          border-bottom: 1px solid var(--cyan-border);
        }

        .hero::before {
          content: '';
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
        }

        .hero-eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.4em;
          color: var(--cyan);
          text-transform: uppercase;
          margin-bottom: 16px;
          opacity: 0.8;
        }

        .hero-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(52px, 10vw, 96px);
          font-weight: 700;
          letter-spacing: 0.12em;
          line-height: 1;
          color: transparent;
          background: linear-gradient(135deg, #ffffff 0%, var(--cyan) 50%, #80deea 100%);
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow: none;
          position: relative;
        }

        .hero-title::after {
          content: 'VAJRA';
          position: absolute;
          inset: 0;
          color: var(--cyan);
          filter: blur(20px);
          opacity: 0.3;
          -webkit-background-clip: unset;
          background-clip: unset;
          -webkit-text-fill-color: var(--cyan);
          pointer-events: none;
        }

        .hero-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          color: var(--text-muted);
          letter-spacing: 0.15em;
          margin-top: 8px;
          margin-bottom: 24px;
        }

        .hero-desc {
          font-size: 15px;
          color: #78909c;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 300;
        }

        .status-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin-top: 28px;
          flex-wrap: wrap;
        }

        .status-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--cyan-dim);
          padding: 6px 14px;
          border: 1px solid var(--cyan-border);
          background: var(--cyan-glow);
          border-radius: 2px;
        }

        .status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--green-ok);
          box-shadow: 0 0 6px var(--green-ok);
          animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* ---- STATS ---- */
        .section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          background: var(--cyan-border);
          border: 1px solid var(--cyan-border);
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .stat-card {
          background: var(--bg-panel);
          padding: 32px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: background 0.2s;
        }

        .stat-card:hover {
          background: #061a22;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
        }

        .stat-card.cyan::before { background: var(--cyan); box-shadow: 0 0 12px var(--cyan); }
        .stat-card.amber::before { background: var(--amber); box-shadow: 0 0 12px var(--amber); }
        .stat-card.green::before { background: var(--green-ok); box-shadow: 0 0 12px var(--green-ok); }
        .stat-card.red::before { background: var(--red-alert); box-shadow: 0 0 12px var(--red-alert); }

        .stat-num {
          font-family: 'Rajdhani', sans-serif;
          font-size: 52px;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 8px;
        }

        .stat-card.cyan .stat-num { color: var(--cyan); text-shadow: 0 0 20px rgba(0,229,255,0.5); }
        .stat-card.amber .stat-num { color: var(--amber); text-shadow: 0 0 20px rgba(255,171,0,0.5); }
        .stat-card.green .stat-num { color: var(--green-ok); text-shadow: 0 0 20px rgba(0,230,118,0.5); }
        .stat-card.red .stat-num { color: var(--red-alert); text-shadow: 0 0 20px rgba(255,23,68,0.4); }

        .stat-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        /* ---- SECTION HEADER ---- */
        .sec-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-top: 56px;
        }

        .sec-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sec-title::before {
          content: '';
          display: block;
          width: 3px;
          height: 22px;
          background: var(--cyan);
          box-shadow: 0 0 8px var(--cyan);
        }

        .sec-link {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          color: var(--cyan);
          text-decoration: none;
          border: 1px solid var(--cyan-border);
          padding: 6px 14px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .sec-link:hover {
          background: var(--cyan-glow);
          box-shadow: 0 0 16px rgba(0,229,255,0.1);
        }

        /* ---- QUICK ACTIONS ---- */
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: var(--cyan-border);
          border: 1px solid var(--cyan-border);
        }

        @media (max-width: 768px) {
          .actions-grid { grid-template-columns: 1fr; }
        }

        .action-card {
          background: var(--bg-card);
          padding: 36px 28px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
          position: relative;
          overflow: hidden;
          transition: background 0.25s;
          group: true;
        }

        .action-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, var(--cyan), transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .action-card:hover { background: #071820; }
        .action-card:hover::after { transform: scaleX(1); }

        .action-icon {
          width: 44px; height: 44px;
          border: 1px solid var(--cyan-border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: var(--cyan);
          background: var(--cyan-glow);
          transition: box-shadow 0.25s;
        }

        .action-card:hover .action-icon {
          box-shadow: 0 0 20px rgba(0,229,255,0.2);
        }

        .action-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-primary);
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .action-desc {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.5;
          font-weight: 300;
        }

        .action-arrow {
          margin-top: auto;
          padding-top: 20px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          color: var(--cyan);
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.25s;
        }

        .action-card:hover .action-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ---- CARDS ---- */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        @media (max-width: 1024px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .cards-grid { grid-template-columns: 1fr; }
        }

        .data-card {
          background: var(--bg-card);
          border: 1px solid rgba(0,229,255,0.1);
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s, transform 0.25s;
        }

        .data-card:hover {
          border-color: rgba(0,229,255,0.3);
          transform: translateY(-2px);
        }

        .data-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 100%;
        }

        .data-card.risk::before { background: var(--red-alert); box-shadow: 0 0 8px var(--red-alert); }
        .data-card.pending::before { background: var(--amber); }
        .data-card.approved::before { background: var(--green-ok); }
        .data-card.rejected::before { background: var(--red-alert); }
        .data-card.default::before { background: var(--cyan); }

        .card-body {
          padding: 20px 20px 16px 24px;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .card-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          flex: 1;
          margin-right: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .badge {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 4px 10px;
          border: 1px solid;
          flex-shrink: 0;
        }

        .badge.risk { color: var(--red-alert); border-color: rgba(255,23,68,0.4); background: rgba(255,23,68,0.08); }
        .badge.pending { color: var(--amber); border-color: rgba(255,171,0,0.4); background: rgba(255,171,0,0.08); }
        .badge.approved { color: var(--green-ok); border-color: rgba(0,230,118,0.4); background: rgba(0,230,118,0.08); }
        .badge.rejected { color: var(--red-alert); border-color: rgba(255,23,68,0.4); background: rgba(255,23,68,0.08); }

        .card-meta {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          color: var(--text-muted);
          margin-bottom: 8px;
          letter-spacing: 0.05em;
        }

        .card-desc {
          font-size: 13px;
          color: #546e7a;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer {
          padding: 10px 20px 10px 24px;
          border-top: 1px solid rgba(0,229,255,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-date {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: #37474f;
        }

        .card-tags {
          display: flex;
          gap: 8px;
        }

        .tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          color: rgba(0,229,255,0.5);
          text-transform: uppercase;
        }

        /* ---- EMPTY STATE ---- */
        .empty {
          border: 1px dashed rgba(0,229,255,0.15);
          padding: 64px 24px;
          text-align: center;
          background: var(--bg-card);
        }

        .empty-icon {
          color: rgba(0,229,255,0.15);
          margin-bottom: 16px;
        }

        .empty-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #37474f;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .empty-sub {
          font-size: 13px;
          color: #263238;
          margin-bottom: 24px;
        }

        .empty-cta {
          display: inline-block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--cyan);
          border: 1px solid var(--cyan-border);
          padding: 10px 24px;
          text-decoration: none;
          transition: all 0.2s;
          text-transform: uppercase;
        }

        .empty-cta:hover { background: var(--cyan-glow); box-shadow: 0 0 20px rgba(0,229,255,0.1); }

        /* ---- LOADING ---- */
        .loader {
          padding: 64px 24px;
          text-align: center;
          background: var(--bg-card);
          border: 1px solid rgba(0,229,255,0.08);
        }

        .loader-ring {
          display: inline-block;
          width: 40px; height: 40px;
          border: 2px solid rgba(0,229,255,0.1);
          border-top-color: var(--cyan);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .loader-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        /* ---- AI BUTTON ---- */
        .ai-btn {
          position: fixed;
          bottom: 32px; right: 32px;
          z-index: 999;
          background: transparent;
          border: 1px solid var(--cyan);
          color: var(--cyan);
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 14px 24px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.25s;
          box-shadow: 0 0 20px rgba(0,229,255,0.1), inset 0 0 20px rgba(0,229,255,0.03);
          backdrop-filter: blur(8px);
          background: rgba(2,12,16,0.85);
        }

        .ai-btn:hover {
          background: rgba(0,229,255,0.08);
          box-shadow: 0 0 40px rgba(0,229,255,0.2), inset 0 0 30px rgba(0,229,255,0.05);
          transform: translateY(-2px);
        }

        .ai-btn-dot {
          width: 6px; height: 6px;
          background: var(--cyan);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--cyan);
          animation: pulse-dot 1.5s infinite;
        }

        /* ---- DIVIDER ---- */
        .divider {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan-border), transparent);
          margin: 0 24px;
        }

        .pb-16 { padding-bottom: 64px; }

        /* Corner decorations on hero */
        .corner-tl, .corner-tr, .corner-bl, .corner-br {
          position: absolute;
          width: 16px; height: 16px;
        }
        .corner-tl { top: 20px; left: 20px; border-top: 1px solid var(--cyan); border-left: 1px solid var(--cyan); }
        .corner-tr { top: 20px; right: 20px; border-top: 1px solid var(--cyan); border-right: 1px solid var(--cyan); }
        .corner-bl { bottom: 20px; left: 20px; border-bottom: 1px solid var(--cyan); border-left: 1px solid var(--cyan); }
        .corner-br { bottom: 20px; right: 20px; border-bottom: 1px solid var(--cyan); border-right: 1px solid var(--cyan); }

        .classification {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.4em;
          color: var(--red-alert);
          text-transform: uppercase;
          opacity: 0.7;
          text-align: center;
          padding: 8px;
          border-bottom: 1px solid rgba(255,23,68,0.1);
          background: rgba(255,23,68,0.03);
        }
      `}</style>

      <div className="vajra-bg">
        <div className="grid-overlay" />
        <div className="scanlines" />
        <div className="top-glow" />

        <div className="content-wrap">
          <div className="classification">⬛ CLASSIFIED — AUTHORIZED PERSONNEL ONLY ⬛</div>

          <Header />

          {/* Hero */}
          <div className="hero">
            <div className="corner-tl" /><div className="corner-tr" />
            <div className="corner-bl" /><div className="corner-br" />

            <div className="hero-eyebrow">◈ VAJRA COMMAND SYSTEM · v3.7.1 · SECURE CHANNEL</div>
            <h1 className="hero-title">VAJRA</h1>
            <div className="hero-sub">JOINT OPERATIONS INTELLIGENCE PORTAL</div>
            <p className="hero-desc">
              Secure platform for army personnel to submit, track, and manage operational reports with real-time threat intelligence.
            </p>

            <div className="status-bar">
              <div className="status-pill"><div className="status-dot" />SYSTEM ONLINE</div>
              <div className="status-pill"><div className="status-dot" />ENCRYPTION: AES-256</div>
              <div className="status-pill"><div className="status-dot" />CHANNEL SECURE</div>
            </div>
          </div>

          {/* Stats */}
          <div className="section">
            <div className="stats-grid">
              <div className="stat-card cyan">
                <div className="stat-num">{stats.total}</div>
                <div className="stat-label">Total Reports</div>
              </div>
              <div className="stat-card amber">
                <div className="stat-num">{stats.pending}</div>
                <div className="stat-label">Awaiting Review</div>
              </div>
              <div className="stat-card green">
                <div className="stat-num">{stats.approved}</div>
                <div className="stat-label">Risked Assets</div>
              </div>
              <div className="stat-card red">
                <div className="stat-num">{stats.rejected}</div>
                <div className="stat-label">Rejected</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="section">
            <div className="sec-header">
              <div className="sec-title">Tactical Actions</div>
            </div>
            <div className="actions-grid">
              <a href="/report" className="action-card">
                <div className="action-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="action-title">Submit Report</div>
                <div className="action-desc">Create and submit a new operational field report to command.</div>
                <div className="action-arrow">[ INITIATE → ]</div>
              </a>
              <a href="/resources" className="action-card">
                <div className="action-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="action-title">Resources</div>
                <div className="action-desc">Access classified military manuals and field documentation.</div>
                <div className="action-arrow">[ ACCESS → ]</div>
              </a>
              <a href="/profile" className="action-card">
                <div className="action-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="action-title">My Profile</div>
                <div className="action-desc">View personnel file and update authorization credentials.</div>
                <div className="action-arrow">[ VIEW → ]</div>
              </a>
            </div>
          </div>

          <hr className="divider" style={{ marginTop: '48px' }} />

          {/* Risk Applications */}
          <div className="section">
            <div className="sec-header">
              <div className="sec-title">Risk Intelligence</div>
              <a href="/risk" className="sec-link">
                VIEW ALL
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {riskLoading ? (
              <div className="loader">
                <div className="loader-ring" />
                <div className="loader-text">Scanning threat database...</div>
              </div>
            ) : riskApps.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="empty-title">No Threats Detected</div>
                <div className="empty-sub">No risky applications have been flagged.</div>
              </div>
            ) : (
              <div className="cards-grid">
                {riskApps.slice(0, 6).map((risk: any, idx: number) => (
                  <div key={risk._id || idx} className="data-card risk">
                    <div className="card-body">
                      <div className="card-top">
                        <div className="card-title">{risk.appName}</div>
                        <div className="badge risk">RISK</div>
                      </div>
                      <div className="card-meta">⬡ {risk.websiteName}</div>
                      <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '15px', fontWeight: 600, color: '#eceff1', marginBottom: '8px', letterSpacing: '0.03em' }}>{risk.title}</div>
                      <div className="card-desc">{risk.description}</div>
                    </div>
                    <div className="card-footer">
                      <div className="card-date">
                        LOGGED {new Date(risk.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <hr className="divider" style={{ marginTop: '48px' }} />

          {/* Reports */}
          <div className="section pb-16">
            <div className="sec-header">
              <div className="sec-title">Recent Reports</div>
              <a href="/allreports" className="sec-link">
                VIEW ALL
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {isLoading ? (
              <div className="loader">
                <div className="loader-ring" />
                <div className="loader-text">Retrieving field reports...</div>
              </div>
            ) : reports.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="empty-title">No Reports On File</div>
                <div className="empty-sub">No operational reports have been submitted.</div>
                <a href="/report" className="empty-cta">Submit First Report →</a>
              </div>
            ) : (
              <div className="cards-grid">
                {reports.slice(0, 6).map((report: any, idx: number) => {
                  const statusClass = report.status === "approved" ? "approved" : report.status === "rejected" ? "rejected" : "pending";
                  return (
                    <div key={report._id || idx} className={`data-card ${statusClass}`}>
                      <div className="card-body">
                        <div className="card-top">
                          <div className="card-title">{report.title}</div>
                          <div className={`badge ${statusClass}`}>{report.status?.toUpperCase()}</div>
                        </div>
                        <div className="card-desc">{report.description}</div>
                      </div>
                      <div className="card-footer">
                        <div className="card-date">
                          {new Date(report.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase()}
                        </div>
                        <div className="card-tags">
                          {report.category && <span className="tag">{report.category}</span>}
                          {report.location && <span className="tag">⬡ {report.location}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <Footer />
        </div>

        {/* AI Button */}
        <a href="/chatbotAI" className="ai-btn">
          <div className="ai-btn-dot" />
          TACTICAL AI
        </a>
      </div>
    </>
  )
}