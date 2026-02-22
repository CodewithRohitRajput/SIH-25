'use client'

import { useEffect, useState } from "react"
import Footer from '../../../(components)/footer/page'
import Header from '../../../(components)/header/page'

const BACKEND_URL = "http://localhost:5002";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: '', email: '', age: '',
    designation: '', phonenumber: '', unit: '', secretId: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BACKEND_URL}/profile/me`, { method: 'GET', credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch profile data');
        const data = await res.json();
        setProfile({
          username: data.profile.username || '',
          email: data.profile.email || '',
          age: data.profile.age || '',
          designation: data.profile.designation || '',
          phonenumber: data.profile.phonenumber || '',
          unit: data.profile.unit || '',
          secretId: data.profile.secretId || ''
        });
      } catch (err) {
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, []);

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

        .pf-root {
          background: var(--bg-deep); min-height: 100vh;
          font-family: 'Exo 2', sans-serif; color: var(--text-primary);
          position: relative; overflow-x: hidden;
        }

        .pf-grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px; pointer-events: none; z-index: 0;
        }

        .pf-scanlines {
          position: fixed; inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px);
          pointer-events: none; z-index: 1;
        }

        .pf-content { position: relative; z-index: 2; }

        .pf-main { max-width: 1000px; margin: 0 auto; padding: 48px 24px 80px; }

        /* ---- LOADER / ERROR ---- */
        .pf-state {
          max-width: 500px; margin: 80px auto;
          background: var(--bg-card); border: 1px solid var(--cyan-border);
          padding: 48px 24px; text-align: center;
        }

        .pf-loader-ring {
          display: inline-block; width: 40px; height: 40px;
          border: 2px solid rgba(0,229,255,0.1); border-top-color: var(--cyan);
          border-radius: 50%; animation: pf-spin 0.8s linear infinite; margin-bottom: 16px;
        }

        @keyframes pf-spin { to { transform: rotate(360deg); } }

        .pf-state-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; letter-spacing: 0.2em; color: var(--text-muted); text-transform: uppercase;
        }

        /* ---- PROFILE HEADER ---- */
        .pf-header {
          background: var(--bg-card); border: 1px solid var(--cyan-border);
          position: relative; overflow: hidden; margin-bottom: 2px;
        }

        .pf-header::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
        }

        .pf-header-inner {
          padding: 36px 36px 32px;
          display: flex; align-items: center; gap: 28px; flex-wrap: wrap;
        }

        .pf-avatar {
          width: 72px; height: 72px; flex-shrink: 0;
          border: 1px solid var(--cyan-border); background: var(--cyan-glow);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Rajdhani', sans-serif; font-size: 32px; font-weight: 700;
          color: var(--cyan); text-shadow: 0 0 20px rgba(0,229,255,0.5);
          clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
        }

        .pf-header-info { flex: 1; }

        .pf-eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
          color: var(--cyan-dim); margin-bottom: 8px;
        }

        .pf-username {
          font-family: 'Rajdhani', sans-serif;
          font-size: 34px; font-weight: 700; letter-spacing: 0.1em;
          color: var(--text-primary); line-height: 1; margin-bottom: 6px;
        }

        .pf-role-tags { display: flex; gap: 8px; flex-wrap: wrap; }

        .pf-tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--cyan); border: 1px solid var(--cyan-border);
          background: var(--cyan-glow); padding: 3px 10px;
        }

        /* ---- STATS ---- */
        .pf-stats {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 2px; background: var(--cyan-border);
          border: 1px solid var(--cyan-border); border-top: none;
          margin-bottom: 24px;
        }

        @media (max-width: 540px) { .pf-stats { grid-template-columns: 1fr; } }

        .pf-stat {
          background: var(--bg-panel); padding: 22px 20px; text-align: center;
          position: relative;
        }

        .pf-stat::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
        }

        .pf-stat.s-cyan::before { background: var(--cyan); box-shadow: 0 0 8px var(--cyan); }
        .pf-stat.s-green::before { background: var(--green-ok); box-shadow: 0 0 8px var(--green-ok); }
        .pf-stat.s-amber::before { background: var(--amber); box-shadow: 0 0 8px var(--amber); }

        .pf-stat-num {
          font-family: 'Rajdhani', sans-serif; font-size: 38px; font-weight: 700; line-height: 1; margin-bottom: 4px;
        }

        .pf-stat.s-cyan .pf-stat-num { color: var(--cyan); text-shadow: 0 0 16px rgba(0,229,255,0.4); }
        .pf-stat.s-green .pf-stat-num { color: var(--green-ok); text-shadow: 0 0 16px rgba(0,230,118,0.4); }
        .pf-stat.s-amber .pf-stat-num { color: var(--amber); text-shadow: 0 0 16px rgba(255,171,0,0.4); }

        .pf-stat-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted);
        }

        /* ---- INFO PANELS ---- */
        .pf-panels {
          display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
          background: var(--cyan-border); border: 1px solid var(--cyan-border);
          margin-bottom: 24px;
        }

        @media (max-width: 640px) { .pf-panels { grid-template-columns: 1fr; } }

        .pf-panel { background: var(--bg-card); padding: 28px 28px; }

        .pf-panel-title {
          font-family: 'Rajdhani', sans-serif; font-size: 14px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-primary);
          margin-bottom: 20px; padding-bottom: 10px;
          border-bottom: 1px solid rgba(0,229,255,0.1);
          display: flex; align-items: center; gap: 8px;
        }

        .pf-panel-title::before {
          content: ''; display: block; width: 2px; height: 16px;
          background: var(--cyan); box-shadow: 0 0 6px var(--cyan);
        }

        .pf-field { margin-bottom: 14px; }
        .pf-field:last-child { margin-bottom: 0; }

        .pf-field-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 5px;
        }

        .pf-field-val {
          background: var(--bg-panel); border: 1px solid rgba(0,229,255,0.08);
          border-left: 2px solid var(--cyan-border);
          padding: 9px 14px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px; letter-spacing: 0.05em; color: var(--text-primary);
        }

        .pf-field-val.empty { color: #2e4650; font-style: normal; }
        .pf-field-val.mono { font-family: 'Share Tech Mono', monospace; color: var(--cyan-dim); }

        /* ---- ACTIONS ---- */
        .pf-actions {
          display: flex; gap: 2px; flex-wrap: wrap;
          background: var(--cyan-border); border: 1px solid var(--cyan-border);
        }

        .pf-action-btn {
          flex: 1; min-width: 140px;
          background: var(--bg-card); border: none;
          color: var(--text-muted); font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
          padding: 16px 20px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.2s;
        }

        .pf-action-btn:hover { background: #071820; color: var(--cyan); }
        .pf-action-btn svg { flex-shrink: 0; }
      `}</style>

      <div className="pf-root">
        <div className="pf-grid-bg" /><div className="pf-scanlines" />

        <div className="pf-content">
          <Header />

          <div className="pf-main">
            {isLoading ? (
              <div className="pf-state">
                <div className="pf-loader-ring" />
                <div className="pf-state-text">Loading personnel file...</div>
              </div>
            ) : error ? (
              <div className="pf-state">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75} style={{ color: 'rgba(255,23,68,0.3)', marginBottom: 16 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="pf-state-text" style={{ color: 'var(--red-alert)' }}>{error}</div>
                <button onClick={() => window.location.reload()} style={{ marginTop: 20, padding: '8px 20px', background: 'transparent', border: '1px solid rgba(0,229,255,0.3)', color: 'var(--cyan)', fontFamily: 'Share Tech Mono', fontSize: 10, letterSpacing: '0.2em', cursor: 'pointer', textTransform: 'uppercase' }}>
                  RETRY
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="pf-header">
                  <div className="pf-header-inner">
                    <div className="pf-avatar">
                      {profile.username ? profile.username[0].toUpperCase() : 'A'}
                    </div>
                    <div className="pf-header-info">
                      <div className="pf-eyebrow">◈ PERSONNEL FILE · ACTIVE OPERATOR</div>
                      <div className="pf-username">{profile.username || 'Unknown Operator'}</div>
                      <div className="pf-role-tags">
                        {profile.designation && <div className="pf-tag">{profile.designation}</div>}
                        {profile.unit && <div className="pf-tag">⬡ {profile.unit}</div>}
                        <div className="pf-tag">CLEARANCE ACTIVE</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="pf-stats">
                  <div className="pf-stat s-cyan">
                    <div className="pf-stat-num">24</div>
                    <div className="pf-stat-label">Reports Submitted</div>
                  </div>
                  <div className="pf-stat s-green">
                    <div className="pf-stat-num">18</div>
                    <div className="pf-stat-label">Approved</div>
                  </div>
                  <div className="pf-stat s-amber">
                    <div className="pf-stat-num">6</div>
                    <div className="pf-stat-label">Pending Review</div>
                  </div>
                </div>

                {/* Info panels */}
                <div className="pf-panels">
                  <div className="pf-panel">
                    <div className="pf-panel-title">Personal Information</div>
                    <div className="pf-field">
                      <div className="pf-field-label">Email Address</div>
                      <div className={`pf-field-val${!profile.email ? ' empty' : ''}`}>{profile.email || 'Not provided'}</div>
                    </div>
                    <div className="pf-field">
                      <div className="pf-field-label">Age</div>
                      <div className={`pf-field-val${!profile.age ? ' empty' : ''}`}>{profile.age || 'Not provided'}</div>
                    </div>
                    <div className="pf-field">
                      <div className="pf-field-label">Phone Number</div>
                      <div className={`pf-field-val${!profile.phonenumber ? ' empty' : ''}`}>{profile.phonenumber || 'Not provided'}</div>
                    </div>
                  </div>

                  <div className="pf-panel">
                    <div className="pf-panel-title">Military Information</div>
                    <div className="pf-field">
                      <div className="pf-field-label">Designation / Rank</div>
                      <div className={`pf-field-val${!profile.designation ? ' empty' : ''}`}>{profile.designation || 'Not provided'}</div>
                    </div>
                    <div className="pf-field">
                      <div className="pf-field-label">Unit</div>
                      <div className={`pf-field-val${!profile.unit ? ' empty' : ''}`}>{profile.unit ? `⬡ ${profile.unit}` : 'Not provided'}</div>
                    </div>
                    <div className="pf-field">
                      <div className="pf-field-label">Secret ID</div>
                      <div className={`pf-field-val mono${!profile.secretId ? ' empty' : ''}`}>{profile.secretId || 'Not provided'}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pf-actions">
                  <button className="pf-action-btn">
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                  <button className="pf-action-btn">
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download File
                  </button>
                  <button className="pf-action-btn">
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Request Support
                  </button>
                </div>
              </>
            )}
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}