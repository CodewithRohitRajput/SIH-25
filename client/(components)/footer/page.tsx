import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Share+Tech+Mono&display=swap');

        .vj-footer {
          font-family: 'Share Tech Mono', monospace;
          background: #020c10;
          border-top: 1px solid rgba(0,229,255,0.2);
          position: relative;
          overflow: hidden;
        }

        /* Top glowing line */
        .vj-footer::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #00e5ff 40%, #00b8cc 60%, transparent 100%);
          opacity: 0.6;
        }

        /* Grid background */
        .vj-footer::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .vj-footer-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 56px 24px 0;
        }

        .vj-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(0,229,255,0.1);
        }

        @media (max-width: 1024px) {
          .vj-footer-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 600px) {
          .vj-footer-grid { grid-template-columns: 1fr; gap: 32px; }
        }

        /* Brand col */
        .vj-brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          margin-bottom: 20px;
        }

        .vj-brand-icon {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(0,229,255,0.3);
          background: rgba(0,229,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00e5ff;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: box-shadow 0.25s;
        }

        .vj-brand-logo:hover .vj-brand-icon {
          box-shadow: 0 0 20px rgba(0,229,255,0.3);
        }

        .vj-brand-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: #00e5ff;
          text-shadow: 0 0 16px rgba(0,229,255,0.4);
        }

        .vj-brand-desc {
          font-size: 12px;
          color: #37474f;
          line-height: 1.7;
          letter-spacing: 0.05em;
          max-width: 320px;
          margin-bottom: 24px;
        }

        /* Status indicators */
        .vj-status-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .vj-status-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: #546e7a;
          text-transform: uppercase;
        }

        .vj-status-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .vj-status-dot.green {
          background: #00e676;
          box-shadow: 0 0 6px #00e676;
          animation: vj-pulse 2s infinite;
        }

        .vj-status-dot.cyan {
          background: #00e5ff;
          box-shadow: 0 0 6px #00e5ff;
          animation: vj-pulse 2.5s infinite;
        }

        .vj-status-dot.amber {
          background: #ffab00;
          box-shadow: 0 0 6px #ffab00;
          animation: vj-pulse 3s infinite;
        }

        @keyframes vj-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Link columns */
        .vj-col-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #e0f7fa;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(0,229,255,0.15);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .vj-col-title::before {
          content: '';
          display: block;
          width: 2px;
          height: 14px;
          background: #00e5ff;
          box-shadow: 0 0 6px #00e5ff;
          flex-shrink: 0;
        }

        .vj-col-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .vj-col-link {
          text-decoration: none;
          color: #37474f;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 6px 10px;
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .vj-col-link::before {
          content: '◈';
          font-size: 7px;
          color: rgba(0,229,255,0.25);
          transition: color 0.2s;
        }

        .vj-col-link:hover {
          color: #00e5ff;
          border-color: rgba(0,229,255,0.2);
          background: rgba(0,229,255,0.05);
        }

        .vj-col-link:hover::before {
          color: #00e5ff;
        }

        /* Bottom bar */
        .vj-footer-bottom {
          padding: 20px 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .vj-copyright {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #263238;
          text-transform: uppercase;
        }

        .vj-copyright span {
          color: rgba(0,229,255,0.4);
        }

        .vj-classification {
          font-size: 9px;
          letter-spacing: 0.35em;
          color: rgba(255,23,68,0.4);
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .vj-classification::before,
        .vj-classification::after {
          content: '⬛';
          font-size: 7px;
        }

        .vj-version {
          font-size: 9px;
          letter-spacing: 0.2em;
          color: #263238;
        }
      `}</style>

      <footer className="vj-footer">
        <div className="vj-footer-inner">
          <div className="vj-footer-grid">

            {/* Brand */}
            <div>
              <Link href="/" className="vj-brand-logo">
                <div className="vj-brand-icon">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v5c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V7l8-4z" />
                  </svg>
                </div>
                <span className="vj-brand-name">VAJRA</span>
              </Link>
              <p className="vj-brand-desc">
                Secure platform for army personnel to submit reports, access resources, and manage military operations with real-time intelligence.
              </p>
              <div className="vj-status-row">
                <div className="vj-status-item">
                  <div className="vj-status-dot green" />
                  All Systems Operational
                </div>
                <div className="vj-status-item">
                  <div className="vj-status-dot cyan" />
                  Encryption: AES-256 Active
                </div>
                <div className="vj-status-item">
                  <div className="vj-status-dot amber" />
                  Threat Level: Moderate
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <div className="vj-col-title">Navigation</div>
              <ul className="vj-col-links">
                <li><Link href="/" className="vj-col-link">Home</Link></li>
                <li><Link href="/allreports" className="vj-col-link">Reports</Link></li>
                <li><Link href="/risk" className="vj-col-link">Risk Intel</Link></li>
                <li><Link href="/resources" className="vj-col-link">Resources</Link></li>
                <li><Link href="/profile" className="vj-col-link">Profile</Link></li>
              </ul>
            </div>

            {/* Operations */}
            <div>
              <div className="vj-col-title">Operations</div>
              <ul className="vj-col-links">
                <li><Link href="/report" className="vj-col-link">Submit Report</Link></li>
                <li><Link href="/chatbotAI" className="vj-col-link">Tactical AI</Link></li>
                <li><Link href="/allreports" className="vj-col-link">Field Reports</Link></li>
                <li><Link href="/risk" className="vj-col-link">Risk Assessment</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <div className="vj-col-title">Support</div>
              <ul className="vj-col-links">
                <li><a href="#" className="vj-col-link">Help Center</a></li>
                <li><a href="#" className="vj-col-link">Contact Support</a></li>
                <li><a href="#" className="vj-col-link">Documentation</a></li>
                <li><a href="#" className="vj-col-link">System Status</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="vj-footer-bottom">
            <div className="vj-copyright">
              &copy; {year} <span>VAJRA</span> Portal · All Rights Reserved
            </div>
            <div className="vj-classification">
              Classified — Authorized Personnel Only
            </div>
            <div className="vj-version">v3.7.1 · Secure Channel</div>
          </div>
        </div>
      </footer>
    </>
  )
}