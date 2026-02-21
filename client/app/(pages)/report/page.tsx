"use client";

import React, { useState } from "react";
import Header from '../../../(components)/header/page';
import Footer from '../../../(components)/footer/page';

const BACKEND_URL = "https://bbs11pr8-5002.inc1.devtunnels.ms";

export default function Report() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${BACKEND_URL}/report/do`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, location, status }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ text: "Report submitted successfully and queued for review.", ok: true });
        setTitle(""); setDescription(""); setCategory(""); setLocation(""); setStatus("pending");
      } else {
        setMessage({ text: data.message || "Failed to submit report.", ok: false });
      }
    } catch {
      setMessage({ text: "Error connecting to server.", ok: false });
    }
    setLoading(false);
  };

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

        .rp-root {
          background: var(--bg-deep); min-height: 100vh;
          font-family: 'Exo 2', sans-serif; color: var(--text-primary);
          position: relative; overflow-x: hidden;
        }

        .rp-grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px; pointer-events: none; z-index: 0;
        }

        .rp-scanlines {
          position: fixed; inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px);
          pointer-events: none; z-index: 1;
        }

        .rp-content { position: relative; z-index: 2; }

        .rp-hero {
          padding: 60px 24px 48px; text-align: center;
          border-bottom: 1px solid var(--cyan-border); position: relative;
        }

        .rp-hero::before {
          content: '';
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 400px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
        }

        .rp-corner { position: absolute; width: 14px; height: 14px; }
        .rp-corner.tl { top: 18px; left: 18px; border-top: 1px solid var(--cyan); border-left: 1px solid var(--cyan); }
        .rp-corner.tr { top: 18px; right: 18px; border-top: 1px solid var(--cyan); border-right: 1px solid var(--cyan); }
        .rp-corner.bl { bottom: 18px; left: 18px; border-bottom: 1px solid var(--cyan); border-left: 1px solid var(--cyan); }
        .rp-corner.br { bottom: 18px; right: 18px; border-bottom: 1px solid var(--cyan); border-right: 1px solid var(--cyan); }

        .rp-eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.4em; color: var(--cyan);
          text-transform: uppercase; margin-bottom: 12px; opacity: 0.75;
        }

        .rp-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(36px, 6vw, 60px); font-weight: 700;
          letter-spacing: 0.15em; line-height: 1; color: transparent;
          background: linear-gradient(135deg, #ffffff 0%, var(--cyan) 60%, #80deea 100%);
          -webkit-background-clip: text; background-clip: text; margin-bottom: 6px;
        }

        .rp-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; color: var(--text-muted); letter-spacing: 0.2em;
        }

        .rp-main { max-width: 720px; margin: 0 auto; padding: 48px 24px 80px; }

        .rp-form-card {
          background: var(--bg-card); border: 1px solid var(--cyan-border);
          position: relative; overflow: hidden;
        }

        .rp-form-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
        }

        .rp-form-inner { padding: 32px 36px 36px; }

        .rp-field { margin-bottom: 20px; }

        .rp-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 7px; display: flex; align-items: center; gap: 6px;
        }

        .rp-label .req { color: var(--red-alert); }

        .rp-input, .rp-textarea, .rp-select {
          width: 100%; background: var(--bg-panel);
          border: 1px solid var(--cyan-border); color: var(--text-primary);
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px; letter-spacing: 0.05em;
          padding: 11px 14px; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box; resize: none;
        }

        .rp-input::placeholder, .rp-textarea::placeholder { color: #2e4650; }
        .rp-input:focus, .rp-textarea:focus, .rp-select:focus {
          border-color: var(--cyan); box-shadow: 0 0 16px rgba(0,229,255,0.1);
        }

        .rp-textarea { min-height: 110px; resize: vertical; }
        .rp-select option { background: var(--bg-panel); color: var(--text-primary); }

        .rp-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 540px) { .rp-cols { grid-template-columns: 1fr; } }

        .rp-divider {
          border: none; height: 1px; margin: 24px 0;
          background: linear-gradient(90deg, transparent, rgba(0,229,255,0.12), transparent);
        }

        .rp-message {
          padding: 12px 16px; margin-bottom: 20px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.1em;
          display: flex; align-items: center; gap: 8px;
        }

        .rp-message.ok {
          background: rgba(0,230,118,0.07); border: 1px solid rgba(0,230,118,0.25);
          color: var(--green-ok);
        }

        .rp-message.err {
          background: rgba(255,23,68,0.07); border: 1px solid rgba(255,23,68,0.25);
          color: var(--red-alert);
        }

        .rp-submit {
          width: 100%; padding: 14px;
          background: transparent; border: 1px solid var(--cyan);
          color: var(--cyan); font-family: 'Share Tech Mono', monospace;
          font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }

        .rp-submit:hover:not(:disabled) { background: var(--cyan-glow); box-shadow: 0 0 24px rgba(0,229,255,0.15); }
        .rp-submit:disabled { opacity: 0.4; cursor: not-allowed; }

        @keyframes rp-spin { to { transform: rotate(360deg); } }
        .rp-spinner { animation: rp-spin 0.8s linear infinite; }
      `}</style>

      <div className="rp-root">
        <div className="rp-grid-bg" /><div className="rp-scanlines" />

        <div className="rp-content">
          <Header />

          <div className="rp-hero">
            <div className="rp-corner tl" /><div className="rp-corner tr" />
            <div className="rp-corner bl" /><div className="rp-corner br" />
            <div className="rp-eyebrow">◈ SECURE SUBMISSION · ENCRYPTED CHANNEL</div>
            <div className="rp-title">SUBMIT REPORT</div>
            <div className="rp-sub">OPERATIONAL FIELD REPORT · COMMAND DISPATCH</div>
          </div>

          <div className="rp-main">
            <div className="rp-form-card">
              <div className="rp-form-inner">
                {message && (
                  <div className={`rp-message ${message.ok ? 'ok' : 'err'}`}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      {message.ok
                        ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        : <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      }
                    </svg>
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleReport}>
                  <div className="rp-field">
                    <div className="rp-label">Report Title <span className="req">*</span></div>
                    <input className="rp-input" type="text" placeholder="Brief operational title..." value={title} onChange={e => setTitle(e.target.value)} required />
                  </div>

                  <div className="rp-field">
                    <div className="rp-label">Description <span className="req">*</span></div>
                    <textarea className="rp-textarea" placeholder="Detailed account of the incident or operation..." value={description} onChange={e => setDescription(e.target.value)} required />
                  </div>

                  <div className="rp-cols">
                    <div className="rp-field">
                      <div className="rp-label">Category <span className="req">*</span></div>
                      <input className="rp-input" type="text" placeholder="e.g. Intelligence, Logistics" value={category} onChange={e => setCategory(e.target.value)} required />
                    </div>
                    <div className="rp-field">
                      <div className="rp-label">Location <span className="req">*</span></div>
                      <input className="rp-input" type="text" placeholder="Grid ref or area name" value={location} onChange={e => setLocation(e.target.value)} required />
                    </div>
                  </div>

                  <div className="rp-field">
                    <div className="rp-label">Initial Status</div>
                    <select className="rp-select" value={status} onChange={e => setStatus(e.target.value)}>
                      <option value="pending">Pending Review</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <hr className="rp-divider" />

                  <button type="submit" className="rp-submit" disabled={loading}>
                    {loading ? (
                      <>
                        <svg className="rp-spinner" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0115 0M20 15a9 9 0 01-15 0"/>
                        </svg>
                        TRANSMITTING REPORT...
                      </>
                    ) : '[ TRANSMIT REPORT → ]'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}