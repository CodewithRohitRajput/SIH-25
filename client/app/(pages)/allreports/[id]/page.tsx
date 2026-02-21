'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/(components)/header/page";
import Footer from "@/(components)/footer/page";

const BACKEND_URL = "https://bbs11pr8-5002.inc1.devtunnels.ms";

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

export default function ReportDetail() {
  const params = useParams() as { id?: string };
  const id = params?.id;
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchReport = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/report/detail/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load report");
        const data = await res.json();
        const item = data.report || (data.reports && data.reports[0]) || null;
        setReport(item);
      } catch (err: any) {
        setError(err.message || "Error loading report");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  const status = report?.status || "pending";

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

        .rd-root {
          background: var(--bg-deep);
          min-height: 100vh;
          font-family: 'Exo 2', sans-serif;
          color: var(--text-primary);
          position: relative;
          overflow-x: hidden;
        }

        .rd-grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none; z-index: 0;
        }

        .rd-scanlines {
          position: fixed; inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px
          );
          pointer-events: none; z-index: 1;
        }

        .rd-content { position: relative; z-index: 2; }

        /* ---- MAIN LAYOUT ---- */
        .rd-main {
          max-width: 900px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }

        /* ---- BACK BUTTON ---- */
        .rd-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          background: transparent;
          border: 1px solid rgba(0,229,255,0.12);
          padding: 7px 16px;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 36px;
          text-decoration: none;
        }

        .rd-back:hover {
          color: var(--cyan);
          border-color: var(--cyan-border);
          background: var(--cyan-glow);
        }

        /* ---- STATES ---- */
        .rd-state {
          background: var(--bg-card);
          border: 1px solid rgba(0,229,255,0.08);
          padding: 64px 24px;
          text-align: center;
        }

        .rd-state-loader-ring {
          display: inline-block;
          width: 40px; height: 40px;
          border: 2px solid rgba(0,229,255,0.1);
          border-top-color: var(--cyan);
          border-radius: 50%;
          animation: rd-spin 0.8s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes rd-spin { to { transform: rotate(360deg); } }

        .rd-state-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; letter-spacing: 0.2em;
          color: var(--text-muted); text-transform: uppercase;
        }

        .rd-state.error { border-color: rgba(255,23,68,0.2); }
        .rd-state.error .rd-state-text { color: var(--red-alert); }

        /* ---- ARTICLE ---- */
        .rd-article {
          background: var(--bg-card);
          border: 1px solid rgba(0,229,255,0.1);
          position: relative;
          overflow: hidden;
        }

        /* Top accent bar */
        .rd-accent-bar {
          height: 3px;
        }
        .rd-accent-bar.pending { background: var(--amber); box-shadow: 0 0 12px var(--amber); }
        .rd-accent-bar.approved { background: var(--green-ok); box-shadow: 0 0 12px var(--green-ok); }
        .rd-accent-bar.rejected { background: var(--red-alert); box-shadow: 0 0 12px var(--red-alert); }

        /* Left border accent */
        .rd-article::before {
          content: '';
          position: absolute;
          top: 3px; left: 0; bottom: 0;
          width: 3px;
        }
        .rd-article.s-pending::before { background: var(--amber); }
        .rd-article.s-approved::before { background: var(--green-ok); }
        .rd-article.s-rejected::before { background: var(--red-alert); }

        /* ---- HEADER ---- */
        .rd-header {
          padding: 32px 32px 28px 36px;
          border-bottom: 1px solid rgba(0,229,255,0.07);
        }

        .rd-report-id {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.35em;
          color: var(--text-muted); text-transform: uppercase;
          margin-bottom: 12px;
          display: flex; align-items: center; gap: 8px;
        }

        .rd-report-id::before {
          content: '◈';
          color: var(--cyan); font-size: 8px;
        }

        .rd-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 700; letter-spacing: 0.08em;
          color: var(--text-primary); line-height: 1.15;
          margin-bottom: 20px;
        }

        .rd-meta-row {
          display: flex; align-items: center; gap: 16px;
          flex-wrap: wrap;
        }

        .rd-badge {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
          padding: 5px 12px; border: 1px solid;
          display: flex; align-items: center; gap: 6px;
        }

        .rd-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          animation: rd-pulse 2s infinite;
        }

        @keyframes rd-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        .rd-badge.pending {
          color: var(--amber); border-color: rgba(255,171,0,0.35);
          background: rgba(255,171,0,0.07);
        }
        .rd-badge.pending .rd-badge-dot { background: var(--amber); box-shadow: 0 0 5px var(--amber); }

        .rd-badge.approved {
          color: var(--green-ok); border-color: rgba(0,230,118,0.35);
          background: rgba(0,230,118,0.07);
        }
        .rd-badge.approved .rd-badge-dot { background: var(--green-ok); box-shadow: 0 0 5px var(--green-ok); }

        .rd-badge.rejected {
          color: var(--red-alert); border-color: rgba(255,23,68,0.35);
          background: rgba(255,23,68,0.07);
        }
        .rd-badge.rejected .rd-badge-dot { background: var(--red-alert); box-shadow: 0 0 5px var(--red-alert); }

        .rd-meta-sep {
          width: 1px; height: 14px;
          background: rgba(0,229,255,0.12);
        }

        .rd-meta-item {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.1em;
          color: var(--text-muted);
          display: flex; align-items: center; gap: 6px;
        }

        .rd-meta-item svg { color: var(--cyan-dim); flex-shrink: 0; }

        /* ---- BODY SECTIONS ---- */
        .rd-body { padding: 32px 32px 28px 36px; }

        .rd-section { margin-bottom: 32px; }
        .rd-section:last-child { margin-bottom: 0; }

        .rd-section-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
          color: var(--cyan-dim); margin-bottom: 12px;
          display: flex; align-items: center; gap: 8px;
        }

        .rd-section-label::after {
          content: '';
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(0,229,255,0.15), transparent);
        }

        .rd-description {
          font-size: 15px; color: #78909c;
          line-height: 1.75; font-weight: 300;
          background: var(--bg-panel);
          border: 1px solid rgba(0,229,255,0.07);
          border-left: 2px solid var(--cyan-border);
          padding: 20px 24px;
        }

        /* ---- DETAILS GRID ---- */
        .rd-details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          background: rgba(0,229,255,0.08);
          border: 1px solid rgba(0,229,255,0.08);
        }

        @media (max-width: 540px) { .rd-details-grid { grid-template-columns: 1fr; } }

        .rd-detail-cell {
          background: var(--bg-panel);
          padding: 20px 24px;
        }

        .rd-detail-key {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 8px;
        }

        .rd-detail-val {
          font-family: 'Rajdhani', sans-serif;
          font-size: 18px; font-weight: 600;
          letter-spacing: 0.06em; color: var(--text-primary);
        }

        .rd-detail-val.empty { color: #2e4650; font-weight: 400; font-size: 14px; }

        /* ---- FOOTER ---- */
        .rd-footer {
          padding: 16px 32px 20px 36px;
          border-top: 1px solid rgba(0,229,255,0.06);
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; flex-wrap: wrap;
          background: var(--bg-panel);
        }

        .rd-footer-id {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.2em;
          color: #1c2f35; text-transform: uppercase;
        }

        .rd-footer-date {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.12em;
          color: var(--text-muted);
          display: flex; align-items: center; gap: 6px;
        }
      `}</style>

      <div className="rd-root">
        <div className="rd-grid-bg" />
        <div className="rd-scanlines" />

        <div className="rd-content">
          <Header />

          <main className="rd-main">
            {/* Back */}
            <button className="rd-back" onClick={() => router.back()}>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              BACK TO REPORTS
            </button>

            {/* Loading */}
            {loading && (
              <div className="rd-state">
                <div className="rd-state-loader-ring" />
                <div className="rd-state-text">Retrieving report data...</div>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="rd-state error">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75} style={{ color: 'rgba(255,23,68,0.3)', marginBottom: 16 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="rd-state-text">{error}</div>
              </div>
            )}

            {/* Not found */}
            {!loading && !error && !report && (
              <div className="rd-state">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75} style={{ color: 'rgba(0,229,255,0.15)', marginBottom: 16 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="rd-state-text">Report not found</div>
              </div>
            )}

            {/* Report */}
            {!loading && !error && report && (
              <article className={`rd-article s-${status}`}>
                <div className={`rd-accent-bar ${status}`} />

                {/* Header */}
                <div className="rd-header">
                  <div className="rd-report-id">
                    REPORT ID · {report._id || '—'}
                  </div>
                  <h1 className="rd-title">{report.title}</h1>
                  <div className="rd-meta-row">
                    <div className={`rd-badge ${status}`}>
                      <div className="rd-badge-dot" />
                      {status.toUpperCase()}
                    </div>
                    <div className="rd-meta-sep" />
                    <div className="rd-meta-item">
                      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {report.createdBy || 'N/A'}
                    </div>
                    {report.createdAt && (
                      <>
                        <div className="rd-meta-sep" />
                        <div className="rd-meta-item">
                          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(report.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'short', day: '2-digit'
                          }).toUpperCase()}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="rd-body">
                  {/* Description */}
                  <div className="rd-section">
                    <div className="rd-section-label">Field Description</div>
                    <div className="rd-description">
                      {report.description || '—'}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="rd-section">
                    <div className="rd-section-label">Operational Details</div>
                    <div className="rd-details-grid">
                      <div className="rd-detail-cell">
                        <div className="rd-detail-key">Category</div>
                        <div className={`rd-detail-val${!report.category ? ' empty' : ''}`}>
                          {report.category || 'Not specified'}
                        </div>
                      </div>
                      <div className="rd-detail-cell">
                        <div className="rd-detail-key">Location</div>
                        <div className={`rd-detail-val${!report.location ? ' empty' : ''}`}>
                          {report.location ? `⬡ ${report.location}` : 'Not specified'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="rd-footer">
                  <div className="rd-footer-id">
                    REF: VAJRA-{report._id?.slice(-8).toUpperCase() || 'UNKNOWN'}
                  </div>
                  <div className="rd-footer-date">
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    LOGGED {report.createdAt
                      ? new Date(report.createdAt).toLocaleString('en-US', {
                          year: 'numeric', month: 'short', day: '2-digit',
                          hour: '2-digit', minute: '2-digit'
                        }).toUpperCase()
                      : '—'}
                  </div>
                </div>
              </article>
            )}
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}