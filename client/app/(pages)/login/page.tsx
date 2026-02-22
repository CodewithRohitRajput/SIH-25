'use client'
import { useState } from "react";
import Footer from "@/(components)/footer/page";

const BACKEND_URL = "http://localhost:5002";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [phonenumber, setPhonenumber] = useState('');
  const [secretId, setSecretId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, phonenumber, secretId })
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = '/';
      } else {
        setError(data.message || 'Authentication failed. Check credentials.');
      }
    } catch {
      setError('Failed to connect to server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

        .lg-root {
          background: var(--bg-deep); min-height: 100vh;
          font-family: 'Exo 2', sans-serif; color: var(--text-primary);
          position: relative; overflow-x: hidden;
          display: flex; flex-direction: column;
        }

        .lg-grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px; pointer-events: none; z-index: 0;
        }

        .lg-scanlines {
          position: fixed; inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px);
          pointer-events: none; z-index: 1;
        }

        .lg-top-glow {
          position: fixed; top: -200px; left: 50%; transform: translateX(-50%);
          width: 700px; height: 400px;
          background: radial-gradient(ellipse, rgba(0,229,255,0.07) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        .lg-content {
          position: relative; z-index: 2; flex: 1;
          display: flex; align-items: center; justify-content: center; padding: 48px 24px;
        }

        .lg-card {
          width: 100%; max-width: 440px;
          background: var(--bg-card); border: 1px solid var(--cyan-border);
          position: relative; overflow: hidden;
        }

        .lg-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
        }

        .lg-corner { position: absolute; width: 12px; height: 12px; }
        .lg-corner.tl { top: 10px; left: 10px; border-top: 1px solid var(--cyan); border-left: 1px solid var(--cyan); }
        .lg-corner.tr { top: 10px; right: 10px; border-top: 1px solid var(--cyan); border-right: 1px solid var(--cyan); }
        .lg-corner.bl { bottom: 10px; left: 10px; border-bottom: 1px solid var(--cyan); border-left: 1px solid var(--cyan); }
        .lg-corner.br { bottom: 10px; right: 10px; border-bottom: 1px solid var(--cyan); border-right: 1px solid var(--cyan); }

        .lg-header {
          padding: 36px 36px 28px;
          text-align: center;
          border-bottom: 1px solid rgba(0,229,255,0.08);
        }

        .lg-shield {
          width: 52px; height: 52px; margin: 0 auto 16px;
          border: 1px solid var(--cyan-border); background: var(--cyan-glow);
          display: flex; align-items: center; justify-content: center; color: var(--cyan);
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
        }

        .lg-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 28px; font-weight: 700; letter-spacing: 0.2em;
          color: transparent;
          background: linear-gradient(135deg, #ffffff 0%, var(--cyan) 100%);
          -webkit-background-clip: text; background-clip: text;
          margin-bottom: 6px;
        }

        .lg-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.2em; color: var(--text-muted);
          text-transform: uppercase;
        }

        .lg-body { padding: 28px 36px 32px; }

        .lg-field { margin-bottom: 18px; }

        .lg-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 7px; display: block;
        }

        .lg-input {
          width: 100%; background: var(--bg-panel);
          border: 1px solid var(--cyan-border); color: var(--text-primary);
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px; letter-spacing: 0.05em;
          padding: 10px 14px; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .lg-input::placeholder { color: #2e4650; }
        .lg-input:focus { border-color: var(--cyan); box-shadow: 0 0 16px rgba(0,229,255,0.1); }

        .lg-error {
          background: rgba(255,23,68,0.07); border: 1px solid rgba(255,23,68,0.25);
          padding: 10px 14px; margin-bottom: 18px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.1em; color: var(--red-alert);
          display: flex; align-items: center; gap: 8px;
        }

        .lg-submit {
          width: 100%; padding: 13px;
          background: transparent; border: 1px solid var(--cyan);
          color: var(--cyan); font-family: 'Share Tech Mono', monospace;
          font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s; margin-top: 8px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }

        .lg-submit:hover:not(:disabled) { background: var(--cyan-glow); box-shadow: 0 0 24px rgba(0,229,255,0.15); }
        .lg-submit:disabled { opacity: 0.4; cursor: not-allowed; }

        .lg-footer-link {
          text-align: center; margin-top: 20px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.1em; color: var(--text-muted);
        }

        .lg-footer-link a { color: var(--cyan); text-decoration: none; }
        .lg-footer-link a:hover { text-decoration: underline; }

        @keyframes lg-spin { to { transform: rotate(360deg); } }
        .lg-spinner { animation: lg-spin 0.8s linear infinite; }
      `}</style>

      <div className="lg-root">
        <div className="lg-grid-bg" /><div className="lg-scanlines" /><div className="lg-top-glow" />

        <div className="lg-content">
          <div className="lg-card">
            <div className="lg-corner tl" /><div className="lg-corner tr" />
            <div className="lg-corner bl" /><div className="lg-corner br" />

            <div className="lg-header">
              <div className="lg-shield">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v5c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V7l8-4z" />
                </svg>
              </div>
              <div className="lg-title">VAJRA</div>
              <div className="lg-sub">Secure Authentication Portal</div>
            </div>

            <div className="lg-body">
              {error && (
                <div className="lg-error">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="lg-field">
                  <label className="lg-label">Email Address *</label>
                  <input className="lg-input" type="email" placeholder="operator@vajra.mil" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="lg-field">
                  <label className="lg-label">Password *</label>
                  <input className="lg-input" type="password" placeholder="••••••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="lg-field">
                  <label className="lg-label">Phone Number</label>
                  <input className="lg-input" type="tel" placeholder="+91 XXXXXXXXXX" value={phonenumber} onChange={e => setPhonenumber(e.target.value)} />
                </div>
                <div className="lg-field">
                  <label className="lg-label">Secret ID</label>
                  <input className="lg-input" type="text" placeholder="XXXXXXXXXXXXXXXX" value={secretId} onChange={e => setSecretId(e.target.value)} />
                </div>

                <button type="submit" className="lg-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg className="lg-spinner" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0115 0M20 15a9 9 0 01-15 0"/>
                      </svg>
                      AUTHENTICATING...
                    </>
                  ) : '[ AUTHENTICATE → ]'}
                </button>

                <div className="lg-footer-link">
                  No account? <a href="/register">Request access here</a>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}