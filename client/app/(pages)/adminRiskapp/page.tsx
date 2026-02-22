'use client'
import { useState } from "react"
import Header from '@/(components)/header/page'
import Footer from '@/(components)/footer/page'

export default function Admin() {
  const [appName, setAppName] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`http://localhost:5002/risk/do`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appName, websiteName, title, description })
      });
      const data = await res.json();
      if (res.ok) {
        setMessageType('success');
        setMessage("Risk submitted successfully!");
        setAppName('');
        setWebsiteName('');
        setTitle('');
        setDescription('');
      } else {
        setMessageType('error');
        setMessage(data.message || "Failed to submit risk.");
      }
    } catch (err) {
      setMessageType('error');
      setMessage("Error submitting risk.");
    }
    setLoading(false);
  }

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

        .top-glow {
          position: fixed;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(255,23,68,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .content-wrap {
          position: relative;
          z-index: 2;
        }

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

        /* ---- PAGE HERO ---- */
        .page-hero {
          padding: 56px 24px 48px;
          text-align: center;
          position: relative;
          border-bottom: 1px solid var(--cyan-border);
        }

        .page-hero::before {
          content: '';
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--red-alert), transparent);
        }

        .corner-tl, .corner-tr, .corner-bl, .corner-br {
          position: absolute;
          width: 16px; height: 16px;
        }
        .corner-tl { top: 20px; left: 20px; border-top: 1px solid var(--red-alert); border-left: 1px solid var(--red-alert); opacity: 0.6; }
        .corner-tr { top: 20px; right: 20px; border-top: 1px solid var(--red-alert); border-right: 1px solid var(--red-alert); opacity: 0.6; }
        .corner-bl { bottom: 20px; left: 20px; border-bottom: 1px solid var(--red-alert); border-left: 1px solid var(--red-alert); opacity: 0.6; }
        .corner-br { bottom: 20px; right: 20px; border-bottom: 1px solid var(--red-alert); border-right: 1px solid var(--red-alert); opacity: 0.6; }

        .page-eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.4em;
          color: var(--red-alert);
          text-transform: uppercase;
          margin-bottom: 14px;
          opacity: 0.85;
        }

        .page-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(32px, 6vw, 56px);
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--text-primary);
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .page-title span {
          color: var(--red-alert);
          text-shadow: 0 0 20px rgba(255,23,68,0.5);
        }

        .page-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px;
          color: var(--text-muted);
          letter-spacing: 0.15em;
        }

        /* ---- FORM CONTAINER ---- */
        .form-section {
          max-width: 680px;
          margin: 0 auto;
          padding: 56px 24px 80px;
        }

        .form-panel {
          background: var(--bg-card);
          border: 1px solid rgba(255,23,68,0.2);
          position: relative;
        }

        .form-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--red-alert), var(--amber), var(--red-alert));
          box-shadow: 0 0 16px rgba(255,23,68,0.5);
        }

        .form-panel-header {
          padding: 24px 32px 20px;
          border-bottom: 1px solid rgba(255,23,68,0.12);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .form-panel-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .form-panel-title::before {
          content: '';
          display: block;
          width: 3px;
          height: 18px;
          background: var(--red-alert);
          box-shadow: 0 0 8px var(--red-alert);
        }

        .panel-badge {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: var(--red-alert);
          border: 1px solid rgba(255,23,68,0.35);
          background: rgba(255,23,68,0.08);
          padding: 4px 10px;
          text-transform: uppercase;
        }

        .form-body {
          padding: 32px;
        }

        /* ---- FIELD ---- */
        .field-group {
          margin-bottom: 24px;
        }

        .field-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--cyan-dim);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .field-label::before {
          content: '▸';
          color: var(--red-alert);
          font-size: 10px;
        }

        .field-input, .field-textarea {
          width: 100%;
          background: rgba(0,229,255,0.03);
          border: 1px solid rgba(0,229,255,0.15);
          color: var(--text-primary);
          font-family: 'Exo 2', sans-serif;
          font-size: 14px;
          font-weight: 400;
          padding: 12px 16px;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          appearance: none;
          border-radius: 0;
        }

        .field-input::placeholder, .field-textarea::placeholder {
          color: #2e464f;
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.05em;
        }

        .field-input:focus, .field-textarea:focus {
          border-color: var(--cyan);
          background: rgba(0,229,255,0.06);
          box-shadow: 0 0 0 1px rgba(0,229,255,0.15), 0 0 20px rgba(0,229,255,0.05);
        }

        .field-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }

        /* Two-column row */
        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 560px) {
          .field-row { grid-template-columns: 1fr; }
          .form-body { padding: 24px 20px; }
          .form-panel-header { padding: 20px; }
        }

        /* ---- SUBMIT BUTTON ---- */
        .submit-btn {
          width: 100%;
          background: transparent;
          border: 1px solid var(--red-alert);
          color: var(--text-primary);
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          padding: 16px 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
          margin-top: 8px;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,23,68,0.08);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .submit-btn:hover:not(:disabled)::before {
          transform: scaleX(1);
        }

        .submit-btn:hover:not(:disabled) {
          box-shadow: 0 0 30px rgba(255,23,68,0.25), inset 0 0 20px rgba(255,23,68,0.05);
          color: #fff;
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          border-color: rgba(255,23,68,0.3);
        }

        .submit-btn .btn-icon {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
        }

        .submit-btn .btn-text {
          position: relative;
          z-index: 1;
        }

        /* Loading spinner */
        .btn-spinner {
          width: 16px; height: 16px;
          border: 1.5px solid rgba(255,23,68,0.3);
          border-top-color: var(--red-alert);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* ---- MESSAGE ---- */
        .message-box {
          margin-top: 20px;
          padding: 14px 20px;
          border: 1px solid;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
        }

        .message-box.success {
          border-color: rgba(0,230,118,0.35);
          background: rgba(0,230,118,0.06);
          color: var(--green-ok);
        }

        .message-box.error {
          border-color: rgba(255,23,68,0.35);
          background: rgba(255,23,68,0.06);
          color: var(--red-alert);
        }

        .msg-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .message-box.success .msg-dot { background: var(--green-ok); box-shadow: 0 0 6px var(--green-ok); }
        .message-box.error .msg-dot { background: var(--red-alert); box-shadow: 0 0 6px var(--red-alert); }

        /* ---- DIVIDER ---- */
        .field-divider {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, rgba(0,229,255,0.1), transparent);
          margin: 24px 0;
        }

        /* Footer info row */
        .form-footer-meta {
          padding: 16px 32px;
          border-top: 1px solid rgba(0,229,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }

        .meta-item {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: #263840;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .meta-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--cyan);
          opacity: 0.4;
        }

        @media (max-width: 560px) {
          .form-footer-meta { padding: 16px 20px; }
        }
      `}</style>

      <div className="vajra-bg">
        <div className="grid-overlay" />
        <div className="scanlines" />
        <div className="top-glow" />

        <div className="content-wrap">
          <div className="classification">⬛ CLASSIFIED — AUTHORIZED PERSONNEL ONLY ⬛</div>

          <Header />

          {/* Page Hero */}
          <div className="page-hero">
            <div className="corner-tl" /><div className="corner-tr" />
            <div className="corner-bl" /><div className="corner-br" />

            <div className="page-eyebrow">◈ ADMIN CONSOLE · THREAT SUBMISSION · SECURE CHANNEL</div>
            <h1 className="page-title">Report a <span>Risk</span></h1>
            <div className="page-sub">SUBMIT THREAT INTELLIGENCE TO COMMAND</div>
          </div>

          {/* Form */}
          <div className="form-section">
            <div className="form-panel">
              <div className="form-panel-header">
                <div className="form-panel-title">Threat Report</div>
                <div className="panel-badge">⬛ ADMIN ACCESS</div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-body">

                  {/* App Name + Website Name row */}
                  <div className="field-row">
                    <div className="field-group">
                      <div className="field-label">Application Name</div>
                      <input
                        className="field-input"
                        value={appName}
                        onChange={e => setAppName(e.target.value)}
                        placeholder="e.g. ThreatApp X"
                      />
                    </div>
                    <div className="field-group">
                      <div className="field-label">Website / Domain</div>
                      <input
                        className="field-input"
                        value={websiteName}
                        onChange={e => setWebsiteName(e.target.value)}
                        placeholder="e.g. target.io"
                      />
                    </div>
                  </div>

                  <hr className="field-divider" />

                  {/* Risk Title */}
                  <div className="field-group">
                    <div className="field-label">Risk Title</div>
                    <input
                      className="field-input"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Brief classification of the threat"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="field-group">
                    <div className="field-label">Risk Description</div>
                    <textarea
                      className="field-textarea"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Detailed threat assessment and intelligence report..."
                      required
                    />
                  </div>

                  {/* Submit */}
                  <button type="submit" className="submit-btn" disabled={loading}>
                    <span className="btn-icon">
                      {loading ? (
                        <span className="btn-spinner" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                      )}
                    </span>
                    <span className="btn-text">
                      {loading ? "Transmitting..." : "[ Submit Risk Report ]"}
                    </span>
                  </button>

                  {/* Message */}
                  {message && (
                    <div className={`message-box ${messageType}`}>
                      <div className="msg-dot" />
                      {message}
                    </div>
                  )}
                </div>

                <div className="form-footer-meta">
                  <div className="meta-item"><div className="meta-dot" />Encrypted Transmission</div>
                  <div className="meta-item"><div className="meta-dot" />Admin Authorized</div>
                  <div className="meta-item"><div className="meta-dot" />AES-256 Secured</div>
                </div>
              </form>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  )
}