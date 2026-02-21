'use client'

import { useState, useEffect } from "react"
import Header from '@/(components)/header/page'
import Footer from "@/(components)/footer/page"

export default function AdminPortal() {
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    riskApps: 0,
    totalUsers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats({
          totalReports: 42,
          pendingReports: 8,
          riskApps: 15,
          totalUsers: 27
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };
    fetchStats();
  }, []);

  const actions = [
    {
      href: "/adminRiskapp",
      label: "Post Risk Application",
      desc: "Add a new risky application to the threat database",
      cta: "Manage Risks",
      color: "red",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      href: "/report",
      label: "Create Report",
      desc: "Submit a new operational or incident field report",
      cta: "New Report",
      color: "cyan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      href: "/pending-requests",
      label: "Pending Requests",
      desc: "Review and approve pending report submissions",
      cta: "View Requests",
      color: "amber",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      href: "/user-management",
      label: "User Management",
      desc: "Manage personnel accounts and access permissions",
      cta: "Manage Users",
      color: "cyan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      href: "/analytics",
      label: "System Analytics",
      desc: "View system usage statistics and performance metrics",
      cta: "View Analytics",
      color: "amber",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      href: "/admin-settings",
      label: "System Settings",
      desc: "Configure system preferences and portal options",
      cta: "Configure",
      color: "cyan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&family=Exo+2:wght@300;400;600;800&display=swap');

        :root {
          --cyan: #00e5ff;
          --cyan-dim: #00b8cc;
          --cyan-glow: rgba(0,229,255,0.12);
          --cyan-border: rgba(0,229,255,0.25);
          --bg-deep: #020c10;
          --bg-panel: #040f14;
          --bg-card: #061318;
          --text-primary: #e0f7fa;
          --text-muted: #546e7a;
          --red-alert: #ff1744;
          --amber: #ffab00;
          --green-ok: #00e676;
        }

        .adm-root {
          background: var(--bg-deep);
          min-height: 100vh;
          font-family: 'Exo 2', sans-serif;
          color: var(--text-primary);
          position: relative;
          overflow-x: hidden;
        }

        .adm-grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        .adm-scanlines {
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.07) 2px,
            rgba(0,0,0,0.07) 4px
          );
          pointer-events: none;
          z-index: 1;
        }

        .adm-content {
          position: relative;
          z-index: 2;
        }

        /* ---- HERO ---- */
        .adm-hero {
          padding: 64px 24px 52px;
          text-align: center;
          border-bottom: 1px solid var(--cyan-border);
          position: relative;
        }

        .adm-hero::before {
          content: '';
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 500px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
        }

        /* Corner marks */
        .adm-corner {
          position: absolute;
          width: 14px; height: 14px;
        }
        .adm-corner.tl { top: 18px; left: 18px; border-top: 1px solid var(--red-alert); border-left: 1px solid var(--red-alert); }
        .adm-corner.tr { top: 18px; right: 18px; border-top: 1px solid var(--red-alert); border-right: 1px solid var(--red-alert); }
        .adm-corner.bl { bottom: 18px; left: 18px; border-bottom: 1px solid var(--red-alert); border-left: 1px solid var(--red-alert); }
        .adm-corner.br { bottom: 18px; right: 18px; border-bottom: 1px solid var(--red-alert); border-right: 1px solid var(--red-alert); }

        .adm-eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.4em;
          color: var(--red-alert);
          text-transform: uppercase;
          margin-bottom: 16px;
          opacity: 0.8;
        }

        .adm-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(40px, 8vw, 72px);
          font-weight: 700;
          letter-spacing: 0.15em;
          line-height: 1;
          color: transparent;
          background: linear-gradient(135deg, #ffffff 0%, var(--cyan) 60%, #80deea 100%);
          -webkit-background-clip: text;
          background-clip: text;
        }

        .adm-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px;
          color: var(--text-muted);
          letter-spacing: 0.2em;
          margin-top: 8px;
          margin-bottom: 24px;
        }

        .adm-badges {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .adm-badge {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--text-muted);
          padding: 5px 12px;
          border: 1px solid rgba(255,23,68,0.2);
          background: rgba(255,23,68,0.04);
        }

        .adm-badge-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--red-alert);
          box-shadow: 0 0 6px var(--red-alert);
          animation: adm-pulse 2s infinite;
        }

        @keyframes adm-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* ---- STATS ---- */
        .adm-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px 0;
        }

        .adm-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          background: var(--cyan-border);
          border: 1px solid var(--cyan-border);
        }

        @media (max-width: 768px) { .adm-stats { grid-template-columns: repeat(2, 1fr); } }

        .adm-stat {
          background: var(--bg-panel);
          padding: 28px 20px;
          text-align: center;
          position: relative;
          transition: background 0.2s;
        }

        .adm-stat:hover { background: #061a22; }

        .adm-stat::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
        }

        .adm-stat.s-cyan::before { background: var(--cyan); box-shadow: 0 0 10px var(--cyan); }
        .adm-stat.s-amber::before { background: var(--amber); box-shadow: 0 0 10px var(--amber); }
        .adm-stat.s-red::before { background: var(--red-alert); box-shadow: 0 0 10px var(--red-alert); }
        .adm-stat.s-green::before { background: var(--green-ok); box-shadow: 0 0 10px var(--green-ok); }

        .adm-stat-num {
          font-family: 'Rajdhani', sans-serif;
          font-size: 46px;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 6px;
        }

        .adm-stat.s-cyan .adm-stat-num { color: var(--cyan); text-shadow: 0 0 20px rgba(0,229,255,0.4); }
        .adm-stat.s-amber .adm-stat-num { color: var(--amber); text-shadow: 0 0 20px rgba(255,171,0,0.4); }
        .adm-stat.s-red .adm-stat-num { color: var(--red-alert); text-shadow: 0 0 20px rgba(255,23,68,0.35); }
        .adm-stat.s-green .adm-stat-num { color: var(--green-ok); text-shadow: 0 0 20px rgba(0,230,118,0.4); }

        .adm-stat-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        /* ---- SECTION HEADER ---- */
        .adm-sec-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-top: 52px;
        }

        .adm-sec-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .adm-sec-title::before {
          content: '';
          display: block;
          width: 3px; height: 20px;
          background: var(--red-alert);
          box-shadow: 0 0 8px var(--red-alert);
        }

        /* ---- ACTION CARDS ---- */
        .adm-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: var(--cyan-border);
          border: 1px solid var(--cyan-border);
        }

        @media (max-width: 900px) { .adm-actions { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px) { .adm-actions { grid-template-columns: 1fr; } }

        .adm-action {
          background: var(--bg-card);
          padding: 32px 28px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          overflow: hidden;
          transition: background 0.25s;
        }

        .adm-action:hover { background: #071820; }

        .adm-action::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s;
        }

        .adm-action.c-cyan::after { background: linear-gradient(90deg, var(--cyan), transparent); }
        .adm-action.c-red::after { background: linear-gradient(90deg, var(--red-alert), transparent); }
        .adm-action.c-amber::after { background: linear-gradient(90deg, var(--amber), transparent); }

        .adm-action:hover::after { transform: scaleX(1); }

        .adm-action-icon {
          width: 44px; height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid;
          margin-bottom: 20px;
          transition: box-shadow 0.25s;
        }

        .adm-action.c-cyan .adm-action-icon {
          color: var(--cyan);
          border-color: var(--cyan-border);
          background: var(--cyan-glow);
        }

        .adm-action.c-red .adm-action-icon {
          color: var(--red-alert);
          border-color: rgba(255,23,68,0.3);
          background: rgba(255,23,68,0.06);
        }

        .adm-action.c-amber .adm-action-icon {
          color: var(--amber);
          border-color: rgba(255,171,0,0.3);
          background: rgba(255,171,0,0.06);
        }

        .adm-action:hover .adm-action-icon {
          box-shadow: 0 0 20px rgba(0,229,255,0.15);
        }

        .adm-action.c-red:hover .adm-action-icon { box-shadow: 0 0 20px rgba(255,23,68,0.2); }
        .adm-action.c-amber:hover .adm-action-icon { box-shadow: 0 0 20px rgba(255,171,0,0.2); }

        .adm-action-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .adm-action-desc {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.5;
          font-weight: 300;
          flex: 1;
        }

        .adm-action-cta {
          margin-top: 20px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.25s;
        }

        .adm-action.c-cyan .adm-action-cta { color: var(--cyan); }
        .adm-action.c-red .adm-action-cta { color: var(--red-alert); }
        .adm-action.c-amber .adm-action-cta { color: var(--amber); }

        .adm-action:hover .adm-action-cta {
          opacity: 1;
          transform: translateX(0);
        }

        /* ---- ACTIVITY PANEL ---- */
        .adm-activity {
          background: var(--bg-card);
          border: 1px solid rgba(0,229,255,0.1);
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          text-align: center;
        }

        .adm-activity-icon {
          color: rgba(0,229,255,0.12);
        }

        .adm-activity-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #263238;
        }

        .adm-activity-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: #1c2f35;
        }

        .adm-divider {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan-border), transparent);
          margin: 0 24px;
        }

        .adm-pb { padding-bottom: 64px; }
      `}</style>

      <div className="adm-root">
        <div className="adm-grid-bg" />
        <div className="adm-scanlines" />

        <div className="adm-content">
          <Header />

          {/* Hero */}
          <div className="adm-hero">
            <div className="adm-corner tl" /><div className="adm-corner tr" />
            <div className="adm-corner bl" /><div className="adm-corner br" />

            <div className="adm-eyebrow">⬛ RESTRICTED ACCESS · ADMIN CLEARANCE REQUIRED ⬛</div>
            <h1 className="adm-title">ADMIN PORTAL</h1>
            <div className="adm-sub">VAJRA COMMAND — SYSTEM ADMINISTRATION CONSOLE</div>

            <div className="adm-badges">
              <div className="adm-badge"><div className="adm-badge-dot" />ELEVATED PRIVILEGES ACTIVE</div>
              <div className="adm-badge"><div className="adm-badge-dot" />AUDIT LOGGING: ON</div>
              <div className="adm-badge"><div className="adm-badge-dot" />SESSION MONITORED</div>
            </div>
          </div>

          {/* Stats */}
          <div className="adm-section">
            <div className="adm-stats">
              <div className="adm-stat s-cyan">
                <div className="adm-stat-num">{stats.totalReports}</div>
                <div className="adm-stat-label">Total Reports</div>
              </div>
              <div className="adm-stat s-amber">
                <div className="adm-stat-num">{stats.pendingReports}</div>
                <div className="adm-stat-label">Awaiting Review</div>
              </div>
              <div className="adm-stat s-red">
                <div className="adm-stat-num">{stats.riskApps}</div>
                <div className="adm-stat-label">Risk Applications</div>
              </div>
              <div className="adm-stat s-green">
                <div className="adm-stat-num">{stats.totalUsers}</div>
                <div className="adm-stat-label">Active Personnel</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="adm-section">
            <div className="adm-sec-head">
              <div className="adm-sec-title">Administrative Actions</div>
            </div>
            <div className="adm-actions">
              {actions.map((a) => (
                <a key={a.href} href={a.href} className={`adm-action c-${a.color}`}>
                  <div className="adm-action-icon">{a.icon}</div>
                  <div className="adm-action-title">{a.label}</div>
                  <div className="adm-action-desc">{a.desc}</div>
                  <div className="adm-action-cta">[ {a.cta} → ]</div>
                </a>
              ))}
            </div>
          </div>

          <hr className="adm-divider" style={{ marginTop: '48px' }} />

          {/* Activity Feed */}
          <div className="adm-section adm-pb">
            <div className="adm-sec-head">
              <div className="adm-sec-title">Recent Activity</div>
            </div>
            <div className="adm-activity">
              <div className="adm-activity-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="adm-activity-title">No Activity Logged</div>
              <div className="adm-activity-sub">Activity feed will populate as operations are performed</div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  )
}