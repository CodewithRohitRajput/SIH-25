'use client'
import { useState } from "react";
import Footer from "@/(components)/footer/page";

const BACKEND_URL = "http://localhost:5002";

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [designation, setDesignation] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [unit, setUnit] = useState('');
  const [secretId, setSecretId] = useState('');
  const [role, setRole] = useState('army');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email, password, age, designation, phonenumber, unit, secretId, role })
      });
      const data = await res.json();
      if (res.ok) {
        setUsername(''); setEmail(''); setPassword(''); setAge('');
        setDesignation(''); setPhonenumber(''); setUnit(''); setSecretId(''); setRole('army');
        window.location.href = '/';
      } else {
        setError(data.message || 'Registration failed. Please try again.');
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

        .rg-root {
          background: var(--bg-deep); min-height: 100vh;
          font-family: 'Exo 2', sans-serif; color: var(--text-primary);
          position: relative; overflow-x: hidden;
          display: flex; flex-direction: column;
        }

        .rg-grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px; pointer-events: none; z-index: 0;
        }

        .rg-scanlines {
          position: fixed; inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px);
          pointer-events: none; z-index: 1;
        }

        .rg-top-glow {
          position: fixed; top: -200px; left: 50%; transform: translateX(-50%);
          width: 700px; height: 400px;
          background: radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        .rg-content {
          position: relative; z-index: 2; flex: 1;
          display: flex; align-items: flex-start; justify-content: center;
          padding: 48px 24px 64px;
        }

        .rg-card {
          width: 100%; max-width: 820px;
          background: var(--bg-card); border: 1px solid var(--cyan-border);
          position: relative; overflow: hidden;
        }

        .rg-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
        }

        .rg-corner { position: absolute; width: 12px; height: 12px; }
        .rg-corner.tl { top: 10px; left: 10px; border-top: 1px solid var(--cyan); border-left: 1px solid var(--cyan); }
        .rg-corner.tr { top: 10px; right: 10px; border-top: 1px solid var(--cyan); border-right: 1px solid var(--cyan); }
        .rg-corner.bl { bottom: 10px; left: 10px; border-bottom: 1px solid var(--cyan); border-left: 1px solid var(--cyan); }
        .rg-corner.br { bottom: 10px; right: 10px; border-bottom: 1px solid var(--cyan); border-right: 1px solid var(--cyan); }

        .rg-header {
          padding: 32px 36px 24px; text-align: center;
          border-bottom: 1px solid rgba(0,229,255,0.08);
        }

        .rg-shield {
          width: 48px; height: 48px; margin: 0 auto 14px;
          border: 1px solid var(--cyan-border); background: var(--cyan-glow);
          display: flex; align-items: center; justify-content: center; color: var(--cyan);
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
        }

        .rg-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 26px; font-weight: 700; letter-spacing: 0.2em;
          color: transparent;
          background: linear-gradient(135deg, #ffffff 0%, var(--cyan) 100%);
          -webkit-background-clip: text; background-clip: text; margin-bottom: 4px;
        }

        .rg-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.2em; color: var(--text-muted);
          text-transform: uppercase;
        }

        .rg-body { padding: 28px 36px 36px; }

        .rg-error {
          background: rgba(255,23,68,0.07); border: 1px solid rgba(255,23,68,0.25);
          padding: 10px 14px; margin-bottom: 24px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.1em; color: var(--red-alert);
          display: flex; align-items: center; gap: 8px;
        }

        .rg-cols {
          display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
        }

        @media (max-width: 640px) { .rg-cols { grid-template-columns: 1fr; } }

        .rg-col-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--text-primary);
          margin-bottom: 18px; padding-bottom: 10px;
          border-bottom: 1px solid rgba(0,229,255,0.1);
          display: flex; align-items: center; gap: 8px;
        }

        .rg-col-title::before {
          content: '';
          display: block; width: 2px; height: 16px;
          background: var(--cyan); box-shadow: 0 0 6px var(--cyan);
        }

        .rg-field { margin-bottom: 16px; }

        .rg-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 6px; display: block;
        }

        .rg-input, .rg-select {
          width: 100%; background: var(--bg-panel);
          border: 1px solid var(--cyan-border); color: var(--text-primary);
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px; letter-spacing: 0.05em;
          padding: 10px 14px; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .rg-input::placeholder { color: #2e4650; }
        .rg-input:focus, .rg-select:focus { border-color: var(--cyan); box-shadow: 0 0 16px rgba(0,229,255,0.1); }
        .rg-select option { background: var(--bg-panel); color: var(--text-primary); }

        .rg-divider {
          border: none; height: 1px; margin: 28px 0;
          background: linear-gradient(90deg, transparent, rgba(0,229,255,0.15), transparent);
        }

        .rg-submit {
          width: 100%; padding: 14px;
          background: transparent; border: 1px solid var(--cyan);
          color: var(--cyan); font-family: 'Share Tech Mono', monospace;
          font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }

        .rg-submit:hover:not(:disabled) { background: var(--cyan-glow); box-shadow: 0 0 24px rgba(0,229,255,0.15); }
        .rg-submit:disabled { opacity: 0.4; cursor: not-allowed; }

        .rg-footer-link {
          text-align: center; margin-top: 18px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.1em; color: var(--text-muted);
        }

        .rg-footer-link a { color: var(--cyan); text-decoration: none; }
        .rg-footer-link a:hover { text-decoration: underline; }

        @keyframes rg-spin { to { transform: rotate(360deg); } }
        .rg-spinner { animation: rg-spin 0.8s linear infinite; }
      `}</style>

      <div className="rg-root">
        <div className="rg-grid-bg" /><div className="rg-scanlines" /><div className="rg-top-glow" />

        <div className="rg-content">
          <div className="rg-card">
            <div className="rg-corner tl" /><div className="rg-corner tr" />
            <div className="rg-corner bl" /><div className="rg-corner br" />

            <div className="rg-header">
              <div className="rg-shield">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v5c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V7l8-4z" />
                </svg>
              </div>
              <div className="rg-title">PERSONNEL REGISTRATION</div>
              <div className="rg-sub">VAJRA PORTAL · New Operator Enrollment</div>
            </div>

            <div className="rg-body">
              {error && (
                <div className="rg-error">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="rg-cols">
                  {/* Personal */}
                  <div>
                    <div className="rg-col-title">Personal Information</div>
                    <div className="rg-field">
                      <label className="rg-label">Username *</label>
                      <input className="rg-input" type="text" placeholder="operator_callsign" value={username} onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div className="rg-field">
                      <label className="rg-label">Email Address *</label>
                      <input className="rg-input" type="email" placeholder="operator@vajra.mil" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="rg-field">
                      <label className="rg-label">Password *</label>
                      <input className="rg-input" type="password" placeholder="••••••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="rg-field">
                      <label className="rg-label">Age</label>
                      <input className="rg-input" type="number" placeholder="18–60" value={age} onChange={e => setAge(e.target.value)} min="18" max="60" />
                    </div>
                  </div>

                  {/* Military */}
                  <div>
                    <div className="rg-col-title">Military Information</div>
                    <div className="rg-field">
                      <label className="rg-label">Designation / Rank</label>
                      <input className="rg-input" type="text" placeholder="e.g. Captain, Major" value={designation} onChange={e => setDesignation(e.target.value)} />
                    </div>
                    <div className="rg-field">
                      <label className="rg-label">Phone Number</label>
                      <input className="rg-input" type="tel" placeholder="+91 XXXXXXXXXX" value={phonenumber} onChange={e => setPhonenumber(e.target.value)} />
                    </div>
                    <div className="rg-field">
                      <label className="rg-label">Unit</label>
                      <input className="rg-input" type="text" placeholder="Unit designation" value={unit} onChange={e => setUnit(e.target.value)} />
                    </div>
                    <div className="rg-field">
                      <label className="rg-label">Secret ID</label>
                      <input className="rg-input" type="text" placeholder="Identification code" value={secretId} onChange={e => setSecretId(e.target.value)} />
                    </div>
                    <div className="rg-field">
                      <label className="rg-label">Role *</label>
                      <select className="rg-select" value={role} onChange={e => setRole(e.target.value)}>
                        <option value="army">Army Personnel</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </div>
                  </div>
                </div>

                <hr className="rg-divider" />

                <button type="submit" className="rg-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg className="rg-spinner" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0115 0M20 15a9 9 0 01-15 0"/>
                      </svg>
                      REGISTERING OPERATOR...
                    </>
                  ) : '[ REGISTER OPERATOR → ]'}
                </button>

                <div className="rg-footer-link">
                  Already have access? <a href="/login">Authenticate here</a>
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